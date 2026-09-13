import keyword

# ==========================================================
# 1. HARD KEYWORDS (35 in Python 3)
# ==========================================================
# Cannot be used as variable names, function names, or identifiers.
print("=== HARD RESERVED KEYWORDS ===")
print("Total hard keywords:", len(keyword.kwlist))
print("All hard keywords:", keyword.kwlist)

# ==========================================================
# 2. SOFT KEYWORDS (4 in Python 3.12+)
# ==========================================================
# Soft keywords are reserved ONLY within specific syntax contexts
# (e.g. pattern matching or type statement), but can still be used
# freely as normal variable names or identifiers anywhere else.
print("\n=== SOFT KEYWORDS ===")
print("Total soft keywords:", len(keyword.softkwlist))
print("All soft keywords:", keyword.softkwlist)
# softkwlist = ['_', 'case', 'match', 'type']

# Explanation of each soft keyword:
# 1. 'match' -> Starts pattern matching (match expression:) [Python 3.10+]
# 2. 'case'  -> Pattern branch inside match (case pattern:)   [Python 3.10+]
# 3. '_'     -> Wildcard default pattern in match (case _:)   [Python 3.10+]
# 4. 'type'  -> Type alias definition (type Point = tuple)   [Python 3.12+]

# Demonstration: Using soft keywords as normal variables outside match blocks:
match = "Found pattern"      # Valid identifier!
case = "Uppercase"           # Valid identifier!
type = "AdminUser"           # Valid identifier! (shadows built-in type)
_ = "Temporary placeholder"  # Valid identifier!

print(f"\nUsing soft keywords as normal variables:")
print(f"  match: '{match}'")
print(f"  case:  '{case}'")
print(f"  type:  '{type}'")
print(f"  _:     '{_}'")

# Demonstration: Using soft keywords in their contextual statement:
status_code = 200
match status_code:
    case 200:
        response = "Success OK"
    case 404:
        response = "Page Not Found"
    case _:
        response = "Other Status"

print(f"\nPattern matching result for {status_code}: {response}")