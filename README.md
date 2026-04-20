# Flowly — Landing Page

> **Think less. Do more. Ship faster.**

A fully responsive landing page for **Flowly**, a fictional AI-powered productivity tool for teams. Built as an internship assignment demonstrating real frontend skills: semantic HTML, modular CSS/JS, responsive layout, accessibility, and interactive features.

---

## Live Demo

🔗 https://flowlylandingpage.netlify.app/ *(Live demo)*

---

## Screenshots



---

## Features

### UI / Design
- Clean modern SaaS aesthetic with custom dark + light themes
- CSS custom properties (design tokens) for consistent theming
- Animated hero with radial glow, staggered fade-in
- Realistic app dashboard preview mockup
- Smooth scroll-reveal animations on all sections

### Responsiveness
- Fully responsive at 480px, 768px, 900px breakpoints
- Mobile hamburger menu with animated open/close transition
- CSS Grid with `auto-fit` / `minmax` — no layout breakage
- Tested on: Chrome, Firefox, Safari · iOS Safari, Android Chrome

### Interactive Features
- ☀️ / ☽ **Dark / Light theme toggle** — persisted via `localStorage`
- **Sign-up modal** with focus trap, keyboard (Escape) and overlay dismiss
- **Real-time password strength meter** (Weak → Fair → Good → Strong)
- **Form validation** on all fields — inline errors on blur + submit
- **FAQ accordion** — one open at a time, keyboard accessible
- **CTA email form** with validation + success state
- **Pricing CTAs** pre-select plan inside the modal

### Code Quality
- Separated into `index.html` / `style.css` / `script.js`
- BEM-inspired class naming (`.block__element--modifier`)
- Semantic HTML5 elements: `<nav>`, `<section>`, `<article>`, `<blockquote>`, `<dl>`, `<footer>`
- ARIA attributes: `aria-label`, `aria-expanded`, `aria-hidden`, `role="dialog"`
- Modular JavaScript — each feature is its own `init` function
- Zero dependencies — no frameworks, no build tools

---

## Tech Stack

| Layer      | Choice |
|------------|--------|
| Markup     | HTML5 (semantic) |
| Styles     | CSS3 — custom properties, Grid, Flexbox, animations |
| Scripts    | Vanilla JavaScript (ES6+, strict mode) |
| Fonts      | Google Fonts — Syne (display) + DM Sans (body) |
| Deployment | Netlify / Vercel (drag-and-drop, no config needed) |

---

## Project Structure

```
flowly/
├── index.html      # Semantic markup, ARIA, section structure
├── style.css       # Tokens → reset → typography → components → responsive
├── script.js       # 8 modular init functions, fully commented
└── README.md
```

---

## Getting Started

No build step needed — open directly in a browser.

```bash
# Clone
git clone https://github.com/your-username/flowly-landing.git
cd flowly-landing

# Open (macOS)
open index.html

# Open (Windows)
start index.html
```

---

## Deployment

### Netlify (recommended)
1. Go to [netlify.com](https://netlify.com) → **Add new site → Deploy manually**
2. Drag the `flowly/` folder onto the deploy area
3. Done — live URL in seconds

### Vercel
```bash
npm i -g vercel
vercel
```

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 1 | Hero | Headline, CTAs, social proof avatars |
| 2 | Dashboard preview | Animated app mockup |
| 3 | Logos | Trusted-by brand strip |
| 4 | Features | 6-card feature grid |
| 5 | How it works | 3-step process + AI animation |
| 6 | Testimonials | 3 customer quotes |
| 7 | Pricing | 3-tier cards (Starter / Pro / Enterprise) |
| 8 | FAQ | Accordion with 5 questions |
| 9 | CTA Banner | Email capture with validation |
| 10 | Footer | Links + social icons |

---

## Design Decisions

**Why a single HTML file was split into 3 files:**
Industry projects separate concerns — HTML for structure, CSS for presentation, JS for behaviour. This makes each file independently readable, cacheable by the browser, and easier to maintain or hand off to a team member.

**Why vanilla JS over a framework:**
For a static landing page, React/Vue adds build complexity and bundle weight with no benefit. Vanilla JS runs instantly, has zero dependencies, and demonstrates understanding of the underlying platform.

**Why `localStorage` for theme + email:**
It shows awareness of browser storage APIs without overengineering. A real product would persist these server-side after authentication.

---

## Author

**[Manish.U]**  
[GitHub](https://github.com/manishsinghHQ) · [LinkedIn](https://www.linkedin.com/in/manish-u-39689b282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

---

*Built for the Internship Assignment — April 2026*
