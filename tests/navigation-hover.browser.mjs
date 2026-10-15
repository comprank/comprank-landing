import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH, headless: true, args: ['--no-sandbox'] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.route(/facebook|connect\.facebook/, route => route.abort());
  await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3123');
  const trigger = page.getByRole('navigation', {name:'Navigation principale', exact:true}).getByRole('button', {name:'Compétitions'});
  await trigger.hover();
  await page.getByRole('link', {name:'CrossFit', exact:true}).first().waitFor({state:'visible'});
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  await page.getByRole('navigation', {name:'Navigation principale', exact:true}).getByRole('link', {name:'Backyard',exact:true}).hover();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  await page.mouse.move(1400, 600);
  await page.waitForTimeout(300);
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  await trigger.focus();
  await page.keyboard.press('Enter');
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  await page.keyboard.press('Escape');
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  console.log('PASS: hover opens, panel remains reachable, pointer exit closes, keyboard retained');
} finally { await browser.close(); }
