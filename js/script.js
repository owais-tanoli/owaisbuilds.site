/* OWAIS BUILDS: menu toggle and a paused hero video for reduced motion. Everything else works without script. */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      });
    });
  }

  var video = document.querySelector('.hero__video');
  if (video) {
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) { video.pause(); video.removeAttribute('autoplay'); }
    else {
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    }
  }
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

