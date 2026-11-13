# Company content

The owner confirmed on 8 November 2026 that this site should introduce the company and its own
products, TaskFlow and Lucid Saga, as an innovation and technology company. Client development
services are outside this site's current brief. SES Systems is not presented as a company-owned
product.

The public brand is **GarBar**, with capital G and B, as specified by the owner. The GB monogram
uses a shared stem with an orange B. The registered legal entity remains GARBAR, IN-TEC, S.L.
The original G artwork is preserved in `design/brand/archive/g-mark-v1/` at the owner's request.
Privacy and terms are adapted from TaskFlow to this company's website: see `docs/LEGAL.md`.

## Sources

- Registered name, NIF, registered address and commercial-register entry: the company records
  already used in `Mikigb77/TaskFlowWeb`, `src/content/legal/company.json`, and
  `Mikigb77/LucidSaga_Web`, `src/content/legal/company.ts`.
- General company contact: `garbar@garbar.tech`, and the support team: `garbar.support@garbar.tech`
  (the owner, 13 November 2026). Product-specific support remains on each product website, with
  each product's own addresses.
- TaskFlow's capabilities and coming-soon status: `TaskFlowWeb/src/content/site/en.ts` and
  [its website](https://taskflow.garbar.tech). Its product card follows that website's home page
  (the "Nova" design in the Lagoon palette, chosen by the owner on 9 November 2026, in the GarBar
  family's type since 10 November): the title and its mint accent, the five feature titles, the
  voice example, and the app's own dark Calendar screen in each language
  (`public/images/hero-calendar-*-dark.png` there, `public/images/taskflow/` here). Its mark is that
  website's favicon, the Lagoon gradient tile (`public/favicon.svg` there).
- Lucid Saga's capabilities and coming-soon status: `LucidSaga_Web/src/i18n/dictionaries/` and
  [its website](https://lucidsaga.garbar.tech). Its gate (`src/assets/gate.webp`, the 4K repaint the
  owner picked on 10 November 2026) and icon (`src/assets/icon-96.png`) come from there, as do its
  Literata fonts (`src/fonts/`); the well-at-dusk scene and its words in the hero console come from
  its demo (`demo` in the dictionaries, `src/assets/scenes/`); the world covers in
  `public/images/worlds/` and their titles in `src/content/worlds.ts` come from
  `src/content/worlds.ts` and `src/assets/worlds/`.
- "Coming soon to Google Play" and the trademark line: both product websites' own badge and footer
  wording. The badge is drawn, not Google's, and isn't a link while neither app is on Google Play.
- "Three languages in each product": TaskFlow's ARB files (`App/lib/l10n/app_{en,es,ca}.arb`) and
  Lucid Saga's (`PlayableAnime/app/lib/l10n/app_{en,es,ca}.arb`).
- Privacy-rights reference: [AEPD: Ejerce tus derechos](https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos).

Company positioning and design principles describe an intention, not a claim about customer
numbers, staffing, awards, investment or commercial traction. No such statistics or testimonials
are invented. Neither product has a download button while it is still coming soon.

## Design

Night throughout, with the coral of the GB's B (`#ff5b35`) as the one loud colour. The product
websites both open dark (TaskFlow's WD39: "it feels very weird to have white as the background"),
so this site does too, with a band a shade lighter for How we work and night cards on it. Each
product keeps its own palette and look: TaskFlow's Lagoon from its website (night teal and mint,
the lime now mint as there, Manrope titles with a shimmering mint accent), Lucid Saga's night and
gold with its Literata type. The GB monogram keeps the owner's geometry, with round caps, and the
favicon and Apple icon put it on a night tile.

The site shares the GarBar family's parts with both product websites: the floating header with
EN · ES · CA, ringed section labels, a running tape, the drawn "Coming soon to Google Play" badge, a
soft glow that follows the mouse (coral here, green and gold there), and the same footer: the brand
and a line, Made in Barcelona, three columns with each product's icon, the fine print with the
trademark line, the languages and Back to top, over the name in outline.

The page moves: drifting colour behind the night sections, a hero console that types a phrase and
lets each product answer it, a marquee, a statement that lights up word by word as it scrolls,
reveal-on-scroll entrances, pointer-following light, Lucid Saga's fireflies and drifting worlds,
and an orbiting, self-drawing monogram. `src/components/Motion.tsx` drives the scroll and pointer
effects and `src/components/CursorGlow.tsx` the mouse glow; the rest is CSS. Every animation stops
or settles under `prefers-reduced-motion: reduce`.

## Updates

Keep the English, Spanish and Catalan entries in `src/content/site.ts` aligned. When changing a
product claim, check its own source and website first. Preserve the company's registered details
unless the owner supplies an update. The company privacy page describes this website; it does
not replace the product privacy policies. Review it when adding analytics, forms, accounts or
other data processing.
