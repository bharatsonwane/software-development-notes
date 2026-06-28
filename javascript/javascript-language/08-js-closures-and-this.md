# 08. Closures & this

> File 08 — lexical scope, closures, and dynamic this binding.

**Closures** and **`this`** are two of the most important behavior topics in JavaScript — and two of the most misunderstood.

A **closure** happens when a function remembers variables from the scope where it was **created** (lexical scope, File 02). **`this`** is different — it is set by **how a function is called**, not where it is written (except arrow functions).

**Default rule today:** use closures for **private state** and **factories**; use **regular methods** when you need `this` on objects; use **arrows** for callbacks that should keep outer `this`; use **`bind`** when passing methods as handlers.

---

## 1. Closures

### 1.1. Lexical scope recap

Inner functions can read variables from outer scopes. The lookup chain is fixed at **write time**:

```js
const outer = "global";

function outerFn() {
  const middle = "middle";

  function innerFn() {
    console.log(outer, middle);  // sees both
  }

  return innerFn;
}

const fn = outerFn();
fn();  // "global" "middle" — even after outerFn finished
```

See File 02, section 2.4 for the scope chain.

### 1.2. What is a closure?

A **closure** is a function plus the **reference to its surrounding lexical environment** (variables from outer scopes that are still "alive").

```js
function makeGreeter(greeting) {
  return function (name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHi = makeGreeter("Hi");
const sayHello = makeGreeter("Hello");

sayHi("Bharat");     // "Hi, Bharat!"
sayHello("Bharat");  // "Hello, Bharat!"
```

`makeGreeter` returns — but the inner function still closes over `greeting`. Each call to `makeGreeter` creates a **new** closure with its own `greeting`.

Every function in JS that references outer variables forms a closure — not only returned inner functions.

### 1.3. Closure use cases

**Private state / encapsulation:**

```js
function createCounter(start = 0) {
  let count = start;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter(10);
counter.increment();  // 11
counter.getCount();   // 11
// count — not accessible from outside
```

**Function factories:**

```js
function multiplyBy(factor) {
  return (n) => n * factor;
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

double(5);  // 10
triple(5);  // 15
```

**Callbacks and event handlers** — closures capture context (File 05, File 10):

```js
function setupButton(label) {
  const button = { label, clicks: 0 };

  return function handleClick() {
    button.clicks++;
    console.log(`${button.label}: ${button.clicks}`);
  };
}
```

**Memoization** — cache inside closure:

```js
function memoize(fn) {
  const cache = {};

  return function (key) {
    if (key in cache) return cache[key];
    cache[key] = fn(key);
    return cache[key];
  };
}
```

### 1.4. Common closure bugs

**Loop with `var`** — one shared binding (File 02, File 04):

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 3, 3, 3
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 0, 1, 2
}
```

**Stale closure in React-style patterns** — inner function sees old state if not updated:

```js
function makeLogger() {
  let value = 0;

  return {
    set(v) { value = v; },
    log() { console.log(value); },
  };
}

const logger = makeLogger();
logger.set(5);
logger.log();  // 5 — OK when using shared mutable binding
```

**Memory** — closures keep outer variables alive. Holding large objects in closures when only a small field is needed can prevent garbage collection.

---

## 2. IIFE

An **IIFE** (Immediately Invoked Function Expression) is a function that runs **right after** it is defined.

### 2.1. Syntax

```js
(function () {
  console.log("runs once");
})();

(function (name) {
  console.log(`Hello, ${name}`);
})("Bharat");

// Arrow IIFE
(() => {
  console.log("arrow IIFE");
})();
```

Wrap in parentheses so the parser treats it as an expression, not a declaration.

### 2.2. Why IIFEs were used

**Private scope** before block-scoped `let`/`const` was common:

```js
var app = (function () {
  var secret = "hidden";

  return {
    getSecret() {
      return secret;
    },
  };
})();

app.getSecret();  // "hidden"
// secret — not in global scope
```

**Avoid polluting global** — wrap script in IIFE so locals stay local.

**Loop closures with `var`** (legacy pattern):

```js
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 0);
  })(i);
}
// 0, 1, 2 — IIFE captures copy of i per iteration
```

### 2.3. IIFE today

With **`let`/`const`** blocks and modules (File 11), IIFEs are less common. Still useful for:

- One-time initialization
- Isolating legacy scripts
- Quick scope in snippets

Prefer **block scope** or **modules** for new code:

```js
{
  const temp = computeSomething();
  use(temp);
}
// temp not visible here
```

### 2.4. Revealing module pattern

Expose a **public API** while keeping internals private via closure:

```js
const counterModule = (function () {
  let count = 0;  // private

  function increment() { count += 1; }
  function getCount() { return count; }

  return { increment, getCount };  // reveal public methods
})();

