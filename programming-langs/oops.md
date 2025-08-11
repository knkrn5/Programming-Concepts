# **_Object oriented Programming(OOPS)_**

```text
Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can hold data (fields) and methods (functions/behaviors) that operate on the data.
```

- In the **real world, almost everything is an object** — _whether it's steel, wood, cloth, or plastic._ Similarly, in programming, **all non-primitive data types (like arrays, functions, linked lists, trees, etc.) are, behind the scenes, represented as objects**, especially in high-level object-oriented languages.
- The term "Object-Oriented" comes from the fundamental concept that this programming paradigm is built around objects as the primary building blocks of software or **"objects" as the fundamental building blocks of a program/ Software.**
- **Truely OOPS Programming language** are java, c# , c++ etc ~~python and javascripts~~ are not truely OOPS programming language

> ## **Feild/ Variable declaration in Oops⬇️**

1. [fields declaration in java](../java/javalang/oopsinjava.md#java-declare-fields-at-class-level)
2. [fields declaration in js](../js/jslang/oopsinjs.md#javascript-declare-fields-inside-the-constructor-or-with-class-fields--)
3. [fields declaration in py](../py/pylang/oopsinpy.md#python-declare-fields-inside-constructor-vs-outside-the-constructor)

- In both python and javascript any **variable declared inside the constructor are the instance variable**

> ## **Class = Template/Blueprint⬇️**

Class is template/ blueprint that is **used to create/inatialize an object** will all or the specific **Attributes/Properties/Fields** and **Methods/Functions** based on our constructor , when we create new object using new keyword ??

- What **data an object** will have (fields/attributes/properties)
- What **behaviors an object** can perform (methods)
- How **objects are initialized** (constructors)

1. [class in java](../java/javalang/oopsinjava.md#class-in-java--templateblueprint️)
2. [class in js](../jsANDts/jslang/oopsinjs.md#class-in-js--templateblueprint️)
3. [class in py](../py/pylang/oopsinpy.md#class-in-py--templateblueprint️)

### **`⭐Whats are Members in OOPS: -`: -** A members are **Variables (called fields or attributes)**, **Methods (functions defined in the class)** and **Inner classes (Nested class), constants etc in a class Blueprint**

### **Types of Members: -**

**1. Class Members (Static Members): -** _Static variables and methods are called the class members and not the instance member_

- Therefore: **Static methods can't use this/self because there's no instance to refer to**

**2. Instance Members (Non-static members): -** _Non-Static variables and methods are called the Instance members_

- **In java: -** Technically Static variables and methods CAN be accessed through instances (though it's not recommended style, alway access Static method via class name only.), but static methods CANNOT access instance variables/methods because they don't know which instance. [static vs instance in java](../java/oopsinjava.md#creating-initializing-object-in-java--instance-created-from-the-class-blueprint️)
- **In JavaScript**, static variables and methods are not even visible to the instance, so even we try of access static variable and method will get typeerror or undefined [static vs instance in js](../js/oopsinjs.md#creating-initializing-object-in-js--instance-created-from-the-class-blueprint️)
- **In python**, also technically its allowed but not recommended

> ## **Object/ Instance = Instance Created from/uses the _Contructor_ of the Class Blueprint⬇️**

### **`⭐Instance of class`: -** _An instance is a specific real object created from a class blueprint_

- ℹ️So whenever we create any new instance **each and every instance takes up its own different/ sperate memory** and all the **variable and method of each instace will be sperate form the other instance** created using the same class, so there are time **when we need to share the same variable and method accross all the instances**, in that case we need the **static variable and method because static variables and methods are have the same memory which is shareed accross all the instances** created using that same class blueprint. thus the value and the output of the static variable and method will be same in all the instances
- `this` (in Java and JS) and `self` (in Python) **refer to the current instance of the class.**

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

1. [object initialization in java](../java/javalang/oopsinjava.md#creating-initializing-object-in-java--instance-created-from-the-class-blueprint️)
2. [object initialization in js](../jsANDts/jslang/oopsinjs.md#creating-initializing-object-in-js--instance-created-from-the-class-blueprint️)
3. [object initialization in py](../py/pylang/oopsinpy.md#creating-initializing-object-in-py--instance-created-from-the-class-blueprint️)

---

- **Static → Static:** Static methods can access static variables, One copy shared by all instances ✓
- **Instance → Instance:** Instance methods can access instance variables. Each instance has its own copy ✓
- **Instance → Static:** Instance methods can access static variables ✓
- **Class → Static:** Accessing static through class name ✓
- **Instance → Static:** Accessing static through instance ✓ (but not recommended)

---

> ## **_🤷Common misconceptions🤷‍♀️⬇️_**

**Ques 1.** why the Non-static variable and methods are called Instance variable and method even tho those are written inside class blueprint

- **Ans 1: -** Class is just a blueprint, so if we want to **use the class non-static fields(variable) and methods, we will always have to create a instance from that class**, and these **instance will let us use the non-static fields and methods of the class**, thatswhy all the non-static fields/ variables and methods are called instance fields/ variables and methods and not the class variables or methods,
- and **static variables and methods of the class are not called the instance variables and methods** because **these can be used directly using the class name**, but the **non-static fields and variables cannot be used using the class name**

**Ques 2.** Even the static variables and methods are accesscible via instance then why do we don't called them the instance fields/ variables or methods.

- **Ans 2: -** [object(instance)](./oops.md#object-instance--instance-created-from-the-class-blueprint️) As we have discussed here in this link, that each instances have the different/ sperate memory with static fiels(variable) and methods have the same memory accross all the instance, **so even when we call the static variable or method using the instance, behind the hood the complier calls these static variables and method using the class name**(static members do not belong to any specific instance) and **that too these static variables and methods are not in the instance memory, these are called from their own memory** which is common for all the instances.

> ## **_Access Modifiers⬇️_**

Access modifiers are keywords that define the visibility/scope of classes, methods, constructors, and fields (variables).

![access modifier](./oops-img/accessmodifiers.png)

1. [access modifier in java](../java/javalang/oopsinjava.md#access-modifiers-in-java)
2. [access modifier in js](../jsANDts/jslang/oopsinjs.md#access-modifiers-in-js)
3. [access modifier in py](../py/pylang/oopsinpy.md#access-modifiers-in-py)

> ## **Nested Class**

> ## **Constructor**

- A constructor is a special method used to **initialize objects** when you use new. It serves as the **initialization mechanism** for objects, **setting up their initial state/values** for instance variables and preparing them for use, so therefore the **structure of the instance/ object will completly depend on how we have setup the constructor of the class**
- **_Constructors have the same name as the class they belong to._** They **don't have a return type**, not even void, because they **implicitly return the newly created object**

### **Types of Constructor: -**

1. **No-Arg/parameterless Constructor: -** Takes no parameters and initializes objects with default values. If you don't define any constructor, **many languages provide a default one automatically.(Generally No arg Contructor)**
   ![defaultValueOfConstructor](.//oops-img/defaultValueOfConstructor.png)

   - Java & Kotlin & c# provide safe defaults (0, false, null).

   - JavaScript and Python use undefined or None, so null-checking is essential.

   - C++ leaves primitives uninitialized by default — risky without initialization.

   1. [constructor in java](../java/javalang/oopsinjava.md#constructor-in-java️)
   2. [constructor in js](../jsANDts/jslang/oopsinjs.md#constructor-in-js️)
   3. [constructor in py](../py/pylang/oopsinpy.md#constructor-in-py️)

2. **Parameterized Constructor: -** Accepts parameters to initialize objects with specific values provided during creation. This allows for customized object initialization.

   1. [constructor in java](../java/javalang/oopsinjava.md#constructor-in-java️)
   2. [constructor in js](../jsANDts/jslang/oopsinjs.md#constructor-in-js️)
   3. [constructor in py](../py/pylang/oopsinpy.md#constructor-in-py️)

3. **Copy Constructor (Custom): -** Creates a new object as a copy of an existing object. This is particularly important for deep copying when objects contain references to other objects.

### **Private Constructor**

A private constructor means: - No one outside the class can create/initialize objects directly. Only the class itself can create its instance

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

   1. [private constructor in java](../java/javalang/oopsinjava.md#private-constructor-in-java️)
   1. [private constructor in js](../jsANDts/jslang/oopsinjs.md#private-constructor-in-js️)
   1. [private constructor in py](../py/pylang/oopsinpy.md#private-constructor-in-py️)

2. **Factory Methods: -** Factory methods (often called **"Static Factory Methods"** these are those method which has the static keyword in java and js or @staticmethod decorator in python **within the class itself**) are static methods that **return an instance of the class (or a subclass)**/ **return the objects created using the class blueprint** than direct constructor calls.

   - **WHY DO WE NEED STATIC IN OOPS?** = ℹ️So whenever we create any new instance **each and every instance takes up its own different/ sperate memory** and all the **variable and method of each instace will be sperate form the other instance** created using the same class, so there are time **when we need to share the same variable and method accross all the instances**, in that case we need the **static variable and method because static variables and methods are have the same memory which is shareed accross all the instances** created using that same class blueprint. thus the value and the output of the static variable and method will be same in all the instances
   - Static methods can only be access using the class name

   1. [private constructor in java](../java/javalang/oopsinjava.md#private-constructor-in-java️)
   1. [private constructor in js](../jsANDts/jslang/oopsinjs.md#private-constructor-in-js️)
   1. [private constructor in py](../py/pylang/oopsinpy.md#private-constructor-in-py️)

## **Contructor Overloading**

## **Method Overloading**

## **4 Pillars of Object-Oriented**

1. Encapsulation:- Bundling data (attributes) and the methods that operate on that data within a single unit (the object), and hiding the internal details from the outside world.
2. Abstraction: - Showing only the essential features of an object and hiding the complex implementation details. It's about designing objects that present a simplified view to the outside.
3. Polymorphism: - The ability of an object to take on many forms. Specifically, it allows objects of different classes to be treated as objects of a common base class. This often involves method overriding, where a subclass provides its own specific implementation of a method defined in its superclass.
4. Inheritance: - A mechanism where one class (subclass/child class) can inherit properties and behaviors from another class (superclass/parent class). This creates a "is-a" relationship

   - ### **Types of Inheritance**
