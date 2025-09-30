# **JavaScript Concept**

> ## javascript flow chart⬇️

![JS Diagram](./imgs/js-flow-chart.png)

## **[🔗 OOPS in js](./jslang/oopsinjs.md)**

## **Variable Declaration**

```js
//HOISTING⬇️
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

- **var: -** var is not block scoped, it leaks out of the block(like control or condtional statement blocks etc), but stays inside functions block.
- **let**
- **const**

- Undefined 🆚 Not-Defined

## **Datatypes in js**

1. **Primitive**
   1. String
   2. Number
   3. Boolean
   4. NaN: - type of NaN is number in Js
   5. Null
   6. Undefined
2. **Non-Primitive**

   1. [🔗 Objects in js](./jslang/dataManupulationinjs/objectinjs.js)

   2. [🔗 Array in js](./jslang/dataManupulationinjs/arrayinjs.js)

   3. [🔗 Functions in js](./jslang/dataManupulationinjs/functioninjs.js)

> ℹ️Imp: - **Object, Arrays, Date, RegExp, Map, Set, WeakMap, WeakSet**, etc.✅ _All of these return "object" from typeof, **except functions, which return "function"** (but still technically objects under the hood). Note that **typeof null === 'object'** due to a historical bug, even though null is a primitive value, so always handle null explicitly in type checks._

## **[🔗Operators in js](./jslang/operatorsinjs.md#operators)**

## **Execution Context in js: -** Understanding execution context in JavaScript is key to mastering weird behaviors like: -⬇️

- Why variables are undefined/referenceError when accessed before declaration
- Why functions can be called before they are defined

> **There are Two Phases of Execution:**

1.  `Memory Allocation Phase (Creation Phase): -`

    - JS scans the code before it starts executing
    - It allocates memory for:
      - Variables → initialized with undefined
      - Function declarations → fully hoisted (the whole function is placed in memory)

2.  `Code Execution Phase: -`

    - JS runs the code line-by-line
    - Variables get assigned their actual values
    - Functions get called as needed

#### Call Stack vs Stack Overflow

### deep vs shallow copy

1. shallow copy: -
