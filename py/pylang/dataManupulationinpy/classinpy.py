class User:
    def __init__(self):
        self.name = "Karan"
        self.age = 24


user = User()

print(getattr(user, "name", "Unknown"))  # → "Karan"
print(getattr(user, "email", "Not set"))  # → "Not set"

setattr(user, "email", "karan@email.com")
print(user.email)  # → "karan@email.com"

# They work with class instances (i.e., objects created from classes) Because those are the ones that have attributes. Dictionaries don’t have attributes — they have keys, so use .get() / dict[key] for that.
