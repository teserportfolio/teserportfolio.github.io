window.addEventListener('scroll', () => {
  const heroTitle = document.getElementById('hero-title');
  const nav = document.getElementById('main-nav');
  let scrollY = window.scrollY;
  heroTitle.style.transform = `translate(${Math.min(-scrollY, -window.innerWidth / 2 + 100)}px, ${Math.min(-scrollY, -window.innerHeight / 2 + 50)}px)`;
  if (scrollY > 100) nav.style.top = '20px'; else nav.style.top = '-100px';
});

const canvas = document.getElementById('draw-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let drawing = false;
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);
document.getElementById('reset-btn').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
function draw(e) {
  if (!drawing) return;
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
}