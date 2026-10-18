import assert from "node:assert/strict";
import test from "node:test";

const base = process.env.TEST_BASE_URL ?? "http://localhost:3123";
const eventUrl = "https://app.comprank.fr/comp/Q0QfwrPdgqWzCt8m8VFzL";

for (const path of ["/", "/competition-crossfit"]) {
  test(`${path} renders the approved registration case in server HTML`, async () => {
    const response = await fetch(new URL(path, base));
    assert.equal(response.status, 200);
    const html = await response.text();
    const section = html.match(/<section\b[^>]*aria-labelledby="remes-classics-title"[^>]*>[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, "Missing accessible REMES CLASSICS case study section");
    assert.match(section, /REMES CLASSICS/);
    assert.match(section, /60 athlètes/);
    assert.match(section, /20 équipes de trois/);
    assert.match(section, /Les 20 équipes sont inscrites sur CompRank/);
    assert.match(section, /Excel/);
    assert.match(section, /retours\s+recueillis par l’équipe CompRank/);
    assert.ok(section.includes(`href="${eventUrl}"`));
    assert.doesNotMatch(section, /<blockquote|AggregateRating|Review|RFID|régie TV/i);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  });
}

test("HYROX does not inherit an unrelated client case", async () => {
  const response = await fetch(new URL("/competition-hyrox", base));
  assert.equal(response.status, 200);
  assert.doesNotMatch(await response.text(), /id="remes-classics-title"/);
});
