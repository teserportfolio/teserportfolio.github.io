const header = document.querySelector('.header');
const heroTitle = document.querySelector('.hero-title');
const designTexts = document.querySelectorAll('.design-text');
const designContainer = document.querySelector('.design-text-container');
const closeBtn = document.getElementById('closeBtn');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Menü und Titel verschieben sich
  if (scrollY > window.innerHeight * 0.4) {
    header.classList.add('show');
    document.body.classList.add('show-texts');
  } else {
    header.classList.remove('show');
    document.body.classList.remove('show-texts');
  }

  // Design Texte zerfallen beim weiteren Scrollen
  if (scrollY > window.innerHeight * 1.2) {
    document.body.classList.add('disappear');
    designTexts.forEach(text => {
      const chars = text.querySelectorAll('span');
      chars.forEach((char, i) => {
        setTimeout(() => char.classList.add('hide'), i * 30);
      });
    });
  }
});

// Text in Buchstaben aufteilen
designTexts.forEach(text => {
  const letters = text.textContent.split('');
  text.innerHTML = letters.map(l => `<span>${l}</span>`).join('');
});

// Reset über "+"
closeBtn.addEventListener('click', () => {
  location.reload();
});
