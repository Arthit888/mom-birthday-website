// === หัวใจลอย ===
const heartsContainer = document.getElementById('heartsContainer');
const symbols = ['💗', '🌸', '💕', '🌷', '💐'];

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (6 + Math.random() * 4) + 's';
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 1200);
for (let i = 0; i < 5; i++) {
  setTimeout(createHeart, i * 400);
}

// === คลิกพลิกรูป ===
const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// === ปุ่มเปิด/ปิดเพลง ===
const musicBtn = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🔇 เปิดเพลง';
  } else {
    bgMusic.play().catch(err => {
      console.log('ไม่สามารถเล่นเพลงได้:', err);
    });
    musicBtn.textContent = '🔊 ปิดเพลง';
  }
  isPlaying = !isPlaying;
});
