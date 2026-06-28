# Python

Notes for Python — language core, standard library, and common patterns.

Files are numbered in **learning order**: `01-py-topic.md`, `02-py-topic.md`, and so on.

**Prerequisite:** none for basics. Helpful if you already know another language (see [JavaScript Language](../javascript/) for parallel concepts).

## Contents

**01. [Setup & Environment](./01-py-setup-environment.md)**  
Tier — Fundamental

1. What is Python  
2. Installing Python and `pip`  
3. Running scripts and the REPL  
4. Virtual environments (`venv`)  
5. Common questions

**02. [Types & Values](./02-py-types-values.md)**  
Tier — Fundamental

1. Numbers, strings, booleans  
2. `None`  
3. Mutability vs immutability  
4. Dynamic typing and `type()`  
5. Common questions

**03. [Variables & Scope](./03-py-variables-scope.md)**  
Tier — Fundamental

1. Assignment and naming  
2. LEGB rule  
3. `global` and `nonlocal`  
4. Constants by convention  
5. Common questions

**04. [Control Flow](./04-py-control-flow.md)**  
Tier — Fundamental

1. `if` / `elif` / `else`  
2. `for` and `while` loops  
3. `break`, `continue`, `else` on loops  
4. `match` / `case` (3.10+)  
5. Common questions

**05. [Functions](./05-py-functions.md)**  
Tier — Fundamental

1. Defining functions  
2. Parameters, `*args`, `**kwargs`  
3. Default and keyword arguments  
4. Lambda and first-class functions  
5. Common questions

**06. [Lists & Tuples](./06-py-lists-tuples.md)**  
Tier — Fundamental

1. Lists — creation and mutation  
2. Indexing and slicing  
3. List methods  
4. Tuples and when to use them  
5. Common questions

**07. [Dictionaries & Sets](./07-py-dicts-sets.md)**  
Tier — Fundamental

1. Dictionary basics  
2. Dict methods and iteration  
3. Sets — union, intersection  
4. When to use dict vs set vs list  
5. Common questions

**08. [Strings & Formatting](./08-py-strings-formatting.md)**  
Tier — Fundamental

1. String methods  
2. f-strings and formatting  
3. Multiline strings  
4. Encoding and `bytes` (intro)  
5. Common questions

**09. [Object-Oriented Python](./09-py-oop.md)**  
Tier — Intermediate

1. Classes and instances  
2. `__init__` and instance attributes  
3. Inheritance and `super()`  
4. Dunder methods and `@dataclass`  
5. Common questions

**10. [Modules & Packages](./10-py-modules-packages.md)**  
Tier — Intermediate

1. `import` and `from ... import`  
2. `__name__ == "__main__"`  
3. Package structure  
4. `pip`, `requirements.txt`, and `pyproject.toml` (intro)  
5. Common questions

**11. [Exceptions & File I/O](./11-py-exceptions-file-io.md)**  
Tier — Intermediate

1. `try` / `except` / `else` / `finally`  
2. Raising exceptions  
3. Reading and writing files  
4. `pathlib` and `with` statement  
5. Common questions

**12. [Comprehensions & Iterators](./12-py-comprehensions-iterators.md)**  
Tier — Intermediate

1. List, dict, and set comprehensions  
2. Generator expressions  
3. `yield` and generator functions  
4. Iterators and `iter()` / `next()`  
5. Common questions

**13. [Decorators & Context Managers](./13-py-decorators-context-managers.md)**  
Tier — Intermediate

1. Functions as decorators  
2. `@decorator` syntax  
3. Context managers and `__enter__` / `__exit__`  
4. `contextlib`  
5. Common questions

**14. [Standard Library Essentials](./14-py-standard-library.md)**  
Tier — Intermediate

1. `os` and `pathlib`  
2. `datetime` and `json`  
3. `collections` (`defaultdict`, `Counter`)  
4. `itertools` and `functools` (intro)  
5. Common questions

**15. [Async & Concurrency](./15-py-async-concurrency.md)**  
Tier — Advanced

1. `async` / `await` and `asyncio`  
2. Coroutines vs threads (GIL overview)  
3. `asyncio.gather` and tasks  
4. When to use threading / multiprocessing (intro)  
5. Common questions

**16. [Testing, Typing & Best Practices](./16-py-testing-typing-best-practices.md)**  
Tier — Advanced

1. `pytest` basics  
2. Type hints and `mypy` (intro)  
3. PEP 8 and project layout  
4. Performance tips and profiling (intro)  
5. Common questions

## Learning path

```
01–08  Fundamental  →  syntax, types, data structures, strings
09–14  Intermediate →  OOP, modules, I/O, iterators, stdlib
15–16  Advanced     →  async, testing, typing, production habits
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).

## Topic map (by area)

| Area | Files |
|------|-------|
| Core syntax | 01, 02, 03, 04, 05 |
| Built-in data | 06, 07, 08 |
| Structure & I/O | 09, 10, 11 |
| Pythonic patterns | 12, 13, 14 |
| Production | 15, 16 |
