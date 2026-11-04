const body = document.body;
const orb = document.querySelector('.cursor-orb');
const dot = document.querySelector('.cursor-dot');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (window.matchMedia('(pointer: fine)').matches && !reducedMotion) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let orbX = mouseX;
  let orbY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;

  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    body.classList.add('cursor-ready');
  }, { passive: true });

  const follow = () => {
    dotX += (mouseX - dotX) * 0.42;
    dotY += (mouseY - dotY) * 0.42;
    orbX += (mouseX - orbX) * 0.16;
    orbY += (mouseY - orbY) * 0.16;
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    orb.style.left = `${orbX}px`;
    orb.style.top = `${orbY}px`;
    requestAnimationFrame(follow);
  };
  follow();

  document.querySelectorAll('a, button, input, label').forEach((element) => {
    element.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
    element.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
  });

  const heroArt = document.querySelector('.hero-art');
  heroArt.addEventListener('pointermove', (event) => {
    const bounds = heroArt.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    heroArt.style.setProperty('--tilt-x', `${(y * -4).toFixed(2)}deg`);
    heroArt.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
  });
  heroArt.addEventListener('pointerleave', () => {
    heroArt.style.setProperty('--tilt-x', '0deg');
    heroArt.style.setProperty('--tilt-y', '0deg');
  });
}

const revealItems = document.querySelectorAll('.section-shell:not(.hero) .section-label, .section-shell:not(.hero) .intro-grid, .section-shell:not(.hero) .principles, .section-shell:not(.hero) .topics-heading, .section-shell:not(.hero) .topic-list, .section-shell:not(.hero) .journal-heading, .section-shell:not(.hero) .journal-grid, .section-shell:not(.hero) .circle-panel, .section-shell:not(.hero) .contact-grid');

if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}
