// Modal functionality
function openModal(src) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  modal.style.display = "flex";
  modalImg.src = src;
}

function closeModal(e) {
  if (e.target.id === "modal" || e.target.className === "close-btn") {
    document.getElementById("modal").style.display = "none";
  }
}

// Background particle animation
const canvas = document.getElementById('fallingPixels');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor(index, count) {
    this.index = index;
    this.count = count;
    this.reset();
  }

  reset() {
    this.x = (this.index / this.count);
    this.y = Math.random();
    this.size = 8 + Math.random() * 6;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2 * (height / width);
    this.alpha = 0.2 + Math.random() * 0.3;
  }

  update(mx, my) {
    const dx = (this.x - mx) %1;
    const dy = (this.y- my) %1;
    const d = Math.sqrt(dx * dx + dy * dy);
    const mouseforce = (d) < 0.2 ? 0.3 : 0;

    const dp = Math.pow(d, 0.1);
    this.x += (this.speedX + mouseforce * Math.sign(dx) / dp) / width;
    this.y += (this.speedY + mouseforce * Math.sign(dy) / dp) / height;

    if (this.x < 0) this.x = 1;
    else if (this.x > 1) this.x = 0;
    if (this.y < 0) this.y = 1;
    else if (this.y > 1) this.y = 0;
  }

  draw() {
    const ratio = this.x;
    const r = Math.floor(128 + (164 - 128) * ratio);
    const g = Math.floor(0 + (195 - 0) * ratio);
    const b = Math.floor(128 + (178 - 128) * ratio);

    const px = this.x * width, py = this.y * height;
    let grad = ctx.createRadialGradient(px, py, this.size * 0.1, px, py, this.size);
    grad.addColorStop(0, `rgba(${r},${g},${b},${this.alpha.toFixed(2)})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x * width, this.y * height, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particleCount = 60;
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle(i, particleCount));
}

let mousex = 0, mousey = 0;
window.addEventListener("mousemove", e => {
  mousex = e.clientX;
  mousey = e.clientY;
});


function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.update(mousex / width, mousey / height);
    p.draw();
  });

  const cardWidth = 900;
  const cardX = (width - cardWidth) / 2;
  ctx.clearRect(cardX, 300, cardWidth, 180);
  ctx.clearRect(cardX, 550, cardWidth, 600);
  ctx.clearRect(cardX, 1180, cardWidth, 150);
  ctx.clearRect(cardX, 1350, cardWidth, 650);
  ctx.clearRect(cardX, 2020, cardWidth, 350);

  requestAnimationFrame(animate);
}

animate();