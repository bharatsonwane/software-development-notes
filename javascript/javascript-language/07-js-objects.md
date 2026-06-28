# 07. Objects

> File 07 — key-value data and object patterns.

An **object** stores data as **key–value pairs** (properties). Keys are strings or symbols; values can be any type. Objects are **mutable** and passed **by reference** (File 01).

Unlike arrays, object property order is mostly insertion order for string keys (with some integer-key rules). Use objects for **named records**, **configuration**, and **behavior** (methods).

**Default rule today:** use **object literals** `{}`, **bracket notation** for dynamic keys, **destructuring** for unpacking, **spread** for shallow copies, and **`JSON.stringify`/`parse`** only for JSON-safe data.

---

## 1. Object basics

### 1.1. Object literals

The most common way to create an object:

```js
const user = {
  name: "Bharat",
  age: 30,
  isActive: true,
};

// Empty object
const empty = {};

// Trailing comma — valid and common
const point = {
  x: 10,
  y: 20,
};
```

**Object constructor** — rarely needed for plain data:

```js
const obj = new Object();
obj.name = "Bharat";

// Prefer literal — shorter and clearer
const better = { name: "Bharat" };
```

### 1.2. Dot vs bracket notation

**Dot notation** — when the key is a valid identifier and known at write time:

```js
user.name;   // "Bharat"
user.age;    // 30
```

**Bracket notation** — when the key is dynamic, has spaces, or is stored in a variable:

```js
user["name"];           // "Bharat"

const key = "age";
user[key];              // 30

const field = "full name";
const record = { "full name": "Bharat Sonwane" };
record["full name"];    // required — dot would fail
record.field;           // undefined — looks for key "field"
```

| Use dot | Use brackets |
|---------|--------------|
| Fixed, valid identifier keys | Dynamic key in a variable |
| `obj.name` | `obj[key]` |
| | Keys with spaces or special chars |
| | Computed / symbol keys |

### 1.3. Adding, updating, and deleting

```js
const user = { name: "Bharat" };

// Add or update
user.age = 30;
user["email"] = "b@example.com";

// Delete
delete user.email;

console.log(user);  // { name: "Bharat", age: 30 }
```

`delete` returns `true` (or `false` for non-configurable properties). Setting to `undefined` **keeps** the key:

```js
user.nickname = undefined;
Object.keys(user);  // still includes "nickname" if set
delete user.nickname;
```

### 1.4. Nested objects

Objects can contain other objects and arrays:

```js
const company = {
  name: "Acme",
  address: {
    city: "Pune",
    country: "IN",
  },
  employees: [
    { name: "Bharat", role: "dev" },
    { name: "Dev", role: "qa" },
  ],
};

company.address.city;              // "Pune"
company.employees[0].name;         // "Bharat"
company.employees[0]["role"];    // "dev"
```

Optional chaining for safe deep access (File 03):

```js
company.contact?.phone;          // undefined — no error
company.address?.zip ?? "N/A";   // "N/A"
```

### 1.5. Checking properties

```js
const user = { name: "Bharat", age: 30 };

// in — own OR inherited enumerable keys
"name" in user;        // true
"toString" in user;    // true — from Object.prototype

// hasOwn — own keys only (preferred for plain data)
Object.hasOwn(user, "name");     // true
Object.hasOwn(user, "toString"); // false

// undefined check — cannot tell "missing" vs "value is undefined"
user.email;            // undefined
user.name;             // "Bharat"
```

```js
// Compare
const obj = { a: undefined };

"a" in obj;                  // false — key does not exist
Object.hasOwn(obj, "a");       // false

const obj2 = { a: undefined };
"a" in obj2;                   // true — key exists, value undefined
obj2.a === undefined;          // true
```

### 1.6. Keys, values, and entries

```js
const user = { name: "Bharat", age: 30 };

Object.keys(user);     // ["name", "age"]
Object.values(user);   // ["Bharat", 30]
Object.entries(user);  // [["name", "Bharat"], ["age", 30]]
```

Loop own enumerable keys (File 04 — prefer over `for...in` on objects):

```js
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
```

`Object.fromEntries` — reverse of `entries`:

```js
const pairs = [["a", 1], ["b", 2]];
Object.fromEntries(pairs);  // { a: 1, b: 2 }
```