counterModule.increment();
console.log(counterModule.getCount());  // 1
// count is not accessible from outside
```

ES modules (`export` / `import`, File 11) replace this pattern in modern code.

---

## 3. `this` binding

### 3.1. What is `this`?

**`this`** is a special reference inside functions. Its value depends on **call site** (how the function is invoked), not where the function is defined — except for **arrow functions**.

```js
function show() {
  console.log(this);
}

show();  // depends on strict mode / environment
```

### 3.2. Default binding

Standalone function call — `this` is **`undefined`** in strict mode, or the **global object** (`window` in browsers) in sloppy mode:

```js
"use strict";

function fn() {
  console.log(this);
}

fn();  // undefined
```

```js
// sloppy mode (non-module script)
function fn() {
  console.log(this === window);  // true in browser
}
fn();
```

### 3.3. Implicit binding

When called as **`obj.method()`**, `this` is **`obj`**:

```js
const user = {
  name: "Bharat",
  greet() {
    console.log(this.name);
  },
};

user.greet();  // "Bharat" — this === user
```

**Lost `this`** — method extracted from object:

```js
const greet = user.greet;
greet();  // undefined — default binding, not user

const other = { name: "Dev", greet: user.greet };
other.greet();  // "Dev" — this === other
```

**Event handler `this`** — classic DOM: `this` is the **element** (File 15). Arrow handlers use **lexical** `this` instead.

**Nested function** — inner call does not inherit outer `this`:

```js
const user = {
  name: "Bharat",
  greet() {
    function inner() {
      console.log(this.name);  // not user!
    }
    inner();
  },
};

user.greet();  // undefined (strict) or global name
```

### 3.4. Explicit binding

Set `this` with **`call`**, **`apply`**, or **`bind`** (section 4):

```js
function greet() {
  console.log(this.name);
}

const user = { name: "Bharat" };

greet.call(user);  // "Bharat"
```

### 3.5. `new` binding

With **`new`**, `this` is a **new empty object** that becomes the instance:

```js
function User(name) {
  this.name = name;
}

const u = new User("Bharat");
console.log(u.name);  // "Bharat"
```

If the constructor returns a plain object, that object replaces the default `this` (rare pattern). File 09 covers constructors and classes.

### 3.6. Binding priority (highest wins)

When multiple rules apply:

1. **`new` binding** — `new fn()`
2. **Explicit** — `call` / `apply` / `bind`
3. **Implicit** — `obj.fn()`
4. **Default** — bare `fn()`

```js
function fn() {
  console.log(this.x);
}

const a = { x: 1 };
const b = { x: 2 };

fn.call(a);           // 1 — explicit beats default
a.fn();               // 1 — implicit
const bound = fn.bind(b);
bound.call(a);        // 2 — bind beats call on bound function
```

---

## 4. call, apply, bind

All three set **`this`** for a function. They differ in **invocation** and **arguments**.

### 4.1. call

Invoke **immediately** with `this` and **comma-separated** arguments:

```js
function greet(greeting, punct) {
  console.log(`${greeting}, ${this.name}${punct}`);
}

const user = { name: "Bharat" };

greet.call(user, "Hello", "!");  // "Hello, Bharat!"
```

Borrow a method from another object:

```js
const nums = { 0: "a", 1: "b", length: 2 };
Array.prototype.push.call(nums, "c");
// nums-like object now has "c" pushed
```

### 4.2. apply

Same as `call`, but arguments as an **array** (or array-like):

```js
greet.apply(user, ["Hi", "."]);  // "Hi, Bharat."

const numbers = [5, 2, 9, 1];
Math.max.apply(null, numbers);   // 9 — legacy pattern
Math.max(...numbers);            // 9 — prefer spread today
```

`apply` is mostly legacy; **`call`** + spread replaced most uses.

### 4.3. bind

Returns a **new function** with `this` permanently fixed (and optionally partial arguments):

```js
const user = { name: "Bharat" };

