// Vault - The horror experience
document.addEventListener('DOMContentLoaded', () => {
  const warningFlash = document.querySelector('.warning-flash');
  const warningCountdown = document.getElementById('warning-countdown');
  const mainVault = document.getElementById('main-vault');
  const ambientSound = document.getElementById('ambient-sound');

  let countdownValue = 5;
  let sessionStart = Date.now();

  // Warning countdown
  const countdownInterval = setInterval(() => {
    countdownValue--;
    warningCountdown.textContent = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      warningFlash.style.display = 'none';
      mainVault.classList.remove('hidden');
      initVault();
    }
  }, 1000);

  function initVault() {
    // Try to play ambient sound (user interaction required)
    document.addEventListener('click', () => {
      if (ambientSound.paused) {
        ambientSound.play().catch(() => {
          // Ignore autoplay errors
        });
      }
    }, { once: true });

    // Update timestamps
    updateTimestamps();
    setInterval(updateTimestamps, 1000);

    // Update session time
    setInterval(updateSessionTime, 1000);

    // Countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Random glitch effects
    setInterval(randomGlitch, 2000);

    // Phantom text
    setInterval(spawnPhantom, 3000);

    // Random screen corruption
    setInterval(screenCorruption, 6000);

    // Jump scare effect (rare)
    setInterval(jumpScare, 45000);

    // Mouse trail effect
    document.addEventListener('mousemove', createTrail);

    // Random visitor count changes
    setInterval(updateVisitorCount, 2000);

    // Camera feed glitch
    setInterval(cameraGlitch, 500);

    // Random block animations
    setInterval(animateRandomBlock, 4000);

    // Fake IP address generation
    document.getElementById('visitor-ip').textContent = generateFakeIP();
  }

  function updateTimestamps() {
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const timestampEl = document.getElementById('timestamp');
    if (timestampEl) {
      timestampEl.textContent = `SYSTEM_TIME: ${timestamp}`;
    }

    const cameraTimeEl = document.getElementById('camera-time');
    if (cameraTimeEl) {
      cameraTimeEl.textContent = timestamp;
    }
  }

  function updateSessionTime() {
    const elapsed = Math.floor((Date.now() - sessionStart) / 1000);
    const mins = Math.floor(elapsed / 60);
    const secs = elapsed % 60;

    const timeHereEl = document.getElementById('time-here');
    if (timeHereEl) {
      timeHereEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    const sessionTimeEl = document.getElementById('session-time');
    if (sessionTimeEl) {
      sessionTimeEl.textContent = elapsed;
    }
  }

  function updateCountdown() {
    // Countdown to a random future time (meaningless)
    const target = new Date();
    target.setHours(target.getHours() + Math.floor(Math.random() * 24));

    const now = Date.now();
    const diff = target - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minsEl = document.getElementById('countdown-mins');
    const secsEl = document.getElementById('countdown-secs');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
  }

  function randomGlitch() {
    if (Math.random() > 0.6) {
      document.body.style.filter = 'hue-rotate(180deg) invert(1)';
      setTimeout(() => {
        document.body.style.filter = 'none';
      }, 100);
    }
  }

  function jumpScare() {
    if (Math.random() > 0.3) {
      const scare = document.createElement('div');
      scare.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #ff0000;
        z-index: 10002;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: scare-flash 0.3s;
      `;

      const scareText = document.createElement('div');
      scareText.style.cssText = `
        font-size: 8rem;
        color: #000;
        font-weight: bold;
        text-align: center;
        animation: shake 0.1s infinite;
      `;
      scareText.textContent = ['GET OUT', 'RUN', 'IT SEES YOU', 'BEHIND YOU'][Math.floor(Math.random() * 4)];

      scare.appendChild(scareText);
      document.body.appendChild(scare);

      setTimeout(() => {
        scare.remove();
      }, 300);
    }
  }

  function spawnPhantom() {
    const phantom = document.getElementById('phantom');
    const messages = [
      'WATCHING YOU',
      'IT KNOWS',
      'NO ESCAPE',
      'THEY\'RE COMING',
      'TOO LATE',
      'YOU SHOULDN\'T HAVE COME HERE',
      'IT FOLLOWS',
      'BEHIND YOU',
      'DON\'T LOOK AWAY',
      'IT SEES YOU',
      'RUN',
      'HELP US',
      'YOU\'RE NEXT',
      'IT HUNGERS',
      '███████',
      'LOOK BEHIND YOU'
    ];

    phantom.textContent = messages[Math.floor(Math.random() * messages.length)];
    phantom.style.left = Math.random() * 80 + '%';
    phantom.style.animation = 'none';

    setTimeout(() => {
      phantom.style.animation = 'phantom-float 10s linear forwards';
    }, 10);
  }

  function screenCorruption() {
    if (Math.random() > 0.6) {
      const blocks = document.querySelectorAll('.content-block');
      const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];

      randomBlock.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 4 - 2}deg)`;

      setTimeout(() => {
        randomBlock.style.transform = 'none';
      }, 200);
    }
  }

  function createTrail(e) {
    if (Math.random() > 0.9) {
      const trail = document.createElement('div');
      trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 5px;
        height: 5px;
        background: #ff0000;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9996;
        animation: trail-fade 0.5s forwards;
      `;

      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 500);
    }
  }

  function updateVisitorCount() {
    const countEl = document.getElementById('visitor-count');
    if (countEl) {
      const current = parseInt(countEl.textContent);
      const change = Math.random() > 0.5 ? 1 : -1;
      const newCount = Math.max(1, current + change);
      countEl.textContent = newCount;
    }
  }

  function cameraGlitch() {
    const cameraText = document.querySelector('.camera-text');
    if (cameraText && Math.random() > 0.8) {
      const messages = ['NO SIGNAL', 'FEED LOST', 'CORRUPTED', 'ERROR 404', 'WATCHING YOU'];
      cameraText.textContent = messages[Math.floor(Math.random() * messages.length)];
    }
  }

  function animateRandomBlock() {
    const blocks = document.querySelectorAll('.content-block');
    const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];

    randomBlock.style.borderColor = ['#ff0000', '#0ff', '#f0f', '#ff3333'][Math.floor(Math.random() * 4)];

    setTimeout(() => {
      randomBlock.style.borderColor = '#ff0000';
    }, 1000);
  }

  function generateFakeIP() {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  }

  // Add trail fade animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes trail-fade {
      0% { opacity: 1; transform: scale(1); }
      100% { opacity: 0; transform: scale(3); }
    }
  `;
  document.head.appendChild(style);

  // Random document title changes
  const originalTitle = document.title;
  const scaryTitles = [
    'you shouldn\'t be here',
    'BEHIND YOU',
    'they\'re watching',
    'it knows your name',
    'we see you',
    'DON\'T LOOK AWAY',
    'IT\'S COMING',
    '███████',
    'you can\'t leave',
    'we\'re inside now'
  ];

  setInterval(() => {
    if (Math.random() > 0.7) {
      document.title = scaryTitles[Math.floor(Math.random() * scaryTitles.length)];
      setTimeout(() => {
        document.title = originalTitle;
      }, 2000);
    }
  }, 8000);

  // Prevent leaving
  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = 'YOU CANNOT LEAVE. WE HAVE MARKED YOU.';
    return e.returnValue;
  });

  // Easter egg: typing "help" shows a secret message
  let typedSequence = '';
  document.addEventListener('keypress', (e) => {
    typedSequence += e.key.toLowerCase();

    if (typedSequence.length > 10) {
      typedSequence = typedSequence.slice(-10);
    }

    if (typedSequence.includes('help')) {
      showSecretMessage();
      typedSequence = '';
    }
  });

  function showSecretMessage() {
    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #000;
      border: 2px solid #ff0000;
      padding: 2rem;
      z-index: 10001;
      text-align: center;
      box-shadow: 0 0 50px rgba(255, 0, 0, 0.8);
      animation: shake 0.3s infinite;
    `;

    message.innerHTML = `
      <p style="font-size: 2rem; color: #ff0000; margin-bottom: 1rem;">THERE IS NO HELP</p>
      <p style="color: #ff0000;">YOU ARE ALONE HERE</p>
      <p style="color: #ff0000; margin-top: 1rem;">WE ARE ALL YOU HAVE NOW</p>
      <button onclick="this.parentElement.remove()" style="margin-top: 1.5rem; padding: 0.5rem 1.5rem; background: #ff0000; border: none; color: #000; cursor: pointer; font-family: 'Courier New', monospace;">ACCEPT</button>
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      if (message.parentElement) {
        message.remove();
      }
    }, 8000);
  }

  // Screen shake on random intervals
  setInterval(() => {
    if (Math.random() > 0.9) {
      document.body.style.animation = 'shake 0.5s';
      setTimeout(() => {
        document.body.style.animation = 'none';
      }, 500);
    }
  }, 7000);

  console.log('%cYOU FOUND THE VAULT', 'color: #ff0000; font-size: 2rem; font-weight: bold;');
  console.log('%cWelcome to the darkest corner of devious.work', 'color: #ff0000; font-size: 1rem;');
  console.log('%cYou shouldn\'t have come here', 'color: #ff0000; font-size: 0.9rem;');
  console.log('%cWe\'ve been waiting for you', 'color: #ff0000; font-size: 1rem;');
  console.log('%c' + '█'.repeat(50), 'color: #ff0000; font-size: 0.5rem;');
});
