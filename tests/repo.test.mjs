import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("Dependabot opens every version update into dev, never main", async () => {
  const config = await read(".github/dependabot.yml");
  const entries = config.match(/^ {2}- package-ecosystem: /gm) ?? [];
  assert.ok(entries.length > 0, "dependabot.yml has no entries");
  assert.equal(
    config.match(/^ {4}target-branch: dev$/gm)?.length ?? 0,
    entries.length,
    "every entry in dependabot.yml needs target-branch: dev",
  );
  assert.doesNotMatch(config, /target-branch: main/);
});

test("one Node image in both stages of the Dockerfile, the one CI and the deploy read", async () => {
  const images = [...(await read("Dockerfile")).matchAll(/^FROM (node:\S+)/gm)].map((m) => m[1]);
  assert.equal(images.length, 2);
  assert.equal(new Set(images).size, 1, "the Dockerfile's stages use different Node images");
  for (const workflow of [".github/workflows/ci.yml", ".github/workflows/deploy.yml"]) {
    const text = await read(workflow);
    const setups = text.match(/actions\/setup-node@/g)?.length ?? 0;
    assert.ok(setups > 0, `${workflow} sets up no Node`);
    assert.equal(
      text.match(/node-version: \$\{\{ steps\.node\.outputs\.version \}\}/g)?.length ?? 0,
      setups,
      `${workflow} must set up the Dockerfile's Node, not a fixed version`,
    );
  }
});
