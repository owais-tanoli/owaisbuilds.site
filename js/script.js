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
