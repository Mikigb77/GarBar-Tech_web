#!/usr/bin/env bash
# Sets up everything GitHub Actions needs to deploy the website to Cloud Run. Run it once, in WSL
# (Ubuntu), from the repository root:
#
#   bash infra/setup.sh
#
# Safe to run again at any time: every step checks what exists and only adds what is missing.
#
# 1. Installs gcloud and gh with apt when they are missing (asks for your sudo password).
# 2. Signs in to Google Cloud and GitHub in the Windows browser, only when not signed in already.
# 3. Google Cloud (project garbar-tech): enables the APIs; creates the image repository with a
#    cleanup policy, the build bucket and three service accounts (runtime, builder, deployer);
#    makes sure the Cloud Run service exists, is public and scales to zero; and sets up Workload
#    Identity Federation so only this repository's deploy workflow, on main, can deploy. No
#    service-account key is created.
# 4. GitHub: saves the ids from step 3 as repository variables (no secrets are needed), makes dev
#    the default branch, deletes merged branches automatically, turns on secret scanning and push
#    protection, protects dev and main so they only change through PRs with green checks, and
#    deletes leftover branches that are already merged.
#
# Settings can be overridden with environment variables, for example SKIP_BRANCH_PROTECTION=1.
set -euo pipefail

PROJECT_ID=${PROJECT_ID:-garbar-tech}
ACCOUNT=${ACCOUNT:-tech.garbar@gmail.com}
REGION=${REGION:-europe-southwest1}
SERVICE=${SERVICE:-garbar-web}
REPO_NAME=${REPO_NAME:-Mikigb77/GarBar-Tech_web}
SKIP_BRANCH_PROTECTION=${SKIP_BRANCH_PROTECTION:-}

ARTIFACT_REPOSITORY=garbar-web
POOL=github-actions
PROVIDER=garbar-web-main
RUNTIME="garbar-web-runtime@$PROJECT_ID.iam.gserviceaccount.com"
BUILDER="garbar-web-builder@$PROJECT_ID.iam.gserviceaccount.com"
DEPLOYER="garbar-web-deployer@$PROJECT_ID.iam.gserviceaccount.com"

step() { printf '\n\033[36m==> %s\033[0m\n' "$*"; }
note() { printf '    %s\n' "$*"; }
fail() { printf '\033[31mError: %s\033[0m\n' "$*" >&2; exit 1; }

# gcloud for this project and account, without changing the active gcloud configuration.
gc() { gcloud "$@" --project="$PROJECT_ID" --account="$ACCOUNT" --quiet; }
# True when a gcloud read succeeds, for checking whether something exists.
gc_exists() { gcloud "$@" --project="$PROJECT_ID" --account="$ACCOUNT" --quiet --verbosity=none >/dev/null 2>&1; }

TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# -------------------------------------------------------------------------------------------------
step 'Tools'
if ! command -v apt-get >/dev/null && { ! command -v gcloud >/dev/null || ! command -v gh >/dev/null; }; then
  fail 'Install gcloud (https://cloud.google.com/sdk/docs/install) and gh (https://cli.github.com), then run this again.'
fi
apt_updated=
apt_install() {
  if [[ -z $apt_updated ]]; then sudo apt-get update -qq; apt_updated=1; fi
  sudo apt-get install -y -qq "$@" >/dev/null
}
if ! command -v curl >/dev/null || ! command -v gpg >/dev/null; then apt_install curl gnupg ca-certificates; fi
if ! command -v gcloud >/dev/null; then
  note 'Installing the Google Cloud CLI...'
  curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg \
    | sudo gpg --dearmor --yes -o /usr/share/keyrings/cloud.google.gpg
  echo 'deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main' \
    | sudo tee /etc/apt/sources.list.d/google-cloud-sdk.list >/dev/null
  apt_updated=
  apt_install google-cloud-cli
fi
if ! command -v gh >/dev/null; then
  note 'Installing the GitHub CLI...'
  sudo mkdir -p -m 755 /etc/apt/keyrings
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg >/dev/null
  sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    | sudo tee /etc/apt/sources.list.d/github-cli.list >/dev/null
  apt_updated=
  apt_install gh
fi
# In WSL, sign-ins open the Windows browser and come back to localhost. wslview is used when it
# is installed; otherwise (Kali, for one, has no wslu package) Windows' explorer.exe opens the link.
if grep -qi microsoft /proc/version 2>/dev/null && [[ -z ${BROWSER:-} ]]; then
  if command -v wslview >/dev/null; then
    export BROWSER=wslview
  elif command -v explorer.exe >/dev/null; then
    # shellcheck disable=SC2016 # $1 belongs to the generated script.
    printf '#!/bin/sh\nexplorer.exe "$1"\nexit 0\n' >"$TEMP_DIR/open-in-windows"
    chmod +x "$TEMP_DIR/open-in-windows"
    export BROWSER="$TEMP_DIR/open-in-windows"
  fi
