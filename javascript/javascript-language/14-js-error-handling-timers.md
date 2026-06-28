# 14. Error Handling & Timers

> File 14 — try/catch/finally, custom errors, setTimeout, setInterval, rAF.

Builds on async (File 10) and control flow (File 04).

---

## 1. Error handling

### 1.1. try / catch / finally

```js
try {
  const data = JSON.parse(maybeInvalidJson);
  process(data);
} catch (err) {
  console.error("Parse failed:", err.message);
} finally {
  console.log("Always runs — cleanup");
}
```

**`finally`** runs whether try succeeded or catch ran — useful for closing resources.

### 1.2. throw

```js
function divide(a, b) {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}
```

Throw **Error objects**, not raw strings — preserves stack trace.

### 1.3. Error object and types

```js
try {
  null.foo;
} catch (err) {
  err instanceof TypeError;      // true
  err instanceof ReferenceError;
  err.name;                      // "TypeError"
  err.message;
  err.stack;                     // stack trace string
}
```

Built-in types: **`Error`**, **`TypeError`**, **`ReferenceError`**, **`SyntaxError`**, **`RangeError`**.

### 1.4. Custom errors

```js
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function saveUser(user) {
  if (!user.email) throw new ValidationError("Email required", "email");
}
```

Async errors use **`try/catch` with `await`** or **`.catch()` on Promises** (File 10).

---

## 2. Timers

### 2.1. setTimeout and clearTimeout

```js
const id = setTimeout(() => {
  console.log("After 1 second");
}, 1000);

clearTimeout(id);  // cancel before it runs
```

`setTimeout(fn, 0)` schedules after current stack + microtasks (File 10 — event loop).

### 2.2. setInterval and clearInterval

```js
let count = 0;
const id = setInterval(() => {
  count++;
  console.log(count);
  if (count >= 5) clearInterval(id);
}, 500);
```

Always **`clearInterval`** on unmount or when done — prevents leaks (File 12).

### 2.3. requestAnimationFrame

For **smooth animation** synced to display refresh (~60fps):

```js
function animate() {
  // update positions
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// cancel: cancelAnimationFrame(id);
```

Prefer rAF over `setInterval` for visual updates.

---

## 3. Common questions

**3.1. What is the difference between throw and return?**  
A: **`throw`** signals **exceptional failure** — jumps to nearest **`catch`**. **`return`** exits normally with a value.

**3.2. Does finally run if try returns?**  
A: **Yes** — `finally` runs before the return completes.

**3.3. Should I throw strings or Error objects?**  
A: **`Error` objects** (or subclasses) — better debugging with `.stack`.

**3.4. What is the difference between setTimeout and setInterval?**  
A: **`setTimeout`** runs **once** after delay. **`setInterval`** repeats until cleared.

**3.5. Why use requestAnimationFrame?**  
A: Batches visual updates with the browser **repaint cycle** — smoother than fixed `setInterval`.

**3.6. How do Promises handle errors vs try/catch?**  
A: **`async/await`** uses **`try/catch`**. Promises use **`.catch()`** or second argument to **`.then()`** (File 10).
