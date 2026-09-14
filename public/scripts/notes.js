const snippetEditors = [];

function isPythonNotesPage() {
  const path = (window.location.pathname || "").toLowerCase();
  if (path.indexOf("/python/") !== -1) return true;
  if (document.documentElement.getAttribute("data-notes-lang") === "python") return true;
  return false;
}

function snippetThemeName() {
  const isDark = document.documentElement.classList.contains("dark");
  if (isPythonNotesPage()) {
    return isDark ? "monokai" : "xq-light";
  }
  return isDark ? "material-darker" : "eclipse";
}

function applySnippetTheme() {
  if (!window.CodeMirror) return;
  const theme = snippetThemeName();
  snippetEditors.forEach(function (cm) {
    cm.setOption("theme", theme);
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  } finally {
    document.body.removeChild(ta);
  }
}

function attachCopyButton(host, getText) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "cm-snippet-copy";
  btn.textContent = "Copy";
  btn.setAttribute("aria-label", "Copy code");
  btn.addEventListener("click", function () {
    copyText(getText()).then(function () {
      btn.textContent = "Copied";
      btn.classList.add("copied");
      setTimeout(function () {
        btn.textContent = "Copy";
        btn.classList.remove("copied");
      }, 1400);
    });
  });
  host.appendChild(btn);
}

function snippetMode() {
  if (!window.CodeMirror || !CodeMirror.modes) return "text/plain";
  if (isPythonNotesPage() && CodeMirror.modes.python) {
    return "python";
  }
  if (CodeMirror.modes.javascript) {
    return "javascript";
  }
  return "text/plain";
}

function initCodeMirrorSnippets() {
  if (!window.CodeMirror) return;
  const mode = snippetMode();

  document.querySelectorAll(".code pre").forEach(function (pre) {
    const container = pre.closest(".code") || pre;
    const host = document.createElement("div");
    host.className = "cm-snippet-block";
    container.parentNode.replaceChild(host, container);

    const cm = CodeMirror(host, {
      value: pre.textContent.replace(/\n+$/, ""),
      mode: mode,
      readOnly: true,
      lineNumbers: false,
      lineWrapping: false,
      viewportMargin: Infinity,
    });
    cm.getWrapperElement().classList.add("cm-snippet-editor");
    snippetEditors.push(cm);
    attachCopyButton(host, function () {
      return cm.getValue();
    });
  });

  document.querySelectorAll("code.inline").forEach(function (inlineCode) {
    const host = document.createElement("span");
    inlineCode.parentNode.replaceChild(host, inlineCode);

    const cm = CodeMirror(host, {
      value: inlineCode.textContent,
      mode: "text/plain",
      readOnly: true,
      lineNumbers: false,
      lineWrapping: false,
      viewportMargin: Infinity,
    });
    cm.setSize("auto", "auto");
    cm.getWrapperElement().classList.add("cm-inline-editor");
    snippetEditors.push(cm);
  });

  applySnippetTheme();
}

function updateToggleUI() {
  const isDark = document.documentElement.classList.contains("dark");
  const icon = document.getElementById("theme-icon");
  const label = document.getElementById("theme-label");
  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (label) label.textContent = isDark ? "Light mode" : "Dark mode";

  document.querySelectorAll(".theme-icon-mobile").forEach(function (el) {
    el.textContent = isDark ? "☀️" : "🌙";
  });
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applySnippetTheme();
  updateToggleUI();
}

const LEVEL_FILTER_KEY = "notes-levels";
const LEVEL_CHIP = ".chip.tier-l1, .chip.tier-l2, .chip.tier-l3";

function levelFromChip(chip) {
  if (!chip) return "";
  if (chip.classList.contains("tier-l3")) return "3";
  if (chip.classList.contains("tier-l2")) return "2";
  if (chip.classList.contains("tier-l1")) return "1";
  return "";
}

function isLevelHeading(node) {
  return node && node.nodeType === 1 && node.tagName === "H3" && node.querySelector(LEVEL_CHIP);
}

function wrapLevelBlocks() {
  document.querySelectorAll("main h3").forEach(function (h3) {
    const chip = h3.querySelector(LEVEL_CHIP);
    if (!chip || h3.closest(".level-block")) return;
    const wrap = document.createElement("div");
    wrap.className = "level-block";
    wrap.setAttribute("data-level", levelFromChip(chip));
    h3.parentNode.insertBefore(wrap, h3);
    wrap.appendChild(h3);
    let next = wrap.nextSibling;
    while (next && !isLevelHeading(next)) {
      const current = next;
      next = current.nextSibling;
      wrap.appendChild(current);
    }
  });
}

function readSavedLevels() {
  const raw = localStorage.getItem(LEVEL_FILTER_KEY);
  if (!raw) return { "1": true, "2": true, "3": true };
  const set = {};
  raw.split(",").forEach(function (n) {
    if (n === "1" || n === "2" || n === "3") set[n] = true;
  });
  if (!set["1"] && !set["2"] && !set["3"]) {
    return { "1": true, "2": true, "3": true };
  }
  return { "1": !!set["1"], "2": !!set["2"], "3": !!set["3"] };
}

