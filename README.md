# Academic Profile Template

This repository is a reusable personal academic website template.

The workflow is intentionally simple:
- You only edit one file: `assets/data/site-content.json`
- The website updates automatically from that data
- No build tools, no frameworks, no npm setup

## Quick Start

1. Fork this repository or click `Use this template` on GitHub.
2. Open `assets/data/site-content.json`.
3. Replace sample values with your own details.
4. Commit and push.
5. Enable GitHub Pages from your repository settings.

## Project Structure

- `index.html`: Main HTML shell
- `assets/css/style.css`: Full styling (light and dark mode)
- `assets/js/main.js`: Data loader + renderer + theme logic
- `assets/data/site-content.json`: Main editable content file
- `assets/images/`: Profile image and publication thumbnails
- `sections/`: Fallback HTML sections (used only if JSON file cannot be loaded)

## Main Editing File

Edit this file:

- `assets/data/site-content.json`

### Editable blocks

- `site`: browser title, description, brand text, footer name
- `hero`: name, role line, photo, intro paragraphs
- `highlightsHeading` and `highlights`: announcements
- `publicationsHeading` and `publications`: papers and links
- `contact`: contact text and links

## Example: Update Name and Role

In `assets/data/site-content.json`, update:

```json
"hero": {
	"name": "Your Name",
	"metaLine": "PhD Student, Department, University",
	"imageSrc": "assets/images/your-photo.png"
}
```

## Example: Add a Publication

Add one object inside `publications`:

```json
{
	"title": "Your Paper Title",
	"meta": "Your Name, Co-author | Venue (Year)",
	"summary": "One-line summary of your contribution.",
	"thumbnail": "assets/images/paper-thumb-1.svg",
	"thumbnailAlt": "Paper thumbnail",
	"links": [
		{ "label": "Paper", "url": "https://example.com/paper" },
		{ "label": "Code", "url": "https://github.com/your-repo" }
	]
}
```

## Add Your Profile Image

1. Put your image in `assets/images/`.
2. Update `hero.imageSrc` in `assets/data/site-content.json`.
3. Commit and push.

## Local Preview

You can open `index.html` directly in a browser.

If your browser blocks local JSON fetch, use a simple local static server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy on GitHub Pages

1. Push repository to GitHub.
2. Open `Settings` -> `Pages`.
3. In `Build and deployment`, set:
	 - Source: `Deploy from a branch`
	 - Branch: `main` (or your default branch), folder `/root`
4. Save and wait for deployment.
5. Your site URL will appear on the same page.

## Template Behavior

- Site reads `assets/data/site-content.json` first.
- If loading fails, it falls back to `sections/*.html` files.
- Theme preference is stored in browser local storage.

## Notes for Template Users

- Keep JSON valid (commas, quotes, brackets).
- Use full URLs for external links (for example `https://...`).
- Use `mailto:your-email@example.com` for email links.

## License

Use and modify this template freely for personal academic websites.