# Working on GarBar

The default branch is `dev`. Start a feature branch from it, then open a PR back into `dev`.
The CI workflow checks TypeScript, tests edge routing and failures, builds Next.js for the public
domain, and tests all 13 exported pages, assets, privacy notices, metadata and HTTP behavior. It
also builds the Docker image, runs it and tests the same pages against the container.

```sh
git switch dev
git pull --ff-only
git switch -c your-change
```

When `dev` is ready to publish, open a PR **from this repository's `dev` branch into `main`**.
Use a merge commit. Opening the PR runs CI; merging it starts the production deployment. The
deployment verifies the merged PR, reruns CI, builds and pushes an image, deploys its digest to
Cloud Run, tests the new revision (rolling back if it fails), and checks the public website through
Cloudflare. A feature PR never deploys.

Production accepts only the exact merge commit of a merged `dev` → `main` PR; a direct push to
`main` fails the release gate.

## Protected branches

`dev` and `main` only change through PRs. Both need green **Website checks** and **Container
image** and resolved conversations; PRs into `dev` must also be up to date with it. Force pushes
and deletion are blocked, for admins too, and no review from another person is required. The
protection is set by `infra/setup.ps1` ([infra/DEPLOY.md](infra/DEPLOY.md)).

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
