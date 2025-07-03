# **_OOPS in java_**

## **Java: Declare Fields at Class Level**

```java
public class User {
    // Fields declared at class level
    private String name;
    private int age;

    // Constructor sets values
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

> ## **Class in java = Template/Blueprint⬇️**

```java
public class User {
    //fields/attributes/properties
    //here defualt access modifier is package-private = means Accessible within the same package, NOT accessible outside the package, even if imported
    String name;
    int age;

    //parameter Constructor
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Method
    public void greet() {
        System.out.println("Hi, my name is " + name + " and I am " + age + " years old.");
    }
}
```

## **Creating/ Initializing Object in java = Instance Created from the Class Blueprint⬇️**

```java
//obj initialization in java using class blueprint
User user1 = new User("Karan", 24); //now here user1 is a object/ Instance of the class with the property name and age.
user1.greet();
// output = Hi, my name is Karan and I am 24 years old.
```

- Uses the constructor → to pass "Karan" and 24.
- Allocates memory → for a new User object.
- Initializes fields → name = "Karan", age = 24.
- Returns the object reference → assigned to user1.

When we use the new keyword with a constructor, you're essentially saying: **_Build me an actual object based on this class blueprint._**

> ## **Access Modifiers in java**

1. **(default)/ Package-private: -** Accessible only within the same package
2. **private: -** Accessible only within the same class
3. **protected: -** Accessible in same package + subclasses
4. **public: -** Accessible from anywhere

### **`this`** keyword in java: - _Refers to the current object, implicitly available in non-static methods._

```java
public class User {
    String name; // instance variable

    // constructor
    User(String name) { // parameter with same name as that of the instance variable
        this.name = name; // 'this' is used to avoid shadowing, becase here now this.name is the instance field/variable assigned equal to the parameter name, so if we haven't used the this here that would lead to shadowing
    }

    void greet() {
        System.out.println("Hi, I’m " + this.name); // so here we can see that java has implicit this in hte non-static method, thatswhy we are directly able to use the this.name unlike in python where we have to write the self in the method argument/ parameter
    }
}
```

- Java automatically/ implicitly passes **this** — so we don’t include it in method signatures. **(method signature includes Method name, Parameter types (and sometimes parameter count) and Parameter order).**
- Mostly used when local and instance variables have the same name: - **`Shadowing`** is when a local variable or method parameter has the same name as an instance or class variable, which causes the local one to "hide" or "shadow" the outer one.

> ## **Constructor in java⬇️**

Types of constructors: - In java if we don't write any constructor it will automacally have the default no-arg constructor

1. **Default/No-Arg/parameterless Constructor: -**

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

   - Java & Kotlin & c# provide safe defaults (int = 0, boolean = false, string = null).

   ```java
   // instialization
   User u = new User();
   // usage manually setting value like this
    u.name = "Karan";
    u.age = 24;
   ```

2. **Parameterized Constructor: -**

> ### Private Constructor in java⬇️

- Java has true built-in Private constructor.
- so when we make the private construction, we left with two appraoch: -

1. **Singleton Pattern: -**

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

2. **Factory Methods: -**

   - **static** keyword in java: -

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
