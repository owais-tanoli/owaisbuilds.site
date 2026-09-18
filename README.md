# OWAIS BUILDS — Automation Website (v2)

A redesign of the existing single-page site — same tech (HTML5, CSS3, vanilla
JS, no backend), new brand, new structure, and a genuinely "live product"
feeling hero and demo section.

---

## ⚠ Fix this first: your live site is missing files

Inspecting the ZIP you sent from `owais-tanoli/owaisbuilds.site`, the repo
only contains `index.html`, `CNAME`, `robots.txt`, `sitemap.xml`, and
`README.md`. **The `css/`, `js/`, and `assets/` folders never made it to
GitHub.** Right now, `owaisbuilds.site` is live with no styling, no
JavaScript (no working mobile menu, no FAQ accordion), and no favicon — the
raw, unstyled HTML.

This almost always happens when dragging individual files into GitHub's
upload box instead of dragging the folders themselves. The update guide
below fixes it — just make sure the `css`, `js`, and `assets` **folders**
end up in the repo this time, not only the files inside them.

---

## What changed

**Changed files** (full new versions, included in this delivery):
- `index.html` — new sections, new copy, new brand, new hero/demo visuals
- `css/style.css` — new design system components (see below)
- `js/script.js` — same behavior as before, one comment updated to point to
  the new Calendar section's embed placeholder
- `README.md` — this file

**Unchanged** (included so the repo is complete, but identical to before):
- `CNAME`, `robots.txt`, `sitemap.xml`, `assets/icons/favicon.svg`

**Removed:**
- The Testimonials section/placeholder — it wasn't part of the new brief and
  had no real content in it yet. Nothing else was removed.

### Content/structure changes
- Brand is now **OWAIS BUILDS** (wordmark in the nav/footer); the About
  section still names you, Muhammad Owais, as the founder.
- New hero: headline "Turn More Leads Into Customers — Automatically.", an
  eyebrow line, a small tech-stack row, and a redesigned right-side visual —
  a "dashboard card" showing a live-looking 8-stage pipeline (New Lead → GHL
  CRM → AI Qualification → Instant SMS → Email Follow-Up → Booking → Sales
  Pipeline → Follow-Up), each stage with a status line and a checkmark that
  animates in on a continuous loop, so it reads as a running system rather
  than a static diagram.
- New Problem section: six "problem chips" (Missed Calls, Slow Responses,
  etc.) plus a side-by-side Manual Process vs. Automated Process comparison.
- Services, Industries, and How It Works follow your updated copy and
  service list.
- A bigger 12-stage "Automation Demonstration" section, styled like the hero
  dashboard, that reveals itself as you scroll to it.
- Projects section is renamed **Automation Systems I've Built**, each card
  labeled **DEMO PROJECT**, showing the problem and workflow only — no
  invented results, per your instructions.
- About section now shows a designed "Professional Photo" placeholder
  instead of bracketed placeholder text.
- New **Free Automation Audit** banner, separate **Contact** form, and a
  separate **Calendar** section with its own GHL embed placeholder.
- FAQ has your updated 10 questions, including the new missed-call one.
- Footer/nav reordered to match your requested navigation (Services,
  Industries, How It Works, Projects, About, FAQ).

### No fake content
No testimonials, client logos, stats, years of experience, or case-study
results were added anywhere. The four project cards are explicitly labeled
DEMO PROJECT. The GHL form and calendar are marked with HTML comments
(`GHL FORM EMBED GOES HERE`, `GHL CALENDAR EMBED GOES HERE`) and no endpoint
or calendar URL was invented.

---

## Update your GitHub repo

Your repo (`owais-tanoli/owaisbuilds.site`) already exists, so this is an
update, not a fresh setup.

1. **Unzip** the file you were given. You should see `index.html`, `css/`,
   `js/`, `assets/`, `CNAME`, `robots.txt`, `sitemap.xml`, `README.md`.
2. Go to your repo on GitHub → **Add file → Upload files**.
3. Drag in `index.html`, `CNAME`, `robots.txt`, `sitemap.xml`, and
   `README.md` first — since these already exist in the repo, GitHub will
   just replace them.
4. Now drag in the **`css` folder itself** (not just `style.css`), the
   **`js` folder itself**, and the **`assets` folder itself**. In Chrome or
   Edge, dragging a folder onto the upload box keeps its internal structure.
   If your browser flattens them into loose files instead, open each folder
   individually and drag its contents in one folder at a time so GitHub
   creates the matching path.
5. Scroll down, commit the changes (e.g. "Redesign site (v2)").
6. **Verify it worked**: browse your repo's file list on GitHub. You should
   see `css/`, `js/`, and `assets/` listed as folders, each containing their
   files, sitting next to `index.html` — not just the files loose at the
   root.
7. Give GitHub Pages a minute, then hard-refresh `owaisbuilds.site`
   (Ctrl/Cmd+Shift+R) to bypass any cached old version.

If you'd rather avoid the browser upload box entirely, **GitHub Desktop**
(a free app) lets you point at a local folder and sync the whole thing in
one go — usually more reliable than drag-and-drop for a full folder
structure like this one.

---

## Where to make it yours (search in `index.html`)

- **Your photo** — search `Professional Photo`, replace the placeholder
  `<div>` with an `<img>`.
- **GHL contact form** — search `GHL FORM EMBED GOES HERE`.
- **GHL calendar** — search `GHL CALENDAR EMBED GOES HERE` (in the Calendar
  section).
- **Contact info / social links** — search `[Add your business email]`,
  `[Add your phone number]`, and `Add social links when ready` in the
  footer.
- **Real project results** — as jobs get completed, add real client
  projects as new `.project-card` entries (copy an existing one) instead of
  replacing the demo cards, so the DEMO PROJECT label stays honest for the
  ones that are still demos.
- **OG preview image** — search `Add an og:image` near the top of the file.
