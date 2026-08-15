var snippetEditors = [];

function applySnippetTheme() {
  if (!window.CodeMirror) return;
  var isDark = document.documentElement.classList.contains("dark");
  var theme = isDark ? "material-darker" : "eclipse";
  snippetEditors.forEach(function (cm) {
    cm.setOption("theme", theme);
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  var ta = document.createElement("textarea");
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
  var btn = document.createElement("button");
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
  var mode = snippetMode();

  document.querySelectorAll(".code pre").forEach(function (pre) {
    var container = pre.closest(".code") || pre;
    var host = document.createElement("div");
    host.className = "cm-snippet-block";
    container.parentNode.replaceChild(host, container);

    var cm = CodeMirror(host, {
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
    var host = document.createElement("span");
    inlineCode.parentNode.replaceChild(host, inlineCode);

    var cm = CodeMirror(host, {
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
  var isDark = document.documentElement.classList.contains("dark");
  var icon = document.getElementById("theme-icon");
  var label = document.getElementById("theme-label");
  if (icon) icon.textContent = isDark ? "☀️" : "🌙";
  if (label) label.textContent = isDark ? "Light mode" : "Dark mode";
}

function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  var isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  applySnippetTheme();
  updateToggleUI();
}

(function () {
  var saved = localStorage.getItem("theme");
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  }
  initCodeMirrorSnippets();
  updateToggleUI();
})();
