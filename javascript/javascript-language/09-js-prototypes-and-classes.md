# 09. Prototypes & Classes

> File 09 — inheritance in JavaScript.

JavaScript uses **prototypal inheritance**: objects can delegate property lookups to another object called their **prototype**. **`class`** syntax (ES6) is **syntactic sugar** over this prototype system — understanding prototypes explains how `new`, `extends`, and `instanceof` actually work.

Every object (except `Object.create(null)`) has an internal link to a prototype. Functions have an extra **`prototype`** property used when the function is called with **`new`**.

**Default rule today:** use **`class`** for constructors and inheritance in application code; know **prototypes** for debugging, interviews, and reading legacy code.

Interactive visualizer: open [09-js-prototypes-classes-animation.html](./09-js-prototypes-classes-animation.html) in a browser — chain lookup, `new`, `instanceof`, manual inheritance, `class extends` (Run / Step).

---

## 1. Prototype chain

### 1.1. What is a prototype?

When you read `obj.key`, JavaScript:

1. Looks for **`key`** on `obj` itself (own property).
2. If missing, follows the **prototype link** to the parent object.
3. Repeats until found or the chain ends at **`null`**.

```js
const animal = {
  eats: true,
  walk() {
    console.log("walking");
  },
};

const rabbit = {
  jumps: true,
};

// Link rabbit's prototype to animal
Object.setPrototypeOf(rabbit, animal);

rabbit.jumps;   // true — own property
rabbit.eats;    // true — from animal
rabbit.walk();  // "walking" — method on animal
```

This linked list is the **prototype chain**.

### 1.2. `[[Prototype]]`, `__proto__`, and `Object.getPrototypeOf`

The spec uses internal slot **`[[Prototype]]`**. In practice:

```js
// Modern — preferred
Object.getPrototypeOf(rabbit);   // animal
Object.setPrototypeOf(rabbit, animal);

// Legacy — avoid in new code
rabbit.__proto__;  // animal (deprecated accessor)
```

Object literal `{}` inherits from **`Object.prototype`**:

```js
const obj = {};
Object.getPrototypeOf(obj) === Object.prototype;  // true

obj.toString();  // "[object Object]" — from Object.prototype
```

**`Object.create(null)`** — object with **no** prototype (useful for pure dictionaries):

```js
const dict = Object.create(null);
dict.name = "Bharat";
dict.toString;  // undefined — no inherited methods
```

### 1.3. The `prototype` property on functions

**Functions** (except arrows) have a **`prototype`** object. When you call the function with **`new`**, the new object's `[[Prototype]]` is set to that `prototype`:

```js
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  return `Hi, ${this.name}`;
};

const u = new User("Bharat");

Object.getPrototypeOf(u) === User.prototype;  // true
u.greet();  // "Hi, Bharat"
```

| Term | What it is |
|------|------------|
| `obj.[[Prototype]]` | Link to parent object for lookup |
| `Fn.prototype` | Object used as `[[Prototype]]` for `new Fn()` instances |
| `obj.__proto__` | Legacy accessor to `[[Prototype]]` |

Arrow functions have **no** `prototype` property — they cannot be constructors.

### 1.4. Own properties vs inherited

```js
const parent = { shared: 1, unique: "parent" };
const child = Object.create(parent);
child.unique = "child";

child.shared;   // 1 — inherited
child.unique;   // "child" — own, shadows parent.unique

Object.hasOwn(child, "shared");  // false
Object.hasOwn(child, "unique");  // true
```

**Shadowing** — own property hides inherited same-named property:

```js
User.prototype.name = "default";
const u = new User("Bharat");
u.name;  // "Bharat" — own property wins
```

### 1.5. `instanceof` and the prototype chain

**`instanceof`** checks if **`Constructor.prototype`** appears anywhere in the object's prototype chain:

```js
u instanceof User;     // true
u instanceof Object;   // true — Object.prototype in chain

[] instanceof Array;   // true
[] instanceof Object;  // true
```

