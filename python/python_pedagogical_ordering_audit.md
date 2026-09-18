# Python Curriculum Pedagogical Ordering & Prerequisite Audit
## Comprehensive Forward-Reference Analysis, Beginner-First Restructuring, and Zero-Loss Knowledge Migration Plan

---

## 1. Executive Summary & Pedagogical Manifesto

### 1.1. The Problem: The "Curse of Knowledge" in Technical Notes
In programming pedagogy, the **Curse of Knowledge** occurs when experienced engineers write notes or examples using advanced language mechanics (`class`, `def`, `try/except`, list comprehensions, `for` loops) to demonstrate introductory concepts (such as identifiers, basic types, operators, or I/O). 

For an experienced developer, seeing `class Account: def __init__(self, owner, balance): try: ... except AttributeError:` in `02-py-identifiers.html` feels natural. However, **for an absolute beginner who is on Day 2 of their programming journey, this creates cognitive overload**:
1. They have not yet learned what a function (`def`) is.
2. They do not know what an object, class (`class`), or `self` represents.
3. They have never seen error handling (`try/except`).
4. They do not know what list comprehensions (`[k for k in ...]`) or dictionaries (`.__dict__`) are.

### 1.2. The Core Guarantees of this Plan
1. **Beginner-First Strict Ordering (No Forward References):**
   A code example in Module $N$ may **ONLY** utilize language constructs introduced in Modules $1$ through $N$. An absolute beginner starting at File 01 must be able to read, run, and understand every single line of code using only what they have learned so far.
2. **Zero Concept Loss (Preservation & Systematic Relocation):**
   **No concept, interview trick, or deep-dive will be deleted or skipped.** Every advanced pattern (e.g., name mangling, custom subclasses, TTL dictionary caching, decorator memoization) will be moved to its natural home module where its prerequisites are satisfied. In its place in the early file, we provide a clean, beginner-friendly equivalent and a forward reference link.

---

## 2. The 14-Tier Milestone Prerequisite Hierarchy

Below is the authoritative pedagogical dependency tree for the Python curriculum. No file in Tier $K$ may use constructs belonging to Tier $> K$.

```
[Tier 1: File 01] Ground Zero & Runtime (print, literals, expressions)
       │
[Tier 2: File 02] Lexical Rules & Identifiers (variable assignment, comments, indentation)
       │
[Tier 3: Files 03-05] Built-in Types & Casting (int/float/complex/bool/None, id(), casting)
       │
[Tier 4: File 06] Operators & Expressions (arithmetic, comparison, logic, short-circuit, ternary)
       │
[Tier 5: File 07] Console Input / Output (input(), split(), print(), f-strings)
       │
[Tier 6: File 08] Control Flow (if/elif/else, while, for, break, continue, pass)  <-- FIRST LOOPS & BRANCHES!
       │
[Tier 7: Files 09-13] Sequences & Collections (Strings, Lists, Tuples, Sets, Dictionaries)
       │
[Tier 8: Files 14-15] Functions & Functional Tools (def, return, *args, **kwargs, lambda, map/filter)  <-- FIRST FUNCTIONS!
       │
[Tier 9: Files 16-17] Modular Architecture (import, modules, packages, __name__ == '__main__')
       │
[Tier 10: File 18] File Handling & Streams (open(), context managers with open, read/write)
       │
[Tier 11: Files 19-21] Object-Oriented Programming (class, self, __init__, inheritance, polymorphism)  <-- FIRST CLASSES!
       │
[Tier 12: File 22] Robust Exception Handling (try, except, finally, raise, custom errors)  <-- FIRST TRY/EXCEPT!
       │
[Tier 13: Files 23-24] Advanced Callables & Streams (@decorators, closures, generators, yield)  <-- FIRST DECORATORS!
       │
[Tier 14: Files 25-33] Concurrency, Systems & Engineering (Threading, Copy, Assert, Regex, DB, JSON, Logging, Tests, Pydoc)
```

### Prerequisite Matrix

