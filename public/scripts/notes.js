const snippetEditors = [];

function applySnippetTheme() {
  if (!window.CodeMirror) return;
  const isDark = document.documentElement.classList.contains("dark");
  const theme = isDark ? "material-darker" : "eclipse";
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
  if (window.CodeMirror && CodeMirror.modes && CodeMirror.modes.javascript) {
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

(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
  initLevelFilter();
  initStickyPageTop();
  initCodeMirrorSnippets();
  refreshSnippets();
  updateToggleUI();
})();
