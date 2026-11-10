# Public Cloud Run deployment

The public company website uses:

- Google Cloud project: `garbar-tech` (`440941551109`).
- Region: `europe-southwest1` (Madrid).
- Cloud Run service: `garbar-web`.
- Automatic scaling: service minimum **0**, maximum **3** instances; request-based CPU allocation.
- Container: one CPU, 256 MiB memory, port 8080, concurrency 80.
- Canonical website: `https://garbar.tech`.

The Next.js/TypeScript app is built into static HTML and assets inside the Docker build. A small
Node process serves that output as the non-root `node` user. The public image is built with
`SITE_URL=https://garbar.tech`, `INDEX_SITE=true` and `HOSTING_PROVIDER=google-cloud-run`, including
the correct public canonical links, sitemap and hosting information in all three privacy pages.

## One-time setup

Run this once, in WSL (Ubuntu), from the repository root:

```sh
bash infra/setup.sh
```

It is the only manual step, and it is safe to run again. It installs `gcloud` and `gh` with apt
if they are missing (asking for the sudo password), opens the Windows browser through `wslview`
to sign in to Google Cloud (`tech.garbar@gmail.com`) and GitHub only when needed, then sets up
everything else itself:

- **Google Cloud:** enables the APIs; creates the `garbar-web` image repository (keeping the
  newest 10 images and anything under 30 days old), the build bucket for manual deploys and
  three service accounts: `garbar-web-runtime` (runs the site, no roles), `garbar-web-builder`
  (manual Cloud Build) and `garbar-web-deployer` (GitHub Actions). It makes sure the Cloud Run
  service exists, is public and scales from 0 to 3 instances.
- **Workload Identity Federation:** the pool `github-actions` and provider `garbar-web-main` only
  accept GitHub's token for this repository and owner (by id), from `deploy.yml` on a push to
  `main`. Only that token can act as the deployer. No service-account key exists anywhere.
- **Deployer permissions:** Artifact Registry Writer on the image repository, Cloud Run Developer
  on this one service, and Service Account User on the runtime account. No project-wide roles.
- **GitHub:** saves the ids as repository variables (below), makes `dev` the default branch,
  turns on GitHub secret scanning and push protection and Dependabot alerts and security
  updates, and protects `dev` and `main`: changes
  only through PRs with green **PR route**, **Website checks**, **Container image** and
  **Secret scan**, resolved conversations, no force pushes or deletion, admins included. No
  review from another person is required. `SKIP_BRANCH_PROTECTION=1` leaves protection alone.
  It turns on deleting a branch when its PR merges, and deletes leftover branches whose work is
  already merged or whose PR was closed, so only `dev` and `main` remain. Branches with an open
  PR or unmerged work are kept and listed.

| Repository variable | Value |
| --- | --- |
| `GCP_PROJECT_ID` | `garbar-tech` |
| `GCP_REGION` | `europe-southwest1` |
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | `projects/440941551109/locations/global/workloadIdentityPools/github-actions/providers/garbar-web-main` |
| `GCP_DEPLOY_SERVICE_ACCOUNT` | `garbar-web-deployer@garbar-tech.iam.gserviceaccount.com` |
| `GCP_RUNTIME_SERVICE_ACCOUNT` | `garbar-web-runtime@garbar-tech.iam.gserviceaccount.com` |
| `GCP_ARTIFACT_REPOSITORY` | `europe-southwest1-docker.pkg.dev/garbar-tech/garbar-web` |
| `CLOUD_RUN_SERVICE` | `garbar-web` |

None of these is a secret, and no GitHub secret is needed. If a variable is missing, the deploy
stops at its first step and says to run the setup script.

## GitHub Actions

**`ci.yml`** runs on every PR into `dev` or `main` and on every push to `dev`:

- **Website checks:** shellcheck on `infra/`, TypeScript, the edge Worker tests, the production
  build and the site tests.
- **Container image:** builds the Dockerfile, runs the image as Cloud Run does and tests all 13
  pages, their assets, the sitemap and the headers against it.

A newer push to a PR cancels its older run.

**`pr-route.yml`** (**PR route**) fails a PR that isn't a feature PR into `dev` or this
repository's `dev` into `main`. It is its own workflow so that editing a PR's text re-runs only
this check, while moving a PR to another base branch still re-checks it.

**`deploy.yml`** runs when a `dev` → `main` PR is merged, and only then:

1. Checks the repository variables exist and that the `main` commit is the merge of a
   same-repository `dev` PR. Direct pushes to `main` never deploy, and an older release is
   skipped when a newer one is already on `main`.
2. Runs the website checks again on the merged commit.
3. Builds the image, signs in to Google through Workload Identity Federation, pushes it, and
   deploys it to Cloud Run by digest with automatic scaling from **0** to **3** instances.
4. Checks the service settings and tests every page on the new revision. If either fails, traffic
   goes back to the revision that served before, and the run fails.
5. Tests the public site through Cloudflare.

Deploys run one at a time and are never cancelled half way.

Cloudflare's `garbar-web-edge` Worker keeps the same Cloud Run URL across revisions, so ordinary
deploys never touch `edge/`.

## Dependabot

Dependabot watches the site's npm packages, the image's Node (both stages of the `Dockerfile`) and
the workflows' actions. It is free, and stays free if the repository goes private. The same rules
apply in every GarBar repository.

