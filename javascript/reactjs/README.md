# React.js

Notes for React on the web.

Files are numbered in **learning order**: `01-react-topic.md`, `02-react-topic.md`, and so on.

**Prerequisite:** complete [JavaScript Language](../javascript-language/README.md) (at least files 01–07 and 10) before React hooks and async UI.

## Contents

**01. [React Fundamentals](./01-react-fundamental.md)**  
Tier — Fundamental

1. What is React & setup  
2. JSX  
3. Components  
4. Props  
5. State intro  
6. Common questions

**02. [Components & Props](./02-react-components-and-props.md)**  
Tier — Fundamental

1. Function components in depth  
2. Props patterns  
3. The `children` prop  
4. Composition vs inheritance  
5. Component composition patterns  
6. Common questions

**03. [State & Events](./03-react-state-and-events.md)**  
Tier — Fundamental

1. useState in depth  
2. Events in React  
3. One-way data flow  
4. Lifting state up  
5. State design basics  
6. Common questions

**04. [Rendering Lists & Conditionals](./04-react-rendering-lists.md)**  
Tier — Fundamental

1. Conditional rendering  
2. Rendering lists  
3. Keys  
4. Fragments  
5. Putting it together  
6. Common questions

**05. [useEffect & Side Effects](./05-react-use-effect.md)**  
Tier — Fundamental

1. Side effects vs render  
2. Basic useEffect syntax  
3. Dependency array in depth  
4. Cleanup  
5. Common effect patterns  
6. When not to use useEffect  
7. Strict Mode and development behavior  
8. Multiple effects  
9. Putting it together  
10. Common questions

**06. [Forms](./06-react-forms.md)**  
Tier — Fundamental

1. Controlled vs uncontrolled inputs  
2. Text inputs and textareas  
3. Checkboxes, radios, and selects  
4. Form submit  
5. Validation basics  
6. Labels and accessibility  
7. Resetting forms  
8. Putting it together  
9. Common questions

**07. [Hooks Patterns](./07-react-hooks-patterns.md)**  
Tier — Fundamental

1. Rules of Hooks  
2. Custom hooks  
3. useRef  
4. useId  
5. Composing hooks  
6. Hook pitfalls  
7. Putting it together  
8. Common questions

**08. [Context & useReducer](./08-react-context-and-reducer.md)**  
Tier — Intermediate

1. Prop drilling problem  
2. Context API  
3. Context performance  
4. useReducer  
5. Context + useReducer together  
6. Common Context use cases  
7. Putting it together  
8. Common questions

**09. [Routing](./09-react-routing.md)**  
Tier — Intermediate

1. Why client-side routing  
2. Basic setup  
3. Navigation  
4. Dynamic routes and params  
5. Nested routes and layouts  
6. Loaders and actions (data router)  
7. Protected routes  
8. Code splitting routes (preview)  
9. Putting it together  
10. Common questions

**10. [Data Fetching](./10-react-data-fetching.md)**  
Tier — Intermediate

1. Server state vs client state  
2. Fetch with useState and useEffect  
3. POST, PUT, DELETE (mutations)  
4. TanStack Query basics  
5. Query keys and cache rules  
6. React Router loaders + Query  
7. Error and loading UX  
8. Alternatives and related tools  
9. Putting it together  
10. Common questions

**11. [State Management](./11-react-state-management.md)**  
Tier — Intermediate

1. State placement decision tree  
2. Context limits (recap)  
3. Zustand  
4. Redux Toolkit  
5. Zustand vs Redux Toolkit  
6. Patterns across libraries  
7. Putting it together  
8. Common questions

**12. [Performance & Patterns](./12-react-performance-and-patterns.md)**  
Tier — Advanced

1. When to optimize  
2. Re-renders recap  
3. React.memo  
4. useCallback  
5. useMemo  
6. Code splitting and lazy  
7. Suspense and data (overview)  
8. List performance  
9. useLayoutEffect (brief)  
10. Putting it together  
11. Common questions

**13. [Testing](./13-react-testing.md)**  
Tier — Advanced

1. Testing philosophy  
2. Setup  
3. Queries (priority order)  
4. User events  
5. Testing async and data  
6. Providers and routing  
7. Testing hooks  
8. Mocking modules  
9. Accessibility checks  
10. What to test per feature  
11. Putting it together  
12. Common questions

**14. [Architecture](./14-react-architecture.md)**  
Tier — Advanced

1. Folder structure  
2. Separation of concerns  
3. Compound components  
4. Error boundaries  
5. Boundaries and layers  
6. Scaling patterns  
7. Anti-patterns to avoid  
8. Putting it together  
9. Common questions

## Learning path

```
01–07  Fundamental  →  components, state, effects, forms, hooks
08–11  Intermediate →  context, routing, server state, global store
12–14  Advanced     →  performance, testing, architecture
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file). Subsections nest under their parent.

## Topic map (by area)

| Area | Files |
|------|-------|
| Core UI | 01, 02, 03, 04 |
| Side effects & forms | 05, 06 |
| Hooks depth | 07, 08 |
| App features | 09, 10, 11 |
| Production readiness | 12, 13, 14 |
