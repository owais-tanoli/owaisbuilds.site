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
   Elements fade and slide up as they enter the screen.
   If anything fails, the content simply stays visible.
   ========================================================= */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selector = [
    '.section__head', '.chip', '.compare__caption', '.compare__col', '.service-card', '.tag',
    '.step', '.dashboard-card--demo', '.project-card', '.about__photo', '.about__body',
    '.audit__panel', '.contact__info', '.contact__form', '.calendar__embed', '.faq-item'
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
        // After the entrance finishes, drop the helper classes so hover effects stay snappy.
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
    const card = e.target.closest && e.target.closest('.service-card, .project-card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', e.clientX - rect.left + 'px');
    card.style.setProperty('--my', e.clientY - rect.top + 'px');
  }, { passive: true });
})();

/* =========================================================
   OPTIONAL VIDEO BACKGROUND
   Drop a file named hero-bg.mp4 into the assets folder and it
   fades in behind the hero. If the file isn't there, nothing
   happens and the animated background is used instead.
   Skipped on phones, data-saver mode and "reduce motion".
   ========================================================= */
(function () {
  const bg = document.querySelector('.hero__bg');
  if (!bg) return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = window.innerWidth < 720;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduce || small || saveData) return;

  // The script tries these places in order and uses the first one that exists.
  const VIDEO_CANDIDATES = [
    'assets/hero-bg.mp4',
    'assets/icons/hero-bg.mp4',
    'assets/icons/hero-bg.mp4.mp4'
  ];

  function findVideo(index) {
    if (index >= VIDEO_CANDIDATES.length) return Promise.resolve(null);
    return fetch(VIDEO_CANDIDATES[index], { method: 'HEAD' })
      .then((res) => (res.ok ? VIDEO_CANDIDATES[index] : findVideo(index + 1)))
      .catch(() => findVideo(index + 1));
  }

  findVideo(0)
    .then((VIDEO_URL) => {
      if (!VIDEO_URL) return;

      const video = document.createElement('video');
      video.className = 'hero__video';
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.setAttribute('aria-hidden', 'true');
      video.addEventListener('canplay', () => {
        video.classList.add('is-ready');
        video.play().catch(() => {});
      }, { once: true });
      video.addEventListener('error', () => video.remove());
      video.src = VIDEO_URL;
      bg.insertBefore(video, bg.firstChild);

      // Pause the video when the hero is off-screen to save battery.
      if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) video.play().catch(() => {});
          else video.pause();
        }).observe(bg);
      }
    })
    .catch(() => {});
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
