const heroTitle = document.querySelector('.hero-title');
const scrollTexts = document.querySelectorAll('.scroll-text');
const closeBtn = document.getElementById('closeBtn');

const maxScrollForAnimation = 500; // Scrollbereich für Animation

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  // Menü und Titel anzeigen ab 50px Scroll
  if (scrollPos > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  // TILL ESER nach links oben bewegen (nicht diagonal)
  const scrollFactor = Math.min(scrollPos / maxScrollForAnimation, 1);

  const shiftX = 80 * scrollFactor;  // 80px nach links
  const shiftY = 80 * scrollFactor;  // 80px nach oben
  const scale = 1 - 0.8 * scrollFactor;

  heroTitle.style.transform = `translate(${-shiftX}px, ${-shiftY}px) scale(${scale})`;

  // Designwörter bewegen: links nach rechts oder rechts nach links bis Mitte
  scrollTexts.forEach(el => {
    const dir = el.getAttribute('data-direction');
    const moveFactor = Math.min(scrollPos / maxScrollForAnimation, 1);

    if (dir === 'ltr') {
      // Von links nach Mitte (50%)
      el.style.left = `${-100 + moveFactor * 150}%`;
      el.style.right = 'auto';
    } else {
      // Von rechts nach Mitte (50%)
      el.style.right = `${-100 + moveFactor * 150}%`;
      el.style.left = 'auto';
    }
  });
});

// + Button klick zurück zur Startseite
closeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
