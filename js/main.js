(() => {
  'use strict';

  const data = window.PORTFOLIO_DATA || {};
  const categoryPages = ['design', 'graphic', 'illustration'];
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

  function initProjectDetail() {
    const main = document.querySelector('[data-detail-main]');
    if (!main) return;

    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const id = params.get('id');
    const categoryData = data[category];
    const index = categoryData ? categoryData.projects.findIndex(item => item.id === id) : -1;

    if (index === -1) {
      main.append(make('div', 'page-kicker', 'PORTFOLIO / PROJECT'));
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

    const layout = make('div', 'detail-layout');
    const copy = make('div', 'detail-copy');
    copy.append(make('span', 'eyebrow', 'PROJECT INFORMATION'), make('p', '', project.description));
    const facts = make('div', 'detail-facts');
    const factA = make('div');
    factA.append(make('span', '', 'CATEGORY'), make('span', '', categoryData.label));
    const factB = make('div');
    factB.append(make('span', '', 'PROJECT'), make('span', '', project.id));
    facts.append(factA, factB);
    copy.append(facts);
    layout.append(coverElement('detail-cover', project, project.id, project.cover), copy);

    const gallery = make('div', 'detail-gallery');
    const images = project.gallery && project.gallery.length ? project.gallery : ['', '', ''];
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

    main.append(kicker, title, headline, layout, gallery, bottom);
  }

  function initFooter() {
    const footer = document.querySelector('[data-footer]');
    if (!footer) return;
    const nav = make('nav', 'footer-nav');
    nav.setAttribute('aria-label', 'Footer navigation');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    sections.forEach(([href, label]) => {
      const link = make('a', '', label);
      link.href = href;
      if (currentPage === href || (currentPage === 'project.html' && document.body.dataset.category === href.replace('.html', ''))) {
        link.setAttribute('aria-current', 'page');
      }
      nav.append(link);
    });
    const base = make('div', 'footer-base');
    const backToTop = make('a', 'back-top', 'BACK TO TOP ↑');
    backToTop.href = '#';
    base.append(make('span', '', `© ${new Date().getFullYear()} TILL ESER`), backToTop);
    footer.append(nav, base);
  }

  function initHome() {
    const title = document.querySelector('[data-intro-title]');
    if (!title) return;
    const target = document.querySelector('.brand-measure');
    const letters = [...document.querySelectorAll('[data-letter]')];
    const rows = [...document.querySelectorAll('[data-menu-row]')];
    const menu = document.querySelector('[data-home-menu]');
    const control = document.querySelector('[data-home-control]');
    const cue = document.querySelector('[data-scroll-cue]');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const vectors = [
      [-.25, -.28, -12], [-.14, .25, 8], [-.06, -.20, -8], [.015, .31, 11],
      [-.03, -.30, -8], [.11, .22, 9], [.19, -.25, -10], [.28, .19, 12]
    ];

    let metrics = {};
    let latestProgress = 0;
    let ticking = false;
    const clamp = value => Math.min(1, Math.max(0, value));
    const ease = value => 1 - Math.pow(1 - value, 3);

    function measure() {
      const rect = target.getBoundingClientRect();
      metrics = {
        dx: rect.left + rect.width / 2 - window.innerWidth / 2,
        dy: rect.top + rect.height / 2 - window.innerHeight / 2,
        scale: rect.width / title.offsetWidth,
        width: window.innerWidth,
        height: window.innerHeight
      };
      render();
    }

    function render() {
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const rawProgress = clamp(window.scrollY / scrollRange);
      const progress = reduced.matches ? (rawProgress > 0.06 ? 1 : 0) : rawProgress;
      latestProgress = progress;
      const burst = reduced.matches ? 0 : Math.pow(Math.sin(Math.PI * progress), 2);
      const scale = 1 + (metrics.scale - 1) * progress;

      title.style.transform = `translate(-50%, -50%) translate3d(${metrics.dx * progress}px, ${metrics.dy * progress}px, 0) scale(${scale})`;
      letters.forEach((letter, index) => {
        const [x, y, rotation] = vectors[index];
        letter.style.transform = `translate3d(${x * metrics.width * burst}px, ${y * metrics.height * burst}px, 0) rotate(${rotation * burst}deg)`;
      });

      rows.forEach((row, index) => {
        const amount = ease(clamp((progress - (0.17 + index * 0.055)) / 0.43));
        const inverse = 1 - amount;
        row.style.transform = `translate3d(${Number(row.dataset.x) * inverse}vw, ${Number(row.dataset.y) * inverse}vh, 0)`;
        row.style.opacity = amount;
      });

      const enabled = progress > 0.79;
      menu.style.pointerEvents = enabled ? 'auto' : 'none';
      menu.setAttribute('aria-hidden', String(!enabled));
      rows.forEach(row => { row.tabIndex = enabled ? 0 : -1; });
      cue.style.opacity = 1 - clamp(progress / 0.35);
      control.firstElementChild.style.transform = `rotate(${45 * progress}deg)`;
      control.setAttribute('aria-label', progress > 0.5 ? 'Back to start' : 'Open menu');
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { render(); ticking = false; });
    }

    function goTo(top) {
      window.scrollTo({ top, behavior: reduced.matches ? 'auto' : 'smooth' });
    }

    control.addEventListener('click', () => {
      const end = document.documentElement.scrollHeight - window.innerHeight;
      goTo(latestProgress > 0.5 ? 0 : end);
    });
    document.querySelector('[data-intro-home]').addEventListener('click', event => {
      event.preventDefault(); goTo(0);
    });
    document.querySelector('.skip-link').addEventListener('click', event => {
      event.preventDefault(); goTo(document.documentElement.scrollHeight - window.innerHeight);
      setTimeout(() => { if (rows[0].tabIndex === 0) rows[0].focus(); }, reduced.matches ? 0 : 850);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    reduced.addEventListener('change', measure);
    measure();
  }

  initProjectDetail();
  initProjectGrid();
  initFooter();
  initHome();
})();
