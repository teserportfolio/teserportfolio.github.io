// Elemente abholen
const titleNav = document.getElementById('titleNav');
const heroTitle = document.getElementById('heroTitle');
const mainNav = document.querySelector('.main-nav');
const closeBtn = document.getElementById('closeBtn');
const designSection = document.getElementById('designSection');
const scrollTexts = designSection.querySelectorAll('.scroll-text');

let lastScrollY = 0;
let maxScrollForAnimation = 300; // scroll-distance für Animationen

// + Button Klick -> Zur Startseite (index.html)
closeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Scroll-Event
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Menü und TILL ESER Animation ab 50px Scroll
  if (scrollY > 50) {
    document.body.classList.add('scrolled');
    heroTitle.classList.add('tilt-left-top');
  } else {
    document.body.classList.remove('scrolled');
    heroTitle.classList.remove('tilt-left-top');
  }

  // TILL ESER wandert und skaliert progressiv bis maxScrollForAnimation
  let progress = Math.min(scrollY / maxScrollForAnimation, 1);

  // Position und Größe vom Titel (linear interpoliert)
  // Anfang: mittig (50%,50%), scale 1
  // Ende: links oben (1rem, 1rem), scale 0.5
  const left = (50 - 49 * progress); // von 50% zu 1%
  const top = (50 - 49 * progress);  // von 50% zu 1%
  const scale = 1 - 0.5 * progress;  // von 1 zu 0.5

  titleNav.style.left = left + '%';
  titleNav.style.top = top + '%';
  titleNav.style.transform = `translate(-${left}%, -${top}%) scale(${scale})`;

  // Design Schriftzüge mit ScrollY bewegen
  scrollTexts.forEach(text => {
    let dir = text.getAttribute('data-direction');
    if (scrollY < maxScrollForAnimation) {
      // Je nach Richtung bewegen (von -150% oder 150% nach 0)
      let pos = dir === 'ltr' ? -150 + (150 * progress) : 150 - (150 * progress);
      text.style.transform = `translateX(${pos}%)`;
      text.style.opacity = progress;
    } else {
      text.style.transform = `translateX(0)`;
      text.style.opacity = 1;
    }
  });
});