fi
note 'gcloud and gh are installed.'

step "Google Cloud sign-in ($ACCOUNT)"
if ! gcloud auth print-access-token --account="$ACCOUNT" --quiet --verbosity=none >/dev/null 2>&1; then
  note 'Opening the browser to sign in...'
  gcloud auth login "$ACCOUNT" --brief || fail 'Google Cloud sign-in did not finish.'
fi
PROJECT_NUMBER=$(gc projects describe "$PROJECT_ID" --format='value(projectNumber)') \
  || fail "$ACCOUNT cannot read the project $PROJECT_ID."
note "Signed in. Project $PROJECT_ID is number $PROJECT_NUMBER."

step 'GitHub sign-in'
# In WSL, reuse the Windows gh sign-in when there is one, so no second login is needed.
if ! gh auth status --hostname github.com >/dev/null 2>&1 && command -v gh.exe >/dev/null \
  && windows_token=$(gh.exe auth token 2>/dev/null | tr -d '\r') && [[ -n $windows_token ]]; then
  export GH_TOKEN=$windows_token
  note 'Using the Windows gh sign-in.'
fi
if ! gh auth status --hostname github.com >/dev/null 2>&1; then
  note 'Opening the browser to sign in. Enter the one-time code shown below.'
  gh auth login --hostname github.com --web --git-protocol https --scopes repo,workflow \
    || fail 'GitHub sign-in did not finish.'
fi
IFS=$'\t' read -r REPO_ID OWNER_ID OWNER_LOGIN FULL_NAME IS_ADMIN < <(
  gh api "repos/$REPO_NAME" --jq '[.id, .owner.id, .owner.login, .full_name, .permissions.admin] | @tsv')
[[ $IS_ADMIN == true ]] || fail "The signed-in GitHub user is not an admin of $REPO_NAME."
note "Signed in. $FULL_NAME is repository $REPO_ID, owner $OWNER_ID."

# -------------------------------------------------------------------------------------------------
step 'Google Cloud APIs'
gc services enable run.googleapis.com artifactregistry.googleapis.com cloudbuild.googleapis.com \
  iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com \
  cloudresourcemanager.googleapis.com
note 'Enabled.'

step 'Service accounts'
for entry in "$RUNTIME|GarBar website (Cloud Run runtime)" \
  "$BUILDER|GarBar website (manual Cloud Build)" \
  "$DEPLOYER|GarBar website (GitHub Actions deployer)"; do
  email=${entry%%|*}
  if gc_exists iam service-accounts describe "$email"; then
    note "$email exists."
  else
    gc iam service-accounts create "${email%%@*}" --display-name="${entry#*|}" --format=none
    note "Created $email."
  fi
done

step 'Image repository'
if ! gc_exists artifacts repositories describe "$ARTIFACT_REPOSITORY" --location="$REGION"; then
  gc artifacts repositories create "$ARTIFACT_REPOSITORY" --repository-format=docker \
    --location="$REGION" --format=none
  note "Created $ARTIFACT_REPOSITORY."
fi
# Keep the 10 newest images and anything under 30 days old, so storage stays small.
cat >"$TEMP_DIR/cleanup.json" <<'JSON'
[
  {"name": "keep-newest", "action": {"type": "Keep"}, "mostRecentVersions": {"keepCount": 10}},
  {"name": "delete-old", "action": {"type": "Delete"}, "condition": {"tagState": "any", "olderThan": "30d"}}
]
JSON
gc artifacts repositories set-cleanup-policies "$ARTIFACT_REPOSITORY" --location="$REGION" \
  --policy="$TEMP_DIR/cleanup.json" --no-dry-run --format=none
for member in "$BUILDER" "$DEPLOYER"; do
  gc artifacts repositories add-iam-policy-binding "$ARTIFACT_REPOSITORY" --location="$REGION" \
    --member="serviceAccount:$member" --role=roles/artifactregistry.writer --format=none
done
note "$REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REPOSITORY keeps the newest 10 images; the deployer and builder can push."

step 'Build bucket for manual deploys (infra/deploy-cloud.sh)'
SOURCE_BUCKET="gs://garbar-web-builds-$PROJECT_NUMBER"
if ! gc_exists storage buckets describe "$SOURCE_BUCKET"; then
  gc storage buckets create "$SOURCE_BUCKET" --location="$REGION" --uniform-bucket-level-access \
    --public-access-prevention
