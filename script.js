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
