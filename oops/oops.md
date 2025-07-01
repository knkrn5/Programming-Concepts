# **_Object oriented Programming(OOPS)_**

```text
Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can hold data (fields) and methods (functions/behaviors) that operate on the data.
```

- The term "Object-Oriented" comes from the fundamental concept that this programming paradigm is built around objects as the primary building blocks of software or **"objects" as the fundamental building blocks of a program/ Software.**
- **Truely OOPS Programming language** are java, c# , c++ and some more

> ## **Class = Template/Blueprint⬇️**

Class is template/ blueprint that is **used to create/inatialize an object** will all or the specific **Attributes/Properties/Fields** and **Methods/Functions** based on our constructor , when we create new object using new keyword ??

1. [fields declaration in java](../java/oopsinjava.md#java-declare-fields-at-class-level)
2. [fields declaration in js](../js/oopsinjs.md#javascript-declare-fields-inside-the-constructor-or-with-class-fields--)
3. [fields declaration in py](../py/oopsinpy.md#python-declare-fields-inside-constructor)

- What **data an object** will have (fields/attributes/properties)
- What **behaviors an object** can perform (methods)
- How **objects are initialized** (constructors)

1. [class in java](../java/oopsinjava.md#class-in-java--templateblueprint️)
2. [class in js](../js/oopsinjs.md#class-in-js--templateblueprint️)
3. [class in py](../py/oopsinpy.md#class-in-py--templateblueprint️)

### **1. Instance of class: -** _An instance is a specific object created from a class blueprint_

```java
// Java example
class Car {
    String brand;
    String color;

    void start() {
        System.out.println("Car is starting");
    }
}

// Creating instances
Car car1 = new Car();  // car1 is an INSTANCE of Car class
Car car2 = new Car();  // car2 is another INSTANCE of Car class
```

### **2. Member of class: -** _A member of a class is anything that belongs to the class:_

- Variables (called fields or attributes)
- Methods (functions defined in the class)
- Inner classes, constants, etc.

- Types of Members:

  1. Instance Members (Non-static)
  2. Class Members (Static)

> ## **Object = Instance Created from the Class Blueprint⬇️**

1. [object initialization in java](../java/oopsinjava.md#creating-initializing-object-in-java--instance-created-from-the-class-blueprint️)
2. [object initialization in js](../js/oopsinjs.md#creating-initializing-object-in-js--instance-created-from-the-class-blueprint️)
3. [object initialization in py](../py/oopsinpy.md#creating-initializing-object-in-py--instance-created-from-the-class-blueprint️)

> ## **_Access Modifiers⬇️_**

Access modifiers are keywords that define the visibility/scope of classes, methods, constructors, and fields (variables).

![access modifier](./imgs/accessmodifiers.png)

1. [access modifier in java](../java/oopsinjava.md#access-modifiers-in-java)
2. [access modifier in js](../js/oopsinjs.md#access-modifiers-in-js)
3. [access modifier in py](../py/oopsinpy.md#access-modifiers-in-py)

> ## **Constructor**

- A constructor is a special method used to **initialize objects** when you use new. It serves as the **initialization mechanism** for objects, setting up their initial state/values for instance variables and preparing them for use
- **_Constructors have the same name as the class they belong to._** They **don't have a return type**, not even void, because they **implicitly return the newly created object**

### **Types of Constructor: -**

1. Default/No-Arg/parameterless Constructor: - Takes no parameters and initializes objects with default values. If you don't define any constructor, **many languages provide a default one automatically.**
   ![defaultValueOfConstructor](./imgs/defaultValueOfConstructor.png)

   - Java & Kotlin & c# provide safe defaults (0, false, null).

   - JavaScript and Python use undefined or None, so null-checking is essential.

   - C++ leaves primitives uninitialized by default — risky without initialization.

   ```java
    // no-arg contructor example
   public class User {
    String name;
    int age;

    // No-arg constructor
    public User() {
        // no fields/attributes/properties initialization
    }
    }

   ```

   ```java
   // instialization
   User u = new User();
   // usage manually setting value like this
    u.name = "Karan";
    u.age = 24;
   ```

2. Parameterized Constructor: - Accepts parameters to initialize objects with specific values provided during creation. This allows for customized object initialization.

   ```text
   top class and object initialization example
   ```

   [See this example, for paramter Constructor](#class--templateblueprint️)

3. Copy Constructor (Custom): - Creates a new object as a copy of an existing object. This is particularly important for deep copying when objects contain references to other objects.

### **Private Constructor**

A private constructor is a No one outside the class can create/initialize objects directly. Only the class itself can create its instance

- No other class can create an object using **new ClassName().**
- Only the **class itself can create instances internally**.
- Provides controlled access through static methods, which can only be accessed using that class name only.
- Neither Python nor JavaScript have **true private constructors** like Java/C#.

so when we make the private construction, we left with two appraoch: -

1. **Singleton Pattern: -** The Singleton pattern is a design pattern that ensures a class has only one instance and provides a global point of access to that instance. This is useful for resources that should be unique in a system, such as:

   - Database connections (expensive to create multiple)
   - Configuration managers
   - Logging services
   - Cache managers
   - Thread pools

   ```java
   public class Singleton {

       private static Singleton instance;

       // Private constructor — now no one can call `new Singleton()`
       private Singleton() {}

       // Public method to access the one instance
       public static Singleton getInstance() {
           if (instance == null) {
               instance = new Singleton();
           }
           return instance;
       }
   }
   ```

   ```java
   Singleton s1 = Singleton.getInstance();
   Singleton s2 = Singleton.getInstance();

   System.out.println(s1 == s2); // true → same object
   ```

2. **Factory Methods: -** Factory methods (often called **"Static Factory Methods"** when they are **static methods within the class itself**) are static methods that return an instance of the class (or a subclass). When combined with private constructors, they provide a much more flexible and descriptive way to **create objects** than direct constructor calls.

   ```java
   public class User {

       private String role;

    //private constructor
       private User(String role) {
           this.role = role;
       }

    // static method
       public static User createAdmin() {
           return new User("ADMIN"); // object created here using private constructor
       }

    // static method
       public static User createGuest() {
           return new User("GUEST"); // object created here using private constructor
       }

       @Override
       public String toString() {
           return "User{role='" + role + "'}";
       }
   }
   ```

   ```java
    User admin = User.createAdmin();
    User guest = User.createGuest();
    System.out.println(admin); // User{role='ADMIN'}
   ```

## **Contructor Overloading**

## **4 Pillars of Object-Oriented**

1. Encapsulation:- Bundling data (attributes) and the methods that operate on that data within a single unit (the object), and hiding the internal details from the outside world.
2. Abstraction: - Showing only the essential features of an object and hiding the complex implementation details. It's about designing objects that present a simplified view to the outside.
3. Polymorphism: - The ability of an object to take on many forms. Specifically, it allows objects of different classes to be treated as objects of a common base class. This often involves method overriding, where a subclass provides its own specific implementation of a method defined in its superclass.
4. Inheritance: - A mechanism where one class (subclass/child class) can inherit properties and behaviors from another class (superclass/parent class). This creates a "is-a" relationship

   - ### **Types of Inheritance**
