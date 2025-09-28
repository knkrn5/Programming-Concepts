# 👉 In python dict property must be in quotes (Can any single or double quotes)
#  we cannot use dot notation with regular Python dictionaries like you can in JavaScript.

# ============================================
# - In Python,  dictionary values can hold anything — a number, string, object, array, function, or even another function returning another object.
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

dict.get("name")  # → "Karan"
dict.get("email", "Not set")  # → "Not set"
dict["name"]  # → "Karan"
# dict["email"]  # → KeyError: 'email' (if key doesn't exist
# dict.name  # AttributeError: 'dict' object has no attribute 'name' (dot notation doesn't work with dicts in py)

for key in dict:
    print("Key:", key)  # → Key: name, Key: age
    print("Value:", dict[key])  # → Value: Karan, Value: 24

for key, value in dict.items():
    print("Key:", key)  # → Key: name, Key: age
    print("Value:", value)  # → Value: Karan, Value: 24


#🎯======OBJECT/DICTIONARY DATA MANIPULATION IN PY==================
#👉 In PY we can only manipulate the object/DICT data using bracket notation.
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
