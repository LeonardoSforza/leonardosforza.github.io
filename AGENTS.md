# Agent guide — Leonardo Sforza letters

## Product

Personal letters outlet branded **Leonardo Sforza**, deployed at https://leonardosforza.github.io/

Content is written locally (Keystatic or Markdoc files), then shipped via git branch → PR → GitHub Pages.

## Stack

- Astro static site
- Keystatic local CMS (`storage.kind: 'local'`) — **dev only** (`astro dev`); not on production Pages
- Markdoc content collections: `letters`, `entries`
- Design tokens: `src/styles/tokens.css` (Notion-flat light/dark via `data-theme`)
- Theme toggle in header; FOUC script in `BaseLayout`

## Commands

- `npm run dev` — site + `/keystatic`
- `npm run build` — static `dist/`
- `npm run migrate:canada` — re-import from sibling Canada-Pre-Tour-2026 repo

## Conventions

- Brand first on the home hero (logo + name). No clutter in the first viewport.
- Prefer editing content via Keystatic or `src/content/**/*.mdoc`, not hardcoding copy in pages.
- Images for letters/entries live under `public/letters/` and `public/entries/`.
- Sahaj Work status is a visual stub only — do not invent a live tracking backend unless asked.
- Logo path: `public/brand/logo.svg`
- **No gradients / glows.** Theme: `localStorage.theme` or system preference → `html[data-theme]`.

## Docs in Cursor rules

See `.cursor/rules/` for design system, content authoring, and Astro/Keystatic details.
