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
test('pricing page states validated amounts with breadcrumb and examples table', async () => {
  const html = await page('/tarifs');
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /rel="canonical" href="https:\/\/www.comprank.fr\/tarifs"/);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/);
  assert.ok(html.includes('id="contenu"'));
  assert.ok(html.includes('"@type":"BreadcrumbList"'), 'breadcrumb JSON-LD');
  assert.doesNotMatch(html, /"@type":"FAQPage"/);
  assert.ok(html.includes('aria-label="Fil d’Ariane"'));
  const table = html.match(/<table\b[\s\S]*?<\/table>/)?.[0];
  assert.ok(table, 'examples table is server rendered');
  for (const heading of ['Prix fixé par l’organisateur', 'Frais de service', 'L’athlète paie', 'L’organisateur reçoit']) assert.ok(table.includes(heading), heading);
  const rows = [...table.matchAll(/<tr\b[\s\S]*?<\/tr>/g)].map(([row]) => row.replace(/<[^>]+>/g, ' ').replace(/&nbsp;| /g, ' ').replace(/\s+/g, ' ').trim());
  for (const [price, fee, athlete, organizer] of [['30 €', '1,70 €', '31,70 €', '30 €'], ['50 €', '2,50 €', '52,50 €', '50 €'], ['80 €', '3,70 €', '83,70 €', '80 €']]) {
    assert.ok(rows.some(row => row === `${price} + ${fee} ${athlete} ${organizer}`), `row ${price}`);
  }
  for (const term of ['4 % + 0,50 €', 'Stripe', 'aucune commission', 'Kit Régie', 'Kit Timing', 'Parler de votre jour J', 'Préparer mes inscriptions']) assert.ok(html.replace(/&nbsp;| /g, ' ').includes(term), term);
  assert.doesNotMatch(html, /sans abonnement|HT\b|TTC/);
});
test('pricing page is linked from header, footer, sitemap and AI summary', async () => {
  const home = await page('/');
  const header = home.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0];
  assert.equal((header.match(/href="\/tarifs"/g) ?? []).length, 2, 'desktop and mobile header links');
  assert.ok(footer.includes('href="/tarifs"'), 'footer link');
  assert.ok((await page('/sitemap.xml')).includes('https://www.comprank.fr/tarifs'));
  const llms = await page('/llms.txt');
  for (const term of ['https://www.comprank.fr/tarifs', '4 % + 0,50 €', 'aucune commission']) assert.ok(llms.includes(term), term);
  for (const mock of ['/tarifs-a', '/tarifs-b', '/tarifs-c']) assert.equal((await fetch(new URL(mock, base))).status, 404, mock);
});
