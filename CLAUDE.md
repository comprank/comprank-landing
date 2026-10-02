# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Workflow requirements

Update CLAUDE.md before every git commit.

## Project Overview

This is CompRank Landing - a Next.js 16 landing page for a French competition management platform. The site showcases features for organizing sporting competitions, managing athlete registrations, live leaderboards, and event planning.

## Development Commands

- **Development server**: `bun run dev`
- **Production build**: `bun run build`
- **Start production server**: `bun run start`
- **Linting**: `bun run lint`

## Architecture

### Framework Stack

- **Next.js 16** with React 19 and React Compiler enabled
- **TypeScript** with strict configuration
- **Tailwind CSS** with custom design system and animations
- **Framer Motion** for page animations
- **Radix UI** components for accessible UI elements

### Design System

The project uses a comprehensive design system built on Tailwind CSS with:

- Custom color palette with primary orange (#FFAD4A) and accent blue colors
- Dark theme with custom color scales (dark-50 to dark-900)
- Animation utilities via tailwindcss-animate, tailwindcss-motion, and tailwindcss-intersect
- Glass morphism effects and custom shadows

### Component Structure

- **Layout**: `app/layout.tsx` provides root layout with Header and Footer
- **Pages**: App Router structure with main page at `app/page.tsx`
- **Components**: Organized in `/components` with UI components in `/components/ui`
- **Utilities**: Shared utilities in `/lib/utils.ts` (primarily for className merging)

### Key Features

The landing page showcases:

- Modern hero section with animated gradients and call-to-action
- Interactive live leaderboard demonstration with real-time updates
- Offline-capable judge app and Scorecard workflow, with App Store and Google Play badges
- On-site "Le jour J" services: Régie live + TV live for FUNCTIONAL and RFID timing for HYROX
- Advanced competition planning and scheduling features
- Registration management with intelligent waitlist functionality
- Real-time scoring system with progress tracking
- Comprehensive athlete feedback collection and analytics
- Professional FAQ section with modern accordion design

### Recent Design Updates (2024)

The homepage has been fully redesigned with:

- **Modern Visual Design**: Clean, professional layout with gradient backgrounds and glassmorphism effects
- **Component Architecture**: Modular sections using Radix UI components (Card, Badge, Accordion)
- **Enhanced UX**: Improved typography hierarchy, better spacing, and smooth animations
- **Interactive Elements**: Hover effects, animated badges, and dynamic leaderboard showcase
- **Responsive Design**: Mobile-first approach with optimized layouts across all breakpoints
- **Performance Optimizations**: Efficient component structure with proper React patterns

### Styling Approach

- Uses CSS custom properties for consistent theming
- Extensive use of Tailwind utilities with custom classes like `.btn-primary`, `.card`, `.glass`
- Responsive design with mobile-first approach
- Custom animations and transitions throughout

### Analytics

- **Meta Pixel** (`components/meta-pixel.tsx`), rendered from the root layout. Loads via `next/script` with `afterInteractive`.
- Only fires when `NODE_ENV === "production"`, so local dev traffic never reaches Meta.
- Tracks `PageView` on hard page loads only — client-side route changes are not tracked (only `/` and `/terms` exist, and `/terms` has no campaign value).
- Tracks `Lead` (defensive `window.fbq` call, production only) when the lead dialog form is submitted successfully. Honeypot submissions are excluded client-side (`isHoneypotFilled` on the submitted input), and the event only fires on an explicit `{ success: true }` payload — a network failure leaves the next-safe-action hook result empty, which it otherwise reports as success.
- **No consent gate yet.** The pixel drops cookies unconditionally, which is not GDPR/CNIL-compliant. A cookie banner is planned as separate work; the pixel is isolated in its own component so the gate can wrap it without touching the layout.

### Crawler and AI Agent Discovery

- **`app/robots.txt/route.ts`** — plain route handler, not Next's `MetadataRoute.Robots` metadata file (which has no escape hatch for custom directives). Serves the standard `Allow` / `Sitemap` / `Host` lines plus a `Content-Signal` directive (https://contentsignals.org/).
- Declared stance is `search=yes, ai-input=yes, ai-train=no`: assistants may index the site and cite it when answering, but the content is reserved for model training. Indexing and RAG are how organizers find us, so blocking them would be self-defeating. Content Signals are declaratory — no enforcement mechanism, untested legal weight.
- **`app/llms.txt/route.ts`** — `/llms.txt` summary per https://llmstxt.org/, in French, for assistants that recommend tools. Deliberately duplicates page copy: **update it when the feature list or pages change**, it will not drift on its own.
- Both are `export const dynamic = "force-static"` (route handlers are dynamic by default in Next 15+) and interpolate `SITE_URL` / `APP_URL` from `lib/site.ts`.
- Deliberately **not** implemented, despite agent-readiness checklists asking for them: API catalog (RFC 9727), OAuth/OIDC discovery, OAuth Protected Resource metadata, auth.md, MCP Server Card, agent-skills index, DNS-AID records, WebMCP. This repo is a 4-page marketing site with no public API, no auth server, and no agent-facing surface — all of those would advertise endpoints that do not exist. WebMCP in particular would expose the lead form to automated submissions.

### Lead Capture (CTA form)

- All "Démarrer / Démarrer gratuitement" and "Parler de votre jour J" CTAs open the same lead-capture modal instead of linking to `app.comprank.fr`. Direct access to the app goes through `AppLink` (below) and a discreet link on the modal's success screen.
- **`components/app-link.tsx`** — `AppLink`, the only direct CTA to `app.comprank.fr`. Deliberately a text link with an `ArrowUpRight` icon, never a button, so it stays visually distinct from the form CTAs. Rendered in the header (desktop: "Ouvrir l’app" next to "Démarrer"; mobile menu: row under the CTA), under the hero buttons, in the homepage bottom CTA and in the competition-landing closing block, each with an "Envie d’explorer par vous-même ?" lead-in. Opens in a new tab (`target="_blank"` + `rel="noopener noreferrer"`), like the store badges, so the landing stays open. Fires `fbq("trackCustom", "AppLinkClick", { placement })` in production; custom event on purpose (same reasoning as `AppBadgeClick`) so Meta keeps optimising on `Lead`.
- **`components/lead-button.tsx`** — standard controlled trigger used by the hero, homepage CTAs and competition landings. Keeping the button and its `LeadDialog` in one client boundary avoids Radix trigger-ID hydration mismatches when several dialogs occur on one page; it exposes `aria-haspopup="dialog"` and `aria-expanded`. The header keeps its own controlled instance because its mobile trigger unmounts when the menu closes.
- **`components/lead-dialog.tsx`** — client component. Two usage modes: wrap the trigger as children (`DialogTrigger asChild`), or controlled via `open`/`onOpenChange` (used by the header so the dialog survives the mobile menu unmounting). Fields: first/last name, email, optional phone, two required segmented-pill radio groups (profile: coach/box-owner/other; timeline: 3-months/6-12-months/considering/no) with no default selection, plus an off-screen honeypot (`website`). Form state resets on reopen. Visible inputs carry `maxLength` mirroring `LEAD_MAX_LENGTHS` (the phone field has no error UI, so the browser cap is what prevents a silent dead submit); the honeypot has no `maxLength` so bots can still fill it. Network/execution failures (empty hook result) show the same generic error via a local `failed` flag.
- **`lib/lead-schema.ts`** — shared zod schema (client + server), French error messages, pill option lists, and label helpers for the email body. Exports `LEAD_MAX_LENGTHS` (max bounds on all string fields, enforced in the schema with French messages — including the honeypot, whose only cap is the schema since its input has no `maxLength` — and mirrored as input `maxLength` on visible fields) and `isHoneypotFilled` (single definition of what counts as a bot submission, used by both the server action and the Lead pixel gate).
- **`app/actions/lead.ts`** — `next-safe-action` server action (client in `lib/safe-action.ts`). Honeypot filled → fake success, no email; the response is intentionally byte-identical to a real success so bots can't detect the trap (the client filters the Lead event from its own copy of the input instead). Otherwise sends a plain-text email via the Resend SDK: from `CompRank <contact@transactional.comprank.fr>`, to `contact@comprank.fr`, `replyTo` = lead's email, subject `Nouveau lead : {First} {Last} ({Profile})`. Missing `RESEND_API_KEY` or send failure → throws; the client shows a generic French error with a mailto fallback (never fakes success).
- **`RESEND_API_KEY`** is required in production (Vercel env) — see `.env.example`. No rate limiting yet; the honeypot is the only spam protection (known limitation, acceptable for current traffic).

### App, Scorecard and On-site Services (issue #14)

The homepage now follows three narratives while preserving the existing hero, five-feature grid and six-step flow: App juge + Scorecard, Régie live + TV live, and RFID timing for HYROX. The latter two are explicitly separate on-site services; the software remains free for organizers.

- **`components/phone-shell.tsx`** — reusable phone chassis (extracted from `JudgeScoringMockup`), takes any screen as children.
- **`components/phone-screens.tsx`** — screens sized for `PhoneShell`. `PhoneJudgeOfflineScreen` is rendered as decorative proof in the App juge section; `PhoneLeaderboardScreen` remains available but is not rendered.
- **`components/app-judge-section.tsx`** — production App juge + Scorecard section. It explains the offline queue, keeps the web interface as the no-installation fallback, and is the page's only store-badge location.
- **`components/day-of-event.tsx`** — production homepage section with separate Régie live + TV live and RFID timing panels, plus compact format-specific blocks used by both competition landings. Visual mockups are decorative (`aria-hidden`); the adjacent prose carries the same facts for assistive technology.
- **`components/store-badges.tsx`** — App Store + Google Play badges (`public/badges/`), App Store left, equal visible heights, no CSS effects, `fbq("trackCustom", "AppBadgeClick", { platform })` in production. Links come from `IOS_APP_URL` / `ANDROID_APP_URL` in `lib/site.ts`; both point to the published store listings.
- `components/hero.tsx` now wraps the animated leaderboard in a `LeaderboardCard` component (same markup as before, just named) so the proof can be swapped or re-framed without rewriting the hero.
- `components/competition-landing.tsx` accepts an optional `dayOfEventOffer` slot after the feature grid. CrossFit renders the Régie live + TV live offer; HYROX renders the RFID timing offer. Both use the existing lead form with no extra field.
- The header and footer expose a single "Le jour J" link to `/#offre`. The homepage FAQ documents offline Régie behavior and RFID timing. `/llms.txt`, `SITE_DESCRIPTION` and the homepage JSON-LD feature list mirror the new offer.

### Content and Localization

- All content is in French, targeting French-speaking competition organizers
- Focuses on CrossFit, functional fitness, weightlifting, and similar sports
- The external application lives at `https://app.comprank.fr` (`APP_URL` in `lib/site.ts`); CTAs no longer link to it directly (see Lead Capture)

## File Organization

```
app/                 # Next.js App Router pages
├── layout.tsx       # Root layout with fonts and providers
├── page.tsx         # Main landing page with all sections
├── sitemap.ts       # Generated sitemap.xml
├── robots.txt/      # Route handler: robots.txt + Content-Signal
├── llms.txt/        # Route handler: /llms.txt site summary for AI agents
└── terms/page.tsx   # Terms of service page

components/          # React components
├── ui/             # Reusable UI components (Radix + custom)
├── hero.tsx        # Hero section component (exports Athlete, RankChangeIndicator)
├── app-judge-section.tsx # App juge + Scorecard homepage narrative
├── day-of-event.tsx # Homepage and landing blocks for on-site services
├── lead-button.tsx # Controlled lead-dialog trigger used outside the header
├── app-link.tsx    # Direct text link to app.comprank.fr, distinct from form CTAs
├── phone-shell.tsx # Phone chassis for app mockups
├── phone-screens.tsx # Screens for PhoneShell
├── store-badges.tsx # App Store / Google Play badges
├── header.tsx      # Site header/navigation
├── footer.tsx      # Site footer
└── ...             # Other page sections

lib/
└── utils.ts        # Utility functions (className merging)

public/             # Static assets
├── hero.webp       # Hero background image
├── badges/         # Official store badges (FR)
└── box/            # Box logo images
```

## Development Notes

- The site uses React Compiler (feature enabled in Next.js config)
- Uses Bun as package manager (bun.lockb present)
- No custom CSS files beyond globals.css - everything styled with Tailwind
- TypeScript paths configured with `@/*` alias pointing to root directory
