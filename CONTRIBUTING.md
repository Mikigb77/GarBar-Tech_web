# Working on GarBar

The default branch is `dev`. Start a feature branch from it, then open a PR back into `dev`.
The CI workflow checks TypeScript, tests edge routing and failures, builds Next.js for the public
domain, and tests all 13 exported pages, assets, privacy notices, metadata and HTTP behavior.

```sh
git switch dev
git pull --ff-only
git switch -c codex/your-change
```

When `dev` is ready to publish, open a PR **from this repository's `dev` branch into `main`**.
Use a merge commit. Opening the PR runs CI; merging it starts the production deployment. The
deployment verifies the merged PR, reruns CI, builds and pushes an image, deploys its digest to
Cloud Run, and checks the public website through Cloudflare. A feature PR never deploys.

The metadata-only PR policy automatically closes PRs outside this flow. It does not check out
or execute PR code. Production accepts only the exact merge commit of a merged `dev` → `main`
PR; an ordinary direct push to `main` fails the release gate.

## GitHub plan limitation

GitHub currently returns HTTP 403 for branch protection on this private repository and requires
GitHub Pro or a qualifying plan. Until that is available, GitHub cannot prevent maintainers from
pushing directly or merging with failed checks. Follow the PR flow and wait for **Website checks**
to pass. The PR policy and deployment gate remain active, but are not a substitute for protected
branches. Repository administrators can also change workflows and settings.

Once the plan supports protection, run `pwsh -File infra/protect-branches.ps1`. It requires PRs,
passing `Website checks`, resolved conversations, and disables force pushes and deletion on both
branches, including for admins. It does not require another person's review. `dev` checks must
be up to date; release checks are also rerun after a merge to `main` before deployment.

## Run the checks locally

Use Node 22.12 or later. Build the public variant before the integration tests:

```powershell
npm ci
npm run typecheck
$env:SITE_URL = 'https://garbar.tech'
$env:INDEX_SITE = 'true'
$env:HOSTING_PROVIDER = 'google-cloud-run'
npm run build
npm test
```

The site tests start and stop their own static server on `127.0.0.1:43107`. They do not call the
product websites or need cloud credentials. `npm run smoke` separately checks the published site.