---

## 2. Methods & this (intro)

A **method** is a function stored as an object property.

### 2.1. Methods as properties

```js
const calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};

calculator.add(5, 3);       // 8
calculator["subtract"](5, 3); // 2
```

Functions are objects — you can attach them after creation:

```js
const user = { name: "Bharat" };

user.greet = function () {
  return `Hi, ${this.name}`;
};

user.greet();  // "Hi, Bharat"
```

### 2.2. Method shorthand (ES6)

Shorthand inside literals — same as `greet: function() { }`:

```js
const user = {
  name: "Bharat",
  greet() {
    return `Hello, ${this.name}`;
  },
};
```

Arrow functions as methods — **`this` is not the object** (File 08):

```js
const bad = {
  name: "Bharat",
  greet: () => `Hello, ${this?.name}`,  // this is NOT bad
};

const good = {
  name: "Bharat",
  greet() {
    return `Hello, ${this.name}`;
  },
};
```

### 2.3. `this` in methods (intro)

Inside a regular method, **`this`** is the object **before the dot** at call time:

```js
const user = {
  name: "Bharat",
  logName() {
    console.log(this.name);
  },
};

user.logName();  // "Bharat"

const fn = user.logName;
fn();            // undefined — this is not user (strict/module)
```

Losing `this` is a common bug — File 08 covers `bind`, `call`, and `apply`.

### 2.4. Computed property names

Use `[expression]` as a key when defining the object:

```js
const field = "status";
const value = "active";

const record = {
  id: 1,
  [field]: value,
  [`${field}Code`]: 200,
};

// { id: 1, status: "active", statusCode: 200 }
```

Works in method shorthand too:

```js
const methodName = "run";

const job = {
  [methodName]() {
    return "done";
  },
};

job.run();  // "done"
```

**Symbol keys** — unique, hidden from most loops (File 01, File 11):

```js
const id = Symbol("id");
const user = {
  name: "Bharat",
  [id]: 12345,
};

user[id];  // 12345
Object.keys(user);  // ["name"] — symbol not listed
```

---

## 3. Destructuring & spread

### 3.1. Object destructuring basics

Unpack properties into variables:

```js
const user = { name: "Bharat", age: 30, city: "Pune" };

const { name, age } = user;
console.log(name, age);  // "Bharat" 30
```

Order does not matter — names match **keys**:

```js
const { age, name } = user;  // same result
```

### 3.2. Renaming and defaults

```js
const user = { name: "Bharat" };

const { name: userName, role = "guest" } = user;
// userName = "Bharat", role = "guest"
```

Rename + default:

```js
const { name: n = "Anonymous" } = {};
console.log(n);  // "Anonymous"
```

### 3.3. Nested destructuring

```js
const response = {
  data: {
    user: { id: 1, name: "Bharat" },
  },
};

const {
  data: {
    user: { id, name },
  },
} = response;

console.log(id, name);  // 1 "Bharat"
```

### 3.4. Rest in destructuring

Collect remaining properties into a new object:

```js
const user = { id: 1, name: "Bharat", age: 30, role: "admin" };

const { id, ...profile } = user;
// id = 1
// profile = { name: "Bharat", age: 30, role: "admin" }
```

Useful for separating fields before passing to a function:

```js
function updateUser(id, changes) {
  // apply changes
}

const { id, ...changes } = user;
updateUser(id, changes);
```

Rest must be **last** in the pattern:

```js
// const { ...rest, id } = user;  // SyntaxError
```

### 3.5. Object spread

**Shallow copy** and merge (File 01, File 06):

```js
const defaults = { theme: "dark", lang: "en" };
const userPrefs = { lang: "hi" };

const settings = { ...defaults, ...userPrefs };
// { theme: "dark", lang: "hi" } — later keys win
```

Clone top level:

```js
const original = { a: 1, nested: { b: 2 } };
const copy = { ...original };

copy.a = 99;
copy.nested.b = 99;

console.log(original.a);          // 1
console.log(original.nested.b);   // 99 — nested still shared
```

Add properties:

```js
const user = { name: "Bharat" };
const withAge = { ...user, age: 30 };
```

### 3.6. Object.assign

Older API — same shallow merge behavior:

