# Till Eser — GitHub Pages correction

This package matches the current structure of `teserportfolio/teserportfolio.github.io`: every HTML, CSS and JavaScript file sits directly in the repository root.

## Update the existing repository

1. Extract this ZIP on your computer.
2. On the repository Code page, choose Add file → Upload files.
3. Upload the extracted files themselves (not the enclosing folder or ZIP). They replace the files with the same names in the root. Commit the changes.
4. Open `https://teserportfolio.github.io/` again after the Pages deployment completes. If your browser shows a cached version, reload it with Ctrl+F5.

The entry file `index.html` now loads `style.css` and `main.js` from the root. Design, Graphic, Illustration and project pages load `projects.js` from the root too. Each category has nine square project placeholders.

## Later edits

Project text and image paths are in `projects.js`. If you add images, create an `assets/images/` folder and use paths such as `assets/images/design-01.jpg` in that file. The CV placeholder is in `cv.html`; the contact details are in `contact.html`.
