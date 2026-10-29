# Smriti Sardar — Filmmaker & Video Editor Portfolio

A zero-overhead, ultra-high-performance cinematic personal portfolio for **Smriti Sardar** styled with the **Kaelorian Editorial Design System** (inspired by [Kaelorian](https://kaelorian.framer.website/)), featuring a **Matte Obsidian & Vermilion Red Palette**, **Heroic Condensed Bebas Neue Typography**, **Crisp 1px Hairline Borders**, and **Signature Technical Index Notation** (`•01`, `•02`, `•03`, `¬`), while strictly preserving all portfolio information and zero-overhead native static deployment on Vercel.

---

## 🎨 Kaelorian Color & Aesthetic System

1. **Canvas & Surfaces**:
   - Matte Obsidian background (`#0c0c0c`)
   - Dark Basalt card surfaces (`#141414`)
   - Crisp 1px hairline borders (`rgba(255, 255, 255, 0.1)`)
2. **Typography**:
   - Heroic Condensed Display: **Bebas Neue** (tall, bold, cinematic uppercase display scale)
   - Refined Editorial Body: **DM Sans** & **Inter** (clean, geometric, ultra-legible)
   - Technical Notation & Counters: **JetBrains Mono**
3. **Primary Accent (Kaelorian Vermilion Red)**:
   - High-contrast Vermilion Red (`#d92615` / hover `#fa4e3e`) for buttons, active state chips, pulse dots, and spotlight warmth.
4. **Editorial Index Notation**:
   - Numbered section badges: `•01 / FILMMAKER`, `•02 / ABOUT`, `•03 / SELECTED WORK`, `•04 / PHILOSOPHY`, `•05 / PROCESS`, `•06 / LET'S CONNECT`.
   - Technical list bullets using `¬` and `º`.

---

## ✨ Magic UI Micro-Interactions

### 1. BlurFade Entry (BlurFade)
Pure CSS `@keyframes blur-fade-in` (animating `opacity: 0` to `1`, `filter: blur(8px)` to `blur(0px)`, and `translateY(12px)` to `0`) with staggered delays as content scrolls into view.

### 2. Interactive Spotlight Cards (MagicCard)
Cursor-following radial illuminator (`.magic-card`). Dynamically calculates touch and cursor coordinates (`--mouse-x`, `--mouse-y`) to cast an Electric Indigo & Cyan spotlight across the border and card surface on hover.

### 3. Animated Border Beam (BorderBeam)
Signature Magic UI rotating perimeter highlight using pure CSS conic gradients and CSS masks blending **Tone 4 (Electric Indigo `#6366f1`) and Tone 5 (Vibrant Cyan `#06b6d4`)**. Showcased on the hero visual card frame and the featured case study card (*Shailaputri*).

### 4. Number Ticker (NumberTicker)
Smooth `requestAnimationFrame` counter animation for hero KPI metrics (`100+`, `6,000m+`, `4+1 Yrs`) with automatic thousand separator formatting and view-triggering.

### 5. Infinite Marquee Ticker
Continuous smooth CSS marquee banner featuring Smriti's cinematic statement across the screen with Tone 5 Cyan star dividers.

---

## 🎬 Core Features

- **Interactive Moment Switcher**: Toggle between 4 distinct photography moments (*Misty Peaks*, *Snow Rig*, *Canyon Sun*, *On Trail*) with smooth crossfade transitions and dynamic captions.
- **Work Category Filter Tabs**: Instant filtering of filmography across *All*, *Mountaineering & Expeditions*, *Endurance & Sports*, and *Aerial & Landscape*.
- **Dynamic Case Study Modal**: Lightbox popup presenting complete production credits, tools (DaVinci Resolve Studio 19, Sony Cinema Line), aspect ratios (2.39:1 Cinema Scope), and delivery specifications.
- **4K Showreel Lightbox**: Dedicated video player modal with high-definition backdrop, production metadata, and direct booking trigger.
- **Sonner-Style Feedback Toast**: Sleek floating dark toast notification for user actions (form submission, email copy, showreel loading).
- **One-Click Email Copy**: Instant clipboard copy with visual feedback toast.
- **Live GitHub Commit Tracker**: Directly fetches and displays the live commit short SHA and commit message link from GitHub REST API.
- **Mobile Navigation Drawer**: Responsive slide-down navigation drawer with auto-close on desktop resize.
- **Admin Inquiries Portal (`/admin` / `admin.html`)**: Bespoke authenticated inquiries dispatch console for managing all incoming contact requests with live storage sync, status filters, CSV export, and email client responses.

---

## 🛡️ Admin Inquiries Portal (`/admin`)

An exclusive, password-authenticated terminal console for Smriti Sardar to review, manage, and dispatch responses to all incoming contact requests from the portfolio's contact form.

### Demo Access
- **URL**: `admin.html` (or `/admin` on Vercel deployment)
- **Demo Email**: `admin@smritisardar.com`
- **Demo Password**: `smriti2026`
- **One-Click Demo Button**: Available on the login screen for instantaneous authorized preview.

### Capabilities
1. **Live Real-Time Synchronization**: Any inquiry submitted via the public contact form (`index.html`) is immediately broadcasted via `localStorage` and `window.dispatchEvent('storage')` to the admin console without page refreshes.
2. **KPI Telemetry**: Real-time counter of total inquiries, unread leads, replied dispatches, and top requested production scope.
3. **Multi-Criterion Filtering**: Filter by status (*All*, *Unread*, *Replied*, *Archived*), project scope (*Documentary*, *Commercial*, *Drone*, *Color/Editing*), sort order (*Newest*, *Oldest*), and full-text keyword search.
4. **Client Dossier Drawer**: Detailed modal view with direct `mailto:` reply (pre-filled subject & greeting), copy dossier to clipboard, and private internal admin notes.
5. **CSV Export**: One-click download of all lifetime leads into a clean, UTF-8 formatted CSV spreadsheet.
6. **Inquiry Simulator**: Integrated testing modal to simulate new incoming client inquiries from templates (Himalayan Expedition Doc, Nordic Commercial, CineLifter Pilot).

---

## 🚀 Local Preview

Open `index.html` in any modern web browser or serve locally:
```bash
npx serve .
# or
python3 -m http.server 3000
```

---

## 🌐 Deploy to Vercel

Configured with `vercel.json` for 1-click deployment with clean URLs and immutable asset caching:
```bash
npm install -g vercel
vercel
```
