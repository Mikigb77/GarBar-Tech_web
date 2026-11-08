import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const brand = JSON.parse(
  await readFile(new URL("../src/content/brand.json", import.meta.url), "utf8"),
);
const output = new URL("../public/images/", import.meta.url);
await mkdir(output, { recursive: true });
const markIn = (ink) =>
  `<g fill="none" stroke-width="${brand.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="${brand.gPath}" stroke="${ink}"/><path d="${brand.bPath}" stroke="${brand.accent}"/></g>`;
const mark = markIn(brand.ink);
await writeFile(
  new URL("../public/brand-mark.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brand.viewBox}">${mark}</svg>\n`,
);
// The app-style icon: the paper G and coral B on a night tile.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 -4 56 56"><rect x="-4" y="-4" width="56" height="56" rx="14" fill="${brand.ink}"/>${markIn(brand.paper)}</svg>`;
await writeFile(new URL("../public/favicon.svg", import.meta.url), icon + "\n");
await sharp(Buffer.from(icon))
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(new URL("apple-icon.png", output)));
const font = `font-family="Manrope,Arial,sans-serif"`;
const share = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs>
  <radialGradient id="a" cx="0.1" cy="0.05" r="0.7"><stop offset="0" stop-color="${brand.accent}" stop-opacity="0.55"/><stop offset="1" stop-color="${brand.accent}" stop-opacity="0"/></radialGradient>
  <radialGradient id="b" cx="0.95" cy="0.6" r="0.6"><stop offset="0" stop-color="#b9852f" stop-opacity="0.45"/><stop offset="1" stop-color="#b9852f" stop-opacity="0"/></radialGradient>
  <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="${brand.accent}"/><stop offset="0.55" stop-color="#ff9a3c"/><stop offset="1" stop-color="#e3b66b"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="${brand.ink}"/><rect width="1200" height="630" fill="url(#a)"/><rect width="1200" height="630" fill="url(#b)"/>
<g transform="translate(76 58) scale(1.3)">${markIn(brand.paper)}</g>
<text x="152" y="102" ${font} font-weight="800" font-size="36" letter-spacing="-1.5" fill="${brand.paper}">${brand.name}</text>
<text x="76" y="300" ${font} font-weight="800" font-size="84" letter-spacing="-4.5" fill="${brand.paper}">Tools for your day.</text>
<text x="76" y="396" ${font} font-weight="800" font-size="84" letter-spacing="-4.5" fill="${brand.paper}">Worlds for your <tspan fill="url(#t)">imagination.</tspan></text>
<path d="M76 486h1048" stroke="#ffffff" stroke-opacity="0.12"/>
<text x="76" y="544" ${font} font-weight="700" font-size="22" fill="#a9aab0">TaskFlow  ·  Lucid Saga</text>
<text x="1124" y="544" text-anchor="end" ${font} font-weight="700" font-size="16" letter-spacing="3" fill="#a9aab0">BARCELONA</text>
</svg>`;
await sharp(Buffer.from(share))
  .png()
  .toFile(fileURLToPath(new URL("share.png", output)));
