# **Decorators**

## **1. What is a Decorator?**

A **decorator** is a **special kind of declaration** that can be attached to:

- Classes
- Methods
- Accessors (get/set)
- Properties
- Parameters

It **adds behavior, metadata, or modifies the target** without changing the original code directly.

Think of it as a **wrapper or annotation** around a class/method/property.

---

## **2. Syntax**

```ts
@decorator
class MyClass {
  ...
}
```

- `@decorator` → calls a function that can **enhance the class or member**
- The decorator **runs at runtime** but is defined **at design time**

---

## **3. Types of Decorators**

### **a) Class Decorator**

- Modifies or adds metadata to the **class**

```ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
```

- Here, `@sealed` prevents adding new properties to the class or its prototype.

---

### **b) Method Decorator**

- Modifies a **method behavior**

```ts
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3); // Logs: Calling add with [2, 3]
```

- It wraps the original method to add **logging functionality**.

---

### **c) Property Decorator**

- Adds metadata or behavior to **properties**

```ts
function readOnly(target: any, key: string) {
  Object.defineProperty(target, key, {
    writable: false,
  });
}

class Car {
  @readOnly
  brand: string = "Tesla";
}

const c = new Car();
c.brand = "BMW"; // ❌ Error: brand is read-only
```

---

### **d) Parameter Decorator**

- Adds metadata about **method parameters**

```ts
function logParam(target: any, key: string, index: number) {
  console.log(
    `Parameter index ${index} in method ${key} of ${target.constructor.name}`
  );
}

class Person {
  greet(@logParam message: string) {
    console.log(message);
  }
}
```

---

## **4. Use Cases**

- Logging or profiling methods
- Validation of properties
- Authorization checks
- Metadata for frameworks (Angular, NestJS use decorators heavily)
- Dependency Injection

---

## **5. Important Notes**

- Decorators are **still experimental in TypeScript**, so you need to enable them in `tsconfig.json`:

```json
{
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

- They **run at runtime**, but are defined at design-time.
- They are **very powerful for frameworks** and meta-programming.

---

### ✅ TL;DR

> A decorator is a **function that can modify a class, method, property, or parameter**, often used to add metadata, validation, logging, or behavior without modifying the original code directly.

---

If you want, Boss, I can make a **diagram showing how a class, its methods, and properties are wrapped by decorators**, so you can **visualize the order of execution** — super handy for interviews.

Do you want me to make that?
