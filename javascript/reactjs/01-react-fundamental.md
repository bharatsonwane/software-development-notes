# 01. React Fundamentals

> File 01 — setup, JSX, first components, props, state intro.

**React** is a JavaScript library for building user interfaces. You describe **what the UI should look like** for a given state; React updates the DOM when state changes.

React apps are built from **components** — reusable pieces of UI. Modern React uses **function components** and **hooks** (Files 03, 05, 07 go deeper).

**Default rule today:** use **function components**, create projects with **Vite**, keep components **small and focused**, and pass data down with **props** (one-way data flow).

---

## 1. What is React & setup

### 1.1. What React does

React handles:

- **UI as a function of state** — when data changes, UI re-renders.
- **Efficient DOM updates** — compares virtual tree and patches only what changed (reconciliation).
- **Component composition** — nest small components into larger screens.

React is **only the view layer** — routing, global state, and API calls are added with libraries (Files 09–11).

### 1.2. Create a project (Vite)

Recommended starter for new apps:

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

Project layout (typical):

```
my-app/
  src/
    main.jsx      # entry — mounts root component
    App.jsx       # root UI component
    index.css
  index.html
  package.json
```

Entry point:

```jsx
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**`StrictMode`** runs extra checks in development (double-invokes some effects — File 05).

### 1.3. First component

A component is a **function that returns JSX**:

```jsx
function Welcome() {
  return <h1>Hello, React!</h1>;
}

export default Welcome;
```

Use it like a custom HTML tag:

```jsx
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}
```

Rules:

- Component names **PascalCase** (`Welcome`, not `welcome`).
- Return **one root element** (or use a **Fragment** — File 04).

---

## 2. JSX

### 2.1. What is JSX

**JSX** looks like HTML inside JavaScript. It compiles to `React.createElement(...)` calls:

```jsx
const element = <h1 className="title">Hello</h1>;

// roughly compiles to:
// React.createElement("h1", { className: "title" }, "Hello");
```

JSX is **expressions** — wrap in `{}` for JavaScript:

```jsx
const name = "Bharat";
const element = <p>Hello, {name}!</p>;

const sum = <p>{1 + 2}</p>;  // 3
```

### 2.2. JSX rules

| HTML / habit | JSX |
|--------------|-----|
| `class` | `className` |
| `for` | `htmlFor` |
| `onclick` | `onClick` (camelCase events) |
| Self-closing optional | **Must** close: `<img />`, `<br />` |
| One root | One parent or `<>...</>` |

```jsx
// Invalid — two roots
// return (
//   <h1>Title</h1>
//   <p>Text</p>
// );

return (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
);
```

### 2.3. JavaScript in JSX

**Conditionals** (full detail in File 04):

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <p>Welcome back</p> : <p>Please sign in</p>}
    </div>
  );
}
```

**Attributes** — use `{}` for dynamic values:

```jsx
<img src={user.avatarUrl} alt={user.name} />
<button disabled={!isValid}>Submit</button>
```

**Style** — object, camelCase properties:

```jsx
<div style={{ color: "navy", fontSize: "1.2rem" }}>Styled</div>
```

---

## 3. Components

### 3.1. Function components

Standard way to define UI (class components are legacy):

```jsx
function UserCard({ name, role }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  );
}
```

Export for use in other files:

```jsx
// UserCard.jsx
export function UserCard({ name, role }) { /* ... */ }

// App.jsx
import { UserCard } from "./UserCard.jsx";
```

Default export (one main component per file is common):

```jsx
export default function App() {
  return <UserCard name="Bharat" role="Developer" />;
}
```

### 3.2. Component tree

React apps form a **tree** — parent components render children:

```jsx
function App() {
  return (
    <Layout>
      <Header title="My App" />
      <Main>
        <UserCard name="Bharat" role="Dev" />
      </Main>
      <Footer />
    </Layout>
  );
}
```

Each component **encapsulates** its own markup and logic. Split when a section is reused or gets too large (File 02 — composition).

### 3.3. Pure components (concept)

Given the same **props**, a component should return the same UI. Avoid side effects in the render body (File 12 — `memo`):

```jsx
// Good — render is a pure function of props
function Badge({ label, color }) {
  return <span style={{ background: color }}>{label}</span>;
}

// Avoid during render — use useEffect (File 05)
// fetch("/api/user");  // side effect in render
```

---

## 4. Props

