# 10. Async & Event Loop

> File 10 — asynchronous JavaScript and execution order.

JavaScript runs on a **single thread** — one call stack executes one piece of code at a time. **Asynchronous** work (timers, network, I/O) is handled by the **host environment** (browser, Node.js), which queues **callbacks** for later. The **event loop** decides when those callbacks run.

Modern async code uses **Promises** and **`async`/`await`**. Callbacks remain in older APIs and under the hood.

**Default rule today:** prefer **`async`/`await`** with **`try/catch`**; use **`Promise.all`** for parallel independent tasks; understand **microtasks vs macrotasks** for debugging order bugs.

---

## 1. Sync vs async

### 1.1. Synchronous execution

**Synchronous** code runs line by line. Each line **blocks** until the current operation finishes:

```js
console.log("A");
console.log("B");
console.log("C");
// A, B, C — in order
```

Long-running sync work **freezes** the thread — no other JS runs (bad for UI):

```js
// Don't do this in the browser main thread
function block(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}

console.log("start");
block(3000);
console.log("end");  // 3 seconds later — page frozen
```

### 1.2. Asynchronous execution

**Asynchronous** code **starts** an operation and continues without waiting for it to finish. A **callback** or **Promise** handles the result later:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");
// A, C, B — B runs after sync code finishes
```

Async does not mean **parallel threads** in JS itself — it means **deferring** work and resuming via the event loop.

### 1.3. When async is used

| Source | Example API |
|--------|-------------|
| Timers | `setTimeout`, `setInterval` |
| Network | `fetch`, `XMLHttpRequest` |
| User events | click, input handlers |
| I/O (Node) | `fs.readFile`, database drivers |
| Promises | `Promise`, `async`/`await` |

```js
fetch("https://api.example.com/user")
  .then((res) => res.json())
  .then((user) => console.log(user.name));

console.log("request sent");  // runs before response arrives
```

---

## 2. Callbacks

A **callback** is a function passed to another function to run **later** (File 05).

### 2.1. Basic callback pattern

```js
function loadData(callback) {
  setTimeout(() => {
    callback(null, { id: 1, name: "Bharat" });
  }, 100);
}

loadData((err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.name);
});
```

### 2.2. Error-first callbacks (Node style)

Convention: first argument is **`err`**, second is **result**:

```js
function divide(a, b, callback) {
  if (b === 0) {
    callback(new Error("Division by zero"));
    return;
  }
  callback(null, a / b);
}

divide(10, 2, (err, result) => {
  if (err) throw err;
  console.log(result);  // 5
});
```

Always check **`err`** before using `result`.

### 2.3. Callback hell

Nested callbacks become hard to read and error-prone:

```js
getUser(1, (err, user) => {
  if (err) return handle(err);
  getOrders(user.id, (err, orders) => {
    if (err) return handle(err);
    getDetails(orders[0].id, (err, details) => {
      if (err) return handle(err);
      console.log(details);
    });
  });
});
```

Problems:

- Deep nesting ("pyramid of doom")
- Duplicate error handling
- Hard to compose sequential steps

**Promises** and **`async`/`await`** flatten this structure.

### 2.4. Callbacks today

Still used in:

- Legacy Node APIs (`fs.readFile(path, cb)`)
- Event listeners (`button.addEventListener("click", handler)`)
- Third-party libraries

Prefer **Promise-based** APIs or **`util.promisify`** (Node) / wrappers when available.

---

## 3. Promises

A **Promise** represents a value that may be available **now**, **later**, or **never** (error).

### 3.1. Promise states

| State | Meaning |
|-------|---------|
| **pending** | Initial — neither fulfilled nor rejected |
| **fulfilled** | Operation succeeded — has a value |
| **rejected** | Operation failed — has a reason (error) |

Once settled (fulfilled or rejected), a Promise **cannot change** state.

```js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 100);
});

p.then((value) => console.log(value));  // "done"
```

### 3.2. Creating Promises

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (!id) {
      reject(new Error("Invalid id"));
      return;
    }
    resolve({ id, name: "Bharat" });
  });
}
```

Wrap callback APIs:

```js
function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

### 3.3. then, catch, finally

```js
fetchUser(1)
  .then((user) => {
    console.log(user.name);
    return user.id;
  })
  .then((id) => console.log("id:", id))
  .catch((err) => {
    console.error("Failed:", err.message);
  })
  .finally(() => {
    console.log("Cleanup — runs either way");
  });