| Tier | Files | Newly Permitted Concepts & Syntax | Strictly Forbidden Constructs |
| :--- | :--- | :--- | :--- |
| **Tier 1** | `01-py-introduction.html` | Simple scalar literals, `print()`, basic arithmetic expressions, conceptual architecture. | `def`, `class`, `try/except`, `if/else`, `for/while`, imports. |
| **Tier 2** | `02-py-identifiers.html` | Variable assignment (`x = 10`), comments (`#`), valid/invalid names, underscore rules, indentation concept. | `class`, `def`, `self`, `try/except`, `for/while`, comprehensions. |
| **Tier 3** | `03-05` (Data Types, Casting) | 14 built-in types overview, `type()`, `id()`, number bases (`0b`, `0o`, `0x`), boolean math, explicit casting calls (`int()`, `float()`, etc.). | `for` loops, `while` loops, `def` functions, `try/except` blocks. |
| **Tier 4** | `06-py-operators.html` | Arithmetic, relational, logical, bitwise, assignment, ternary (`x if c else y`), identity (`is`), membership (`in`). | `def` functions, `for` loops, `try/except`. |
| **Tier 5** | `07-py-input-output.html` | `input()`, `split()`, `print()` parameters (`sep`, `end`), string formatting (`%`, `format()`, f-strings). | List comprehensions, `file=open(...)`, `try/except`. |
| **Tier 6** | `08-py-control-flow.html` | `if/elif/else`, `while`, `for`, `range()`, `break`, `continue`, `pass`, loop `else`, pattern printing, numerical algorithms. | `def` functions, type annotations (`-> bool`), `class`. |
| **Tier 7** | `09-13` (Collections) | Strings (09), Lists & Comprehensions (10), Tuples (11), Sets (12), Dictionaries (13). | `def` functions, custom `class`, `@property` / `@decorators`. |
| **Tier 8** | `14-15` (Functions & Lambdas) | `def`, parameters, `return`, `*args`, `**kwargs`, positional-only `/`, keyword-only `*`, scope (LEGB, `globals()`), lambda, map, filter, reduce. | `@` decorators (`@lru_cache`, `@memoize`), `class`. |
| **Tier 9** | `16-17` (Modules & Packages) | `import`, `from ... import`, `as`, `__name__ == '__main__'`, `__all__`, standard libraries (`math`, `random`, `sys`), packages, `__init__.py`. | Custom `class`, custom decorators. |
| **Tier 10** | `18-py-file-handling.html` | `open()`, modes (`r`, `w`, `a`, `r+`, `w+`), `read()`, `write()`, `seek()`, `tell()`, `with open(...) as f:`. | Custom `class`, subprocess with `try/except`. |
| **Tier 11** | `19-21` (OOP Core) | `class`, objects, `self`, `__init__`, instance/class/static variables & methods, inheritance, MRO C3, `super()`, dunder magic methods, polymorphism, `@property`. | Advanced metaprogramming decorators, generator coroutines (`yield from`). |
| **Tier 12** | `22-py-exception-handling.html` | `try`, `except`, `else`, `finally`, `raise`, `from e`, custom exception hierarchy. | Decorators, generators. |
| **Tier 13** | `23-24` (Decorators & Generators) | First-class closures, `@decorator` syntax, decorator chaining, `@functools.wraps`, `yield`, `yield from`, generators, coroutines (`send()`, `throw()`). | None (exception handling already available). |
| **Tier 14** | `25-33` (Advanced & Engineering) | Multithreading (25), Copy (26), Assertions (27), Regex (28), DB (29), Serialization (30), Logging (31), Unittest (32), Pydoc (33). | None (full language available). |

---

## 3. Global Forward-Reference Violations Inventory

The exhaustive codebase grep revealed critical forward-reference leaks in the first half of the curriculum:

| Construct | Canonical Home Module | Premature Appearances in Curriculum |
| :--- | :--- | :--- |
| **Functions (`def`)** | **Module 14 (`14-py-functions.html`)** | Found prematurely in: `01-py-introduction.html`, `02-py-identifiers.html`, `03-py-data-types.html`, `04-py-basic-data-type.html`, `05-py-type-casting.html`, `06-py-operators.html`, `08-py-control-flow.html`, `09-py-strings.html`, `10-py-lists.html`, `11-py-tuples.html`, `12-py-sets.html`, `13-py-dictionaries.html`. |
| **Classes (`class`)** | **Module 19 (`19-py-oop-fundamentals.html`)** | Found prematurely in: `01-py-introduction.html`, `02-py-identifiers.html`, `11-py-tuples.html`, `13-py-dictionaries.html`, `17-py-packages.html`. |
| **Exception Blocks (`try/except`)** | **Module 22 (`22-py-exception-handling.html`)** | Found prematurely in: `01-py-introduction.html`, `02-py-identifiers.html`, `03-py-data-types.html`, `05-py-type-casting.html`, `07-py-input-output.html`, `11-py-tuples.html`, `16-py-modules.html`, `18-py-file-handling.html`. |
| **Loops (`for` / `while`)** | **Module 08 (`08-py-control-flow.html`)** | Found prematurely in: `02-py-identifiers.html`, `03-py-data-types.html`, `04-py-basic-data-type.html`, `06-py-operators.html`, `07-py-input-output.html`. |
| **List Comprehensions** | **Module 10 (`10-py-lists.html`)** | Found prematurely in: `02-py-identifiers.html`, `06-py-operators.html`, `07-py-input-output.html`. |
| **Decorators (`@`)** | **Module 23 (`23-py-decorators.html`)** | Found prematurely in: `11-py-tuples.html` (`@property`), `14-py-functions.html` (`@lru_cache`, `@memoize`). |
| **Generators (`yield`)** | **Module 24 (`24-py-generators.html`)** | Taught after Decorators and Exception Handling. |

