import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("the README's first line is the URL production deploys to", async () => {
  const [readme, dockerfile, deploy] = await Promise.all([
    read("README.md"),
    read("Dockerfile"),
    read(".github/workflows/deploy.yml"),
  ]);
  const built = dockerfile.match(/^ARG SITE_URL=(\S+)$/m)?.[1];
  const deployed = deploy.match(/--build-arg SITE_URL=(\S+)/)?.[1];
  assert.ok(built, "Dockerfile sets no SITE_URL");
  assert.equal(deployed, built, "deploy.yml and the Dockerfile publish different URLs");
  assert.equal(readme.split("\n")[0], `**Live site: ${built}**`);
});
