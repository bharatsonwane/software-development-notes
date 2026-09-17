# JavaScript Curriculum & Notes Audit: Comprehensive Gap Analysis (Files 01–29)

This audit inspects every file from `javascript/javascript-language/01-js-variables.html` through `javascript/javascript-language/29-js-performance-api.html` against the master interview syllabus (`notes.txt`), modern ECMAScript specifications (ES6 through ES2024/ES2025), V8 engine runtime internals, and senior frontend / fullstack interview benchmarks.

---

## 1. Audit Scope & Standards

1. **Strictly Technical Depth:** Runtime mechanics, memory models (stack/heap, V8 shapes, GC generations), execution context phases, event loop microtask/macrotask scheduling, prototype resolution, browser rendering pipeline, and production polyfill implementations.
2. **No Trivia or Anecdotes:** Excludes biographical trivia, history of Netscape/Brendan Eich, or pop-culture lore. Focuses 100% on executable code, runtime behavior, and interview questions.
3. **Design & Layout Compliance:** Seamlessly integrates with `public/styles/common.css`, preserves L1/L2/L3 tier chips, supports light/dark themes, adheres to the `scroll-margin-top: 110px` header offset, and maintains valid HTML.

---

## 2. Master Summary Gap Matrix (Files 01–29)

| # | Topic & File | Current Lines | Current Coverage | Key Missing Topics / Expansion Required | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Variables**<br>`01-js-variables.html` | ~440 lines | Basic comparison of `var`, `let`, `const`, re-assignment. | **TDZ runtime internals** (`typeof` ReferenceError trap), **global object attachment** (`var` on `window` vs script-scoped `let`/`const`), **loop scoping mechanics** (`var` shared binding vs `let` per-iteration lexical binding in closures), and redeclaration rules. | **High** |
| **02** | **Data Types & Values**<br>`02-js-data-types-and-values.html` | ~1,040 lines | Primitives, objects, `typeof`, `instanceof`. | **Autoboxing / wrapper objects** lifecycle, **`Symbol.toPrimitive` & 3-hint conversion algorithm** (`number`, `string`, `default`), **stack vs heap memory allocation**, V8 Smi (Small Integer) vs HeapNumber, **`structuredClone` limits** (functions/DOM nodes/Symbols throw `DataCloneError`). | **High** |
| **03** | **Operators & Coercion**<br>`03-js-operators-coercion.html` | ~940 lines | Equality, coercion, truthy/falsy basics. | **Abstract Equality (`==`) 10-step specification algorithm**, **bitwise operator internals** (32-bit `ToInt32` truncation, `~` formula, `>>>`), **logical assignments** (`&&=`, `\|\|=`, `??=`), **comma operator** (`,`), and classic interview coercion puzzles (`[] + {}`, `{} + []`, `+!+[]`). | **High** |
| **04** | **Control Flow**<br>`04-js-control-flow.html` | ~890 lines | Conditionals, loops, `break`/`continue`. | **Labeled statements** with nested `break`/`continue`, `switch` strict `===` comparison & fall-through independence, **`for...in` prototype traversal gotcha** (enumerable chain leakage & `Object.hasOwn` defense), iteration performance benchmarks. | **Medium** |
| **05** | **Functions**<br>`05-js-functions.html` | ~920 lines | Declarations, arrows, params, rest/spread. | **Arrow function structural differences** (missing `this`, `arguments`, `super`, `new.target`, `[[Construct]]`), **function metadata** (`length` arity vs default params, `name` inference), **array-like to array conversion matrix**, and function overloading simulation. | **High** |
| **06** | **Error Handling**<br>`06-js-error-handling.html` | ~520 lines | Basic `try/catch/finally`, `throw`, custom errors. | **Complete Error hierarchy** (`TypeError`, `RangeError`, `ReferenceError`, `SyntaxError`, `URIError`, `AggregateError`), **`Error.cause` chaining (ES2022)**, **`finally` return override trap**, and **global unhandled listeners** (`unhandledrejection`, `window.onerror`). | **High** |
| **07** | **Timers**<br>`07-js-timers.html` | ~435 lines | `setTimeout`, `setInterval`, rAF basics. | **HTML5 timer 4ms clamping rule** & background tab throttling (1000ms), **`setInterval` drift** vs recursive `setTimeout`, **`requestAnimationFrame` vs microtasks/macrotasks**, passing arguments to timers, and Node.js timers (`setImmediate`, `nextTick`). | **High** |
| **08** | **Scope & Hoisting**<br>`08-js-scope-and-hoisting.html` | ~620 lines | Global, function, block scopes, hoisting. | **Hoisting precedence rules** (functions hoisted before variables, overwriting behavior), **class & import hoisting in TDZ**, **illegal shadowing** (`let` shadowed by `var` in block throwing SyntaxError), Environment Records (Declarative vs Object). | **High** |
| **09** | **Strings**<br>`09-js-strings.html` | ~435 lines | Template literals, common methods, Unicode. | **UTF-16 surrogate pairs & code points** (astral planes, emoji length trap `"😀".length === 2`, `codePointAt`, `fromCodePoint`), **Unicode normalization forms** (`NFC`, `NFD`, `NFKC`, `NFKD`), **modern methods** (`replaceAll`, `at`, `isWellFormed`), custom tagged template AST sanitizers. | **High** |
| **10** | **Regular Expressions**<br>`10-js-regexp.html` | ~420 lines | Literal vs constructor, flags, methods, groups. | **Modern flags** (`s` dotAll, `u` unicode, `y` sticky, `d` indices, `v` set operations), **lookaround assertions** (lookahead `(?=...)`, `(?!...)`, lookbehind `(?<=...)`, `(?<!...)`), **named capture groups & backreferences**, **ReDoS catastrophic backtracking** mechanics. | **High** |
| **11** | **Numbers**<br>`11-js-numbers.html` | ~390 lines | BigInt, NaN, floating point precision. | **IEEE 754 64-bit layout** (1 sign bit, 11 exponent bits, 52 mantissa bits), **signed zero math** (`+0` vs `-0`, `1/-0 === -Infinity`), `Number.isNaN()` vs global `isNaN()` coercion trap, `Number.EPSILON` safe comparison, and BigInt type mixing constraints. | **High** |
| **12** | **Math Object**<br>`12-js-math.html` | ~335 lines | Basic methods, random range, crypto intro. | **Rounding suite nuances** (`round`, `floor`, `ceil`, `trunc` directional differences for negatives), `Math.sign()`, `Math.clz32()`, and **CSPRNG vs PRNG** (`crypto.getRandomValues()` unbiased distribution vs `Math.random()`). | **Medium** |
| **13** | **Objects**<br>`13-js-objects.html` | ~935 lines | Object literals, destructuring, descriptors. | **Property descriptors deep dive** (`writable`, `enumerable`, `configurable`, accessors), **integrity levels** (`preventExtensions` vs `seal` vs `freeze`), **`Object.hasOwn()` vs `hasOwnProperty()`, property key iteration order** (integers, strings, symbols). | **High** |
| **14** | **Arrays**<br>`14-js-arrays.html` | ~780 lines | Mutating vs non-mutating methods, spread. | **Sparse vs dense arrays** (holes vs `undefined`, iteration behavior across `map` vs `for...of`), **ES2023 non-mutating suite** (`toSorted`, `toReversed`, `toSpliced`, `with`), **`Object.groupBy` / `Map.groupBy` (ES2024)**, `reduce()` missing initial value pitfalls. | **High** |
| **15** | **Set & WeakSet**<br>`15-js-set.html` | ~380 lines | Set dedupe, Set algebra (ES2025), WeakSet. | **`SameValueZero` equality** (`NaN === NaN` true, `+0 === -0`), **WeakSet garbage collection semantics** (object-only references, non-enumerable, use cases in marking instances), and comprehensive ES2025 Set methods. | **Medium** |
| **16** | **Map & WeakMap**<br>`16-js-map.html` | ~460 lines | Map iteration, Map.groupBy, WeakMap. | **Map vs Plain Object performance & memory benchmark**, arbitrary key hashing, **WeakMap for truly private metadata & DOM memory leak prevention**, Ephemeron collection mechanics. | **Medium** |
| **17** | **Dates**<br>`17-js-dates.html` | ~350 lines | Date object, timestamp, Intl API. | **0-indexed month & day traps**, parsing discrepancies between ISO formats and local dates, **Intl complete suite** (`DateTimeFormat`, `RelativeTimeFormat`, `NumberFormat`, `Segmenter`), and **Temporal API proposal overview**. | **Medium** |
| **18** | **Closures & this**<br>`18-js-closures-and-this.html` | ~930 lines | Closures, IIFE, this binding, call/apply/bind. | **`this` 4-rule binding precedence** (`new` > explicit > implicit > default), **closure memory leak diagnostic patterns** (devtools heap snapshots, retainers), generic `curry()` and `partial()` implementations from scratch. | **High** |
| **19** | **OOP & Classes**<br>`19-js-oop.html` | ~630 lines | OOP principles, class basics, static fields. | **Modern private fields `#field` & private methods `#method` (ES2022)**, `in` operator private field check, **static initialization blocks (`static { ... }`)**, abstract class simulation, and composition over inheritance. | **High** |
| **20** | **Prototypes**<br>`20-js-prototypes.html` | ~730 lines | Prototype chain, creation, inheritance. | **The 4-step `new` keyword operator algorithm**, **`new.target` meta-property**, `Object.create(null)` dictionary pattern, and **Prototype Pollution vulnerability & mitigations**. | **High** |
| **21** | **Async & Event Loop**<br>`21-js-async-and-event-loop.html` | ~1,010 lines | Callbacks, Promises, async/await, event loop. | **Complete Event Loop tick lifecycle** (Call stack &rarr; Microtask queue &rarr; Render steps &rarr; Macrotask queue), **all 6 Promise combinators** (`all`, `allSettled`, `race`, `any`, `withResolvers`, `try`), async execution order interview puzzles. | **High** |
| **22** | **ES6+ Features**<br>`22-js-es6-plus-features.html` | ~975 lines | ESM, symbols, iterators, generators. | **ESM vs CJS complete mechanics** (live bindings vs value snapshots, static analysis, circular dependencies, top-level `await` execution graph), **Well-Known Symbols suite**, **Iterator Helpers (ES2025)**, **Explicit Resource Management (`using`)**. | **High** |
| **23** | **Advanced Patterns & Engine**<br>`23-js-advanced-patterns.html` | ~1,010 lines | Execution context, GC, Proxy, functional patterns. | **V8 Engine Internals** (Ignition, TurboFan, Hidden Classes / Shapes, Inline Caches, De-optimization), **V8 Generational GC** (Scavenger semi-spaces, Mark-Sweep-Compact), **Proxy all 13 traps & invariant validation**. | **High** |
| **24** | **Browser APIs & Events**<br>`24-js-browser-and-events.html` | ~650 lines | DOM/BOM, storage, fetch, event handling. | **Event propagation 3 phases** (capturing, target, bubbling), `stopPropagation` vs `stopImmediatePropagation` vs `preventDefault`, **`composedPath()` & shadow boundary crossing**, **Observer suite** (`IntersectionObserver`, `ResizeObserver`, `MutationObserver`), **Web Workers & Transferable Objects**. | **High** |
| **25** | **Interview Polyfills & Patterns**<br>`25-js-interview-polyfills-patterns.html` | ~860 lines | Polyfills, design patterns, coding problems. | **Production-grade polyfill implementations** (`bind`, `apply`, `call`, `Promise`, `Promise.all`, `debounce`, `throttle`, `deepClone`), **system design patterns** (LRU Cache, EventEmitter, Promise Pool / Concurrency Limiter, object flattener), web security (XSS, CSRF). | **High** |
| **26** | **Typed Arrays & Binary Data**<br>`26-js-typed-arrays-binary.html` | ~450 lines | ArrayBuffer, TypedArrays, DataView. | **Endianness mechanics** (Little-Endian vs Big-Endian, multi-byte access via `DataView`), Base64 conversion pipeline (`btoa`, `atob`, `Uint8Array`, `Blob`), and shared memory intro (`SharedArrayBuffer`, `Atomics`). | **Medium** |
| **27** | **Streams & WebSocket**<br>`27-js-streams-and-websocket.html` | ~480 lines | Streams, WebSocket basics. | **Streams backpressure architecture** (high water mark, `desiredSize`, consumer pacing), **WebSocket production resilient patterns** (heartbeat ping/pong, exponential backoff reconnection, binary array buffer frames). | **Medium** |
| **28** | **Web Components & Shadow DOM**<br>`28-js-web-components.html` | ~500 lines | Custom elements, Shadow DOM, templates. | **Custom Element 4 lifecycle callbacks** (`connectedCallback`, `disconnectedCallback`, `adoptedCallback`, `attributeChangedCallback` with `observedAttributes`), **Shadow DOM event retargeting** (`composed: true`), open vs closed encapsulation. | **Medium** |
| **29** | **Performance & User Timing**<br>`29-js-performance-api.html` | ~415 lines | High-res time, User Timing, Navigation Timing. | **Core Web Vitals programmatic measurement** (LCP, INP, CLS via `PerformanceObserver`), **Long Task tracking** (`entryType: "longtask"` $> 50\text{ms}$), frame budgeting, and Memory profiling API. | **Medium** |

