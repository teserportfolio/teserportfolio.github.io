document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  const titleLetters = document.querySelectorAll(".site-title .title-letter");
  const heroChars = document.querySelectorAll(".hero-char");
  const hasHero = document.querySelector(".hero");

  let scatterTriggered = false;

  // Zufällige Offsets für die Random-Buchstaben (PORTFOLIO 2026)
  heroChars.forEach((char) => {
    const angle = Math.random() * Math.PI * 2; // 0 bis 360 Grad
    const distance = 200 + Math.random() * 250; // 200 bis 450 px
    const rx = Math.cos(angle) * distance;
    const ry = Math.sin(angle) * distance;
    char.style.setProperty("--rx", rx + "px");
    char.style.setProperty("--ry", ry + "px");
  });

  // Verzögerung für Implosions-Animation der Header-Buchstaben
  titleLetters.forEach((letter, index) => {
    const delay = index * 0.06;
    letter.style.setProperty("--delay", delay + "s");
  });

  function onScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (hasHero) {
      // Erster Scroll: Random-Buchstaben fliegen auseinander, TILL ESER entsteht
      if (!scatterTriggered && scrollY > 10) {
        scatterTriggered = true;
        document.body.classList.add("scatter-random");
        setTimeout(() => {
          document.body.classList.add("show-name");
        }, 400);
      }

      // Header einblenden, wenn man weiter in Richtung Menü gescrollt hat
      const trigger = window.innerHeight * 0.6;
      if (scrollY > trigger) {
        if (!header.classList.contains("visible")) {
          header.classList.add("visible");
          header.classList.add("animate-title");
        }
      }
    } else {
      // Auf Unterseiten: Header immer sichtbar
      if (header && !header.classList.contains("visible")) {
        header.classList.add("visible");
        header.classList.add("animate-title");
      }
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});