fi
gc storage buckets add-iam-policy-binding "$SOURCE_BUCKET" --member="serviceAccount:$BUILDER" \
  --role=roles/storage.objectViewer --format=none
gc projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:$BUILDER" \
  --role=roles/logging.logWriter --condition=None --format=none
note "$SOURCE_BUCKET is ready."

step "Cloud Run service $SERVICE"
if gc_exists run services describe "$SERVICE" --region="$REGION"; then
  note 'Exists. The next deploy from main replaces its image.'
else
  # A placeholder so the deployer can be given access to this one service. The first deploy from
  # GitHub Actions replaces it with the website.
  gc run deploy "$SERVICE" --image=us-docker.pkg.dev/cloudrun/container/hello --region="$REGION" \
    --service-account="$RUNTIME" --port=8080 --cpu=1 --memory=256Mi --cpu-throttling \
    --scaling=auto --min=0 --max=3 --allow-unauthenticated --format=none
  note 'Created with a placeholder page. If Cloudflare still points at an older service URL, update edge/worker.js.'
fi
gc run services update "$SERVICE" --region="$REGION" --scaling=auto --min=0 --max=3 --format=none
gc run services add-iam-policy-binding "$SERVICE" --region="$REGION" --member=allUsers \
  --role=roles/run.invoker --format=none
gc run services add-iam-policy-binding "$SERVICE" --region="$REGION" \
  --member="serviceAccount:$DEPLOYER" --role=roles/run.developer --format=none
gc iam service-accounts add-iam-policy-binding "$RUNTIME" --member="serviceAccount:$DEPLOYER" \
  --role=roles/iam.serviceAccountUser --format=none
ORIGIN=$(gc run services describe "$SERVICE" --region="$REGION" --format='value(status.url)')
note "Public, scales to zero (0 to 3 instances): $ORIGIN"

step 'Workload Identity Federation (GitHub Actions sign-in without keys)'
pool_state=$(gcloud iam workload-identity-pools describe "$POOL" --location=global \
  --format='value(state)' --project="$PROJECT_ID" --account="$ACCOUNT" --quiet \
  --verbosity=none 2>/dev/null || true)
if [[ $pool_state == DELETED ]]; then
  gc iam workload-identity-pools undelete "$POOL" --location=global --format=none
elif [[ -z $pool_state ]]; then
  gc iam workload-identity-pools create "$POOL" --location=global --display-name='GitHub Actions' \
    --format=none
fi
mapping=google.subject=assertion.sub
mapping+=,attribute.repository_id=assertion.repository_id
mapping+=,attribute.repository_owner_id=assertion.repository_owner_id
mapping+=,attribute.ref=assertion.ref
mapping+=,attribute.workflow_ref=assertion.workflow_ref
mapping+=,attribute.event_name=assertion.event_name
WORKFLOW_REF="$FULL_NAME/.github/workflows/deploy.yml@refs/heads/main"
condition="assertion.repository_id == '$REPO_ID' && assertion.repository_owner_id == '$OWNER_ID'"
condition+=" && assertion.ref == 'refs/heads/main' && assertion.event_name == 'push'"
condition+=" && assertion.workflow_ref == '$WORKFLOW_REF'"
provider_state=$(gcloud iam workload-identity-pools providers describe "$PROVIDER" \
  --location=global --workload-identity-pool="$POOL" --format='value(state)' \
  --project="$PROJECT_ID" --account="$ACCOUNT" --quiet --verbosity=none 2>/dev/null || true)
if [[ $provider_state == DELETED ]]; then
  gc iam workload-identity-pools providers undelete "$PROVIDER" --location=global \
    --workload-identity-pool="$POOL" --format=none
fi
operation=create-oidc
if [[ -n $provider_state ]]; then operation=update-oidc; fi
gc iam workload-identity-pools providers "$operation" "$PROVIDER" --location=global \
  --workload-identity-pool="$POOL" --issuer-uri=https://token.actions.githubusercontent.com \
  --attribute-mapping="$mapping" --attribute-condition="$condition" --format=none
POOL_NAME="projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$POOL"
gc iam service-accounts add-iam-policy-binding "$DEPLOYER" \
  --member="principalSet://iam.googleapis.com/$POOL_NAME/attribute.repository_id/$REPO_ID" \
  --role=roles/iam.workloadIdentityUser --format=none
note "Only $WORKFLOW_REF (push) can act as $DEPLOYER."