---

## 3. Detailed File-by-File Audit & Specific Missing Notes

### File 01: `01-js-variables.html` (Variables)
- **Current State:** 443 lines. Covers basic comparison of `var`, `let`, `const`, re-assignment vs rebinding, and constant bindings.
- **Missing Technical Notes & Enhancements:**
  1. **Temporal Dead Zone (TDZ) Runtime Mechanics:**
     - The exact compilation vs execution timeline of `let` and `const`.
     - Why `typeof undeclaredVar === "undefined"` (safe check) while `typeof tdzVar` throws a fatal `ReferenceError`.
     - Default parameter TDZ trap: `function f(a = b, b = 2) {}` throws `ReferenceError` because `b` is evaluated while still in its TDZ.
  2. **Global Object Attachment vs Declarative Environment:**
     - In non-module scripts, `var x = 1` creates an enumerable property on the global object (`window.x === 1` / `globalThis.x === 1`).
     - `let y = 2` and `const z = 3` are placed in the Declarative Environment Record of the script scope; they never attach to `window` or `globalThis`.
  3. **Loop Closure Binding Mechanics:**
     - `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }` logs `3, 3, 3` because all callbacks share the exact same function-scoped variable memory slot.
     - `for (let i = 0; i < 3; i++)` creates a brand new lexical binding for each iteration step, capturing distinct `0, 1, 2` values per closure.
  4. **Redeclaration vs Reassignment Rules:**
     - `var` permits redeclaration across identical scopes without error (treated as assignment).
     - `let` and `const` disallow any redeclaration in the same scope, triggering an early `SyntaxError` at parse time before any line executes.

