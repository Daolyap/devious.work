// Portfolio page interactions
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add copy button to code blocks
  document.querySelectorAll('pre code').forEach(block => {
    const pre = block.parentElement;
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-btn';
    button.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.25rem 0.75rem;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text);
      font-family: var(--font-main);
      font-size: 0.8rem;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;

    pre.style.position = 'relative';

    pre.addEventListener('mouseenter', () => {
      button.style.opacity = '1';
    });

    pre.addEventListener('mouseleave', () => {
      button.style.opacity = '0';
    });

    button.addEventListener('click', () => {
      navigator.clipboard.writeText(block.textContent);
      button.textContent = 'Copied!';
      button.style.color = 'var(--primary)';
      setTimeout(() => {
        button.textContent = 'Copy';
        button.style.color = 'var(--text)';
      }, 2000);
    });

    pre.appendChild(button);
  });

  // Animate entries on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.portfolio-entry').forEach(entry => {
    observer.observe(entry);
  });
});
