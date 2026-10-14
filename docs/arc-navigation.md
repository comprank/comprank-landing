# Grouped competition navigation / Arc attribution

## Source and choice

The free **Arc UI Popover** was inspected at https://uiarc.dev/components/popover and its actual source at https://uiarc.dev/r/popover.json (registry paths `registry/components/popover/popover.tsx` and `registry/components/popover/popover.module.css`). Registry metadata marks it `tier: free`; https://uiarc.dev/license publishes the MIT notice reproduced below. No Pro code, purchase or authenticated source is used.

`components/competition-navigation.module.css` adapts the source's anchored panel treatment: non-scaling press feedback, constrained viewport width, raised bordered surface, top-origin fade/5px settle at .97 scale using `@starting-style`, and reduced-motion handling. Colors, spacing and radii are local dark/orange styles; no Arc design tokens or foundation are installed.

The stock Radix portal/unmount behavior is deliberately **not** copied: navigation links must remain native anchors in the server-rendered HTML even when the disclosure is closed. `NavigationDisclosure` is a small inline button/hidden-panel implementation with ordinary Tab order, Escape focus restoration, focus-leave/outside-pointer dismissal and resize closure. It is a navigation disclosure, not an ARIA command menu or dialog, so it does not claim menu arrow-key behavior or trap focus. Outside clicks retain normal browser focus behavior; Escape returns focus to the relevant trigger. Mobile nests this same component, keeping an inner Escape from closing the outer menu.

Arc's https://uiarc.dev/components/dropdown-menu exposes action data (`label`, `onSelect`, etc.), not `href`. It is therefore not used for site navigation; no JS-only routing or action-menu semantics are imposed on links. The stock Popover's portal and full styling foundation would add complexity without meeting the crawlable closed-DOM requirement.

One competition array and `CompetitionNavigation` serve desktop and mobile. Mobile uses an inline panel; desktop an anchored panel. Existing Next Link, React and lucide-react are used; **no application dependency or lockfile changes**. CTA/lead and AppLink tracking implementations are unchanged.

## Verification

Against a production build served at `http://localhost:3123` (override `TEST_BASE_URL`):

```sh
/opt/data/bin/bun test tests/competition-navigation.test.tsx tests/heats-planner.test.ts
/opt/data/bin/bun run build
/opt/data/bin/bun run start --port 3123
node --test tests/navigation.test.mjs tests/seo-content.test.mjs tests/remes-classics.test.mjs
node_modules/.bin/eslint .
```

The component existence/SSR regression and HTTP grouped-header regression were run red before implementation/integration, then green. Browser regression also caught the existing 32px mobile CTA; a scoped header class raises it to 44px.

Browser suite (use a separately available Playwright installation and Chromium binary; these are not production dependencies):

```sh
PLAYWRIGHT_MODULE=/path/to/node_modules/playwright \
CHROMIUM_PATH=/path/to/chrome \
node tests/navigation.browser.mjs
```

Tests exercise production hydration, desktop Enter/Space/Tab/Escape and focus return, outside click, focus-leave dismissal, active links, mobile nested Escape, navigation/hash closure, target size and responsive overflow. Analytics requests are blocked during browser QA. Screenshots can be directed with `NAV_SCREENSHOT_DIR`.

## MIT License — Arc UI free Popover

Copyright (c) 2026 Elia Kuratli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