```js
const target = { a: 1 };
const source = { b: 2, c: 3 };

Object.assign(target, source);
// target is { a: 1, b: 2, c: 3 } — mutates target!

const merged = Object.assign({}, target, { d: 4 });  // new object
```

| Approach | Mutates? | Notes |
|----------|----------|-------|
| `{ ...a, ...b }` | No | Modern, readable |
| `Object.assign(target, src)` | Yes (`target`) | Use `{}` as first arg for copy |

Destructuring in function parameters (File 05):

```js
function createUser({ name, age = 18, role = "user" }) {
  return { name, age, role };
}

createUser({ name: "Bharat" });
```

---

## 4. JSON

**JSON** (JavaScript Object Notation) is a **text format** for data exchange. It is **not** the same as a JS object — only a subset of values are valid JSON.

### 4.1. JSON.stringify

Convert a JS value to a JSON **string**:

```js
const user = { name: "Bharat", age: 30 };

JSON.stringify(user);
// '{"name":"Bharat","age":30}'

JSON.stringify(user, null, 2);  // pretty-print with 2-space indent
```

Replacer — filter keys or transform:

```js
JSON.stringify(user, ["name"]);  // '{"name":"Bharat"}'

JSON.stringify(user, (key, value) => {
  if (key === "age") return undefined;  // omit age
  return value;
});
```

### 4.2. JSON.parse

Parse a JSON string back to JS values:

```js
const json = '{"name":"Bharat","age":30}';
const user = JSON.parse(json);

user.name;  // "Bharat"
```

Reviver — transform while parsing:

```js
JSON.parse('{"date":"2026-06-25"}', (key, value) => {
  if (key === "date") return new Date(value);
  return value;
});
```

Always **validate** external JSON — `parse` throws on invalid input:

```js
try {
  JSON.parse("{ invalid }");
} catch (e) {
  console.error("Invalid JSON");
}
```

### 4.3. JSON limitations

| JS value | In JSON? |
|----------|----------|
| string, number, boolean, null | Yes |
| object, array | Yes (nested) |
| `undefined` | No — omitted in objects; `null` in arrays |
| function | No |
| `Symbol` | No |
| `Date` | Serialized as ISO string — not auto-revived |
| `NaN`, `Infinity` | No — become `null` in arrays |
| circular references | `stringify` throws |

```js
JSON.stringify({ a: undefined, b: 1 });     // '{"b":1}'
JSON.stringify([undefined, 1]);           // '[null,1]'

JSON.stringify({ fn: () => {} });         // '{}'

const obj = {};
obj.self = obj;
// JSON.stringify(obj);  // TypeError — circular
```

For APIs and storage, design **plain JSON-serializable** DTOs — no methods, dates as strings or epoch numbers.

---

## 5. Common questions

**5.1. What is the difference between dot and bracket notation?**  
A: Dot works for fixed identifier keys. Brackets work for **dynamic** keys, variables, and keys with spaces or special characters.

**5.2. How do you check if an object has its own property?**  
A: Use **`Object.hasOwn(obj, key)`** (or `obj.hasOwnProperty(key)` on plain objects). Avoid relying only on `obj.key === undefined`.

**5.3. What is the difference between `in` and `Object.hasOwn`?**  
A: **`in`** checks the prototype chain too. **`Object.hasOwn`** checks **own** properties only.

**5.4. Does spread `{ ...obj }` deep copy an object?**  
A: **No.** It is a **shallow** copy. Nested objects are still shared. Use `structuredClone()` for deep copies of plain data (File 01).

**5.5. What is object destructuring?**  
A: Syntax to unpack properties from an object into variables: `const { name, age } = user`. Supports renaming, defaults, nesting, and rest (`...rest`).

**5.6. What is the difference between `Object.assign` and spread?**  
A: Both do **shallow** merge. `Object.assign(target, src)` **mutates** `target`. Spread creates a **new** object: `{ ...a, ...b }`.

**5.7. What is the difference between a JS object and JSON?**  
A: A JS object is an in-memory structure (any valid property values, methods). JSON is a **string format** with a limited set of types — no functions, `undefined`, or symbols.

**5.8. Why should arrow functions be avoided as object methods?**  
A: Arrow methods do not have their own **`this`**. They inherit `this` from the enclosing scope, so `this` usually will not refer to the object. Use method shorthand instead (File 08).