```js
function checkInstance(obj, Constructor) {
  return Constructor.prototype.isPrototypeOf(obj);
}

checkInstance(u, User);  // true
```

`instanceof` is unreliable across realms (iframes) — use `Object.prototype.toString` or feature checks for libraries.

---

## 2. Object creation

### 2.1. Object literals

```js
const user = { name: "Bharat", age: 30 };
```

Prototype is **`Object.prototype`** automatically. Methods on the literal are **own** properties unless added to a shared prototype (unusual for literals).

### 2.2. `Object.create`

Create an object with an explicit prototype:

```js
const proto = {
  greet() {
    return `Hello, ${this.name}`;
  },
};

const user = Object.create(proto);
user.name = "Bharat";

user.greet();  // "Hello, Bharat"
```

Second argument — property descriptors (like `Object.defineProperties`):

```js
const user = Object.create(proto, {
  name: { value: "Bharat", writable: true, enumerable: true },
});
```

Pure prototypal pattern — no constructor function required.

### 2.3. Constructor functions

Before `class`, constructors were the standard pattern:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.greet = function () {
  return `Hi, ${this.name}`;
};

User.prototype.isAdult = function () {
  return this.age >= 18;
};
```

Shared methods live on **`User.prototype`** — one copy shared by all instances (memory efficient).

Do not redefine methods **inside** the constructor for each instance:

```js
// Avoid — new function object per instance
function Bad(name) {
  this.name = name;
  this.greet = function () { return this.name; };
}
```

### 2.4. The `new` keyword

What `new User("Bharat")` roughly does (File 08 — `new` binding):

1. Create empty object `{}`.
2. Set object's `[[Prototype]]` to `User.prototype`.
3. Call `User` with **`this`** bound to that object.
4. If constructor returns a non-object, return the new object; else return constructor's return value.

```js
function User(name) {
  this.name = name;
  // implicit return of `this` when not returning object
}

const u = new User("Bharat");
// u.[[Prototype]] → User.prototype
// u.name → "Bharat"
```

Calling without `new` on a constructor — **`this`** may be global or `undefined` (bug):

```js
const broken = User("Bharat");  // avoid — pollutes global or fails strict
```

---

## 3. Inheritance

### 3.1. Prototypal inheritance

**Inheritance** in JS means one object's prototype chain includes another object's methods/properties.

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name);  // "super" constructor — own props on this
  this.breed = breed;
}

// Link prototypes — Dog.prototype inherits from Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // fix constructor pointer

Dog.prototype.speak = function () {
  return `${this.name} barks`;
};

const d = new Dog("Rex", "Lab");
d.speak();           // "Rex barks"
d instanceof Dog;    // true
d instanceof Animal; // true
```

### 3.2. `Animal.call(this, ...)` pattern

Constructor **stealing** — parent constructor runs with child's `this` to set up own properties:

```js
function Parent(a) {
  this.a = a;
}

function Child(a, b) {
  Parent.call(this, a);  // super(...args) in classes
  this.b = b;
}
```

Methods still need prototype linking (`Object.create` or `class extends`).

### 3.3. Classes vs manual prototype setup

`class Dog extends Animal` does the prototype wiring for you (section 4). Manual pattern above is what happens under the hood — useful for debugging and interviews.

**Composition over inheritance** — often prefer containing objects or mixins over deep chains:

```js
const canWalk = {
  walk() { console.log("walking"); },
};

const user = Object.assign(Object.create(null), canWalk, { name: "Bharat" });
```

---

## 4. Classes

ES6 **`class`** syntax is clearer but compiles to prototype + constructor mechanics.

### 4.1. Class basics

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, ${this.name}`;
  }

  isAdult() {
    return this.age >= 18;
  }
}

const u = new User("Bharat", 30);
u.greet();  // "Hi, Bharat!"
```

- Methods are on **`User.prototype`** (non-enumerable).
- **`constructor`** is the initialization function called by `new`.
- **No hoisting** like function declarations — TDZ until class line (File 02).

