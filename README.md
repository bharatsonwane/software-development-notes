# Software Engineering Notes

Personal notes for technical learning and reference. Topics are organized by folder; each section will be built out gradually.

**Notes website:** [https://bharatsonwane.github.io/software-development-notes/](https://bharatsonwane.github.io/software-development-notes/)  
**Local:** [http://localhost:5500/](http://localhost:5500/)

Files use **numbered learning order**: `01-topic-name.html`, `02-topic-name.html`, and so on. Topic prefix varies by track (`html`, `css`, `js`, `ts`, `node`, `react`, `rn`, `pg`, `mongo`, etc.). Each file uses **relative** section numbers (`1.`, `1.1.` within that file). Concepts inside a file are tagged **L1–L5** (not every concept needs all five levels).

## Topics

| Topic | Folder | Index |
| ----- | ------ | ----- |
| HTML & CSS | html-css/ | HTML<br>CSS |
| JavaScript | javascript/ | Javascript Language<br>TypeScript<br>Node.js<br>React.js<br>React Native |
| Database | database/ | PostgreSQL<br>MongoDB |
| Python | python/ | README |
| Git | git/ | README |
| Docker | docker/ | README |
| System Design | system-design/ | README |
| AWS | aws/ | README |

## How to use

- Open the **Notes website** above for full chapter lists per track (HTML pages).
- Add and expand notes in the individual `.html` files as you study.
- Keep entries concise: concept, example, and key points to remember.
- Tag each concept with learning levels (L1–L5). A section may skip levels that are not written yet.

## Learning levels

Use this level system for every concept across JavaScript, HTML, CSS, Python, PostgreSQL, React, Node.js, AWS, and other tracks.

| Level | Name | Purpose |
| ----- | ---- | ------- |
| **L1** | Fundamental | What it is, why it exists, basic concepts, terminology, and basic syntax |
| **L2** | Practical | How to use it, common APIs/methods, common patterns, and real-world usage |
| **L3** | Intermediate | Deeper behavior, interactions with related concepts, common problems, and trade-offs |
| **L4** | Advanced | Complex behavior, internals, performance, architecture, and advanced patterns |
| **L5** | Deep Dive | Specification, runtime/engine internals, implementation details, edge cases, and very deep technical behavior |

```
L1 → What is it?
L2 → How do I use it?
L3 → How does it behave?
L4 → How does it work in complex situations?
L5 → How is it implemented?
```

Typical headings inside a level (use only what you need):

- **L1:** What is it? · Why does it exist? · Basic syntax · Basic examples · Key points
- **L2:** Common usage · Common APIs / methods / patterns · Practical examples · Common mistakes
- **L3:** Deeper behavior · How it interacts with other concepts · Common problems / edge cases · Practical considerations
- **L4:** Advanced behavior · Internals · Performance · Advanced patterns · Trade-offs
- **L5:** Specification / standard · Runtime / engine internals · Implementation details · Edge cases · Deep technical notes

### One concept, one place

Keep **one HTML file per topic** (for example `01-js-variables.html`). Do not split a concept into separate files such as `array-basic.html` and `array-advanced.html`.

Inside a file, each **section is a concept**. Organize that concept into L1–L5. Missing levels are fine — add them later in the same section.

Interview questions can be grouped by the same levels (L1–L5).

### Status vs current level

Track these separately.

**`current_level`** is how deep you have studied the concept: `L1` … `L5`.

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

For the first pass, focus mainly on **L1** across many concepts. Then revisit those concepts at **L2**, then **L3**, and so on.

```
Pass 1 → L1 across many concepts
Pass 2 → L2 across many concepts
Pass 3 → L3 across many concepts
Pass 4 → L4 across many concepts
Pass 5 → L5 only where deeper knowledge is useful
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
| JavaScript language | javascript/javascript-language/ | 20 |
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