# -------------------------------------------------------------------------------------------------
step "GitHub repository variables ($FULL_NAME)"
set_variable() {
  gh variable set "$1" --repo "$FULL_NAME" --body "$2" >/dev/null
  note "$1 = $2"
}
set_variable GCP_PROJECT_ID "$PROJECT_ID"
set_variable GCP_REGION "$REGION"
set_variable GCP_WORKLOAD_IDENTITY_PROVIDER "$POOL_NAME/providers/$PROVIDER"
set_variable GCP_DEPLOY_SERVICE_ACCOUNT "$DEPLOYER"
set_variable GCP_RUNTIME_SERVICE_ACCOUNT "$RUNTIME"
set_variable GCP_ARTIFACT_REPOSITORY "$REGION-docker.pkg.dev/$PROJECT_ID/$ARTIFACT_REPOSITORY"
set_variable CLOUD_RUN_SERVICE "$SERVICE"

step 'GitHub repository settings'
if gh api "repos/$FULL_NAME/branches/dev" --silent >/dev/null 2>&1; then
  gh repo edit "$FULL_NAME" --default-branch dev >/dev/null
  note 'dev is the default branch.'
fi
gh repo edit "$FULL_NAME" --enable-squash-merge --enable-merge-commit --delete-branch-on-merge >/dev/null
note 'Squash and merge commits allowed; a branch is deleted when its PR merges.'

# The repository is public: GitHub scans every push for secrets and blocks a push that has one.
gh api --method PATCH "repos/$FULL_NAME" --input - --silent <<'JSON'
{"security_and_analysis": {
  "secret_scanning": {"status": "enabled"},
  "secret_scanning_push_protection": {"status": "enabled"}
}}
JSON
note 'Secret scanning and push protection are on.'
for feature in secret_scanning_non_provider_patterns secret_scanning_validity_checks; do
  if gh api --method PATCH "repos/$FULL_NAME" --silent \
    -f "security_and_analysis[$feature][status]=enabled" >/dev/null 2>&1; then
    note "${feature//_/ } on."
  else
    note "${feature//_/ } is not offered for this repository; skipped."
  fi
done

if [[ -n $SKIP_BRANCH_PROTECTION ]]; then
  note 'Branch protection skipped (SKIP_BRANCH_PROTECTION).'
else
  for branch in dev main; do
    # PRs into dev must be up to date with it; the release PR into main is checked again after merging.
    strict=false
    if [[ $branch == dev ]]; then strict=true; fi
    gh api --method PUT "repos/$FULL_NAME/branches/$branch/protection" --input - --silent <<JSON
{
  "required_status_checks": {"strict": $strict, "contexts": ["PR route", "Website checks", "Container image", "Secret scan"]},
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 0
  },
  "restrictions": null,
  "required_conversation_resolution": true,
  "allow_force_pushes": false,
  "allow_deletions": false
}
JSON
    note "$branch only changes through PRs with green 'PR route', 'Website checks', 'Container image' and 'Secret scan'."
  done
fi

step 'Leftover branches (only dev and main stay)'
# A branch goes when nothing would be lost: its commits are already in dev or main, or its latest
# commit belongs to a closed PR (GitHub keeps those commits, and the PR page can restore the
# branch). Branches with an open PR, or with work no PR has seen, are kept and listed.
while IFS=$'\t' read -r name sha <&3; do
  [[ $name == dev || $name == main ]] && continue
  head="$OWNER_LOGIN:${name//\//%2F}"
  if [[ $(gh api "repos/$FULL_NAME/pulls?state=open&head=$head" --jq length) != 0 ]]; then
    note "Kept $name (open PR)."
    continue
  fi
  reason=
  for base in dev main; do
    ahead=$(gh api "repos/$FULL_NAME/compare/$base...$name" --jq .ahead_by 2>/dev/null || true)
    if [[ $ahead == 0 ]]; then reason="already merged"; fi
  done
  if [[ -z $reason ]]; then
    closed=$(gh api "repos/$FULL_NAME/pulls?state=closed&per_page=100&head=$head" \
      --jq "[.[] | select(.head.sha == \"$sha\")][0].number // empty")
    if [[ -n $closed ]]; then reason="PR #$closed closed"; fi
  fi
  if [[ -n $reason ]]; then
    gh api --method DELETE "repos/$FULL_NAME/git/refs/heads/$name" --silent
    note "Deleted $name ($reason)."
  else
    note "Kept $name (has commits no PR has merged or closed)."
  fi
done 3< <(gh api "repos/$FULL_NAME/branches" --paginate --jq '.[] | [.name, .commit.sha] | @tsv')

# -------------------------------------------------------------------------------------------------
printf '\n\033[32mAll set. Nothing else to configure.\033[0m\n'
echo 'Merging a dev -> main PR now builds the container and deploys it to Cloud Run.'
echo "Service: $ORIGIN (public site: https://garbar.tech)"
