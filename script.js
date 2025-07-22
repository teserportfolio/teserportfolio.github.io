window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.body.classList.toggle('scrolled', scrollY > 50);
});