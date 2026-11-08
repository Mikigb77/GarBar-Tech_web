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

## Initial infrastructure

With the existing `tech.garbar@gmail.com` gcloud login:

```powershell
pwsh -File infra/bootstrap-cloud.ps1
```

This enables the four required APIs and creates the website's Docker repository, private regional
build-source bucket and two service accounts. The runtime account has no project roles. The build
account can read this source bucket, write this image repository and emit build logs. No service
account keys are created. All commands explicitly name the project and account and preserve the
user's active gcloud configuration.

## Build and deploy

From a clean, committed checkout:

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
the same across website revisions.
