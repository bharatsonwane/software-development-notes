# 01. Data Types & Values

> File 01 — primitives, objects, and how values work in memory.

## 0. Theory (Foundation)

JavaScript is a *dynamic, interpreted (compiled at runtime) and weakly typed* programming language. It can run inside a browser as part of a webpage or directly on a machine through a host environment (for example, Node.js).

JavaScript was created to make webpages dynamic, such as updating page content directly in the browser without a full page reload. It was originally called LiveScript, but it was later renamed to JavaScript during the rise in Java's popularity.

JavaScript is **dynamically typed**: a variable can hold any type, and the type is tied to the **value**, not the variable.

```js
let x = 10;      // number
x = "hello";     // now string — totally valid
```

There are two broad categories: **primitives** and **objects** (everything else).

---

## 1. Primitives

A **primitive** is a single, immutable value stored directly. JavaScript has **7 primitive types**:

| Type | Example | Notes |
|------|---------|-------|
| `string` | `"hello"`, `'world'`, `` `hi` `` | Text; template literals use backticks |
| `number` | `42`, `3.14`, `NaN`, `Infinity` | All numbers are 64-bit floats (no separate `int`) |
| `boolean` | `true`, `false` | Result of comparisons and logic |
| `undefined` | `undefined` | Variable declared but not assigned |
| `null` | `null` | Intentional absence of value |
| `symbol` | `Symbol("id")` | Unique identifier, ES6+ |
| `bigint` | `100n`, `BigInt(100)` | Arbitrarily large integers, ES2020+ |

### 1.1. Strings, numbers, booleans

```js
const name = "Bharat";
const age = 30;
const isActive = true;

// Template literals
const greeting = `Hello, ${name}!`;
```

### 1.2. `undefined` vs `null`

```js
let a;           // undefined — no value assigned
let b = null;    // null — explicitly empty

console.log(a);  // undefined
console.log(b);  // null
```

- **`undefined`** — JS sets this automatically (unassigned variable, missing function return, missing object property).
- **`null`** — you set this when you mean "no value on purpose".

### 1.3. `NaN` and `Infinity`

```js
typeof NaN;        // "number" (quirk!)
Number("abc");     // NaN
1 / 0;             // Infinity
```

`NaN` is the only value that is not equal to itself:

```js
NaN === NaN;       // false
Number.isNaN(NaN); // true — prefer this over global isNaN()
```

### 1.4. `symbol`

Used for unique property keys, often to avoid name collisions:

```js
const id = Symbol("id");
const user = { [id]: 123, name: "Bharat" };
```

Every `Symbol()` call creates a **new** unique value, even with the same description.

### 1.5. `bigint`

For integers larger than `Number.MAX_SAFE_INTEGER` (`2^53 - 1`):

```js
const big = 9007199254740991n;
typeof big;        // "bigint"

// Cannot mix bigint and number without conversion
// 1n + 1  → TypeError
```

### 1.6. Primitives are immutable

You cannot change a primitive in place — operations return **new** values:

```js
const s = "hello";
s.toUpperCase();   // "HELLO"
console.log(s);    // still "hello"
```

---

## 2. Object data type

An **object** is a collection of key–value pairs. In JS, **arrays**, **functions**, **Date**, **Map**, **Set**, and **RegExp** are also objects.

```js
const person = { name: "Bharat", age: 30 };
const nums = [1, 2, 3];
const greet = function () { return "hi"; };
const today = new Date();
const tags = new Set(["js", "web"]);
const cache = new Map([["id", 1]]);
const pattern = /js/i;

typeof person;  // "object"
typeof nums;    // "object"
typeof greet;   // "function"
typeof today;   // "object"
typeof tags;    // "object"
typeof cache;   // "object"
typeof pattern; // "object"
```

### 2.1. Arrays are objects

```js
const arr = [1, 2, 3];
arr.push(4);
typeof arr;       // "object"
Array.isArray(arr); // true — use this to check for arrays
```

---


## 3. Primitive vs non-primitive (differences)

| Aspect | Primitive | Non-primitive |
|------|-----------|---------------|
| Nature | Single value | Collection/object value |
| Mutability | Immutable | Mutable |
| Stored in variable | The value itself | A reference (pointer) to the value |
| Copy behavior | Copied by value | Reference is copied |
| Compared with `===` | Compares actual value | Compares reference identity |
| `typeof` output | Specific types like `"string"`, `"number"` | Usually `"object"` (functions are `"function"`) |
| Examples | `"hi"`, `42`, `true`, `null`, `undefined`, `Symbol()`, `10n` | `{}`, `[]`, `function(){}`, `new Date()` |



## 4. Values and references

### 4.1. Values (primitive copy)

