
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Corazones
class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = 10 + Math.random() * 20;
    this.speed = 0.5 + Math.random() * 1.5;
    this.alpha = 0.4 + Math.random() * 0.6;
    this.color = `rgba(255, 0, 100, ${this.alpha})`;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    const s = this.size;
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -s / 2, -s, -s / 2, -s, 0);
    ctx.bezierCurveTo(-s, s / 1.5, 0, s, 0, s * 1.5);
    ctx.bezierCurveTo(0, s, s, s / 1.5, s, 0);
    ctx.bezierCurveTo(s, -s / 2, 0, -s / 2, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y -= this.speed;
    if (this.y < -this.size * 2) this.reset();
    this.draw();
  }
}

const hearts = [];
for (let i = 0; i < 100; i++) hearts.push(new Heart());

function animarCorazones() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(h => h.update());
  requestAnimationFrame(animarCorazones);
}
animarCorazones();

// Frases
const frases = [
    "Te amo muchísimo❤️",
    "Gracias por cada momento juntos💕",
    "Eres el sol que ilumina mis días☀️",
    "Eres mi persona favorita en el mundo💞",
    "Siempre pienso en ti💭",
    "Eres el dueño de mi corazon❤️",
    "Te amo de aqui a la luna a pasitos de huron🌕",
    "Ni la galaxia se asemeja al amor que te tengo🌌",
    "Eres lo que no sabia que necesitaba💟",
    "Eres la razón de mis sonrisas y espero ser la razón de las tuyas 🥰",
    "Mi precioso no sabes como aceleras mis latidos cada que te veo ❣️",
    "Quiero ser tu refugio y lugar seguro🤍",
    "Nunca pienses que estas solo, por que me tendras contigo🌟",
    "Eres mi sueño hecho realidad 💤",
    "Tu risa es el sonido mas bonito que he escuchado💫",
    "Contigo cada momento es especial💖",
    "Te amo❤️",
    "Eres el amor de mi vida❤️‍🩹",
    "Encontrarnos entre millones ha sido lo mejor que me ha pasado✨",
];

function obtenerFraseAleatoria(actual) {
  let nueva;
  do {
    nueva = frases[Math.floor(Math.random() * frases.length)];
  } while (nueva === actual);
  return nueva;
}

function crearBurbuja() {
  const burbuja = document.createElement("div");
  burbuja.className = "bubble";
  let frase = frases[Math.floor(Math.random() * frases.length)];
  burbuja.innerText = frase;

  burbuja.style.left = `${Math.random() * window.innerWidth}px`;
  burbuja.style.top = `${window.innerHeight}px`;
  burbuja.style.fontSize = `${14 + Math.random() * 10}px`;

  // Al hacer clic, cambia de frase
  burbuja.addEventListener("click", () => {
    frase = obtenerFraseAleatoria(frase);
    burbuja.innerText = frase;
  });

  document.body.appendChild(burbuja);
  setTimeout(() => burbuja.remove(), 6000);
}

setInterval(crearBurbuja, 1000);
