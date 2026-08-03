# Leonardo Sforza — Personal Letters

Personal letters site: travel, Sahaja, and everything that doesn’t fit in a feed.

**Live:** https://leonardosforza.github.io/

## Stack

- **Astro** (static) → GitHub Pages
- **Keystatic** (local mode) → Notion-like editor at `/keystatic` while developing
- **Markdoc** → letters & journal entries as files in git

## Local workflow

```bash
npm install
npm run dev
```

1. Open http://localhost:4321 for the site
2. Open http://localhost:4321/keystatic to create/edit letters and entries
3. Changes write to `src/content/` and `public/`
4. Branch → commit → open a PR → merge → GitHub Actions deploys

```bash
npm run build    # static site → dist/
npm run preview  # preview production build
```

## Content model

| Collection | Path                         | Purpose                                 |
| ---------- | ---------------------------- | --------------------------------------- |
| Letters    | `src/content/letters/*.mdoc` | Long-form letter (e.g. Canada Pre-Tour) |
| Entries    | `src/content/entries/*.mdoc` | Stops / chapters inside a letter        |

Markdoc supports headings, lists, links, images, tables, column layouts, plus custom tags:

```markdoc
{% video src="https://www.youtube.com/watch?v=…" title="Optional title" /%}
{% callout type="note" %}A soft aside{% /callout %}
```

## Brand / logo

Drop your logo at [`public/brand/logo.svg`](public/brand/logo.svg) (SVG or replace with PNG and update references). A temporary wordmark ships until then.

## Canada migration

The Canada Pre-Tour letter was migrated from the Notion export in the sibling `Canada-Pre-Tour-2026` repo:

```bash
npm run migrate:canada
```

## Sahaj Work

Footer includes a **Sahaj Work** status placeholder (contribution-graph style). Not wired yet — future events: talks, self-realization, programs.

## Deploy

GitHub Actions (`.github/workflows/deploy.yml`) builds on push to `master`/`main` and publishes `dist/` to GitHub Pages.

In the repo: **Settings → Pages → Source: GitHub Actions**.