```

- **`then`** — on fulfillment; can return value or new Promise (chained).
- **`catch`** — on rejection anywhere in chain.
- **`finally`** — always runs; does not receive result (use for cleanup).

Returning inside `then` passes to next `then`:

```js
Promise.resolve(2)
  .then((n) => n * 2)
  .then((n) => n + 1)
  .then(console.log);  // 5
```

### 3.4. Promise chaining and errors

Rejected Promise skips to nearest **`catch`**:

```js
Promise.resolve()
  .then(() => {
    throw new Error("oops");
  })
  .then(() => {
    console.log("skipped");
  })
  .catch((err) => console.log(err.message));  // "oops"
```

Return **`Promise.reject(err)`** or **throw** inside `then` to reject.

### 3.5. Static helpers

**`Promise.all`** — wait for **all**; fails fast on **first rejection**:

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);

Promise.all([p1, p2]).then(([a, b]) => {
  console.log(a, b);  // 1 2
});

Promise.all([p1, Promise.reject("fail")]).catch(console.log);  // "fail"
```

**`Promise.allSettled`** — wait for all; never short-circuits:

```js
Promise.allSettled([
  Promise.resolve("ok"),
  Promise.reject("err"),
]).then((results) => {
  // [
  //   { status: "fulfilled", value: "ok" },
  //   { status: "rejected", reason: "err" }
  // ]
});
```

**`Promise.race`** — first settled (fulfill or reject) wins:

```js
Promise.race([
  delay(200).then(() => "slow"),
  delay(50).then(() => "fast"),
]).then(console.log);  // "fast"
```

**`Promise.any`** — first **fulfillment** wins; rejects only if **all** reject:

```js
Promise.any([
  Promise.reject("a"),
  Promise.resolve("b"),
]).then(console.log);  // "b"
```

**`Promise.resolve` / `Promise.reject`** — wrap values:

```js
Promise.resolve(42);
Promise.reject(new Error("fail"));
```

---

## 4. async / await

**`async`/`await`** is syntactic sugar over Promises — write async code that **looks** synchronous.

### 4.1. async functions

An **`async` function** always returns a **Promise**:

```js
async function greet() {
  return "Hello";
}

greet().then(console.log);  // "Hello"

async function fail() {
  throw new Error("bad");
}

fail().catch((err) => console.log(err.message));  // "bad"
```

### 4.2. await

**`await`** pauses **inside the async function** until the Promise settles, then gives the value (or throws on reject):

```js
async function loadUser() {
  const user = await fetchUser(1);
  console.log(user.name);
}

loadUser();
```

`await` only works inside **`async`** functions (or top-level in modules).

```js
async function example() {
  const result = await delay(100).then(() => "ready");
  return result;
}
```

### 4.3. Error handling

**try/catch** with await:

```js
async function loadUser(id) {
  try {
    const user = await fetchUser(id);
    return user;
  } catch (err) {
    console.error("Load failed:", err.message);
    throw err;  // rethrow if caller should handle
  }
}
```

Unhandled rejection if async function throws without catch:

```js
async function oops() {
  await Promise.reject(new Error("fail"));
}

oops();  // UnhandledPromiseRejection — always catch at boundary
```

### 4.4. Sequential vs parallel

**Sequential** — one after another (slower when independent):

```js
async function sequential() {
  const a = await fetchA();  // wait
  const b = await fetchB();  // then wait
  return [a, b];
}
```

**Parallel** — start together, await all:

```js
async function parallel() {
  const [a, b] = await Promise.all([fetchA(), fetchB()]);
  return [a, b];
}
```

Common mistake — sequential when parallel was intended:

```js
// Slow — B waits for A even if independent
const a = await fetchA();
const b = await fetchB();

// Fast — both start immediately
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

Start promises **before** await when batching:

```js
const pA = fetchA();
const pB = fetchB();
const a = await pA;
const b = await pB;
// Both already in flight
```

### 4.5. await in loops

**Sequential loop:**

```js
async function processAll(items) {
  for (const item of items) {
    await processItem(item);  // one at a time
  }
}
```

**Parallel loop** (careful with load):

```js
async function processAllParallel(items) {
  await Promise.all(items.map((item) => processItem(item)));
}
```

Choose based on rate limits and whether order matters.

---

## 5. Event loop

The **event loop** coordinates the **call stack**, **Web APIs** (or Node libuv), and **task queues**.

### 5.1. Call stack

The **call stack** runs synchronous function calls — LIFO (last in, first out):

```js
function c() { console.log("c"); }
function b() { c(); }
function a() { b(); }