function greet() {
  console.log(this.name);
}

const boundGreet = greet.bind(user);
boundGreet();  // "Bharat" — even as callback

setTimeout(user.greet.bind(user), 100);  // fix lost this
```

**Partial application:**

```js
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);
double(5);  // 10
```

`bind` with `new` — bound `this` is ignored when using `new` on the bound function (edge case for interviews).

### 4.4. When to use which

| API | Invokes now? | Arguments | Typical use |
|-----|--------------|-----------|-------------|
| `call` | Yes | Comma-separated | Borrow method, one-off `this` |
| `apply` | Yes | Array | Legacy `Math.max` on array |
| `bind` | No — returns fn | Comma-separated (+ partial) | Event handlers, callbacks |

```js
// React class component (legacy pattern)
this.handleClick = this.handleClick.bind(this);

// Modern alternative — class fields with arrows
handleClick = () => {
  this.setState({ clicked: true });
};
```

---

## 5. Arrow functions & `this`

### 5.1. Lexical `this`

Arrow functions **do not have their own `this`**. They inherit `this` from the **enclosing lexical scope** at definition time:

```js
const user = {
  name: "Bharat",
  hobbies: ["code", "read"],

  listHobbies() {
    this.hobbies.forEach((hobby) => {
      console.log(`${this.name} likes ${hobby}`);
    });
  },
};

user.listHobbies();
// "Bharat likes code"
// "Bharat likes read"
```

With a regular `function` callback, `this` would not be `user`:

```js
this.hobbies.forEach(function (hobby) {
  console.log(this.name);  // undefined — default binding
});
```

### 5.2. When arrows help vs hurt

| Use arrows | Avoid arrows |
|------------|--------------|
| Callbacks inside methods (`map`, `forEach`, `setTimeout`) | Object methods that need `this` on the object |
| When you want outer `this` | Constructors (`new`) |
| Short inline handlers | Methods on prototypes/classes (usually) |
| | When you need dynamic `this` from call site |

```js
// Bad — arrow as object method
const bad = {
  name: "Bharat",
  greet: () => console.log(this.name),
};

// Good — method shorthand
const good = {
  name: "Bharat",
  greet() {
    console.log(this.name);
  },
};
```

See File 07, section 2.3.

### 5.3. Other arrow differences (brief)

- **No `arguments`** — use rest: `(...args) =>`
- **No `prototype`** — cannot use as constructor
- **Cannot be used with `new`**
- **Not hoisted** as callable before line (expression only, File 02)

```js
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
sum(1, 2, 3);  // 6
```

---

## 6. Common questions

**6.1. What is a closure?**  
A: A function that **remembers** variables from its outer lexical scope, even after the outer function has returned. In JS, functions close over their surrounding environment.

**6.2. What is the difference between scope and closure?**  
A: **Scope** is where variables are visible. A **closure** is the mechanism that lets an inner function access outer variables after the outer function finishes executing.

**6.3. How is `this` determined in JavaScript?**  
A: By **how the function is called**: default (bare call), implicit (`obj.method()`), explicit (`call`/`apply`/`bind`), or `new`. Arrow functions use **lexical** `this` from the enclosing scope.

**6.4. Why does `const fn = obj.method; fn()` lose `this`?**  
A: `this` is set by the **call site**. A bare `fn()` uses **default binding**, not `obj`. Use `fn.call(obj)`, `obj.method()`, or `obj.method.bind(obj)`.

**6.5. What is the difference between `call`, `apply`, and `bind`?**  
A: `call` and `apply` **invoke** the function immediately with a given `this`; `call` takes args individually, `apply` as an array. `bind` returns a **new function** with fixed `this` (and optional partial args) without calling it yet.

**6.6. Do arrow functions have `this`?**  
A: They do not have their **own** `this`. They inherit `this` from the surrounding scope where the arrow was **defined**.

**6.7. What is an IIFE?**  
A: An **Immediately Invoked Function Expression** — `(function () { ... })()` runs as soon as it is defined. Historically used for private scope; less needed with `let`/`const` and modules.

**6.8. Why did `for (var i = 0; ...)` break closures in loops?**  
A: `var` is function-scoped — one shared `i`. All async callbacks see the final value. `let` creates a **new binding per iteration**, or use an IIFE to capture each value (File 04).