---

## 4. Detailed File-by-File Audit, Beginner Replacements & Relocation Plan

### File 01: `01-py-introduction.html`
- **Current Pedagogical Level:** Absolute beginner (Tier 1). No prior programming or Python knowledge assumed.
- **Identified Violations:**
  1. Lines 157–164: Defines `class MathProcessor:` with `def __init__(self, values):` and `def compute_sum(self): return sum(self.values)`.
  2. Line 219: Uses `try: ... except TypeError:` to show dynamic typing errors.
  3. Line 329: Uses `def calculate_total(price, tax_rate): return price * (1 + tax_rate)`.
  4. Lines 683, 700: Uses `def add_numbers(a, b):` and `def verify_strong_typing(): try: ... except TypeError:`.
- **Pedagogical Impact:** A student who has never written code encounters object-oriented architecture, method invocation, and exception handlers before even understanding variables!
- **Beginner Replacement Plan:**
  - Demonstrate Python's procedural and dynamic nature using clean sequential scripts:
    ```python
    # Dynamic Typing Demo: Variables take the type of their assigned value
    x = 100
    print("Value:", x, "| Type:", type(x))

    x = "Now I am a string!"
    print("Value:", x, "| Type:", type(x))

    # Strong Typing Demo: Python will not implicitly convert incompatible types
    price = 250
    # print("Total price is: " + price)  # TypeError: can only concatenate str (not "int") to str
    print("Total price is:", price)      # Correct: passing separate arguments to print()
    ```
  - For the Multi-Paradigm Section: Keep the conceptual comparison of Paradigms (Imperative vs Functional vs OOP), but clearly label any advanced snippet as: `"""Preview of Python syntax across paradigms (we will master these step-by-step in later modules)"""`.
- **Relocation of Advanced Content:**
  - Move the complete `MathProcessor` OOP comparison to **Module 19 (`19-py-oop-fundamentals.html`)** Section 1.

---

### File 02: `02-py-identifiers.html`
- **Current Pedagogical Level:** Tier 2 (Lexical Basics & Identifiers).
- **Identified Violations:**
  1. Lines 202–218: Defines `class Account:` with `def __init__(self, owner, balance):`, `self.__balance = balance`, `try: print(acc.__balance) except AttributeError:`, and list comprehension `[k for k in acc.__dict__ if "balance" in k]`.
  2. Line 175: Uses `for _ in range(5): do_work()` in the underscore summary table.
  3. Lines 444, 687, 783: Uses `def greet(name): if name: ...`, `def calculate_area(length, width):`, and `def demonstrate_indent(): if ... else: ...`.
- **Pedagogical Impact:** The user explicitly noted: *"in 02-py-identifiers.html file you added conditions also functions etc"*. This completely derails a beginner trying to learn how to name a variable.
- **Beginner Replacement Plan:**
  - **Rules of Identifiers:** Demonstrate naming rules strictly using primitive variable assignments:
    ```python
    # Valid Identifiers:
    user_age = 25
    _internal_cache_id = 9081
    total_amount_in_usd = 1450.50
    student1 = "John"

    # Invalid Identifiers (syntax rules):
    # 1student = "John"    # SyntaxError: cannot start with a digit
    # total-score = 100    # SyntaxError: hyphen '-' is treated as subtraction operator
    # user name = "Alice"  # SyntaxError: spaces are not permitted
    # ca$h = 500           # SyntaxError: '$' is not allowed in Python identifiers
    ```
  - **The 5 Underscore Conventions (Made 100% Beginner-Friendly):**
    1. **Single Leading Underscore (`_var`):** Conventional warning that a variable is intended for internal use within a script:
       ```python
       _database_port = 5432  # Internal configuration variable
       ```
    2. **Double Leading Underscore (`__var`):** Triggers Python's *Name Mangling* feature. Provide an intuitive, beginner-level explanation:
       > *"In object-oriented programming (Module 19), prefixing a variable inside a class with two underscores causes Python to internally rename it so child classes don't accidentally overwrite it. For general script variables, avoid starting names with `__`."*
    3. **Trailing Underscore (`var_`):** Used to avoid naming collisions with Python's reserved keywords:
       ```python
       class_ = "Computer Science 101"  # 'class' is a reserved keyword, so append '_'
       def_ = "Definition of terms"     # 'def' is a reserved keyword
       ```
    4. **Dunder Names (`__var__`):** Reserved for language hooks. Demonstrate with the built-in module name variable:
       ```python
       print(__name__)  # Prints '__main__' (a built-in special variable)
       ```
    5. **Single Underscore (`_`):** Used in the interactive Python REPL as the result of the last evaluated expression:
       ```python
       # In Python interactive shell:
       # >>> 15 * 4
       # 60
       # >>> _ + 10
       # 70
       ```
  - **Indentation Demonstration:** Replace `def demonstrate_indent(): if ...` with a clean, sequential top-level demonstration explaining the 4-space rule and why consistent block indentation is mandatory in Python.
