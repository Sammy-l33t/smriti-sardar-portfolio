# Smriti Sardar — Wildlife & Himalayan Expedition Cinematographer Portfolio

An ultra-high-performance, cinematic personal portfolio for **Smriti Sardar** inspired by world-class **wildlife and expedition photography portfolios** (National Geographic, BBC Earth, Sony Artisan Wildlife Galleries). Built with a **5-Tone Wilderness Color Architecture**, a **3-Tier Editorial Typography System**, and zero-overhead **Magic UI micro-interactions**, using pure native HTML5, CSS3, Tailwind CSS, and vanilla JavaScript (~2KB). Deployed statically on Vercel with zero runtime framework overhead.

---

## 🌲 Wildlife & Expedition 5-Tone Color Architecture

The entire portfolio is built on a rich, atmospheric wilderness color palette defined in `:root` and Tailwind config:

1. **Tone 1 (Canvas & Elevated Wilderness Surfaces)**:
   - Deep Forest Moss Obsidian canvas (`#070a08`)
   - Basalt stone card surfaces (`#0e1411` / `rgba(14, 20, 17, 0.72)`) with 12px glassmorphism blur
   - Weathered granite 1px borders (`rgba(200, 215, 205, 0.1)`)
2. **Tone 2 (Reserved Strictly for Titles & Exhibition Headings)**:
   - Sunlit Sandstone & Mountain Chalk (`#f5f2eb`)
   - Warm editorial ivory gradient (`linear-gradient(135deg, #ffffff 25%, #f5efe6 60%, #e29d52 100%)`) strictly reserved for headings.
3. **Tone 3 (Reserved Strictly for Field Notes, Descriptions & Body Copy)**:
   - Lichen Stone & Mountain Mist (`#98a59c`), Bright Mist (`#cbd5ce`), and Dark Stone (`#657469`) strictly reserved for subtitles, descriptions, and paragraph copy to enforce clear contrast against headings.
4. **Tone 4 (Primary Brand & Interactive Field Accent)**:
   - Alpine Amber & Savannah Sun (`#e29d52` to `#c27803`) reserved for primary CTA buttons, active filter chips, focus rings (`focus-visible:ring-2 focus-visible:ring-amber-500/50`), and spotlight glows.
5. **Tone 5 (Secondary Wilderness Highlight & Ecological Data Accent)**:
   - Alpine Spruce & Glacial Emerald (`#10b981`) and Glacial Turquoise (`#2dd4bf`) reserved for telemetry badges, status indicators, and the border beam accent.

---

## 🔤 3-Tier Wildlife & Expedition Typography System

- **Tier 1 — Exhibition Display Font**: **Cormorant Garamond** (high-elegance editorial serif with light/medium weights) for all headings and titles, providing National Geographic / exhibition gallery presence.
- **Tier 2 — Modern UI & Field Descriptions Font**: **Plus Jakarta Sans** for navigation and badges; **Inter** for descriptions and body copy.
- **Tier 3 — Technical & Field Exif Telemetry Font**: **JetBrains Mono** for numerical stats, coordinates (`32°N 78°E`), focal lengths, shutter speeds, sensor specs, and commit hashes.

---

## ✨ Magic UI Micro-Interactions (~2KB Zero Overhead)

### 1. Blur-Fade Entry (BlurFade)
Pure CSS `@keyframes blur-fade-in` (`opacity: 0 -> 1`, `filter: blur(8px) -> blur(0px)`, `translateY(12px) -> 0`) with staggered delays as content scrolls into view.

### 2. Interactive Spotlight Cards (MagicCard)
Cursor-following radial illuminator (`.magic-card`). Dynamically calculates touch and cursor coordinates (`--mouse-x`, `--mouse-y`) to cast an Alpine Amber (`#e29d52`) and Forest Emerald (`#10b981`) spotlight across the border and card surface on hover.

### 3. Animated Border Beam (BorderBeam)
Signature Magic UI rotating perimeter highlight using pure CSS conic gradients and CSS masks blending **Tone 4 (Alpine Amber `#e29d52`) and Tone 5 (Glacial Emerald `#10b981`)**. Showcased on the hero visual card frame and the featured case study card (*Shailaputri*).

### 4. Number Ticker (NumberTicker)
Smooth `requestAnimationFrame` counter animation for hero KPI metrics (`100+`, `6,000m+`, `4+1 Yrs`) with automatic thousand separator formatting and view-triggering.

### 5. Infinite Marquee Ticker
Continuous smooth CSS marquee banner featuring Smriti's wildlife and alpine expedition statement across the screen with Tone 4 Amber star dividers.

---

## 🎬 Core Features

- **Interactive Moment Switcher**: Toggle between 4 distinct photography moments (*Misty Peaks*, *Snow Rig*, *Canyon Sun*, *On Trail*) with smooth crossfade transitions and dynamic captions.
- **Curated Filmography Gallery**: Instant filtering of filmography across *All Works*, *Himalayan Expeditions*, *Endurance & Wilderness*, and *Aerial Topography*.
- **Dynamic Case Study Modal**: Lightbox popup presenting complete production credits, tools (DaVinci Resolve Studio 19, Sony Cinema Line), aspect ratios (2.39:1 Cinema Scope), and delivery specifications.
- **4K Showreel Lightbox**: Dedicated video player modal with high-definition backdrop, production metadata, and direct booking trigger.
- **Sonner-Style Feedback Toast**: Sleek floating dark toast notification for user actions (form submission, email copy, showreel loading).
- **One-Click Email Copy**: Instant clipboard copy with visual feedback toast.
- **Live GitHub Commit Tracker**: Directly fetches and displays the live commit short SHA and commit message link from GitHub REST API.
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
