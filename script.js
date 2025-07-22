window.addEventListener('scroll', () => {
  const tillEser = document.getElementById('till-eser');
  const scrollY = window.scrollY || window.pageYOffset;

  // Till Eser bewegt sich beim Scroll ab 50px nach links oben
  if(scrollY > 50){
    tillEser.classList.add('scrolled');
  } else {
    tillEser.classList.remove('scrolled');
  }

  // Animation der vier scroll-text Abschnitte
  const texts = document.querySelectorAll('.scroll-text');
  texts.forEach(text => {
    const rect = text.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.85){
      text.classList.add('visible');
    }
  });
});
