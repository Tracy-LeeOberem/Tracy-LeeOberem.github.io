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
    this.x = (this.index / this.count) * width;
    this.y = Math.random() * height;
    this.size = 8 + Math.random() * 6;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2;
    this.alpha = 0.2 + Math.random() * 0.3;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = width;
    else if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    else if (this.y > height) this.y = 0;
  }

  draw() {
    const ratio = this.x / width;
    const r = Math.floor(128 + (164 - 128) * ratio);
    const g = Math.floor(0 + (195 - 0) * ratio);
    const b = Math.floor(128 + (178 - 128) * ratio);

    let grad = ctx.createRadialGradient(this.x, this.y, this.size * 0.1, this.x, this.y, this.size);
    grad.addColorStop(0, `rgba(${r},${g},${b},${this.alpha.toFixed(2)})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const particleCount = 60;
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle(i, particleCount));
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach(p => {
    p.update();
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