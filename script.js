/**
 * SMRITI SARDAR PORTFOLIO — INTERACTIVE ENGINE
 * Features: Material Design Ripple Effect, Multi-Screen Navigation Drawer,
 * Category Filter System, Dynamic Project Lightbox Dialog, Showreel Player Modal,
 * Floating Label Form with Feedback Toast, and Elevation Scroll Watcher.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. DYNAMIC CURRENT YEAR
  const yearEl = document.querySelector("#currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. MATERIAL RIPPLE EFFECT ON EVERY USER ACTION
  document.addEventListener("click", (e) => {
    const rippleTarget = e.target.closest(".mui-ripple");
    if (!rippleTarget) return;

    const rect = rippleTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const wave = document.createElement("span");
    wave.classList.add("ripple-wave");
    wave.style.width = size + "px";
    wave.style.height = size + "px";
    wave.style.left = x + "px";
    wave.style.top = y + "px";

    rippleTarget.appendChild(wave);

    setTimeout(() => {
      wave.remove();
    }, 650);
  });

  // 3. SCROLL PROGRESS & APPBAR ELEVATION
  const appbar = document.querySelector("#appbar");
  const scrollProgressBar = document.querySelector("#scroll-progress");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrollPercent + "%";
    }

    if (appbar) {
      if (scrollTop > 25) {
        appbar.classList.add("elevated");
      } else {
        appbar.classList.remove("elevated");
      }
    }
  }, { passive: true });

  // 4. MOBILE DRAWER NAVIGATION
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
  }

  // 5. HERO INTERACTIVE PHOTO SWITCHER
  const heroMainImg = document.querySelector("#heroMainImage");
  const heroPhotoCaption = document.querySelector("#heroPhotoCaption");
  const switchBtns = document.querySelectorAll(".switch-btn");

  switchBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      switchBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const newSrc = btn.getAttribute("data-img");
      const newCaption = btn.getAttribute("data-caption");

      if (heroMainImg && newSrc) {
        heroMainImg.classList.add("image-fading");
        setTimeout(() => {
          heroMainImg.src = newSrc;
          heroMainImg.classList.remove("image-fading");
        }, 220);
      }

      if (heroPhotoCaption && newCaption) {
        heroPhotoCaption.textContent = newCaption;
      }
    });
  });

  // 6. WORK CATEGORY FILTER
  const filterChips = document.querySelectorAll(".filter-chip");
  const projectCards = document.querySelectorAll(".project-card");

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const selectedCategory = chip.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (selectedCategory === "all" || cardCat === selectedCategory) {
          card.style.display = "";
          card.classList.remove("in-view");
          setTimeout(() => card.classList.add("in-view"), 30);
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 7. PROJECT DETAILS MODAL / DIALOG
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

  function openProjectDialog(card) {
    if (!projectDialog) return;

    const title = card.getAttribute("data-title") || "Project Case Study";
    const subtitle = card.getAttribute("data-subtitle") || "";
    const img = card.getAttribute("data-img") || "";
    const desc = card.getAttribute("data-desc") || "";
    const role = card.getAttribute("data-role") || "Cinematographer, Editor";
    const tools = card.getAttribute("data-tools") || "DaVinci Resolve Studio 19, Sony Cinema Line";
    const aspect = card.getAttribute("data-aspect") || "2.39:1 Cinema Scope";
    const year = card.getAttribute("data-year") || "2026";
    const cat = card.querySelector(".category-name")?.textContent || "SELECTED FILMOGRAPHY";

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
  }

  function closeProjectDialog() {
    if (!projectDialog) return;
    projectDialog.classList.remove("active");
    projectDialog.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  projectCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a") && !e.target.closest(".view-details-btn")) return;
      openProjectDialog(card);
    });
  });

  closeDialogBtn?.addEventListener("click", closeProjectDialog);
  dialogDismissBtn?.addEventListener("click", closeProjectDialog);
  dialogContactBtn?.addEventListener("click", closeProjectDialog);

  projectDialog?.addEventListener("click", (e) => {
    if (e.target === projectDialog) {
      closeProjectDialog();
    }
  });

  // 8. SHOWREEL MODAL / DIALOG
  const reelDialog = document.querySelector("#reelDialogBackdrop");
  const openReelBtn = document.querySelector("#openReelBtn");
  const fabReelTrigger = document.querySelector("#fabReelTrigger");
  const closeReelBtn = document.querySelector("#closeReelBtn");
  const reelContactTrigger = document.querySelector("#reelContactTrigger");
  const mockPlayVideoBtn = document.querySelector("#mockPlayVideoBtn");

  function openReelModal() {
    if (!reelDialog) return;
    reelDialog.classList.add("active");
    reelDialog.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeReelModal() {
    if (!reelDialog) return;
    reelDialog.classList.remove("active");
    reelDialog.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  openReelBtn?.addEventListener("click", openReelModal);
  fabReelTrigger?.addEventListener("click", openReelModal);
  closeReelBtn?.addEventListener("click", closeReelModal);
  reelContactTrigger?.addEventListener("click", closeReelModal);

  reelDialog?.addEventListener("click", (e) => {
    if (e.target === reelDialog) {
      closeReelModal();
    }
  });

  mockPlayVideoBtn?.addEventListener("click", () => {
    showSnackbar("Showreel preview loaded in 4K UHD. Full master available on request!", "movie");
  });

  // Escape key closes open modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProjectDialog();
      closeReelModal();
    }
  });

  // 9. PROJECT TYPE CHOICE CHIPS
  const choiceChips = document.querySelectorAll(".choice-chip");
  choiceChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      choiceChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });

  // 10. MATERIAL SNACKBAR (TOAST)
  const snackbar = document.querySelector("#muiSnackbar");
  const snackbarMsg = document.querySelector("#snackbarMsg");
  const snackbarIcon = document.querySelector("#snackbarIcon");
  const snackbarClose = document.querySelector("#snackbarClose");
  let snackbarTimeout = null;

  function showSnackbar(message, icon = "check_circle") {
    if (!snackbar) return;
    if (snackbarMsg) snackbarMsg.textContent = message;
    if (snackbarIcon) snackbarIcon.textContent = icon;

    snackbar.classList.add("active");

    if (snackbarTimeout) clearTimeout(snackbarTimeout);
    snackbarTimeout = setTimeout(() => {
      snackbar.classList.remove("active");
    }, 4200);
  }

  snackbarClose?.addEventListener("click", () => {
    snackbar?.classList.remove("active");
    if (snackbarTimeout) clearTimeout(snackbarTimeout);
  });

  // 11. CONTACT FORM SUBMISSION
  const contactForm = document.querySelector("#contactForm");
  const submitBtn = document.querySelector("#submitBtn");

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#senderName");
    const emailInput = document.querySelector("#senderEmail");
    const messageInput = document.querySelector("#senderMessage");

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showSnackbar("Please fill in all required fields.", "warning");
      return;
    }

    if (submitBtn) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
      contactForm.reset();
      showSnackbar("Message sent! Smriti will respond within 24 hours.", "send");
    }, 1100);
  });

  // 12. COPY EMAIL TO CLIPBOARD
  const copyEmailCard = document.querySelector("#copyEmailCard");
  copyEmailCard?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = "smritisardar010@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      showSnackbar("Email copied to clipboard: " + email, "content_copy");
    } catch {
      showSnackbar("Email: " + email, "mail");
    }
  });

  // 13. FLOATING ACTION BUTTON (FAB) MENU
  const fabWrapper = document.querySelector(".fab-wrapper");
  const fabBtn = document.querySelector("#fabBtn");

  fabBtn?.addEventListener("click", () => {
    fabWrapper?.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (fabWrapper && !fabWrapper.contains(e.target)) {
      fabWrapper.classList.remove("open");
    }
  });

  // 14. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  const animateItems = document.querySelectorAll(".animate-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    });

    animateItems.forEach((el) => observer.observe(el));
  } else {
    animateItems.forEach((el) => el.classList.add("in-view"));
  }
});
