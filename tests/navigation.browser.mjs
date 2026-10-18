// Run with PLAYWRIGHT_MODULE pointing to an existing playwright installation.
// No browser/test runtime is added to the application's production dependencies.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
const screenshotDir = process.env.NAV_SCREENSHOT_DIR || tmpdir();
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
const page = await browser.newPage();
const base = process.env.TEST_BASE_URL || "http://localhost:3123";
const errors = [];
page.on("pageerror", error => errors.push(error.message));
// Local QA must never send real analytics events.
await page.route(/facebook\.com|facebook\.net/, route => route.abort());
const expanded = async (locator, value) => assert.equal(await locator.getAttribute("aria-expanded"), String(value));
const noOverflow = async () => assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "no horizontal page overflow");
try {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base);
  const desktop = page.getByRole("navigation", { name: "Navigation principale", exact: true });
  const trigger = desktop.getByRole("button", { name: "Compétitions" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expanded(trigger, true);
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), "CrossFit");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), "HYROX");
  await page.keyboard.press("Escape");
  await expanded(trigger, false);
  assert.ok(await trigger.evaluate(el => el === document.activeElement));
  await page.keyboard.press("Space");
  await expanded(trigger, true);
  await page.getByRole("heading", { level: 1 }).click();
  await expanded(trigger, false);
  await trigger.click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expanded(trigger, false);
  assert.equal(await page.evaluate(() => document.activeElement?.textContent), "Guide heats");
  await trigger.click();
  await desktop.getByRole("link", { name: "HYROX", exact: true }).click();
  await page.waitForURL("**/competition-hyrox");
  await expanded(trigger, false);
  await trigger.click();
  assert.equal(await desktop.getByRole("link", { name: "HYROX", exact: true }).getAttribute("aria-current"), "page");
  await noOverflow();
  await page.screenshot({ animations: "disabled", path: join(screenshotDir, "navigation-desktop.png") });

  for (const width of [320, 375, 768, 1024, 1279]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(base);
    const menu = page.getByRole("button", { name: "Ouvrir le menu", exact: true });
    await menu.click();
    const mobile = page.getByRole("navigation", { name: "Navigation mobile", exact: true });
    const competition = mobile.getByRole("button", { name: "Compétitions" });
    if (width < 640) assert.ok((await mobile.getByRole("button", { name: "Préparer mes inscriptions", exact: true }).boundingBox()).height >= 44, "mobile CTA >=44px");
    await competition.click();
    const crossfit = mobile.getByRole("link", { name: "CrossFit", exact: true });
    await crossfit.click({ trial: true }); // Wait for Arc's entry transition to settle.
    assert.ok((await crossfit.boundingBox()).height >= 44, "mobile target >=44px");
    await noOverflow();
    if (width === 375) await page.screenshot({ animations: "disabled", path: join(screenshotDir, "navigation-mobile.png") });
    await crossfit.focus();
    await page.keyboard.press("Escape");
    await expanded(competition, false);
    assert.ok(await competition.evaluate(el => el === document.activeElement));
    assert.ok(await mobile.isVisible(), "inner escape does not close outer menu");
    await page.keyboard.press("Escape");
    assert.ok(await menu.evaluate(el => el === document.activeElement));
    await menu.click();
    await competition.click();
    await mobile.getByRole("link", { name: "Backyard", exact: true }).click();
    await page.waitForURL("**/competition-backyard");
    assert.ok(!(await mobile.isVisible()), "navigation closes mobile panel");
    await menu.click();
    await expanded(competition, false);
    await page.mouse.click(2, 790); // Outside the floating panel, not an obscured heading.
    assert.ok(!(await mobile.isVisible()), "outside click closes mobile panel");
    await menu.click();
    await mobile.getByRole("link", { name: "FAQ", exact: true }).click();
    await page.waitForURL("**/#faq");
    assert.ok(!(await mobile.isVisible()));
    await noOverflow();
  }
  for (const width of [1280, 1366, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await noOverflow();
    assert.ok(await trigger.isVisible());
  }
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(base);
  await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click();
  const mobileNav = page.getByRole("navigation", { name: "Navigation mobile", exact: true });
  await page.context().route("https://app.comprank.fr/**", route => route.abort());
  await page.evaluate(() => {
    window.navigationTestEvents = [];
    window.fbq = (...args) => window.navigationTestEvents.push(args);
  });
  await mobileNav.getByRole("link", { name: "Ouvrir l’application", exact: true }).click();
  assert.ok(!(await mobileNav.isVisible()), "app link also closes mobile menu");
  assert.deepEqual(await page.evaluate(() => window.navigationTestEvents), [["trackCustom", "AppLinkClick", { placement: "header-mobile" }]], "existing app tracking preserved");
  await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click();
  await mobileNav.getByRole("button", { name: "Préparer mes inscriptions", exact: true }).click();
  assert.ok(!(await mobileNav.isVisible()));
  assert.ok(await page.getByRole("dialog").isVisible(), "existing lead CTA still opens dialog");
  await page.keyboard.press("Escape");
  assert.deepEqual(errors, [], "no runtime or hydration errors");
  console.log("PASS: desktop keyboard/tab/escape/outside/active-route; mobile nested escape/focus/navigation/hash/outside/44px targets; responsive overflow; CTA and app tracking; no hydration errors");
} finally {
  await browser.close();
}
