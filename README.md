# Smriti Sardar — Filmmaker & Video Editor Portfolio

A zero-overhead, ultra-high-performance cinematic personal portfolio for **Smriti Sardar** built with a **shadcn/ui + Magic UI** aesthetic (Linear / Vercel / Raycast SaaS style), featuring a rich **5-Tone Color Architecture** and a **3-Tier Typography System**, using pure native HTML5, CSS3, Tailwind CSS, and vanilla JavaScript (~2KB). Deployed statically on Vercel with zero runtime framework overhead.

---

## 🎨 5-Tone Color Architecture

The entire portfolio adheres strictly to an intentional 5-tone color hierarchy defined in `:root` and Tailwind config:

1. **Tone 1 (Canvas & Elevated Glassmorphic Surfaces)**:
   - Deep Obsidian background (`#09090b` / `zinc-950`)
   - Translucent glassmorphic card surfaces (`#121216` / `bg-zinc-900/60` / `rgba(18, 18, 22, 0.65)`)
   - Crisp 1px borders (`#27272a` / `border-zinc-800/80`)
2. **Tone 2 (Reserved Strictly for Titles & Headings)**:
   - Crisp Alabaster White (`#f8fafc`) with subtle linear gradient highlights strictly reserved for H1, H2, H3, and H4 headings.
3. **Tone 3 (Reserved Strictly for Descriptions & Body Copy)**:
   - Cool Slate Muted (`#94a3b8` / `text-slate-400`), Slate bright (`#cbd5e1`), and Slate dim (`#64748b`) strictly reserved for subtitles, descriptions, and paragraph text to enforce immediate visual contrast against titles.
4. **Tone 4 (Primary Brand & Interactive Accent)**:
   - Electric Indigo / Violet (`#6366f1` to `#8b5cf6`) reserved for primary CTA buttons, active states, focus rings (`focus-visible:ring-2 focus-visible:ring-indigo-500/50`), active scale (`active:scale-[0.98]`), and spotlight glows.
5. **Tone 5 (Secondary Highlight & Data Accent)**:
   - Vibrant Cyan (`#06b6d4`) and Emerald (`#10b981`) reserved for badges, status indicators, KPI trends, and secondary highlights.

---

## 🔤 3-Tier Complementary Typography System

- **Tier 1 — Display / Titles Font**: **Plus Jakarta Sans** (semi-bold/bold, tight tracking `tracking-tight` / `-0.035em`) for all headings and titles.
- **Tier 2 — Body / Descriptions Font**: **Inter** (regular/medium, relaxed line-height `leading-relaxed` / `1.65`) for optimal readability on descriptions and UI labels.
- **Tier 3 — Technical / Numbers Font**: **JetBrains Mono** for numerical stats, code snippets, tags, aspect ratios, and tabular data.

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
