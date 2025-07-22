const titleNav = document.getElementById('titleNav');
const heroTitle = document.getElementById('heroTitle');
const mainNav = document.querySelector('.main-nav');
const closeBtn = document.getElementById('closeBtn');
const designSection = document.getElementById('designSection');
const scrollTexts = designSection.querySelectorAll('.scroll-text');

const maxScrollForAnimation = 300;

closeBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > 50) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  // Titel bewegt sich progressiv nach links oben und skaliert
  let progress = Math.min(scrollY / maxScrollForAnimation, 1);

  // Position und Skalierung Titel
  const left = 50 - 49 * progress; // von 50% zu 1%
  const top = 50 - 49 * progress;  // von 50% zu 1%
  const scale = 1 - 0.5 * progress;  // von 1 zu 0.5

  titleNav.style.left = left + '%';
  titleNav.style.top = top + '%';
  titleNav.style.transform = `translate(-${left}%, -${top}%) scale(${scale})`;

  // Design Texte bewegen sich von links/rechts rein
  scrollTexts.forEach(text => {
    let dir = text.getAttribute('data-direction');
    if (scrollY < maxScrollForAnimation) {
      let pos = dir === 'ltr' ? -150 + (150 * progress) : 150 - (150 * progress);
      text.style.transform = `translateX(${pos}%)`;
      text.style.opacity = progress;
    } else {
      text.style.transform = `translateX(0)`;
      text.style.opacity = 1;
    }
  });
});
