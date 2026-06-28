# 11. ES6+ Features

> File 11 — modern JavaScript language features.

ES6 (2015) and later releases added **modules**, **new collections**, **`Symbol`**, **iterators/generators**, and syntax sugar that is now standard in modern codebases. Many features overlap with earlier files — this chapter ties them together as the **modern JS toolkit**.

**Default rule today:** use **ES modules** (`import`/`export`), **`Map`/`Set`** when keys or uniqueness matter, **`for...of`** on iterables, **`?.`** and **`??`** for safe access, and **generators** only when lazy sequences or custom iteration pay off.

---

## 1. Modules (ESM)

**ES modules (ESM)** split code into files with explicit **imports** and **exports**. Each module has its own **scope** — no global pollution (File 02).

### 1.1. Named exports

Export multiple bindings by name:

```js
// math.js
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

```js
// app.js
import { PI, add } from "./math.js";

console.log(PI);
console.log(add(2, 3));
```

Rename on import:

```js
import { add as sum } from "./math.js";
```

Export list after declaration:

```js
function multiply(a, b) {
  return a * b;
}

export { multiply };
```

### 1.2. Default export

One **default** export per module — importers choose the local name:

```js
// user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}
```

```js
import User from "./user.js";
import AnyName from "./user.js";  // same default

const u = new User("Bharat");
```

Mix default and named:

```js
// api.js
export default function fetchData() { /* ... */ }
export const API_URL = "https://api.example.com";
```

```js
import fetchData, { API_URL } from "./api.js";
```

### 1.3. Import rules and patterns

```js
// Side-effect only — runs module init code
import "./polyfills.js";

// Namespace import — all exports as object
import * as math from "./math.js";
math.add(1, 2);

// Re-export
export { add, subtract } from "./math.js";
export { default as User } from "./user.js";
```

Module behavior:

- **`import`** is **hoisted** (bindings live before run, TDZ until init).
- **Strict mode** by default in modules.
- **Top-level `await`** allowed in ES modules (async module init).

File extensions in browsers often require **`.js`** explicitly. Bundlers (Vite, webpack) resolve paths.

### 1.4. Dynamic `import()`

Load a module **at runtime** — returns a **Promise**:

```js
button.addEventListener("click", async () => {
  const module = await import("./heavy-chart.js");
  module.renderChart();
});
```

Use for **code splitting**, lazy routes, conditional features (File 10):

```js
if (featureFlags.newEditor) {
  const { Editor } = await import("./Editor.js");
  new Editor();
}
```

`import()` does not hoist — runs when called.

### 1.5. ESM vs CommonJS (brief)

| ESM | CommonJS (Node legacy) |
|-----|------------------------|
| `import` / `export` | `require()` / `module.exports` |
| Static structure, tree-shakeable | Dynamic `require` common |
| Browser native + modern Node | Older Node packages |

Modern Node supports ESM with `"type": "module"` in `package.json` or `.mjs` extension.

---

## 2. Collections

Objects use **string/symbol** keys and inherit from `Object.prototype`. **`Map`** and **`Set`** are dedicated collections with different semantics.

### 2.1. Map

**Any value** as key (objects, functions), **insertion order**, **`size`** property:

```js
const map = new Map();

map.set("name", "Bharat");
map.set(42, "number key");
map.set({ id: 1 }, "object key");

map.get("name");     // "Bharat"
map.has(42);         // true
map.size;            // 3

map.delete(42);
map.clear();         // remove all
```

Iterate:

```js
const userMap = new Map([["a", 1], ["b", 2]]);

for (const [key, value] of userMap) {
  console.log(key, value);
}

userMap.keys();
userMap.values();
userMap.entries();
```

| Use `Map` | Use object |
|-----------|------------|
| Non-string keys | JSON-serializable string keys |
| Frequent add/delete | Record / DTO shape |
| Need `.size` | Prototype methods OK (`toString`) |

Convert:

```js
const obj = Object.fromEntries(map);
const map2 = new Map(Object.entries(obj));
```

### 2.2. Set

**Unique values** — duplicates ignored:

```js
const set = new Set([1, 2, 2, 3]);
console.log(set.size);  // 3

set.add(4);
set.has(2);    // true
set.delete(1);

