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

**`Member of class`**

```java
public class User {
    //fields/attributes/properties
    //here defualt access modifier is package-private = means Accessible within the same package, NOT accessible outside the package, even if imported
    String name; // instance variable (these have diffrent/unique memory each and every instances)
    int age;  // instance variable

    private String email;

    static String fullname; // class variable/field (these have same memory for all the instances)

    //parameter Constructor
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // We need to create public getter and setter methods for private fields (variables) in order to access and modify their values from outside the class(using instance)
    public String getEmail(){
        return this.email
    }

    public void setEmail(String email){
        this.email = email
    }

    // Static method
    public static void fullName() {
        System.out.println("User Name: " + fullname ); //so static method can only access static variable, instance variable cannot be accessed will get error
    }

    // Method
    public void greet() {
        System.out.println("Hi, my name is " + name + " and I am " + age + " years old.");
    }
}
```

- In java the static method can access the static variable without the class name

## **Creating/ Initializing Object in java = Instance Created from the Class Blueprint⬇️**

**`Instance of class`**

```java
//obj initialization in java using class blueprint
User user1 = new User("Karan", 24); // now here user1 is a object/ Instance of the class with the property name and age.
user1.greet();
// output = Hi, my name is Karan and I am 24 years old.

//ℹ️In JAVA, Technically Static variables and methods CAN be accessed through instances though it's not recommended style, (alway access Static method via class name only.), but static methods CANNOT access instance variables/methods⬇ because they don't know which instance.⬇️
user1.fullname() // ✅ Works, but discouraged ❌
user1.fullname // ✅ Works, but discouraged ❌
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

---

### **equal() and hashcode(): -** _usefull for nested classes_

ℹ️so hashnode create the bucket based on the field value not based on the field name similarly equal() compares based on the field values not based on the field name.

```java
// This tells the lombok to included the superclass(field)/ inherited fields in the equality check
@EqualsAndHashCode(callSuper = true)
// This tells the lombok not to included the superclass(field)/ inherited fields in the equality check
@EqualsAndHashCode(callSuper = false)
```

1. hashCode() Groups objects with similar data(fields) into the same bucket.

   - Use hashCode() to find a bucket
   - Generates an integer number (called a hash) based on the field values, to help Java collections quickly locate objects.
   - Objects with the same hash code go into the same bucket.
   - Java uses this in HashMap, HashSet, Hashtable to group similar objects.
   - It helps put objects into the right "bucket" for fast access.

2. equals() Compares actual field values to find the exact match in that bucket

   - equals() to find the exact object in that bucket
   - Checks if objects have equal field values
   - Custom logic to compare actual content

   ```java
   class Person {
       private String name;
       private int age;
   }

   @EqualsAndHashCode(callSuper = false)
   class Student extends Person {
       private String studentId;
   }

   // Testing:
   Student s1 = new Student();
   s1.setName("Alice");
   s1.setAge(20);
   s1.setStudentId("S001");

   Student s2 = new Student();
   s2.setName("Bob");      // Different name!
   s2.setAge(25);          // Different age!
   s2.setStudentId("S001"); // Same student ID

   System.out.println(s1.equals(s2)); // TRUE! (Only compares studentId)
   ```

- If a.equals(b) is true, then a.hashCode() == b.hashCode() must also be true.
- If you override equals(), you must override hashCode() too

```text
The magic process:

. HashMap calculates searchKey.hashCode() → gets number like 95642
. Uses this number to find the right "bucket" instantly
. In that bucket, uses equals() to find exact match
Returns the value

Without hashCode(), HashMap would be super slow:

. Would have to call equals() on every single entry
. O(n) time instead of O(1) time
```

- // here we are telling the lombok to not include the inherited fields in the equality check

---