---

### File 02: `02-js-data-types-and-values.html` (Data Types & Values)
- **Current State:** 1,044 lines. Covers 7 primitives, object data type, references, `typeof`, `instanceof`.
- **Missing Technical Notes & Enhancements:**
  1. **Autoboxing & Wrapper Constructors:**
     - Primitive values do not possess methods; accessing `str.toUpperCase()` triggers implicit autoboxing (allocating a temporary `new String(str)` instance, calling the method, and immediately garbage collecting the wrapper).
     - Dangerous difference between wrapper constructor and type casting: `typeof Number(123) === "number"` vs `typeof new Number(123) === "object"`.
     - `Boolean(new Boolean(false))` evaluates to `true` because all objects are truthy!
  2. **`Symbol.toPrimitive` & 3-Hint Coercion Algorithm:**
     - How JavaScript converts objects to primitives using hints: `"number"`, `"string"`, and `"default"`.
     - Precedence: `[Symbol.toPrimitive](hint)` &rarr; `valueOf()` &rarr; `toString()` (or `toString()` &rarr; `valueOf()` for `"string"` hint).
     - Writing custom `[Symbol.toPrimitive]` handlers for business models.
  3. **V8 Internal Value Representations:**
     - Small Integers (Smi): 31-bit/32-bit signed integers stored unboxed directly inside tagged pointer words without heap allocation.
     - HeapNumbers: Floating point and large numbers allocated on the V8 heap.
  4. **`structuredClone` Complete Boundary Analysis:**
     - Supported: Cyclic graphs, `Map`, `Set`, `Date`, `RegExp`, `ArrayBuffer`, `Uint8Array`.
     - Rejections: Functions, DOM nodes, and property descriptors trigger `DOMException: DataCloneError`. Prototype chains and Symbol keys are silently dropped.

---

### File 03: `03-js-operators-coercion.html` (Operators & Coercion)
- **Current State:** 936 lines. Covers operators, equality, type coercion, truthy/falsy.
- **Missing Technical Notes & Enhancements:**
  1. **The 10-Step Abstract Equality (`==`) Algorithm (ECMA-262 §7.2.14):**
     - Step-by-step trace: `null == undefined` (True), `number == string` (converts string to number), `boolean == any` (converts boolean to number `0` or `1` first!), `object == primitive` (invokes `ToPrimitive`).
     - Why `"0" == false` is `true`, but `"0" == true` is `false` (both convert to number: `0 == 0` vs `0 == 1`).
     - Why `[] == ![]` is `true` (`![]` becomes `false`, then `[] == false`, then `"" == 0`, then `0 == 0`).
  2. **Bitwise Operators & 32-Bit Int Truncation:**
     - All bitwise operators (`&`, `|`, `^`, `~`, `<<`, `>>`, `>>>`) convert operands to 32-bit signed integers (`ToInt32`).
     - The bitwise NOT `~x` formula: `-(x + 1)`. Why `~(-1) === 0` (historical `indexOf` truthiness idiom).
     - Zero-fill right shift `>>>` converts values to 32-bit *unsigned* integers (`ToInt32 >>> 0`).
  3. **Logical Assignment Operators (ES2021):**
     - `a &&= b` (assigns only if `a` is truthy, short-circuits otherwise).
     - `a ||= b` (assigns only if `a` is falsy).
     - `a ??= b` (assigns only if `a` is nullish: `null` or `undefined`).
  4. **Comma Operator (`,`) Mechanics:**
     - Evaluates each of its operands from left to right and returns the value of the last operand: `let x = (1, 2, 3); // x === 3`.
     - Real-world applications in minification, arrow function multi-actions, and sequencing statements.

---

