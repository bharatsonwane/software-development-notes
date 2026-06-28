# 06. Forms

> File 06 — controlled inputs, validation basics, form submit.

Forms are where users **enter data**. In React, the usual pattern is **controlled components**: input **value** comes from **state**, and **`onChange`** updates that state. On submit, you **validate**, then send data to an API or parent handler.

Builds on state and events (File 03). File 05 covers side effects if you sync form data externally; File 10 covers submitting to a server.

**Default rule today:** control inputs with **`value` + `onChange`** (or **`checked`** for checkboxes); handle **`onSubmit`** on `<form>` and call **`preventDefault()`**; validate before submit and show **inline errors** near fields.

---

## 1. Controlled vs uncontrolled inputs

### 1.1. Controlled input

React state is the **single source of truth**:

```jsx
function NameField() {
  const [name, setName] = useState("");

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

Every keystroke updates state → React re-renders → input shows new value.

### 1.2. Uncontrolled input

The **DOM** holds the value; read it with a **ref** when needed (File 07):

```jsx
function NameField() {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button type="submit">Save</button>
    </form>
  );
}
```

Use uncontrolled inputs sparingly — file uploads, integrating non-React widgets, or simple one-off reads.

### 1.3. Why controlled is default

| Controlled | Uncontrolled |
|------------|--------------|
| Instant validation | Validate on submit only |
| Reset/clear via state | Reset via DOM APIs |
| Same data in UI and JS | Must read ref to get value |
| Works with React one-way flow (File 03) | Escapes React model |

---

## 2. Text inputs and textareas

### 2.1. Single-line text

```jsx
function SignUpForm() {
  const [email, setEmail] = useState("");

  return (
    <label>
      Email
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
    </label>
  );
}
```

Always pair **`value`** with **`onChange`**. A `value` without `onChange` makes the input **read-only**.

### 2.2. Textarea

Same pattern — use **`value`** / **`onChange`**, not children for the current value:

```jsx
<textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  rows={4}
/>
```

### 2.3. Multiple fields — object state or separate state

**Separate state** — clear for small forms:

```jsx
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
```

**Object state** — scales to many fields:

```jsx
const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

function updateField(field) {
  return (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };
}

<input value={form.firstName} onChange={updateField("firstName")} />
<input value={form.lastName} onChange={updateField("lastName")} />
```

Immutable update — spread `prev`, change one key (File 03).

---

## 3. Checkboxes, radios, and selects

### 3.1. Checkbox (boolean)

Use **`checked`**, not `value`:

```jsx
const [agreed, setAgreed] = useState(false);

<input
  type="checkbox"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

### 3.2. Checkbox group (array)

```jsx
const [selected, setSelected] = useState([]);

function toggle(id) {
  setSelected((prev) =>
    prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
  );
}

{options.map((opt) => (
  <label key={opt.id}>
    <input
      type="checkbox"
      checked={selected.includes(opt.id)}
      onChange={() => toggle(opt.id)}
    />
    {opt.label}
  </label>
))}
```

### 3.3. Radio buttons

Group by **`name`**; state holds the **selected value**:

```jsx
const [size, setSize] = useState("medium");

<label>
  <input
    type="radio"
    name="size"
    value="small"
    checked={size === "small"}
    onChange={(e) => setSize(e.target.value)}
  />
  Small
</label>
```

### 3.4. Select dropdown

```jsx
const [country, setCountry] = useState("us");

<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</select>
```

For multi-select: `<select multiple value={array} onChange={...} />`.

---

## 4. Form submit

### 4.1. onSubmit on the form

Prefer **form `onSubmit`** over button **`onClick`** — handles Enter key and accessibility:

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();  // stop full page reload
    console.log({ email, password });
    // call API, lift to parent, etc.
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
}
```

### 4.2. Button types

| `type` | Behavior |
|--------|----------|
| **`submit`** | Submits nearest form (default inside `<form>`) |
| **`button`** | No submit — use for custom actions |
| **`reset`** | Resets form fields to initial values |

Use **`type="button"`** on buttons that should not submit (e.g. "Cancel", "Add row").

### 4.3. Disabled submit while invalid or loading

```jsx
const canSubmit = email.includes("@") && password.length >= 8 && !loading;

<button type="submit" disabled={!canSubmit}>
  {loading ? "Saving..." : "Save"}
