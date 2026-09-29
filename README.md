# Till Eser — portfolio

A static black-and-white portfolio for GitHub Pages. No build command or external library is needed.

## Files

- `index.html` — scroll-driven introduction and menu
- `design.html`, `graphic.html`, `illustration.html` — nine square project cards per category
- `project.html` — individual project view, selected by its URL parameters
- `cv.html`, `contact.html` — CV placeholder and contact details
- `assets/css/style.css` — layout and typography
- `assets/js/main.js` — animation, navigation and project rendering
- `assets/js/projects.js` — editable project titles, descriptions and image paths

## Put it on your existing GitHub Pages website

1. Back up the files currently published from your repository.
2. Copy the **contents** of this folder into the directory GitHub Pages already publishes, usually the repository root. Keep the `assets` folder structure intact.
3. Commit and push the changed files. `index.html` becomes the start page.

All links and asset paths are relative, so the site also works when GitHub Pages serves a repository under a path such as `/my-portfolio/`.

To preview locally, open a terminal in this folder and run `python3 -m http.server 8000`; then open `http://localhost:8000/`.

## Replace project placeholders

Each category has nine entries in `assets/js/projects.js`. The nine cards lead to individual URLs such as `project.html?category=design&id=01`.

Add images to `assets/images/` and edit an entry, for example:

```js
{
  id: '01',
  title: 'YOUR PROJECT NAME',
  description: 'A short project description.',
  cover: 'assets/images/design-01.jpg',
  gallery: [
    'assets/images/design-01-detail-a.jpg',
    'assets/images/design-01-detail-b.jpg'
  ]
}
```

The cover fills the square on the overview page and the main square on the project page. Gallery images appear beneath it. Empty image paths remain visible placeholders. Add or remove entries if the number of projects changes; the page count updates automatically.

## Add the CV

The block with class `cv-placeholder` in `cv.html` is temporary. After uploading a CV file to `assets/files/`, replace that block with either a PDF link or an image. Examples:

```html
<a class="cv-file-link" href="assets/files/till-eser-cv.pdf" target="_blank" rel="noopener">OPEN CV (PDF) ↗</a>
```

```html
<img class="cv-image" src="assets/files/till-eser-cv.png" alt="CV of Till Eser">
```

The email address and phone number are in `contact.html`. Change them there if needed.

## Interaction

- Scroll down on the start page to disperse the title letters and assemble the five menu links.
- The `+` opens the menu. It rotates into an `×` and returns to the start when clicked again.
- The small `TILL ESER` title at the end of the animation also returns to the start. On inner pages the title and `×` lead to `index.html`.
- The animation follows scroll position, including scrolling back upward. Reduced-motion settings remove the letter scattering.
