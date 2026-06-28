# 16. Interview Patterns & Polyfills

> File 16 — design patterns, polyfill implementations, coding problems, security, OOP, engine topics.

Capstone for interview prep. Builds on Files 05–12.

---

## 1. Object-oriented concepts

### 1.1. Encapsulation

Hide internal state — **closures** (File 08), **`#` private fields** (File 09), or module scope (File 11).

### 1.2. Inheritance

Share behavior via **prototype chain** or **`extends`** (File 09).

### 1.3. Polymorphism

Same interface, different implementations — method **override** in subclasses:

```js
class Shape { area() { throw new Error("implement"); } }
class Circle extends Shape {
  constructor(r) { super(); this.r = r; }
  area() { return Math.PI * this.r ** 2; }
}
```

### 1.4. Abstraction

Expose simple API, hide complexity — e.g. `fetch` wrapper, repository class over raw HTTP.

---

## 2. Design patterns

### 2.1. Module pattern

IIFE or ES modules with private scope (File 08, 11).

### 2.2. Revealing module

Return public object from closure (File 08).

### 2.3. Singleton

One shared instance:

```js
const Database = (function () {
  let instance;
  return {
    getInstance() {
      if (!instance) instance = { connect() {} };
      return instance;
    },
  };
})();
```

### 2.4. Factory

Function that creates objects:

```js
function createUser(role) {
  return role === "admin"
    ? { role, canDelete: true }
    : { role, canDelete: false };
}
```

### 2.5. Observer / Pub-Sub

```js
class EventEmitter {
  #listeners = {};
  on(event, fn) {
    (this.#listeners[event] ??= []).push(fn);
  }
  emit(event, data) {
    (this.#listeners[event] ?? []).forEach((fn) => fn(data));
  }
}
```

### 2.6. Strategy

Swap algorithms at runtime:

```js
const strategies = {
  json: (d) => JSON.stringify(d),
  csv: (d) => d.map((r) => r.join(",")).join("\n"),
};
function exportData(format, data) {
  return strategies[format](data);
}
```

### 2.7. Adapter & Decorator

**Adapter** — wrap foreign API to match your interface. **Decorator** — add behavior without changing core (stage-3 `@` decorators in File 12).

---

## 3. Polyfill implementations

### 3.1. Array.prototype.map

```js
function map(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) result[i] = fn(arr[i], i, arr);
  }
  return result;
}
```

### 3.2. Array.prototype.filter

```js
function filter(arr, fn) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && fn(arr[i], i, arr)) result.push(arr[i]);
  }
  return result;
}
```

### 3.3. Array.prototype.reduce

```js
function reduce(arr, fn, initial) {
  let acc = initial;
  let start = 0;
  if (initial === undefined) {
    if (arr.length === 0) throw new TypeError("Reduce of empty array");
    acc = arr[0];
    start = 1;
  }
  for (let i = start; i < arr.length; i++) {
    if (i in arr) acc = fn(acc, arr[i], i, arr);
  }
  return acc;
}
```

### 3.4. Function.prototype.bind

```js
function bind(fn, thisArg, ...boundArgs) {
  return function (...args) {
    return fn.apply(thisArg, [...boundArgs, ...args]);
  };
}
```

### 3.5. call and apply

```js
function call(fn, thisArg, ...args) {
  return fn.apply(thisArg, args);
}
// apply same with args array
```

### 3.6. Promise (minimal)

```js
class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.handlers = [];
    const resolve = (val) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = val;
      this.handlers.forEach((h) => h.onFulfilled?.(val));
    };
    const reject = (err) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.value = err;
      this.handlers.forEach((h) => h.onRejected?.(err));
    };
    try { executor(resolve, reject); } catch (e) { reject(e); }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        try {
          const next = this.state === "fulfilled"
            ? onFulfilled?.(this.value) ?? this.value
            : onRejected?.(this.value);
          resolve(next);
        } catch (e) { reject(e); }
      };
      if (this.state === "pending") this.handlers.push({ onFulfilled: handle, onRejected: handle });
      else handle();
    });
  }
}
```

