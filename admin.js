/**
 * SMRITI SARDAR - ADMIN CONSOLE CONTROLLER
 * Contact Inquiries Management, Real-time Storage Sync, CSV Export, Auth
 */

(function () {
  "use strict";

  // --- 1. DEFAULT AUTHENTICATION CONFIG ---
  const ADMIN_CREDENTIALS = {
    email: "admin@smritisardar.com",
    password: "smriti2026"
  };

  const STORAGE_KEY_AUTH = "smriti_admin_authenticated";
  const STORAGE_KEY_REMEMBER = "smriti_admin_remember";
  const STORAGE_KEY_INQUIRIES = "smriti_contact_inquiries";

  // --- 2. SAMPLE DEMO DATA ---
  const SEED_INQUIRIES = [
    {
      id: "inq_1730245000000_alp",
      name: "Elena Rostova",
      email: "elena@alpineproductions.com",
      scope: "Documentary / Expedition",
      message: "Hi Smriti, We are producing a 4-part mountaineering documentary series exploring high-altitude winter ascents in Ladakh and Spiti. We reviewed your reel and your high-contrast cinematic framing is exactly what we need. We are looking for a Director of Photography / Camera Operator comfortable in sub-zero alpine conditions for a 3-week shoot starting early January 2027. Let's arrange a video call to discuss kit, timeline, and daily rates.",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
      status: "unread",
      notes: "High priority lead. Review alpine kit and cold-weather battery heaters before call."
    },
    {
      id: "inq_1730230000000_trw",
      name: "Kabir Malhotra",
      email: "kabir.m@terrawildwear.com",
      scope: "Commercial / Brand Film",
      message: "Hello Smriti, Terra Wildwear is launching our 2026 Monsoon Technical Shell apparel line. We need a commercial brand film (60s master + 3x 15s social cutdowns) shot across rugged rainforest terrain in Meghalaya. We need dynamic gimbal work and atmospheric natural lighting. Production dates are slotted for mid-November. Looking forward to connecting.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
      status: "unread",
      notes: ""
    },
    {
      id: "inq_1730100000000_nat",
      name: "Maya Chen",
      email: "m.chen@natgeo-asia.org",
      scope: "Drone Cinematography",
      message: "Dear Smriti, We're seeking an aerial cinematographer / drone operator licensed for high-altitude wildlife tracking in Hemis National Park. Looking for someone experienced in heavy-lift CineLifter rigs and extreme wind tolerance. Please let us know your availability for Q1 2027.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 1.5 days ago
      status: "replied",
      notes: "Replied via email on Oct 28. Shared DGCA commercial drone license and CineLifter reel."
    },
    {
      id: "inq_1730000000000_uns",
      name: "Arjun Singhania",
      email: "arjun@unscriptedfilmlab.in",
      scope: "Video Editing / Color",
      message: "Hi Smriti, Loved your pacing and tonal grading on 'Echoes of the Valley'. We have a 45-minute independent documentary about nomadic shepherd communities that needs final offline editing and a DaVinci Resolve color master. Can you review a rough cut assembly next week?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
      status: "replied",
      notes: "Rough cut assembly scheduled for review Friday 3 PM."
    }
  ];

  // --- 3. STATE ---
  let state = {
    inquiries: [],
    currentFilter: "all", // all | unread | replied | archived
    searchQuery: "",
    scopeFilter: "all",
    sortOrder: "newest", // newest | oldest
    activeInquiryId: null
  };

  // --- 4. DOM REFS ---
  const loginView = document.getElementById("loginView");
  const dashboardView = document.getElementById("dashboardView");
  const loginForm = document.getElementById("loginForm");
  const adminEmailInput = document.getElementById("adminEmail");
  const adminPasswordInput = document.getElementById("adminPassword");
  const rememberMeInput = document.getElementById("rememberMe");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const demoFillBtn = document.getElementById("demoFillBtn");
  const logoutBtn = document.getElementById("logoutBtn");

  // Telemetry DOM
  const clockUTC = document.getElementById("clockUTC");
  const clockIST = document.getElementById("clockIST");
  const statTotal = document.getElementById("statTotal");
  const statUnread = document.getElementById("statUnread");
  const statReplied = document.getElementById("statReplied");
  const statTopScope = document.getElementById("statTopScope");

  // Controls DOM
  const tabAll = document.getElementById("tabAll");
  const tabUnread = document.getElementById("tabUnread");
  const tabReplied = document.getElementById("tabReplied");
  const tabArchived = document.getElementById("tabArchived");
  const countAll = document.getElementById("countAll");
  const countUnread = document.getElementById("countUnread");
  const countReplied = document.getElementById("countReplied");
  const countArchived = document.getElementById("countArchived");

  const searchInput = document.getElementById("searchInput");
  const scopeFilter = document.getElementById("scopeFilter");
  const sortFilter = document.getElementById("sortFilter");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  const exportCsvBtn = document.getElementById("exportCsvBtn");
  const simulateLeadBtn = document.getElementById("simulateLeadBtn");

  // Inquiries Feed DOM
  const inquiriesFeed = document.getElementById("inquiriesFeed");
  const emptyState = document.getElementById("emptyState");

  // Detail Modal DOM
  const inquiryModal = document.getElementById("inquiryModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalName = document.getElementById("modalName");
  const modalEmail = document.getElementById("modalEmail");
  const modalScope = document.getElementById("modalScope");
  const modalTime = document.getElementById("modalTime");
  const modalStatusSelect = document.getElementById("modalStatusSelect");
  const modalMessage = document.getElementById("modalMessage");
  const modalNotes = document.getElementById("modalNotes");
  const modalReplyBtn = document.getElementById("modalReplyBtn");
  const modalCopyBtn = document.getElementById("modalCopyBtn");
  const modalDeleteBtn = document.getElementById("modalDeleteBtn");
  const modalSaveNotesBtn = document.getElementById("modalSaveNotesBtn");

  // Simulate Modal DOM
  const simulateModal = document.getElementById("simulateModal");
  const simulateCloseBtn = document.getElementById("simulateCloseBtn");
  const simulateForm = document.getElementById("simulateForm");
  const simName = document.getElementById("simName");
  const simEmail = document.getElementById("simEmail");
  const simScope = document.getElementById("simScope");
  const simMessage = document.getElementById("simMessage");
  const presetBtns = document.querySelectorAll(".preset-pill");

  // Toast DOM
  const toastPortal = document.getElementById("adminToast");
  const toastText = document.getElementById("toastText");
  let toastTimer = null;

  // --- 5. INITIALIZATION ---
  function init() {
    initLucide();
    initStorage();
    checkAuth();
    setupEventListeners();
    startClock();
  }

  function initLucide() {
    if (typeof lucide !== "undefined" && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  function showToast(message, isSuccess = true) {
    if (!toastPortal || !toastText) return;
    toastText.textContent = message;
    if (isSuccess) {
      toastPortal.classList.add("toast-success");
    } else {
      toastPortal.classList.remove("toast-success");
    }
    toastPortal.classList.add("active");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastPortal.classList.remove("active");
    }, 3800);
  }

  // --- 6. LOCAL STORAGE & DATA HANDLING ---
  function initStorage() {
    const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(SEED_INQUIRIES));
      state.inquiries = SEED_INQUIRIES.slice();
    } else {
      try {
        state.inquiries = JSON.parse(raw);
      } catch (err) {
        state.inquiries = SEED_INQUIRIES.slice();
        localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(SEED_INQUIRIES));
      }
    }
  }

  function saveInquiries() {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(state.inquiries));
    window.dispatchEvent(new Event("storage"));
  }

  // --- 7. AUTHENTICATION LOGIC ---
  function checkAuth() {
    const isSessionAuth = sessionStorage.getItem(STORAGE_KEY_AUTH) === "true";
    const isLocalAuth = localStorage.getItem(STORAGE_KEY_AUTH) === "true";

    if (isSessionAuth || isLocalAuth) {
      showDashboard();
    } else {
      showLogin();
    }
  }

  function showLogin() {
    loginView.classList.remove("hidden");
    dashboardView.classList.add("hidden");
    initLucide();
  }

  function showDashboard() {
    loginView.classList.add("hidden");
    dashboardView.classList.remove("hidden");
    renderInquiries();
    updateStats();
    initLucide();
  }

  function login(email, password, remember) {
    if (
      email.toLowerCase().trim() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      if (remember) {
        localStorage.setItem(STORAGE_KEY_AUTH, "true");
      } else {
        sessionStorage.setItem(STORAGE_KEY_AUTH, "true");
      }
      showDashboard();
      showToast("Access Granted: Welcome back, Smriti.", true);
      return true;
    } else {
      showToast("Invalid credentials. Try the demo quick-login.", false);
      return false;
    }
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    showLogin();
    showToast("Terminal session closed.", true);
  }

  // --- 8. TIME & CLOCK UTILITY ---
  function startClock() {
    function update() {
      const now = new Date();
      if (clockUTC) {
        clockUTC.textContent = now.toUTCString().slice(17, 25) + " UTC";
      }
      if (clockIST) {
        // India Standard Time (UTC+5:30)
        const istString = now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false
        });
        clockIST.textContent = istString + " IST";
      }
    }
    update();
    setInterval(update, 1000);
  }

  function formatRelativeTime(isoString) {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffSecs = Math.floor((now - date) / 1000);

      if (diffSecs < 60) return "Just now";
      const diffMins = Math.floor(diffSecs / 60);
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined
      });
    } catch {
      return "Recent";
    }
  }

  function formatExactTime(isoString) {
    try {
      const date = new Date(isoString);
      return date.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
    } catch {
      return isoString;
    }
  }

  function getInitials(name) {
    if (!name) return "SS";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  // --- 9. STATS & TELEMETRY ---
  function updateStats() {
    const total = state.inquiries.length;
    const unread = state.inquiries.filter((i) => i.status === "unread").length;
    const replied = state.inquiries.filter((i) => i.status === "replied").length;
    const archived = state.inquiries.filter((i) => i.status === "archived").length;

    if (statTotal) statTotal.textContent = total;
    if (statUnread) statUnread.textContent = unread;
    if (statReplied) statReplied.textContent = replied;

    if (countAll) countAll.textContent = total;
    if (countUnread) countUnread.textContent = unread;
    if (countReplied) countReplied.textContent = replied;
    if (countArchived) countArchived.textContent = archived;

    // Determine Top Requested Scope
    const scopeCounts = {};
    state.inquiries.forEach((item) => {
      const sc = item.scope || "General";
      scopeCounts[sc] = (scopeCounts[sc] || 0) + 1;
    });

    let topScope = "Documentary";
    let maxCount = 0;
    for (const [scope, count] of Object.entries(scopeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        topScope = scope.split("/")[0].trim();
      }
    }
    if (statTopScope) statTopScope.textContent = topScope;
  }

  // --- 10. FILTERING & RENDERING ---
  function getFilteredInquiries() {
    let filtered = state.inquiries.slice();

    // Status filter
    if (state.currentFilter !== "all") {
      filtered = filtered.filter((i) => i.status === state.currentFilter);
    }

    // Scope filter
    if (state.scopeFilter !== "all") {
      filtered = filtered.filter((i) => i.scope === state.scopeFilter);
    }

    // Search query
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter((i) => {
        return (
          (i.name && i.name.toLowerCase().includes(q)) ||
          (i.email && i.email.toLowerCase().includes(q)) ||
          (i.scope && i.scope.toLowerCase().includes(q)) ||
          (i.message && i.message.toLowerCase().includes(q)) ||
          (i.notes && i.notes.toLowerCase().includes(q))
        );
      });
    }

    // Sort
    filtered.sort((a, b) => {
      const timeA = new Date(a.timestamp || 0).getTime();
      const timeB = new Date(b.timestamp || 0).getTime();
      return state.sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

    return filtered;
  }

  function renderInquiries() {
    const list = getFilteredInquiries();

    if (list.length === 0) {
      inquiriesFeed.innerHTML = "";
      emptyState.classList.remove("hidden");
      return;
    }

    emptyState.classList.add("hidden");

    const html = list
      .map((item) => {
        const initials = getInitials(item.name);
        const relTime = formatRelativeTime(item.timestamp);
        const isUnread = item.status === "unread";
        const isReplied = item.status === "replied";
        const isArchived = item.status === "archived";

        let statusClass = "unread";
        let statusLabel = "NEW DISPATCH";
        if (isReplied) {
          statusClass = "replied";
          statusLabel = "REPLIED";
        } else if (isArchived) {
          statusClass = "archived";
          statusLabel = "ARCHIVED";
        }

        const safeName = escapeHtml(item.name || "Anonymous");
        const safeEmail = escapeHtml(item.email || "");
        const safeScope = escapeHtml(item.scope || "General");
        const safeMsg = escapeHtml(item.message || "");
        const hasNotes = item.notes && item.notes.trim().length > 0;

        return `
          <div class="inquiry-card ${statusClass}" data-id="${item.id}">
            <div class="inquiry-top">
              <div class="inquiry-sender">
                <div class="inquiry-avatar">${initials}</div>
                <div class="inquiry-meta">
                  <div class="inquiry-name-row">
                    <span class="inquiry-name">${safeName}</span>
                    ${isUnread ? '<span class="unread-dot" title="Unread Inquiry"></span>' : ""}
                  </div>
                  <a href="mailto:${safeEmail}" class="inquiry-email">${safeEmail}</a>
                </div>
              </div>

              <div class="inquiry-badges">
                <span class="badge-scope">
                  <i data-lucide="camera" class="icon-xs"></i>
                  ${safeScope}
                </span>
                <span class="badge-status ${statusClass}">${statusLabel}</span>
                <span class="inquiry-time">
                  <i data-lucide="clock" class="icon-xs"></i>
                  ${relTime}
                </span>
              </div>
            </div>

            <div class="inquiry-body-preview">${safeMsg}</div>

            ${
              hasNotes
                ? `<div class="inquiry-notes-pill">
                    <i data-lucide="pin" class="icon-xs"></i>
                    <span><strong>Note:</strong> ${escapeHtml(item.notes)}</span>
                  </div>`
                : ""
            }

            <div class="inquiry-bottom">
              <div class="inquiry-action-cluster">
                <button type="button" class="btn-inquiry-action primary action-view" data-id="${item.id}">
                  <i data-lucide="file-text" class="icon-xs"></i> View Full File
                </button>
                <a href="mailto:${safeEmail}?subject=${encodeURIComponent(
          "Re: Smriti Sardar Cinematography - " + safeScope
        )}&body=${encodeURIComponent(
          "Dear " +
            safeName.split(" ")[0] +
            ",\n\nThank you for reaching out regarding your project. I have reviewed your inquiry and would be delighted to discuss details.\n\nBest regards,\nSmriti Sardar\nDirector of Photography & Editor"
        )}" class="btn-inquiry-action success">
                  <i data-lucide="send" class="icon-xs"></i> Reply Email
                </a>
              </div>

              <div class="inquiry-action-cluster">
                <button type="button" class="btn-inquiry-action action-toggle-read" data-id="${item.id}" title="${
          isUnread ? "Mark as Replied" : "Mark as Unread"
        }">
                  <i data-lucide="${isUnread ? "check" : "mail"}" class="icon-xs"></i>
                  ${isUnread ? "Mark Replied" : "Mark Unread"}
                </button>
                <button type="button" class="btn-inquiry-action action-toggle-archive" data-id="${item.id}" title="${
          isArchived ? "Unarchive" : "Archive"
        }">
                  <i data-lucide="archive" class="icon-xs"></i>
                  ${isArchived ? "Restore" : "Archive"}
                </button>
                <button type="button" class="btn-inquiry-action danger action-delete" data-id="${item.id}" title="Delete inquiry">
                  <i data-lucide="trash-2" class="icon-xs"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    inquiriesFeed.innerHTML = html;
    initLucide();
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // --- 11. INQUIRY DETAIL MODAL ---
  function openInquiryModal(id) {
    const item = state.inquiries.find((i) => i.id === id);
    if (!item) return;

    state.activeInquiryId = id;

    // Automatically mark read if it was unread
    if (item.status === "unread") {
      item.status = "replied"; // or keep as read
      saveInquiries();
      updateStats();
    }

    modalName.textContent = item.name || "Anonymous";
    modalEmail.textContent = item.email || "No email";
    modalScope.textContent = item.scope || "General Inquiry";
    modalTime.textContent = formatExactTime(item.timestamp);
    modalStatusSelect.value = item.status;
    modalMessage.textContent = item.message || "No message body provided.";
    modalNotes.value = item.notes || "";

    // Set reply email link
    const replySubject = encodeURIComponent("Re: Smriti Sardar Cinematography - " + (item.scope || "Project"));
    const replyBody = encodeURIComponent(
      `Dear ${item.name ? item.name.split(" ")[0] : "Client"},\n\nThank you for getting in touch through my portfolio. I reviewed your project details regarding ${item.scope || "cinematography"}.\n\nI would be delighted to set up a brief discovery call or review creative briefs at your convenience.\n\nWarm regards,\nSmriti Sardar\nDirector of Photography & Editor\n+91 9875641683 | smritisardar010@gmail.com`
    );
    modalReplyBtn.href = `mailto:${item.email}?subject=${replySubject}&body=${replyBody}`;

    inquiryModal.classList.remove("hidden");
    initLucide();
  }

  function closeInquiryModal() {
    inquiryModal.classList.add("hidden");
    state.activeInquiryId = null;
    renderInquiries();
  }

  // --- 12. CSV EXPORT ---
  function exportToCSV() {
    if (state.inquiries.length === 0) {
      showToast("No inquiries available to export.", false);
      return;
    }

    const headers = ["Inquiry ID", "Timestamp", "Client Name", "Email Address", "Project Scope", "Status", "Message", "Admin Notes"];
    const rows = state.inquiries.map((item) => [
      item.id,
      item.timestamp,
      item.name || "",
      item.email || "",
      item.scope || "",
      item.status || "",
      (item.message || "").replace(/"/g, '""'),
      (item.notes || "").replace(/"/g, '""')
    ]);

    let csvContent = "\uFEFF" + headers.join(",") + "\n";
    rows.forEach((row) => {
      const line = row.map((cell) => `"${cell}"`).join(",");
      csvContent += line + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    const today = new Date().toISOString().split("T")[0];
    downloadLink.setAttribute("href", url);
    downloadLink.setAttribute("download", `smriti_sardar_contact_inquiries_${today}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast("Exported " + state.inquiries.length + " inquiries to CSV.", true);
  }

  // --- 13. SIMULATION TOOL ---
  const PRESET_TEMPLATES = {
    expedition: {
      name: "Tenzing Norbu",
      email: "tenzing@himalayanexpeditions.org",
      scope: "Documentary / Expedition",
      message: "We are mounting an expedition to survey snow melt glaciers on the Annapurna range. We require a documentary DP capable of alpine climbing while handling RED V-Raptor / FX6 camera packages at 5,000m altitude. Estimated shoot: 18 days in March 2027."
    },
    brand: {
      name: "Sophia Lindqvist",
      email: "sophia@nordictrailgear.com",
      scope: "Commercial / Brand Film",
      message: "Nordic Trail Gear is filming a global autumn campaign in the rugged Western Ghats. We need cinematic drone vistas, high-speed fluid gimbal movement, and authentic mountain lifestyle cinematography. Budget approved for 4 shoot days + color grade."
    },
    drone: {
      name: "Marcus Vance",
      email: "marcus.v@wildoceansmedia.co.uk",
      scope: "Drone Cinematography",
      message: "Seeking an experienced CineLifter FPV and Mavic 3 Cine pilot for tracking high-speed river rapids and coastal wildlife in Kerala. Must have experience with heavy payloads and close-proximity chase cinematography."
    }
  };

  function openSimulateModal() {
    simulateModal.classList.remove("hidden");
    simName.value = "";
    simEmail.value = "";
    simMessage.value = "";
    initLucide();
  }

  function closeSimulateModal() {
    simulateModal.classList.add("hidden");
  }

  function applyPreset(presetKey) {
    const data = PRESET_TEMPLATES[presetKey];
    if (!data) return;
    simName.value = data.name;
    simEmail.value = data.email;
    simScope.value = data.scope;
    simMessage.value = data.message;
  }

  // --- 14. EVENT LISTENERS ---
  function setupEventListeners() {
    // Auth Form
    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = adminEmailInput.value.trim();
      const pwd = adminPasswordInput.value.trim();
      const remember = rememberMeInput.checked;
      login(email, pwd, remember);
    });

    // Toggle Password Visibility
    togglePasswordBtn?.addEventListener("click", () => {
      const type = adminPasswordInput.getAttribute("type") === "password" ? "text" : "password";
      adminPasswordInput.setAttribute("type", type);
      const icon = togglePasswordBtn.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", type === "password" ? "eye" : "eye-off");
        initLucide();
      }
    });

    // Demo Fill & Login
    demoFillBtn?.addEventListener("click", () => {
      adminEmailInput.value = ADMIN_CREDENTIALS.email;
      adminPasswordInput.value = ADMIN_CREDENTIALS.password;
      rememberMeInput.checked = true;
      login(ADMIN_CREDENTIALS.email, ADMIN_CREDENTIALS.password, true);
    });

    // Logout
    logoutBtn?.addEventListener("click", logout);

    // Tab Filters
    const tabs = [
      { btn: tabAll, filter: "all" },
      { btn: tabUnread, filter: "unread" },
      { btn: tabReplied, filter: "replied" },
      { btn: tabArchived, filter: "archived" }
    ];

    tabs.forEach(({ btn, filter }) => {
      btn?.addEventListener("click", () => {
        tabs.forEach((t) => t.btn?.classList.remove("active"));
        btn.classList.add("active");
        state.currentFilter = filter;
        renderInquiries();
      });
    });

    // Search input
    searchInput?.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderInquiries();
    });

    // Scope filter
    scopeFilter?.addEventListener("change", (e) => {
      state.scopeFilter = e.target.value;
      renderInquiries();
    });

    // Sort order
    sortFilter?.addEventListener("change", (e) => {
      state.sortOrder = e.target.value;
      renderInquiries();
    });

    // Clear filters
    clearFiltersBtn?.addEventListener("click", () => {
      state.currentFilter = "all";
      state.searchQuery = "";
      state.scopeFilter = "all";
      state.sortOrder = "newest";

      tabs.forEach((t) => t.btn?.classList.remove("active"));
      tabAll?.classList.add("active");
      if (searchInput) searchInput.value = "";
      if (scopeFilter) scopeFilter.value = "all";
      if (sortFilter) sortFilter.value = "newest";

      renderInquiries();
      showToast("Filters reset to default view.", true);
    });

    // Export CSV
    exportCsvBtn?.addEventListener("click", exportToCSV);

    // Inquiries Feed Delegated Actions
    inquiriesFeed?.addEventListener("click", (e) => {
      const viewBtn = e.target.closest(".action-view");
      if (viewBtn) {
        const id = viewBtn.getAttribute("data-id");
        openInquiryModal(id);
        return;
      }

      const toggleReadBtn = e.target.closest(".action-toggle-read");
      if (toggleReadBtn) {
        const id = toggleReadBtn.getAttribute("data-id");
        const item = state.inquiries.find((i) => i.id === id);
        if (item) {
          item.status = item.status === "unread" ? "replied" : "unread";
          saveInquiries();
          updateStats();
          renderInquiries();
          showToast(`Marked inquiry as ${item.status}.`, true);
        }
        return;
      }

      const toggleArchiveBtn = e.target.closest(".action-toggle-archive");
      if (toggleArchiveBtn) {
        const id = toggleArchiveBtn.getAttribute("data-id");
        const item = state.inquiries.find((i) => i.id === id);
        if (item) {
          item.status = item.status === "archived" ? "replied" : "archived";
          saveInquiries();
          updateStats();
          renderInquiries();
          showToast(`Inquiry ${item.status === "archived" ? "archived" : "restored"}.`, true);
        }
        return;
      }

      const deleteBtn = e.target.closest(".action-delete");
      if (deleteBtn) {
        const id = deleteBtn.getAttribute("data-id");
        if (confirm("Are you sure you want to permanently delete this inquiry?")) {
          state.inquiries = state.inquiries.filter((i) => i.id !== id);
          saveInquiries();
          updateStats();
          renderInquiries();
          showToast("Inquiry deleted from database.", true);
        }
        return;
      }
    });

    // Detail Modal Actions
    modalCloseBtn?.addEventListener("click", closeInquiryModal);

    modalStatusSelect?.addEventListener("change", (e) => {
      if (!state.activeInquiryId) return;
      const item = state.inquiries.find((i) => i.id === state.activeInquiryId);
      if (item) {
        item.status = e.target.value;
        saveInquiries();
        updateStats();
        showToast("Status updated to " + item.status, true);
      }
    });

    modalSaveNotesBtn?.addEventListener("click", () => {
      if (!state.activeInquiryId) return;
      const item = state.inquiries.find((i) => i.id === state.activeInquiryId);
      if (item) {
        item.notes = modalNotes.value.trim();
        saveInquiries();
        renderInquiries();
        showToast("Admin notes saved.", true);
      }
    });

    modalCopyBtn?.addEventListener("click", async () => {
      if (!state.activeInquiryId) return;
      const item = state.inquiries.find((i) => i.id === state.activeInquiryId);
      if (!item) return;

      const summary = `SMRITI SARDAR PRODUCTION INQUIRY\nName: ${item.name}\nEmail: ${item.email}\nScope: ${item.scope}\nDate: ${item.timestamp}\nMessage:\n${item.message}\nNotes: ${item.notes || "None"}`;

      try {
        await navigator.clipboard.writeText(summary);
        showToast("Client dossier copied to clipboard!", true);
      } catch {
        showToast("Error copying to clipboard.", false);
      }
    });

    modalDeleteBtn?.addEventListener("click", () => {
      if (!state.activeInquiryId) return;
      if (confirm("Delete this inquiry file permanently?")) {
        state.inquiries = state.inquiries.filter((i) => i.id !== state.activeInquiryId);
        saveInquiries();
        updateStats();
        closeInquiryModal();
        showToast("Inquiry removed.", true);
      }
    });

    // Simulate Modal Actions
    simulateLeadBtn?.addEventListener("click", openSimulateModal);
    simulateCloseBtn?.addEventListener("click", closeSimulateModal);

    presetBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-preset");
        applyPreset(key);
      });
    });

    simulateForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = simName.value.trim();
      const email = simEmail.value.trim();
      const scope = simScope.value;
      const message = simMessage.value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all simulation fields.", false);
        return;
      }

      const newInquiry = {
        id: "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        name,
        email,
        scope,
        message,
        timestamp: new Date().toISOString(),
        status: "unread",
        notes: ""
      };

      state.inquiries.unshift(newInquiry);
      saveInquiries();
      updateStats();
      renderInquiries();
      closeSimulateModal();
      showToast(`Simulated inquiry received from ${name}!`, true);
    });

    // Close modals on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!inquiryModal.classList.contains("hidden")) closeInquiryModal();
        if (!simulateModal.classList.contains("hidden")) closeSimulateModal();
      }
    });

    // Backdrop click close
    inquiryModal?.addEventListener("click", (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });
    simulateModal?.addEventListener("click", (e) => {
      if (e.target === simulateModal) closeSimulateModal();
    });

    // Cross-tab real-time sync with index.html!
    window.addEventListener("storage", () => {
      const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
      if (raw) {
        try {
          const fresh = JSON.parse(raw);
          const wasCount = state.inquiries.length;
          state.inquiries = fresh;
          updateStats();
          renderInquiries();
          if (fresh.length > wasCount) {
            showToast("⚡ New contact inquiry received live!", true);
          }
        } catch (e) {
          console.warn("Storage sync parse error:", e);
        }
      }
    });
  }

  // Self-start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
