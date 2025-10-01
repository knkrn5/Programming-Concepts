# **Hoisting in Js**

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
