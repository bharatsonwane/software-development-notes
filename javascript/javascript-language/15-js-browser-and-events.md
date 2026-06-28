# 15. Browser & Events

> File 15 — DOM/BOM basics, storage, fetch, event bubbling/delegation.

JavaScript in the browser adds APIs beyond the language core. React apps abstract much of this (see React notes), but interviews still test the underlying model.

---

## 1. DOM and BOM

### 1.1. DOM (Document Object Model)

Tree of nodes representing HTML:

```js
document.getElementById("app");
document.querySelector(".btn");
document.querySelectorAll("li");
el.textContent = "Hello";
el.classList.add("active");
el.setAttribute("data-id", "42");
document.createElement("div");
parent.appendChild(el);
```

### 1.2. BOM (Browser Object Model)

Browser globals outside the document tree:

```js
window.location.href;
window.history.back();
window.navigator.userAgent;
window.innerWidth;
window.open(url);
```

---

## 2. Storage APIs

### 2.1. localStorage and sessionStorage

```js
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");
localStorage.removeItem("theme");
localStorage.clear();

sessionStorage.setItem("tab", "1");  // cleared when tab closes
```

Values are **strings** — `JSON.stringify` / `parse` for objects. **Same-origin** only.

### 2.2. Cookies

Small key-value strings sent with HTTP requests — set via **`document.cookie`** or server **`Set-Cookie`**. Prefer **httpOnly** cookies for auth tokens (not accessible from JS).

---

## 3. Fetch & AbortController

### 3.1. Fetch API

```js
const res = await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ada" }),
});
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();
```

File 10 — async patterns; React File 10 — TanStack Query.

### 3.2. AbortController

Cancel in-flight fetch:

```js
const controller = new AbortController();
fetch("/api/slow", { signal: controller.signal });
controller.abort();  // rejects with AbortError
```

### 3.3. History and URL APIs

```js
history.pushState({}, "", "/new-path");
history.replaceState({}, "", "/other");

const url = new URL("https://example.com/path?q=1");
url.searchParams.get("q");
url.pathname;
```

React Router wraps History API (React File 09).

---

## 4. Event handling

### 4.1. Bubbling and capturing

Events flow **capture** (window → target) then **bubble** (target → window). Default listeners run on **bubble** phase.

```js
el.addEventListener("click", handler);                    // bubble (default)
el.addEventListener("click", handler, { capture: true }); // capture
```

### 4.2. Event delegation

One listener on **parent** handles events from **children**:

```js
document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.matches("li.item")) {
    console.log("Clicked", e.target.dataset.id);
  }
});
```

Efficient for dynamic lists — fewer listeners.

### 4.3. stopPropagation and preventDefault

```js
function onClick(e) {
  e.stopPropagation();  // don't bubble further
  e.preventDefault();   // don't default action (e.g. form submit, link nav)
}
```

React: **`e.stopPropagation()`**, **`e.preventDefault()`** on synthetic events (React File 03).

### 4.4. Custom events

```js
const event = new CustomEvent("user-login", { detail: { id: 1 } });
window.dispatchEvent(event);

window.addEventListener("user-login", (e) => {
  console.log(e.detail.id);
});
```

---

## 5. Common questions

**5.1. What is event bubbling?**  
A: Event propagates from **target up** through ancestors after the target handler runs.

**5.2. What is event delegation?**  
A: Attach one handler to a **parent** and use **`event.target`** to handle child events — good for dynamic lists.

**5.3. localStorage vs sessionStorage?**  
A: **localStorage** persists until cleared. **sessionStorage** clears when the **tab** closes.

**5.4. What does preventDefault do?**  
A: Cancels the browser's **default action** (submit form, follow link).

**5.5. What is AbortController for?**  
A: **Cancel** fetch or other abortable APIs — avoids race conditions when user navigates away.

**5.6. DOM vs BOM?**  
A: **DOM** — document tree (elements). **BOM** — browser chrome (`window`, `location`, `history`, `navigator`).
