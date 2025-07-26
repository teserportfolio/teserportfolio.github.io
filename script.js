const header = document.querySelector('.header');
const heroTitle = document.querySelector('.hero-title');
const nav = document.querySelector('.main-nav');
const closeBtn = document.getElementById('closeBtn');
const scrollTexts = document.querySelectorAll('.scroll-text');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  if (scrollY > window.innerHeight * 0.5) {
    header.classList.add('show');
  } else {
    header.classList.remove('show');
  }

  // Animate Design Texts
  scrollTexts.forEach((text, index) => {
    let direction = text.dataset.direction === 'ltr' ? 1 : -1;
    let moveAmount = Math.min(scrollY * 0.3 * direction, window.innerWidth / 2 - 100);
    text.style.transform = `translateX(${moveAmount}px)`;
  });
});

// Canvas Drawing
const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let lastX = 0;
let lastY = 0;

function startDrawing(e) {
  drawing = true;
  [lastX, lastY] = [e.clientX, e.clientY];
  canvas.style.pointerEvents = 'auto';
}

function stopDrawing() {
  drawing = false;
  ctx.beginPath();
  canvas.style.pointerEvents = 'none';
}

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.shadowColor = 'white';
  ctx.shadowBlur = 2;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();

  [lastX, lastY] = [e.clientX, e.clientY];
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseleave', stopDrawing);

// Reset Canvas on "+" Click
closeBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  window.location.href = 'index.html';
});