```js
typeof User;  // "function" — classes are functions
User.prototype.greet === u.greet;  // false — bound method, but same prototype fn
```

### 4.2. `extends` and `super`

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // must call before using `this` in subclass constructor
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }
}

const d = new Dog("Rex", "Lab");
d.speak();  // "Rex barks"
```

Rules:

- **`super(...)`** in subclass **`constructor`** must run before **`this`** is used.
- **`super.method()`** calls parent prototype method.

```js
class Dog extends Animal {
  speak() {
    return super.speak() + " (loudly)";
  }
}
```

### 4.3. Static methods and fields

**Static** — on the **constructor**, not instances:

```js
class User {
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.age);
  }

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const u = User.fromJSON('{"name":"Bharat","age":30}');
```

Static fields (ES2022+):

```js
class Config {
  static apiUrl = "https://api.example.com";
  static version = 1;
}

Config.apiUrl;
```

Instance fields (ES2022+):

```js
class Counter {
  count = 0;

  increment() {
    this.count++;
  }
}
```

### 4.4. Getters and setters

```js
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  set area(value) {
    // example: set square from area
    const side = Math.sqrt(value);
    this.width = side;
    this.height = side;
  }
}

const rect = new Rectangle(4, 5);
rect.area;       // 20 — accessed like property
rect.area = 25;  // uses setter
```

Also valid in object literals (File 07):

```js
const user = {
  _name: "",
  get name() { return this._name; },
  set name(v) { this._name = v.trim(); },
};
```

### 4.5. Class vs constructor function

| Feature | `class` | Constructor + `.prototype` |
|---------|---------|------------------------------|
| Syntax | Cleaner, `extends`/`super` | Manual `Object.create` wiring |
| Methods | Non-enumerable by default | You define on `.prototype` |
| Hoisting | TDZ | Function declaration hoisted |
| `new` required | Yes (Class constructor) | Yes |
| Under the hood | Prototypes | Same |

Use **`class`** in modern codebases unless maintaining legacy constructor patterns.

### 4.6. Private fields and methods (ES2022+)

True instance privacy with `#`:

```js
class BankAccount {
  #balance = 0;

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const acct = new BankAccount();
acct.deposit(100);
// acct.#balance;  // SyntaxError — private outside class
```

Private is **hard privacy** — not accessible via closure trick from outside. Different from convention `_prefix`.

---

## 5. Common questions

**5.1. What is the prototype chain?**  
A: The linked list of objects JavaScript walks when a property is not found on the object itself. Lookup goes **own properties → prototype → prototype's prototype → … → null**.

**5.2. What is the difference between `__proto__` and `prototype`?**  
A: **`__proto__`** (legacy) is an object's link to its parent prototype. **`prototype`** is a property on **constructor functions** — the object assigned as `[[Prototype]]` to instances created with `new`.

**5.3. What does `new` do?**  
A: Creates an object, sets its prototype to `Constructor.prototype`, runs the constructor with `this` bound to that object, and returns the object (unless the constructor returns another object).

**5.4. Is JavaScript class-based or prototype-based?**  
A: **Prototype-based** at runtime. **`class`** is syntactic sugar over constructor functions and prototype delegation.

**5.5. What does `instanceof` check?**  
A: Whether **`Constructor.prototype`** exists anywhere in the object's prototype chain. Not a check of own properties or "type" in the OOP class sense alone.

**5.6. Why call `Animal.call(this, name)` in subclass constructors?**  
A: To run the **parent constructor** with the **child instance** as `this`, initializing inherited own properties. In classes, **`super(...)`** does this.

**5.7. Can arrow functions be used as constructors?**  
A: **No.** They have no `prototype` and cannot be used with `new`.

**5.8. What is the difference between own and inherited properties?**  
A: **Own** properties exist directly on the object. **Inherited** properties come from the prototype chain. Use **`Object.hasOwn(obj, key)`** to test own properties only.
