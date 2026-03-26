# Academic Profile Template

This repository is a reusable personal academic website template.

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
- `hero`: name, role line, photo, intro
- `highlightsHeading` + `highlights`: updates and announcements
- `publicationsHeading` + `publications`: papers and links
- `contact`: direct contact values + optional custom items

## Copy-Paste Starter Content

Replace the full `assets/data/site-content.json` with this minimal starter:

```json
{
	"site": {
		"title": "Your Name | Academic Profile",
		"description": "Personal academic website.",
		"brandName": "Your Name",
		"footerName": "Your Name",
		"templateVersion": "1.1"
	},
	"hero": {
		"kicker": "About",
		"name": "Your Name",
		"metaLine": "PhD Student, Department, University",
		"imageSrc": "assets/images/your-photo.png",
		"imageAlt": "Your profile photo",
		"paragraphs": [
			"Write 2-3 lines about your research focus.",
			"Add your current work and interests."
		]
	},
	"highlightsHeading": {
		"kicker": "Highlights",
		"title": "Updates & Announcements"
	},
	"highlights": [
		{
			"date": "MMM YYYY",
			"text": "Add your update here.",
			"links": []
		}
	],
	"publicationsHeading": {
		"kicker": "Publications",
		"title": "Selected Publications"
	},
	"publications": [
		{
			"title": "Paper Title",
			"meta": "Author One, Author Two | Venue (Year)",
			"summary": "One-line summary.",
			"thumbnail": "assets/images/paper-thumb-1.svg",
			"thumbnailAlt": "Publication thumbnail",
			"links": []
		}
	],
	"contact": {
		"kicker": "Contact",
		"title": "Get In Touch",
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