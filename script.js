const heroTitle = document.querySelector('.hero-title');
const scrollTexts = document.querySelectorAll('.scroll-text');
const closeBtn = document.getElementById('closeBtn');

const maxScroll = 300; // Scrollbereich für Animationen

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Menü und Titel anzeigen ab 50px Scroll
  if (scrollY > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  // TILL ESER bewegt sich nach links oben und wird kleiner
  const progress = Math.min(scrollY / maxScroll, 1);

  const translateX = -progress * heroTitle.getBoundingClientRect().left; // bis ganz links (0)
  const translateY = -progress * (heroTitle.getBoundingClientRect().top + window.scrollY); // bis ganz oben (0)
  const scale = 1 - 0.6 * progress; // von 1 auf 0.4 skalieren

  heroTitle.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

  // Design-Schriftzüge schieben sich rein
  scrollTexts.forEach(el => {
    const direction = el.getAttribute('data-direction');
    const baseOffset = 150; // Startposition außerhalb (in Prozent)

    let posPercent = baseOffset * (1 - progress);

    if (direction === 'ltr') {
      // Von links rein: left startet bei -150%, geht auf 0%
      el.style.left = `${-posPercent}%`;
      el.style.right = 'auto';
    } else {
      // Von rechts rein: right startet bei -150%, geht auf 0%
      el.style.right = `${-posPercent}%`;
      el.style.left = 'auto';
    }
  });
});

// + Button klick zurück zur Startseite
closeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});
