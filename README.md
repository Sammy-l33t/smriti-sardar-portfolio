# Smriti Sardar — Video Editor & Cinematographer Portfolio

A high-performance, cinematic personal portfolio for **Smriti Sardar** built with a custom **Material UI (MUI 3)** design system, native HTML5, CSS3, and vanilla JavaScript. No complex build step or framework overhead required.

---

## 🌟 Key Features & Improvements

### 1. Authentic Photography & Interactive Hero
- Integrated authentic high-resolution photography of Smriti across Himalayan expeditions, snowy ridges with cinema camera rigs, Spiti canyon landscapes, and alpine villages.
- **Interactive Moment Switcher**: Allows visitors to toggle between 4 distinct photo moments (*Misty Peaks*, *Snow Rig*, *Canyon Sun*, *On Trail*) with smooth crossfade animations and updated narrative captions.
- Depth-layered floating badges showcasing high-altitude field filming credentials.

### 2. Material UI (MUI) Design Architecture
- **Material Symbols Outlined**: Google Material iconography integrated across buttons, chips, and cards.
- **Material Elevation System**: 5-tier elevation tokens (`--elevation-1` to `--elevation-5`) delivering authentic Material Design shadows, inset shadows, and ambient colored glows.
- **Material Components**:
  - Elevated Sticky App Bar with backdrop blur on scroll.
  - Floating Action Button (FAB) with speed dial menu.
  - Interactive Material Chips for category filtering.
  - Floating Label Outlined Text Fields with focus notch animations.
  - Material Dialogs (Modals) for detailed Project Case Studies and Showreel preview.
  - Material Snackbar (Toast) notification with auto-dismiss and close actions.

### 3. Animations on Every User Action
- **Dynamic Material Ripple**: Clicking ANY button, card, chip, or link calculates touch coordinates and triggers an expanding ripple wave.
- **Micro-interactions**: Subtle button compression on click (`scale(0.96)`), smooth card hover lift (`translateY(-6px)`), icon slides, and image zoom (`scale(1.05)`).
- **Service Accordion**: Smoothly expands and rotates indicator arrows on selection.
- **Form Submission**: Animated loading spinner transition into a success toast notification.
- **One-Click Email Copy**: Click the direct email card to copy to clipboard with haptic-style visual toast feedback.
- **Scroll Observer**: Smooth entrance reveal animations as content scrolls into the viewport.

### 4. Fully Optimized for Every Screen Type
- **Ultra-Mobile & Mobile (< 480px, 480-768px)**: Fluid typography using `clamp()`, minimum 48px touch targets, full-width touch-friendly cards, and a slide-down mobile navigation drawer.
- **Tablet (768px - 1024px)**: 2-column balanced layouts and tablet-optimized modal views.
- **Desktop & Ultra-wide (> 1024px, > 1440px)**: Asymmetric cinematic hero layout, 2-column and featured project grid, 3-column skills and testimonials, constrained to a 1320px viewport container.
- **Accessibility**: Support for `prefers-reduced-motion` and keyboard accessibility (`Escape` key modal closure).

---

## 🚀 Local Preview

Open `index.html` in any modern web browser or serve via:
```bash
npx serve .
# or
python3 -m http.server 3000
```

## 🌐 Deploy to Vercel
This project includes `vercel.json` and is ready for 1-click deployment on [Vercel](https://vercel.com):
```bash
npm install -g vercel
vercel
```