### File 04: `04-js-control-flow.html` (Control Flow)
- **Current State:** 893 lines. Covers conditionals, loops, `break`/`continue`.
- **Missing Technical Notes & Enhancements:**
  1. **Labeled Statements with Nested Loops:**
     - Breaking or continuing outer loops from deep inside inner loops using labels (`outerLoop: for (...)`).
     - Why labels cannot be used with standalone blocks unless paired with `break`.
  2. **`switch` Strict Comparison & Scope Hazards:**
     - `switch` evaluates cases using strict equality (`===`) without coercion.
     - Lexical scope gotcha inside `switch`: `switch` has a single block scope across all cases; declaring `let x = 1` in two different `case` clauses without separate `{}` blocks raises a `SyntaxError: Identifier 'x' has already been declared`.
  3. **`for...in` Enumerable Prototype Traversal:**
     - `for...in` iterates over all enumerable properties of an object **plus its entire prototype chain**.
     - Essential defense using `Object.hasOwn(obj, prop)` (ES2022) to filter out inherited properties.
  4. **Iteration Performance & V8 JIT Optimization:**
     - Comparing classic index-based `for`, `for...of`, `Array.prototype.forEach`, and `for...in`.

---

### File 05: `05-js-functions.html` (Functions)
- **Current State:** 923 lines. Covers function forms, parameters/arguments, return, first-class functions.
- **Missing Technical Notes & Enhancements:**
  1. **Arrow Function Exhaustive Architectural Differences:**
     - No lexical `this` binding (inherits `this` from enclosing lexical scope).
     - No `arguments` object (use `...rest` instead).
     - No `prototype` property (`arrowFn.prototype === undefined`).
     - Missing internal `[[Construct]]` method (cannot be invoked with `new`; throws `TypeError`).
     - Cannot be used as generators (`yield` keyword invalid inside body).
  2. **Function Reflection & Metadata:**
     - `Function.prototype.length`: Reports arity (number of formal parameters up to the first default parameter; rest parameters excluded).
     - `Function.prototype.name`: Inferred name rules for anonymous functions assigned to variables, methods, and getters/setters.
  3. **Array-Like to Array Transformation Benchmark:**
     - 4 techniques: `Array.from(arrayLike)`, `[...arrayLike]`, `Array.prototype.slice.call(arrayLike)`, and manual loop.
  4. **Function Overloading Simulation Patterns:**
     - Checking `arguments.length`, examining `typeof` arguments, and options object pattern (`{ port = 8080, host = 'localhost' } = {}`).

---

### File 06: `06-js-error-handling.html` (Error Handling)
- **Current State:** 519 lines. Covers `try/catch/finally`, `throw`, custom errors, basic types.
- **Missing Technical Notes & Enhancements:**
  1. **Native Error Subclasses Hierarchy:**
     - `Error` base class.
     - `TypeError`: Incompatible type operations (`null.foo`, `const x = 1; x = 2`).
     - `ReferenceError`: Invalid dereferencing or TDZ access.
     - `RangeError`: Out-of-range numeric arguments (`new Array(-1)`, infinite recursion stack overflow).
     - `SyntaxError`: Code parsing violations.
     - `URIError`: Malformed URI sequences (`decodeURI('%')`).
     - `AggregateError`: Multiple errors bundled together (used in `Promise.any`).
  2. **`Error.cause` & Error Chaining (ES2022):**
     - Subclassing `Error` with clean `super(message, { cause })` propagation.
     - Preserving low-level network/database root errors when re-throwing domain-specific application errors.
  3. **`finally` Return Override Anti-Pattern:**
     - If `finally` contains a `return` or `throw` statement, it silently discards and swallows any exception thrown in `try` or `catch`, and overrides any earlier `return` value.
  4. **Global Unhandled Error Listeners:**
     - Browser: `window.onerror`, `window.addEventListener('unhandledrejection', event)`.
     - Node.js: `process.on('uncaughtException')`, `process.on('unhandledRejection')`.

---

### File 07: `07-js-timers.html` (Timers)
- **Current State:** 435 lines. Covers `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`, rAF basics.
- **Missing Technical Notes & Enhancements:**
  1. **HTML5 Timer 4ms Clamping Specification:**
     - Nested timers with depth $> 5$ are clamped to a minimum delay of 4 milliseconds per HTML spec.
     - Inactive background tabs are throttled to 1000ms (1 second) or frozen completely to preserve device battery and CPU.
  2. **`setInterval` Drift vs Recursive `setTimeout`:**
     - Why `setInterval` causes overlapping execution if callback duration exceeds the interval delay.
     - How recursive `setTimeout` guarantees an exact delay *after* the previous execution finishes.
  3. **`requestAnimationFrame` (rAF) Synchronization:**
     - Syncing animations directly with display hardware refresh cycles (60Hz / 120Hz VSync).
     - Execution phase: runs immediately before style recalculation, layout, and paint.
  4. **Node.js Timer Architecture vs Browser:**
     - `setImmediate()` (check phase) vs `setTimeout()` (timer phase) vs `process.nextTick()` (microtask boundary).

---

### File 08: `08-js-scope-and-hoisting.html` (Scope & Hoisting)
- **Current State:** 624 lines. Covers global/function/block scope, shadowing, scope chain, hoisting basics.
- **Missing Technical Notes & Enhancements:**
  1. **Hoisting Precedence Matrix:**
     - Function declarations are hoisted **before** variable declarations.
     - If a function declaration and a `var` share the same identifier, the function declaration takes precedence during the creation phase.
     - Multiple function declarations with the same name: the last declared function overwrites all previous ones.
  2. **Class & Module Import Hoisting:**
     - `class` declarations are hoisted into the TDZ (cannot be instantiated before line of definition).
     - `import` declarations are hoisted to the absolute top of the module graph and evaluated before module execution.
  3. **Illegal Variable Shadowing:**
     - Shadowing `var` with `let` in an inner block is valid.
     - Shadowing `let` with `var` inside a nested block is an illegal syntax error because `var` attempts to hoist to the outer function/script scope where the name is already bound.
  4. **Environment Records Architecture:**
     - Declarative Environment Record (stores variables, constants, classes).
     - Object Environment Record (binds the global object `window` in global scope).

---