a();  // stack: a → b → c → pop c → pop b → pop a
```

Stack overflow — too many nested calls:

```js
function recurse() {
  recurse();
}
// recurse();  // RangeError: Maximum call stack size exceeded
```

### 5.2. Macrotasks vs microtasks

When async work completes, callbacks enter **queues**:

| Queue | Examples | Runs |
|-------|----------|------|
| **Microtask** | `Promise.then`, `queueMicrotask`, `MutationObserver` | After current sync code, **before** next macrotask |
| **Macrotask** (task) | `setTimeout`, `setInterval`, I/O, UI events | One per event loop turn (simplified) |

**Order rule (simplified):**

1. Run sync code until call stack is empty.
2. Drain **all** microtasks.
3. Run **one** macrotask.
4. Repeat from step 2.

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");

// 1, 4, 3, 2
```

Walkthrough:

- `1`, `4` — sync
- Microtask: `3` — Promise `then`
- Macrotask: `2` — `setTimeout`

### 5.3. Classic interview example

```js
console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => console.log("promise1"))
  .then(() => console.log("promise2"));

console.log("end");

// start, end, promise1, promise2, timeout
```

Nested microtasks run before the next macrotask:

```js
setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => {
  console.log("p1");
  Promise.resolve().then(() => console.log("p2"));
});

// p1, p2, timeout
```

### 5.4. async/await and microtasks

**`await`** splits function execution — code after `await` runs as a **microtask**:

```js
async function async1() {
  console.log("A");
  await async2();
  console.log("B");
}

async function async2() {
  console.log("C");
}

console.log("D");
async1();
console.log("E");

// D, A, C, E, B
```

`await async2()` runs until `async2` hits its end, then yields; `E` runs; then `B` as microtask.

### 5.5. Node vs browser (brief)

Same core model; differences in details:

- Node has **`process.nextTick`** — runs **before** other microtasks (Node-specific).
- Browser has **rendering** between frames — long microtask chains can block paint.
- **`setImmediate`** (Node) vs **`setTimeout(0)`** ordering differs in Node.

For interviews and app code, **sync → microtasks → macrotask** is the essential model.

---

## 6. Common questions

**6.1. Is JavaScript multithreaded?**  
A: **No** for your JS code on one thread — one call stack. Async uses the **event loop** and host APIs. **Web Workers** / **Worker threads** (Node) are separate threads with message passing.

**6.2. What is the difference between sync and async?**  
A: **Sync** blocks until done. **Async** starts work and continues; a callback or Promise delivers the result later via the event loop.

**6.3. What is callback hell?**  
A: Deeply nested callbacks for sequential async steps — hard to read and error-handle. Fixed with Promises and `async`/`await`.

**6.4. What are the three Promise states?**  
A: **pending**, **fulfilled**, and **rejected**. Settled means fulfilled or rejected — no further change.

**6.5. What does `async` function return?**  
A: Always a **Promise**. Returning a value wraps it in `Promise.resolve`; throwing rejects the Promise.

**6.6. What is the difference between `Promise.all` and `Promise.race`?**  
A: **`all`** waits for every Promise to fulfill (or fails on first reject). **`race`** settles when the **first** Promise settles (fulfill or reject).

**6.7. Why does `setTimeout(fn, 0)` not run immediately?**  
A: It schedules a **macrotask**. Sync code and **microtasks** (e.g. Promise callbacks) run first.

**6.8. What runs first — `Promise.then` or `setTimeout`?**  
A: **`Promise.then`** (microtask) runs before **`setTimeout`** (macrotask) after the current synchronous code completes.

**6.9. How do you run two independent async operations in parallel?**  
A: Start both without awaiting immediately, then `await Promise.all([p1, p2])`, or assign both to promises first then await each.

**6.10. What is the event loop?**  
A: The mechanism that takes callbacks from task queues and pushes them onto the call stack when the stack is empty — interleaving async work with synchronous JS execution.
