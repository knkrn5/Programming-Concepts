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
   // === Examples (Strict)
   5 === 5        // true (same value and type)
   5 === '5'      // false (different types)
   null === undefined  // false
   [] === []      // false (different objects)

   // == Examples (Loose) (== performs automatic type coercion)
   5 == '5'       // true (string '5' is converted to number 5)
   0 == false     // true (false is converted to 0)
   null == undefined  // true
   [] == false    // true (both are converted to 0)

   // Boolean converts to number first
   true == 1     // true (true → 1)
   false == 0    // true (false → 0)
   true == "1"   // true (true → 1, then "1" → 1)

   value == null; /* Checks if value is either null or undefined. */
   // The double equals == works for both null and undefined

   (5 != '5'); // false (because '5' is converted to 5)
   (null != undefined); // false (they are considered equal in loose comparison)
   (0 != false); // false (false is converted to
   (5 !== '5'); // true (number vs string, no coercion)
   (null !== undefined); // true (different types)
   (0 !== false); // true (number vs boolean)
   ```

### deep vs shallow copy