### File 09: `09-js-strings.html` (Strings)
- **Current State:** 435 lines. Covers template literals, string methods, tagged templates, Unicode.
- **Missing Technical Notes & Enhancements:**
  1. **UTF-16 Surrogate Pairs & Code Points:**
     - BMP characters ($0x0000$ to $0xFFFF$) vs Supplementary planes ($0x10000$ to $0x10FFFF$).
     - The emoji length trap: `"😀".length === 2`, `"👨‍👩‍👧‍👦".length === 8`.
     - Accessing code points safely using `String.prototype.codePointAt()`, `String.fromCodePoint()`, and `for...of` unicode-aware iteration.
  2. **Unicode Normalization (`normalize()`):**
     - 4 forms: `NFC` (Canonical Composition), `NFD` (Canonical Decomposition), `NFKC`, `NFKD`.
     - Why `"é"` ($0x00E9$) and `"e\u0301"` do not match with `===` until normalized!
  3. **Modern String Methods Suite:**
     - `String.prototype.replaceAll()`, `at()`, `padStart()`, `padEnd()`, `trimStart()`, `trimEnd()`, `isWellFormed()`, `toWellFormed()`.
  4. **Tagged Template Functions AST Sanitizer:**
     - Raw strings (`strings.raw`) vs cooked strings.
     - Writing a custom XSS escaping template tag function (`html\`<p>${userInput}</p>\``).

---

### File 10: `10-js-regexp.html` (Regular Expressions)
- **Current State:** 424 lines. Covers literal vs constructor, flags, methods, groups, `lastIndex`.
- **Missing Technical Notes & Enhancements:**
  1. **Modern RegExp Flags Suite:**
     - `s` (dotAll: allows `.` to match `\n`).
     - `u` (unicode: enables full 21-bit code point handling).
     - `y` (sticky: matches strictly from `lastIndex` position).
     - `d` (hasIndices: returns `.indices` array containing start/end index tuples).
     - `v` (ES2024 unicode sets: set operations like intersection `&&` and subtraction `--`).
  2. **Lookaround Assertions:**
     - Positive lookahead `(?=...)` & Negative lookahead `(?!...)`.
     - Positive lookbehind `(?<=...)` & Negative lookbehind `(?<!...)`.
     - Real-world password validation regex using lookaheads.
  3. **Named Capture Groups & Backreferences:**
     - Syntax: `(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})`.
     - Accessing via `match.groups.year`.
     - Backreferencing inside pattern via `\k<year>` and replacement via `$<year>`.
  4. **Catastrophic Backtracking (ReDoS):**
     - How nested quantifiers (`(a+)+$`) cause $O(2^N)$ polynomial/exponential execution spikes on non-matching strings.
     - Mitigations and linear-time regex alternatives.

---

### File 11: `11-js-numbers.html` (Numbers)
- **Current State:** 388 lines. Covers BigInt, Number methods, NaN, floating point precision.
- **Missing Technical Notes & Enhancements:**
  1. **IEEE 754 64-Bit Binary Layout:**
     - 1-bit sign, 11-bit exponent, 52-bit fraction/mantissa.
     - The floating point precision problem: why binary base-2 cannot represent decimal $0.1$ or $0.2$ exactly (`0.1 + 0.2 === 0.30000000000000004`).
     - Safe comparison using `Math.abs(a - b) < Number.EPSILON`.
  2. **Signed Zeros Math (`+0` vs `-0`):**
     - Representation (sign bit $0$ vs $1$).
     - `+0 === -0` is `true`, but `Object.is(+0, -0)` is `false`.
     - Division by signed zero: `1 / +0 === Infinity`, `1 / -0 === -Infinity`.
  3. **`NaN` Nuances & Coercion Traps:**
     - `NaN !== NaN` (the only JS value not equal to itself).
     - Strict `Number.isNaN(val)` (checks type is number and value is NaN) vs legacy global `isNaN(val)` (coerces to number first: `isNaN("foo") === true`).
  4. **BigInt Operations & Constraints:**
     - Implicit type mixing with Number throws `TypeError` (`10n + 5`).
     - BigInt division truncates fractions towards zero (`5n / 2n === 2n`).
     - Unbounded integer precision up to available host memory.

---

### File 12: `12-js-math.html` (Math Object)
- **Current State:** 335 lines. Covers basic methods, random integer, crypto comparison.
- **Missing Technical Notes & Enhancements:**
  1. **Truncation & Rounding Nuances for Negative Numbers:**
     - `Math.floor(-3.1) === -4` (rounds towards negative infinity).
     - `Math.ceil(-3.1) === -3` (rounds towards positive infinity).
     - `Math.trunc(-3.1) === -3` (discards fraction, truncating towards zero).
     - `Math.round(-3.5) === -3` (ties round towards positive infinity).
  2. **Advanced Math Utilities:**
     - `Math.sign()`, `Math.hypot()`, `Math.clz32()` (leading zero bits in 32-bit int).
     - Exact floating point summation approaches.
  3. **CSPRNG vs PRNG:**
     - `crypto.getRandomValues(new Uint32Array(1))` for cryptographically secure, unbiased random integer generation.

---

### File 13: `13-js-objects.html` (Objects)
- **Current State:** 935 lines. Covers object basics, destructuring, JSON, immutability & descriptors.
- **Missing Technical Notes & Enhancements:**
  1. **Property Descriptors Deep Dive:**
     - Data descriptors: `value`, `writable`, `enumerable`, `configurable`.
     - Accessor descriptors: `get`, `set`, `enumerable`, `configurable`.
     - `Object.defineProperty()`, `Object.defineProperties()`, `Object.getOwnPropertyDescriptors()`.
  2. **Object Integrity Levels Comparison Matrix:**
     - `Object.preventExtensions()`: Disallows adding new properties; existing can be modified/deleted.
     - `Object.seal()`: Disallows adding/deleting; configures properties to `configurable: false`.
     - `Object.freeze()`: Disallows adding/deleting/modifying; sets `writable: false`.
     - Implementing a recursive `deepFreeze()` utility.
  3. **`Object.hasOwn()` vs `hasOwnProperty()`:**
     - Why `Object.hasOwn(obj, prop)` (ES2022) is immune to prototype-less objects (`Object.create(null)`) and shadowed properties (`obj.hasOwnProperty = null`).
  4. **Property Key Traversal Order:**
     - Standardized iteration order: 1. Positive integer-like keys in ascending numerical order &rarr; 2. String keys in insertion order &rarr; 3. Symbol keys in insertion order.

---

