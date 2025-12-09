document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const titleLetters = document.querySelectorAll(".site-title .title-letter");
  const heroLetters = document.querySelectorAll(".hero-letter");

  let flickerTriggered = false;

  // Verzögerung für Implosions-Animation der Header-Buchstaben (oben links)
  titleLetters.forEach((letter, index) => {
    const delay = index * 0.06;
    letter.style.setProperty("--delay", delay + "s");
  });

  function startFlicker() {
    if (flickerTriggered) return;
    flickerTriggered = true;

    document.body.classList.add("flicker-start");

    const duration = 0.4; // kürzere Flicker-Dauer
let maxDelay = 0;

heroLetters.forEach((letter) => {
  const delay = Math.random() * 0.15; // zufällig 0–0.15s
  maxDelay = Math.max(maxDelay, delay);
  letter.style.animation = `letter-flicker-out ${duration}s ${delay}s forwards`;
});


    // Wenn alle Buchstaben "ausgegangen" sind:
    const total = (maxDelay + duration) * 1000 + 150;

    setTimeout(() => {
      // Hero ausblenden, Scroll-Hinweis verschwindet, Menü wird aktiv
      document.body.classList.add("hide-hero");
      document.body.classList.add("show-menu");

      // Header einblenden und animieren
      if (header && !header.classList.contains("visible")) {
        header.classList.add("visible");
        header.classList.add("animate-title");
      }
    }, total);
  }

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Beim ersten Scrollen Flicker starten
    if (scrollY > 10 && !flickerTriggered) {
      startFlicker();
    }
  }

  window.addEventListener("scroll", onScroll);
});
