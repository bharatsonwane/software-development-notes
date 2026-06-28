# React.js

Notes for React on the web.

Files are numbered in **learning order**: `01-react-topic.md`, `02-react-topic.md`, and so on.

**Prerequisite:** complete [JavaScript Language](../javascript-language/README.md) (at least files 01–07 and 10) before React hooks and async UI.

## Contents

| # | File | Tier | Topics |
|---|------|------|--------|
| 01 | [01-react-fundamental](./01-react-fundamental.md) | Fundamental | Setup, JSX, first components, props, state intro |
| 02 | 02-react-components-and-props | Fundamental | Function components, props, children, composition |
| 03 | 03-react-state-and-events | Fundamental | useState, events, lifting state up, one-way data flow |
| 04 | 04-react-rendering-lists | Fundamental | Conditional UI, lists, keys, fragments |
| 05 | 05-react-use-effect | Fundamental | useEffect, deps, cleanup, sync with external systems |
| 06 | 06-react-forms | Fundamental | Controlled inputs, validation basics, form submit |
| 07 | 07-react-hooks-patterns | Fundamental | Rules of hooks, custom hooks, useRef, useId |
| 08 | 08-react-context-and-reducer | Intermediate | useContext, useReducer, avoiding prop drilling |
| 09 | 09-react-routing | Intermediate | React Router, nested routes, URL params, loaders |
| 10 | 10-react-data-fetching | Intermediate | fetch, loading/error states, TanStack Query patterns |
| 11 | 11-react-state-management | Intermediate | Local vs global state, Zustand / Redux Toolkit basics |
| 12 | 12-react-performance-and-patterns | Advanced | memo, useMemo, useCallback, code splitting, Suspense |
| 13 | 13-react-testing | Advanced | React Testing Library, user events, mocking |
| 14 | 14-react-architecture | Advanced | Folder structure, compound components, error boundaries |

> Files **02–14** are planned. Add notes file by file in order. Link each row when the file is created.

## Learning path

```
01–07  Fundamental  →  components, state, effects, forms, hooks
08–11  Intermediate →  context, routing, server state, global store
12–14  Advanced     →  performance, testing, architecture
```

Each file has its own numbered sections (`## 1.1.`, `### 1.1.1.`) and a **Common questions** block at the end — same convention as JavaScript Language notes.

## Topic map (by area)

| Area | Files |
|------|-------|
| Core UI | 01, 02, 03, 04 |
| Side effects & forms | 05, 06 |
| Hooks depth | 07, 08 |
| App features | 09, 10, 11 |
| Production readiness | 12, 13, 14 |