### File 14: `14-js-arrays.html` (Arrays)
- **Current State:** 783 lines. Covers mutating/non-mutating methods, iteration, spread.
- **Missing Technical Notes & Enhancements:**
  1. **Sparse Arrays vs Dense Arrays:**
     - Empty slots ("holes") vs `undefined` elements.
     - Method behavior across holes: `map()` and `filter()` skip holes; `for...of` and `Array.from()` visit holes as `undefined`.
  2. **ES2023 Non-Mutating Array Methods Suite:**
     - `toSorted()`: Returns sorted copy without in-place mutation.
     - `toReversed()`: Returns reversed copy.
     - `toSpliced()`: Returns spliced copy.
     - `with(index, value)`: Returns updated copy with element replaced at index.
  3. **Array Grouping Utilities (ES2024):**
     - `Object.groupBy(array, callback)` returning an object.
     - `Map.groupBy(array, callback)` returning a Map.
  4. **`reduce()` Deep Mechanics & Empty Array Traps:**
     - Calling `[].reduce((a, b) => a + b)` without initial value throws a fatal `TypeError: Reduce of empty array with no initial value`.

---

### File 15: `15-js-set.html` & File 16: `16-js-map.html` (Set & Map)
- **Current State:** Set 384 lines; Map 462 lines.
- **Missing Technical Notes & Enhancements:**
  1. **`SameValueZero` Key Equality:**
     - How Set/Map treat `NaN` as equal to `NaN` (unlike `===`), and `+0` equal to `-0`.
  2. **Map vs Plain Object Comprehensive Comparison:**
     - Key types (any JS value including objects/functions vs strings/symbols).
     - Direct iteration (`for...of map`), built-in `.size` property.
     - Superior performance in high-frequency addition/deletion benchmarks.
  3. **WeakMap & WeakSet Garbage Collection:**
     - Only accept non-null objects / non-registered Symbols as keys/values.
     - References are weakly held (do not prevent garbage collection if no other references exist).
     - No `.size`, no keys iteration, no clearing.
     - Canonical patterns: private class state, DOM node metadata caching without memory leaks.

---

### File 17: `17-js-dates.html` (Dates)
- **Current State:** 354 lines. Covers Date object, timestamp, Intl API.
- **Missing Technical Notes & Enhancements:**
  1. **Date 0-Indexing Traps:**
     - Months: `0` = January, `11` = December (`new Date(2025, 0, 15)` is Jan 15).
     - Days of week: `0` = Sunday, `6` = Saturday.
  2. **String Parsing Discrepancies:**
     - `new Date("2025-05-01")` parsed as UTC midnight.
     - `new Date("2025/05/01")` or `new Date("May 1, 2025")` parsed in local system time.
  3. **Intl Formatter Suite:**
     - `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat` (`"2 days ago"`), `Intl.Segmenter` (word/sentence/grapheme boundary splitting).
  4. **Temporal API Proposal (Future of JS Dates):**
     - Immutability, separation of date/time/timezone, avoiding legacy `Date` bugs.

---

### File 18: `18-js-closures-and-this.html` (Closures & this)
- **Current State:** 933 lines. Covers closures, IIFE, this binding, call/apply/bind.
- **Missing Technical Notes & Enhancements:**
  1. **The 4-Rule `this` Binding Precedence Hierarchy:**
     - 1. `new` binding (highest priority).
     - 2. Explicit binding (`call`, `apply`, `bind`).
     - 3. Implicit binding (invoked via object reference: `obj.method()`).
     - 4. Default binding (`globalThis` / `window` in sloppy mode, `undefined` in strict mode).
     - Arrow functions ignore all 4 rules; their `this` is lexically resolved at declaration time.
  2. **Closure Memory Leaks in Real-World SPAs:**
     - Retaining large parent scope variables through un-collected inner functions.
     - Debugging closures using Chrome DevTools Heap Snapshots and retainers tree.
  3. **Generic Currying Implementation:**
     - Building an arity-aware `curry(fn)` function that accumulates arguments until `fn.length` is reached.

---

### File 19: `19-js-oop.html` & File 20: `20-js-prototypes.html` (OOP & Prototypes)
- **Current State:** OOP 632 lines; Prototypes 729 lines.
- **Missing Technical Notes & Enhancements:**
  1. **Modern Class Syntax (ES2022+):**
     - Private instance fields (`#balance`) and private instance methods (`#validate()`).
     - Static private fields (`#instanceCount`) and static initialization blocks (`static { ... }`).
     - Checking private field presence with `#field in object`.
  2. **The 4-Step `new` Operator Internal Mechanics:**
     - 1. Allocates a new empty plain object `{}`.
     - 2. Sets its internal `[[Prototype]]` to `Constructor.prototype`.
     - 3. Binds `this` to the new object and runs constructor code.
     - 4. Returns the object unless the constructor explicitly returns a non-primitive object.
  3. **`new.target` Meta-Property:**
     - Detecting whether a function was invoked with `new` or directly, preventing constructor misuse.
  4. **Prototype Pollution Security Vulnerability:**
     - How merging user-controlled JSON containing `"__proto__"` can corrupt Object prototype and cause RCE or bypass authentication.
     - Mitigations: `Object.create(null)`, `Object.freeze(Object.prototype)`.

---

### File 21: `21-js-async-and-event-loop.html` (Async & Event Loop)
- **Current State:** 1,010 lines. Covers callbacks, promises, async/await, event loop.
- **Missing Technical Notes & Enhancements:**
  1. **Complete Event Loop Tick Architecture:**
     - Step 1: Execute 1 Macrotask from Call Stack.
     - Step 2: Drain **ALL** Microtasks in the microtask queue (including microtasks queued by other microtasks!) before continuing.
     - Step 3: Run Rendering Pipeline (rAF, Style, Layout, Paint) if VSync frame window is open.
     - Step 4: Pick next Macrotask.
  2. **The 6 Promise Combinators Comparison Matrix:**
     - `Promise.all()`: Fails fast on first rejection.
     - `Promise.allSettled()`: Waits for all to finish; never rejects.
     - `Promise.race()`: Settles with the first settled promise (fulfilled or rejected).
     - `Promise.any()`: Fulfilled with first resolved promise; rejects with `AggregateError` if all reject.
     - `Promise.withResolvers()` (ES2024): Returns `{ promise, resolve, reject }` without callback nesting.
     - `Promise.try(fn)` (ES2025): Executes synchronous or asynchronous functions uniformly within a Promise.
  3. **Async Loop Sequential vs Parallel Execution:**
     - `for...of` with `await` (sequential pacing).
     - `array.map()` with `Promise.all()` (concurrent parallel execution).

---