</button>
```

---

## 5. Validation basics

### 5.1. When to validate

| Timing | Use for |
|--------|---------|
| **On submit** | Simple forms, fewer distractions |
| **On blur** | Field-level feedback after user leaves input |
| **On change** | Live hints (debounce expensive checks — File 05) |

Start with **validate on submit**; add blur/change when UX needs it.

### 5.2. Client-side validation example

```jsx
function SignUpForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate(values) {
    const next = {};
    if (!values.email.includes("@")) next.email = "Enter a valid email.";
    if (values.password.length < 8) next.password = "At least 8 characters.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    submitSignUp(form);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && <p id="email-error" role="alert">{errors.email}</p>}
      </div>
      {/* password field similarly */}
      <button type="submit">Sign up</button>
    </form>
  );
}
```

**`noValidate`** — disable browser popup validation when you show custom errors (still use semantic `type="email"` etc.).

### 5.3. Server errors

After failed API response, map server messages to fields or a form-level banner:

```jsx
try {
  await signUp(form);
} catch (err) {
  if (err.fieldErrors) setErrors(err.fieldErrors);
  else setErrors({ form: err.message });
}
```

File 10 covers async submit flow in depth.

### 5.4. Libraries

For large forms: **React Hook Form**, **Formik**, or **Zod** + resolver. Same ideas — register fields, validate schema, handle submit.

---

## 6. Labels and accessibility

### 6.1. Label every control

```jsx
<label htmlFor="email">Email</label>
<input id="email" name="email" type="email" value={email} onChange={...} />
```

Or wrap the input inside `<label>`.

### 6.2. aria-invalid and error messages

Connect errors with **`aria-describedby`** and **`role="alert"`** so screen readers announce failures.

### 6.3. Focus management

After submit with errors, focus the **first invalid field**:

```jsx
const firstErrorRef = useRef(null);
// attach ref to first error field; firstErrorRef.current?.focus()
```

(File 07 — `useRef`.)

---

## 7. Resetting forms

### 7.1. Reset via state

```jsx
function handleReset() {
  setForm({ email: "", password: "" });
  setErrors({});
}
```

Controlled forms reset by setting state back to initial values.

### 7.2. Key remount pattern

Force a fresh form when switching entities:

```jsx
<EditUserForm key={userId} userId={userId} />
```

When `userId` changes, React remounts and re-runs initial state (File 05 — prefer over effect sync).

---

## 8. Putting it together

### 8.1. Contact form

```jsx
function ContactForm({ onSend }) {
  const [form, setForm] = useState({ name: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  function validate(v) {
    const e = {};
    if (!v.name.trim()) e.name = "Name is required.";
    if (!v.message.trim()) e.message = "Message is required.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const e2 = validate(form);
    setErrors(e2);
    if (Object.keys(e2).length) return;

    setStatus("sending");
    try {
      await onSend(form);
      setForm({ name: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input
          value={form.name}
          onChange={(ev) => setForm({ ...form, name: ev.target.value })}
        />
      </label>
      {errors.name && <p role="alert">{errors.name}</p>}

      <label>
        Message
        <textarea
          value={form.message}
          onChange={(ev) => setForm({ ...form, message: ev.target.value })}
        />
      </label>
      {errors.message && <p role="alert">{errors.message}</p>}

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send"}
      </button>
      {status === "sent" && <p>Message sent!</p>}
      {status === "error" && <p role="alert">Something went wrong.</p>}
    </form>
  );
}
```

---

## 9. Common questions

**9.1. What is a controlled input?**  
A: An input whose **`value`** (or **`checked`**) is driven by React **state**, updated via **`onChange`**. React owns the displayed value.

**9.2. Why must I call preventDefault on submit?**  
A: Without it, the browser **reloads the page** on form submit — you lose SPA state and React's handler may not run as expected.

**9.3. Checkbox: value or checked?**  
A: Use **`checked={bool}`** and **`onChange`** with **`e.target.checked`**. `value` on checkboxes is the value submitted in native forms, not visibility state.

**9.4. Can I use defaultValue with controlled inputs?**  
A: **No** — pick one model. **`defaultValue`** is for uncontrolled; **`value`** is for controlled. Mixing causes confusion.

**9.5. How do I handle many form fields?**  
A: One **object in state** + helper like `updateField("email")`, or a form library. Keep updates **immutable**.

**9.6. When should I validate?**  
A: Start **on submit**. Add **on blur** or **on change** when users need earlier feedback. Always re-validate on submit.

**9.7. Controlled vs uncontrolled — which default?**  
A: **Controlled** for most React forms. **Uncontrolled + ref** for file inputs, some third-party widgets, or rare performance cases.

**9.8. How do I disable browser validation popups?**  
A: Add **`noValidate`** on `<form>` and implement your own error UI.

**9.9. How do I reset a controlled form?**  
A: Set state back to initial values, or remount with **`key`**.

**9.10. What should I read next?**  
A: File 07 (useRef, custom hooks), File 10 (submitting to APIs), File 06 patterns apply inside File 09 route forms.
