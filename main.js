(() => {
  'use strict';

  const data = window.PORTFOLIO_DATA || {};
  const sections = [
    ['design.html', 'DESIGN'],
    ['graphic.html', 'GRAPHIC'],
    ['illustration.html', 'ILLUSTRATION'],
    ['cv.html', 'CV'],
    ['contact.html', 'CONTACT']
  ];

  document.querySelectorAll('[data-year]').forEach(node => {
    node.textContent = new Date().getFullYear();
  });

  function make(tag, className, textValue) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (textValue !== undefined) node.textContent = textValue;
    return node;
  }

  function projectUrl(category, id) {
    return `project.html?category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}`;
  }

  function coverElement(className, project, label, imagePath) {
    const cover = make('div', className);
    if (imagePath) {
      const img = make('img');
      img.src = imagePath;
      img.alt = `${project.title} — ${label}`;
      img.loading = 'lazy';
      cover.append(img);
    } else {
      cover.append(
        make('span', 'placeholder-top', 'IMAGE / TILL ESER'),
        make('span', 'placeholder-number', label),
        make('span', 'placeholder-bottom', 'PLACEHOLDER')
      );
    }
    return cover;
  }

  function initProjectGrid() {
    const grid = document.querySelector('[data-project-grid]');
    const category = document.body.dataset.category;
    const categoryData = data[category];
    if (!grid || !categoryData) return;

    categoryData.projects.forEach(project => {
      const link = make('a', 'project-card');
      link.href = projectUrl(category, project.id);
      link.setAttribute('aria-label', `View ${categoryData.label} ${project.title}`);
      const meta = make('span', 'project-meta');
      meta.append(make('span', '', project.title), make('span', 'project-open', 'VIEW PROJECT ↗'));
      link.append(coverElement('project-cover', project, project.id, project.cover), meta);
      grid.append(link);
    });

    const count = document.querySelector('[data-project-count]');
    if (count) count.textContent = String(categoryData.projects.length).padStart(2, '0');
  }

  function initIllustrationGallery() {
    const mosaic = document.querySelector('[data-illustration-mosaic]');
    if (!mosaic) return;
    const artworks = data.illustration?.artworks || [];
    const dialog = document.querySelector('[data-art-lightbox]');
    const stage = dialog.querySelector('[data-lightbox-stage]');
    const rows = [
      [2, 3, 2, 3, 2],
      [3, 2, 2, 3, 2],
      [2, 2, 3, 2, 3],
      [3, 2, 3, 2, 2],
      [2, 3, 2, 2, 3]
    ];
    let current = 0;
    let wheelLocked = false;
    let lastFocused = null;
    artworks.forEach((artwork, index) => {
      const rowIndex = Math.floor(index / 5);
      const widths = rows[rowIndex % rows.length];
      const columnIndex = index % 5;
      const width = widths[columnIndex];
      const columnStart = widths.slice(0, columnIndex).reduce((sum, value) => sum + value, 1);
      const button = make('button', 'illustration-tile');
      button.type = 'button';
      button.setAttribute('aria-label', `Enlarge ${artwork.title}`);
      button.style.setProperty('--tile-column', columnStart);
      button.style.setProperty('--tile-row', rowIndex + 1);
      button.style.setProperty('--tile-width', width);
      button.append(coverElement('illustration-cover', artwork, artwork.id, artwork.image));
      button.addEventListener('click', () => {
        lastFocused = button;
        current = index;
        showArtwork(artwork);
        document.body.classList.add('lightbox-open');
        dialog.showModal();
      });
      mosaic.append(button);
    });

    function showArtwork(artwork) {
      stage.replaceChildren();
      dialog.setAttribute('aria-label', artwork.title);
      if (artwork.image) {
        const image = make('img');
        image.src = artwork.image;
        image.alt = artwork.title;
        stage.append(image);
      } else {
        stage.append(coverElement('lightbox-cover', artwork, artwork.id, ''));
      }
    }

    dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('wheel', event => {
      if (event.ctrlKey) return;
      event.preventDefault();
      if (wheelLocked || event.deltaY === 0) return;
      current = (current + (event.deltaY > 0 ? 1 : -1) + artworks.length) % artworks.length;
      showArtwork(artworks[current]);
      wheelLocked = true;
      window.setTimeout(() => { wheelLocked = false; }, 550);
    }, { passive: false });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('lightbox-open');
      wheelLocked = false;
      lastFocused?.focus();
    });
    const artCount = document.querySelector('[data-art-count]');
    if (artCount) artCount.textContent = String(artworks.length).padStart(2, '0');
  }

  function initProjectDetail() {
    const main = document.querySelector('[data-detail-main]');
    if (!main) return;

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const id = params.get('id');
    const categoryData = data[category];
    const index = categoryData ? categoryData.projects.findIndex(item => item.id === id) : -1;

    if (index === -1) {
      main.append(make('h1', 'page-title', 'NOT FOUND.'));
      const back = make('a', 'detail-crumb', '← BACK TO HOME');
      back.href = 'index.html';
      main.append(back);
      document.title = 'Project not found — Till Eser';
      return;
    }

    const project = categoryData.projects[index];
    document.title = `${project.title} / ${categoryData.label} — Till Eser`;
    document.body.dataset.category = category;

    const kicker = make('div', 'page-kicker');
    const back = make('a', 'detail-crumb', `← ${categoryData.label}`);
    back.href = `${category}.html`;
    kicker.append(back, make('span', '', `PROJECT / ${project.id}`));

    const title = make('h1', 'page-title detail-title', project.title);
    const headline = make('div', 'detail-headline');
    headline.append(make('span', '', categoryData.label), make('span', '', `${project.id} / ${String(categoryData.projects.length).padStart(2, '0')}`));

    const intro = make('div', 'detail-intro');
    intro.append(make('span', 'eyebrow', 'ABOUT THIS PROJECT'), make('p', '', project.description));

    const gallery = make('div', 'detail-gallery');
    const images = [project.cover || '', ...(project.gallery || [])].slice(0, 9);
    while (images.length < 9) images.push('');
    images.forEach((path, galleryIndex) => {
      gallery.append(coverElement('gallery-cover', project, String(galleryIndex + 1).padStart(2, '0'), path));
    });

    const bottom = make('nav', 'detail-bottom-nav');
    bottom.setAttribute('aria-label', 'Project navigation');
    const all = make('a', '', `← ALL ${categoryData.label}`);
    all.href = `${category}.html`;
    const nextProject = categoryData.projects[(index + 1) % categoryData.projects.length];
    const next = make('a', '', `NEXT PROJECT ↗`);
    next.href = projectUrl(category, nextProject.id);
    bottom.append(all, next);

    main.append(kicker, title, headline, intro, gallery, bottom);
  }

  function initFooter() {
    const footer = document.querySelector('[data-footer]');
    if (!footer) return;
    const base = make('div', 'footer-base');
    const backToTop = make('a', 'back-top', 'BACK TO TOP');
    backToTop.href = '#';
    base.append(backToTop);
    footer.append(base);
  }

  function initTopNav() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const nav = make('nav', 'site-top-nav');
    nav.setAttribute('aria-label', 'Portfolio sections');
    const currentPage = window.location.pathname.split('/').pop();
    sections.forEach(([href, label]) => {
      const link = make('a', '', label);
      link.href = href;
      if (currentPage === href || (currentPage === 'project.html' && document.body.dataset.category === href.replace('.html', ''))) {
        link.setAttribute('aria-current', 'page');
      }
      nav.append(link);
    });
    header.insertBefore(nav, header.querySelector('.corner-control'));
  }

  function initCursor() {
    if (!window.CSS?.supports('mix-blend-mode', 'difference')) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (forced-colors: none)');
    const cursor = make('span', 'custom-cursor');
    cursor.setAttribute('aria-hidden', 'true');
    document.body.append(cursor);
    let position = null;
    let frame = 0;

    function syncHost() {
      // Modal dialogs occupy the top layer; keep the cursor above their content.
      const host = document.querySelector('dialog[open]') || document.body;
      if (cursor.parentElement !== host) host.append(cursor);
    }

    function hide() {
      position = null;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      cursor.classList.remove('is-visible');
      document.documentElement.classList.remove('has-custom-cursor');
    }

    function draw() {
      frame = 0;
      if (!position) return;
      syncHost();
      cursor.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      cursor.classList.add('is-visible');
      document.documentElement.classList.add('has-custom-cursor');
    }

    document.addEventListener('pointermove', event => {
      if (!finePointer.matches || event.pointerType !== 'mouse') {
        hide();
        return;
      }
      position = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(draw);
    }, { passive: true });
    document.addEventListener('pointerout', event => { if (!event.relatedTarget) hide(); });
    document.addEventListener('pointerdown', event => { if (event.pointerType !== 'mouse') hide(); }, { passive: true });
    document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); });
    window.addEventListener('blur', hide);
    finePointer.addEventListener('change', hide);
    document.querySelectorAll('dialog').forEach(dialog => {
      new MutationObserver(syncHost).observe(dialog, { attributes: true, attributeFilter: ['open'] });
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const directions = [
    ['x', -1], ['y', 1], ['x', 1], ['y', -1],
    ['y', 1], ['x', -1], ['y', -1], ['x', 1]
  ];
  const enterEase = 'cubic-bezier(.22, 1, .36, 1)';
  const exitEase = 'cubic-bezier(.65, 0, .95, .5)';
  let homeController = null;
  let leaving = false;

  function axisOffset(axis, sign) {
    const distance = axis === 'x' ? window.innerWidth * 1.45 : window.innerHeight * 1.45;
    return axis === 'x'
      ? `translate3d(${sign * distance}px, 0, 0)`
      : `translate3d(0, ${sign * distance}px, 0)`;
  }

  function motion(element, keyframes, options) {
    const animation = element.animate(keyframes, { fill: 'both', ...options });
    return animation.finished.catch(() => {});
  }

  function finishMotion(elements, opacity) {
    elements.forEach(element => {
      element.style.opacity = String(opacity);
      element.style.transform = 'none';
      if (element.getAnimations) element.getAnimations().forEach(animation => animation.cancel());
    });
  }

  function transitionMarker() {
    try { sessionStorage.setItem('te-page-transition', '1'); } catch (error) { /* Navigation still works. */ }
  }

  function consumeTransitionMarker() {
    try {
      const present = sessionStorage.getItem('te-page-transition') === '1';
      sessionStorage.removeItem('te-page-transition');
      return present;
    } catch (error) { return false; }
  }

  function initHome() {
    const title = document.querySelector('[data-intro-title]');
    if (!title) return null;
    const letters = [...document.querySelectorAll('[data-letter]')];
    const rows = [...document.querySelectorAll('[data-menu-row]')];
    const menu = document.querySelector('[data-home-menu]');
    const brand = document.querySelector('[data-home-brand]');
    const control = document.querySelector('[data-home-control]');
    const cue = document.querySelector('[data-scroll-cue]');
    const arriving = consumeTransitionMarker();
    let state = arriving && !reducedMotion.matches && Element.prototype.animate ? 'arriving' : 'start';
    let touchStart = null;

    brand.textContent = '';
    [...'TILL ESER'].forEach(character => {
      if (character === ' ') {
        brand.append(document.createTextNode('\u00a0'));
      } else {
        const span = make('span', 'header-letter', character);
        span.setAttribute('aria-hidden', 'true');
        brand.append(span);
      }
    });
    const headerLetters = [...brand.querySelectorAll('.header-letter')];

    function menuEnabled(enabled) {
      menu.style.pointerEvents = enabled ? 'auto' : 'none';
      menu.setAttribute('aria-hidden', String(!enabled));
      rows.forEach(row => { row.tabIndex = enabled ? 0 : -1; });
      brand.tabIndex = enabled ? 0 : -1;
    }
    menuEnabled(false);

    async function openMenu() {
      if (state !== 'start') return;
      state = 'opening';
      if (reducedMotion.matches || !Element.prototype.animate) {
        title.style.visibility = 'hidden';
        brand.style.visibility = 'visible';
        finishMotion(headerLetters, 1);
        finishMotion(rows, 1);
        cue.style.opacity = '0';
        control.classList.add('is-cross');
        control.setAttribute('aria-label', 'Back to start');
        menuEnabled(true);
        state = 'menu';
        return;
      }

      brand.style.visibility = 'visible';
      control.classList.add('is-cross');
      control.setAttribute('aria-label', 'Back to start');
      cue.style.opacity = '0';
      const paths = [
        ...letters.map((letter, index) => {
          const [axis, sign] = directions[index];
          return motion(letter, [{ transform: 'translate3d(0,0,0)' }, { transform: axisOffset(axis, sign) }],
            { duration: 610, delay: index * 32, easing: exitEase });
        }),
        ...headerLetters.map((letter, index) => {
          const [axis, sign] = directions[(index + 3) % directions.length];
          return motion(letter, [{ transform: axisOffset(axis, sign), opacity: 0 }, { transform: 'translate3d(0,0,0)', opacity: 1 }],
            { duration: 580, delay: 610 + index * 42, easing: enterEase });
        }),
        ...rows.map((row, index) => motion(row,
          [{ transform: axisOffset(row.dataset.axis, Number(row.dataset.sign)), opacity: 0 },
            { transform: 'translate3d(0,0,0)', opacity: 1 }],
          { duration: 650, delay: 690 + index * 90, easing: enterEase }))
      ];
      await Promise.all(paths);
      title.style.visibility = 'hidden';
      letters.forEach(letter => letter.getAnimations().forEach(animation => animation.cancel()));
      finishMotion(headerLetters, 1);
      finishMotion(rows, 1);
      menuEnabled(true);
      state = 'menu';
    }

    async function returnHome() {
      if (state !== 'menu') return;
      state = 'closing';
      menuEnabled(false);
      if (reducedMotion.matches || !Element.prototype.animate) {
        brand.style.visibility = 'hidden';
        title.style.visibility = 'visible';
        finishMotion(headerLetters, 0);
        finishMotion(rows, 0);
        cue.style.opacity = '1';
        control.classList.remove('is-cross');
        control.setAttribute('aria-label', 'Open menu');
        state = 'start';
        return;
      }

      title.style.visibility = 'visible';
      const paths = [
        ...rows.map((row, index) => motion(row,
          [{ transform: 'translate3d(0,0,0)', opacity: 1 }, { transform: axisOffset(row.dataset.axis, Number(row.dataset.sign)), opacity: 0 }],
          { duration: 400, delay: index * 35, easing: exitEase })),
        ...headerLetters.map((letter, index) => {
          const [axis, sign] = directions[(index + 3) % directions.length];
          return motion(letter, [{ transform: 'translate3d(0,0,0)', opacity: 1 }, { transform: axisOffset(axis, sign), opacity: 0 }],
            { duration: 420, delay: index * 25, easing: exitEase });
        }),
        ...letters.map((letter, index) => {
          const [axis, sign] = directions[index];
          return motion(letter, [{ transform: axisOffset(axis, sign) }, { transform: 'translate3d(0,0,0)' }],
            { duration: 620, delay: 320 + index * 34, easing: enterEase });
        })
      ];
      await Promise.all(paths);
      brand.style.visibility = 'hidden';
      finishMotion(headerLetters, 0);
      finishMotion(rows, 0);
      finishMotion(letters, 1);
      cue.style.opacity = '1';
      control.classList.remove('is-cross');
      control.setAttribute('aria-label', 'Open menu');
      state = 'start';
    }

    function depart() {
      menuEnabled(false);
      return [...rows, brand].map((element, index) => motion(element,
        [{ transform: 'translate3d(0,0,0)', opacity: 1 }, { transform: axisOffset('x', -1), opacity: 0 }],
        { duration: 490, delay: index * 30, easing: exitEase }));
    }

    control.addEventListener('click', () => state === 'start' ? openMenu() : returnHome());
    brand.addEventListener('click', event => { event.preventDefault(); returnHome(); });
    document.querySelector('[data-intro-home]').addEventListener('click', event => event.preventDefault());
    document.querySelector('.skip-link').addEventListener('click', async event => {
      event.preventDefault();
      await openMenu();
      rows[0].focus();
    });
    window.addEventListener('wheel', event => {
      if (event.ctrlKey) return;
      event.preventDefault();
      if (event.deltaY > 2) openMenu();
    }, { passive: false });
    window.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientY; }, { passive: true });
    window.addEventListener('touchend', event => {
      if (touchStart !== null && touchStart - event.changedTouches[0].clientY > 30) openMenu();
      touchStart = null;
    }, { passive: true });
    window.addEventListener('keydown', event => {
      if (['ArrowDown', 'PageDown', 'End', ' '].includes(event.key) && state === 'start') {
        event.preventDefault(); openMenu();
      }
    });

    if (arriving && !reducedMotion.matches && Element.prototype.animate) {
      const paths = letters.map((letter, index) => {
        const [axis, sign] = directions[index];
        return motion(letter, [{ transform: axisOffset(axis, sign) }, { transform: 'translate3d(0,0,0)' }],
          { duration: 690, delay: index * 45, easing: enterEase });
      });
      requestAnimationFrame(() => document.documentElement.classList.remove('home-arriving'));
      Promise.all(paths).then(() => {
        finishMotion(letters, 1);
        state = 'start';
      });
    } else {
      document.documentElement.classList.remove('home-arriving');
    }
    return { depart };
  }

  function pageEntrance() {
    if (!consumeTransitionMarker()) {
      document.documentElement.classList.remove('page-entering');
      return;
    }
    if (reducedMotion.matches || !Element.prototype.animate) {
      document.documentElement.classList.remove('page-entering');
      return;
    }

    const heading = document.querySelector('.page-title');
    const tiles = [...document.querySelectorAll('.project-card, .gallery-cover, .illustration-tile, .cv-placeholder, .cv-image, .cv-file-link')];
    const textElements = [...document.querySelectorAll('.site-header, .page-kicker, .section-rule, .detail-headline, .detail-intro, .contact-line, .detail-bottom-nav, .cv-side, .site-footer')];
    const paths = [];
    if (heading) paths.push(motion(heading,
      [{ transform: axisOffset('x', 1), opacity: 0 }, { transform: 'translate3d(0,0,0)', opacity: 1 }],
      { duration: 760, delay: 70, easing: enterEase }));
    textElements.forEach((element, index) => {
      const axis = index % 3 === 0 ? 'y' : 'x';
      const sign = axis === 'y' ? -1 : 1;
      paths.push(motion(element,
        [{ transform: axisOffset(axis, sign), opacity: 0 }, { transform: 'translate3d(0,0,0)', opacity: 1 }],
        { duration: 620, delay: 55 + Math.min(index, 7) * 45, easing: enterEase }));
    });
    tiles.forEach((element, index) => paths.push(motion(element,
      [{ transform: axisOffset('y', 1), opacity: 0 }, { transform: 'translate3d(0,0,0)', opacity: 1 }],
      { duration: 690, delay: 220 + Math.min(index, 12) * 50, easing: enterEase })));
    requestAnimationFrame(() => document.documentElement.classList.remove('page-entering'));
    Promise.all(paths).then(() => finishMotion([heading, ...tiles, ...textElements].filter(Boolean), 1));
  }

  function initNavigationTransitions() {
    document.addEventListener('click', async event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest('a[href]');
      if (!link || link.target && link.target !== '_self' || link.hasAttribute('download')) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || !destination.pathname.endsWith('.html')) return;
      if (destination.pathname === window.location.pathname && destination.search === window.location.search) return;
      if (destination.href === window.location.href || leaving) return;
      event.preventDefault();
      leaving = true;
      transitionMarker();
      if (reducedMotion.matches || !Element.prototype.animate) {
        window.location.assign(destination.href);
        return;
      }

      document.body.style.pointerEvents = 'none';
      const home = document.body.classList.contains('home-page');
      const motions = home && homeController ? homeController.depart() : [];
      if (!home) {
        const textElements = [...document.querySelectorAll('.site-header, .page-kicker, .page-title, .section-rule, .detail-headline, .detail-intro, .contact-line, .detail-bottom-nav, .cv-side, .site-footer')];
        const tiles = [...document.querySelectorAll('.project-card, .gallery-cover, .illustration-tile, .cv-placeholder, .cv-image, .cv-file-link')];
        textElements.forEach((element, index) => motions.push(motion(element,
          [{ transform: 'translate3d(0,0,0)', opacity: 1 }, { transform: axisOffset('x', -1), opacity: 0 }],
          { duration: 470, delay: Math.min(index, 7) * 20, easing: exitEase })));
        tiles.forEach((element, index) => motions.push(motion(element,
          [{ transform: 'translate3d(0,0,0)', opacity: 1 }, { transform: axisOffset('y', 1), opacity: 0 }],
          { duration: 420, delay: Math.min(index, 8) * 25, easing: exitEase })));
      }
      await Promise.all(motions);
      window.location.assign(destination.href);
    });
  }

  initProjectDetail();
  initProjectGrid();
  initIllustrationGallery();
  initTopNav();
  initFooter();
  initCursor();
  homeController = initHome();
  if (!homeController) pageEntrance();
  initNavigationTransitions();
  window.addEventListener('pageshow', event => { if (event.persisted) window.location.reload(); });
})();
