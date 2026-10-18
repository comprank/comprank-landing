import assert from 'node:assert/strict';
import test from 'node:test';
test('Backyard page exposes supported organizer workflow and SEO', async () => {
  const html = await page('/competition-backyard');
  for (const term of ['inscriptions', 'passages', 'abandons', 'hors délai', 'RFID', 'hors ligne', 'résultats', 'BreadcrumbList']) assert.ok(html.includes(term), term);
  assert.match(html, /rel="canonical" href="https:\/\/www.comprank.fr\/competition-backyard"/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});
test('heats guide provides an operational example, planner and CSV', async () => {
  const html = await page('/guides/planning-heats-competition-crossfit');
  for (const term of ['57 minutes', '09:57', '09:45', 'récupération', 'juges', 'matériel', 'aires', 'Exemple pédagogique', '/downloads/modele-planning-heats.csv', 'BreadcrumbList']) assert.ok(html.includes(term), term);
  assert.match(html, /rel="canonical" href="https:\/\/www.comprank.fr\/guides\/planning-heats-competition-crossfit"/);
  assert.ok(html.includes('href="/competition-crossfit"'));
  assert.match(html, /<input/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
});
test('new pages are discoverable in navigation, sitemap and AI summary', async () => {
  for (const source of ['/', '/sitemap.xml', '/llms.txt']) {
    const text = await page(source);
    for (const path of ['/competition-backyard', '/guides/planning-heats-competition-crossfit']) assert.ok(text.includes(path), `${source}: ${path}`);
  }
  const home = await page('/');
  assert.ok(home.indexOf('id="features"') < home.indexOf('id="offre"'));
  assert.doesNotMatch(home.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)?.[0], /Backyard/);
});
const base = process.env.TEST_BASE_URL ?? 'http://localhost:3123';
async function page(path) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  return response.text();
}
test('organizer landing starts with registrations and qualified cost claim', async () => {
  for (const path of ['/', '/competition-crossfit', '/competition-hyrox']) {
    const html = await page(path);
    const hero = html.match(/<section\b[\s\S]*?<\/section>/)?.[0];
    assert.match(hero, /inscriptions/i);
    assert.match(hero, /Le module d’inscription est sans coût pour l’organisateur\./);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
    assert.ok(html.includes(`rel="canonical" href="https://www.comprank.fr${path === '/' ? '' : path}`));
  }
});
