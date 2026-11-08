import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const brand = JSON.parse(
  await readFile(new URL("../src/content/brand.json", import.meta.url), "utf8"),
);
const output = new URL("../public/images/", import.meta.url);
await mkdir(output, { recursive: true });
const mark = `<g fill="none" stroke-width="${brand.strokeWidth}" stroke-linejoin="round"><path d="${brand.gPath}" stroke="${brand.ink}"/><path d="${brand.bPath}" stroke="${brand.accent}"/></g>`;
await writeFile(
  new URL("../public/brand-mark.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brand.viewBox}">${mark}</svg>\n`,
);
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brand.viewBox}"><rect width="48" height="48" rx="10" fill="${brand.paper}"/>${mark}</svg>`;
await writeFile(new URL("../public/favicon.svg", import.meta.url), icon + "\n");
await sharp(Buffer.from(icon))
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(new URL("apple-icon.png", output)));
const share = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${brand.paper}"/><g transform="translate(74 48) scale(1.4)">${mark}</g><text x="159" y="99" font-family="Arial,sans-serif" font-weight="700" font-size="36" letter-spacing="-1" fill="${brand.ink}">${brand.name}</text><text x="77" y="274" font-family="Arial,sans-serif" font-weight="700" font-size="88" letter-spacing="-4" fill="${brand.ink}">Good ideas.</text><text x="77" y="378" font-family="Arial,sans-serif" font-weight="700" font-size="88" letter-spacing="-4" fill="#858b77">Built into life.</text><path d="M77 477h1046" stroke="#d9dcd1"/><text x="80" y="535" font-family="Arial,sans-serif" font-size="20" fill="#686d61">TaskFlow</text><text x="228" y="535" font-family="Arial,sans-serif" font-size="20" fill="#686d61">Lucid Saga</text><text x="941" y="535" font-family="Arial,sans-serif" font-size="16" fill="#686d61">BARCELONA</text><g transform="translate(950 260)"><circle r="91" fill="${brand.accent}"/><path d="M-49 0h98M0-49v98M-35-35l70 70M-35 35l70-70" stroke="#f7f6f0" stroke-width="14" stroke-linecap="round"/></g></svg>`;
await sharp(Buffer.from(share))
  .png()
  .toFile(fileURLToPath(new URL("share.png", output)));