- **Alerts** list each known vulnerability under the repository's Security tab.
- **Security updates** open a PR into `dev`, the default branch, as soon as an advisory affects a
  package and a fixed version exists. They never wait.
- **Version updates** ([`.github/dependabot.yml`](../.github/dependabot.yml)) open PRs into `dev`
  once a week, early on Monday (04:00 Madrid time). React and its types move together; the other
  minor and patch updates share one PR per ecosystem, and each major update gets its own. A
  release waits 7 days before it is offered, so a broken or hijacked release is usually pulled
  first. A new major Node (and its `@types/node`) is a PR of its own.

Alerts and security updates are switched on in the repository's settings, not in the file (since
2026-11-10; `infra/setup.sh` keeps them on, and
`gh api repos/Mikigb77/GarBar-Tech_web/automated-security-fixes` shows whether they still are). CI
and the deploy read the Node version from the `Dockerfile`, so an update of the image's Node is
checked on the new Node, and `npm run test:repo` fails if a Dependabot entry doesn't target `dev`.

### The weekly pass

A scheduled Claude pass at 06:09 Madrid time on Mondays works through every open Dependabot PR,
security updates first (Miki, 2026-11-10). A Dependabot PR is merged like any other: CI must be
green and it is squash-merged into `dev`.

- A green patch or minor update is merged.
- A major update is merged when CI is green and its release notes change nothing that affects the
  site. One that changes behavior, cost or licence is left for Miki.
- When CI is red, a small, clear fix goes on the Dependabot branch. Otherwise the PR is closed with
  the reason, and a version that can't work yet gets an `ignore` with the reason in
  `dependabot.yml`.
- A merged security fix to something that ships (the npm packages or the image) is deployed the
  same morning through a `dev` → `main` PR, one deploy at a time. Everything else ships with the
  next deploy.
- The pass reads the repository's open alerts and notes any that are new or changed.

### The weekly report

By 07:55 Madrid time the pass files one GitHub issue in each repository that has something to
report, labelled `dependabot-report` and assigned to Miki, so one search lists every open report:
[label:dependabot-report assignee:Mikigb77](https://github.com/issues?q=is%3Aopen+is%3Aissue+label%3Adependabot-report+assignee%3AMikigb77).
A week with no Dependabot PR to handle, no new or changed alert and nothing merged, closed or
deployed files nothing. The title (`[high] Dependabot report, YYYY-MM-DD`) and an `urgency:` label
say how soon it needs Miki:

- **high**, act today: something that ships is exposed or broken. An alert on a dependency that
  ships is still open after the pass, a deploy or rollback failed, or `dev` or `main` is red because
  of an update.
- **medium**, decide this week: something only Miki can decide is waiting, such as a major update
  that changes behavior, cost or licence, or a red update with no clear fix.
- **low**, for the record: updates were merged, closed or deployed, and nothing needs Miki.

The report opens with what Miki needs to do, or "Nothing for you to do.", then lists what needs
Miki, what merged, closed (with the reason), deployed or is still pending, and any new alert, with
links. An alert already reported and unchanged isn't repeated. Work still running at 07:55 is
finished afterwards and added as a comment. The next week's report closes a low one; a high or
medium report stays open until what it asks for is done.

## Manual recovery deployment

Only when GitHub Actions can't deploy. In WSL, from a clean, committed checkout (`--bootstrap` runs the
setup script first):

```sh
bash infra/deploy-cloud.sh
```

Cloud Build builds the Dockerfile from this commit, pushes the image and Cloud Run deploys it by
digest. The script sets automatic scaling with minimum 0 and maximum 3 on every deployment and
tests every page through the service's generated URL. The website is public; the
runtime does not require a ChatGPT account or product sign-in.

Cloudflare's `garbar-web-edge` Worker forwards the root domain to the returned Cloud Run origin.
Its exact origin and custom-domain routing are recorded in `edge/`. `www.garbar.tech` redirects to
the apex domain while preserving paths and query strings. Cloudflare manages the DNS and TLS
certificates for those two Worker custom domains.

The deployed origin is `https://garbar-web-73xqjacdbq-no.a.run.app`. Worker code and its two
custom-domain routes are in `edge/worker.js` and `edge/wrangler.jsonc`. Its `workers.dev` and
preview endpoints are disabled. Subsequent Cloud Run revisions retain this service URL, so
ordinary website deployments do not require editing the Worker.

The existing TaskFlow, Lucid Saga and mail records are separate from this website's routes.
The original G logo remains in `design/brand/archive/g-mark-v1/`.

## Scaling and rollback

Minimum 0 allows Cloud Run to stop every instance when idle. The next visit starts an instance.
The maximum bounds service instance scaling; stored images, builds and traffic have their own
provider billing. No always-on load balancer is used.

Inspect the configured service:

```sh
gcloud run services describe garbar-web --region=europe-southwest1 --project=garbar-tech --account=tech.garbar@gmail.com
```

To roll back, use Cloud Run's Revisions tab or `gcloud run services update-traffic` with the exact
previous revision name and the same explicit project/account/region. The Cloudflare origin stays
the same across website revisions. A rollback pins traffic to that revision; the next deploy from
GitHub Actions sends traffic back to its own new revision.
