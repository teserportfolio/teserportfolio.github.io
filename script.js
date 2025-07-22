const titleNav = document.querySelector('.title-nav-container');
const heroTitle = document.querySelector('.hero-title');
const navWrapper = document.querySelector('.nav-wrapper');
const scrollTexts = document.querySelectorAll('.scroll-text');
const closeBtn = document.getElementById('closeBtn');

let scrollPos = 0;
let maxScrollForAnimation = 500; // Scrollbereich für Animation

window.addEventListener('scroll', () => {
  scrollPos = window.scrollY;

  // Menü und Title sichtbar machen ab 50px scroll
  if(scrollPos > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  // TILL ESER diagonal links oben wandern und kleiner werden
  let maxTitleShift = 80; // px nach oben und links
  let scrollFactor = Math.min(scrollPos / maxScrollForAnimation, 1);

  let shift = maxTitleShift * scrollFactor;
  let scale = 1 - 0.8 * scrollFactor;

  heroTitle.style.transform = `translate(${-shift}px, ${-shift}px) scale(${scale})`;

  // Designwörter reinbewegen, stoppen in Mitte
  scrollTexts.forEach(el => {
    let dir = el.getAttribute('data-direction');
    let moveFactor = Math.min(scrollPos / maxScrollForAnimation, 1);

    if(dir === 'ltr') {
      el.style.left = `${-100 + moveFactor * 150}%`; // Von links rein bis Mitte
      el.style.right = 'auto';
    } else {
      el.style.right = `${-100 + moveFactor * 150}%`; // Von rechts rein bis Mitte
      el.style.left = 'auto';
    }
  });
});

// + Button klick zurück zur Startseite
closeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

