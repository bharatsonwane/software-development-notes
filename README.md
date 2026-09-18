# Software Engineering Notes

Personal notes for technical learning and reference. Topics are organized by folder; each section will be built out gradually.

**Notes website:** [https://bharatsonwane.github.io/software-development-notes/](https://bharatsonwane.github.io/software-development-notes/)  
**Local:** [http://localhost:5500/](http://localhost:5500/)

Files use **numbered learning order**: `01-topic-name.html`, `02-topic-name.html`, and so on. Topic prefix varies by track (`html`, `css`, `js`, `ts`, `node`, `react`, `rn`, `pg`, `mongo`, etc.). Each file uses **relative** section numbers (`1.`, `1.1.` within that file). Concepts inside a file are tagged **L1–L3** (not every concept needs all three levels).

## Topics

| Topic | Folder | Index |
| ----- | ------ | ----- |
| HTML & CSS | html-css/ | HTML<br>CSS |
| JavaScript | javascript/ | Javascript Language<br>TypeScript<br>Node.js<br>React.js<br>React Native |
| Database | database/ | PostgreSQL<br>MongoDB |
| Python | python/ | python.html (32) |
| Git | git/ | README |
| Docker | docker/ | README |
| System Design | system-design/ | README |
| AWS | aws/ | README |
| AI coding models | ai/ | [ai-coding-models.md](ai/ai-coding-models.md) |

## How to use

- Open the **Notes website** above for full chapter lists per track (HTML pages).
- Add and expand notes in the individual `.html` files as you study.
- Keep entries concise: concept, example, and key points to remember.
- Tag each concept with learning levels (L1–L3). A section may skip levels that are not written yet.

---

## Authoring Standards

These rules govern how notes are written across **all tracks**. Currently enforced in the Python track; all other tracks will adopt them progressively.

### File naming

Files must follow a strict **numbered learning order**:

```
NN-<track-prefix>-<topic-slug>.html
```

Examples: `01-py-introduction.html`, `14-py-functions.html`, `01-js-variables.html`.

- Numbers start at `01` with zero-padding.
- The track prefix (`py`, `js`, `ts`, `html`, `css`, `node`, `react`, `rn`, `pg`, `mongo`, etc.) must match the folder convention.
- **Do not rename, renumber, or split existing files.** All updates are made in-place.
- One HTML file per topic. Do not create `array-basic.html` and `array-advanced.html` — put both inside one `arrays.html` file organised by L1–L3.

---

### Prerequisite-tier ordering (no forward references)

Each track has a **prerequisite hierarchy** — an ordered sequence of tiers where every earlier tier must be fully understood before the next one begins.

**The core rule:** A code example or explanation in File `N` may **only use language constructs introduced in Files 1 through N**. No construct may appear before its canonical home file.

> **Why this matters:** Using `def`, `class`, or `try/except` in a file about variables creates cognitive overload for a beginner who has not yet learned those constructs. This is called the *Curse of Knowledge* — an experienced writer uses advanced mechanics to illustrate introductory concepts without realising the burden it places on a first-time reader.

#### Python prerequisite tiers (reference implementation)

| Tier | Files | First-time constructs introduced |
| :--- | :--- | :--- |
| Tier 1 | 01 | `print()`, literals, expressions |
| Tier 2 | 02 | Variable assignment, comments, indentation |
| Tier 3 | 03–05 | Built-in types, `type()`, `id()`, casting |
| Tier 4 | 06 | Operators, ternary expressions |
| Tier 5 | 07 | `input()`, `print()` parameters, f-strings |
| Tier 6 | 08 | `if/elif/else`, `while`, `for`, `break`, `continue` — **first loops** |
| Tier 7 | 09–13 | Strings, Lists, Tuples, Sets, Dictionaries |
| Tier 8 | 14–15 | `def`, `return`, `*args`, `**kwargs`, lambda — **first functions** |
| Tier 9 | 16–17 | `import`, modules, packages |
| Tier 10 | 18 | `open()`, file handling, context managers |
| Tier 11 | 19–21 | `class`, `self`, inheritance, polymorphism — **first classes** |
| Tier 12 | 22 | `try`, `except`, `finally`, `raise` — **first exception handling** |
| Tier 13 | 23–24 | `@decorators`, `yield`, generators — **first decorators** |
| Tier 14 | 25–33 | Threading, Regex, DB, Serialization, Logging, Testing, Pydoc |

When building prerequisite tiers for other tracks (JavaScript, HTML/CSS, etc.), follow the same layered pattern starting from the simplest possible constructs.

---

### Beginner-first code examples

Within any file, every runnable code snippet must be fully understood using only the constructs from that file's tier and below.

**Preferred approach for early tiers:**
- Use **sequential, top-level scripts** — no wrapping inside `def` or `class`.
- Use **direct variable assignments and `print()` calls** to demonstrate a concept.
- If a concept naturally requires a more advanced construct (e.g., mutation requires a loop), **show it with a commented-out alternative** and add a forward-reference note.

**Forward-reference note format:**

```
# Preview — this will be mastered in File NN (<topic>).
```

or inline as a HTML callout:

```html
<div class="callout callout-info">
  In File NN (<topic>), we will learn how to encapsulate this into a reusable function.
</div>
```

**Preferred beginner replacement patterns:**

| Instead of… | Use… |
| :--- | :--- |
| Wrapping in `def func():` before functions are taught | Top-level sequential `variable = …` and `print(…)` |
| `try/except` before exceptions are taught | Commented-out bad code with an explanation of the error |
| `for` / `while` loops before control flow is taught | Repeated `print()` statements or a note to the reader |
| `class Foo:` before OOP is taught | Plain variable assignments or `types.SimpleNamespace` |
| `@decorator` before decorators are taught | Manual dictionary-based memoization or function call |
| List comprehension before lists/comprehensions are taught | Explicit `split()` + indexing steps |

---

### Concept preservation and relocation

**No concept is ever deleted.** If an advanced construct appears too early, it is:

1. **Replaced** in the early file with a beginner-friendly equivalent.
2. **Relocated** to the file where it naturally belongs (its canonical home).
3. **Registered** in the track's audit/plan document (or a comment in the destination file) so nothing is lost.

This guarantees **zero concept loss** while maintaining pedagogical correctness.

---

### Code snippet quality rules

- All Python code snippets inside `<pre>` blocks must be **syntactically valid** (parseable by Python's AST).
- HTML special characters inside `<pre>` blocks must be **entity-escaped**: `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`.
- Snippets should be **self-contained** — a reader can copy-paste and run the snippet without importing additional context.
- Type annotations (PEP 484 / PEP 526) in Python files must use **modern syntax**: `list[int]` not `List[int]`, `dict[str, int]` not `Dict[str, int]` (Python 3.9+ built-in generics).
- Shell/bash commands in `<pre>` blocks are excluded from Python AST validation.

---

### Audit and verification checklist

Use this checklist when reviewing or adding content to any file:

- [ ] File follows `NN-<prefix>-<slug>.html` naming.
- [ ] Every code example uses only constructs from Tiers 1–N (no forward references).
- [ ] Advanced constructs that were moved are noted with a forward-reference callout in the early file.
- [ ] Advanced constructs that were removed from early files have been added (or scheduled) in their canonical destination file.
- [ ] All `<pre>` code blocks are entity-escaped.
- [ ] All Python snippets parse cleanly (no AST errors).
- [ ] Each section is tagged L1, L2, or L3.
- [ ] Interview questions are grouped inside the relevant section at the appropriate level.

## Learning levels

Use this level system for every concept across JavaScript, HTML, CSS, Python, PostgreSQL, React, Node.js, AWS, and other tracks.

| Level | Name | Purpose |
| ----- | ---- | ------- |
| **L1** | Fundamental | What it is and how to use it: terminology, basic syntax, common APIs, and everyday usage |
| **L2** | Intermediate | How it behaves: deeper behavior, related concepts, common problems, and trade-offs |
| **L3** | Advanced | How it works in complex cases: internals, performance, architecture, specification, and edge cases |

```
L1 → What is it, and how do I use it?
L2 → How does it behave?
L3 → How does it work in complex cases?
```

These labels are a **default**, not a hard rule. Tag a block by how hard that concept is. A section may be only L1, skip L2, or start at L2.

Typical headings inside a level (use only what you need):

- **L1:** What is it? · Why does it exist? · Basic syntax · Common usage · Common APIs / patterns · Key points
- **L2:** Deeper behavior · How it interacts with other concepts · Common problems / edge cases
- **L3:** Internals · Performance · Architecture · Specification / engine · Edge cases

### One concept, one place

Keep **one HTML file per topic** (for example `01-js-variables.html`). Do not split a concept into separate files such as `array-basic.html` and `array-advanced.html`.

Inside a file, each **section is a concept**. Organize that concept into L1–L3. Missing levels are fine — add them later in the same section.

Interview questions can be grouped by the same levels (L1–L3).

### Status vs current level

Track these separately.

**`current_level`** is how deep you have studied the concept: `L1` … `L3`.

**`status`** is how you feel at that level:

```
not-started
learning
comfortable
strong
revision
```

Example: `current_level: L3` and `status: learning` means you are currently studying this concept at L3. `current_level: L3` and `status: comfortable` means you have studied through L3 and feel comfortable with it.

Topic/track checkboxes on the home page (`Not started` / `In progress` / `Done`) are separate — those mark whether a whole track’s notes exist, not your depth on one concept.

### Study rule

Do **not** try to master a concept completely before moving on.

For the first pass, focus mainly on **L1** across many concepts. Then revisit those concepts at **L2**, then **L3**.

```
Pass 1 → L1 across many concepts
Pass 2 → L2 across many concepts
Pass 3 → L3 across many concepts
```

Goal: **build breadth first, then progressively increase depth.**

## Suggested learning order

```
HTML & CSS → JavaScript language → TypeScript → React / Node
         ↘ Git (anytime)     ↘ Database, Python (parallel)
Docker & AWS → System Design (after backend basics)
```

---

## HTML & CSS

Notes for building web pages. Prefix: `html`, `css`.

**Prerequisite:** none — start here.

**Suggested order:** complete **HTML** (files 01–08) before deep **CSS layout** (Flexbox/Grid in file 04–05).

| Track | Folder | Chapters |
| ----- | ------ | -------- |
| HTML | html-css/html/ | 10 |
| CSS | html-css/css/ | 12 |

---

## JavaScript

Notes for the JavaScript language and related ecosystems. Prefix: `js`, `ts`, `node`, `react`, `rn`.

**Prerequisite:** basic HTML & CSS (HTML 01–06, CSS 01–05) before React and DOM-heavy topics.

**Suggested order:** JavaScript language → TypeScript → React.js or Node.js → React Native.

| Track | Folder | Chapters |
| ----- | ------ | -------- |
| JavaScript language | javascript/javascript-language/ | 29 |
| TypeScript | javascript/typescript/ | 12 |
| Node.js | javascript/nodejs/ | 14 |
| React.js | javascript/reactjs/ | 14 |
| React Native | javascript/react-native/ | 14 |

Interview topic checklist: `javascript/javascript-language/notes.txt`

---

## Database

Notes for relational and document databases. Prefix: `pg`, `mongo`.

**Prerequisite:** none for basics.

**Suggested order:** learn **SQL fundamentals** (PostgreSQL) before **MongoDB schema design** — document modeling is easier once you understand tables, joins, and normalization.

| Track | Folder | Chapters |
| ----- | ------ | -------- |
| PostgreSQL (SQL) | database/postgresql/ | 10 |
| MongoDB (NoSQL) | database/mongodb/ | 10 |

---

## Progress

- [ ] HTML & CSS
- [ ] JavaScript (includes TypeScript)
- [ ] Database (PostgreSQL, MongoDB)
- [ ] Python
- [ ] Git
- [ ] Docker
- [ ] System Design
- [ ] AWS