### File 22: `22-js-es6-plus-features.html` (ES6+ Features)
- **Current State:** 976 lines. Covers ESM, collections, symbols, generators.
- **Missing Technical Notes & Enhancements:**
  1. **ES Modules (ESM) vs CommonJS (CJS) Complete Deep Dive:**
     - ESM: Static analysis, asynchronous tree compilation, live read-only bindings (exporting variable updates reflecting in importers), top-level `await`.
     - CJS: Synchronous dynamic `require()`, values copied at time of export, `module.exports`.
     - Dual-package hazard and interoperability traps.
  2. **Well-Known Symbols Full Suite:**
     - `Symbol.iterator` & `Symbol.asyncIterator`.
     - `Symbol.toPrimitive`, `Symbol.hasInstance`, `Symbol.toStringTag`, `Symbol.species`.
  3. **Iterator Helpers (ES2025):**
     - Lazy transformations on iterators: `.map()`, `.filter()`, `.take()`, `.drop()`, `.flatMap()`, `.toArray()`.
  4. **Explicit Resource Management (ES2025):**
     - `using file = openFile()` and `await using connection = openDb()` deterministic cleanup using `Symbol.dispose` and `Symbol.asyncDispose`.

---

### File 23: `23-js-advanced-patterns.html` (Advanced Patterns & V8 Internals)
- **Current State:** 1,009 lines. Covers execution context, GC, Proxy, functional patterns.
- **Missing Technical Notes & Enhancements:**
  1. **V8 Engine Execution Pipeline:**
     - Parser (AST generation) &rarr; Ignition (Bytecode interpreter) &rarr; Sparkplug (Baseline compiler) &rarr; TurboFan (Optimizing JIT compiler).
  2. **Hidden Classes (Shapes/Maps) & Inline Caching (IC):**
     - How V8 assigns internal Shape descriptors to objects based on property insertion order.
     - Monomorphic (1 shape), Polymorphic (2–4 shapes), and Megamorphic (5+ shapes) inline cache states.
     - Why deleting properties with `delete` de-optimizes objects to slow dictionary mode.
  3. **V8 Generational Garbage Collector (Orinoco):**
     - New Space (Young Generation) with Semi-Spaces (From-Space / To-Space) using Scavenge algorithm.
     - Old Space (Tenured Generation) using Major Mark-Sweep-Compact.
     - Concurrent and incremental marking to prevent stop-the-world UI freezes.
  4. **Proxy Traps Complete Invariant Rules:**
     - All 13 Proxy traps.
     - Why proxies must respect target's non-configurable and non-writable property invariants.

---

### File 24: `24-js-browser-and-events.html` (Browser APIs & Events)
- **Current State:** 648 lines. Covers DOM/BOM, storage, fetch, event handling.
- **Missing Technical Notes & Enhancements:**
  1. **Event Propagation 3-Phase Lifecycle:**
     - 1. Capturing Phase (`capture: true`) &rarr; 2. Target Phase &rarr; 3. Bubbling Phase (`capture: false`).
     - `event.stopPropagation()` vs `event.stopImmediatePropagation()` (stops remaining listeners on the same element) vs `event.preventDefault()`.
  2. **Event Delegation & Composed Path:**
     - High-performance event delegation using `event.target.closest('selector')`.
     - `event.composedPath()` across Shadow DOM boundaries.
     - Passive event listeners (`{ passive: true }`) for unblocking UI scroll performance.
  3. **The 3 Modern Observers:**
     - `IntersectionObserver`: Zero-CPU lazy loading and infinite scrolling.
     - `ResizeObserver`: Container-based responsive design.
     - `MutationObserver`: Monitoring DOM additions/removals asynchronously via microtasks.
  4. **Web Workers & Zero-Copy Transferables:**
     - Spawning dedicated Web Workers, postMessage structured clone vs transferring `ArrayBuffer` ownership (`[buffer]`).

---

### File 25: `25-js-interview-polyfills-patterns.html` (Interview Patterns & Polyfills)
- **Current State:** 859 lines. Covers polyfills, design patterns, coding interview problems.
- **Missing Technical Notes & Enhancements:**
  1. **Production Polyfill Suite from Scratch:**
     - `Function.prototype.myBind`, `myCall`, `myApply`.
     - `Array.prototype.myMap`, `myFilter`, `myReduce`, `myFlat(depth)`.
     - `Promise.myAll`, `Promise.myAllSettled`, `Promise.myAny`, `Promise.myRace`.
     - `debounce(fn, delay, { immediate, trailing })`, `throttle(fn, limit)`.
     - Robust `deepClone(obj)` handling circular references, Maps, Sets, Dates, and RegExps.
  2. **Senior Interview System Design & Algorithms in JS:**
     - **LRU Cache:** $O(1)$ `get` and `put` using ES6 `Map` or Doubly Linked List + Hash Map.
     - **Event Emitter / Pub-Sub:** `on()`, `off()`, `emit()`, `once()` with isolated callback arrays.
     - **Promise Pool / Concurrency Limiter:** Executing a queue of async tasks with a maximum concurrency limit $N$.
     - **Nested Object Flattener:** Converting `{ a: { b: { c: 1 } } }` to `{ "a.b.c": 1 }` and unflattening back.
  3. **Web Security Core Defenses:**
     - Cross-Site Scripting (XSS): Stored, Reflected, DOM-based; sanitization via DOMPurify and Content Security Policy (CSP).
     - Cross-Site Request Forgery (CSRF): SameSite cookies (`Strict`, `Lax`, `None`), anti-CSRF tokens.

---

### File 26: `26-js-typed-arrays-binary.html` (Typed Arrays & Binary Data)
- **Current State:** 448 lines. Covers ArrayBuffer, TypedArrays, DataView.
- **Missing Technical Notes & Enhancements:**
  1. **Endianness Mechanics:**
     - Little-Endian (least significant byte first, standard in x86/ARM) vs Big-Endian (network byte order).
     - Explicit endianness control using `DataView.getUint16(offset, isLittleEndian)`.
  2. **Binary Transformation Pipeline:**
     - Converting between `String`, `ArrayBuffer`, `Uint8Array`, `Blob`, and Base64 (`btoa`/`atob`).
     - Shared memory introduction with `SharedArrayBuffer` and `Atomics` (synchronization across Web Workers).

---

