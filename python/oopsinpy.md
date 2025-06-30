# **_OOPS in python_**

> ## **Access Modifiers in py**

```python
class User:
    def __init__(self):
        self.name = "Karan"        # public
        self._role = "Admin"       # protected (by convention)
        self.__password = "1234"   # private-ish (name mangled)

u = User()
print(u.name)      # ✅ OK
print(u._role)     # ⚠️ OK but discouraged
print(u.__password) # ❌ AttributeError

print(u._User__password)  # ✅ Hack: works via name mangling

```
