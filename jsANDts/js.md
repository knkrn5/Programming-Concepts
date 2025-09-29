# **JavaScript Concept**

> ## javascript flow chart⬇️

![JS Diagram](./imgs/js-flow-chart.png)

## **[🔗 OOPS in js](./jslang/oopsinjs.md)**

## **Variable Declaration**

- **var: -** var is not block scoped, it leaks out of the block(like control or condtional statement blocks etc), but stays inside functions block.
- **let**
- **const**

- Undefined 🆚 Not-Defined

## **Datatypes in js**

1. **Primitive**
   1. String
   2. Number
   3. Boolean
   4. NaN
   5. Null
   6. Undefined
2. **Non-Primitive**

   1. [🔗 Objects in js](./jslang/dataManupulationinjs/objectinjs.js)

   2. [🔗 Array in js](./jslang/dataManupulationinjs/arrayinjs.js)

   3. [🔗 Functions in js](./jslang/dataManupulationinjs/functioninjs.js)

> ℹ️Imp: - **Object, Arrays, Date, RegExp, Map, Set, WeakMap, WeakSet**, etc.✅ _All of these return "object" from typeof, **except functions, which return "function"** (but still technically objects under the hood). Note that **typeof null === 'object'** due to a historical bug, even though null is a primitive value, so always handle null explicitly in type checks. **NaN is considered a number type**_

## **Operators**

1. **Arthematic Operations**

2. **Logical Operations**

3. **Comparision Operations: -** In js we have two type of comparision `Strict Comparision(===)` and `Loose Comparision(==)`

   - Value Comparision
   - Type Comparision
   - Memory address(Reference) Comparision

   ```js
   // == Examples (Loose) (== performs automatic type coercion)
   //ℹ️⭐ Convertion priority give to number(every type si first converted to number)
   5 == '5'       // true (string '5' is converted to number 5)
   0 == false     // true (false is converted to 0)
   true == "1"   // true (true converted to 1, then "1" converted to 1)
   null == undefined  // true, Unlike many other == comparisons, null and undefined are only loosely equal to each other, and not to any number, even 0.
   [] == 0 // true → [] becomes "" → then "" becomes 0
   [] == false    // true (both are converted to 0)
   " \t\n" == 0;    // true → whitespace string → becomes 0
   (5 != '5'); // false (because '5' is converted to 5)
   (0 != false); // false (false is converted to 0)

   // === Examples (Strict) compartion
   5 === 5        // true (same value and type)
   5 === '5'      // false (different types)
   null === undefined  // false
   [] === []      // false (different objects)
   (5 !== '5'); // true (number vs string, no coercion)
   (null !== undefined); // true (different types)
   (0 !== false); // true (number vs boolean)

   ```

4. **Other Operators**

- **Spread operator** to create a shallow copy of an array or object

  ```js
  const originalArray = [1, 2, 3];
  const copiedArray = [...originalArray, 4, 5]; // copiedArray is now [1, 2, 3, 4, 5]

  const obj = { name: "karan", age: 24 };
  const copyObj = { ...obj, sex: "male" };
  ```

## **Execution Context in js: -** Understanding execution context in JavaScript is key to mastering weird behaviors like: -⬇️

- Why variables are undefined when accessed before declaration
- Why functions can be called before they are defined

> **There are Two Phases of Execution:**

1.  Memory Allocation Phase (Creation Phase): -

    - JS scans the code before it starts executing
    - It allocates memory for:
      - Variables → initialized with undefined
      - Function declarations → fully hoisted (the whole function is placed in memory)

2.  Code Execution Phase: -

    - JS runs the code line-by-line
    - Variables get assigned their actual values
    - Functions get called as needed

### deep vs shallow copy

1. shallow copy: -
