# 12. Advanced Patterns

> File 12 — internals, patterns, and performance.

This chapter covers **how JS runs code in memory**, **advanced object APIs**, **functional utilities**, and **practical performance habits**. It builds on scope (File 02), closures (File 08), and modern syntax (File 11).

You do not need to micro-optimize every line — but understanding **execution context**, **GC**, and patterns like **debounce** helps you write reliable production code and debug hard issues.

**Default rule today:** modules and **strict mode** by default; prefer **immutability** for predictable state; use **Proxy** sparingly (frameworks/libraries); **measure** before optimizing hot paths.

---

## 1.1. Execution context

An **execution context** is the environment in which JS code runs. Each function call and global/module script gets a context.

### 1.1.1. Types of execution context

| Type | When created |
|------|--------------|
| **Global** | Program / module start |
| **Function** | Each function invocation |
| **Eval** | `eval()` (avoid) |
| **Module** | ES module top level |

Each context has:

- **Variable environment** — `var`, function declarations, `let`/`const` bindings (in modern spec: lexical environment).
- **`this` binding** — depends on call type (File 08).
- **Outer reference** — link to parent lexical environment (scope chain).

### 1.1.2. Creation vs execution phase

When a context is created, JS runs two phases:

**1. Creation (compile) phase**

- Create variable bindings (hoisting — File 02).
- Set up scope chain.
- Determine `this`.

**2. Execution phase**

- Run code line by line.
- Assign values.
- Execute function bodies on call.

```js
console.log(a);  // undefined — var hoisted
var a = 10;

// let b; — TDZ
console.log(b);  // ReferenceError
let b = 5;
```

### 1.1.3. Call stack

Contexts are managed on the **call stack** (File 10):

```js
function first() {
  second();
}

function second() {
  third();
}

function third() {
  console.log("deep");
}

first();
// Stack: first → second → third → pop...
```

Each push is a new function execution context. Stack overflow = too much synchronous recursion.

### 1.1.4. Lexical environment

**Lexical environment** = record of identifiers + reference to **outer** environment. Closures keep outer environments alive (File 08):

```js
function outer() {
  const x = 10;

  return function inner() {
    console.log(x);  // inner's environment references outer's
  };
}
```

Module scope and block scope (`let`/`const`) each get their own lexical environment.

---

## 1.2. Memory & garbage collection

### 1.2.1. Stack vs heap

| Stack | Heap |
|-------|------|
| Fixed-size, fast | Larger, dynamic |
| Stores execution context frames, primitives (often) | Stores **objects**, functions, closures |
| LIFO — call stack | GC-managed |

```js
let n = 42;              // primitive — often stack-like
const user = { name: "Bharat" };  // object — heap; user holds reference
```

Variables hold **references** to heap values (File 01).

### 1.2.2. Garbage collection (GC)

JS engines **automatically reclaim** memory when values are **no longer reachable** from roots (global, call stack, registers).

**Mark-and-sweep** (simplified):

1. Start from roots — mark reachable objects.
2. Unmarked objects are collected.

```js
function makeUser() {
  const temp = { huge: new Array(1_000_000) };
  return { name: "Bharat" };
  // temp becomes unreachable after return — eligible for GC
}
```

You cannot manually free memory in JS (`delete` only removes object **properties**, not GC).

### 1.2.3. Memory leaks (common causes)

**Accidental globals:**

```js
function leak() {
  accidental = { data: [] };  // no var/let/const — global in sloppy mode
}
```

**Forgotten timers / listeners:**

```js
setInterval(() => { /* holds closure over bigData */ }, 1000);
// clearInterval(id) when done

element.addEventListener("click", handler);
// removeEventListener when component unmounts
```

**Closures holding large objects** longer than needed:

```js
function setup() {
  const huge = loadHugeCache();

  return function onClick() {
    // only needs huge.id but closes over entire huge
    console.log(huge.id);
  };
}
```

**Detached DOM nodes** — JS still references removed DOM elements.

**WeakMap / WeakSet** (File 11) — attach metadata without preventing GC.

### 1.2.4. Weak references (brief)

**`WeakRef`** and **`FinalizationRegistry`** — advanced, rare in app code — allow observing when objects are collected. Use when building caches with size limits in libraries.

---

## 1.3. Proxy & Reflect

**`Proxy`** wraps an object and **intercepts** operations (get, set, delete, etc.). **`Reflect`** provides methods matching proxy traps — default forwarding behavior.

### 1.3.1. Basic Proxy

```js
const target = { name: "Bharat", age: 30 };

const proxy = new Proxy(target, {
  get(obj, prop, receiver) {
    console.log(`GET ${String(prop)}`);
    return Reflect.get(obj, prop, receiver);
  },
  set(obj, prop, value, receiver) {
    console.log(`SET ${String(prop)} = ${value}`);
    return Reflect.set(obj, prop, value, receiver);
  },
});

proxy.name;       // logs GET name → "Bharat"
proxy.age = 31;   // logs SET age = 31
```

