# 🎯=======CLASS ATTRIBUTE MANIPULATION IN PY========================
class User:
    def __init__(self):
        self.name = "Karan"
        self.age = 24


user = User()

# Using dot notation
# dot notation They work with class instances (i.e., objects created from classes) and not with normal Python dictionaries. Because those are the ones that have attributes. Dictionaries don’t have attributes — they have keys, so use .get() / dict[key] for that.
print(user.name)  # → "Karan"
print(user.age)  # → 24

# =======Accessing attributes=======
print(getattr(user, "name", "Unknown"))  # → "Karan"
print(getattr(user, "email", "Not set"))  # → "Not set"

# =======Setting attributes=======
setattr(user, "email", "karan@email.com")
print(user.email)  # → "karan@email.com"
