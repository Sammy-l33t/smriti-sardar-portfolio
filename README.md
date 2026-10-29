# Smriti Sardar — Filmmaker & Video Editor Portfolio

A zero-overhead, ultra-high-performance cinematic personal portfolio for **Smriti Sardar** built with a **shadcn/ui (Zinc Dark Mode)** and **Magic UI** aesthetic (Linear / Vercel / Raycast SaaS style), using pure native HTML5, CSS3, and vanilla JavaScript (~2KB). Deployed seamlessly on Vercel with zero runtime framework overhead.

---

## 🌟 Design System & Architecture

### 1. shadcn/ui Zinc Dark Mode Tokens
- **Zinc Palette**: Deep obsidian canvas (`--background: #09090b`), translucent surfaces (`--glass-surface: rgba(18, 18, 22, 0.65)`), crisp 1px borders (`--border: #27272a`), high-contrast foreground typography (`--foreground: #fafafa`), and warm amber film accents (`--brand-amber: #f59e0b`).
- **Crisp Surfaces & Focus Rings**: Replaced heavy drop-shadows with crisp 1px borders, subtle ambient dark elevation, and accessible keyboard focus rings (`focus-visible:ring-2`).
- **Typography Hierarchy**:
  - **Inter**: Primary sans-serif font for headings, copy, navigation, and form inputs.
  - **JetBrains Mono**: Monospace font for badges, technical metadata, aspect ratios, metrics, and commit hashes.
- **Lucide Icons**: Featherweight, crisp SVG iconography loaded via Lucide (`data-lucide` with local offline resilience).

---

## ✨ Magic UI Micro-Interactions

### 1. BlurFade
Pure CSS `@keyframes blurFadeIn` and Intersection Observer reveal effects. Content enters view with subtle motion, progressive contrast, and smooth unblurring (`filter: blur(8px) -> blur(0)`).

### 2. Spotlight Cards (MagicCard)
Interactive cursor-following radial illuminator (`.magic-card`). Dynamically calculates touch and cursor coordinates (`--mouse-x`, `--mouse-y`) to cast a subtle glow across the border and card surface on hover.

### 3. Animated Border Beam (BorderBeam)
Signature Magic UI rotating perimeter highlight using pure CSS conic gradients and CSS masks. Showcased on the hero visual card frame and the featured case study card (*Shailaputri*).

### 4. Number Ticker
Smooth `requestAnimationFrame` counter animation for hero KPI metrics (`100+`, `6,000m+`, `4+1 Yrs`) with automatic thousand separator formatting and view-triggering.

### 5. Infinite Marquee Ticker
Continuous smooth CSS marquee banner featuring Smriti's cinematic statement across the screen.

---

## 🎬 Core Features

- **Interactive Moment Switcher**: Allows visitors to toggle between 4 distinct photography moments (*Misty Peaks*, *Snow Rig*, *Canyon Sun*, *On Trail*) with smooth crossfade transitions and dynamic captions.
- **Work Category Filter Tabs**: Instant filtering of filmography across *All*, *Mountaineering & Expeditions*, *Endurance & Sports*, and *Aerial & Landscape*.
- **Dynamic Case Study Modal**: Lightbox popup presenting complete production credits, tools (DaVinci Resolve Studio 19, Sony Cinema Line), aspect ratios (2.39:1 Cinema Scope), and delivery specifications.
- **4K Showreel Lightbox**: Dedicated video player modal with high-definition backdrop, production metadata, and direct booking trigger.
- **Sonner-Style Feedback Toast**: Sleek floating dark toast notification for user actions (form submission, email copy, showreel loading).
- **One-Click Email Copy**: Instant clipboard copy with visual feedback toast.
- **Live GitHub Commit Tracker**: Directly fetches and displays the live commit short SHA and commit message link from GitHub API.
- **Mobile Navigation Drawer**: Responsive slide-down navigation drawer with auto-close on desktop resize.

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
