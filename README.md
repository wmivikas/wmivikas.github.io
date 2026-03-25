# PhD Profile Website

This repository now contains a simple, cool, and modular academic profile site.

Each section is in a separate file so you can edit content quickly without touching design code.

## File Structure

- `index.html`: Main page shell
- `assets/css/style.css`: Full design and layout
- `assets/js/main.js`: Loads sections and animations
- `sections/01-hero.html`: Name and quick intro
- `sections/02-about.html`: About and quick facts
- `sections/03-research.html`: Research focus
- `sections/04-publications.html`: Publication list
- `sections/05-projects.html`: Projects section
- `sections/06-contact.html`: Contact details

## Step-by-Step Editing Guide

1. Open `sections/01-hero.html` and update your name, one-line intro, and chips.
2. Open `sections/02-about.html` and fill university, department, and expected graduation.
3. Open `sections/03-research.html` and write your exact PhD topic and interests.
4. Open `sections/04-publications.html` and replace sample papers with your real papers.
5. Open `sections/05-projects.html` and add your top projects with links.
6. Open `sections/06-contact.html` and add your real email and profile links.

## Run Locally

You can open `index.html` directly, but using a local server is better because sections are loaded with JavaScript.

Example with Python:

```bash
python -m http.server 8000
```

Then visit:

`http://localhost:8000`

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. Go to repository Settings > Pages.
3. Set source to deploy from your default branch.
4. Your site will be live at your GitHub Pages URL.