### 1.3.2. Common traps

| Trap | Intercepts |
|------|------------|
| `get` | Property read |
| `set` | Property write |
| `has` | `in` operator |
| `deleteProperty` | `delete` |
| `apply` | Function call |
| `construct` | `new` |

**Validation example:**

```js
const user = new Proxy({}, {
  set(obj, prop, value) {
    if (prop === "age" && typeof value !== "number") {
      throw new TypeError("age must be number");
    }
    obj[prop] = value;
    return true;
  },
});

user.age = 30;   // OK
// user.age = "30";  // TypeError
```

### 1.3.3. Reflect

`Reflect` methods mirror proxy traps and return sensible results:

```js
Reflect.get(user, "name");
Reflect.set(user, "name", "Dev");
Reflect.has(user, "name");
Reflect.deleteProperty(user, "temp");
```

Use **`Reflect`** inside traps instead of direct `obj[prop]` to avoid recursion and handle receiver/`this` correctly.

### 1.3.4. When to use Proxy

| Good use | Avoid |
|----------|-------|
| Library/framework internals (Vue 3 reactivity) | Everyday app objects |
| Validation / logging layers | Hot loops without profiling |
| Immutable-style wrappers | Replacing simple classes |

Proxies add overhead — powerful but not free.

---

## 1.4. Functional patterns

### 1.4.1. Pure functions & immutability

**Pure function** — same inputs → same output, no side effects (File 05):

```js
function add(a, b) {
  return a + b;
}

// Impure — mutates external state
let total = 0;
function addToTotal(n) {
  total += n;
}
```

**Immutability** — return new data instead of mutating:

```js
function addItem(cart, item) {
  return [...cart, item];  // new array
}

function updateUser(user, name) {
  return { ...user, name };  // new object
}
```

React and Redux-style state rely on immutability for change detection.

### 1.4.2. Currying

Transform **`f(a, b, c)`** into **`f(a)(b)(c)`** — partial application one arg at a time:

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...next) => curried(...args, ...next);
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply);
curriedMultiply(2)(3)(4);  // 24
curriedMultiply(2, 3)(4);  // 24
```

Useful for config presets and reusable handlers.

### 1.4.3. Function composition

Pipe output of one function into the next:

```js
const compose = (f, g) => (x) => f(g(x));
const pipe = (...fns) => (x) => fns.reduce((v, fn) => fn(v), x);

const double = (n) => n * 2;
const increment = (n) => n + 1;

const doubleThenInc = compose(increment, double);
doubleThenInc(5);  // 11

pipe(double, increment)(5);  // 11
```

Libraries: **Ramda**, **lodash/fp**.

### 1.4.4. Higher-order patterns recap

| Pattern | Idea |
|---------|------|
| Map/filter/reduce | Transform collections (File 06) |
| Factory functions | Return configured objects (File 08) |
| Middleware | `(next) => (action) => ...` |
| Decorators | Wrap behavior (stage 3 decorators in TS/legacy Babel) |

---

## 1.5. Utility patterns

### 1.5.1. Debounce

Run function **only after** calls **stop** for a delay — search input, resize:

```js
function debounce(fn, delayMs) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delayMs);
  };
}

const onSearch = debounce((query) => {
  fetchResults(query);
}, 300);

input.addEventListener("input", (e) => onSearch(e.target.value));
```

User types → wait 300ms idle → one API call.

### 1.5.2. Throttle

Run at most **once per interval** — scroll, mousemove:

```js
function throttle(fn, intervalMs) {
  let last = 0;

  return function (...args) {
    const now = Date.now();
    if (now - last >= intervalMs) {
      last = now;
      fn.apply(this, args);
    }
  };
}

const onScroll = throttle(() => {
  updateScrollIndicator();
}, 100);

window.addEventListener("scroll", onScroll);
```

| Debounce | Throttle |
|----------|----------|
| Wait for pause | Cap frequency |
| Search typing | Scroll / resize firehose |

### 1.5.3. Memoization

Cache function results by arguments (File 08):

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const slowSquare = memoize((n) => {
  // imagine expensive work
  return n * n;
});

slowSquare(5);  // computes
slowSquare(5);  // cached
```

Use **`Map`** when args are objects; consider cache size limits for production.

### 1.5.4. once

Run function only one time:

```js
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const init = once(() => {
  console.log("init");
  return { ready: true };
});

init();  // logs
init();  // silent — returns same result
```

---

## 1.6. Performance

### 1.6.1. How engines optimize (V8 basics)