**Primitives** are copied **by value**:

```js
let a = 10;
let b = a;   // b gets a copy of the value
b = 20;
console.log(a);  // 10
console.log(b);  // 20
```

### 4.2. References (object copy)

**Objects** are copied **by reference** — the variable holds a pointer to the same object in memory:

```js
const obj1 = { x: 1 };
const obj2 = obj1;   // both point to the same object
obj2.x = 99;
console.log(obj1.x); // 99 — obj1 changed too!
```

### 4.3. Reassignment vs mutability

Reassignment changes what a variable points to. Mutability changes the value itself.

```js
let n = 10;
n = 20; // reassignment: n now points to a different primitive value

const user = { name: "Bharat" };
user.name = "B"; // mutation: same object, internal data changed
// user = { name: "New" }; // TypeError with const: reassignment not allowed
```

### 4.4. Shallow copy

Spread and `Object.assign` create a **shallow** copy — top-level keys are copied, nested objects are still shared:

```js
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };

copy.a = 100;
copy.nested.b = 200;

console.log(original.a);          // 1
console.log(original.nested.b);   // 200 — nested object is shared!
```

For a deep copy of plain data, `structuredClone()` works in modern environments:

```js
const deep = structuredClone(original);
```

### 4.5. Passing to functions

Primitives are passed by value; objects are passed by reference (the reference is copied):

```js
function changePrimitive(n) {
  n = 100;
}
let num = 5;
changePrimitive(num);
console.log(num);  // 5

function changeObject(obj) {
  obj.x = 100;
}
const o = { x: 1 };
changeObject(o);
console.log(o.x);  // 100
```

## 5. `typeof` & `instanceof` (type & instance) checking

### 5.1. `typeof` operator

Returns a **string** naming the type:

```js
typeof "hello";     // "string"
typeof 42;          // "number"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof Symbol();    // "symbol"
typeof 10n;         // "bigint"
typeof function(){};// "function"
typeof {};          // "object"
typeof [];          // "object"
typeof new Date();  // "object"
typeof new Map();   // "object"
typeof new Set();   // "object"
typeof null;        // "object"  ← famous bug, historical reason
```

### 5.2. Checking for `null`

`typeof null === "object"` is misleading. Use strict equality:

```js
const value = null;
value === null;  // true
```

### 5.3. `instanceof`

Checks if an object appears in another object's prototype chain:

```js
[] instanceof Array;        // true
[] instanceof Object;       // true
({}) instanceof Object;   // true

"hello" instanceof String; // false — primitive, not String object
```

### 5.4. `typeof` vs `instanceof` (quick table)

| Check | `typeof` | `instanceof` |
|------|----------|--------------|
| What it checks | Built-in type tag (returns a string) | Prototype chain relationship |
| Works well for | Primitives, functions, quick guards | Class/constructor-based objects |
| Returns | One of values like `"string"`, `"number"`, `"object"` | `true` or `false` |
| Arrays | `typeof []` -> `"object"` (not specific) | `[] instanceof Array` -> `true` |
| `null` | `typeof null` -> `"object"` (historical bug) | `null instanceof Object` -> `false` |
| Cross-realm caveat | Usually stable for primitives | Can fail across realms (e.g., different iframes) |


### 5.5. Data types: primitive vs non-primitive

| Data type | Category | `typeof` result | `instanceof` result | Recommended check |
|------|----------|-----------------|---------------------|-------------------|
| String | Primitive | `"string"` | `"hi" instanceof String` -> `false` | `typeof x === "string"` |
| Number | Primitive | `"number"` | `42 instanceof Number` -> `false` | `typeof x === "number"` and `Number.isFinite(x)` when needed |
| Boolean | Primitive | `"boolean"` | `true instanceof Boolean` -> `false` | `typeof x === "boolean"` |
| Undefined | Primitive | `"undefined"` | `undefined instanceof Object` -> `false` | `x === undefined` or `typeof x === "undefined"` |
| Null | Primitive | `"object"` (quirk) | `null instanceof Object` -> `false` | `x === null` |
| Symbol | Primitive | `"symbol"` | `Symbol("id") instanceof Symbol` -> `false` | `typeof x === "symbol"` |
| BigInt | Primitive | `"bigint"` | `100n instanceof BigInt` -> `false` | `typeof x === "bigint"` |
| Object (plain) | Non-primitive | `"object"` | `({}) instanceof Object` -> `true` | `x !== null && typeof x === "object"` |
| Array | Non-primitive | `"object"` | `[] instanceof Array` -> `true` | `Array.isArray(x)` |
| Function | Non-primitive | `"function"` | `(function(){}) instanceof Function` -> `true` | `typeof x === "function"` |
| Date | Non-primitive | `"object"` | `new Date() instanceof Date` -> `true` | `x instanceof Date` |
| RegExp | Non-primitive | `"object"` | `/x/ instanceof RegExp` -> `true` | `x instanceof RegExp` |
| Map | Non-primitive | `"object"` | `new Map() instanceof Map` -> `true` | `x instanceof Map` |
| Set | Non-primitive | `"object"` | `new Set() instanceof Set` -> `true` | `x instanceof Set` |
| WeakMap | Non-primitive | `"object"` | `new WeakMap() instanceof WeakMap` -> `true` | `x instanceof WeakMap` |
| WeakSet | Non-primitive | `"object"` | `new WeakSet() instanceof WeakSet` -> `true` | `x instanceof WeakSet` |
| Promise | Non-primitive | `"object"` | `Promise.resolve() instanceof Promise` -> `true` | `x instanceof Promise` |

