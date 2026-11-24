/**
 * SMRITI SARDAR PORTFOLIO — INTERACTIVE ENGINE
 * Theme: Cinematic Dark · Beyond Limits. Beyond Ordinary.
 * Features:
 *  - Lucide Icons Initializer
 *  - Scroll Progress Bar & Header Elevation
 *  - Mobile Drawer Navigation
 *  - Interactive Before & After Color Grading Split Slider (Mouse & Touch)
 *  - Adventure Gallery Category Tabs Filtering
 *  - Project Case Study Modal (Lightbox)
 *  - Adventure Photo Lightbox System
 *  - Dynamic Tabular Number Counter on Scroll
 *  - Contact Form with Validation & LocalStorage Persistence
 *  - One-Click Clipboard Copy with Sonner Toast
 *  - Smooth Section Observer & Scroll Animations
 *  - Dynamic Commit Hash Tracker
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

  // --- 8. PROJECT CASE STUDY MODAL ---
  const projectDialog = document.querySelector("#projectDialogBackdrop");
  const closeDialogBtn = document.querySelector("#closeDialogBtn");
  const dialogDismissBtn = document.querySelector("#dialogDismissBtn");
  const dialogContactBtn = document.querySelector("#dialogContactBtn");

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

  const projectCards = document.querySelectorAll(".project-showcase-card");

  function openProjectDialog(card) {
    if (!projectDialog) return;

    const title = card.getAttribute("data-title") || "Project Case Study";
    const subtitle = card.getAttribute("data-subtitle") || "";
    const img = card.getAttribute("data-img") || card.querySelector("img")?.src || "";
    const desc = card.getAttribute("data-desc") || "";
    const role = card.getAttribute("data-role") || "Cinematographer, Editor";
    const tools = card.getAttribute("data-tools") || "DaVinci Resolve Studio 19, Sony Cinema Line";
    const aspect = card.getAttribute("data-aspect") || "2.39:1 CinemaScope";
    const year = card.getAttribute("data-year") || "2026";
    const cat = card.getAttribute("data-category") || "Selected Film";

    if (dialogImg) dialogImg.src = img;
    if (dialogTitle) dialogTitle.textContent = title;
    if (dialogSubtitle) dialogSubtitle.textContent = subtitle;
    if (dialogDesc) dialogDesc.textContent = desc;
    if (dialogCategory) dialogCategory.textContent = cat;
    if (dialogYear) dialogYear.textContent = year;
    if (dialogRole) dialogRole.textContent = role;
    if (dialogTools) dialogTools.textContent = tools;
    if (dialogAspect) dialogAspect.textContent = aspect;
    if (dialogAspectPill) dialogAspectPill.textContent = aspect;

    projectDialog.classList.add("active");
    projectDialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    initIcons();
  }

  function closeProjectDialog() {
    if (!projectDialog) return;
    projectDialog.classList.remove("active");
    projectDialog.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", () => openProjectDialog(card));
  });

  closeDialogBtn?.addEventListener("click", closeProjectDialog);
  dialogDismissBtn?.addEventListener("click", closeProjectDialog);
  dialogContactBtn?.addEventListener("click", closeProjectDialog);
  projectDialog?.addEventListener("click", (e) => {
    if (e.target === projectDialog) closeProjectDialog();
  });

  // Escape key closes open modals
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
  choiceChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      choiceChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
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

    siteToast.classList.add("active");

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      siteToast.classList.remove("active");
    }, 4200);
  }

  toastCloseBtn?.addEventListener("click", () => {
    siteToast?.classList.remove("active");
    if (toastTimeout) clearTimeout(toastTimeout);
  });

  // --- 12. CONTACT FORM SUBMISSION ---
  const contactForm = document.querySelector("#contactForm");
  const submitBtn = document.querySelector("#submitBtn");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#senderName");
    const emailInput = document.querySelector("#senderEmail");
    const messageInput = document.querySelector("#senderMessage");
    const activeChip = document.querySelector(".choice-chip.active");
    const scopeVal = activeChip?.getAttribute("data-val") || activeChip?.textContent?.trim() || "Documentary / Expedition";

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showToast("Please fill in all required fields.", "alert-triangle");
      return;
    }

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const senderMessage = messageInput.value.trim();

    if (submitBtn) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      const inquiry = {
        id: "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        name: senderName,
        email: senderEmail,
        scope: scopeVal,
        message: senderMessage,
        timestamp: new Date().toISOString()
      };

      try {
        const stored = localStorage.getItem("smriti_inquiries");
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(inquiry);
        localStorage.setItem("smriti_inquiries", JSON.stringify(list));
      } catch (err) {
        console.warn("LocalStorage warning:", err);
      }

      if (submitBtn) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
      contactForm.reset();
      showToast("Inquiry sent! Smriti will connect within 24 hours.", "send");
    }, 650);
  });

  // --- 13. ONE-CLICK EMAIL CLIPBOARD COPY ---
  const copyEmailCard = document.querySelector("#copyEmailCard");
  copyEmailCard?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = "smritisardar010@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied: " + email, "copy");
    } catch {
      showToast("Email: " + email, "mail");
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

  // Fallback trigger for metrics
  setTimeout(runNumberTicker, 450);

  // --- 15. LIVE GITHUB COMMIT TRACKER ---
  const gitCommitHash = document.querySelector("#gitCommitHash");
  const gitCommitBadge = document.querySelector("#gitCommitBadge");

  fetch("https://api.github.com/repos/Sammy-l33t/smriti-sardar-portfolio/commits/main")
    .then((res) => {
      if (!res.ok) throw new Error("GitHub API request failed");
      return res.json();
    })
    .then((data) => {
      if (data && data.sha) {
        const shortSha = data.sha.substring(0, 7);
        if (gitCommitHash) gitCommitHash.textContent = shortSha;
        if (gitCommitBadge) {
          gitCommitBadge.href = `https://github.com/Sammy-l33t/smriti-sardar-portfolio/commit/${data.sha}`;
          const msg = data.commit?.message?.split("\n")[0] || "Latest commit";
          gitCommitBadge.setAttribute("title", `Commit ${shortSha}: ${msg}`);
        }
      }
    })
    .catch(() => {});
});
