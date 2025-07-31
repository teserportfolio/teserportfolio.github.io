window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

document.getElementById('menuToggle').addEventListener('click', () => {
  const menuToggle = document.getElementById('menuToggle');
  menuToggle.textContent = menuToggle.textContent === '+' ? 'X' : '+';
});
