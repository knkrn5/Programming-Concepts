# **_Object oriented Programming_**

> ## **Class = Template/Blueprint**

```java
//Class eg in java
public class User {
    //fields/attributes/properties
    String name;
    int age;

    //parameter Constructor
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method
    public void greet() {
        System.out.println("Hi, my name is " + name);
    }
}
```

Class is template or the blueprint that is **used to create/inatialize an object** will all or the specific **Attributes/Properties/Fields** and **Methods/Functions** based on our constructor , when we create new object using new keyword ??

- What **data an object** will have (fields/attributes/properties)
- What **behaviors an object** can perform (methods)
- How **objects are initialized** (constructors)

> ## **Object = Instance Created from the Blueprint**

```java
//obj initialization in java using class blueprint
User user1 = new User("Karan", 24);

```

When we use the new keyword with a constructor, you're essentially saying: **_Build me an actual object based on this class blueprint._**

> ## **Constructor**

- A constructor is a special method used to **initialize objects** when you use new. It serves as the **initialization mechanism** for objects, setting up their initial state/values for instance variables and preparing them for use
- **_Constructors have the same name as the class they belong to._** They **don't have a return type**, not even void, because they **implicitly return the newly created object**

### Types of Constructor: -

1. Default/No-Arg/parameterless Constructor: - Takes no parameters and initializes objects with default values. If you don't define any constructor, **many languages provide a default one automatically.**
   ![defaultValueOfConstructor](./imgs/defaultValueOfConstructor.png)

   - Java & Kotlin & c# provide safe defaults (0, false, null).

   - JavaScript and Python use undefined or None, so null-checking is essential.

   - C++ leaves primitives uninitialized by default — risky without initialization.

2. Parameterized Constructor: - Accepts parameters to initialize objects with specific values provided during creation. This allows for customized object initialization.
3. Copy Constructor (Custom): - Creates a new object as a copy of an existing object. This is particularly important for deep copying when objects contain references to other objects.

## **Contructor Overloading**

## **4 Pillars of Object-Oriented**

1. Encapsulation:- Bundling data (attributes) and the methods that operate on that data within a single unit (the object), and hiding the internal details from the outside world.
2. Abstraction: - Showing only the essential features of an object and hiding the complex implementation details. It's about designing objects that present a simplified view to the outside.
3. Polymorphism: - The ability of an object to take on many forms. Specifically, it allows objects of different classes to be treated as objects of a common base class. This often involves method overriding, where a subclass provides its own specific implementation of a method defined in its superclass.
4. Inheritance: - A mechanism where one class (subclass/child class) can inherit properties and behaviors from another class (superclass/parent class). This creates a "is-a" relationship

   - ### **Types of Inheritance**
