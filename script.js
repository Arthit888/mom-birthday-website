// ✅ เล่นเพลงจากหน้าหลักต่อ (ถ้าเคยเล่นอยู่ก่อนมาหน้านี้)
const bgMusicContinue = document.getElementById('bgMusicContinue');

window.addEventListener('load', () => {
  const savedTime = sessionStorage.getItem('musicTime');
  const savedPlaying = sessionStorage.getItem('musicPlaying');

  if (savedPlaying === 'true' && savedTime && bgMusicContinue) {
    bgMusicContinue.currentTime = parseFloat(savedTime);
    bgMusicContinue.play().catch(() => {});
  }
});

window.addEventListener('beforeunload', () => {
  if (bgMusicContinue) {
    sessionStorage.setItem('musicTime', bgMusicContinue.currentTime);
    sessionStorage.setItem('musicPlaying', !bgMusicContinue.paused);
  }
});

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

// ✅ เช็คว่าเพลงเคยเล่นค้างมาจากหน้าอื่นไหม (ตอนโหลดหน้านี้)
window.addEventListener('load', () => {
  const savedTime = sessionStorage.getItem('musicTime');
  const savedPlaying = sessionStorage.getItem('musicPlaying');

  if (savedPlaying === 'true' && savedTime) {
    bgMusic.currentTime = parseFloat(savedTime);
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.textContent = '🔊 ปิดเพลง';
    }).catch(err => {
      console.log('ไม่สามารถเล่นเพลงต่ออัตโนมัติได้:', err);
    });
  }
});

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

// ✅ บันทึกสถานะเพลง (เวลาที่เล่นถึง + กำลังเล่นอยู่ไหม) ก่อนออกจากหน้านี้
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('musicTime', bgMusic.currentTime);
  sessionStorage.setItem('musicPlaying', isPlaying);
});
