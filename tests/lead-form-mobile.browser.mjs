// Mobile layout checks for the lead-capture dialog.
// Run with PLAYWRIGHT_MODULE pointing to an existing playwright installation,
// against a running server (default http://localhost:3123). Never submits.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const screenshotDir = process.env.LEAD_SCREENSHOT_DIR || tmpdir();
const require = createRequire(import.meta.url);
const { chromium, devices } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"] });
const base = process.env.TEST_BASE_URL || "http://localhost:3123";
const errors = [];

const openDialog = async (page) => {
  await page.goto(base);
  await page.locator("main").getByRole("button", { name: "Préparer mes inscriptions" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor();
  await page.waitForTimeout(400); // open animation
  return dialog;
};

try {
  // Mobile: bottom sheet, touch-sized controls, submit visible without scrolling.
  const mobile = await browser.newContext({ ...devices["iPhone 13"] });
  await mobile.route(/facebook\.com|facebook\.net/, (route) => route.abort());
  const page = await mobile.newPage();
  page.on("pageerror", (error) => errors.push(error.message));
  const dialog = await openDialog(page);
  const viewport = page.viewportSize();

  const box = await dialog.boundingBox();
  assert.ok(Math.abs(box.y + box.height - viewport.height) <= 1, "sheet is pinned to the bottom edge");
  assert.ok(box.height <= viewport.height * 0.92 + 1, "sheet leaves the page visible above it");
  assert.equal(Math.round(box.width), viewport.width, "sheet spans the full width");

  const submit = dialog.getByRole("button", { name: "Être recontacté" });
  const submitBox = await submit.boundingBox();
  assert.ok(submitBox.y + submitBox.height <= viewport.height, "submit is visible without scrolling");
  assert.ok(submitBox.height >= 44, "submit is at least 44px tall");

  const close = dialog.getByRole("button", { name: "Fermer" });
  const closeBox = await close.boundingBox();
  assert.ok(closeBox.width >= 44 && closeBox.height >= 44, "close button is a 44px target");

  for (const name of ["Prénom", "Nom", "Email"]) {
    const input = dialog.getByLabel(name, { exact: true });
    assert.ok((await input.boundingBox()).height >= 44, `${name} input is at least 44px tall`);
    const fontSize = await input.evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    assert.ok(fontSize >= 16, `${name} font size avoids iOS zoom on focus`);
  }
  const pill = dialog.getByRole("radio", { name: "Coach" });
  assert.ok((await pill.boundingBox()).height >= 44, "pills are at least 44px tall");

  const email = dialog.getByLabel("Email", { exact: true });
  assert.equal(await email.getAttribute("inputmode"), "email");
  assert.equal(await email.getAttribute("autocapitalize"), "none");
  assert.equal(await dialog.getByLabel(/Téléphone/).getAttribute("inputmode"), "tel");

  // Touch screens do not focus the first field on open (no keyboard pop-up).
  assert.notEqual(await page.evaluate(() => document.activeElement?.id), "lead-firstName");

  // "Suivant" on the keyboard moves through fields instead of submitting.
  await dialog.getByLabel("Prénom", { exact: true }).fill("Ada");
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "lead-lastName");
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "lead-email");
  assert.equal(await dialog.getByRole("alert").count(), 0, "Enter did not submit the form");

  await page.screenshot({ path: join(screenshotDir, "lead-form-mobile.png") });

  // Submitting an incomplete form brings the first error into view and focus.
  await dialog.getByLabel("Prénom", { exact: true }).fill("");
  await submit.click();
  assert.equal(await page.evaluate(() => document.activeElement?.id), "lead-firstName");
  await page.screenshot({ path: join(screenshotDir, "lead-form-mobile-errors.png") });
  await mobile.close();

  // Desktop: still a centred modal with the first field focused.
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await desktop.route(/facebook\.com|facebook\.net/, (route) => route.abort());
  const desktopPage = await desktop.newPage();
  desktopPage.on("pageerror", (error) => errors.push(error.message));
  const desktopDialog = await openDialog(desktopPage);
  const desktopBox = await desktopDialog.boundingBox();
  assert.ok(Math.abs(desktopBox.x + desktopBox.width / 2 - 720) <= 2, "desktop dialog is horizontally centred");
  assert.ok(desktopBox.y > 0 && desktopBox.y + desktopBox.height < 900, "desktop dialog is not pinned to an edge");
  assert.equal(await desktopPage.evaluate(() => document.activeElement?.id), "lead-firstName");
  await desktopPage.screenshot({ path: join(screenshotDir, "lead-form-desktop.png") });
  await desktop.close();

  assert.deepEqual(errors, [], "no page errors");
  console.log(`lead form mobile checks passed (screenshots in ${screenshotDir})`);
} finally {
  await browser.close();
}
