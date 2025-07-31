const menuToggle = document.getElementById('menuToggle');
const scrollTexts = document.querySelectorAll('.scroll-text');

// Toggle + to X
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  // Optional: Reset drawings or open menu
});

// Scroll Animation for Texts
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + window.innerHeight;

  scrollTexts.forEach(text => {
    if (scrollY > text.offsetTop + 100) {
      text.classList.add('visible');
    }
  });
});
