const titleNav = document.getElementById('titleNav');
const heroTitle = document.querySelector('.hero-title');
const navWrapper = document.querySelector('.nav-wrapper');
const scrollTexts = document.querySelectorAll('.scroll-text');

let scrollPos = 0;
let maxScrollForAnimation = 500; // Wie weit der Scroll für Animation wirkt

window.addEventListener('scroll', () => {
  scrollPos = window.scrollY;

  // Menü und Title sichtbar machen ab 50px scroll
  if(scrollPos > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  // TILL ESER wandert diagonal links oben und wird kleiner
  let maxTitleShift = 80; // px nach oben und links
  let maxFontSize = 8; // vw original
  let minFontSize = 1.7; // vw im Menü
  let scrollFactor = Math.min(scrollPos / maxScrollForAnimation, 1);

  // Position verschieben
  let shift = maxTitleShift * scrollFactor;
  heroTitle.style.transform = `translate(${-shift}px, ${-shift}px) scale(${1 - 0.8 * scrollFactor})`;

  // Designwörter reinbewegen, stoppen in Mitte
  scrollTexts.forEach(el => {
    let dir = el.getAttribute('data-direction');
    let moveFactor = Math.min(scrollPos / maxScrollForAnimation, 1);

    if(dir === 'ltr') {
      // Von links rein bewegen bis left: 50% - 50% width = Mitte
      el.style.left = `${-100 + moveFactor * 150}%`; // Start -100%, Ziel ca 50%
      el.style.right = 'auto';
    } else {
      // Von rechts rein bewegen bis right: 50% - 50% width = Mitte
      el.style.right = `${-100 + moveFactor * 150}%`;
      el.style.left = 'auto';
    }
  });
});

// + Button klick zurück zur Startseite
document.getElementById('closeBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

