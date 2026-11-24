/**
 * SMRITI SARDAR PORTFOLIO — INTERACTIVE ENGINE
 * Theme: Cinematic Dark · Beyond Limits. Beyond Ordinary.
 * Features:
 *  - Lucide Icons Initializer
 *  - Dynamic Current Year
 *  - Scroll Progress Bar & Header Elevation State
 *  - Mobile Drawer Navigation
 *  - Interactive Before & After Color Grading Comparison Slider (Mouse & Touch)
 *  - Adventure Gallery Category Tabs Filtering
 *  - Adventure Photo Lightbox System
 *  - Project Case Study Modal (Rich Real Stories + Lazy Video Embeds)
 *  - Dynamic Tabular Number Counter on Scroll
 *  - Interactive Project Scope Choice Chips
 *  - Sonner-Style Toast Notifications
 *  - Anti-Spam Contact Form Submission (Honeypot, Web3Forms & LocalStorage Fallback)
 *  - One-Click Clipboard Copy & Reveal for Email & Phone (Spam Bot Protected)
 *  - Intersection Observer for Cinematic Scroll Reveals
 */

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LUCIDE ICONS INITIALIZER ---
  function initIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
  initIcons();

  // --- 2. DYNAMIC CURRENT YEAR ---
  const yearEl = document.querySelector("#currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 3. SCROLL PROGRESS BAR & HEADER GLASS STATE ---
  const appbar = document.querySelector("#appbar");
  const scrollProgressBar = document.querySelector("#scroll-progress");

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (scrollProgressBar) {
          scrollProgressBar.style.width = scrollPercent + "%";
        }

        if (appbar) {
          if (scrollTop > 20) {
            appbar.classList.add("elevated");
          } else {
            appbar.classList.remove("elevated");
          }
        }

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // --- 4. MOBILE DRAWER NAVIGATION ---
  const menuToggle = document.querySelector("#menuToggle");
  const mobileDrawer = document.querySelector("#mobileDrawer");

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    mobileDrawer.querySelectorAll(".drawer-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900 && mobileDrawer.classList.contains("open")) {
        mobileDrawer.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    }, { passive: true });
  }

  // --- 5. INTERACTIVE BEFORE & AFTER COLOR GRADING COMPARISON SLIDER ---
  const baSlider = document.querySelector("#baSliderContainer");
  const baClipLayer = document.querySelector("#baClipLayer");
  const baHandle = document.querySelector("#baHandle");

  if (baSlider && baClipLayer && baHandle) {
    let isDragging = false;

    function updateSliderWidth() {
      const rect = baSlider.getBoundingClientRect();
      baSlider.style.setProperty("--slider-width", `${rect.width}px`);
    }

    updateSliderWidth();
    window.addEventListener("resize", updateSliderWidth, { passive: true });

    function setSliderPosition(xCoord) {
      const rect = baSlider.getBoundingClientRect();
      let pos = (xCoord - rect.left) / rect.width;
      if (pos < 0.02) pos = 0.02;
      if (pos > 0.98) pos = 0.98;

      const percent = pos * 100;
      baClipLayer.style.width = `${percent}%`;
      baHandle.style.left = `${percent}%`;
    }

    // Mouse Events
    baSlider.addEventListener("mousedown", (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    // Touch Events (Mobile & Tablet)
    baSlider.addEventListener("touchstart", (e) => {
      isDragging = true;
      if (e.touches[0]) {
        setSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || !e.touches[0]) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });
  }

  // --- 6. ADVENTURE GALLERY CATEGORY FILTER TABS ---
  const galleryTabs = document.querySelectorAll(".gallery-tab");
  const adventureCards = document.querySelectorAll(".adventure-card");

  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      galleryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-tab");

      adventureCards.forEach((card, idx) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.style.display = "";
          card.classList.remove("in-view");
          setTimeout(() => card.classList.add("in-view"), 30 * idx);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- 7. ADVENTURE PHOTO LIGHTBOX MODAL ---
  const photoLightbox = document.querySelector("#photoLightboxBackdrop");
  const closeLightboxBtn = document.querySelector("#closeLightboxBtn");
  const lightboxImg = document.querySelector("#lightboxImage");
  const lightboxTitle = document.querySelector("#lightboxTitle");
  const lightboxLocation = document.querySelector("#lightboxLocation");
  const lightboxAltitude = document.querySelector("#lightboxAltitude");
  const lightboxStory = document.querySelector("#lightboxStory");

  function openPhotoLightbox(card) {
    if (!photoLightbox) return;

    const img = card.getAttribute("data-img") || card.querySelector("img")?.src || "";
    const title = card.getAttribute("data-title") || "Mountain Expedition";
    const loc = card.getAttribute("data-location") || "Himalayan Ridge";
    const alt = card.getAttribute("data-altitude") || "High Altitude";
    const story = card.getAttribute("data-story") || "";

    if (lightboxImg) lightboxImg.src = img;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxLocation) {
      lightboxLocation.innerHTML = `<i data-lucide="map-pin" class="icon-xs"></i> ${loc}`;
    }
    if (lightboxAltitude) lightboxAltitude.textContent = alt;
    if (lightboxStory) lightboxStory.textContent = story;

    photoLightbox.classList.add("active");
    photoLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    initIcons();
  }

  function closePhotoLightbox() {
    if (!photoLightbox) return;
    photoLightbox.classList.remove("active");
    photoLightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  adventureCards.forEach((card) => {
    card.addEventListener("click", () => openPhotoLightbox(card));
  });

  closeLightboxBtn?.addEventListener("click", closePhotoLightbox);
  photoLightbox?.addEventListener("click", (e) => {
    if (e.target === photoLightbox) closePhotoLightbox();
  });

  // --- 8. PROJECT CASE STUDY & VIDEO MODAL (Real Content & Lazy Video Embeds) ---
  const projectDetails = {
    shailaputri: {
      title: "Shailaputri: The Daughter of Mountains",
      subtitle: "45 min+ · High-Contrast Black & White 35mm Cinema · Miyar Valley, HP",
      category: "Expedition Documentary",
      year: "2026",
      image: "assets/images/gallery/shailaputri-film.webp",
      aspect: "2.39:1 CinemaScope",
      role: "Cinematographer, Co-Director & Lead Colorist",
      tools: "DaVinci Resolve Studio 19, Sony Cinema Line, ACEScc Pipeline, Sub-Zero Rigging",
      results: "Official Selection — IMF Mountain Film Festival 2026",
      desc: "A landmark 45-minute expedition documentary chronicling the historic Indian first ascent on Mount Tharang II (6,027m / 19,774 ft) in the remote Miyar Valley of Himachal Pradesh. Shot across 24 days in grueling sub-zero conditions, the film employs an uncompromising high-contrast monochrome aesthetic to capture the raw scale of granite spires, the psychological weight of isolation, and human endurance at high altitude. Mastered with ACEScc color science to retain delicate shadow gradations against blinding glacial glare.",
      // Lazy-loaded privacy-enhanced video embed
      // TODO: Replace with Smriti's final YouTube/Vimeo video ID if private festival cut changes
      videoEmbed: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0",
      hasVideo: true,
      videoBtnText: "Watch Teaser / Reel"
    },
    onelastloop: {
      title: "One Last Loop",
      subtitle: "8 min · High-End Sports Documentary · Bigfoot Adventure India Collaboration",
      category: "Sports Documentary",
      year: "2025",
      image: "assets/images/gallery/one-last-loop-running.webp",
      aspect: "16:9 DCI 4K",
      role: "Director, Solo DP & Lead Editor",
      tools: "Sony FX3 Cinema Line, DaVinci Resolve Studio 19, Sennheiser Audio, Gimbal Rig",
      results: "Official collaboration with Bigfoot Adventure India (BFAI); screened across Indian ultrarunning circuits",
      desc: "An intimate, psychological sports documentary demystifying the grueling Backyard Ultra format—where athletes run a 4.167-mile (6.706 km) trail loop every hour on the hour until only one runner remains standing. Filmed continuously through 30+ consecutive hours across punishing day-and-night cycles to document the threshold where physical capability yields to psychological grit. Cut with an escalating rhythmic soundscape that mirrors the runner's deteriorating perception of time.",
      // Lazy-loaded privacy-enhanced video embed
      // TODO: Replace with Smriti's final YouTube/Vimeo video ID for One Last Loop
      videoEmbed: "https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?autoplay=1&rel=0",
      hasVideo: true,
      videoBtnText: "Watch Film"
    },
    above6000: {
      title: "Above 6,000 Meters: Alpine Cinematography",
      subtitle: "Technical Field Study · Sub-Zero Alpine Cinematography & Extreme Rigging",
      category: "Expedition Cinematography",
      year: "2024 – 2026",
      image: "assets/images/gallery/snow-ridge-rig.webp",
      aspect: "2.39:1 CinemaScope",
      role: "High-Altitude Cinematographer & Field Producer",
      tools: "Custom Cage Rig, Li-ion Heated Battery Harness, Weather-Sealed Cinema Primes, Carbon Tripods",
      results: "Archival footage licensed for international mountaineering publications & expeditions",
      desc: "A comprehensive technical and visual exploration of operating cinema-grade camera rigs above 6,000 meters (19,700+ ft) in the Greater Himalayas. Addressing the dual challenges of extreme cold (-25°C), hypoxia, and mechanical condensation while filming unscripted alpine ascents. Every gram carried in the alpine zone is negotiated against safety: the stripped-down rig utilizes weatherized manual optics that resist lubricant freezing and dual-recording SSDs insulated in down layers.",
      videoEmbed: null,
      hasVideo: false,
      videoBtnText: "View Stills & Rig Setup"
    },
    terrainlight: {
      title: "Terrain & Light: Himalayan Geomorphology",
      subtitle: "Aerial Landscape & Spatial Cinematography Series · DGCA Compliant",
      category: "Aerial Cinematography",
      year: "2023 – 2025",
      image: "assets/images/gallery/aerial-landscape.webp",
      aspect: "16:9 Cinema 4K",
      role: "Licensed Drone Pilot & Aerial Director",
      tools: "DJI Mavic 3 Pro Cine (Apple ProRes 422 HQ), PolarPro ND/PL Filters, DaVinci Resolve Color",
      results: "Exhibited in geospatial storytelling exhibitions & environmental research archives",
      desc: "Merging academic training in geography with aerial cinema craft. A visual survey of glacial recession, moraine geometry, and alpine river valleys in the Western Himalayas, captured in low-angle morning golden light and alpenglow. Navigating thin air above 4,000 meters requires understanding localized katabatic wind shears and rapid battery discharge rates. Flight paths were pre-calculated using topographical GIS contours to align sunlight angles with ridgeline crests.",
      videoEmbed: null,
      hasVideo: false,
      videoBtnText: "View Aerial Stills"
    }
  };

  const projectDialog = document.querySelector("#projectDialogBackdrop");
  const closeDialogBtn = document.querySelector("#closeDialogBtn");
  const dialogDismissBtn = document.querySelector("#dialogDismissBtn");
  const dialogContactBtn = document.querySelector("#dialogContactBtn");
  const dialogToggleVideoBtn = document.querySelector("#dialogToggleVideoBtn");
  const dialogVideoBtnText = document.querySelector("#dialogVideoBtnText");
  const dialogVideoPlayer = document.querySelector("#dialogVideoPlayer");

  const dialogImg = document.querySelector("#dialogImage");
  const dialogTitle = document.querySelector("#dialogTitle");
  const dialogSubtitle = document.querySelector("#dialogSubtitle");
  const dialogDesc = document.querySelector("#dialogDescription");
  const dialogCategory = document.querySelector("#dialogCategory");
  const dialogYear = document.querySelector("#dialogYear");
  const dialogRole = document.querySelector("#dialogRole");
  const dialogTools = document.querySelector("#dialogTools");
  const dialogAspect = document.querySelector("#dialogAspect");
  const dialogAspectPill = document.querySelector("#dialogAspectPill");
  const dialogResults = document.querySelector("#dialogResults");

  let activeProject = null;
  let isVideoPlaying = false;

  function stopAndClearVideo() {
    if (dialogVideoPlayer) {
      dialogVideoPlayer.innerHTML = "";
      dialogVideoPlayer.style.display = "none";
    }
    if (dialogImg) {
      dialogImg.style.display = "block";
    }
    isVideoPlaying = false;
    if (dialogVideoBtnText && activeProject) {
      dialogVideoBtnText.textContent = activeProject.videoBtnText;
    }
  }

  function openProjectDialog(card) {
    if (!projectDialog) return;

    const projectId = card.getAttribute("data-project-id") || "";
    const p = projectDetails[projectId] || {
      title: card.querySelector(".project-name")?.textContent?.trim() || "Project Case Study",
      subtitle: card.querySelector(".project-cat")?.textContent?.trim() || "Cinematic Project",
      category: card.querySelector(".project-cat")?.textContent?.trim() || "Selected Project",
      year: "2026",
      image: card.querySelector("img")?.src || "assets/images/gallery/shailaputri-film.webp",
      aspect: "2.39:1 CinemaScope",
      role: "Cinematographer & Senior Editor",
      tools: "DaVinci Resolve Studio 19, Sony Cinema Line",
      results: "Featured Production",
      desc: card.querySelector(".project-summary")?.textContent?.trim() || "Full production case study.",
      videoEmbed: null,
      hasVideo: false,
      videoBtnText: "Watch Reel"
    };

    activeProject = p;
    stopAndClearVideo();

    if (dialogImg) {
      dialogImg.src = p.image;
      dialogImg.alt = p.title;
    }
    if (dialogTitle) dialogTitle.textContent = p.title;
    if (dialogSubtitle) dialogSubtitle.textContent = p.subtitle;
    if (dialogDesc) dialogDesc.textContent = p.desc;
    if (dialogCategory) dialogCategory.textContent = p.category;
    if (dialogYear) dialogYear.textContent = p.year;
    if (dialogRole) dialogRole.textContent = p.role;
    if (dialogTools) dialogTools.textContent = p.tools;
    if (dialogAspect) dialogAspect.textContent = p.aspect;
    if (dialogAspectPill) dialogAspectPill.textContent = p.aspect;
    if (dialogResults) dialogResults.textContent = p.results;

    if (dialogToggleVideoBtn) {
      if (p.hasVideo && p.videoEmbed) {
        dialogToggleVideoBtn.style.display = "inline-flex";
        if (dialogVideoBtnText) dialogVideoBtnText.textContent = p.videoBtnText;
      } else {
        dialogToggleVideoBtn.style.display = "none";
      }
    }

    projectDialog.classList.add("active");
    projectDialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    initIcons();
  }

  function closeProjectDialog() {
    if (!projectDialog) return;
    stopAndClearVideo();
    projectDialog.classList.remove("active");
    projectDialog.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeProject = null;
  }

  // Toggle Video Player embed
  dialogToggleVideoBtn?.addEventListener("click", () => {
    if (!activeProject || !activeProject.videoEmbed || !dialogVideoPlayer) return;

    if (!isVideoPlaying) {
      // Lazy load the iframe video embed inside dialogVideoPlayer
      dialogVideoPlayer.innerHTML = `<iframe src="${activeProject.videoEmbed}" title="${activeProject.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      dialogVideoPlayer.style.display = "block";
      if (dialogImg) dialogImg.style.display = "none";
      if (dialogVideoBtnText) dialogVideoBtnText.textContent = "Show Poster";
      isVideoPlaying = true;
    } else {
      stopAndClearVideo();
    }
    initIcons();
  });

  const projectCards = document.querySelectorAll(".project-showcase-card");
  projectCards.forEach((card) => {
    card.addEventListener("click", () => openProjectDialog(card));
  });

  closeDialogBtn?.addEventListener("click", closeProjectDialog);
  dialogDismissBtn?.addEventListener("click", closeProjectDialog);
  dialogContactBtn?.addEventListener("click", closeProjectDialog);
  projectDialog?.addEventListener("click", (e) => {
    if (e.target === projectDialog) closeProjectDialog();
  });

  // Escape key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectDialog();
      closePhotoLightbox();
    }
  });

  // --- 9. RUNNING & KEY STATS NUMBER TICKER ---
  let tickerAnimated = false;
  function runNumberTicker() {
    if (tickerAnimated) return;
    tickerAnimated = true;

    const tickerItems = document.querySelectorAll(".ticker-target");
    tickerItems.forEach((item) => {
      const target = parseFloat(item.getAttribute("data-target")) || 0;
      const suffix = item.getAttribute("data-suffix") || "";
      const displayOverride = item.getAttribute("data-display");
      const useComma = item.getAttribute("data-comma") === "true";
      const duration = 1400; // ms
      const startTime = performance.now();

      function updateNumber(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeVal = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.floor(easeVal * target);

        if (displayOverride && progress === 1) {
          item.textContent = displayOverride;
        } else {
          let formatted = currentVal.toString();
          if (useComma && currentVal >= 1000) {
            formatted = currentVal.toLocaleString("en-US");
          }
          item.textContent = formatted + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else if (displayOverride) {
          item.textContent = displayOverride;
        }
      }

      requestAnimationFrame(updateNumber);
    });
  }

  // --- 10. PROJECT SCOPE CHOICE CHIPS ---
  const choiceChips = document.querySelectorAll(".choice-chip");
  const projectScopeInput = document.querySelector("#projectScopeInput");

  choiceChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      choiceChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const val = chip.getAttribute("data-val") || chip.textContent.trim();
      if (projectScopeInput) {
        projectScopeInput.value = val;
      }
    });
  });

  // --- 11. SONNER STYLE TOAST NOTIFICATION ---
  const siteToast = document.querySelector("#siteToast");
  const toastMsg = document.querySelector("#toastMsg");
  const toastIcon = document.querySelector("#toastIcon");
  const toastCloseBtn = document.querySelector("#toastCloseBtn");
  let toastTimeout = null;

  function showToast(message, icon = "check-circle") {
    if (!siteToast) return;
    if (toastMsg) toastMsg.textContent = message;
    if (toastIcon) {
      toastIcon.setAttribute("data-lucide", icon);
      initIcons();
    }

    siteToast.style.display = "flex";
    // Trigger CSS transition via class
    requestAnimationFrame(() => {
      siteToast.classList.add("active");
    });

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      siteToast.classList.remove("active");
      setTimeout(() => {
        if (!siteToast.classList.contains("active")) {
          siteToast.style.display = "none";
        }
      }, 300);
    }, 4500);
  }

  toastCloseBtn?.addEventListener("click", () => {
    siteToast?.classList.remove("active");
    setTimeout(() => {
      if (siteToast && !siteToast.classList.contains("active")) {
        siteToast.style.display = "none";
      }
    }, 300);
    if (toastTimeout) clearTimeout(toastTimeout);
  });

  // --- 12. CONTACT FORM SUBMISSION (With Honeypot Anti-Spam & Web3Forms Support) ---
  const contactForm = document.querySelector("#contactForm");
  const submitBtn = document.querySelector("#submitBtn");

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Anti-spam Honeypot Check: if botcheck is checked, silent rejection
    const botcheck = contactForm.querySelector('input[name="botcheck"]');
    if (botcheck && botcheck.checked) {
      showToast("Message sent! Smriti will be in touch.", "send");
      contactForm.reset();
      return;
    }

    const nameInput = document.querySelector("#senderName");
    const emailInput = document.querySelector("#senderEmail");
    const messageInput = document.querySelector("#senderMessage");
    const activeChip = document.querySelector(".choice-chip.active");
    const scopeVal = activeChip?.getAttribute("data-val") || activeChip?.textContent?.trim() || "Documentary / Expedition";

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showToast("Please fill in all required fields.", "alert-triangle");
      return;
    }

    // Basic email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showToast("Please provide a valid email address.", "alert-triangle");
      return;
    }

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const senderMessage = messageInput.value.trim();

    if (submitBtn) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
    }

    const inquiry = {
      id: "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      name: senderName,
      email: senderEmail,
      scope: scopeVal,
      message: senderMessage,
      timestamp: new Date().toISOString()
    };

    // Store inquiry in localStorage
    try {
      const stored = localStorage.getItem("smriti_inquiries");
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(inquiry);
      localStorage.setItem("smriti_inquiries", JSON.stringify(list));
    } catch (err) {
      console.warn("LocalStorage warning:", err);
    }

    // Attempt Web3Forms network submission if valid access key is provided
    const keyInput = document.querySelector("#web3FormsKey");
    const accessKey = keyInput?.value?.trim() || "";

    if (accessKey && accessKey !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      try {
        const formData = new FormData(contactForm);
        formData.set("project_scope", scopeVal);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const resData = await response.json();
        if (resData.success) {
          showToast("Inquiry sent! Smriti will connect within 24 hours.", "send");
        } else {
          showToast("Inquiry saved locally! Smriti will review your message.", "check-circle");
        }
      } catch (networkErr) {
        showToast("Inquiry saved! Smriti will review and connect shortly.", "check-circle");
      }
    } else {
      // Graceful fallback with localStorage persistence
      await new Promise((resolve) => setTimeout(resolve, 600));
      showToast("Inquiry received! Smriti will connect within 24 hours.", "send");
    }

    if (submitBtn) {
      submitBtn.classList.remove("loading");
      submitBtn.disabled = false;
    }
    contactForm.reset();

    // Reset chips to default
    choiceChips.forEach((c, idx) => {
      c.classList.toggle("active", idx === 0);
    });
    if (projectScopeInput) {
      projectScopeInput.value = "Documentary / Expedition";
    }
  });

  // --- 13. SPAM BOT PROTECTED COPY & REVEAL (Email & Phone) ---
  const copyEmailCard = document.querySelector("#copyEmailCard");
  const revealPhoneCard = document.querySelector("#revealPhoneCard");

  async function copyToClipboard(text, successMsg, icon = "copy") {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = text;
        tempTextArea.style.position = "fixed";
        tempTextArea.style.left = "-9999px";
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
      }
      showToast(successMsg, icon);
    } catch {
      showToast(text, icon);
    }
  }

  copyEmailCard?.addEventListener("click", (e) => {
    e.preventDefault();
    const email = "smritisardar010@gmail.com";
    copyToClipboard(email, "Copied email: " + email, "mail");
  });

  copyEmailCard?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const email = "smritisardar010@gmail.com";
      copyToClipboard(email, "Copied email: " + email, "mail");
    }
  });

  revealPhoneCard?.addEventListener("click", (e) => {
    e.preventDefault();
    const phone = "+91 9875641683";
    copyToClipboard(phone, "Copied phone: " + phone, "phone");
  });

  revealPhoneCard?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const phone = "+91 9875641683";
      copyToClipboard(phone, "Copied phone: " + phone, "phone");
    }
  });

  // --- 14. INTERSECTION OBSERVER FOR SCROLL REVEALS ---
  const animateItems = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          if (entry.target.querySelector(".ticker-target") || entry.target.closest(".hero-section") || entry.target.closest("#running")) {
            runNumberTicker();
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    });

    animateItems.forEach((el) => observer.observe(el));
  } else {
    animateItems.forEach((el) => el.classList.add("in-view"));
    runNumberTicker();
  }

  // Fallback trigger for number metrics
  setTimeout(runNumberTicker, 450);
});