- **Relocation of Advanced Content:**
  - The complete `class Account` name-mangling inspection (`acc.__dict__`, `_Account__balance`, `AttributeError`) is moved to **Module 19 (`19-py-oop-fundamentals.html`) Section 4: Data Hiding & Name Mangling**.

---

### File 03: `03-py-data-types.html`
- **Current Pedagogical Level:** Tier 3 (Built-in Types & Immutability).
- **Identified Violations:**
  1. Lines 477–481: Uses `try: b1[0] = 65 except TypeError:` to prove bytes immutability.
  2. Lines 677–683: Uses `for val in falsy_values: print(...)` and `for val in truthy_values:`.
  3. Lines 751–765: Uses `def describe(x): if type(x) in (int, float...): ...`.
- **Pedagogical Impact:** Loops, functions, and exceptions are used before they are taught.
- **Beginner Replacement Plan:**
  - Test truthiness with direct sequential expressions:
    ```python
    # Testing truthiness directly:
    print("bool(0):   ", bool(0))      # False (numeric zero)
    print("bool(''):  ", bool(""))     # False (empty string)
    print("bool([]):  ", bool([]))     # False (empty list)
    print("bool(None):", bool(None))   # False (NoneType)
    print("bool('hi'):", bool("hi"))   # True (non-empty string)
    print("bool(42):  ", bool(42))     # True (non-zero integer)
    ```
  - Immutability demonstration:
    ```python
    b = bytes([65, 66, 67])
    print("Initial bytes:", b)
    # Attempting to modify an immutable bytes object raises an error:
    # b[0] = 68  # TypeError: 'bytes' object does not support item assignment
    ```
  - Practice Problem 3: Replace `def describe(x):` with individual variables inspected via `type()` and `id()`.
- **Relocation of Advanced Content:**
  - The `describe(x)` type-introspection function moves to **Module 14 (`14-py-functions.html`)**.

---

### File 04: `04-py-basic-data-type.html`
- **Current Pedagogical Level:** Tier 3 (Fundamental Data Types).
- **Identified Violations:**
  1. Line 510: Uses `def greet():` to demonstrate that functions return `None`.
  2. Line 669: Uses `for item in items:` in the practice challenge.
- **Beginner Replacement Plan:**
  - Demonstrate `NoneType` without defining a custom function:
    ```python
    # NoneType represents the absence of a value:
    result = None
    print("Value:", result)
    print("Type: ", type(result))  # <class 'NoneType'>
    print("Is result None?", result is None)  # True
    ```
  - Rewrite practice challenge using sequential scalar variables.
- **Relocation of Advanced Content:**
  - Function return default of `None` moves to **Module 14 (`14-py-functions.html`) Section 2**.

---

### File 05: `05-py-type-casting.html`
- **Current Pedagogical Level:** Tier 3 (Type Casting).
- **Identified Violations:**
  1. Lines 470–478: Defines `def safe_int(s): try: return int(s) except ValueError: return None`.
  2. Line 491: Defines `def to_bool(val):`.
- **Beginner Replacement Plan:**
  - Demonstrate successful and failing type conversions directly:
    ```python
    # Valid conversions:
    num1 = int("123")        # 123
    num2 = int(19.85)        # 19 (truncation)
    num3 = int(True)         # 1

    # Invalid conversions (what triggers errors):
    # int("10.5")   # ValueError: string must be integer literal
    # int("hello")  # ValueError: invalid literal for int() with base 10: 'hello'
    # int(10 + 5j)  # TypeError: float or int cannot be converted from complex
    ```
- **Relocation of Advanced Content:**
  - `def safe_int` and parsing defensive helpers move to **Module 24 (`24-py-exception-handling.html`) Section 3**.

---

### File 06: `06-py-operators.html`
- **Current Pedagogical Level:** Tier 4 (Operators & Expressions).
- **Identified Violations:**
  1. Line 286: Defines `def expensive_operation():` to prove short-circuiting.
  2. Line 694: Defines `def greet():` in ternary pitfalls.
  3. Line 944: Uses list comprehension `a = [[] for _ in range(3)]` in shallow copy explanation.
  4. Line 1090: Defines `def clamp(n, lo, hi):`.
  5. Lines 1223–1224: Uses nested loops `for a in (True, False): for b in (True, False):` to print truth tables.
