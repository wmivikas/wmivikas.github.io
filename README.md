# wmivikas.github.io

Personal academic website, built with [Jekyll](https://jekyllrb.com/) and the
[al-folio](https://github.com/alshedivat/al-folio) theme.

Live at <https://wmivikas.github.io>.

## What to edit

| To change… | Edit |
| --- | --- |
| Name, title, description, keywords, site URL | `_config.yml` |
| The about text, subtitle, photo, address | `_pages/about.md` |
| Social and contact links | `_data/socials.yml` |
| Publications | `_bibliography/papers.bib` |
| News items | one file per item in `_news/` |
| Profile photo | `assets/img/prof_pic.png` |
| Favicon and iOS icon | `assets/img/apple-touch-icon.png` |

### Adding a publication

Paste the BibTeX entry into `_bibliography/papers.bib`. Beyond the standard
fields, al-folio understands:

- `abbr` — the coloured venue badge, e.g. `{NeurIPS}`
- `selected = {true}` — also show it on the homepage
- `abstract` — adds an "Abs" toggle
- `preview` — an image in `assets/img/publication_preview/`
- `pdf`, `code`, `poster`, `slides`, `website`, `video`, `arxiv`, `doi` — link buttons

### Adding a news item

Create `_news/YYYY-MM-DD-short-name.md`:

```markdown
---
layout: post
date: 2026-03-01
inline: true
related_posts: false
---

One line about the news, with a [link](https://example.com) if useful.
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
with Jekyll and pushes the result to the `gh-pages` branch.

**GitHub Pages must be set to serve that branch:** Settings → Pages → Source →
*Deploy from a branch* → `gh-pages` / `root`.

## Running it locally (optional)

Needs Ruby. On Ubuntu:

```bash
sudo apt install ruby-full build-essential imagemagick
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Theme documentation

See `docs/` for the theme's own guides (`INSTALL.md`, `CUSTOMIZE.md`, `FAQ.md`),
or the [al-folio repository](https://github.com/alshedivat/al-folio).

The theme is MIT licensed; see `LICENSE`.
