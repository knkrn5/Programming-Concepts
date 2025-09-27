# 👉 In python dict property must be in quotes (Can any single or double quotes)
#  we cannot use dot notation with regular Python dictionaries like you can in JavaScript.

# ============================================
obj1 = {
    "name": "Karan",
    "age": 24,
    "hobbies": ["coding", "music"],
    "address": {"city": "Delhi", "country": "India"},
    "greet": lambda: print("Hello!"),
    # "greet2": def greet2(): print("Hello from greet2"),
}


# 🎯===============READING DICTIONARY DATA IN PY================
# dict.items(): - similar to object.entries() in js, but this returns a view object that displays a list of a given dictionary's key-value tuple pairs.
dict = {"name": "Karan", "age": 24}

for key in dict:
    print("Key:", key)  # → Key: name, Key: age
    print("Value:", dict[key])  # → Value: Karan, Value: 24

for key, value in dict.items():
    print("Key:", key)  # → Key: name, Key: age
    print("Value:", value)  # → Value: Karan, Value: 24


#🎯======OBJECT DATA MANIPULATION IN PY==================
# ===== adding property in object in py=========================
person = {
    "name": "karan",
    "age": 24,
    "city": "New York",
}

person["email"] = "test@example.com"

print(person)
# 👉 {'name': 'karan', 'age': 24, 'city': 'New York', 'email': 'test@example.com'}

#===== deleteing property from an object in py=================
del person["age"]
print(person)
# 👉 {'name': 'karan', 'city': 'New York', 'email': 'test@example.com'}
