# 13. Strings, Numbers & Dates

> File 13 — string methods, Number/Math, floating point, Date and Intl.

Builds on types (File 01) and operators (File 03).

Interactive visualizer: open [13-js-strings-numbers-dates-animation.html](./13-js-strings-numbers-dates-animation.html) in a browser — string index/length, slice vs substring, includes/indexOf, Number parsing, Math.round/floor, Date getTime/ISO, padStart (Run / Step).

---

## 1. Strings

### 1.1. Common string methods

```js
const s = "  Hello, World  ";

s.length;                    // 17
s.trim();                    // "Hello, World"
s.toUpperCase();             // "  HELLO, WORLD  "
s.toLowerCase();
s.slice(0, 5);               // "  Hel"
s.substring(2, 7);           // "Hello"
s.includes("World");         // true
s.startsWith("  H");         // true
s.endsWith("d  ");
s.indexOf("o");              // 8
s.lastIndexOf("o");
s.replace("World", "JS");    // "  Hello, JS  "
s.replaceAll("l", "L");      // replace all (ES2021)
s.split(", ");               // ["  Hello", "World  "]
s.concat("!");               // prefer + or template literals
"abc".repeat(3);             // "abcabcabc"
"5".padStart(3, "0");        // "005"
```

### 1.2. Template literals

```js
const name = "Ada";
const msg = `Hello, ${name}!`;
const multiline = `
  line 1
  line 2
`;
```

### 1.3. Tagged templates

```js
function highlight(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] ? `<b>${values[i]}</b>` : "");
  }, "");
}

const user = "Ada";
highlight`User: ${user}`;  // "User: <b>Ada</b>"
```

File 11 covers tagged templates in ES6+ context.

### 1.4. Unicode

```js
"😀".length;                    // 2 — surrogate pair
[..."😀"].length;                // 1 — code points
"😀".codePointAt(0);            // 128512
String.fromCodePoint(128512);   // "😀"
```

Use **`for...of`** on strings for code points, not index loops for emoji.

### 1.5. String immutability

Strings are **immutable** — methods return **new** strings:

```js
let s = "hello";
s.toUpperCase();  // "HELLO"
console.log(s);     // still "hello"
```

---

## 2. Numbers & Math

### 2.1. Number object and methods

```js
Number.isNaN(NaN);        // true
Number.isFinite(42);      // true
Number.isInteger(3.0);    // true
Number.parseInt("42px");  // 42
Number.parseFloat("3.14");
(3.14159).toFixed(2);     // "3.14"
(3.14159).toPrecision(3); // "3.14"
```

Prefer **`Number.isNaN`** over global **`isNaN`** (coerces first).

### 2.2. BigInt

```js
const big = 9007199254740991n;
big + 1n;  // 9007199254740992n
// big + 1;  // TypeError — cannot mix BigInt and Number
```

File 01 — primitive intro.

### 2.3. NaN and Infinity

```js
0 / 0;           // NaN
Number("abc");   // NaN
1 / 0;           // Infinity
-1 / 0;          // -Infinity
```

### 2.4. Floating point precision

All JS numbers are **IEEE 754 doubles**:

```js
0.1 + 0.2;                    // 0.30000000000000004
0.1 + 0.2 === 0.3;            // false
(0.1 + 0.2).toFixed(1);       // "0.3"
Number((0.1 + 0.2).toFixed(2)); // 0.3
```

For money, store **cents as integers** or use a decimal library.

### 2.5. Math object

```js
Math.abs(-5);       // 5
Math.ceil(4.2);     // 5
Math.floor(4.8);    // 4
Math.round(4.5);    // 5
Math.max(1, 5, 3);  // 5
Math.min(1, 5, 3);
Math.pow(2, 3);     // 8 — or 2 ** 3
Math.sqrt(16);      // 4
Math.random();      // 0 <= n < 1
Math.trunc(4.9);    // 4
```

**Random integer in range:**

```js
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

## 3. Dates

### 3.1. Date object

```js
const now = new Date();
const specific = new Date("2026-06-25T10:00:00Z");
const fromParts = new Date(2026, 5, 25);  // month 0-indexed

now.getTime();           // timestamp ms since epoch
Date.now();              // same, static
now.toISOString();       // "2026-06-25T..."
now.toLocaleDateString();
```

### 3.2. Timestamp and UTC

```js
const d = new Date();
d.getUTCHours();
d.getUTCMinutes();
Date.UTC(2026, 5, 25);   // ms at UTC midnight
```

Store dates as **ISO strings** or **epoch ms** in JSON/APIs.

### 3.3. Timezones

`Date` internally is UTC; display methods use **local timezone**. For robust timezone logic use **`Temporal`** (stage 4+) or libraries (**date-fns**, **Luxon**, **Day.js**).

### 3.4. Intl API

```js
new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date());

new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
}).format(1234.5);  // "₹1,234.50"
```

---

## 4. Common questions

**4.1. Why is `0.1 + 0.2 !== 0.3`?**  
A: Binary floating point cannot represent some decimals exactly. Use rounding or integer cents for money.

**4.2. How do you check for NaN?**  
A: **`Number.isNaN(value)`** — not `value === NaN` or global `isNaN`.

**4.3. Are strings mutable?**  
A: **No** — methods return new strings.

**4.4. Why does `"😀".length` equal 2?**  
A: `.length` counts UTF-16 code units; emoji use surrogate pairs. Use spread or `for...of` for code points.

**4.5. What is the difference between `slice` and `substring`?**  
A: Both extract substrings. **`slice`** accepts negative indices; **`substring`** swaps negative to 0.

**4.6. How should I store dates in APIs?**  
A: **ISO 8601 strings** (`toISOString()`) or **epoch milliseconds** — avoid locale-specific strings.
