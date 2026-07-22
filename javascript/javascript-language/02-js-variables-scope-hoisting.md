# 02. Variables, Scope & Hoisting

> File 02 — declaring variables and where they live.

JavaScript gives you three keywords to declare variables: **`const`**, **`let`**, and **`var`**. They differ in **scope**, **redeclaration rules**, and **hoisting behavior**. Understanding those differences prevents bugs like accidental globals, stale loop variables, and "cannot access before initialization" errors.

**Default rule today:** use **`const`** by default, **`let`** when you need to reassign, and avoid **`var`** in new code.

Interactive visualizer: open [02-js-scope-hoisting-animation.html](./02-js-scope-hoisting-animation.html) in a browser — TDZ, `var` hoisting, block vs function scope, scope chain, shadowing (Run / Step).

---

## 1. const, let, var

### 1.1. Quick comparison

| Feature | `const` | `let` | `var` |
|---------|---------|-------|-------|
| Scope | Block | Block | Function (or global) |
| Can reassign? | No | Yes | Yes |
| Can redeclare in same scope? | No | No | Yes |
| Hoisted? | Yes (TDZ until init) | Yes (TDZ until init) | Yes (initialized as `undefined`) |
| Introduced | ES6 | ES6 | ES1 |

### 1.2. Declaring and assigning

```js
const a = 3;
let b = 2;
var c = 1;

a = 30;   // TypeError — const cannot be reassigned
b = 20;   // OK — let can be reassigned
c = 10;   // OK — var can be reassigned
```

### 1.3. Reassignment vs rebinding

- **Reassignment** — change the value a variable points to (`x = newValue`).
- **Rebinding** — attach the **name** to a different binding (declaring again in the same scope).

```js
let count = 0;
count = 1;        // reassignment — OK

let count = 2;    // SyntaxError — cannot redeclare let in same scope

var total = 0;
var total = 1;    // OK with var (usually a mistake)
```

### 1.4. `const` — constant binding, not constant value

`const` means the **variable binding** cannot change. The **value** can still be mutated if it is an object or array:

```js
const user = { name: "Bharat" };
user.name = "Dev";     // OK — mutating the object
user = { name: "X" };  // TypeError — cannot reassign the variable

const nums = [1, 2];
nums.push(3);          // OK
nums = [4, 5];         // TypeError
```

You must assign `const` at declaration time:

```js
const x;   // SyntaxError — missing initializer
```

### 1.5. Temporal Dead Zone (TDZ)

`const` and `let` exist from the **start of their block**, but you cannot access them **until the declaration line runs**. That gap is the **Temporal Dead Zone**.

```js
console.log(x);  // undefined — var is hoisted and initialized
var x = 5;

console.log(y);  // ReferenceError — y is in TDZ
let y = 5;
```

```js
{
  // TDZ for `message` starts here
  // console.log(message);  // ReferenceError

  let message = "hello";   // TDZ ends
  console.log(message);    // "hello"
}
```

Even `typeof` is unsafe on an undeclared `const`/`let` in the same scope:

```js
typeof undeclaredVar;     // "undefined" — no binding exists
let local;
typeof local;             // "undefined" — declared but not assigned

// typeof notYetDeclared; // ReferenceError — binding exists but is in TDZ
let notYetDeclared = 1;
```

### 1.6. When to use which

| Use | Keyword |
|-----|---------|
| Value never reassigned | `const` |
| Counter, loop variable, reassignable state | `let` |
| Legacy code only | `var` |

---

## 2. Scope

**Scope** is the region where a variable name is visible and accessible. JavaScript uses **lexical (static) scope** — a function "sees" variables from the scopes where it was **written**, not where it is **called**.

### 2.1. Global scope

Variables declared **outside** any function or block live in the **global scope**. In browsers, global bindings become properties of `window` (with exceptions for `const`/`let`).

```js
const appName = "MyApp";   // global (script/module top level)

function showName() {
  console.log(appName);    // can access global
}
```

### 2.2. Function scope

`var` and **function declarations** are scoped to the **nearest function**:

```js
function demo() {
  var x = 1;
  if (true) {
    var x = 2;   // same x — still function-scoped
  }
  console.log(x);  // 2
}
```

### 2.3. Block scope

`const` and `let` are scoped to the **nearest block** (`{ ... }`) — including `if`, `for`, `while`, and standalone blocks:

```js
if (true) {
  let blockScoped = 10;
  const alsoBlock = 20;
}
// blockScoped, alsoBlock — ReferenceError outside the block
```

```js
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);  // 0, 1, 2 — new i each iteration
}

for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);  // 3, 3, 3 — one shared j
}
```

### 2.4. Scope chain

When code reads a variable, JS walks **outward** through nested scopes until it finds a binding. If none is found (in non-strict sloppy mode for assignments), it may create a global.

```js
const outer = "global";

function outerFn() {
  const middle = "middle";

  function innerFn() {
    const inner = "inner";
    console.log(inner);   // "inner"  — own scope
    console.log(middle);  // "middle" — parent scope
    console.log(outer);   // "global" — outer scope
  }

  innerFn();
}
```

### 2.5. Variable shadowing

An inner scope can declare the **same name** as an outer scope, **hiding** the outer variable:

