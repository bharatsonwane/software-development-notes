# Software Engineering Notes

Personal notes for technical learning and reference. Topics are organized by folder; each section will be built out gradually.

Files use **numbered learning order**: `01-topic-name.md`, `02-topic-name.md`, and so on. Topic prefix varies by track (`html`, `css`, `js`, `ts`, `node`, `react`, `rn`, `pg`, `mongo`, etc.). Each file uses **relative** section numbers (`1.`, `1.1.` within that file).

## Topics

| Topic | Folder | Index |
| ----- | ------ | ----- |
| HTML & CSS | [html-css/](html-css/) | [HTML](./html-css/html/README.md)<br>[CSS](./html-css/css/README.md) |
| JavaScript | [javascript/](javascript/) | [Javascript Language](./javascript/javascript-language/README.md)<br>[TypeScript](./javascript/typescript/README.md)<br>[Node.js](./javascript/nodejs/README.md)<br>[React.js](./javascript/reactjs/README.md)<br>[React Native](./javascript/react-native/README.md) |
| Database | [database/](database/) | [PostgreSQL](./database/postgresql/README.md)<br>[MongoDB](./database/mongodb/README.md) |
| Python | [python/](python/) | [README](./python/README.md) |
| Git | [git/](git/) | [README](./git/README.md) |
| Docker | [docker/](docker/) | [README](./docker/README.md) |
| System Design | [system-design/](system-design/) | [README](./system-design/README.md) |
| AWS | [aws/](aws/) | [README](./aws/README.md) |

## How to use

- Use the **Index** links in the table above for full chapter lists per track.
- Add and expand notes in the individual `.md` files as you study.
- Keep entries concise: concept, example, and key points to remember.

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
| HTML | [html-css/html/](./html-css/html/) | 10 — [full list](./html-css/html/README.md) |
| CSS | [html-css/css/](./html-css/css/) | 12 — [full list](./html-css/css/README.md) |

---

## JavaScript

Notes for the JavaScript language and related ecosystems. Prefix: `js`, `ts`, `node`, `react`, `rn`.

**Prerequisite:** basic HTML & CSS (HTML 01–06, CSS 01–05) before React and DOM-heavy topics.

**Suggested order:** JavaScript language → TypeScript → React.js or Node.js → React Native.

| Track | Folder | Chapters |
| ----- | ------ | -------- |
| JavaScript language | [javascript/javascript-language/](./javascript/javascript-language/) | 16 — [full list](./javascript/javascript-language/README.md) |
| TypeScript | [javascript/typescript/](./javascript/typescript/) | 12 — [full list](./javascript/typescript/README.md) |
| Node.js | [javascript/nodejs/](./javascript/nodejs/) | 14 — [full list](./javascript/nodejs/README.md) |
| React.js | [javascript/reactjs/](./javascript/reactjs/) | 14 — [full list](./javascript/reactjs/README.md) |
| React Native | [javascript/react-native/](./javascript/react-native/) | 14 — [full list](./javascript/react-native/README.md) |

Interview topic checklist: [javascript-language/notes.txt](./javascript/javascript-language/notes.txt)

---

## Database

Notes for relational and document databases. Prefix: `pg`, `mongo`.

**Prerequisite:** none for basics.

**Suggested order:** learn **SQL fundamentals** (PostgreSQL) before **MongoDB schema design** — document modeling is easier once you understand tables, joins, and normalization.

| Track | Folder | Chapters |
| ----- | ------ | -------- |
| PostgreSQL (SQL) | [database/postgresql/](./database/postgresql/) | 10 — [full list](./database/postgresql/README.md) |
| MongoDB (NoSQL) | [database/mongodb/](./database/mongodb/) | 10 — [full list](./database/mongodb/README.md) |

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
