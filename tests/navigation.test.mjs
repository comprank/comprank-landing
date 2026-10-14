import assert from "node:assert/strict";
import test from "node:test";

const base = process.env.TEST_BASE_URL || "http://localhost:3123";
test("header has grouped competition navigation with server-rendered native links", async () => {
  const response = await fetch(base);
  assert.equal(response.status, 200);
  const html = await response.text();
  const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  assert.ok(header, "header is server rendered");
  assert.equal((header.match(/<span>Compétitions<\/span>/g) || []).length, 2);
  for (const route of ["crossfit", "hyrox", "backyard"]) {
    assert.equal((header.match(new RegExp(`href="/competition-${route}"`, "g")) || []).length, 2);
  }
  for (const label of ["Guide heats", "Fonctionnalités", "Le jour J", "FAQ"]) assert.ok(header.includes(label));
});
