// Elements
const titleNav = document.getElementById('titleNav');
const heroTitle = document.getElementById('heroTitle');
const mainNav = document.getElementById('mainNav');
const closeBtn = document.getElementById('closeBtn');
const designSection = document.getElementById('designSection');
const scrollTexts = designSection.querySelectorAll('.scroll-text');

let scrolled = false;
let scrollPosition = 0;

// Handle scroll: Title verschiebt sich nach links oben, Menü erscheint
window.addEventListener('scroll', () => {
  scrollPosition = window.scrollY;

  if(scrollPosition > 50 && !scrolled) {
    document.body.classList.add('scrolled');
    scrolled = true;
  } else if(scrollPosition <= 50 && scrolled) {
    document.body.classList.remove('scrolled');
    scrolled = false;
  }

  // Hero title bewegt sich diagonal nach links oben beim Scrollen (linear)
  if(scrollPosition <= window.innerHeight) {
    const maxShiftX = -window.innerWidth/2 + 30; // links mit etwas Rand
    const maxShiftY = -window.innerHeight/2 + 30; // oben mit Rand
    const progress = scrollPosition / window.innerHeight;

    heroTitle.style.transform = `translate(${maxShiftX * progress}px, ${maxShiftY * progress}px) scale(${1 - 0.5 * progress})`;
  }
});

// Plus-Button: klick zurück zur Startseite (index.html)
closeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Scroll-Event für Design-Wörter, die sich reinschieben mit Mausrad
let designScrollPos = 0;

window.addEventListener('wheel', (e) => {
  // Nur auf index.html
  if(!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') return;

  designScrollPos += e.deltaY;

  // Clamp scroll position für Design-Wörter (min 0 max 100)
  if(designScrollPos < 0) designScrollPos = 0;
  if(designScrollPos > 100) designScrollPos = 100;

  // Zeige und verschiebe Design-Wörter abhängig vom scroll Wert
  scrollTexts.forEach((text, i) => {
    if(designScrollPos > i * 15) {
      text.classList.add('visible');
    } else {
      text.classList.remove('visible');
    }
  });
});
