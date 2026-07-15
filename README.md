# My Dynamic Portfolio — A Responsive, JSON-Driven Personal Website

A personal portfolio website for **Jan Liam E. Arias**, a first-year BS Computer Science student and aspiring web developer.
Built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no build tools.
All repeatable content (skills, projects, timeline, contact info) is loaded
dynamically from a single `data.json` file using `fetch()`.

> Course: WEB DEVELOPMENT 1 — Final Project

---

## ✨ Features

- **Fully responsive** — mobile-first design with three tested breakpoints
  (mobile ≤ 767px, tablet 768–1199px, desktop ≥ 1200px).
- **JSON-driven content** — adding a new skill, project, or timeline entry in
  `data.json` automatically renders a new card on the page. Zero HTML changes.
- **Hamburger menu** on mobile that slides down; collapses into an inline nav
  on tablet/desktop.
- **Dark-mode only** — the site is locked to a polished dark theme by design.
- **Reveal-on-scroll animations** and **animated skill bars** via
  `IntersectionObserver` (with full `prefers-reduced-motion` support).
- **Active nav-link highlighting** as you scroll through sections.
- **Accessible**: semantic HTML5 landmarks, skip link, ARIA labels,
  visible focus rings, alt text on images.
- **Back-to-top button**, smooth scrolling, and a non-functional but
  fully-validated contact form.

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Page structure (semantic HTML5)
├── data.json               # All repeatable content lives here
├── css/
│   └── styles.css          # Mobile-first responsive design (dark theme)
├── js/
│   └── main.js             # Fetch JSON, render content, UI interactions
├── assets/
│   ├── profile.svg         # Profile photo (SVG placeholder)
│   ├── project-1.svg       # Campus Eats thumbnail
│   ├── project-2.svg       # Weather Now thumbnail
│   ├── project-3.svg       # TaskFlow thumbnail
│   └── project-4.svg       # DevNotes thumbnail
└── README.md               # This file
```

---

## 🚀 How to Run

Because the site uses `fetch()` to load `data.json`, browsers block that
request when you open `index.html` directly via `file://`. You need a tiny
local web server. Pick whichever is easiest:

### Option A — VS Code Live Server (recommended for beginners)
1. Install the **Live Server** extension in VS Code.
2. Open the `portfolio/` folder.
3. Right-click `index.html` → **Open with Live Server**.

### Option B — Python (already installed on most machines)
```bash
cd portfolio
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Option C — Node.js
```bash
cd portfolio
npx serve .
# or: npx http-server -p 8000
```

---

## 🎨 Customizing the Content

Everything you'll want to change is in **`data.json`**. The structure is:

| Key           | What it controls                                          |
|---------------|-----------------------------------------------------------|
| `profile`     | Name, role, tagline, photo, contact info, social links    |
| `about`       | Background paragraph, interests, quick-stat highlights    |
| `skills`      | Array of skills (with `category` and `level` for bars)    |
| `projects`    | Array of project cards (title, desc, image, tags, link)   |
| `timeline`    | Array of education / experience / certification entries   |

### Example: add a new project
Just append a new object to the `projects` array in `data.json`:

```json
{
  "title": "My Awesome Project",
  "description": "What it does and what I learned.",
  "image": "assets/project-5.svg",
  "tags": ["HTML", "CSS", "JavaScript"],
  "link": "https://github.com/yourname/repo",
  "featured": false
}
```

Refresh the page — a new card appears automatically. ✨

### Example: change the hero name / role
The big "PORTFOLIO" title is static text in `index.html`. The name badge,
role tag, year, and tagline are all populated from `data.json` by JavaScript.
Edit `profile.name` and `profile.role` in `data.json` to update them.

---

## 🧪 Browser Testing

Tested layouts at:

| Breakpoint     | Width       | Notes                                            |
|----------------|-------------|--------------------------------------------------|
| Small mobile   | 360–480 px  | Hamburger nav, single-column, photo first        |
| Large mobile   | 480–767 px  | Single-column, generous touch targets            |
| Tablet         | 768–1199 px | Inline nav, 2-column grids (projects, skills)    |
| Desktop        | 1200 px +   | 3-column project grid, larger spacing            |

Recommended browser dev-tools: Chrome / Firefox / Edge device emulation.

---

## ♿ Accessibility Checklist

- [x] Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
- [x] Skip-to-content link
- [x] All images have `alt` text
- [x] ARIA labels on icon-only buttons (hamburger, socials)
- [x] Visible focus rings via `:focus-visible`
- [x] `prefers-reduced-motion` respected — animations disabled when requested
- [x] Color contrast meets WCAG AA in the dark theme
- [x] Contact form has explicit `<label>` elements and an `aria-live` status

---

## 📝 Code Quality Notes

- **HTML**: every section is a `<section>` with an `aria-labelledby` heading.
  No layout tables, no inline styles, no `div` soup.
- **CSS**: organized into 17 numbered sections (tokens → theme → reset →
  components → media queries → reduced motion). Mobile-first; relative units
  (`rem`, `em`, `fr`, `vw`, `%`) used throughout.
- **JS**: single IIFE, no globals. Helpers at the top, renderers in the
  middle, init at the bottom. All user text is HTML-escaped before injection
  to prevent accidental markup breakage.

---

## 🗺️ Project Phases (per assignment)

| Phase | Deliverable        | Status      |
|-------|--------------------|-------------|
| 1     | Design / wireframe | ✅ Done (mobile-first layout, purple→pink gradient, Poppins/Inter typography) |
| 2     | Static build       | ✅ Done (all sections present and responsive) |
| 3     | JSON integration   | ✅ Done (skills, projects, timeline, contact all rendered from `data.json`) |
| 4     | Polish & testing   | ✅ Done (accessibility, reduced-motion, cross-breakpoint testing) |
| 5     | Submission         | ⬜ Zip the folder / push to GitHub and deploy |

---

## 📦 Deployment

### GitHub Pages
1. Push the contents of the `portfolio/` folder to your GitHub repository
   (e.g. `https://github.com/Grudge10/webdev1`).
2. Go to **Settings → Pages**.
3. Set **Source** to `main` branch, `/root` folder.
4. Your site will be live at `https://grudge10.github.io/webdev1/`.

### Vercel
1. Push to GitHub (above).
2. Go to [vercel.com](https://vercel.com), import the repo.
3. Framework preset: **Other**. No build command needed.
4. Deploy.

---

## 📄 License

Personal portfolio template — free to use for educational purposes.
Replace placeholder content and images with your own before submitting.

---

## 🙋 Credits

- Fonts: [Inter](https://rsms.me/inter/) and [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts.
- Icons: hand-coded inline SVGs (no icon library dependency).
- All images are SVG placeholders generated for this project — replace them
  with your own profile photo and real project screenshots.