**Props** (properties) pass data **from parent to child**. Props are **read-only** — children must not mutate them.

### 4.1. Passing and reading props

```jsx
function UserCard({ name, age, isActive }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isActive && <span>Active</span>}
    </div>
  );
}

function App() {
  return (
    <UserCard name="Bharat" age={30} isActive={true} />
  );
}
```

Props destructuring in the parameter list is idiomatic. Alternative:

```jsx
function UserCard(props) {
  return <h2>{props.name}</h2>;
}
```

### 4.2. Default props

```jsx
function Button({ label = "Click me", variant = "primary" }) {
  return <button className={variant}>{label}</button>;
}

<Button />                    // "Click me"
<Button label="Save" />       // "Save"
```

### 4.3. Children prop

Content between opening and closing tags becomes **`props.children`**:

```jsx
function Card({ title, children }) {
  return (
    <section>
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}

function App() {
  return (
    <Card title="Notes">
      <p>First paragraph</p>
      <p>Second paragraph</p>
    </Card>
  );
}
```

`children` can be text, elements, or multiple nodes (File 02 — composition patterns).

### 4.4. One-way data flow

Data flows **down** the tree via props. Siblings do not share props directly — lift shared state to a **common parent** (File 03).

```jsx
function Parent() {
  const name = "Bharat";
  return (
    <>
      <ChildA name={name} />
      <ChildB name={name} />
    </>
  );
}
```

---

## 5. State intro

**State** is data that **changes over time** and affects what the UI shows. When state updates, React **re-renders** the component.

### 5.1. Why not plain variables?

```jsx
// This does NOT work — changing message does not re-render
function Broken() {
  let message = "Hello";
  return (
    <button onClick={() => { message = "Hi"; }}>
      {message}
    </button>
  );
}
```

React needs **`useState`** (or similar) to schedule a re-render (File 03).

### 5.2. useState basics

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

- **`useState(initial)`** returns `[value, setter]`.
- Call **`setCount(newValue)`** to update — React re-renders.
- State is **local** to the component instance — two `<Counter />` on screen have independent state.

Functional update when next state depends on previous:

```jsx
setCount((prev) => prev + 1);
```

### 5.3. State vs props

| | Props | State |
|---|-------|-------|
| Source | Parent | Inside component |
| Mutable by child? | No | Yes (via setter) |
| Changes trigger re-render? | When parent re-renders | When setter called |

```jsx
function UserPanel({ userId }) {        // prop — from parent
  const [name, setName] = useState(""); // state — local

  return <p>{userId}: {name}</p>;
}
```

Deep dive: File 03 (state & events), File 05 (effects), File 07 (hooks patterns).

### 5.4. Minimal interactive example

```jsx
import { useState } from "react";

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked(!liked)}>
      {liked ? "❤️ Liked" : "🤍 Like"}
    </button>
  );
}
```

Event handlers use **camelCase** (`onClick`, `onChange`). Details in File 03.

---

## 6. Common questions

**6.1. What is React?**  
A: A JavaScript **UI library** for building interfaces with **components**. It updates the DOM efficiently when application state changes.

**6.2. What is JSX?**  
A: Syntax extension that lets you write **HTML-like markup** in JavaScript. It compiles to `React.createElement` and must follow JSX rules (`className`, one root, closed tags).

**6.3. What is the difference between a component and an element?**  
A: An **element** is a plain object describing UI (e.g. `<div />`). A **component** is a function or class that **returns** elements (or other components).

**6.4. What are props?**  
A: **Inputs** passed from parent to child. They are **read-only** and enable one-way data flow down the tree.

**6.5. What is state?**  
A: **Internal data** owned by a component that can change over time. Updating state triggers a **re-render**. Use `useState` in function components.

**6.6. What is the difference between props and state?**  
A: **Props** come from outside and are immutable in the child. **State** is managed inside the component and updated with a setter function.

**6.7. Why must component names be capitalized?**  
A: React treats **lowercase** tags as built-in HTML (`<div>`) and **PascalCase** as custom components (`<UserCard>`).

**6.8. Do I need to learn class components?**  
A: For new code, **no** — use function components and hooks. You may see classes in older codebases.

**6.9. What is `children` in props?**  
A: Special prop for **nested content** between a component's JSX tags. Used for wrappers, layouts, and composition.

**6.10. What should I learn next after this file?**  
A: File 02 (components & props depth), File 03 (state & events), then File 04 (lists & conditional rendering).
