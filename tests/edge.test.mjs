import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { afterEach, mock, test } from "node:test";

const source = await readFile(new URL("../edge/worker.js", import.meta.url), "utf8");
const { default: worker } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
afterEach(() => mock.restoreAll());

test("only the company domains can use the proxy", async () => {
  const upstream = mock.method(globalThis, "fetch", () => assert.fail("Unexpected upstream request"));
  const response = await worker.fetch(new Request("https://unrelated.example/"));
  assert.equal(response.status, 404);
  assert.equal(upstream.mock.callCount(), 0);
});

test("HTTP and www redirect to the canonical host without losing the page or query", async () => {
  for (const host of ["http://garbar.tech", "http://www.garbar.tech", "https://www.garbar.tech"]) {
    const response = await worker.fetch(new Request(`${host}/es/privacy/?source=test`));
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("Location"), "https://garbar.tech/es/privacy/?source=test");
  }
});

test("write methods never reach the public static origin", async () => {
  mock.method(globalThis, "fetch", () => assert.fail("Unexpected upstream request"));
  const response = await worker.fetch(new Request("https://garbar.tech/", { method: "POST" }));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET, HEAD");
});

test("a scheme-relative path cannot change the upstream host or forward credentials", async () => {
  mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url.origin, "https://garbar-web-73xqjacdbq-no.a.run.app");
    assert.equal(url.pathname, "//unrelated.example/en/");
    assert.equal(url.search, "?x=1");
    assert.equal(options.method, "HEAD");
    assert.equal(options.headers.has("Authorization"), false);
    assert.equal(options.headers.get("X-Forwarded-Host"), "garbar.tech");
    return new Response(null, { headers: { "Cache-Control": "public, max-age=60" } });
  });
  const response = await worker.fetch(new Request("https://garbar.tech//unrelated.example/en/?x=1", {
    method: "HEAD", headers: { Authorization: "test-only" },
  }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=60");
  assert.equal(response.headers.get("Strict-Transport-Security"), "max-age=31536000");
});

test("upstream redirects retain the public domain", async () => {
  for (const location of ["/en/?x=1", "https://garbar-web-73xqjacdbq-no.a.run.app/en/?x=1"]) {
    mock.method(globalThis, "fetch", async () => new Response(null, {
      status: 308, headers: { Location: location },
    }));
    const response = await worker.fetch(new Request("https://garbar.tech/en?x=1"));
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("Location"), "https://garbar.tech/en/?x=1");
    mock.restoreAll();
  }
});

test("origin failures produce an uncached gateway error", async () => {
  mock.method(globalThis, "fetch", async () => { throw new Error("test-only outage"); });
  const response = await worker.fetch(new Request("https://garbar.tech/"));
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
});
