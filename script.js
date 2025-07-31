window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const siteTitle = document.getElementById('siteTitle');
  const mainNav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.getElementById('menuToggle').addEventListener('click', () => {
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.classList.toggle('active');
});
