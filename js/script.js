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

  // Close the menu whenever a nav link is clicked (mobile).
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  // Close on Escape for keyboard users.
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* =========================================================
   FAQ ACCORDION
   Each question toggles its own answer open/closed.
   Multiple answers can be open at the same time.
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
   Fades in the automation-demo pipeline once it scrolls
   into view, instead of animating on every page load.
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
   Shows once the visitor scrolls past the hero, hides again
   once the contact section (or footer) comes into view so
   it never sits on top of the form.
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
   There is no backend yet. This simply stops the page from
   reloading and tells the visitor (and you, in the console)
   what was submitted, so the form is easy to test.

   TO CONNECT TO GOHIGHLEVEL:
   Replace the code inside this function with either:
   1) A GHL form embed (delete this <form> entirely and paste
      the embed code where the comment says
      "GHL FORM EMBED GOES HERE" in index.html), or
   2) A fetch() POST request to a GHL webhook URL, sending
      the same field values gathered below.

   There's a separate placeholder for a GHL calendar embed
   in the Calendar section — search for
   "GHL CALENDAR EMBED GOES HERE" in index.html.
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
