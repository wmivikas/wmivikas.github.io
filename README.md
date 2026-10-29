# Academic Profile Template

This repository is a reusable personal academic website template.

The design follows the look and layout of
[al-folio](https://github.com/alshedivat/al-folio) — purple/cyan accent, Roboto Slab headings, a
right-floated profile photo, a centred social-icon row, a dated news table, and a bibliography-style
publication list with venue badges — but it is plain HTML, CSS and JSON. There is no Jekyll, no Ruby
and no theme submodule, so edits show up the moment you push.

The workflow is simple:
- Edit one file: `assets/data/site-content.json`
- Commit and push
- Your website updates automatically

No build tools, no framework setup, and no npm required.

## Quick Start

1. Fork this repository or click `Use this template` on GitHub.
2. Open `assets/data/site-content.json`.
3. Replace sample values with your own details.
4. Commit and push.
5. Enable GitHub Pages in repository settings.

## Project Structure

- `index.html`: Main HTML shell
- `rejections.html`: Optional secondary page (loads only the Rejections section)
- `assets/css/style.css`: Styling and responsive layout
- `assets/js/main.js`: Data loader and section renderer
- `assets/data/site-content.json`: Main editable content
- `assets/images/`: Profile image and publication thumbnails
- `sections/`: Optional fallback HTML sections

## Main Editing File

Edit only:

- `assets/data/site-content.json`

### Editable Blocks

- `site`: title, description, brand, footer, template version
	- `templateVersion` is optional; keep it empty to hide in footer.
	- `lastUpdated` controls footer updated time.
	- `authorName` is your name as it appears in author lists; it is underlined and bolded
	  automatically in every publication entry.
- `hero`: name, subtitle, photo, intro
	- `subtitleHtml` is the grey line under your name; links are allowed.
	- `paragraphsHtml` is the about text, one entry per paragraph; links are allowed.
	  `paragraphs` (plain text, no links) is used only if `paragraphsHtml` is missing.
	- `imageCaptionHtml` is the small address block under the photo; use `<br />` for line breaks.
- `highlightsHeading` + `highlights`: the `news` table (`date`, `text`, `links`)
- `rejectionsHeading` + `rejections`: same shape as news; `rejectionsHeading.intro` adds a lead line
- `publicationsHeading` + `publications`: papers, grouped by `year` automatically (newest first)
	- `abbr`: short venue tag shown in the coloured badge, e.g. `NeurIPS`
	- `authors`: full author list as one string
	- `venue`: full venue name, shown in italics with the year
	- `summary`: one or two lines of abstract
	- `links`: buttons under the entry; an entry with an empty `url` is hidden
- `contact`: direct contact values + optional custom items
	- These same values also drive the social-icon row on the about section.

## Copy-Paste Starter Content

Replace the full `assets/data/site-content.json` with this minimal starter:

```json
{
	"site": {
		"title": "Your Name | Academic Profile",
		"description": "Personal academic website.",
		"brandName": "Your Name",
		"footerName": "Your Name",
		"authorName": "Your Name",
		"templateVersion": "",
		"lastUpdated": "2026-03-28T18:30:00+05:30"
	},
	"hero": {
		"name": "Your Name",
		"subtitleHtml": "PhD Student, Department, <a href=\"https://example.edu/\">University</a>",
		"imageSrc": "assets/images/your-photo.png",
		"imageAlt": "Your profile photo",
		"imageCaptionHtml": "Department<br />University<br />City, Country",
		"paragraphsHtml": [
			"Write 2-3 lines about your research focus.",
			"Add your current work and interests."
		]
	},
	"highlightsHeading": {
		"title": "news"
	},
	"highlights": [
		{
			"date": "MMM YYYY",
			"text": "Add your update here.",
			"links": []
		}
	],
	"publicationsHeading": {
		"title": "selected publications"
	},
	"publications": [
		{
			"title": "Paper Title",
			"abbr": "Venue",
			"authors": "Your Name, Author Two",
			"venue": "Conference or Journal Name",
			"year": "2026",
			"summary": "One-line summary.",
			"thumbnail": "assets/images/paper-thumb-1.svg",
			"thumbnailAlt": "Publication thumbnail",
			"links": [{ "label": "PDF", "url": "" }]
		}
	],
	"contact": {
		"title": "contact",
		"intro": "Open to collaborations and discussions.",
		"email": "you@example.com",
		"linkedin": "your-linkedin-handle",
		"linkedinUrl": "https://www.linkedin.com/in/your-profile/",
		"github": "your-github-username",
		"githubUrl": "https://github.com/your-github-username",
		"googleScholar": "",
		"googleScholarLabel": "Scholar Profile",
		"cv": "",
		"cvLabel": "Download CV",
		"orcid": "",
		"orcidLabel": "ORCID Profile",
		"twitter": "",
		"twitterUrl": "",
		"twitterLabel": "@handle",
		"items": []
	}
}
```

## Optional Contact Fields

The renderer now supports these optional fields in `contact`:

- `googleScholar`
- `cv`
- `orcid`
- `twitter`

If any of these values are empty, they are not shown on the page.

## Changing the Accent Colour

Both themes are defined at the top of `assets/css/style.css`:

- Light mode uses `--af-purple` (`#b509ac`), al-folio's default accent.
- Dark mode uses `--af-cyan` (`#2698ba`).

Change those two values and the whole site follows — links, badges, nav highlight, progress bar and
favicon.

## Local Preview

Open `index.html` directly, or run a local server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy on GitHub Pages

1. Push repository to GitHub.
2. Open `Settings` -> `Pages`.
3. Set source to `Deploy from a branch`.
4. Select branch `main` (or default) and folder `/root`.
5. Save and wait for deployment.

## Should You Remove the Sections Folder?

Short answer: keep it unless you want to remove fallback support.

- Keep `sections/` if you want a backup path when JSON fails.
- Remove `sections/` only if you want a strict JSON-only template.
- If you remove `sections/`, also remove fallback loading logic from `assets/js/main.js`.

## Notes

- Keep JSON syntax valid (commas, quotes, brackets).
- Use full links with `https://`.
- Use `mailto:you@example.com` for email links.

## License

Use and modify this template freely for personal academic websites.