- **Beginner Replacement Plan:**
  - **Short-circuiting without functions:** Demonstrate short-circuiting using division-by-zero protection:
    ```python
    denominator = 0

    # Because (denominator != 0) evaluates to False,
    # Python short-circuits and NEVER evaluates (100 / denominator > 5)!
    can_divide = (denominator != 0) and (100 / denominator > 5)
    print("Can divide:", can_divide)  # Prints False safely without ZeroDivisionError!

    # Similarly for 'or':
    has_admin = True
    # Because has_admin is True, the right operand is never evaluated:
    access_granted = has_admin or (100 / denominator > 5)
    print("Access granted:", access_granted)  # Prints True safely
    ```
  - **Clamping with pure ternary expressions:**
    ```python
    val = 15
    low = 0
    high = 10
    clamped_val = low if val < low else (high if val > high else val)
    print("Clamped value:", clamped_val)  # 10
    ```
  - **Truth Table Printing:** Display direct truth tables with clean sequential `print()` statements.
- **Relocation of Advanced Content:**
  - The `clamp()` utility function moves to **Module 14 (`14-py-functions.html`)**.
  - The `[[] for _ in range(3)]` idiom is highlighted in **Module 10 (`10-py-lists.html`) Section 5**.

---

### File 07: `07-py-input-output.html`
- **Current Pedagogical Level:** Tier 5 (Console I/O & Formatting).
- **Identified Violations:**
  1. Line 196: Uses list comprehension `[int(x) for x in input().split()]`.
  2. Lines 352, 848, 902: Uses `try/except ValueError` for parsing command-line arguments.
  3. Lines 445–450: Uses `with open("output.log", "a") as f:` to demonstrate `print(file=f)`.
  4. Lines 880–884: Uses `for name, qty, price in items:` with list of tuples in tabular formatting.
- **Beginner Replacement Plan:**
  - **Reading Multiple Values:** Introduce step-by-step:
    ```python
    # Step 1: Read raw input string
    raw = input("Enter two numbers separated by space: ")

    # Step 2: Split string into individual tokens
    tokens = raw.split()

    # Step 3: Convert tokens to integers
    num1 = int(tokens[0])
    num2 = int(tokens[1])
    print(f"Sum of {num1} and {num2} is {num1 + num2}")

    # Concise Idiomatic Method using map():
    a, b = map(int, input("Enter two numbers: ").split())
    print(f"Product: {a * b}")
    ```
    *(Add a callout note: "In File 10, we will learn List Comprehensions: `[int(x) for x in input().split()]` as a powerful alternative.")*
  - **Tabular Formatting with f-strings:** Format standalone variables to master width, alignment, and decimal precision:
    ```python
    product_name = "Mechanical Keyboard"
    quantity = 2
    unit_price = 89.99
    total_price = quantity * unit_price

    print(f"{'Product':<25} | {'Qty':^5} | {'Price':>10} | {'Total':>10}")
    print("-" * 58)
    print(f"{product_name:<25} | {quantity:^5} | ${unit_price:>9.2f} | ${total_price:>9.2f}")
    ```
  - **`print(file=...)` demonstration:** Demonstrate using `sys.stderr` (built-in output stream) instead of disk files:
    ```python
    import sys
    print("Standard output message", file=sys.stdout)
    print("Error / diagnostic message", file=sys.stderr)
    ```
    *(Add note: "Writing directly to disk files using open() is fully explored in File 18 File Handling.")*
- **Relocation of Advanced Content:**
  - Complex CLI argument parsing with `ast.literal_eval` and `try/except` moves to **Module 24 (`24-py-exception-handling.html`)**.

---

### File 08: `08-py-control-flow.html`
- **Current Pedagogical Level:** Tier 6 (First introduction to Branching & Loops).
- **Identified Violations:**
  1. Wraps all Section 6 Classic Numerical Algorithms inside function headers:
     - `def is_prime(n: int) -> bool:` (Line 469)
     - `def is_armstrong(n: int) -> bool:` (Line 483)
     - `def generate_fibonacci(terms: int) -> list[int]:` (Line 499)
     - `def is_palindrome_number(n: int) -> bool:` (Line 515)
     - `def factorial(n: int) -> int:` (Line 528)
     - `def number_to_words(num: int) -> str:` (Line 556)
  2. Uses type hinting syntax (`n: int -> bool:`) before functions or typing have been introduced.
