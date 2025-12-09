document.addEventListener("DOMContentLoaded", function () {
  const heroLetters = document.querySelectorAll(".hero-letter");
  const header = document.querySelector(".site-header");
  const titleLetters = document.querySelectorAll(".site-title .title-letter");

  // Offsets für die Drift-Animation setzen (aus data-x / data-y)
  heroLetters.forEach((letter) => {
    const x = letter.dataset.x || 0;
    const y = letter.dataset.y || 0;
    letter.style.setProperty("--x", x + "px");
    letter.style.setProperty("--y", y + "px");
  });

  // Verzögerung für Implosions-Animation der Header-Buchstaben
  titleLetters.forEach((letter, index) => {
    const delay = index * 0.06;
    letter.style.setProperty("--delay", delay + "s");
  });

  // Scroll-Logik nur auf der Startseite mit HERO
  const hasHero = document.querySelector(".hero");

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (hasHero) {
      // Sobald ein wenig gescrolled wird, Buchstaben auseinanderlaufen lassen
      if (scrollY > 10) {
        document.body.classList.add("disperse-hero");
      } else {
        document.body.classList.remove("disperse-hero");
      }

      // Header einblenden, wenn man deutlich in Richtung Menü gescrollt hat
      const trigger = window.innerHeight * 0.3;
      if (scrollY > trigger) {
        if (!header.classList.contains("visible")) {
          header.classList.add("visible");
          header.classList.add("animate-title");
        }
      }
    } else {
      // Auf Unterseiten ist der Header immer sichtbar
      if (header && !header.classList.contains("visible")) {
        header.classList.add("visible");
        header.classList.add("animate-title");
      }
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});

