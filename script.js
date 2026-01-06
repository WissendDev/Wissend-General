(function () {
  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  const grid = document.querySelector('.grid-bg');
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    const tiltX = Math.max(Math.min(currentY * 0.8, 5), -5);
    const tiltY = Math.max(Math.min(-currentX * 0.8, 5), -5);
    if (grid) {
      grid.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', (e) => {
    const dx = (e.clientX / window.innerWidth - 0.5);
    const dy = (e.clientY / window.innerHeight - 0.5);
    targetX = dx * 5;
    targetY = dy * 5;
  });

  function initCardAnimations() {
    const cards = document.querySelectorAll('.quality-square');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(card => observer.observe(card));
  }

  function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
    const saved = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(saved);
  }

  document.addEventListener('DOMContentLoaded', () => {
    animate();
    initCardAnimations();
    initThemeToggle();
  });
})();
