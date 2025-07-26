
// Scroll Animation for TILL ESER & Menu
window.addEventListener('scroll', () => {
  const heroTitle = document.getElementById('heroTitle');
  const mainNav = document.getElementById('mainNav');
  if (window.scrollY > 100) {
    heroTitle.style.transform = 'translate(0, -50px)';
    mainNav.style.opacity = '1';
  } else {
    heroTitle.style.transform = 'translate(0, 0)';
    mainNav.style.opacity = '0';
  }

  document.querySelectorAll('.scroll-text').forEach(text => {
    const rect = text.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      text.classList.add('active');
    }
  });
});

// Active Menu Link Highlight
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
  if (window.location.href.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
});

// Close Button
const closeBtn = document.getElementById('closeBtn');
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    closeBtn.classList.toggle('active');
    window.location.href = 'index.html';
  });
}

// Drawing on Canvas
let isDrawing = false;
let canvas, ctx;
window.onload = () => {
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.zIndex = 10;
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mousemove', draw);
};

function draw(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
}
