# **JavaScript Concept**

> ## javascript flow chart⬇️

![JS Diagram](./imgs/js-flow-chart.png)

## **[🔗 OOPS in js](./jslang/oopsinjs.md)**

## **Variable Declaration**

- Undefined 🆚 Not-Defined

## **Primitive and Non-Primitive Datatypes**

1. **Primitive**
2. **Non-Primitive**

   1. [🔗 Objects](./jslang/dataManupulationinjs/objectinjs.js)

   2. [🔗 Array](./jslang/dataManupulationinjs/arrayinjs.js)

   3. [🔗 Functions](./jslang/dataManupulationinjs/functioninjs.js)

## **Operators**

1. **Arthematic Operations**

2. **Logical Operations**

3. **Comparision Operations**

   - Value Comparision
   - Type Comparision
   - Memory address(Reference) Comparision

   ```js
   // === Examples (Strict) compartion
   5 === 5        // true (same value and type)
   5 === '5'      // false (different types)
   null === undefined  // false
   [] === []      // false (different objects)
   (5 !== '5'); // true (number vs string, no coercion)
   (null !== undefined); // true (different types)
   (0 !== false); // true (number vs boolean)

   // == Examples (Loose) (== performs automatic type coercion)
   //ℹ️ Convertion priority give to number(every type si first converted to number)
   5 == '5'       // true (string '5' is converted to number 5)
   0 == false     // true (false is converted to 0)
   true == "1"   // true (true converted to 1, then "1" converted to 1)
   null == undefined  // true, Unlike many other == comparisons, null and undefined are only loosely equal to each other, and not to any number, even 0.
   [] == false    // true (both are converted to 0)
   [] == 0 // true → [] becomes "" → then "" becomes 0
   " \t\n" == 0;    // true → whitespace string → becomes 0
   (5 != '5'); // false (because '5' is converted to 5)
   (0 != false); // false (false is converted to

   ```

4. **Other Operators**

- **Spread operator** to create a shallow copy of an array or object

  ```js
  const originalArray = [1, 2, 3];
  const copiedArray = [...originalArray, 4, 5]; // copiedArray is now [1, 2, 3, 4, 5]

  const obj = { name: "karan", age: 24 };
  const copyObj = { ...obj, sex: "male" };
  ```

### deep vs shallow copy