- **Pedagogical Impact:** Students trying to understand `while` loops, loop counters, and `break` are distracted by `def`, parameter scopes, `return` statements, and type annotations.
- **Beginner Replacement Plan:**
  - Rewrite all numerical algorithms as direct, pure script workflows using only what has been taught:
    ```python
    # --- 1. Prime Number Check using while / for and break ---
    num = 29
    is_prime = True

    if num <= 1:
        is_prime = False
    else:
        for i in range(2, int(num ** 0.5) + 1):
            if num % i == 0:
                is_prime = False
                break

    if is_prime:
        print(f"{num} is a PRIME number.")
    else:
        print(f"{num} is NOT a prime number.")


    # --- 2. Armstrong Number Check using while loop ---
    num = 153
    temp = num
    num_digits = len(str(num))
    total = 0

    while temp > 0:
        digit = temp % 10
        total += digit ** num_digits
        temp //= 10

    if total == num:
        print(f"{num} is an Armstrong number.")
    else:
        print(f"{num} is NOT an Armstrong number.")


    # --- 3. Fibonacci Sequence Generator using for loop ---
    terms = 10
    a, b = 0, 1
    print("Fibonacci series:")
    for _ in range(terms):
        print(a, end=" ")
        a, b = b, a + b
    print()
    ```
  - Add explicit note: *"In File 14 (Functions), we will learn how to encapsulate these exact algorithmic loops into reusable functions with parameters and return values."*
- **Relocation of Advanced Content:**
  - The function-wrapped, type-annotated versions move to **Module 14 (`14-py-functions.html`) Section 7: Practice Algorithms**.

---

### Files 09–13: Data Structures (Strings, Lists, Tuples, Sets, Dictionaries)
- **Current Pedagogical Level:** Tier 7 (Collections & Data Structures).
- **Identified Violations Across Modules 09–13:**
  - **Module 09 (`09-py-strings.html`):** Algorithms wrapped in functions: `def reverse_slice`, `def are_anagrams_sort`, `def compress_string`, `def segregate_characters`, `def merge_alternately`, `def sort_alphabets_then_digits`.
  - **Module 10 (`10-py-lists.html`):** Challenge tasks written as functions: `def deduplicate_preserve_order`, `def move_zeros_to_end`, `def second_largest`, `def deep_flatten`.
  - **Module 11 (`11-py-tuples.html`):**
    - Lines 630–645: Defines `class Employee(namedtuple("EmployeeBase", ...)):` with `def annual_salary(self):` using OOP classes and `@property`!
    - Line 703: Uses `try/except TypeError`.
  - **Module 12 (`12-py-sets.html`):** Tasks written as functions: `def is_pangram`, `def jaccard_similarity`, `def has_access`.
  - **Module 13 (`13-py-dictionaries.html`):**
    - Lines 765–785: Defines `class TTLDict:` with `def __init__(self):`, `def set(...)`, `def get(...)`.
    - Functions: `def deep_merge`, `def generate_invoice`, `def flatten_dict`.
- **Pedagogical Impact:** Before functions are taught in Module 14, every single data structure file wraps its practice programs in `def ... -> Type:`. Furthermore, Modules 11 and 13 define full OOP classes with `@property` decorators!
- **Beginner Replacement Plan:**
  - In Modules 09, 10, 12, 13: Write practice tasks as clean algorithmic transformations operating directly on sample data:
    ```python
    # Module 09 Example: Reversing Words in a Sentence (No def needed!)
    sentence = "Python is totally awesome"
    words = sentence.split()
    reversed_sentence = " ".join(reversed(words))
    print("Reversed words:", reversed_sentence)
    ```
  - In Module 11 (`11-py-tuples.html`): Present `namedtuple` purely as a lightweight data container without subclassing or methods:
    ```python
    from collections import namedtuple

    # Creating a Named Tuple:
    Employee = namedtuple("Employee", ["id", "name", "monthly_salary", "department"])
    emp1 = Employee(101, "Alice Smith", 6500.00, "Engineering")

    print("Employee Name:  ", emp1.name)
    print("Annual Earnings:", emp1.monthly_salary * 12)
    ```
  - In Module 13 (`13-py-dictionaries.html`): Demonstrate TTL cache using a standard dictionary storing timestamps:
    ```python
    import time

    # Plain dictionary with timestamp metadata:
    cache = {}
    current_time = time.time()
    cache["auth_token"] = {"value": "XYZ9876", "expires_at": current_time + 60}

    # Checking validity:
    if time.time() < cache["auth_token"]["expires_at"]:
        print("Token is valid:", cache["auth_token"]["value"])
    else:
        print("Token expired!")
    ```
- **Relocation of Advanced Content:**
  - `class Employee(namedtuple)` with `@property` methods moves to **Module 20 (`20-py-oop-inheritance.html`)** & **Module 21 (`21-py-oop-polymorphism.html`)**.
  - `class TTLDict` moves to **Module 19 (`19-py-oop-fundamentals.html`) Section 11: Real-World Case Studies**.

