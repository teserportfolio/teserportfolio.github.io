document.addEventListener("DOMContentLoaded", () => {
  const titleNav = document.querySelector(".title-nav-container");
  const navWrapper = document.querySelector(".nav-wrapper");
  const scrollTexts = document.querySelectorAll(".scroll-text");

  // === Scroll-Verhalten für TILL ESER + Menü ===
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
      titleNav.classList.add("scrolled");
      navWrapper.classList.add("visible");
    } else {
      titleNav.classList.remove("scrolled");
      navWrapper.classList.remove("visible");
    }
  });

  // === Scroll-Animation der Begriffe (Index-Seite) ===
  if (scrollTexts.length > 0) {
    window.addEventListener("scroll", () => {
      const maxOffset = 300; // bis zu welchem scrollY die Bewegung geht

      scrollTexts.forEach((el, index) => {
        const direction = el.dataset.direction === "rtl" ? -1 : 1;
        const offset = Math.min(window.scrollY, maxOffset);
        const move = (maxOffset - offset) * 0.5 * direction;

        el.style.transform = `translateX(${move}px)`;
      });
    });
  }
});

});
