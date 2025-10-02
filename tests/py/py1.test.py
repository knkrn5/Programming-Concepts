# import platform

# print(platform.python_implementation())


dict = {
    "name": "Karan",
    "age": 24,
    "hobbies": ["coding", "music"],
    "address": {"city": "Delhi", "country": "India"},
    "greet": lambda: print("Hello!"),
    "greet2": lambda: print("Hi there!"),
}

res = dict.items()

print(res)