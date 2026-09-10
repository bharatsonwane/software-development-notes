(function () {
  "use strict";

  // Vendored under public/vendor/pyodide (pyodide-core 0.27.7).
  // Resolve relative to this script so it works from python/playground.html.
  var PYODIDE_INDEX = (function () {
    var scripts = document.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (src.indexOf("python-playground.js") !== -1) {
        return new URL("../vendor/pyodide/", src).href;
      }
    }
    return new URL("../public/vendor/pyodide/", window.location.href).href;
  })();

  var EXAMPLES = {
    hello: {
      label: "Hello",
      code: 'name = "Python"\nprint(f"Hello, {name}!")\n',
    },
    fstrings: {
      label: "f-strings",
      code:
        "a, b = 3, 4\nprint(f\"{a} + {b} = {a + b}\")\nprint(f\"{a=}, {b=}\")\n",
    },
    collections: {
      label: "list / dict",
      code:
        "nums = [1, 2, 3, 4, 5]\nsquares = [n * n for n in nums]\nprint(squares)\n\nuser = {\"name\": \"Ada\", \"role\": \"engineer\"}\nprint(user[\"name\"], user.get(\"city\", \"unknown\"))\n",
    },
    loop: {
      label: "loop",
      code:
        "total = 0\nfor i in range(1, 6):\n    total += i\n    print(i, \"→\", total)\nprint(\"sum:\", total)\n",
    },
  };

  var pyodide = null;
  var editor = null;
  var running = false;
  var currentExample = "hello";

  var el = {
    status: null,
    run: null,
    clear: null,
    reset: null,
    example: null,
    output: null,
    editorHost: null,
  };

  function isDark() {
    return document.documentElement.classList.contains("dark");
  }

  function cmTheme() {
    return isDark() ? "monokai" : "xq-light";
  }

  function setStatus(text, state) {
    if (!el.status) return;
    el.status.textContent = text;
    if (state) el.status.setAttribute("data-state", state);
    else el.status.removeAttribute("data-state");
  }

  function setRunEnabled(on) {
    if (el.run) el.run.disabled = !on || running;
    if (el.reset) el.reset.disabled = !on;
    if (el.example) el.example.disabled = !on && !pyodide;
  }

  function clearOutput() {
    if (!el.output) return;
    el.output.innerHTML = "";
    var empty = document.createElement("span");
    empty.className = "out-empty";
    empty.textContent = "Output will appear here.";
    el.output.appendChild(empty);
  }

  function renderOutput(parts) {
    if (!el.output) return;
    el.output.innerHTML = "";
    if (!parts.length) {
      clearOutput();
      return;
    }
    parts.forEach(function (part) {
      var span = document.createElement("span");
      if (part.kind === "stderr") span.className = "out-stderr";
      if (part.kind === "result") span.className = "out-result";
      span.textContent = part.text;
      el.output.appendChild(span);
    });
    el.output.scrollTop = el.output.scrollHeight;
  }

  function getCode() {
    return editor ? editor.getValue() : "";
  }

  function setCode(code) {
    if (editor) editor.setValue(code);
  }

  function loadExample(key) {
    var ex = EXAMPLES[key] || EXAMPLES.hello;
    currentExample = key;
    setCode(ex.code);
    if (el.example) el.example.value = key;
  }

  function setupEditor() {
    var ta = document.getElementById("playground-source");
    if (!ta || !window.CodeMirror) return;

    editor = CodeMirror.fromTextArea(ta, {
      mode: "python",
      theme: cmTheme(),
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      extraKeys: {
        "Ctrl-Enter": function () {
          runCode();
        },
        "Cmd-Enter": function () {
          runCode();
        },
        Tab: function (cm) {
          if (cm.somethingSelected()) cm.indentSelection("add");
          else cm.replaceSelection("    ", "end");
        },
      },
    });

    editor.setSize("100%", "100%");
    if (el.editorHost) {
      el.editorHost.querySelector(".CodeMirror");
    }
  }

  function syncTheme() {
    if (editor) editor.setOption("theme", cmTheme());
  }

  function wrapThemeToggle() {
    if (typeof window.toggleTheme !== "function") return;
    var original = window.toggleTheme;
    window.toggleTheme = function () {
      original();
      syncTheme();
    };
  }

  async function initPyodide() {
    setStatus("Loading Python…", "loading");
    setRunEnabled(false);

    if (typeof loadPyodide !== "function") {
      setStatus("Failed to load vendored Pyodide script.", "error");
      return;
    }

    try {
      pyodide = await loadPyodide({
        indexURL: PYODIDE_INDEX,
      });
      setStatus("Python ready · Ctrl/Cmd+Enter to run", "ready");
      setRunEnabled(true);
    } catch (err) {
      console.error(err);
      setStatus(
        "Could not start Python. Check that public/vendor/pyodide is present and reload.",
        "error"
      );
      setRunEnabled(false);
    }
  }

  async function runCode() {
    if (!pyodide || running) return;
    var code = getCode();
    if (!code.trim()) {
      renderOutput([{ kind: "stderr", text: "(empty — write some code first)\n" }]);
      return;
    }

    running = true;
    setRunEnabled(false);
    setStatus("Running…", "loading");

    var stdout = [];
    var stderr = [];

    pyodide.setStdout({
      batched: function (s) {
        stdout.push(s);
      },
    });
    pyodide.setStderr({
      batched: function (s) {
        stderr.push(s);
      },
    });

    var parts = [];
    try {
      var result = await pyodide.runPythonAsync(code);
      if (stdout.length) {
        parts.push({ kind: "stdout", text: stdout.join("") });
      }
      if (stderr.length) {
        parts.push({ kind: "stderr", text: stderr.join("") });
      }
      if (result !== undefined && result !== null) {
        var text =
          typeof result === "string" ? result : String(result);
        if (text && text !== "undefined" && text !== "None") {
          parts.push({
            kind: "result",
            text: (parts.length ? "\n" : "") + "⇒ " + text + "\n",
          });
        }
      }
      if (!parts.length) {
        parts.push({ kind: "stdout", text: "(ran successfully — no output)\n" });
      }
      renderOutput(parts);
      setStatus("Python ready · Ctrl/Cmd+Enter to run", "ready");
    } catch (err) {
      var msg = err && err.message ? err.message : String(err);
      if (stdout.length) {
        parts.push({ kind: "stdout", text: stdout.join("") });
      }
      if (stderr.length) {
        parts.push({ kind: "stderr", text: stderr.join("") });
      }
      parts.push({
        kind: "stderr",
        text: (parts.length ? "\n" : "") + msg + "\n",
      });
      renderOutput(parts);
      setStatus("Error — fix and run again", "error");
    } finally {
      running = false;
      setRunEnabled(true);
    }
  }

  function fillExampleSelect() {
    if (!el.example) return;
    el.example.innerHTML = "";
    Object.keys(EXAMPLES).forEach(function (key) {
      var opt = document.createElement("option");
      opt.value = key;
      opt.textContent = EXAMPLES[key].label;
      el.example.appendChild(opt);
    });
  }

  function bindUi() {
    el.status = document.getElementById("playground-status");
    el.run = document.getElementById("playground-run");
    el.clear = document.getElementById("playground-clear");
    el.reset = document.getElementById("playground-reset");
    el.example = document.getElementById("playground-example");
    el.output = document.getElementById("playground-output");
    el.editorHost = document.getElementById("playground-editor-host");

    fillExampleSelect();
    clearOutput();
    setupEditor();
    wrapThemeToggle();
    loadExample("hello");

    if (el.run) el.run.addEventListener("click", runCode);
    if (el.clear) el.clear.addEventListener("click", clearOutput);
    if (el.reset) {
      el.reset.addEventListener("click", function () {
        loadExample(currentExample);
        clearOutput();
      });
    }
    if (el.example) {
      el.example.addEventListener("change", function () {
        loadExample(el.example.value);
        clearOutput();
      });
    }
  }

  function start() {
    bindUi();
    initPyodide();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
