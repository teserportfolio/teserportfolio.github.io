// Scroll-Animation für Titel + Menü
window.addEventListener("scroll", () => {
  const container = document.querySelector(".title-nav-container");
  if (window.scrollY > 10) {
    document.body.classList.add("scrolled");
  } else {
    document.body.classList.remove("scrolled");
  }
});

// Texte mit Scroll einblenden
const scrollTexts = document.querySelectorAll(".scroll-text");
let triggered = [];

function revealOnScroll() {
  scrollTexts.forEach((text, i) => {
    const rect = text.getBoundingClientRect();
    const inMiddle = rect.top >= window.innerHeight / 3 && rect.top <= window.innerHeight * 2 / 3;
    if (inMiddle && !triggered[i]) {
      text.classList.add("visible");
      triggered[i] = true;
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
