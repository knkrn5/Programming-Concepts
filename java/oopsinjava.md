# **_OOPS in java_**

> ## **Class = Template/Blueprint⬇️**

```java
//Class eg in java
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

> ## **Object = Instance Created from the Class Blueprint⬇️**

```java
//obj initialization in java using class blueprint
User user1 = new User("Karan", 24); //now here user1 is a object with tow property name and age.
user1.greet();
// output = Hi, my name is Karan and I am 24 years old.
```

## **Access Modifiers**

1. **(default)/ Package-private: -** Accessible only within the same package
2. **private: -** Accessible only within the same class
3. **protected: -** Accessible in same package + subclasses
4. **public: -** Accessible from anywhere