Modern engines (V8 in Chrome/Node) use:

- **Parsing** → **AST** → **bytecode** (Ignition) → **optimized machine code** (TurboFan) for hot functions.
- **Inline caching** — speed up repeated property access shapes.
- **Hidden classes** — objects with same property order/layout optimize better.

```js
// Good — consistent shape
function Point(x, y) {
  this.x = x;
  this.y = y;
}

// Bad for IC — adding properties in random order on different objects
const a = { x: 1 };
const b = { y: 2, x: 1 };
```

Details are engine-specific — **measure**, don't guess.

### 1.6.2. When to optimize

1. **Make it work** — correct, readable code.
2. **Measure** — DevTools Performance, `console.time`, benchmarks.
3. **Optimize hot paths** — loops over huge arrays, render-critical UI.
4. **Avoid premature optimization.**

### 1.6.3. Common pitfalls

| Pitfall | Better approach |
|---------|-----------------|
| DOM thrashing — read/write layout in loop | Batch reads, then writes |
| Creating functions in hot loops | Define outside or reuse |
| `+=` on strings in tight loop | Array + `join` for many parts |
| Deep clone everywhere | Shallow copy + targeted updates |
| Sync JSON parse of huge payload | Stream, chunk, or Web Worker |
| Blocking main thread | `async`, Workers, `requestIdleCallback` |

```js
// String building
let s = "";
for (let i = 0; i < 10000; i++) s += i;  // slow — many allocations

const parts = [];
for (let i = 0; i < 10000; i++) parts.push(i);
const fast = parts.join("");
```

### 1.6.4. Micro-optimizations that rarely matter

- `for` vs `forEach` vs `for...of` on small arrays — readability first.
- Manual loop unrolling — engine often does it.
- Avoiding `try/catch` in inner loops — optimize only if profiler shows cost.

Focus on **algorithm choice** (O(n²) → O(n)), **network**, and **bundle size** before micro-tuning.

---

## 1.7. Strict mode

**`"use strict"`** enables stricter parsing and runtime errors — catches silent bugs.

### 1.7.1. How to enable

```js
"use strict";

function strictFn() {
  // whole function strict
}

// ES modules are strict by default
```

### 1.7.2. Behavior changes

| Sloppy | Strict |
|--------|--------|
| Assign to undeclared variable → global | `ReferenceError` |
| Duplicate param names allowed | `SyntaxError` |
| `delete` undeletable prop → silent false | `TypeError` in some cases |
| `this` in plain call → `window` | `undefined` |
| `with` statement | SyntaxError |
| Octal literals `012` | SyntaxError (use `0o12`) |

```js
"use strict";

function show() {
  console.log(this);  // undefined — not window
}

show();

// mistype = 1;  // ReferenceError
```

### 1.7.3. Why use strict

- Safer refactoring — typos throw instead of creating globals.
- Required baseline for **classes** and **modules**.
- Matches modern tooling defaults (bundlers, TypeScript emit).

Always write new code in **strict** contexts (modules or `"use strict"`).

---

## 1.8. Common questions

**1.8.1. What is an execution context?**  
A: The environment for running a piece of JS — includes variable bindings, `this`, and the outer scope link. Created for global/module code and each function call.

**1.8.2. What is the difference between the call stack and the heap?**  
A: The **call stack** tracks active function contexts (LIFO). The **heap** stores objects and other dynamic data referenced from the stack.

**1.8.3. How does garbage collection work in JavaScript?**  
A: Engines trace **reachable** objects from roots and reclaim unreachable memory. You do not manually free memory.

**1.8.4. What causes memory leaks in JS?**  
A: Common causes: accidental globals, uncleared timers/listeners, closures holding large unused data, and detached DOM nodes still referenced from JS.

**1.8.5. What is a Proxy?**  
A: A wrapper that intercepts operations on an object (get, set, etc.) via **traps**. Used in frameworks for reactivity and validation.

**1.8.6. What is the difference between debounce and throttle?**  
A: **Debounce** waits for a **pause** in events then runs once. **Throttle** runs at most **once per time window** during continuous events.

**1.8.7. What is currying?**  
A: Transforming a multi-argument function into a chain of functions each taking one (or fewer) arguments — enables partial application.

**1.8.8. What does strict mode do?**  
A: Turns silent errors into **exceptions**, disables some unsafe features (`with`, implicit globals), and makes `this` **`undefined`** in plain function calls.

**1.8.9. When should you optimize JavaScript performance?**  
A: After **measuring** a real bottleneck — hot loops, large data, UI jank, or slow API paths. Prefer better algorithms and architecture before micro-optimizations.

**1.8.10. What is memoization?**  
A: Caching a function's **return values** by input arguments to avoid recomputing expensive work. Trade memory for speed.
