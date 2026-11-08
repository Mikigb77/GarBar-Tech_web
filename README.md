# GarBar

The company website for **GARBAR, IN-TEC, S.L.**, the Barcelona technology company behind
[TaskFlow](https://taskflow.garbar.tech) and [Lucid Saga](https://lucidsaga.garbar.tech).

Next.js 16 App Router, TypeScript, React and CSS. English, Spanish and Catalan. Pages are generated
as static HTML, so the site needs no application server, database or API credentials.

## Work locally

Node 22.12 or later:

```sh
npm ci
npm run dev       # http://127.0.0.1:3100
npm run check     # generated route types and TypeScript
npm run build     # production site in out/
npm run preview   # production preview at http://127.0.0.1:3107
```

The homepage is at `/` and `/en/`, `/es/`, `/ca/`. Each language also has `/legal/`, `/privacy/` and `/terms/`.
The language switch preserves the information page being read. The root serves English; there
is no automatic language redirect or language cookie.

## Source

- `src/content/site.ts`: company facts and every language's copy.
- `src/content/brand.json`: the GarBar name and shared GB logo geometry.
- `src/content/policies.ts`: privacy and terms adapted from TaskFlow for the company website.
- `src/components/`: the company and information pages, navigation, footer and email copy button.
- `src/app/[[...path]]/`: statically generated routes, locale-aware HTML and metadata.
- `src/app/globals.css`: layout, responsive styling and reduced-motion support.
- `public/images/`: actual TaskFlow app screens and Lucid Saga artwork, reused from their repositories.
- `src/fonts/`: the self-hosted Manrope font and its SIL Open Font License.
- `scripts/create-brand-assets.mjs`: renders the shared GB artwork into SVG, social and Apple icons.
- `design/brand/archive/g-mark-v1/`: the preserved original G logo and favicon, independent of builds.

There are no analytics scripts, advertising trackers, contact forms or external font requests.
Contact opens an email draft to `info@garbar.tech`; copying the address does not send a message.
Both products are presented as in development and coming soon to Android.

## Publishing

The private Sites publication is identified by `.openai/hosting.json`; its static directory is
`out`. Website source remains in this repository. The Sites source workflow commits and pushes
the matching source to its managed repository without replacing this repository's GitHub origin.

`SITE_URL` controls canonical URLs and the sitemap at build time. It defaults to the private Sites
address. Search indexing is disabled by default. For an intentional public launch on a company
domain, build with `SITE_URL=https://garbar.tech` and `INDEX_SITE=true`, then deploy `out/` to that
domain. A source change alone does not change Cloudflare DNS or publish to `garbar.tech`.

Content provenance and update guidance: [docs/CONTENT.md](docs/CONTENT.md).
Legal scope and references: [docs/LEGAL.md](docs/LEGAL.md).
