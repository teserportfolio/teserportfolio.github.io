const menuToggle = document.getElementById('menuToggle');
let menuOpen = false;

menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  if (menuOpen) {
    menuToggle.classList.add('open');
  } else {
    menuToggle.classList.remove('open');
  }
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});
