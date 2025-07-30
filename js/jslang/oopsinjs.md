# **_OOPS in javaScripts_**

## **JavaScript: Declare Fields Inside the Constructor (or with Class Fields): -**

1. Traditional way (pre-ES2022):

   ```javascript
   class User {
     // fields(variable) declared inside the constructor are always the intance variable
     constructor(name, age) {
       // Instance variables
       this.name = name; // Field created dynamically
       this.age = age;
     }
   }
   ```

2. Modern (ES2022+) way:

   ```javascript
   class User {
     // INSTANCE FIELDS
     name;
     age;

     // class fields(variables)
     static email;
     static password;

     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }
   ```

> ## **Class in js = Template/Blueprint⬇️**

**`Member of class`**

```javascript
class User {
#password;
static email = "test@gmail.com";

// this is parameter constructor in js
constructor(name, password) {
 this.name = name;
 this.#password = password; // private
}

static credential(){
  //console.log(this.#password) //❌ error, this static method cannot access the instance/ non-static variable like in this example here is password is instance variable
 return  "email" User.email // static method can access the static variable only using the class name
}

// We need to create public getter and setter methods for private fields (variables) in order to access and modify their values from outside the class(using instance)
getPassword() {
 return this.#password;
}

setPassword(newPass) {
 this.#password = newPass;
}
}
```

- In javascript the static method can access the static variable using the class name

## **Creating/ Initializing Object in js = Instance Created from the Class Blueprint⬇️**

**`Instance of class`**

```javascript
const u = new User("Karan", "secret"); // Instance of the class
console.log(u.getPassword()); // ✅
u.setPassword("newpass");
console.log(u.getPassword()); // ✅ "newpass"
console.log(u.#password); // ❌ SyntaxError: Private field not accessible

// ℹ️In JavaScript, static variables and methods are not even visible to the instance.⬇️
u.credential(); // ❌ TypeError: u.greet is not a function
console.log(u.email); // ❌ undefined
```

> ## **Access Modifiers in js**

```javascript
class User {
  name = "Karan"; // public
  _role = "Admin"; // protected-ish
  #password = "123456"; // truly private

  getPassword() {
    return this.#password;
  }
}

const u = new User();
console.log(u.name); // ✅ "Karan"
console.log(u._role); // ✅ but discouraged
console.log(u.#password); // ❌ SyntaxError
```

| Syntax       | Acts Like        | Enforced? | Notes                                         |
| ------------ | ---------------- | --------- | --------------------------------------------- |
| `this.name`  | `public`         | ❌ No     | Always accessible                             |
| `this._role` | `protected`-like | ❌ No     | Convention only                               |
| `#password`  | `private`        | ✅ Yes    | Truly private, enforced by JavaScript runtime |

- **Enforced** means that the language itself (via the compiler or interpreter) **strictly checks and prevents certain actions** — like accessing private fields — and will **give you an error if you violate the rules.**
- so in javascript any field without \_ underscore or # hashtag is public

### **`this`** keyword in js: - _Refers to the current object — but it behaves differently depending on the context._

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hi, I’m ${this.name}`); // In js also we have implicit this in non-static method
  }
}
```

- In JavaScript, `this` depends on how a function is called — it can be dynamic in non-arrow functions, unlike in Java/Python.
- But in non-class functions or event handlers, this can behave differently.

```javascript
function greet() {
  console.log(this); // may refer to window or undefined depending on strict mode
}
```

- JavaScript’s this is contextual and sometimes confusing - that's why arrow functions were introduced (they bind this lexically).

> ## **Constructor in js⬇️**

Types of constructors: -

1. **Default/No-Arg/parameterless Constructor: -**

2. **Parameterized Constructor: -**

> ### Private Constructor in js⬇️

- Javascript does **not has built-in private constructors** like Java or C#. Here i have used clever/ different pattern

- so when we make the private construction, we left with two appraoch: -

1. **Singleton Pattern: -**

   ```javascript
   class User {
     static #allow = false;

     constructor() {
       if (!User.#allow) {
         throw new Error("Use User.create() instead");
       }
     }

     static create() {
       User.#allow = true;
       const instance = new User();
       User.#allow = false;
       return instance;
     }
   }
   ```

   ```javascript
   const u = User.create(); // ✅ Works
   const x = new User(); // ❌ Error: Use User.create() instead
   ```

2. **Factory Methods: -**