for (const value of set) {
  console.log(value);
}
```

Dedupe array:

```js
const unique = [...new Set([1, 2, 2, 3])];  // [1, 2, 3]
```

### 2.3. WeakMap and WeakSet

**Weak** references — keys (WeakMap) or values (WeakSet) must be **objects**, and entries can be **garbage-collected** when no other references exist:

```js
const wm = new WeakMap();
const obj = { id: 1 };

wm.set(obj, "metadata");
wm.get(obj);  // "metadata"

// When obj is dropped, entry may disappear — no size, not iterable
```

| | Map / Set | WeakMap / WeakSet |
|---|-----------|-------------------|
| Keys / values | Any / any | Objects only |
| Iterable | Yes | No |
| `size` | Yes (Map/Set) | No |
| GC | Holds strongly | Weak — good for caches attached to DOM nodes |

Use **WeakMap** for private metadata on objects without preventing GC (File 12).

---

## 3. Symbol & iterators

### 3.1. Symbol (File 01 recap)

**Unique** primitive — every `Symbol()` is distinct:

```js
const id = Symbol("id");
const id2 = Symbol("id");

id === id2;  // false

const user = {
  name: "Bharat",
  [id]: 12345,
};

user[id];  // 12345
Object.keys(user);  // ["name"] — symbol not listed
```

**Well-known symbols** — customize language behavior:

```js
const arr = [1, 2, 3];

arr[Symbol.iterator];  // default array iterator

const obj = {
  data: [10, 20],
  [Symbol.iterator]() {
    let i = 0;
    const data = this.data;
    return {
      next() {
        if (i < data.length) {
          return { value: data[i++], done: false };
        }
        return { done: true };
      },
    };
  },
};

for (const n of obj) {
  console.log(n);  // 10, 20
}
```

Others: `Symbol.toStringTag`, `Symbol.hasInstance`, `Symbol.asyncIterator`.

### 3.2. Iterable protocol

An object is **iterable** if it has **`Symbol.iterator`** — a function returning an **iterator**:

```js
// Iterator result shape
{ value: any, done: boolean }
```

Built-in iterables: **Array**, **String**, **Map**, **Set**, **arguments**, **NodeList**, generator objects.

```js
const str = "hi";
const iterator = str[Symbol.iterator]();

iterator.next();  // { value: "h", done: false }
iterator.next();  // { value: "i", done: false }
iterator.next();  // { done: true }
```

### 3.3. Consumption of iterables

**`for...of`** (File 04):

```js
for (const char of "abc") { }
for (const [k, v] of map) { }
```

**Spread** and **rest**:

```js
[... "hi"];           // ["h", "i"]
[...new Set([1, 1])]; // [1]

function sum(...nums) { }
```

**Destructuring**:

```js
const [a, b] = [1, 2];
```

**`Array.from(iterable)`**:

```js
Array.from("hello");  // ["h","e","l","l","o"]
```

---

## 4. Generators

**Generator functions** (`function*`) return an **iterator** that can **pause** with **`yield`**.

### 4.1. Basic syntax

```js
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = countUp();

gen.next();  // { value: 1, done: false }
gen.next();  // { value: 2, done: false }
gen.next();  // { value: 3, done: false }
gen.next();  // { done: true }
```

Generators are **iterable** — work with `for...of`:

```js
for (const n of countUp()) {
  console.log(n);  // 1, 2, 3
}
```

### 4.2. yield expression

`yield` produces a value **and** can receive input on next `.next(arg)`:

```js
function* gen() {
  const a = yield 1;
  const b = yield a + 2;
  return b;
}

const g = gen();
g.next();      // { value: 1, done: false }
g.next(10);    // { value: 12, done: false } — 10 + 2
g.next(20);    // { value: 20, done: true }
```

**`yield*`** delegates to another iterable:

```js
function* combined() {
  yield* [1, 2];
  yield* "ab";
}

[...combined()];  // [1, 2, "a", "b"]
```

### 4.3. Use cases

**Lazy sequences** — generate on demand:

```js
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const n of range(1, 1_000_000)) {
  if (n > 5) break;  // only computed until break
}
```

**Custom iteration** — complex data structures.

**Async generators** (`async function*`) — async iteration with `for await...of` (File 10):

```js
async function* fetchPages(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    yield res.json();
  }
}
```

Avoid generators when a simple array or async function suffices — adds mental overhead.

---

## 5. Modern syntax

### 5.1. Template literals

Strings with **interpolation** and multiline (File 01):

```js
const name = "Bharat";
const msg = `Hello, ${name}!`;