---

### File 14: `14-py-functions.html`
- **Current Pedagogical Level:** Tier 8 (The Canonical Home of `def`, Parameters & Scope!).
- **Identified Violations:**
  - Line 361: Uses `@lru_cache(maxsize=None)` before decorators are taught in Module 22.
  - Line 668: Uses `@memoize` (custom decorator).
- **Beginner Replacement Plan:**
  - Show memoization using a manual dictionary cache inside a closure or recursive function:
    ```python
    # Pure Function-based Memoization (using dictionary):
    def fibonacci_memo(n, memo={}):
        if n in memo:
            return memo[n]
        if n <= 1:
            return n
        memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
        return memo[n]

    print("Fibonacci(50):", fibonacci_memo(50))
    ```
  - Add explicit note: *"In File 22 (Decorators), we will learn how Python's `@` syntax allows us to apply memoization automatically using `@functools.lru_cache` without writing manual cache dictionaries."*
- **Relocation of Advanced Content:**
  - `@lru_cache` and `@memoize` decorator patterns move to **Module 22 (`22-py-decorators.html`) Section 3**.

---

### Files 16–18: Modules, Packages & File Handling
- **Current Pedagogical Level:** Tiers 9–10 (Modular Code & Storage).
- **Identified Violations:**
  - `17-py-packages.html` Line 557: Uses `class MockNamespace:` before classes are taught in Module 19.
  - `18-py-file-handling.html` Line 711: Uses `subprocess.run` with `try/except (subprocess.CalledProcessError, FileNotFoundError)`.
- **Beginner Replacement Plan:**
  - In `17-py-packages.html`: Use `types.SimpleNamespace` from the standard library to mock namespaces without defining a custom class.
  - In `18-py-file-handling.html`: Focus on disk file operations, streams, and context managers. Keep error checks to `os.path.exists()` or simple validation.
- **Relocation of Advanced Content:**
  - Advanced subprocess error trapping moves to **Module 24 (`24-py-exception-handling.html`)**.

---

### Files 19–21: Object-Oriented Programming
- **Current Pedagogical Level:** Tier 11 (The Canonical Home of `class`, `self`, Inheritance & Polymorphism!).
- **Pedagogical Alignment:**
  - **Module 19 (`19-py-oop-fundamentals.html`):**
    - Receives `class Account` and the complete deep-dive on Private Variables & Name Mangling (`__var` -> `_Account__balance`).
    - Receives `class TTLDict` as an advanced real-world custom container pattern.
  - **Module 20 (`20-py-oop-inheritance.html`):**
    - Receives subclassing of built-ins and `namedtuple` extension.
  - **Module 21 (`21-py-oop-polymorphism.html`):**
    - Canonical home for `@property` getters, setters, and deleters.

---

### Files 22–24: Decorators, Generators & Exception Handling
- **Current Pedagogical Level:** Tiers 12–13.
- **Pedagogical Alignment:**
  - **Module 22 (`22-py-decorators.html`):**
    - Canonical home for `@decorator` syntax, `@lru_cache`, and `@memoize`.
  - **Module 23 (`23-py-generators.html`):**
    - Canonical home for `yield`, `yield from`, memory-efficient streaming.
  - **Module 24 (`24-py-exception-handling.html`):**
    - The Grand Capstone of Runtime Safety! Synthesizes and explains all error patterns (`ValueError`, `TypeError`, `KeyError`, `IndexError`, `AttributeError`, `FileNotFoundError`) seen throughout earlier modules.

---

### Files 25–33: Advanced Tooling & Production Systems
- **Current Pedagogical Level:** Tier 14.
- All core language features are unlocked. The files systematically cover Multithreading (25), Copying (26), Assertions (27), Regular Expressions (28), Databases (29), Serialization (30), Logging (31), Unit Testing (32), and Pydoc (33).

---

## 5. Concept Preservation & Relocation Registry

To guarantee **Zero Concept Loss**, every single advanced concept being refactored from early modules has an assigned destination in the curriculum:

