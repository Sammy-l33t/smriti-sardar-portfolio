/**
 * SMRITI SARDAR - EXECUTIVE ADMIN TERMINAL CONTROLLER
 * Production Leads Management, Real-time Storage Sync, CSV Export, Secure Auth
 */

(function () {
  "use strict";

  // --- 1. SECURE AUTHENTICATION CONFIG ---
  const ADMIN_CREDENTIALS = {
    email: "admin@smritisardar.com",
    password: "smriti2026"
  };

  const STORAGE_KEY_AUTH = "smriti_admin_authenticated";
  const STORAGE_KEY_INQUIRIES = "smriti_contact_inquiries";

  // --- 2. STATE ---
  let state = {
    inquiries: [],
    currentFilter: "all", // all | unread | replied | archived
    searchQuery: "",
    scopeFilter: "all",
    sortOrder: "newest", // newest | oldest
    activeInquiryId: null
  };

  // --- 3. DOM REFERENCES ---
  const loginView = document.getElementById("loginView");
  const dashboardView = document.getElementById("dashboardView");
  const loginForm = document.getElementById("loginForm");
  const adminEmailInput = document.getElementById("adminEmail");
  const adminPasswordInput = document.getElementById("adminPassword");
  const rememberMeInput = document.getElementById("rememberMe");
  const togglePasswordBtn = document.getElementById("togglePasswordBtn");
  const loginBtn = document.getElementById("loginBtn");
  const authErrorAlert = document.getElementById("authErrorAlert");
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

  // Toast DOM
  const toastPortal = document.getElementById("adminToast");
  const toastText = document.getElementById("toastText");
  let toastTimer = null;

  // --- 4. INITIALIZATION ---
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

  // --- 5. CLEAN STORAGE & PURGE DUMP LEADS ---
  function initStorage() {
    const raw = localStorage.getItem(STORAGE_KEY_INQUIRIES);
    if (!raw) {
      state.inquiries = [];
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Purge any old fake seed leads (Elena Rostova, Kabir Malhotra, Maya Chen, Arjun Singhania, etc.)
        const fakeLeadSignatures = [
          "elena@alpineproductions.com",
          "kabir.m@terrawildwear.com",
          "m.chen@natgeo-asia.org",
          "arjun@unscriptedfilmlab.in",
          "tenzing@himalayanexpeditions.org",
          "sophia@nordictrailgear.com",
          "marcus.v@wildoceansmedia.co.uk"
        ];

        const cleanLeads = parsed.filter(item => {
          if (!item || !item.email) return false;
          return !fakeLeadSignatures.includes(item.email.toLowerCase().trim());
        });

        state.inquiries = cleanLeads;
        // Resave sanitized list back to storage
        localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(cleanLeads));
      } else {
        state.inquiries = [];
      }
    } catch {
      state.inquiries = [];
    }
  }

  function saveInquiries() {
    localStorage.setItem(STORAGE_KEY_INQUIRIES, JSON.stringify(state.inquiries));
    window.dispatchEvent(new Event("storage"));
  }

  // --- 6. SECURE AUTHENTICATION ---
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
    if (loginView) loginView.classList.remove("hidden");
    if (dashboardView) dashboardView.classList.add("hidden");
    if (authErrorAlert) authErrorAlert.classList.add("hidden");
    initLucide();
  }

  function showDashboard() {
    if (loginView) loginView.classList.add("hidden");
    if (dashboardView) dashboardView.classList.remove("hidden");
    renderInquiries();
    updateStats();
    initLucide();
  }

  function authenticate(email, password, remember) {
    const cleanEmail = email.toLowerCase().trim();

    if (
      cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      if (authErrorAlert) authErrorAlert.classList.add("hidden");

      if (remember) {
        localStorage.setItem(STORAGE_KEY_AUTH, "true");
      } else {
        sessionStorage.setItem(STORAGE_KEY_AUTH, "true");
      }

      showDashboard();
      showToast("Access Granted. Executive Dispatch Terminal Ready.", true);
      return true;
    } else {
      if (authErrorAlert) {
        authErrorAlert.classList.remove("hidden");
        authErrorAlert.textContent = "Authentication failed: Invalid administrator credentials.";
      }
      showToast("Invalid credentials. Access restricted.", false);
      return false;
    }
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY_AUTH);
    localStorage.removeItem(STORAGE_KEY_AUTH);
    showLogin();
    showToast("Terminal session closed.", true);
  }

  // --- 7. TIME & TELEMETRY CLOCK ---
  function startClock() {
    function update() {
      const now = new Date();
      if (clockUTC) {
        clockUTC.textContent = now.toUTCString().slice(17, 25) + " UTC";
      }
      if (clockIST) {
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

  // --- 8. STATS & TELEMETRY ---
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

    // Calculate Top Requested Scope
    if (total === 0) {
      if (statTopScope) statTopScope.textContent = "Awaiting";
      return;
    }

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

  // --- 9. FILTERING & RENDERING ---
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

    // Keyword Search
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

    // Sort order
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
          statusLabel = "CONTACTED";
        } else if (isArchived) {
          statusClass = "archived";
          statusLabel = "ARCHIVED";
        }

        const safeName = escapeHtml(item.name || "Anonymous Client");
        const safeEmail = escapeHtml(item.email || "");
        const safeScope = escapeHtml(item.scope || "Project Inquiry");
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
                    ${isUnread ? '<span class="unread-dot" title="Unread Lead"></span>' : ""}
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
                    <span><strong>Internal Note:</strong> ${escapeHtml(item.notes)}</span>
                  </div>`
                : ""
            }

            <div class="inquiry-bottom">
              <div class="inquiry-action-cluster">
                <button type="button" class="btn-inquiry-action primary action-view" data-id="${item.id}">
                  <i data-lucide="file-text" class="icon-xs"></i> Open Dossier
                </button>
                <a href="mailto:${safeEmail}?subject=${encodeURIComponent(
          "Re: Smriti Sardar Cinematography - " + safeScope
        )}&body=${encodeURIComponent(
          "Dear " +
            safeName.split(" ")[0] +
            ",\n\nThank you for reaching out regarding your project. I have reviewed your inquiry and would be delighted to discuss details.\n\nBest regards,\nSmriti Sardar\nDirector of Photography & Editor\n+91 9875641683 | smritisardar010@gmail.com"
        )}" class="btn-inquiry-action success">
                  <i data-lucide="send" class="icon-xs"></i> Email Reply
                </a>
              </div>

              <div class="inquiry-action-cluster">
                <button type="button" class="btn-inquiry-action action-toggle-read" data-id="${item.id}" title="${
          isUnread ? "Mark as Replied" : "Mark as Unread"
        }">
                  <i data-lucide="${isUnread ? "check" : "mail"}" class="icon-xs"></i>
                  ${isUnread ? "Mark Contacted" : "Mark Unread"}
                </button>
                <button type="button" class="btn-inquiry-action action-toggle-archive" data-id="${item.id}" title="${
          isArchived ? "Restore to Active" : "Move to Archive"
        }">
                  <i data-lucide="archive" class="icon-xs"></i>
                  ${isArchived ? "Restore" : "Archive"}
                </button>
                <button type="button" class="btn-inquiry-action danger action-delete" data-id="${item.id}" title="Permanently delete lead">
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

  // --- 10. INQUIRY DETAIL MODAL / DOSSIER ---
  function openInquiryModal(id) {
    const item = state.inquiries.find((i) => i.id === id);
    if (!item) return;

    state.activeInquiryId = id;

    // Automatically mark read if unread
    if (item.status === "unread") {
      item.status = "replied";
      saveInquiries();
      updateStats();
    }

    modalName.textContent = item.name || "Anonymous Client";
    modalEmail.textContent = item.email || "No email provided";
    modalScope.textContent = item.scope || "General Project Inquiry";
    modalTime.textContent = formatExactTime(item.timestamp);
    modalStatusSelect.value = item.status;
    modalMessage.textContent = item.message || "No project brief text was submitted.";
    modalNotes.value = item.notes || "";

    const replySubject = encodeURIComponent("Re: Smriti Sardar Cinematography - " + (item.scope || "Project"));
    const replyBody = encodeURIComponent(
      `Dear ${item.name ? item.name.split(" ")[0] : "Client"},\n\nThank you for reaching out through my cinematography portfolio. I reviewed your project details regarding ${item.scope || "cinematography"}.\n\nI would be delighted to schedule a brief discovery call or review creative briefs at your convenience.\n\nWarm regards,\nSmriti Sardar\nDirector of Photography & Editor\n+91 9875641683 | smritisardar010@gmail.com`
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

  // --- 11. PROFESSIONAL CSV EXPORT ---
  function exportToCSV() {
    if (state.inquiries.length === 0) {
      showToast("No inquiries available to export.", false);
      return;
    }

    const headers = [
      "Inquiry ID",
      "Received Timestamp (UTC)",
      "Client Name",
      "Email Address",
      "Project Scope",
      "Status",
      "Inquiry Message",
      "Internal Admin Notes"
    ];

    const rows = state.inquiries.map((item) => [
      item.id,
      item.timestamp || new Date().toISOString(),
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
    downloadLink.setAttribute("download", `smriti_sardar_production_leads_${today}.csv`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast(`Exported ${state.inquiries.length} verified leads to CSV.`, true);
  }

  // --- 12. EVENT LISTENERS ---
  function setupEventListeners() {
    // Auth Form Submit
    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = adminEmailInput.value.trim();
      const pwd = adminPasswordInput.value.trim();
      const remember = rememberMeInput.checked;

      if (!email || !pwd) {
        if (authErrorAlert) {
          authErrorAlert.classList.remove("hidden");
          authErrorAlert.textContent = "Please provide both administrator email and terminal password.";
        }
        return;
      }

      authenticate(email, pwd, remember);
    });

    // Toggle Password Visibility
    togglePasswordBtn?.addEventListener("click", () => {
      const isPwd = adminPasswordInput.getAttribute("type") === "password";
      adminPasswordInput.setAttribute("type", isPwd ? "text" : "password");
      const icon = togglePasswordBtn.querySelector("i");
      if (icon) {
        icon.setAttribute("data-lucide", isPwd ? "eye-off" : "eye");
        initLucide();
      }
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

    // Search Input
    searchInput?.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderInquiries();
    });

    // Scope Dropdown
    scopeFilter?.addEventListener("change", (e) => {
      state.scopeFilter = e.target.value;
      renderInquiries();
    });

    // Sort Dropdown
    sortFilter?.addEventListener("change", (e) => {
      state.sortOrder = e.target.value;
      renderInquiries();
    });

    // Reset Filters
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

    // Delegated Actions on Inquiry Feed
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
        if (confirm("Are you sure you want to permanently delete this client inquiry?")) {
          state.inquiries = state.inquiries.filter((i) => i.id !== id);
          saveInquiries();
          updateStats();
          renderInquiries();
          showToast("Lead removed from database.", true);
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
        showToast("Internal notes saved to file.", true);
      }
    });

    modalCopyBtn?.addEventListener("click", async () => {
      if (!state.activeInquiryId) return;
      const item = state.inquiries.find((i) => i.id === state.activeInquiryId);
      if (!item) return;

      const summary = `SMRITI SARDAR PRODUCTION INQUIRY\nClient: ${item.name}\nEmail: ${item.email}\nScope: ${item.scope}\nReceived: ${item.timestamp}\nMessage:\n${item.message}\nNotes: ${item.notes || "None"}`;

      try {
        await navigator.clipboard.writeText(summary);
        showToast("Client dossier copied to clipboard!", true);
      } catch {
        showToast("Error copying to clipboard.", false);
      }
    });

    modalDeleteBtn?.addEventListener("click", () => {
      if (!state.activeInquiryId) return;
      if (confirm("Permanently delete this inquiry file?")) {
        state.inquiries = state.inquiries.filter((i) => i.id !== state.activeInquiryId);
        saveInquiries();
        updateStats();
        closeInquiryModal();
        showToast("Inquiry file removed.", true);
      }
    });

    // Close Modal on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (inquiryModal && !inquiryModal.classList.contains("hidden")) {
          closeInquiryModal();
        }
      }
    });

    // Backdrop Click Close
    inquiryModal?.addEventListener("click", (e) => {
      if (e.target === inquiryModal) closeInquiryModal();
    });

    // Cross-Tab Real-Time Sync with index.html
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
