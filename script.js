// Scroll-Effekt für Schrift
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  
  if(scrollY > hero.offsetHeight / 2){
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

// Reset Button Funktion
document.getElementById('resetBtn').addEventListener('click', () => {
  location.reload();  // Seite neu laden (reset)
});
// Aktive Seite im Menü markieren
const menuLinks = document.querySelectorAll('#main-menu a');
const currentPage = window.location.pathname.split('/').pop();

menuLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});
