#!/usr/bin/env bash
# Manual recovery deploy, only for when GitHub Actions can't deploy. Run in WSL from a clean,
# committed checkout:
#
#   bash infra/deploy-cloud.sh              # build this commit with Cloud Build and deploy it
#   bash infra/deploy-cloud.sh --bootstrap  # run infra/setup.sh first
set -euo pipefail

PROJECT_ID=${PROJECT_ID:-garbar-tech}
ACCOUNT=${ACCOUNT:-tech.garbar@gmail.com}
REGION=${REGION:-europe-southwest1}
SERVICE=${SERVICE:-garbar-web}
BUILDER="garbar-web-builder@$PROJECT_ID.iam.gserviceaccount.com"
RUNTIME="garbar-web-runtime@$PROJECT_ID.iam.gserviceaccount.com"

gc() { gcloud "$@" --project="$PROJECT_ID" --account="$ACCOUNT" --quiet; }

cd "$(dirname "$0")/.."
if [[ ${1:-} == --bootstrap ]]; then bash infra/setup.sh; fi
if [[ -n $(git status --porcelain) ]]; then
  echo 'Commit the intended website source before deploying.' >&2
  exit 1
fi
revision=$(git rev-parse HEAD)
project_number=$(gc projects describe "$PROJECT_ID" --format='value(projectNumber)')
image="$REGION-docker.pkg.dev/$PROJECT_ID/garbar-web/web:$revision"

gc builds submit . --config=cloudbuild.yaml --region="$REGION" --substitutions="_IMAGE=$image" \
  --service-account="projects/$PROJECT_ID/serviceAccounts/$BUILDER" \
  --gcs-source-staging-dir="gs://garbar-web-builds-$project_number/source"
digest=$(gc artifacts docker images describe "$image" \
  --format='value(image_summary.fully_qualified_digest)')
if [[ ! $digest =~ @sha256:[a-f0-9]{64}$ ]]; then
  echo 'The image digest could not be verified.' >&2
  exit 1
fi
gc run deploy "$SERVICE" --image="$digest" --region="$REGION" --service-account="$RUNTIME" \
  --port=8080 --cpu=1 --memory=256Mi --concurrency=80 --timeout=30s --cpu-throttling \
  --scaling=auto --min=0 --max=3 --allow-unauthenticated --ingress=all \
  --update-labels="app=garbar-web,source-commit=$revision,managed-by=manual"
gc run services update-traffic "$SERVICE" --region="$REGION" --to-latest
origin=$(gc run services describe "$SERVICE" --region="$REGION" --format='value(status.url)')
node scripts/verify-site.mjs "$origin"
echo "Cloud Run origin: $origin"
echo 'Automatic scaling: minimum 0, maximum 3 instances.'
