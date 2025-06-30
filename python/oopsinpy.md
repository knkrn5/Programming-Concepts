# **_OOPS in python_**

## **Python: Declare Fields Inside**

```python
class User:
    def __init__(self, name, age):
        self.name = name   # Field declared here
        self.age = age
```

> ## **Class in py = Template/Blueprint⬇️**

```python
class User:
    # this is constructor in py
    def __init__(self, name, password):
        self.name = name
        self.__password = password  # "private" by convention (name mangling)

    def get_password(self):
        return self.__password

    def set_password(self, new_password):
        self.__password = new_password
```

## **Creating/ Initializing Object in py = Instance Created from the Class Blueprint⬇️**

```python
u = User("Karan", "secret")
print(u.get_password())      # ✅ Access via getter

u.set_password("newpass")    # ✅ Set via setter
print(u.get_password())      # newpass

```

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

- so python any field created without \_ underscore or \_\_ double underscore is public
