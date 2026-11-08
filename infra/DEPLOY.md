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

Run this once from the repository root, on a computer with PowerShell 7:

```powershell
pwsh -File infra/setup.ps1
```

It is the only manual step, and it is safe to run again. It installs `gcloud` and `gh` with winget
if they are missing, opens the browser to sign in to Google Cloud (`tech.garbar@gmail.com`) and
GitHub only when needed, then sets up everything else itself:

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
- **GitHub:** saves the ids as repository variables (below), makes `dev` the default branch and
  protects `dev` and `main`: changes only through PRs with green **Website checks** and
  **Container image**, resolved conversations, no force pushes or deletion, admins included. No
  review from another person is required. Pass `-SkipBranchProtection` to leave protection alone.

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

- **Website checks:** the PR route (feature PRs go into `dev`; only this repository's `dev` goes
  into `main`), TypeScript, the edge Worker tests, the production build and the site tests.
- **Container image:** builds the Dockerfile, runs the image as Cloud Run does and tests all 13
  pages, their assets, the sitemap and the headers against it.

A newer push to a PR cancels its older run.

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

Deploys run one at a time and are never cancelled half way. `dependabot.yml` keeps the
SHA-pinned actions current with a monthly PR into `dev`.

Cloudflare's `garbar-web-edge` Worker keeps the same Cloud Run URL across revisions, so ordinary
deploys never touch `edge/`.

## Manual recovery deployment

Only when GitHub Actions can't deploy. From a clean, committed checkout (`-Bootstrap` runs the
setup script first):

```powershell
pwsh -File infra/deploy-cloud.ps1
```

Cloud Build builds the Dockerfile from this commit, pushes the image and Cloud Run deploys it by
digest. The script sets automatic scaling with minimum 0 and maximum 3 on every deployment and
checks the English homepage through the service's generated URL. The website is public; the
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

```powershell
gcloud run services describe garbar-web --region=europe-southwest1 --project=garbar-tech --account=tech.garbar@gmail.com
```

To roll back, use Cloud Run's Revisions tab or `gcloud run services update-traffic` with the exact
previous revision name and the same explicit project/account/region. The Cloudflare origin stays
the same across website revisions. A rollback pins traffic to that revision; the next deploy from
GitHub Actions sends traffic back to its own new revision.
