# Notes Writing Guide & Standards

Rules and conventions for authoring notes across all tracks in this repository.  
Currently enforced in the **Python** track; all other tracks will adopt them progressively.

---

## 1. File naming

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

## 2. Prerequisite-tier ordering (no forward references)

Each track has a **prerequisite hierarchy** — an ordered sequence of tiers where every earlier tier must be fully understood before the next one begins.

**The core rule:** A code example or explanation in File `N` may **only use language constructs introduced in Files 1 through N**. No construct may appear before its canonical home file.

> **Why this matters:** Using advanced constructs (functions, classes, error handling) inside a file about basic variables creates cognitive overload for a beginner who has not yet learned those constructs. This is called the *Curse of Knowledge* — an experienced writer uses advanced mechanics to illustrate introductory concepts without realising the burden it places on a first-time reader.

When authoring a track, map its topics into an ordered tier list — each tier unlocks new constructs that all later files may build on. For example, a Python track might introduce loops in Tier 6, functions in Tier 8, and classes in Tier 11, so a file in Tier 4 (operators) must not contain loops, functions, or classes. Apply the same logic for any language: a JavaScript track would introduce functions before closures, closures before async/await, etc.

---

## 3. Beginner-first code examples

Within any file, every runnable code snippet must be fully understood using only the constructs from that file's tier and below.

**Preferred approach for early tiers:**
- Use **sequential, top-level scripts** — no wrapping inside functions or classes.
- Use **direct variable assignments and print/log calls** to demonstrate a concept.
- If a concept naturally requires a more advanced construct, **show it commented-out** and add a forward-reference note.

**Forward-reference note format:**

```
# Preview — this will be mastered in File NN (<topic>).
```

or inline as an HTML callout:

```html
<div class="callout callout-info">
  In File NN (<topic>), we will learn how to encapsulate this into a reusable function.
</div>
```

**Preferred beginner replacement patterns:**

| Instead of… | Use… |
| :--- | :--- |
| Wrapping in a function before functions are taught | Top-level sequential statements |
| `try/except` / `try/catch` before error handling is taught | Commented-out bad code with an explanation of the error |
| Loops before control flow is taught | Repeated statements or a forward-reference note |
| Classes before OOP is taught | Plain variable assignments or a standard-library namespace helper |
| Decorators / higher-order patterns before they are taught | Manual equivalent (e.g., a dictionary-based cache) |
| Comprehensions before they are taught | Explicit step-by-step indexing |

---

## 4. Concept preservation and relocation

**No concept is ever deleted.** If an advanced construct appears too early, it is:

1. **Replaced** in the early file with a beginner-friendly equivalent.
2. **Relocated** to the file where it naturally belongs (its canonical home).
3. **Noted** with a forward-reference callout in the early file so readers know where to find it later.

This guarantees **zero concept loss** while maintaining pedagogical correctness.

---

## 5. Code snippet quality rules

- All code snippets inside `<pre>` blocks must be **syntactically valid** and runnable.
- HTML special characters inside `<pre>` blocks must be **entity-escaped**: `<` → `&lt;`, `>` → `&gt;`, `&` → `&amp;`.
- Snippets should be **self-contained** — a reader can copy-paste and run without additional context.
- Language-specific best practices (e.g., modern type annotation syntax) should be followed per track.
- Shell/terminal commands in `<pre>` blocks are excluded from code validation.

---

## 6. Audit and verification checklist

Use this checklist when reviewing or adding content to any file:

- [ ] File follows `NN-<prefix>-<slug>.html` naming.
- [ ] Every code example uses only constructs from Tiers 1–N (no forward references).
- [ ] Advanced constructs that were moved are noted with a forward-reference callout in the early file.
- [ ] Advanced constructs removed from early files have been added (or scheduled) in their canonical destination file.
- [ ] All `<pre>` code blocks are entity-escaped.
- [ ] All code snippets are syntactically valid.
- [ ] Each section is tagged L1, L2, or L3.
- [ ] Interview questions are grouped inside the relevant section at the appropriate level.
