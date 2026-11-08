import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { after, before, test } from "node:test";
import { verifySite } from "../scripts/verify-site.mjs";

const base = "http://127.0.0.1:43107";
let server;
before(async () => {
  server = spawn(process.execPath, ["scripts/serve.mjs"], {
    env: { ...process.env, HOST: "127.0.0.1", PORT: "43107" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Static server did not start")), 10000);
    server.once("error", reject);
    server.once("exit", code => { clearTimeout(timer); reject(new Error(`Static server exited: ${code}`)); });
    server.stderr.on("data", data => process.stderr.write(data));
    server.stdout.on("data", data => {
      if (data.toString().includes("Listening:")) { clearTimeout(timer); resolve(); }
    });
  });
});
after(async () => {
  if (server && server.exitCode === null) {
    const exited = once(server, "exit");
    server.kill();
    await exited;
  }
});

test("all public pages, localized product links, assets, privacy notices and SEO work", async () => {
  const result = await verifySite(base);
  assert.equal(result.pages, 13);
  assert.ok(result.assets > 0);
});

test("directory redirects preserve query strings", async () => {
  const response = await fetch(`${base}/es/privacy?source=test`, { redirect: "manual" });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("Location"), "/es/privacy/?source=test");
});

test("HEAD returns the same metadata without a body", async () => {
  const get = await fetch(`${base}/en/`);
  const head = await fetch(`${base}/en/`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(head.headers.get("Content-Length"), get.headers.get("Content-Length"));
  assert.equal(head.headers.get("Content-Type"), "text/html; charset=utf-8");
  assert.equal(await head.text(), "");
  await get.body.cancel();
});

test("missing pages and unsupported methods have the right status", async () => {
  assert.equal((await fetch(`${base}/this-page-does-not-exist/`)).status, 404);
  const response = await fetch(base, { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET, HEAD");
});

test("encoded traversal cannot expose files outside the exported website", async () => {
  const response = await fetch(`${base}/..%2fpackage.json`);
  assert.equal(response.status, 403);
  assert.ok(!(await response.text()).includes('"dependencies"'));
});