### 3.7. Promise.all and Promise.race

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let done = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(
        (val) => { results[i] = val; if (++done === promises.length) resolve(results); },
        reject
      );
    });
  });
}
```

### 3.8. flatten array

```js
function flatten(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((acc, v) => acc.concat(Array.isArray(v) ? flatten(v, depth - 1) : v), [])
    : arr.slice();
}
```

Debounce, throttle, curry, once, memoize — full implementations in File 12.

---

## 4. Coding interview problems

### 4.1. Deep clone

```js
function deepClone(val) {
  if (val === null || typeof val !== "object") return val;
  if (Array.isArray(val)) return val.map(deepClone);
  return Object.fromEntries(
    Object.entries(val).map(([k, v]) => [k, deepClone(v)])
  );
}
// Production: structuredClone(val) — File 01, 06
```

### 4.2. Sleep / delay

```js
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(1000);
```

### 4.3. Retry logic

```js
async function retry(fn, times = 3, delayMs = 500) {
  for (let i = 0; i < times; i++) {
    try { return await fn(); }
    catch (e) { if (i === times - 1) throw e; await sleep(delayMs); }
  }
}
```

### 4.4. Promise pool (concurrency limit)

```js
async function promisePool(tasks, limit) {
  const results = [];
  const executing = [];
  for (const [i, task] of tasks.entries()) {
    const p = Promise.resolve().then(task).then((r) => { results[i] = r; });
    results[i] = p;
    if (tasks.length >= limit) {
      executing.push(p);
      if (executing.length >= limit) await Promise.race(executing);
      executing.splice(executing.findIndex((x) => x === p), 1);
    }
  }
  await Promise.all(results);
  return results;
}
```

### 4.5. Group by

```js
function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] ??= []).push(item);
    return acc;
  }, {});
}
```

### 4.6. Remove duplicates

```js
[...new Set(arr)];
// or filter + indexOf for objects by id
```

### 4.7. Frequency counter

```js
function frequency(arr) {
  return arr.reduce((acc, v) => { acc[v] = (acc[v] ?? 0) + 1; return acc; }, {});
}
```

### 4.8. Array chunking

```js
function chunk(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}
```

### 4.9. Object flattening

```js
function flattenObject(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) flattenObject(v, key, out);
    else out[key] = v;
  }
  return out;
}
```

### 4.10. Nested object traversal

```js
function walk(obj, fn, path = "") {
  for (const [k, v] of Object.entries(obj)) {
    const p = path ? `${path}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) walk(v, fn, p);
    else fn(p, v);
  }
}
```

### 4.11. LRU Cache (sketch)

Use **Map** (insertion order) — on get, delete and re-set key to mark recent; evict first key when over capacity.

---

## 5. Security basics

### 5.1. XSS (Cross-Site Scripting)

Injected script runs in victim's browser. **Prevent:** escape output, **`textContent`** not `innerHTML`, CSP, sanitize HTML (DOMPurify).

### 5.2. CSRF (Cross-Site Request Forgery)

Tricks browser into sending authenticated request. **Prevent:** CSRF tokens, **SameSite** cookies.

### 5.3. CORS

Browser blocks cross-origin responses unless server sends **`Access-Control-Allow-Origin`**. Preflight for non-simple requests.

### 5.4. CSP (Content Security Policy)

HTTP header restricting script/style sources — mitigates XSS.

### 5.5. Sanitization

Never trust user HTML. Validate on server; encode on output.

---

## 6. Engine & performance (interview)

### 6.1. De-optimization

V8 may **bail out** of optimized code when types change unpredictably (e.g. adding properties to objects in hot loops with varying shapes). Keep object shapes stable (File 12 — hidden classes).

### 6.2. Virtualization

Render only visible list rows (**react-window**, **@tanstack/react-virtual**) — React File 12.

### 6.3. Function chaining

```js
class Chain {
  constructor(v) { this.v = v; }
  add(n) { this.v += n; return this; }
  mul(n) { this.v *= n; return this; }
  val() { return this.v; }
}
new Chain(2).add(3).mul(4).val();  // 20
```

Pipe/compose — File 12.

---

## 7. Common questions

**7.1. Implement bind from scratch?**  
A: Return function that calls original with fixed **`this`** and partial args (section 3.4).

**7.2. Implement Promise.all?**  
A: Wrap in Promise; resolve array when all fulfill; reject on first rejection (section 3.7).

**7.3. What is event delegation?**  
A: File 15 — single parent listener for many children.

**7.4. XSS vs CSRF?**  
A: **XSS** — run attacker script in your page. **CSRF** — forge request using victim's cookies.

**7.5. Shallow vs deep copy?**  
A: File 01, 06 — spread/`Object.assign` shallow; **`structuredClone`** or recursive clone deep.

**7.6. What is the revealing module pattern?**  
A: File 08 — IIFE returns public API, keeps private vars in closure.

**7.7. Flatten nested array?**  
A: **`flat(Infinity)`** or recursive reduce (section 3.8).

**7.8. How does debounce differ from throttle?**  
A: File 12 — debounce waits for pause; throttle limits rate.
