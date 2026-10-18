// @ts-expect-error Bun executes tests; no production @types/bun dependency.
import { test, expect, mock } from "bun:test";
// Bun does not compile CSS modules; browser tests exercise actual styles.
mock.module("../components/competition-navigation.module.css", () => ({
  default: { trigger: "trigger", panel: "panel", inline: "inline", floating: "floating", link: "link" },
}));
import { existsSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";

test("competition disclosure server-renders crawlable links even when closed", async () => {
  expect(existsSync("components/competition-navigation.tsx")).toBe(true);
  const { CompetitionNavigation } = await import("../components/competition-navigation");
  const html = renderToStaticMarkup(<CompetitionNavigation pathname="/competition-hyrox" />);
  expect(html).toContain("Compétitions");
  expect(html).toContain('aria-expanded="false"');
  for (const sport of ["crossfit", "hyrox", "backyard"]) {
    expect(html).toContain(`href="/competition-${sport}"`);
  }
  expect(html).toMatch(/<a(?=[^>]*href="\/competition-hyrox")(?=[^>]*aria-current="page")[^>]*>/);
  expect(html).toContain("hidden=");
});
