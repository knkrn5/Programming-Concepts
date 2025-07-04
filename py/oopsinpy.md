# **_OOPS in python_**

## **Python: Declare Fields Inside Constructor**

```python
class User:
    def __init__(self, name, age):
        self.name = name   # Field declared here
        self.age = age
```

> ## **Class in py = Template/Blueprint⬇️**

**`Member of class`**

```python
class User:

    email = "test@email.com" # In python variables are declared outside the __init__() constructor, and they are shared by all instances of the class.

    # this is constructor in py
    # In python variables declared inside the __init__() constructor using self are the instance variable⬇️
    def __init__(self, name, password):
        self.name = name
        self.__password = password  # "private" by convention (name mangling)

    def get_password(self):
        return self.__password

    def set_password(self, new_password):
        self.__password = new_password

    @staticmethod
    def credential():
        # print(self.name)   # ❌ ERROR: 'self' is not passed to static method
        return f"credential: {User.email}" # In py also static method can access the static variable using the class name
```

- In python, also static method can access the static variable using the class name

## **Creating/ Initializing Object in py = Instance Created from the Class Blueprint⬇️**

**`Instance of class`**

```python
u = User("Karan", "secret") # Instance of the class
print(u.get_password())      # ✅ Access via getter

u.set_password("newpass")    # ✅ Set via setter
print(u.get_password())      # newpass

# ℹ️ Python allows it, but it's clearer and better to call static members via the class name.⬇️
u.credential()         # ✅ Works, but not recommended❌
print(u.email)     # ✅ Works, but not recommended❌

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

print(u._User__password)  # ✅ Hack: works via name mangling, this is because python does not enforces the strict checking like java and c#

```

| Convention | Acts Like        | Enforced?    | Notes                                     |
| ---------- | ---------------- | ------------ | ----------------------------------------- |
| `name`     | `public`         | ❌ No        | Can be accessed from anywhere             |
| `_name`    | `protected`-like | ❌ No        | Convention: for subclasses/internal use   |
| `__name`   | `private`-like   | ⚠️ Partially | Name mangling: becomes `_ClassName__name` |

- **Enforced** means that the language itself (via the compiler or interpreter) **strictly checks and prevents certain actions** — like accessing private fields — and will **give you an error if you violate the rules.**
- so python any field created without \_ underscore or \_\_ double underscore is public

### **`Self`** keyword in py: - _self when Used inside instance methods to refer to the current object._

```python
class User:
    def __init__(self, name): # no automatic passing/ or implicit self , you must include 'self' in every method argument/ parameter
        self.name = name  # 'self' refers to this instance

    def greet(self): # no implicit self , you must include 'self' in every method argument/ parameter
        print(f"Hi, I’m {self.name}")
```

- Python is explicit: nothing is hidden. we write self always in the method signature **(method signature includes Method name, Parameter types (and sometimes parameter count) and Parameter order).**

> ## **Constructor in py⬇️**

Types of constructors: - **python does not support any defualt constructor**, we have write the constructor explicitly

1. **No-Arg/parameterless Constructor: -**

2. **Parameterized Constructor: -**

> ### Private Constructor in py⬇️

- Python does **not has built-in private constructors** like Java or C#. Here i have used clever/different pattern
- so when we make the private construction, we left with two appraoch: -

1. **Singleton Pattern: -**

   ```python
   class User:
       __instance = None  # for singleton example

       def __new__(cls, *args, **kwargs):
           raise Exception("Use get_instance() instead")

       @classmethod
       def get_instance(cls):
           if cls.__instance is None:
               cls.__instance = super().__new__(cls)
               cls.__init_instance(cls.__instance)
           return cls.__instance

       @staticmethod
       def __init_instance(instance):
           instance.name = "Karan"
           # initialize other stuff here
   ```

   ```python
   u = User.get_instance()   # ✅ Works
   User()                    # ❌ Raises Exception
   ```

2. **Factory Methods: -**