function saveLevels(levels) {
  const stored = ["1", "2", "3"].filter(function (n) {
    return levels[n];
  });
  localStorage.setItem(LEVEL_FILTER_KEY, stored.join(","));
}

function refreshSnippets() {
  requestAnimationFrame(function () {
    snippetEditors.forEach(function (cm) {
      cm.refresh();
    });
  });
}

function applyLevelFilter(levels) {
  document.querySelectorAll(".level-block").forEach(function (block) {
    const show = !!levels[block.getAttribute("data-level")];
    block.hidden = !show;
  });

  document.querySelectorAll("main section").forEach(function (sec) {
    const blocks = sec.querySelectorAll(".level-block");
    if (!blocks.length) return;
    let anyVisible = false;
    blocks.forEach(function (block) {
      if (!block.hidden) anyVisible = true;
    });
    sec.hidden = !anyVisible;
    if (sec.id) {
      document.querySelectorAll('.sidebar .nav a[href="#' + sec.id + '"]').forEach(function (link) {
        link.hidden = !anyVisible;
      });
    }
  });

  document.querySelectorAll(".h2-levels .tier, .heading-with-levels .tier").forEach(function (badge) {
    const n = badge.classList.contains("l3") ? "3" : badge.classList.contains("l2") ? "2" : badge.classList.contains("l1") ? "1" : "";
    badge.classList.toggle("is-filtered-out", n && !levels[n]);
  });

  document.querySelectorAll(".level-filter-btn[data-level]").forEach(function (btn) {
    const on = !!levels[btn.getAttribute("data-level")];
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.classList.toggle("is-on", on);
  });

  const allOn = levels["1"] && levels["2"] && levels["3"];
  const allBtn = document.querySelector(".level-filter-all");
  if (allBtn) {
    allBtn.setAttribute("aria-pressed", allOn ? "true" : "false");
    allBtn.classList.toggle("is-on", allOn);
  }

  refreshSnippets();
}

function initLevelFilter() {
  wrapLevelBlocks();
  if (!document.querySelector(".level-block")) return;

  const main = document.querySelector("main");
  if (!main) return;

  const bar = document.createElement("div");
  bar.className = "level-filter";
  bar.setAttribute("role", "group");
  bar.setAttribute("aria-label", "Filter by learning level");
  bar.innerHTML =
    '<span class="level-filter-label">Show levels</span>' +
    '<button type="button" class="level-filter-btn tier-l1" data-level="1" aria-pressed="true">L1 Fundamental</button>' +
    '<button type="button" class="level-filter-btn tier-l2" data-level="2" aria-pressed="true">L2 Intermediate</button>' +
    '<button type="button" class="level-filter-btn tier-l3" data-level="3" aria-pressed="true">L3 Advanced</button>' +
    '<button type="button" class="level-filter-all" aria-pressed="true">All</button>';

  const breadcrumb = main.querySelector(".breadcrumb");
  if (breadcrumb && breadcrumb.nextSibling) {
    main.insertBefore(bar, breadcrumb.nextSibling);
  } else {
    main.insertBefore(bar, main.firstChild);
  }

  let levels = readSavedLevels();

  bar.addEventListener("click", function (event) {
    const btn = event.target.closest("button");
    if (!btn || !bar.contains(btn)) return;
    if (btn.classList.contains("level-filter-all")) {
      levels = { "1": true, "2": true, "3": true };
    } else if (btn.getAttribute("data-level")) {
      const n = btn.getAttribute("data-level");
      const next = !levels[n];
      const enabledCount = ["1", "2", "3"].filter(function (k) {
        return k === n ? next : levels[k];
      }).length;
      if (enabledCount === 0) return;
      levels[n] = next;
    } else {
      return;
    }
    saveLevels(levels);
    applyLevelFilter(levels);
  });

  applyLevelFilter(levels);
}

function initStickyPageTop() {
  const main = document.querySelector("main");
  if (!main) return;
  const breadcrumb = main.querySelector(":scope > .breadcrumb");
  if (!breadcrumb) return;

  const wrap = document.createElement("div");
  wrap.className = "page-top";
  const filter = breadcrumb.nextElementSibling;
  main.insertBefore(wrap, breadcrumb);
  wrap.appendChild(breadcrumb);
  if (filter && filter.classList.contains("level-filter")) {
    wrap.appendChild(filter);
  }
}

