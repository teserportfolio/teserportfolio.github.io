const header = document.querySelector('header');
const menuToggle = document.getElementById('menuToggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  // Hier kannst du erweitern, ob das Menü z.B. aufklappt oder Seiten schließt
});
