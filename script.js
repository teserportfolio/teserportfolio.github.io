const header = document.querySelector('header');
const menuToggle = document.getElementById('menuToggle');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
});
