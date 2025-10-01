// Main site functionality
document.addEventListener('DOMContentLoaded', () => {
  // Boot sequence
  const bootScreen = document.getElementById('boot-sequence');
  const bootLogo = document.getElementById('boot-logo');
  const progressFill = document.getElementById('progress-fill');
  const bootText = document.getElementById('boot-text');
  const bootEnter = document.getElementById('boot-enter');

  const mainHeader = document.getElementById('main-header');
  const mainContent = document.getElementById('main-content');
  const mainFooter = document.getElementById('main-footer');

  // Theme system
  const themeBtn = document.getElementById('theme-btn');
  const themeModal = document.getElementById('theme-modal');
  const themeModalClose = document.getElementById('theme-modal-close');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const applyCustomBtn = document.getElementById('apply-custom-theme');

  // Guestbook
  const gbForm = document.getElementById('guestbook-form');
  const gbName = document.getElementById('gb-name');
  const gbMessage = document.getElementById('gb-message');
  const gbSubmit = document.getElementById('gb-submit');
  const gbStatus = document.getElementById('gb-status');
  const gbEntries = document.getElementById('gb-entries');

  // Subdomains
  const subdomainsGrid = document.getElementById('subdomains-grid');

  // Easter eggs
  let deviousSequence = '';
  const secretLinks = document.querySelectorAll('.secret-link');

  // Initialize theme
  initTheme();

  // Boot sequence animation
  let bootStage = 0;
  const bootMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING MODULES...',
    'ESTABLISHING CONNECTIONS...',
    'READY'
  ];

  function animateBootLogo() {
    const text = 'devious.work';
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let iterations = 0;
    const maxIterations = 30;

    const interval = setInterval(() => {
      bootLogo.textContent = text.split('').map((char, index) => {
        if (index < iterations) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      iterations += 1/3;

      if (iterations >= text.length) {
        clearInterval(interval);
        bootLogo.textContent = text;
        setTimeout(startBootProgress, 500);
      }
    }, 50);
  }

  function startBootProgress() {
    progressFill.style.width = '100%';

    const progressInterval = setInterval(() => {
      if (bootStage < bootMessages.length) {
        bootText.textContent = bootMessages[bootStage];
        bootStage++;
      } else {
        clearInterval(progressInterval);
        bootEnter.classList.remove('hidden');
      }
    }, 500);
  }

  function enterSite() {
    bootScreen.classList.add('fade-out');
    setTimeout(() => {
      bootScreen.style.display = 'none';
      mainHeader.classList.remove('hidden');
      mainContent.classList.remove('hidden');
      mainFooter.classList.remove('hidden');
      revealSections();
      loadGuestbook();
      loadSubdomains();
    }, 500);
  }

  function revealSections() {
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
  }

  // Theme functions
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        if (theme.type === 'preset') {
          applyPreset(theme.name);
        } else if (theme.type === 'custom') {
          applyCustomTheme(theme.colors);
        }
      } catch (e) {
        applyPreset('default');
      }
    }
  }

  function applyPreset(presetName) {
    document.documentElement.setAttribute('data-theme', presetName);
    localStorage.setItem('theme', JSON.stringify({ type: 'preset', name: presetName }));
  }

  function applyCustomTheme(colors) {
    const root = document.documentElement;
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--text', colors.text);
    root.style.setProperty('--accent', colors.accent);
    root.setAttribute('data-theme', 'custom');

    localStorage.setItem('theme', JSON.stringify({ type: 'custom', colors }));
  }

  // Guestbook functions
  async function loadGuestbook() {
    gbEntries.innerHTML = '<div class="loading">Loading entries...</div>';
    try {
      const response = await fetch('/api/messages');
      if (!response.ok) throw new Error('Failed to load messages');

      const messages = await response.json();

      if (messages.length === 0) {
        gbEntries.innerHTML = '<p style="text-align: center; color: var(--text-dim);">No entries yet. Be the first to sign!</p>';
        return;
      }

      gbEntries.innerHTML = '';
      messages.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'gb-entry';

        const date = new Date(entry.timestamp).toLocaleString();

        entryDiv.innerHTML = `
          <div class="gb-entry-header">
            <span class="gb-entry-name">${escapeHtml(entry.name)}</span>
            <span class="gb-entry-date">${date}</span>
          </div>
          <div class="gb-entry-message">${escapeHtml(entry.message)}</div>
        `;

        gbEntries.appendChild(entryDiv);
      });
    } catch (error) {
      gbEntries.innerHTML = `<p style="text-align: center; color: var(--accent);">Error loading entries: ${error.message}</p>`;
    }
  }

  async function submitGuestbook(e) {
    e.preventDefault();

    gbSubmit.disabled = true;
    gbStatus.textContent = '';
    gbStatus.className = 'form-status';

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: gbName.value,
          message: gbMessage.value
        })
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(responseText);
      }

      gbStatus.className = 'form-status success';
      gbStatus.textContent = 'Message sent successfully!';
      gbForm.reset();

      setTimeout(() => {
        loadGuestbook();
        gbStatus.textContent = '';
      }, 2000);

    } catch (error) {
      gbStatus.className = 'form-status error';
      gbStatus.textContent = error.message;
    } finally {
      gbSubmit.disabled = false;
      setTimeout(() => {
        gbStatus.textContent = '';
      }, 5000);
    }
  }

  // Subdomain functions
  async function loadSubdomains() {
    subdomainsGrid.innerHTML = '<div class="loading">Scanning network...</div>';

    try {
      const response = await fetch('/api/subdomains');
      if (!response.ok) throw new Error('Failed to load subdomains');

      const subdomains = await response.json();

      if (subdomains.length === 0) {
        subdomainsGrid.innerHTML = '<p style="text-align: center; color: var(--text-dim);">No active nodes found.</p>';
        return;
      }

      subdomainsGrid.innerHTML = '';
      subdomains.forEach(subdomain => {
        const card = document.createElement('a');
        card.href = `https://${subdomain.name}`;
        card.className = 'subdomain-card';
        card.target = '_blank';
        card.rel = 'noopener';

        card.innerHTML = `
          <div class="subdomain-name">${subdomain.name}</div>
          <div class="subdomain-desc">${subdomain.description || 'Active node'}</div>
        `;

        subdomainsGrid.appendChild(card);
      });
    } catch (error) {
      subdomainsGrid.innerHTML = `<p style="text-align: center; color: var(--accent);">Error loading network: ${error.message}</p>`;
    }
  }

  // Easter egg: typing "devious"
  document.addEventListener('keypress', (e) => {
    deviousSequence += e.key.toLowerCase();

    if (deviousSequence.length > 7) {
      deviousSequence = deviousSequence.slice(-7);
    }

    if (deviousSequence === 'devious') {
      triggerDeviousEasterEgg();
      deviousSequence = '';
    }
  });

  function triggerDeviousEasterEgg() {
    const originalBg = document.body.style.background;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#ffff00', '#00ffff'];
    let flashes = 0;

    const flashInterval = setInterval(() => {
      document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
      flashes++;

      if (flashes > 10) {
        clearInterval(flashInterval);
        document.body.style.background = originalBg;

        // Show hint to vault
        const hint = document.createElement('div');
        hint.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--surface);
          border: 2px solid var(--primary);
          padding: 2rem;
          z-index: 10002;
          text-align: center;
          box-shadow: 0 0 30px var(--glow);
        `;
        hint.innerHTML = `
          <p style="color: var(--primary); font-size: 1.5rem; margin-bottom: 1rem;">You found something...</p>
          <p style="color: var(--text);">The vault awaits those who seek.</p>
          <p style="color: var(--text-dim); font-size: 0.9rem; margin-top: 1rem;">Look for /vault</p>
          <button id="hint-close" style="margin-top: 1.5rem; padding: 0.5rem 1.5rem; background: var(--primary); border: none; color: var(--background); cursor: pointer;">Close</button>
        `;
        document.body.appendChild(hint);

        document.getElementById('hint-close').addEventListener('click', () => {
          hint.remove();
        });
      }
    }, 100);
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Utility functions
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Event listeners
  bootEnter.addEventListener('click', enterSite);
  animateBootLogo();

  themeBtn.addEventListener('click', () => {
    themeModal.classList.remove('hidden');
  });

  themeModalClose.addEventListener('click', () => {
    themeModal.classList.add('hidden');
  });

  themeModal.addEventListener('click', (e) => {
    if (e.target === themeModal) {
      themeModal.classList.add('hidden');
    }
  });

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.dataset.preset;
      applyPreset(preset);
    });
  });

  applyCustomBtn.addEventListener('click', () => {
    const colors = {
      primary: document.getElementById('color-primary').value,
      background: document.getElementById('color-bg').value,
      text: document.getElementById('color-text').value,
      accent: document.getElementById('color-accent').value
    };
    applyCustomTheme(colors);
  });

  gbForm.addEventListener('submit', submitGuestbook);

  secretLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const secret = link.dataset.secret;
      if (secret === 'devious') {
        triggerDeviousEasterEgg();
      }
    });
  });

  // XOK easter egg - click the dot 5 times
  const xokTrigger = document.getElementById('xok-trigger');
  let xokClicks = 0;

  if (xokTrigger) {
    xokTrigger.addEventListener('click', () => {
      xokClicks++;

      if (xokClicks >= 5) {
        xokTrigger.classList.add('activated');
        setTimeout(() => {
          window.location.href = '/xok';
        }, 500);
      } else {
        // Visual feedback
        xokTrigger.style.opacity = 0.05 + (xokClicks * 0.15);
        xokTrigger.textContent = '.'.repeat(xokClicks + 1);
      }
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Escape to close modal
    if (e.key === 'Escape') {
      themeModal.classList.add('hidden');
    }

    // Ctrl+K for search (future feature hint)
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      // Search feature placeholder
    }
  });
});
