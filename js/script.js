/* =========================================================
   MOBILE NAVIGATION
   Toggles the nav menu open/closed on small screens and
   swaps the menu icon for a close (X) icon.
   ========================================================= */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  function setOpen(isOpen) {
    links.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.innerHTML = isOpen
      ? '<svg class="icon" aria-hidden="true"><use href="#i-close"/></svg>'
      : '<svg class="icon" aria-hidden="true"><use href="#i-menu"/></svg>';
  }

  toggle.addEventListener('click', () => {
    setOpen(!links.classList.contains('is-open'));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* =========================================================
   FAQ ACCORDION
   ========================================================= */
(function () {
  const items = document.querySelectorAll('.faq-item');

  items.forEach((item) => {
    const button = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    if (!button || !answer) return;

    button.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';
      const next = !isOpen;

      item.setAttribute('data-open', String(next));
      button.setAttribute('aria-expanded', String(next));
      answer.style.maxHeight = next ? answer.scrollHeight + 'px' : '0px';
    });
  });
})();

/* =========================================================
   SCROLL-TRIGGERED REVEAL
   ========================================================= */
(function () {
  const demoPipeline = document.querySelector('.pipeline--demo');
  if (!demoPipeline || !('IntersectionObserver' in window)) {
    if (demoPipeline) demoPipeline.classList.add('is-visible');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          demoPipeline.classList.add('is-visible');
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(demoPipeline);
})();

/* =========================================================
   FLOATING "BOOK A CALL" BUTTON (mobile)
   ========================================================= */
(function () {
  const floatingCta = document.getElementById('floating-cta');
  const hero = document.getElementById('home');
  const contact = document.getElementById('contact');
  if (!floatingCta || !hero || !contact || !('IntersectionObserver' in window)) return;

  let pastHero = false;

  const heroObserver = new IntersectionObserver(
    (entries) => {
      pastHero = !entries[0].isIntersecting;
      updateVisibility();
    },
    { threshold: 0 }
  );

  let inContact = false;

  const contactObserver = new IntersectionObserver(
    (entries) => {
      inContact = entries[0].isIntersecting;
      updateVisibility();
    },
    { threshold: 0 }
  );

  function updateVisibility() {
    floatingCta.classList.toggle('is-visible', pastHero && !inContact);
  }

  heroObserver.observe(hero);
  contactObserver.observe(contact);
})();

/* =========================================================
   CONTACT FORM
   ========================================================= */
(function () {
  const form = document.getElementById('automation-consultation-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    console.log('Automation consultation request (not yet sent anywhere):', data);

    status.textContent =
      "This form isn't connected to anything yet — hook it up to your GoHighLevel form, calendar, or webhook to start receiving these.";
    status.removeAttribute('data-state');
  });
})();

/* ============ HERO AMBIENT NETWORK ANIMATION ============ */
(function () {
  const canvas = document.getElementById('hero-network');
  const hero = document.getElementById('home');
  if (!canvas || !hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  const DOT_COLOR = '76, 111, 255';
  const LINE_COLOR = '157, 92, 224';
  const LINK_DISTANCE = 130;

  let width = 0, height = 0, dpr = 1;
  let points = [];
  let rafId = null;
  let running = false;

  function sizeCanvas() {
    const rect = hero.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makePoints() {
    const isSmall = width < 720;
    const count = Math.min(isSmall ? 22 : 46, Math.floor((width * height) / 26000));
    points = Array.from({ length: Math.max(count, 12) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.4 + 0.9
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DISTANCE) {
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${0.16 * (1 - dist / LINK_DISTANCE)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    for (const p of points) {
      ctx.fillStyle = `rgba(${DOT_COLOR}, 0.5)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    if (running) rafId = requestAnimationFrame(step);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  function rebuild() {
    sizeCanvas();
    makePoints();
  }

  rebuild();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(rebuild, 200);
  });

  let heroInView = true;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (heroInView) start();
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        heroInView = entries[0].isIntersecting;
        if (heroInView && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(hero);
  } else {
    start();
  }
})();
