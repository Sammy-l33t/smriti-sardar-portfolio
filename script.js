/**
 * SMRITI SARDAR — EXTRAORDINARY CREATIVE PORTFOLIO ENGINE
 * Features:
 *  - Custom Animated Desktop Cursor & Magnetic Controls
 *  - Mouse-Following Dynamic Spotlight
 *  - Interactive 3D Wireframe Canvas Globe (Drag & Touch Rotation)
 *  - 3D Tilt Hover Physics on World Cards
 *  - Canvas Route Elevation Profile Visualizer
 *  - Interactive Before & After Color Grading Slider (Mouse & Touch)
 *  - Dynamic Tabular Number Counter on Scroll
 *  - Adventure Gallery Category Filtering
 *  - Lazy Video & Project Lightbox System (Auto cleanup on exit)
 *  - Photo Lightbox System
 *  - Spam-Bot Protected Contact System (Honeypot + Click-to-Copy + Web3Forms)
 *  - Sonner-Style Toast Feedback System
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LUCIDE ICONS ---
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
  initIcons();

  // Current year
  const yearEl = document.querySelector("#currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- 2. CUSTOM ANIMATED CURSOR & MAGNETIC BUTTONS (Desktop) ---
  const cursorDot = document.querySelector("#cursorDot");
  const cursorRing = document.querySelector("#cursorRing");
  const mouseSpotlight = document.querySelector("#mouseSpotlight");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }

    if (mouseSpotlight) {
      mouseSpotlight.style.left = `${mouseX}px`;
      mouseSpotlight.style.top = `${mouseY}px`;
    }
  }, { passive: true });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Magnetic hover buttons
  const interactiveTargets = document.querySelectorAll("a, button, .world-card, .adv-photo-card, .film-project-card, .direct-copy-card");
  interactiveTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  // --- 3. SCROLL PROGRESS & HEADER ELEVATION ---
  const siteHeader = document.querySelector("#siteHeader");
  const scrollProgressBar = document.querySelector("#scrollProgressBar");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (siteHeader) {
      if (scrollTop > 30) {
        siteHeader.classList.add("elevated");
      } else {
        siteHeader.classList.remove("elevated");
      }
    }
  }, { passive: true });

  // --- 4. MOBILE NAVIGATION DRAWER ---
  const menuToggleBtn = document.querySelector("#menuToggleBtn");
  const mobileNavDrawer = document.querySelector("#mobileNavDrawer");

  if (menuToggleBtn && mobileNavDrawer) {
    menuToggleBtn.addEventListener("click", () => {
      const isOpen = mobileNavDrawer.classList.toggle("open");
      menuToggleBtn.classList.toggle("open", isOpen);
      menuToggleBtn.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileNavDrawer.querySelectorAll(".drawer-nav-item").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNavDrawer.classList.remove("open");
        menuToggleBtn.classList.remove("open");
        menuToggleBtn.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // --- 5. INTERACTIVE 3D ROTATING WIREFRAME GLOBE (CANVAS) ---
  const globeCanvas = document.querySelector("#globeCanvas");
  if (globeCanvas) {
    const ctx = globeCanvas.getContext("2d");
    let width = (globeCanvas.width = globeCanvas.offsetWidth * window.devicePixelRatio || 480);
    let height = (globeCanvas.height = globeCanvas.offsetHeight * window.devicePixelRatio || 480);

    const radius = Math.min(width, height) * 0.40;
    let rotX = 0.25;
    let rotY = 0;
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;

    // Pins on the globe (Latitude, Longitude in degrees, Name, Color)
    const pins = [
      { lat: 32.7, lon: 76.9, label: "Mount Tharang II (6,027m)", color: "#ff5500" }, // Western Himalayas
      { lat: 28.6, lon: 77.2, label: "Bigfoot Ultra Circuit", color: "#10e761" },     // North India
      { lat: 31.9, lon: 78.0, label: "Spiti Canyon Drone Reel", color: "#00d2ff" },   // Spiti
      { lat: 19.0, lon: 72.8, label: "Editing Studio & Film Fest", color: "#ff007f" }, // Mumbai / Fest
    ];

    function resizeGlobe() {
      if (!globeCanvas) return;
      width = globeCanvas.width = globeCanvas.offsetWidth * (window.devicePixelRatio || 1);
      height = globeCanvas.height = globeCanvas.offsetHeight * (window.devicePixelRatio || 1);
    }
    window.addEventListener("resize", resizeGlobe, { passive: true });

    // Mouse drag
    globeCanvas.addEventListener("mousedown", (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      rotY += dx * 0.006;
      rotX += dy * 0.006;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener("mouseup", () => (isDragging = false));

    // Touch drag
    globeCanvas.addEventListener("touchstart", (e) => {
      if (e.touches[0]) {
        isDragging = true;
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || !e.touches[0]) return;
      const dx = e.touches[0].clientX - lastX;
      const dy = e.touches[0].clientY - lastY;
      rotY += dx * 0.006;
      rotX += dy * 0.006;
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchend", () => (isDragging = false));

    function drawGlobe() {
      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        rotY += 0.0035; // Gentle auto-rotation
      }

      const cx = width / 2;
      const cy = height / 2;

      // Draw latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        const rLat = radius * Math.cos(phi);
        const yBase = -radius * Math.sin(phi);

        ctx.beginPath();
        for (let lon = 0; lon <= 360; lon += 6) {
          const theta = (lon * Math.PI) / 180 + rotY;

          // 3D coordinates
          const x3d = rLat * Math.sin(theta);
          const y3d = yBase * Math.cos(rotX) - rLat * Math.cos(theta) * Math.sin(rotX);
          const z3d = yBase * Math.sin(rotX) + rLat * Math.cos(theta) * Math.cos(rotX);

          if (z3d > -radius * 0.2) {
            const px = cx + x3d;
            const py = cy + y3d;
            if (lon === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = "rgba(0, 102, 255, 0.16)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw longitude meridians
      for (let m = 0; m < 12; m++) {
        const theta = (m * 30 * Math.PI) / 180 + rotY;
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 5) {
          const phi = (lat * Math.PI) / 180;
          const x3d = radius * Math.cos(phi) * Math.sin(theta);
          const yBase = -radius * Math.sin(phi);
          const y3d = yBase * Math.cos(rotX) - radius * Math.cos(phi) * Math.cos(theta) * Math.sin(rotX);
          const z3d = yBase * Math.sin(rotX) + radius * Math.cos(phi) * Math.cos(theta) * Math.cos(rotX);

          if (z3d > -radius * 0.25) {
            const px = cx + x3d;
            const py = cy + y3d;
            if (lat === -90) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = "rgba(255, 0, 127, 0.14)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw interactive Pins
      pins.forEach((pin) => {
        const phi = (pin.lat * Math.PI) / 180;
        const theta = (pin.lon * Math.PI) / 180 + rotY;

        const x3d = radius * Math.cos(phi) * Math.sin(theta);
        const yBase = -radius * Math.sin(phi);
        const y3d = yBase * Math.cos(rotX) - radius * Math.cos(phi) * Math.cos(theta) * Math.sin(rotX);
        const z3d = yBase * Math.sin(rotX) + radius * Math.cos(phi) * Math.cos(theta) * Math.cos(rotX);

        if (z3d > 0) {
          const px = cx + x3d;
          const py = cy + y3d;

          // Glowing pin node
          ctx.beginPath();
          ctx.arc(px, py, 5.5, 0, Math.PI * 2);
          ctx.fillStyle = pin.color;
          ctx.shadowColor = pin.color;
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Pin pulse ring
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.strokeStyle = pin.color;
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Label
          ctx.font = `${Math.max(11, width * 0.024)}px JetBrains Mono, monospace`;
          ctx.fillStyle = "#ffffff";
          ctx.fillText(pin.label, px + 12, py + 4);
        }
      });

      requestAnimationFrame(drawGlobe);
    }
    drawGlobe();
  }

  // --- 6. 3D TILT EFFECT ON THE 4 WORLD CARDS ---
  const worldCards = document.querySelectorAll(".world-card");
  worldCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // --- 7. RUNNING TRAIL ELEVATION VISUALIZER (CANVAS) ---
  const routeCanvas = document.querySelector("#routeCanvas");
  if (routeCanvas) {
    const ctx = routeCanvas.getContext("2d");
    let cWidth = (routeCanvas.width = routeCanvas.offsetWidth * (window.devicePixelRatio || 1));
    let cHeight = (routeCanvas.height = routeCanvas.offsetHeight * (window.devicePixelRatio || 1));

    function resizeRouteCanvas() {
      if (!routeCanvas) return;
      cWidth = routeCanvas.width = routeCanvas.offsetWidth * (window.devicePixelRatio || 1);
      cHeight = routeCanvas.height = routeCanvas.offsetHeight * (window.devicePixelRatio || 1);
      drawRouteProfile();
    }
    window.addEventListener("resize", resizeRouteCanvas, { passive: true });

    // Elevation points representing backyard ultra loop and trail runs
    const profile = [
      { km: 0, alt: 420 },
      { km: 10, alt: 680 },
      { km: 21, alt: 1100 },
      { km: 35, alt: 850 },
      { km: 42, alt: 1420 },
      { km: 60, alt: 1980 },
      { km: 75, alt: 1650 },
      { km: 85, alt: 2240 },
      { km: 100, alt: 2480 },
    ];

    function drawRouteProfile() {
      ctx.clearRect(0, 0, cWidth, cHeight);

      const padX = 40;
      const padY = 30;
      const graphW = cWidth - padX * 2;
      const graphH = cHeight - padY * 2;

      const minAlt = 300;
      const maxAlt = 2600;

      // Draw subtle grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = padY + (graphH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padX, y);
        ctx.lineTo(cWidth - padX, y);
        ctx.stroke();
      }

      // Create Gradient Fill below line
      const grad = ctx.createLinearGradient(0, padY, 0, cHeight - padY);
      grad.addColorStop(0, "rgba(16, 231, 97, 0.35)");
      grad.addColorStop(0.5, "rgba(255, 85, 0, 0.2)");
      grad.addColorStop(1, "rgba(16, 231, 97, 0.0)");

      // Path
      ctx.beginPath();
      profile.forEach((pt, idx) => {
        const x = padX + (pt.km / 100) * graphW;
        const normY = (pt.alt - minAlt) / (maxAlt - minAlt);
        const y = cHeight - padY - normY * graphH;

        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });

      // Fill area under curve
      ctx.lineTo(cWidth - padX, cHeight - padY);
      ctx.lineTo(padX, cHeight - padY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke line
      ctx.beginPath();
      profile.forEach((pt, idx) => {
        const x = padX + (pt.km / 100) * graphW;
        const normY = (pt.alt - minAlt) / (maxAlt - minAlt);
        const y = cHeight - padY - normY * graphH;

        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#10e761";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw checkpoints
      profile.forEach((pt) => {
        const x = padX + (pt.km / 100) * graphW;
        const normY = (pt.alt - minAlt) / (maxAlt - minAlt);
        const y = cHeight - padY - normY * graphH;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ccff00";
        ctx.shadowColor = "#ccff00";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "11px JetBrains Mono, monospace";
        ctx.fillStyle = "#94a3b8";
        ctx.fillText(`${pt.km}km`, x - 12, cHeight - 10);
      });
    }
    drawRouteProfile();
  }

  // --- 8. BEFORE & AFTER COLOR GRADING SPLIT SLIDER ---
  const baSlider = document.querySelector("#baSliderContainer");
  const baClipLayer = document.querySelector("#baClipLayer");
  const baHandle = document.querySelector("#baHandle");

  if (baSlider && baClipLayer && baHandle) {
    let isDraggingBA = false;

    function updateSliderWidth() {
      const rect = baSlider.getBoundingClientRect();
      baSlider.style.setProperty("--slider-width", `${rect.width}px`);
    }

    updateSliderWidth();
    window.addEventListener("resize", updateSliderWidth, { passive: true });

    function setBAPosition(clientX) {
      const rect = baSlider.getBoundingClientRect();
      let pos = (clientX - rect.left) / rect.width;
      if (pos < 0.02) pos = 0.02;
      if (pos > 0.98) pos = 0.98;

      const pct = pos * 100;
      baClipLayer.style.width = `${pct}%`;
      baHandle.style.left = `${pct}%`;
    }

    baSlider.addEventListener("mousedown", (e) => {
      isDraggingBA = true;
      setBAPosition(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDraggingBA) return;
      setBAPosition(e.clientX);
    });

    window.addEventListener("mouseup", () => (isDraggingBA = false));

    baSlider.addEventListener("touchstart", (e) => {
      if (e.touches[0]) {
        isDraggingBA = true;
        setBAPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDraggingBA || !e.touches[0]) return;
      setBAPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchend", () => (isDraggingBA = false));
  }

  // --- 9. ADVENTURE GALLERY CATEGORY FILTERING ---
  const filterTabs = document.querySelectorAll(".filter-tab-pill");
  const advCards = document.querySelectorAll(".adv-photo-card");

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const cat = tab.getAttribute("data-category");
      advCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (cat === "all" || cardCat === cat) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- 10. PROJECT CASE STUDY & LAZY VIDEO MODAL ---
  const projectModal = document.querySelector("#projectModal");
  const closeProjectModalBtn = document.querySelector("#closeProjectModalBtn");
  const modalVideoPlayer = document.querySelector("#modalVideoPlayer");
  const modalPosterImg = document.querySelector("#modalPosterImg");
  const modalToggleVideoBtn = document.querySelector("#modalToggleVideoBtn");
  const modalVideoBtnText = document.querySelector("#modalVideoBtnText");

  const modalTitle = document.querySelector("#modalTitle");
  const modalSubtitle = document.querySelector("#modalSubtitle");
  const modalDesc = document.querySelector("#modalDescription");
  const modalRole = document.querySelector("#modalRole");
  const modalTools = document.querySelector("#modalTools");
  const modalAspect = document.querySelector("#modalAspect");
  const modalResults = document.querySelector("#modalResults");

  const projectData = {
    shailaputri: {
      title: "Shailaputri: The Daughter of Mountains",
      subtitle: "45 min+ · Black & White 35mm Cinema · Miyar Valley, Western Himalayas",
      desc: "A landmark 45-minute mountaineering documentary capturing the historic Indian first ascent on Mount Tharang II (6,027m / 19,774 ft). Filmed in grueling sub-zero conditions with high-contrast monochrome cinematography to capture solitude, human endurance, and granite geometry.",
      role: "Cinematographer, Co-Director & Lead Colorist",
      tools: "Sony Cinema Line, DaVinci Resolve Studio 19, ACEScc Pipeline, Sub-Zero Heated Cage Rig",
      aspect: "2.39:1 CinemaScope",
      results: "Official Selection — Indian Mountaineering Foundation (IMF) Film Festival 2026",
      poster: "assets/images/gallery/shailaputri-film.webp",
      videoEmbed: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0",
      hasVideo: true,
      videoText: "Watch Film Teaser"
    },
    onelastloop: {
      title: "One Last Loop: The Backyard Ultra",
      subtitle: "8 min · High-End Sports Doc · Bigfoot Adventure India Collaboration",
      desc: "An intimate, psychological sports documentary demystifying the grueling Backyard Ultra format—where athletes run a 4.167-mile (6.706 km) loop every hour until only one remains standing. Filmed continuously through 30+ hours across day and night trail cycles.",
      role: "Director, Solo DP & Lead Editor",
      tools: "Sony FX3, Gimbal Rig, DaVinci Resolve Studio 19, Sennheiser Audio",
      aspect: "16:9 DCI 4K",
      results: "Official collaboration with Bigfoot Adventure India (BFAI); screened across Indian ultrarunning circuits",
      poster: "assets/images/gallery/one-last-loop-running.webp",
      videoEmbed: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0",
      hasVideo: true,
      videoText: "Watch Sports Doc"
    },
    above6000: {
      title: "Above 6,000 Meters: Alpine Cinematography",
      subtitle: "Technical Field Study · Sub-Zero Alpine Cinematography & Extreme Rigging",
      desc: "Documenting human resilience and technical ascents on high Himalayan ridges exceeding 19,700 ft. Addressing extreme cold (-25°C), hypoxia, and mechanical condensation with insulated battery rigs and manual weatherized optics.",
      role: "High-Altitude Cinematographer & Field Producer",
      tools: "Custom Cage Rig, Heated Battery Harness, Weather-Sealed Primes, Carbon Tripods",
      aspect: "2.39:1 CinemaScope",
      results: "Archival footage licensed for international alpine publications & expeditions",
      poster: "assets/images/gallery/snow-ridge-rig.webp",
      videoEmbed: null,
      hasVideo: false,
      videoText: "View Case Study"
    },
    terrainlight: {
      title: "Terrain & Light: Himalayan Geomorphology",
      subtitle: "Aerial Landscape & Spatial Cinematography Series · DGCA Compliant",
      desc: "Merging academic training in physical geography with aerial cinema craft. A visual survey of glacial recession and moraine geometry in the Western Himalayas, captured in low-angle golden hour alpenglow.",
      role: "Licensed Drone Pilot & Aerial Director",
      tools: "DJI Mavic 3 Pro Cine (ProRes 422 HQ), PolarPro Filters, DaVinci Resolve Studio",
      aspect: "16:9 Cinema 4K",
      results: "Exhibited in geospatial storytelling exhibitions & environmental archives",
      poster: "assets/images/gallery/aerial-landscape.webp",
      videoEmbed: null,
      hasVideo: false,
      videoText: "View Case Study"
    }
  };

  let currentProject = null;
  let isVideoPlaying = false;

  function stopVideo() {
    if (modalVideoPlayer) {
      modalVideoPlayer.innerHTML = "";
      modalVideoPlayer.style.display = "none";
    }
    if (modalPosterImg) {
      modalPosterImg.style.display = "block";
    }
    isVideoPlaying = false;
    if (modalVideoBtnText && currentProject) {
      modalVideoBtnText.textContent = currentProject.videoText;
    }
  }

  function openProject(projectId) {
    if (!projectModal) return;
    const p = projectData[projectId];
    if (!p) return;
    currentProject = p;
    stopVideo();

    if (modalTitle) modalTitle.textContent = p.title;
    if (modalSubtitle) modalSubtitle.textContent = p.subtitle;
    if (modalDesc) modalDesc.textContent = p.desc;
    if (modalRole) modalRole.textContent = p.role;
    if (modalTools) modalTools.textContent = p.tools;
    if (modalAspect) modalAspect.textContent = p.aspect;
    if (modalResults) modalResults.textContent = p.results;
    if (modalPosterImg) modalPosterImg.src = p.poster;

    if (modalToggleVideoBtn) {
      if (p.hasVideo && p.videoEmbed) {
        modalToggleVideoBtn.style.display = "inline-flex";
        if (modalVideoBtnText) modalVideoBtnText.textContent = p.videoText;
      } else {
        modalToggleVideoBtn.style.display = "none";
      }
    }

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    initIcons();
  }

  function closeProject() {
    if (!projectModal) return;
    stopVideo();
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentProject = null;
  }

  // Toggle video embed
  modalToggleVideoBtn?.addEventListener("click", () => {
    if (!currentProject || !currentProject.videoEmbed || !modalVideoPlayer) return;

    if (!isVideoPlaying) {
      modalVideoPlayer.innerHTML = `<iframe src="${currentProject.videoEmbed}" title="${currentProject.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      modalVideoPlayer.style.display = "block";
      if (modalPosterImg) modalPosterImg.style.display = "none";
      if (modalVideoBtnText) modalVideoBtnText.textContent = "Show Poster";
      isVideoPlaying = true;
    } else {
      stopVideo();
    }
    initIcons();
  });

  const projectTriggers = document.querySelectorAll(".project-open-trigger");
  projectTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const pid = trigger.getAttribute("data-project-id");
      if (pid) openProject(pid);
    });
  });

  closeProjectModalBtn?.addEventListener("click", closeProject);
  projectModal?.addEventListener("click", (e) => {
    if (e.target === projectModal) closeProject();
  });

  // --- 11. PHOTO LIGHTBOX MODAL ---
  const photoLightbox = document.querySelector("#photoLightbox");
  const closePhotoLightboxBtn = document.querySelector("#closePhotoLightboxBtn");
  const lightboxFullImg = document.querySelector("#lightboxFullImg");
  const lightboxTitle = document.querySelector("#lightboxTitle");
  const lightboxLocation = document.querySelector("#lightboxLocation");
  const lightboxAltitude = document.querySelector("#lightboxAltitude");
  const lightboxStory = document.querySelector("#lightboxStory");

  function openPhoto(card) {
    if (!photoLightbox) return;
    const img = card.getAttribute("data-img") || card.querySelector("img")?.src || "";
    const title = card.getAttribute("data-title") || "Mountain Expedition";
    const loc = card.getAttribute("data-location") || "Western Himalayas";
    const alt = card.getAttribute("data-altitude") || "High Altitude";
    const story = card.getAttribute("data-story") || "";

    if (lightboxFullImg) lightboxFullImg.src = img;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxLocation) lightboxLocation.innerHTML = `<i data-lucide="map-pin" class="icon-xs"></i> ${loc}`;
    if (lightboxAltitude) lightboxAltitude.textContent = alt;
    if (lightboxStory) lightboxStory.textContent = story;

    photoLightbox.classList.add("active");
    photoLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    initIcons();
  }

  function closePhoto() {
    if (!photoLightbox) return;
    photoLightbox.classList.remove("active");
    photoLightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  advCards.forEach((card) => {
    card.addEventListener("click", () => openPhoto(card));
  });

  closePhotoLightboxBtn?.addEventListener("click", closePhoto);
  photoLightbox?.addEventListener("click", (e) => {
    if (e.target === photoLightbox) closePhoto();
  });

  // Escape key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProject();
      closePhoto();
    }
  });

  // --- 12. RUNNING METRICS NUMBER COUNTERS ---
  let numbersTriggered = false;
  function runNumberCounters() {
    if (numbersTriggered) return;
    numbersTriggered = true;

    const counterElements = document.querySelectorAll(".ticker-num-target");
    counterElements.forEach((el) => {
      const target = parseFloat(el.getAttribute("data-target")) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1400;
      const startTime = performance.now();

      function updateCounter(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);

        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }

  // Trigger counters when scrolled into view
  const runningSec = document.querySelector("#running");
  if (runningSec && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) runNumberCounters();
      });
    }, { threshold: 0.15 });
    observer.observe(runningSec);
  } else {
    setTimeout(runNumberCounters, 600);
  }

  // --- 13. SONNER STYLE TOAST FEEDBACK ---
  const toastNotification = document.querySelector("#toastNotification");
  const toastMsgText = document.querySelector("#toastMsgText");
  const toastIcon = document.querySelector("#toastIcon");
  let toastTimer = null;

  function showToast(message, icon = "check-circle") {
    if (!toastNotification) return;
    if (toastMsgText) toastMsgText.textContent = message;
    if (toastIcon) {
      toastIcon.setAttribute("data-lucide", icon);
      initIcons();
    }

    toastNotification.style.display = "flex";
    requestAnimationFrame(() => toastNotification.classList.add("active"));

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove("active");
      setTimeout(() => {
        if (!toastNotification.classList.contains("active")) {
          toastNotification.style.display = "none";
        }
      }, 300);
    }, 4500);
  }

  // --- 14. SPAM BOT PROTECTED COPY & REVEAL (EMAIL & PHONE) ---
  async function copyText(text, successMsg, icon = "copy") {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast(successMsg, icon);
    } catch {
      showToast(text, icon);
    }
  }

  const copyEmailBtn = document.querySelector("#copyEmailBtn");
  copyEmailBtn?.addEventListener("click", () => {
    const email = "smritisardar010@gmail.com";
    copyText(email, "Copied email: " + email, "mail");
  });

  const copyPhoneBtn = document.querySelector("#copyPhoneBtn");
  copyPhoneBtn?.addEventListener("click", () => {
    const phone = "+91 9875641683";
    copyText(phone, "Copied phone: " + phone, "phone");
  });

  // --- 15. CONTACT FORM (WITH HONEYPOT & WEB3FORMS ACTION) ---
  const contactForm = document.querySelector("#contactForm");
  const submitBtn = document.querySelector("#contactSubmitBtn");

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Honeypot check
    const botcheck = contactForm.querySelector('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      showToast("Message sent! Smriti will be in touch.", "send");
      contactForm.reset();
      return;
    }

    const nameInput = document.querySelector("#userName");
    const emailInput = document.querySelector("#userEmail");
    const messageInput = document.querySelector("#userMessage");

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showToast("Please fill in all required fields.", "alert-triangle");
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    const inquiry = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem("smriti_inquiries");
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(inquiry);
      localStorage.setItem("smriti_inquiries", JSON.stringify(list));
    } catch (err) {
      console.warn("Storage warning:", err);
    }

    // Web3Forms submit if active key
    const keyInput = document.querySelector("#web3FormsKey");
    const key = keyInput?.value?.trim();

    if (key && key !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      try {
        const formData = new FormData(contactForm);
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
      } catch (err) {
        // Fallback gracefully
      }
    } else {
      await new Promise((r) => setTimeout(r, 600));
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message 🚀";
    }

    contactForm.reset();
    showToast("Message received! Smriti will connect within 24 hours.", "send");
  });
});