```js
let value = "outer";

function test() {
  let value = "inner";   // shadows outer `value`
  console.log(value);    // "inner"
}

test();
console.log(value);      // "outer"
```

Shadowing is legal with `const`/`let` across blocks, but you cannot shadow a `const`/`let` with `var` in the same block:

```js
let x = 1;
{
  // var x = 2;  // SyntaxError — var cannot redeclare let in same block
  let x = 2;     // OK — inner block, separate binding
}
```

### 2.6. Strict mode and accidental globals

Without `"use strict"`, assigning to an undeclared name creates a **global** property:

```js
function oops() {
  mystery = 42;   // creates global `mystery` (avoid!)
}
```

In **strict mode**, that throws `ReferenceError`:

```js
"use strict";
function safe() {
  mystery = 42;   // ReferenceError
}
```

Always declare with `const`/`let`/`var` — never rely on implicit globals.

---

## 3. Hoisting

**Hoisting** is JS moving **declarations** to the top of their scope during the compile phase. It does **not** move assignments or initializations.

Think of it in two steps:

1. **Create** bindings (names registered in scope).
2. **Run** the code line by line (assign values).

### 3.1. `var` hoisting

`var` declarations are hoisted and initialized to **`undefined`**:

```js
console.log(a);  // undefined — declared, not yet assigned
var a = 10;
console.log(a);  // 10
```

Conceptually similar to:

```js
var a;             // hoisted declaration
console.log(a);    // undefined
a = 10;
```

### 3.2. `const` and `let` hoisting

`const` and `let` are also hoisted, but stay in the **TDZ** until their declaration line:

```js
// console.log(b);  // ReferenceError — TDZ
let b = 2;
```

### 3.3. Function declaration hoisting

**Function declarations** are fully hoisted — you can call them before the line they appear on:

```js
greet();  // "hi" — works

function greet() {
  console.log("hi");
}
```

### 3.4. Function expression hoisting

**Function expressions** follow variable hoisting rules (`const`/`let` → TDZ, `var` → `undefined`):

```js
// sayHi();  // TypeError — sayHi is undefined (var hoisted, not the function)

var sayHi = function () {
  console.log("hi");
};
```

```js
// greet();  // ReferenceError — TDZ

const greet = function () {
  console.log("hello");
};
```

### 3.5. Class declarations

`class` declarations are hoisted but **not initialized** until their line — same TDZ behavior as `const`/`let`:

```js
// const c = new Person();  // ReferenceError

class Person {}
```

### 3.6. Hoisting order (same scope)

When names collide in one scope, **function declarations** take precedence over `var`:

```js
console.log(typeof fn);  // "function"

var fn = "string";

function fn() {
  return "fn";
}
```

After all lines run, `fn` is the string `"string"` because the assignment wins at runtime — but the initial hoisted binding was the function. This pattern is confusing; avoid mixing `var` and function declarations with the same name.

### 3.7. Summary table

| Declaration type | Hoisted? | Usable before line? | Initial value when hoisted |
|------------------|----------|---------------------|----------------------------|
| `const` | Yes | No (TDZ) | — |
| `let` | Yes | No (TDZ) | — |
| `var` | Yes | Yes | `undefined` |
| Function declaration | Yes | Yes | Function |
| Function expression (`var`) | Var only | No (undefined) | `undefined` |
| Function expression (`const`/`let`) | Yes | No (TDZ) | — |
| `class` | Yes | No (TDZ) | — |

---

## 4. Common questions

**4.1. What is the difference between `const`, `let`, and `var`?**  
A: `const` and `let` are block-scoped, cannot be redeclared in the same scope, and sit in the TDZ until initialized. `const` does not allow reassignment; `let` does. `var` is function-scoped, can be redeclared, and hoists as `undefined`.

**4.2. What is the Temporal Dead Zone?**  
A: The period between entering a scope and executing the `const`/`let` declaration line. The binding exists but accessing it throws `ReferenceError`.

**4.3. Does hoisting move code physically to the top?**  
A: No. It is a mental model. During compilation, JS registers declarations in scope first; then it executes the code top to bottom. Assignments and initializations stay on their original lines.

**4.4. Why does `for (var i = 0; ...)` break closures in loops?**  
A: `var` is function-scoped, so there is **one** `i` shared by all iterations. `let` creates a **new binding per iteration**, which is what you want with async callbacks.

**4.5. Can I use a variable before declaring it with `var`?**  
A: You can read it without a `ReferenceError`, but the value is `undefined` until the assignment runs — a common source of bugs. Prefer `const`/`let` so TDZ catches the mistake early.

**4.6. Are function declarations hoisted above `var`?**  
A: In the same scope, the function declaration wins during the initial hoisting phase. If you later assign to the same name with `const`/`let`/`var`, that assignment overwrites it at runtime.

**4.7. What is lexical scope?**  
A: Scope is determined by **where code is written** in the source, not by the call stack at runtime. Inner functions can read outer variables; that outer lookup chain is the **scope chain**.

**4.8. Should I ever use `var`?**  
A: In modern JS, rarely. Use `const`/`let`. You may still see `var` in older tutorials, legacy codebases, or snippets that rely on function scope — know it for interviews and maintenance, not for new features.
