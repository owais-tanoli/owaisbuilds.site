/* =========================================================
   MOBILE NAVIGATION
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
   HEADER SHADOW + SCROLL PROGRESS BAR
   ========================================================= */
(function () {
  const header = document.getElementById('site-header');
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  let ticking = false;

  function update() {
    const y = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    if (header) header.classList.toggle('is-scrolled', y > 24);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

/* =========================================================
   SCROLL REVEAL
   Content fades in as it enters the screen. If anything
   fails, the content simply stays visible.
   ========================================================= */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selector = [
    '.section__head', '.chip', '.compare__caption', '.compare__col',
    '.journey__steps', '.journey__panel', '.service-card', '.tag', '.step',
    '.work-card', '.partners__copy', '.partners__item', '.about__photo', '.about__body',
    '.audit__panel', '.contact__info', '.contact__form', '.faq-item'
  ].join(',');

  const targets = Array.from(document.querySelectorAll(selector));
  if (!targets.length) return;

  targets.forEach((el) => {
    const siblings = Array.from(el.parentElement.children);
    const index = siblings.indexOf(el) % 6;
    el.style.setProperty('--rd', (index * 0.08).toFixed(2) + 's');
    el.classList.add('reveal');
  });
  document.documentElement.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-in');
        observer.unobserve(el);
        // Drop the helper classes after the entrance so hover effects stay snappy.
        setTimeout(() => {
          el.classList.remove('reveal', 'is-in');
          el.style.removeProperty('--rd');
        }, 1500);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* =========================================================
   CARD SPOTLIGHT (glow follows the mouse over cards)
   ========================================================= */
(function () {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.service-card, .work-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', e.clientX - rect.left + 'px');
    card.style.setProperty('--my', e.clientY - rect.top + 'px');
  }, { passive: true });
})();

/* =========================================================
   CONNECTED JOURNEY (interactive)
   Each step's text comes from data-* attributes on its button,
   so the copy lives in one place (index.html).
   ========================================================= */
(function () {
  const buttons = Array.from(document.querySelectorAll('.journey__step'));
  if (!buttons.length) return;

  const label = document.getElementById('journey-label');
  const title = document.getElementById('journey-title');
  const text = document.getElementById('journey-text');
  const tools = document.getElementById('journey-tools');
  const prev = document.getElementById('journey-prev');
  const next = document.getElementById('journey-next');
  if (!label || !title || !text || !tools || !prev || !next) return;

  const panel = document.querySelector('.journey__panel');
  let current = 0;

  function show(i) {
    current = (i + buttons.length) % buttons.length;
    const b = buttons[current];

    // Restart the panel's content animation on every change.
    if (panel) {
      panel.classList.remove('is-changing');
      void panel.offsetWidth;
      panel.classList.add('is-changing');
    }

    buttons.forEach((btn, k) => {
      const on = k === current;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', String(on));
    });

    label.textContent = 'Step ' + (current + 1) + ' of ' + buttons.length;
    title.textContent = b.dataset.title;
    text.textContent = b.dataset.text;
    tools.textContent = b.dataset.tools;
  }

  buttons.forEach((btn, k) => btn.addEventListener('click', () => show(k)));
  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  show(0);
})();

/* =========================================================
   HERO VIDEO
   The <video> tag lives in index.html, so it shows even if
   this script fails. This only pauses it when the hero is
   off-screen, and keeps it still for reduced-motion visitors.
   ========================================================= */
(function () {
  const video = document.querySelector('.hero__video');
  if (!video) return;

  video.muted = true;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
    return;
  }

  function play() {
    const attempt = video.play();
    if (attempt && attempt.catch) attempt.catch(() => {});
  }

  play();
  video.addEventListener('error', () => video.remove());

  if ('IntersectionObserver' in window && video.parentElement) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) play();
      else video.pause();
    }).observe(video.parentElement);
  }
})();

/* ============ HERO AMBIENT NETWORK ANIMATION ============ */
(function () {
  const canvas = document.getElementById('hero-network');
  const hero = document.getElementById('home');
  if (!canvas || !hero) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const ctx = canvas.getContext('2d');
  const DOT_COLOR = '255, 122, 26';
  const LINE_COLOR = '234, 88, 12';
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

/* =========================================================
   FLOATING "DISCUSS A PROJECT" BUTTON (mobile)
   ========================================================= */
(function () {
  const floatingCta = document.getElementById('floating-cta');
  const hero = document.getElementById('home');
  const contact = document.getElementById('contact');
  if (!floatingCta || !hero || !contact || !('IntersectionObserver' in window)) return;

  let pastHero = false;
  let inContact = false;

  const heroObserver = new IntersectionObserver((entries) => {
    pastHero = !entries[0].isIntersecting;
    updateVisibility();
  }, { threshold: 0 });

  const contactObserver = new IntersectionObserver((entries) => {
    inContact = entries[0].isIntersecting;
    updateVisibility();
  }, { threshold: 0 });

  function updateVisibility() {
    floatingCta.classList.toggle('is-visible', pastHero && !inContact);
  }

  heroObserver.observe(hero);
  contactObserver.observe(contact);
})();