| Advanced Concept | Premature Location | Destination Module & Section | Status |
| :--- | :--- | :--- | :--- |
| **`class MathProcessor` (Multi-paradigm comparison)** | `01-py-introduction.html` | `19-py-oop-fundamentals.html` (Sec 1: Paradigms & Class Anatomy) | Preserved & Relocated |
| **`class Account` with `__balance` & Name Mangling** | `02-py-identifiers.html` | `19-py-oop-fundamentals.html` (Sec 4: Encapsulation & Mangling) | Preserved & Relocated |
| **`def describe(x)` Type Introspection Utility** | `03-py-data-types.html` | `14-py-functions.html` (Sec 6: Practical Functional Utilities) | Preserved & Relocated |
| **`def safe_int(s)` Defensive Parsing** | `05-py-type-casting.html` | `24-py-exception-handling.html` (Sec 3: Robust Parsing Handlers) | Preserved & Relocated |
| **`def clamp(n, lo, hi)` Numeric Utility** | `06-py-operators.html` | `14-py-functions.html` (Sec 1: Pure Functions & Return Values) | Preserved & Relocated |
| **Tabular Invoice Formatter (`for` loop with tuples)** | `07-py-input-output.html` | `11-py-tuples.html` (Sec 5: Structured Data Processing) | Preserved & Relocated |
| **Numerical Algorithms (`is_prime`, `armstrong`, etc.) Function Wrappers** | `08-py-control-flow.html` | `14-py-functions.html` (Sec 7: Algorithmic Functions) | Preserved & Relocated |
| **String Practice Algorithms Function Wrappers** | `09-py-strings.html` | `14-py-functions.html` (Sec 7: String Processing Functions) | Preserved & Relocated |
| **`class Employee(namedtuple)` with `@property`** | `11-py-tuples.html` | `20-py-oop-inheritance.html` & `21-py-oop-polymorphism.html` | Preserved & Relocated |
| **`class TTLDict` Expiring Dictionary** | `13-py-dictionaries.html` | `19-py-oop-fundamentals.html` (Sec 11: Real-World OOP Containers) | Preserved & Relocated |
| **`@lru_cache` & `@memoize` Decorator Functions** | `14-py-functions.html` | `22-py-decorators.html` (Sec 3: Memoization & Performance Caching) | Preserved & Relocated |
| **`class MockNamespace`** | `17-py-packages.html` | Replaced with `types.SimpleNamespace` (Module 17 standard lib) | Preserved |

---

## 6. Phased Implementation Roadmap

Once approved by the user, implementation will be executed systematically across 5 focused phases:

```
Phase 1: Foundations & Naming (Files 01–02)
  ├── 01-py-introduction.html: Replace MathProcessor OOP with procedural dynamic typing scripts.
  └── 02-py-identifiers.html: Replace class Account with beginner variables; simplify 5 underscore rules.

Phase 2: Types, Casting & Expressions (Files 03–06)
  ├── 03-py-data-types.html: Replace for loops and def describe with direct bool/id tests.
  ├── 04-py-basic-data-type.html: Remove def greet and for loops.
  ├── 05-py-type-casting.html: Replace def safe_int with sequential casting examples.
  └── 06-py-operators.html: Replace def functions and loops with direct division-by-zero short-circuiting.

Phase 3: I/O & Control Flow (Files 07–08)
  ├── 07-py-input-output.html: Simplify multi-input reading; replace file=open and loops with pure f-strings.
  └── 08-py-control-flow.html: Strip def and type annotations from numerical algorithms into pure loop scripts.

Phase 4: Data Structures & Functions (Files 09–14)
  ├── 09-py-strings.html: Convert function wrappers to procedural string processing scripts.
  ├── 10-py-lists.html: Convert challenge functions to pure list transformation scripts.
  ├── 11-py-tuples.html: Simplify namedtuple (remove class & @property); relocate to Files 20/21.
  ├── 12-py-sets.html: Convert set functions to pure set operations.
  ├── 13-py-dictionaries.html: Simplify TTL cache (remove class TTLDict); relocate to File 19.
  └── 14-py-functions.html: Replace @lru_cache/@memoize with manual dict memoization; add algorithmic functions.

Phase 5: OOP, Decorators & Exception Integration (Files 17–24)
  ├── 17-py-packages.html: Replace MockNamespace class with types.SimpleNamespace.
  ├── 19-py-oop-fundamentals.html: Ingest class Account (name mangling) & class TTLDict.
  ├── 20 & 21 (Inheritance/Polymorphism): Ingest class Employee(namedtuple) & @property.
  ├── 22-py-decorators.html: Fully explain @lru_cache and @memoize.
  └── 24-py-exception-handling.html: Ingest safe parsing and system exception patterns.
```

---

## 7. Verification & Acceptance Criteria
1. **Zero Premature Constructs:**
   - Files 01–07: Zero occurrences of `def` or `class`.
   - Files 01–13: Zero occurrences of `def` (except where explicitly presenting a forward-looking function call).
   - Files 01–18: Zero occurrences of `class`.
   - Files 01–21: Zero occurrences of `@` custom decorators.
   - Files 01–23: Zero unintroduced `try/except` blocks.
2. **Pedagogical Smoothness:**
   - Any learner starting at File 01 can execute and mentally verify every line of code using only the concepts taught up to that file.
3. **Preservation of Depth:**
   - All 33 files retain their technical rigor, opcode breakdowns, memory models, and interview preparation questions.
