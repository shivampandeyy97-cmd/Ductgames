<div align="center">

<img src="assets/logo.png" alt="Ductgames Logo" width="120" height="120" />

# 🎮 Ductgames

### Play Free HTML5 Games Instantly — No Downloads, No Sign-Up

[![Live Site](https://img.shields.io/badge/Live%20Site-ductgames.com-6C3CE1?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ductgames.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Games Catalog](#-games-catalog)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [SEO Strategy](#-seo-strategy)
- [Monetisation](#-monetisation)
- [Analytics](#-analytics)
- [Dark Mode](#-dark-mode)
- [Performance](#-performance)
- [Getting Started Locally](#-getting-started-locally)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧩 About

**Ductgames** is a fully static, zero-dependency HTML5 browser gaming platform. Players can access a curated library of classic and modern games directly in their browser — with zero friction. No Flash, no plugins, no accounts, no downloads.

The site is built with **pure HTML, CSS, and Vanilla JavaScript** — making it blazing-fast, infinitely scalable at zero hosting cost (GitHub Pages), and SEO-friendly out of the box.

> **Mission:** Make great gaming accessible to everyone, everywhere, on any device — for free.

---

## 🌐 Live Demo

🔗 **[https://ductgames.com](https://ductgames.com)**

The site is deployed via **GitHub Pages** with a custom domain (`ductgames.com`) configured through a `CNAME` file.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎮 **4 Playable Games** | Tic Tac Toe, Snake, Memory Match, 2048 |
| 🌙 **Dark / Light Mode** | System-aware + manual toggle, persisted in `localStorage` |
| 🔍 **Live Search** | Header + hero search bars, routes to `/search.html` |
| 🗂️ **Category Filters** | All, Puzzle, Arcade, Strategy, Sports — instant JS filtering |
| 🃏 **Featured Hero Cards** | Animated canvas live-previews, shine sweeps, glow orbs |
| 📱 **Fully Responsive** | Mobile, tablet & desktop layouts |
| 🍪 **Cookie Consent** | GDPR-friendly banner persisted via `localStorage` |
| 📰 **Blog Section** | 4 SEO-optimised articles with structured data |
| ⚡ **Zero Dependencies** | No frameworks, no npm, no build step |
| 🔒 **Privacy-First** | No user accounts, no personal data stored |
| 🤖 **SEO-Optimised** | Sitemap, robots.txt, JSON-LD, OG tags, canonical URLs |

---

## 🎮 Games Catalog

| Game | Category | URL | Description |
|---|---|---|---|
| **Tic Tac Toe** | Strategy | `/games/tictactoe/` | Classic 3×3 vs AI — Easy & Hard difficulty |
| **Snake** | Arcade | `/games/snake/` | Eat, grow, dodge walls — 3 speed modes + high score |
| **Memory Match** | Puzzle | `/games/memory/` | Flip and match pairs — timed challenges |
| **2048** | Puzzle | `/games/2048/` | Slide tiles, merge numbers, reach 2048 |

> 🚀 New games are planned and will be added regularly (see [Roadmap](#-roadmap)).

---

## 🛠️ Tech Stack & Architecture

### Core Technologies

| Layer | Technology | Why |
|---|---|---|
| **Structure** | HTML5 (Semantic) | SEO, accessibility, standards |
| **Styling** | Vanilla CSS3 | Zero overhead, full control, CSS custom properties |
| **Logic** | Vanilla JavaScript (ES6+) | No framework lock-in, fast load |
| **Hosting** | GitHub Pages | Free, CDN-backed, zero infra ops |
| **Domain** | Custom via CNAME | `ductgames.com` → GitHub Pages |
| **Analytics** | Google Analytics 4 | User insights, traffic tracking |
| **Ads** | Google AdSense (ready) | Monetisation layer |

### Architecture Overview

```
┌────────────────────────────────────────────────────┐
│                   Browser (Client)                 │
│                                                    │
│  ┌──────────┐  ┌───────────┐  ┌────────────────┐  │
│  │ index.html│  │ style.css │  │   main.js      │  │
│  │ (HTML5)  │  │ (CSS3)    │  │ (Vanilla JS)   │  │
│  └──────────┘  └───────────┘  └────────────────┘  │
│        │               │               │            │
│        └───────────────┴───────────────┘            │
│                        │                            │
│              ┌─────────▼──────────┐                 │
│              │  Game Engines      │                 │
│              │  (Canvas API /     │                 │
│              │   DOM manipulation)│                 │
│              └────────────────────┘                 │
└────────────────────────────────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   GitHub Pages CDN  │
              │   (ductgames.com)   │
              └─────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
   Google Analytics  Google AdSense  Google Fonts
   (GA4 tracking)   (Monetisation)  (Typography)
```

### CSS Design System

The entire visual identity lives in [`css/style.css`](css/style.css) (~39 KB) using **CSS Custom Properties** (variables) for theming:

```css
/* Light / Dark Mode Token System */
[data-theme="light"] {
  --bg-primary: #ffffff;
  --accent:     #6C3CE1;   /* Brand purple */
  --text:       #1a1a2e;
}
[data-theme="dark"] {
  --bg-primary: #0f0f1a;
  --accent:     #8B5CF6;
  --text:       #e2e8f0;
}
```

Key CSS features used:
- CSS Custom Properties (variables) for theming
- CSS Grid & Flexbox for all layouts
- `@keyframes` animations (shine sweep, orb float, canvas pulse)
- `backdrop-filter: blur()` glassmorphism effects
- `clamp()` fluid typography
- `prefers-color-scheme` media query as system fallback
- `::before` / `::after` pseudo-elements for decorative layers

### JavaScript Architecture

[`js/main.js`](js/main.js) (~32 KB) is a single-file, module-style vanilla JS controller:

```
main.js
├── GAMES_DATA[]         — Game catalogue (title, category, URL, tags)
├── ThemeManager         — Dark/light toggle + localStorage persistence
├── SearchManager        — Live search, debounce, route to search.html
├── FilterManager        — Category tab filtering with animation
├── GridRenderer         — Renders game cards into DOM
├── CanvasPreviewEngine  — Animated canvas mini-previews on hero cards
│   ├── drawTicTacToe()  — Animated X/O board
│   └── drawSnakeGame()  — Animated snake path
├── CookieBanner         — GDPR consent banner logic
└── MobileMenu           — Hamburger toggle for responsive nav
```

### Game Engine Stack

Each game lives in its own self-contained directory with no external dependencies:

| Game | Rendering | Logic |
|---|---|---|
| **Tic Tac Toe** | DOM manipulation | Minimax AI algorithm |
| **Snake** | HTML5 Canvas API | Grid-based game loop (`requestAnimationFrame`) |
| **Memory Match** | DOM / CSS flip cards | Card shuffle (Fisher-Yates), timer |
| **2048** | DOM manipulation | Tile merge logic, swipe gesture support |

---

## 📁 Project Structure

```
Ductgames/
│
├── index.html                    ← Homepage (hero, game grid, featured cards)
├── search.html                   ← Search results page
├── 404.html                      ← Custom 404 error page
├── CNAME                         ← GitHub Pages custom domain (ductgames.com)
├── robots.txt                    ← Crawler instructions
├── sitemap.xml                   ← XML sitemap for search engines
├── ads.txt                       ← Authorized Digital Sellers (AdSense)
├── README.md                     ← This file
│
├── css/
│   └── style.css                 ← Complete design system (~39KB)
│
├── js/
│   └── main.js                   ← All site-level JavaScript (~32KB)
│
├── assets/
│   ├── logo.png                  ← Brand logo (light + dark compatible)
│   ├── favicon.ico               ← Browser favicon
│   ├── favicon.svg               ← SVG favicon (modern browsers)
│   └── blog/                     ← Blog article images
│
├── games/
│   ├── tictactoe/
│   │   └── index.html            ← Tic Tac Toe game (self-contained)
│   ├── snake/
│   │   └── index.html            ← Snake game (Canvas API)
│   ├── memory/
│   │   └── index.html            ← Memory Match game
│   └── 2048/
│       └── index.html            ← 2048 sliding puzzle
│
├── pages/
│   ├── about.html                ← About Ductgames
│   ├── contact.html              ← Contact form
│   ├── privacy-policy.html       ← Privacy Policy (GDPR-ready)
│   └── terms.html                ← Terms & Conditions
│
├── blog/
│   ├── index.html                ← Blog listing page
│   ├── brain-benefits-puzzle-games.html
│   ├── evolution-of-arcade-games.html
│   ├── top-browser-strategy-games.html
│   └── why-html5-games-are-the-future.html
│
└── new-games/
    └── index.html                ← Coming Soon page for new games
```

---

## 🗺️ Pages & Routes

| Route | Page | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage — hero, game grid, featured cards |
| `/search.html?q=...` | `search.html` | Search results |
| `/404.html` | `404.html` | Custom error page |
| `/games/tictactoe/` | Game page | Play Tic Tac Toe |
| `/games/snake/` | Game page | Play Snake |
| `/games/memory/` | Game page | Play Memory Match |
| `/games/2048/` | Game page | Play 2048 |
| `/pages/about.html` | About | Team & mission |
| `/pages/contact.html` | Contact | Feedback form |
| `/pages/privacy-policy.html` | Legal | Privacy & cookies |
| `/pages/terms.html` | Legal | Terms & conditions |
| `/blog/` | Blog index | Article listing |
| `/blog/*.html` | Blog articles | Individual posts |
| `/new-games/` | Coming Soon | Future games placeholder |

---

## 🔍 SEO Strategy

Ductgames is built SEO-first. Every page implements:

- ✅ **Unique `<title>` tags** — descriptive, keyword-rich
- ✅ **Meta descriptions** — compelling, under 160 characters
- ✅ **Canonical URLs** — prevent duplicate content issues
- ✅ **Open Graph tags** — rich previews on Facebook, LinkedIn
- ✅ **Twitter Card tags** — `summary_large_image` format
- ✅ **JSON-LD Structured Data** — `WebSite`, `ItemList`, `Article`, `SearchAction`
- ✅ **XML Sitemap** — `/sitemap.xml` submitted to Google Search Console
- ✅ **robots.txt** — crawl directives for all major bots
- ✅ **Semantic HTML5** — `<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`
- ✅ **`aria-*` attributes** — screen reader accessibility
- ✅ **Schema `potentialAction: SearchAction`** — enables Google sitelinks search box
- ✅ **`ads.txt`** — AdSense authorisation

---

## 💰 Monetisation

The site uses **Google AdSense** with placement-ready slots:

| Placement | Format | Location |
|---|---|---|
| Top of content | Banner 728×90 | Below hero, above game grid |
| Mid-content | Responsive banner | Between game sections |
| Game pages | Rectangle / in-game | Sidebar or below canvas |

AdSense code slots are pre-marked in HTML with comments — swap in your publisher ID to activate.

---

## 📊 Analytics

**Google Analytics 4** is integrated on all pages:

- **Property ID:** `G-6YB7SNGH6T`
- Tracks: page views, session duration, bounce rate, traffic sources
- Game events can be tracked via `gtag('event', ...)` calls in game JS

---

## 🌙 Dark Mode

Theme switching is handled entirely in CSS + ~30 lines of JS:

1. On page load, JS reads `localStorage.getItem('dg_theme')` **before render** to prevent flash of wrong theme (FOWT)
2. Applies `data-theme="dark"` to `<html>` immediately
3. Toggle button in header flips the attribute and saves preference
4. All colours are CSS custom properties — zero JS involved in actual styling

---

## ⚡ Performance

| Optimisation | Implementation |
|---|---|
| **Zero JS frameworks** | No React/Vue/Angular bundle overhead |
| **Single CSS file** | One network request for all styles |
| **Single JS file** | One network request for all logic |
| **Preconnect hints** | `<link rel="preconnect">` for Google Fonts, GTM |
| **Lazy assets** | Images load on demand |
| **Canvas previews** | Drawn in JS — no image downloads for previews |
| **Static hosting** | GitHub Pages CDN — global edge delivery |
| **No server** | Zero backend = zero latency |

---

## 🚀 Getting Started Locally

No build tools required. Just clone and open:

```bash
# Clone the repository
git clone https://github.com/shivampandeyy97-cmd/Ductgames.git

# Navigate to the project
cd Ductgames

# Option 1: Open directly in browser
open index.html

# Option 2: Serve with Python (recommended for correct relative paths)
python3 -m http.server 8080
# Then visit: http://localhost:8080

# Option 3: Use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## 🌍 Deployment

### GitHub Pages (Current)

1. Push to the `main` branch
2. Go to **Settings → Pages** in the GitHub repo
3. Set source to **"Deploy from branch → main / root"**
4. Add custom domain `ductgames.com` under **Custom domain**
5. The `CNAME` file in the repo root handles the mapping automatically

### DNS Configuration (at your domain registrar)

```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     shivampandeyy97-cmd.github.io
```

---

## 🗺️ Roadmap

### 🔜 Upcoming Games
- [ ] Minesweeper
- [ ] Wordle clone
- [ ] Flappy Bird clone
- [ ] Chess (vs AI)
- [ ] Sudoku
- [ ] Breakout / Arkanoid
- [ ] Tetris clone

### 🔜 Platform Features
- [ ] Global leaderboards (serverless — Supabase / Firebase)
- [ ] User accounts (optional, anonymous play stays default)
- [ ] Game rating system
- [ ] "Recently Played" local history
- [ ] Game embed codes for third-party sites
- [ ] PWA support (offline play)
- [ ] Mobile app wrapper (Capacitor)

### 🔜 Content
- [ ] Weekly blog posts
- [ ] Game tutorial videos
- [ ] Game strategy guides

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute a new game:

1. **Fork** this repository
2. Create a new folder under `games/your-game-name/`
3. Create a self-contained `index.html` (HTML + CSS + JS all-in-one, or separate files)
4. Add your game entry to the `GAMES_DATA` array in `js/main.js`
5. Add a route in `sitemap.xml`
6. Open a **Pull Request** with a short description

**Game requirements:**
- ✅ Must work without any backend
- ✅ Must be mobile-responsive
- ✅ Must respect the site's dark/light theme tokens
- ✅ No external dependencies (no CDN scripts)
- ✅ Must include proper `<title>` and meta tags

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Ductgames

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

Made with ❤️ by the Ductgames team

⭐ **Star this repo** if you find it useful!

[![GitHub Stars](https://img.shields.io/github/stars/shivampandeyy97-cmd/Ductgames?style=social)](https://github.com/shivampandeyy97-cmd/Ductgames/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/shivampandeyy97-cmd/Ductgames?style=social)](https://github.com/shivampandeyy97-cmd/Ductgames/network/members)

**[🌐 ductgames.com](https://ductgames.com)** · **[📧 support@ductgames.com](mailto:support@ductgames.com)**

</div>
