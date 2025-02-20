let isConfettiActive = false;
let confettiCanvas = document.getElementById('confetti-canvas');
let ctx = confettiCanvas.getContext('2d');

// Initialize the canvas to fit the screen
function initConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

let confettiPieces = []; // Global array to hold confetti pieces
const defaultColors = ['#FFD700', '#C0C0C0']; // Default to Gold and Silver

let confettiInterval;
let confettiDuration = 15000; // Duration in milliseconds

// Options
let confettiShape = 'random'; // 'random', 'text', 'image', 'fireworks'
let confettiText = 'STK'; // Default text shape
let confettiImage = new Image();
confettiImage.src = './img/logo.png'; // Replace with actual logo path

function createFirework() {
  const isLeft = Math.random() > 0.5;
  const x = isLeft ? 50 : confettiCanvas.width - 50; // Start from left or right
  return {
    x,
    y: confettiCanvas.height, // Start at the bottom
    targetY: Math.random() * (confettiCanvas.height / 1), // Random height to explode
    speed: Math.random() * 15 + 5, // Speed upwards
    angle: isLeft ? Math.random() * (Math.PI / 2) - Math.PI / 15 : Math.random() * (Math.PI / 4) + (5 * Math.PI) / 8, // Angle outward
    exploded: false,
    explosionParticles: [],
    color: defaultColors[Math.floor(Math.random() * 2)],
  };
}

function startConfetti() {
  if (!isConfettiActive) {
    initConfettiCanvas();
    isConfettiActive = true;
    
    confettiInterval = setInterval(() => {
      for (let i = 0; i < 10; i++) {
        confettiPieces.push(createFirework());
      }
    }, 100);
    
    setTimeout(() => {
      clearInterval(confettiInterval);
      stopConfetti();
    }, confettiDuration);
    
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((piece, index) => {
    if (!piece.exploded) {
      piece.x += Math.cos(piece.angle) * piece.speed;
      piece.y -= Math.sin(piece.angle) * piece.speed;
      if (piece.y <= piece.targetY) {
        piece.exploded = true;
        for (let i = 0; i < 150; i++) { // More explosion particles
          piece.explosionParticles.push({
            x: piece.x,
            y: piece.y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 7 + 3, // Faster explosion speed
            opacity: 1,
            color: piece.color,
          });
        }
      }
    } else {
      piece.explosionParticles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.opacity -= 0.02;
      });
      piece.explosionParticles = piece.explosionParticles.filter(p => p.opacity > 0);
    }
  });
  confettiPieces = confettiPieces.filter(piece => piece.exploded === false || piece.explosionParticles.length > 0);

  confettiPieces.forEach(drawFirework);
  if (isConfettiActive) requestAnimationFrame(animateConfetti);
}

function drawFirework(piece) {
  ctx.fillStyle = piece.color;
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(piece.x, piece.y, 5, 0, 2 * Math.PI);
  ctx.fill();

  piece.explosionParticles.forEach((p) => {
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  });
}

function stopConfetti() {
  isConfettiActive = false;
  confettiPieces = [];
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}
