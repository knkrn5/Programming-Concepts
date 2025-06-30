# **_Object oriented Programming_**

## **Constructor**

- A constructor is a special method used to **initialize objects** when you use new. It serves as the **initialization mechanism** for objects, setting up their initial state and preparing them for use
- **_Constructors have the same name as the class they belong to._** They **don't have a return type**, not even void, because they **implicitly return the newly created object**

### Types of Constructor: -

1. Default/No-Arg Constructor: - Takes no parameters and initializes objects with default values. If you don't define any constructor, **many languages provide a default one automatically.**
   ![defaultValueOfConstructor](./imgs/defaultValueOfConstructor.png)

   - Java & Kotlin & c# provide safe defaults (0, false, null).

   - JavaScript and Python use undefined or None, so null-checking is essential.

   - C++ leaves primitives uninitialized by default — risky without initialization.

2. Parameterized Constructor: - Accepts parameters to initialize objects with specific values provided during creation. This allows for customized object initialization.
3. Copy Constructor (Custom): - Creates a new object as a copy of an existing object. This is particularly important for deep copying when objects contain references to other objects.
