# Muhammad Owais — Automation Website

A single-page website for your GoHighLevel & business automation brand, built with
plain HTML, CSS, and JavaScript — no frameworks, no build tools, no backend.

```
├── index.html          ← all the page content lives here
├── css/style.css        ← all the styling
├── js/script.js         ← nav menu, FAQ, animations, form handling
├── assets/icons/         ← favicon
├── CNAME                 ← tells GitHub Pages to use owaisbuilds.site
├── robots.txt
└── sitemap.xml
```

Open `index.html` in a browser (just double-click it) and the whole site works,
right off your computer, before you deploy anything.

---

## 1. Put the files on GitHub

1. Go to [github.com](https://github.com) and log in (or create a free account).
2. Click the **+** icon top-right → **New repository**.
3. Name it anything (e.g. `owaisbuilds-site`). Keep it **Public** — free GitHub
   Pages with a custom domain requires a public repo.
4. Don't add a README/gitignore in this step (you already have one) — just click
   **Create repository**.
5. On the next page, click **uploading an existing file**, then drag in
   *everything inside this folder* (`index.html`, the `css`, `js`, and `assets`
   folders, `CNAME`, `robots.txt`, `sitemap.xml`, and this `README.md`) — keep
   the folder structure exactly as it is.
6. Scroll down and click **Commit changes**.

---

## 2. Turn on GitHub Pages

1. In your repository, click **Settings** (top menu bar).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
5. Wait a minute, refresh the page — GitHub will show you a link like
   `https://yourusername.github.io/owaisbuilds-site/`. Open it to confirm the
   site is live.

---

## 3. Connect your Spaceship domain (owaisbuilds.site)

The `CNAME` file in this project already tells GitHub to serve the site at
`owaisbuilds.site`. You just need to point the domain at GitHub on Spaceship's
side:

1. Log in to [Spaceship](https://spaceship.com) and open the DNS settings for
   `owaisbuilds.site`.
2. Add **four A records** for the root domain (`@` or blank host), each
   pointing to one of GitHub's Pages IP addresses:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
3. If you also want `www.owaisbuilds.site` to work, add a **CNAME record**:
   - Host: `www`
   - Value: `yourusername.github.io`
4. Back in GitHub → **Settings → Pages**, under **Custom domain**, type
   `owaisbuilds.site` and click **Save**. GitHub will check your DNS — this can
   take anywhere from a few minutes to a day.
5. Once GitHub shows a green checkmark next to the domain, tick
   **Enforce HTTPS**. This may take a little while to become available after
   DNS first verifies.

---

## 4. Where to make it yours

Everything below is a straightforward find-and-edit in `index.html` — use your
editor's search (Ctrl/Cmd+F) for the bolded text to jump straight there.

- **Your photo** — search for `[YOUR PHOTO HERE]`. Replace that placeholder
  `<div>` with an `<img>` tag pointing to a photo you've added under
  `assets/images/`.
- **Your logo** — the nav and footer currently use a text logo ("Muhammad
  Owais") plus a small SVG mark (`#i-logo` in the icon sprite near the top of
  `index.html`). Swap the `<svg><use href="#i-logo"/></svg>` for an `<img>` tag
  if you design a real logo later.
- **GHL contact form** — search for `GHL FORM EMBED GOES HERE` (just above the
  `<form id="automation-consultation-form">`). You can either paste your GHL
  form/calendar embed code right there instead of the existing form, or keep
  this form and point `js/script.js`'s submit handler at a GHL webhook URL
  (there's a comment in that file marking exactly where).
- **GHL calendar** — the same idea applies anywhere you want a live booking
  calendar instead of a "Book a Call" button (currently those buttons just
  scroll down to the contact section).
- **Contact info** — search for `[Add your business email]` and
  `[Add your phone number]` in the footer.
- **Social links** — search for `Add social links when ready` in the footer.
- **Real testimonials** — search for `[Your future client testimonial will
  appear here.]` (there are three). Replace the text inside each
  `<p class="testimonial-card__text">`.
- **Real case studies** — search for `[ADD REAL RESULT HERE]` (four spots in
  the Projects section) and fill in actual outcomes once you have them. Feel
  free to add or remove project cards as your work builds up.
- **OG preview image** — search for `Add an og:image` near the top of
  `index.html` if you want a custom image shown when the site is shared on
  social media.

---

## 5. A couple of notes

- The contact form doesn't send anywhere yet on purpose — it's built with
  clean, labeled fields (`id="automation-consultation-form"`) so you can wire
  it up to GoHighLevel however you prefer, without me guessing at an endpoint.
- `sitemap.xml` and `robots.txt` already point at `owaisbuilds.site` — no
  changes needed unless the domain changes.
- Everything is responsive (phone/tablet/desktop) and respects
  "reduced motion" settings for visitors who prefer fewer animations.