### File 27: `27-js-streams-and-websocket.html` (Streams & WebSocket)
- **Current State:** 482 lines. Covers Streams, WebSocket basics.
- **Missing Technical Notes & Enhancements:**
  1. **Streams Backpressure Architecture:**
     - How fast producers overwhelm slow consumers without backpressure.
     - The High Water Mark, `controller.desiredSize`, and piping with `pipeTo()` / `pipeThrough()`.
  2. **WebSocket Resilient Production Patterns:**
     - Heartbeat ping/pong keepalive to detect silent connection drops.
     - Exponential backoff reconnection algorithm with jitter.
     - Sending and receiving binary frames (`ArrayBuffer` / `Blob`).

---

### File 28: `28-js-web-components.html` (Web Components & Shadow DOM)
- **Current State:** 500 lines. Covers Custom elements, Shadow DOM, templates.
- **Missing Technical Notes & Enhancements:**
  1. **Complete Custom Element Lifecycle:**
     - `connectedCallback()`, `disconnectedCallback()`, `adoptedCallback()`, `attributeChangedCallback(name, oldValue, newValue)` with `static observedAttributes`.
  2. **Shadow DOM Encapsulation & Event Retargeting:**
     - Open vs closed Shadow Root (`attachShadow({ mode: 'open' })`).
     - Event retargeting across shadow boundaries, `:host`, `::slotted`, and CSS Custom Properties piercing.

---

### File 29: `29-js-performance-api.html` (Performance & User Timing)
- **Current State:** 417 lines. Covers High resolution time, User Timing, Navigation Timing.
- **Missing Technical Notes & Enhancements:**
  1. **Core Web Vitals Programmatic Measurement:**
     - LCP (Largest Contentful Paint), INP (Interaction to Next Paint - replacing FID), and CLS (Cumulative Layout Shift) via `PerformanceObserver`.
  2. **Long Task Tracking & Frame Budgeting:**
     - Capturing long tasks (`entryType: "longtask"` $> 50\text{ms}$) that block the main thread and degrade user responsiveness.
     - Memory profiling via `performance.memory` (Chrome).

---

## 4. Phased Implementation Roadmap

1. **Phase 1: Foundations & Type Mechanics (Files 01–03)**
   - `01-js-variables.html`: TDZ runtime mechanics, global object attachment, loop closure bindings, redeclaration rules.
   - `02-js-data-types-and-values.html`: Autoboxing, `Symbol.toPrimitive` 3 hints, V8 Smi vs HeapNumber, `structuredClone` limits.
   - `03-js-operators-coercion.html`: Abstract equality 10-step algorithm, bitwise 32-bit truncation, logical assignment, comma operator, coercion puzzles.

2. **Phase 2: Execution, Control & Functions (Files 04–08)**
   - `04-js-control-flow.html`: Labeled statements, `switch` strict equality/scoping, `for...in` prototype hazard & `Object.hasOwn()`.
   - `05-js-functions.html`: Arrow function architectural limitations, function metadata (`length`, `name`), array-like conversions.
   - `06-js-error-handling.html`: Error hierarchy, `Error.cause` chaining, `finally` return override trap, global unhandled listeners.
   - `07-js-timers.html`: HTML5 4ms timer clamping, background tab throttling, `setInterval` drift vs recursive `setTimeout`, rAF.
   - `08-js-scope-and-hoisting.html`: Hoisting precedence matrix, class/import hoisting, illegal shadowing, Environment Records.

3. **Phase 3: Primitives, Math & Collections (Files 09–17)**
   - `09-js-strings.html`: UTF-16 surrogate pairs, Unicode normalization (`normalize`), modern string methods, custom template tag sanitizers.
   - `10-js-regexp.html`: Modern flags (`s`, `u`, `y`, `d`, `v`), lookarounds, named capture groups, ReDoS mitigation.
   - `11-js-numbers.html`: IEEE 754 64-bit layout, signed zeros (`+0`/`-0`), `Number.isNaN()` vs `isNaN()`, BigInt constraints.
   - `12-js-math.html`: Rounding nuances (`floor`/`ceil`/`trunc`/`round`), `crypto.getRandomValues()` CSPRNG.
   - `13-js-objects.html`: Property descriptors, integrity levels (`preventExtensions`/`seal`/`freeze`), `Object.hasOwn()`, traversal order.
   - `14-js-arrays.html`: Sparse vs dense arrays, ES2023 non-mutating suite (`toSorted`, `toReversed`, `toSpliced`, `with`), `Object.groupBy`.
   - `15-js-set.html` & `16-js-map.html`: `SameValueZero` equality, Map vs Object benchmarks, WeakMap/WeakSet GC mechanics.
   - `17-js-dates.html`: Month/day 0-indexing traps, date parsing pitfalls, `Intl` complete suite, Temporal API preview.

4. **Phase 4: OOP, Prototypes & Async Event Loop (Files 18–22)**
   - `18-js-closures-and-this.html`: `this` 4-rule binding precedence, closure memory leak diagnosis, generic currying.
   - `19-js-oop.html` & `20-js-prototypes.html`: Private fields (`#field`) & static blocks, 4-step `new` algorithm, `new.target`, Prototype Pollution defense.
   - `21-js-async-and-event-loop.html`: Event loop complete tick lifecycle (Stack &rarr; Microtasks &rarr; Render &rarr; Macrotask), all 6 Promise combinators.
   - `22-js-es6-plus-features.html`: ESM vs CJS deep dive, Well-Known Symbols suite, Iterator Helpers, Explicit Resource Management (`using`).

5. **Phase 5: V8 Internals, Browser APIs & Senior Polyfills (Files 23–29)**
   - `23-js-advanced-patterns.html`: V8 Pipeline (Ignition/TurboFan), Hidden Classes (Shapes), Inline Caches, Generational GC, Proxy traps & invariants.
   - `24-js-browser-and-events.html`: Event propagation 3 phases, `composedPath()`, Observers suite, Web Workers with zero-copy Transferables.
   - `25-js-interview-polyfills-patterns.html`: Production polyfills (`bind`, `all`, `debounce`, `throttle`, `deepClone`), LRU Cache, Concurrency Limiter, security.
   - `26-js-typed-arrays-binary.html`: Endianness (Little vs Big Endian), DataView, Base64 conversion pipeline.
   - `27-js-streams-and-websocket.html`: Streams backpressure, resilient WebSocket with heartbeat & exponential backoff.
   - `28-js-web-components.html`: Custom Elements complete lifecycle, Shadow DOM event retargeting.
   - `29-js-performance-api.html`: Core Web Vitals (LCP, INP, CLS), Long Task tracking, memory profiling.
