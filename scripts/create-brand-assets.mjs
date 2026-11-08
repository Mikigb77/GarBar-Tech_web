import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const output = new URL("../public/images/", import.meta.url);
await mkdir(output, { recursive: true });
const icon = await readFile(new URL("../public/favicon.svg", import.meta.url));
await sharp(icon)
  .resize(180, 180)
  .png()
  .toFile(fileURLToPath(new URL("apple-icon.png", output)));
const share = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f6f0"/><g transform="translate(74 59) scale(1.4)"><path d="M22 4H12a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V18H20v8h8v2H12V12h10V4Z" fill="#242720"/><path d="M28 4h8v8h-8z" fill="#f0643d"/></g><text x="151" y="96" font-family="Arial,sans-serif" font-weight="700" font-size="27" fill="#242720">GARBAR IN-TEC</text><text x="77" y="274" font-family="Arial,sans-serif" font-weight="700" font-size="88" letter-spacing="-4" fill="#242720">Good ideas.</text><text x="77" y="378" font-family="Arial,sans-serif" font-weight="700" font-size="88" letter-spacing="-4" fill="#858b77">Built into life.</text><path d="M77 477h1046" stroke="#d9dcd1"/><text x="80" y="535" font-family="Arial,sans-serif" font-size="20" fill="#686d61">TaskFlow</text><text x="228" y="535" font-family="Arial,sans-serif" font-size="20" fill="#686d61">Lucid Saga</text><text x="941" y="535" font-family="Arial,sans-serif" font-size="16" fill="#686d61">BARCELONA</text><g transform="translate(950 260)"><circle r="91" fill="#f0643d"/><path d="M-49 0h98M0-49v98M-35-35l70 70M-35 35l70-70" stroke="#f7f6f0" stroke-width="14" stroke-linecap="round"/></g></svg>`;
await sharp(Buffer.from(share))
  .png()
  .toFile(fileURLToPath(new URL("share.png", output)));