function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  const layout = document.querySelector(".layout");
  const brand = sidebar.querySelector(".brand");

  // 1. Ensure sidebar header with collapse toggle button
  let collapseBtn = document.getElementById("sidebar-collapse-btn");
  if (!collapseBtn && brand) {
    let header = sidebar.querySelector(".sidebar-header");
    if (!header) {
      header = document.createElement("div");
      header.className = "sidebar-header";
      brand.parentNode.insertBefore(header, brand);
      header.appendChild(brand);
    }
    collapseBtn = document.createElement("button");
    collapseBtn.type = "button";
    collapseBtn.id = "sidebar-collapse-btn";
    collapseBtn.className = "sidebar-toggle-btn";
    collapseBtn.setAttribute("title", "Collapse sidebar (Ctrl+B)");
    collapseBtn.setAttribute("aria-label", "Collapse sidebar");
    collapseBtn.innerHTML =
      '<svg class="icon-collapse" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9-3 3 3 3"/></svg>' +
      '<svg class="icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    header.appendChild(collapseBtn);
  }

  // 2. Ensure expand button for collapsed desktop state
  let expandBtn = document.getElementById("sidebar-expand-btn");
  if (!expandBtn) {
    expandBtn = document.createElement("button");
    expandBtn.type = "button";
    expandBtn.id = "sidebar-expand-btn";
    expandBtn.className = "sidebar-expand-btn";
    expandBtn.setAttribute("title", "Expand sidebar (Ctrl+B)");
    expandBtn.setAttribute("aria-label", "Expand sidebar");
    expandBtn.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 15 3-3-3-3"/></svg>' +
      '<span>Sidebar</span>' +
      '<kbd class="kbd-hint">Ctrl B</kbd>';
    document.body.appendChild(expandBtn);
  }

  // 3. Ensure backdrop for mobile drawer
  let backdrop = document.getElementById("sidebar-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.id = "sidebar-backdrop";
    backdrop.className = "sidebar-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }

  // 4. Ensure mobile header
  let mobileHeader = document.querySelector(".mobile-header");
  if (!mobileHeader && layout) {
    mobileHeader = document.createElement("header");
    mobileHeader.className = "mobile-header";
    const brandClone = brand ? brand.cloneNode(true) : null;
    const isDark = document.documentElement.classList.contains("dark");
    const menuBtn = document.createElement("button");
    menuBtn.type = "button";
    menuBtn.className = "mobile-menu-btn";
    menuBtn.id = "mobile-menu-btn";
    menuBtn.setAttribute("aria-label", "Open navigation");
    menuBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';

    const mobileThemeBtn = document.createElement("button");
    mobileThemeBtn.type = "button";
    mobileThemeBtn.className = "mobile-theme-btn";
    mobileThemeBtn.setAttribute("aria-label", "Toggle theme");
    mobileThemeBtn.innerHTML = '<span class="icon theme-icon-mobile">' + (isDark ? "☀️" : "🌙") + '</span>';
    mobileThemeBtn.addEventListener("click", toggleTheme);

    mobileHeader.appendChild(menuBtn);
    if (brandClone) mobileHeader.appendChild(brandClone);
    mobileHeader.appendChild(mobileThemeBtn);

    layout.parentNode.insertBefore(mobileHeader, layout);
  }

  // 5. Restore saved desktop collapse state
  const isCollapsed = localStorage.getItem("sidebar-collapsed") === "true";
  if (isCollapsed && window.innerWidth > 860) {
    document.body.classList.add("sidebar-collapsed");
  }

  function toggleDesktopSidebar() {
    const collapsed = document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem("sidebar-collapsed", collapsed ? "true" : "false");
    refreshSnippets();
  }

  function closeMobileSidebar() {
    document.body.classList.remove("mobile-sidebar-open");
  }

  function openMobileSidebar() {
    document.body.classList.add("mobile-sidebar-open");
  }

  if (collapseBtn) {
    collapseBtn.addEventListener("click", function () {
      if (window.innerWidth <= 860) {
        closeMobileSidebar();
      } else {
        toggleDesktopSidebar();
      }
    });
  }

  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      toggleDesktopSidebar();
    });
  }

  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      if (document.body.classList.contains("mobile-sidebar-open")) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", closeMobileSidebar);
  }

  // Auto-close drawer on mobile when clicking any navigation link
  sidebar.querySelectorAll(".nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 860) {
        closeMobileSidebar();
      }
    });
  });

  // Keyboard shortcuts: Ctrl+B / Cmd+B toggles sidebar, Escape closes mobile sidebar
  window.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) {
      e.preventDefault();
      if (window.innerWidth <= 860) {
        if (document.body.classList.contains("mobile-sidebar-open")) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      } else {
        toggleDesktopSidebar();
      }
    } else if (e.key === "Escape") {
      if (document.body.classList.contains("mobile-sidebar-open")) {
        closeMobileSidebar();
      }
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 860) {
      closeMobileSidebar();
    }
  });
}

(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
  initSidebar();
  initLevelFilter();
  initStickyPageTop();
  initCodeMirrorSnippets();
  refreshSnippets();
  updateToggleUI();

  document.addEventListener("toggle", function (event) {
    if (event.target && event.target.tagName === "DETAILS" && event.target.open) {
      refreshSnippets();
    }
  }, true);
})();
