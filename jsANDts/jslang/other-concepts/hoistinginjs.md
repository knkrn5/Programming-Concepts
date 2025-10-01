# **Hoisting in Js**

> Hoisting = JavaScript moves variable and function declarations to the top of their scope during the compilation phase.

> **⭐Important:** Only the declaration is hoisted, not the initialization(means assigning value to a variable).

```js
// Variables declared with var are hoisted to the top of their scope.
// Their declaration is hoisted, but initialization is not.
// They are initialized with 'undefined' and can be accessed before declaration.

console.log(x); // undefined (no error)
var x = 5;
console.log(x); // 5

// Variables declared with let and const ARE hoisted, but they are NOT initialized.
// They exist in the "Temporal Dead Zone" (TDZ) from the start of the block
// until the declaration is reached. Accessing them in the TDZ throws a ReferenceError.

console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;

console.log(z); // ReferenceError: Cannot access 'z' before initialization
const z = 20;

// Function declarations are fully hoisted (both declaration and definition)
sayHi(); // "Hi!" - works fine
function sayHi() {
  console.log("Hi!");
}

// Function expressions (using var, let, or const) are NOT fully hoisted
sayBye(); // TypeError: sayBye is not a function (if var)
// ReferenceError (if let/const)
var sayBye = function () {
  console.log("Bye!");
};
```

## **Why does variable Declared with var are hoisted, variable declared with let and const goes in temporal-dead-zone even after being Hoisted**

### ⚙️ Why `var` is hoisted and usable before declaration?

### ✅ Legacy behavior

- `var` has existed **since the beginning** of JavaScript (1995).
- JavaScript was designed to be forgiving and simple back then.
- So, to prevent errors when you used a variable before declaring it, the **entire `var` declaration is hoisted to the top** of its function or global scope — with its value set to `undefined`.

### 🧠 How JS handles `var` during compilation:

```js
console.log(a); // undefined
var a = 5;
```

Internally becomes:

```js
var a; // hoisted declaration
console.log(a); // undefined
a = 5;
```

🟢 So you _can access it_, but it just hasn’t been assigned a value yet — that's why it gives `undefined` instead of crashing.

---

## ❗ Why `let` and `const` go into Temporal Dead Zone (TDZ)?

### 🚫 To avoid bugs and unsafe behavior

- `let` and `const` were introduced in **ES6 (2015)** to fix the weird/unsafe behavior of `var`.
- TDZ was introduced to make variable usage **more predictable and safer**.
- Even though `let`/`const` are **hoisted**, **you can't access them before their declaration line** — or you'll get a `ReferenceError`.

```js
console.log(x); // ❌ ReferenceError: Cannot access 'x' before initialization
let x = 10;
```

Here’s what’s really happening under the hood:

```js
// `x` is hoisted but uninitialized — it's in TDZ
TDZ Start --> x --> x initialized here --> TDZ Ends
```

📌 **The TDZ exists from the start of the scope until the line where the variable is actually declared.**

This prevents:

- Accidental use of variables before they're ready
- Silent bugs like `undefined` assignments
- Confusion with async code or closures

---

## **Problem in var case is: -** _we may thousand line of codes and if we use this var variable before declaring in any of our code , we will get an `unexpected result without any error`_

### 🧠 The core problem with `var`: -

- `var` allows you to **use a variable before it's declared**, and it doesn't throw an error — it just returns `undefined`.
- So in large files or codebases with **thousands of lines**, if someone accidentally uses a variable before it’s declared, it doesn’t break the app immediately...
- ...but it can cause **weird, silent bugs** — where `logic breaks and you don’t know why.`

---
