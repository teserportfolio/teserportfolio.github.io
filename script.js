document.addEventListener("DOMContentLoaded", () => {
  const titleNav = document.querySelector(".title-nav-container");
  const navWrapper = document.querySelector(".nav-wrapper");
  const scrollTexts = document.querySelectorAll(".scroll-text");

  // Menü und Titel kleiner bei Scroll
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 50) {
      document.body.classList.add("scrolled");
      navWrapper.classList.add("visible");
    } else {
      document.body.classList.remove("scrolled");
      navWrapper.classList.remove("visible");
    }
  });

  // Scrolltext-Bewegung
  if (scrollTexts.length > 0) {
    window.addEventListener("scroll", () => {
      const maxOffset = 300;

      scrollTexts.forEach((el) => {
        const direction = el.dataset.direction === "rtl" ? -1 : 1;
        const offset = Math.min(window.scrollY, maxOffset);
        const move = (maxOffset - offset) * 0.5 * direction;
        el.style.transform = `translateX(${move}px)`;
      });
    });
  }
});