| Goal | How |
|------|-----|
| Is it an array? | `Array.isArray(x)` |
| Is it `NaN`? | `Number.isNaN(x)` |
| Is it a finite number? | `Number.isFinite(x)` |
| Is it `null` or `undefined`? | `x == null` or `x === null \|\| x === undefined` |
| Safe integer? | `Number.isSafeInteger(x)` |

## 5.6. Boxing (brief)

Primitives can be temporarily wrapped as objects when you access methods:

```js
"hello".toUpperCase();  // works — JS wraps in String object, then discards it
```

Avoid `new String("hello")` — creates an object wrapper, rarely needed.

---

## 6. Language basics

### 6.1. Comments

```js
// Single-line comment

/*
  Multi-line comment
  (block comment)
*/

const x = 1; // trailing comment
```

Use comments for **why**, not **what** obvious code already shows.

### 6.2. Semicolons

JavaScript has **Automatic Semicolon Insertion (ASI)** — the engine inserts semicolons when you omit them at line breaks in certain cases.

```js
// Both valid
const a = 1;
const b = 2

// ASI can surprise you — return on its own line
function bad() {
  return   // ASI inserts ; here — returns undefined
    { value: 1 };
}
```

**Default rule:** use semicolons consistently, or follow a project style guide (Prettier).

### 6.3. Literals

A **literal** is syntax that creates a value directly:

| Literal | Example |
|---------|---------|
| Number | `42`, `3.14`, `0xff`, `1_000_000` |
| String | `"hi"`, `'hi'`, `` `hi` `` |
| Boolean | `true`, `false` |
| Null | `null` |
| Array | `[1, 2, 3]` |
| Object | `{ name: "Ada" }` |
| RegExp | `/abc/gi` |
| Template | `` `Hello ${name}` `` |

### 6.4. Expressions vs statements

| Expressions | Statements |
|-------------|------------|
| Produce a **value** | Perform an **action** |
| `1 + 2`, `fn()`, `a && b` | `if`, `for`, `return`, `const x = 1` |
| Can nest inside other expressions | Usually stand alone |

```js
// Expression used as statement (value discarded)
count + 1;

// Statement — const declaration is not an expression
const x = 1 + 2;  // 1 + 2 is expression; whole line is statement
```

Ternary (`cond ? a : b`) is an **expression**; `if/else` is a **statement** (File 04).

---

## 7. Common questions

**7.1. How many data types does JavaScript have?**  
A: **7 primitives** + **objects** (which includes arrays, functions, dates, etc.).

**7.2. What is the difference between `undefined` and `null`?**  
A: `undefined` means "not assigned / missing". `null` means "intentionally empty".

**7.3. Why does `typeof null` return `"object"`?**  
A: A long-standing language bug kept for backward compatibility. Always use `value === null` to check for null.

**7.4. Primitive vs object — what is the key difference?**  
A: Primitives are immutable single values, stored and copied by value. Objects are mutable collections, copied by reference.

**7.5. Does `const` make objects immutable?**  
A: No. `const` prevents **reassigning** the variable. The object itself can still be mutated:

```js
const obj = { a: 1 };
obj.a = 2;       // OK
obj = { a: 3 };  // TypeError — cannot reassign
```

**7.6. What is `NaN` and how do you check for it?**  
A: `NaN` means "Not a Number" (result of invalid math). Use `Number.isNaN(value)`, not `value === NaN`.

**7.7. Are semicolons required in JavaScript?**  
A: **No** — ASI inserts them in many cases. Use them consistently to avoid ASI edge cases.

**7.8. What is the difference between an expression and a statement?**  
A: An **expression** evaluates to a value. A **statement** performs an action (declare, loop, return).

**7.9. What is a literal?**  
A: Syntax that creates a value directly — `42`, `"hi"`, `{ a: 1 }`, `[1, 2]`.
