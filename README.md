# wmivikas.github.io

Personal academic website of Vikas Kumar, live at <https://wmivikas.github.io>.

A single page in the AcademicPages style: a sticky profile sidebar on the left,
emoji-headed sections on the right (About, News, Research, Publications,
Education, Experience, Contact), with light and dark themes. Plain HTML, CSS and
JavaScript — no build step, so a push is live in about a minute.

## Editing

All content lives in one file: `assets/data/site-content.json`.

| Block | What it controls |
| --- | --- |
| `site` | Browser tab title, footer name, "last updated" date, and `authorName` (bolded in author lists) |
| `profile` | Sidebar: photo, name, one-line bio, location, institution |
| `contact` | Sidebar links: email, Google Scholar, GitHub, LinkedIn, ORCID, X, CV. Empty values are hidden |
| `about` | The heading and the intro paragraph at the top |
| `news` | Dated news items |
| `research` | The research paragraph |
| `publications` | All papers (see below) |
| `education`, `experience` | Timeline entries: `when`, `place`, `url`, `details` |
| `contactSection` | The closing contact paragraph |

Fields ending in `Html` accept links (`<a href="...">`). Every section with no
items is hidden automatically, and so is its link in the top navigation.

### Publications

Each paper in `publications.items` has:

- `title`, `authors`, `venue`, `year`
- `links` — e.g. `[{ "label": "Paper", "url": "https://..." }]`; links with an
  empty `url` are hidden
- `selected: true` — shown as an image card under **Selected Publications**,
  with `image`, `badge` (the label on the image, e.g. `ICML 2026`) and `summary`
- otherwise `category` — `conference`, `journal` or `preprint` — puts it in that
  list. Each paper appears in exactly one place.

Section headings and their emoji are set in `publications.selectedHeading` and
`publications.groups`.

## Changing the tab icon

The icon is one image: `assets/images/tab_icon.png`.

1. Replace `assets/images/tab_icon.png` with your new image, keeping the same
   name. Use a square PNG, ideally 180×180 or larger; a transparent background
   is fine.
2. Replace `assets/images/apple-touch-icon.png` too. Phones use this one when
   someone adds the site to their home screen. Use a 180×180 PNG **without**
   transparency, because iPhones fill transparent areas with black.
3. In `index.html` and `404.html`, raise the `?v=` number after both icon
   file names (for example `?v=3` to `?v=4`). Browsers keep icons for a long
   time and only fetch the new one when the link changes.

## Files

- `index.html` — page shell, share-preview tags, theme script
- `assets/css/style.css` — all styling; colours are variables at the top
- `assets/js/main.js` — reads the JSON and renders the page
- `assets/images/` — profile photo, paper figures, icons
- `404.html` — page-not-found

When you change `style.css` or `main.js`, also change the `?v=...` number after
them in `index.html` (and the CSS one in `404.html`). Browsers keep those files
for 10 minutes; a new number makes them fetch the new version straight away
instead of mixing the new page with old files. Content edits in the JSON file
don't need this.

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly from disk will
not work, because the browser blocks loading the JSON file.

## Deployment

GitHub Pages serves the `main` branch (Settings → Pages → Deploy from a branch →
`main` / root). Pushing to `main` updates the site.