const html = `
  <div>
    <p>${name}</p>
  </div>
`;
```

**Tagged templates** — function processes string parts and values:

```js
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i] ?? "";
    return acc + str + (val ? `<mark>${val}</mark>` : "");
  }, "");
}

const name = "Bharat";
highlight`Hello, ${name}!`;
// "Hello, <mark>Bharat</mark>!"
```

Used in libraries (styled-components, Lit HTML).

### 5.2. Optional chaining (`?.`)

Short-circuit access when intermediate value is **`null`** or **`undefined`** (File 03, File 07):

```js
const user = { profile: { city: "Pune" } };

user?.profile?.city;     // "Pune"
user?.address?.city;     // undefined — no error

const fn = user?.greet?.();
arr?.[0];
obj?.[dynamicKey];
```

Does not catch all errors — only **nullish** base:

```js
const bad = { fn: "not a function" };
// bad.fn?.();  // OK — optional call skipped if not function? 
// Actually: bad.fn?.() tries to call string — TypeError if fn exists but isn't callable
// Optional CALL only skips if fn is null/undefined
```

### 5.3. Nullish coalescing (`??`)

Default when value is **`null`** or **`undefined`** only (File 03):

```js
const count = 0;
count ?? 10;   // 0 — kept

const name = "";
name ?? "Guest";  // "" — kept

const missing = null;
missing ?? "Guest";  // "Guest"
```

Cannot mix with `&&` / `||` without parentheses:

```js
// a ?? b || c;  // SyntaxError
(a ?? b) || c;
```

### 5.4. Other modern syntax (quick reference)

| Feature | Example | Notes |
|---------|---------|-------|
| Logical assignment | `a ??= 1`, `\|\|=`, `&&=` | File 03 |
| Private fields | `#field` | File 09 |
| Static blocks | `static { }` | Class init |
| Top-level await | `await fetch()` | Modules only |
| Numeric separators | `1_000_000` | Readability |
| `globalThis` | Cross-env global | Browser/Node |

```js
class Config {
  static {
    this.defaults = { timeout: 5000 };
  }
}

const million = 1_000_000;
```

---

## 6. Common questions

**6.1. What is the difference between default and named exports?**  
A: **Named** exports must be imported by `{ name }` (or renamed). **Default** export allows `import Anything from "./module.js"` — one default per module.

**6.2. When should I use `Map` instead of a plain object?**  
A: When keys are **not strings**, you need **insertion order** guarantees with non-integer keys, frequent **size** checks, or frequent add/delete without prototype noise.

**6.3. What is the difference between `Set` and array `filter` for uniqueness?**  
A: **`Set`** enforces uniqueness on every **`add`**. **`[...new Set(arr)]`** dedupes an existing array. Set also offers O(1) **`has`** checks.

**6.4. What is `Symbol` used for?**  
A: **Unique property keys** that won't collide with string keys, and **well-known symbols** (`Symbol.iterator`, etc.) to hook into language features.

**6.5. What makes an object iterable?**  
A: It implements **`Symbol.iterator`** — a method returning an iterator with **`next()`** returning `{ value, done }`.

**6.6. What is a generator?**  
A: A function (`function*`) that can **pause** with **`yield`** and resume later, producing an iterable iterator. Useful for lazy sequences and custom iteration.

**6.7. What is the difference between `?.` and `&&` for safe access?**  
A: **`?.`** stops on **`null`/`undefined`** only. **`&&`** stops on **any falsy** value (`0`, `""`, `false`), which may hide valid data.

**6.8. What is dynamic `import()`?**  
A: Runtime module loading that returns a **Promise** — enables code splitting and conditional imports unlike static `import` at top of file.

**6.9. What is the difference between `WeakMap` and `Map`?**  
A: **WeakMap** keys must be objects, holds **weak** references (GC-friendly), is **not iterable**, and has **no `size`**. **Map** holds keys strongly and supports full iteration.

**6.10. Can I use `import` and `require` in the same file?**  
A: In modern projects, pick **one** system per file. Mixing ESM and CommonJS depends on bundler/Node config — avoid in application code when possible.
