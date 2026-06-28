# TypeScript

Notes for TypeScript — static types on top of JavaScript.

Files are numbered in **learning order**: `01-ts-topic.md`, `02-ts-topic.md`, and so on.

**Prerequisite:** [JavaScript Language](../javascript-language/) (files 01–07, 09) before TypeScript.

## Contents

**01. [Setup & First Types](./01-ts-setup-first-types.md)**  
Tier — Fundamental

1. What TypeScript adds to JavaScript  
2. Installing and compiling (`tsc`)  
3. `tsconfig.json` basics  
4. Type annotations on variables  
5. Common questions

**02. [Basic Types](./02-ts-basic-types.md)**  
Tier — Fundamental

1. Primitives and `any`  
2. Arrays and tuples  
3. `enum`  
4. `unknown` vs `any`  
5. Common questions

**03. [Interfaces & Type Aliases](./03-ts-interfaces-type-aliases.md)**  
Tier — Fundamental

1. `interface` syntax  
2. `type` aliases  
3. Extending interfaces  
4. Interface vs type — when to use which  
5. Common questions

**04. [Functions & Generics](./04-ts-functions-generics.md)**  
Tier — Fundamental

1. Typed parameters and return types  
2. Optional and default parameters  
3. Function overloads  
4. Generic functions and constraints  
5. Common questions

**05. [Unions, Intersections & Literals](./05-ts-unions-intersections-literals.md)**  
Tier — Intermediate

1. Union types  
2. Intersection types  
3. Literal and discriminated unions  
4. Exhaustiveness checking  
5. Common questions

**06. [Classes & OOP](./06-ts-classes-oop.md)**  
Tier — Intermediate

1. Classes with types  
2. `public`, `private`, `protected`  
3. `implements` and `extends`  
4. Abstract classes  
5. Common questions

**07. [Type Narrowing & Guards](./07-ts-narrowing-guards.md)**  
Tier — Intermediate

1. `typeof` and `instanceof` narrowing  
2. Truthiness narrowing  
3. Type predicates (`is`)  
4. `in` operator narrowing  
5. Common questions

**08. [Utility & Mapped Types](./08-ts-utility-mapped-types.md)**  
Tier — Intermediate

1. `Partial`, `Required`, `Pick`, `Omit`  
2. `Record` and `ReturnType`  
3. Mapped types  
4. Conditional types (intro)  
5. Common questions

**09. [Modules & Project Setup](./09-ts-modules-project-setup.md)**  
Tier — Intermediate

1. ESM vs CommonJS in TS  
2. Path aliases  
3. Strict mode flags  
4. Monorepo / project references (intro)  
5. Common questions

**10. [TypeScript with React](./10-ts-typescript-react.md)**  
Tier — Intermediate

1. Typing components and props  
2. `useState` and event types  
3. Typing hooks and context  
4. Third-party types (`@types/*`)  
5. Common questions

**11. [Advanced Types](./11-ts-advanced-types.md)**  
Tier — Advanced

1. `infer` keyword  
2. Template literal types  
3. Branded types  
4. Type-safe API patterns  
5. Common questions

**12. [Best Practices](./12-ts-best-practices.md)**  
Tier — Advanced

1. Avoiding `any`  
2. Prefer `interface` vs `type` in teams  
3. ESLint and TypeScript  
4. Migration from JavaScript  
5. Common questions

## Learning path

```
01–04  Fundamental  →  setup, types, interfaces, functions, generics
05–10  Intermediate →  unions, classes, narrowing, React
11–12  Advanced     →  advanced types, production habits
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).
