import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const locales = ["en", "es", "ca"];
const sections = ["", "legal/", "privacy/", "terms/"];
export const pagePaths = ["/", ...locales.flatMap(locale => sections.map(section => `/${locale}/${section}`))];

export async function verifySite(base) {
  const assets = new Set();
  const pages = await Promise.all(pagePaths.map(async path => {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("X-Content-Type-Options"), "nosniff", path);
    assert.equal(response.headers.get("X-Frame-Options"), "DENY", path);
    const html = await response.text();
    const locale = path.split("/")[1] || "en";
    const canonical = path === "/" ? "/en/" : path;
    assert.match(html, new RegExp(`<html[^>]+lang="${locale}"`), path);
    assert.ok(html.includes(`rel="canonical" href="https://garbar.tech${canonical}"`), `canonical: ${path}`);
    assert.ok(html.includes('content="index, follow"'), `indexing: ${path}`);
    assert.ok(html.includes("info@garbar.tech"), `contact: ${path}`);
    assert.ok(!html.includes("main@garbar.tech"), `old contact: ${path}`);
    assert.ok(!html.includes("chatgpt.site"), `private preview URL: ${path}`);
    const taskflow = locale === "en" ? "/?lang=en" : `/${locale}/`;
    assert.ok(html.includes(`href="https://taskflow.garbar.tech${taskflow}"`), `TaskFlow link: ${path}`);
    assert.ok(html.includes(`href="https://lucidsaga.garbar.tech/${locale}"`), `Lucid Saga link: ${path}`);
    if (path.includes("/privacy/")) {
      assert.match(html, /Google Cloud Run/, path);
      assert.match(html, /Cloudflare/, path);
      assert.match(html, /cloud.google.com\/terms\/data-processing-addendum/, path);
    }
    for (const [, value] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
      const url = new URL(value.replaceAll("&amp;", "&"), "https://garbar.tech");
      if (url.origin === "https://garbar.tech" && !pagePaths.includes(url.pathname)) {
        assets.add(url.pathname + url.search);
      }
    }
    return path;
  }));
  await Promise.all([...assets].map(async path => {
    const response = await fetch(new URL(path, base), { method: "HEAD", signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200, `asset: ${path}`);
    if (path.startsWith("/_next/static/")) {
      assert.match(response.headers.get("Cache-Control"), /immutable/, path);
    }
  }));
  const robots = await (await fetch(new URL("/robots.txt", base))).text();
  assert.match(robots, /Sitemap: https:\/\/garbar.tech\/sitemap.xml/);
  assert.ok(!robots.includes("Disallow: /\n"));
  const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
  for (const path of pagePaths.slice(1)) assert.ok(sitemap.includes(`https://garbar.tech${path}`), path);
  assert.ok(!sitemap.includes("chatgpt.site"));
  return { pages: pages.length, assets: assets.size };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const base = process.argv[2] || "https://garbar.tech";
  const result = await verifySite(base);
  console.log(`Verified ${result.pages} pages and ${result.assets} assets at ${base}.`);
}
