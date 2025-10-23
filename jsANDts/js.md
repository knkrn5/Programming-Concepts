# **JavaScript Concept**

## **[🔗 Core Browser working](../browser/browser.md)**

## **How js runs async task being a single thread**

> JavaScript can only execute one piece of code at a time (single-threaded), but the `event loop allows it to handle asynchronous operations` like timers, network requests, and user interactions without blocking.

- Browser can spin up Web Workers
- Node.js can use Worker Threads

## **[🔗 Event Loop in js](./jslang/core-js-concept/eventloopinjs.md)**

## **[🔗 OOPS in js](./jslang/oopsinjs.md)**

## **Variable Declaration**

- **var: -** var is not block scoped, it leaks out of the block(like control or condtional statement blocks etc), but stays inside functions block.
- **let**
- **const**

- Undefined 🆚 Not-Defined

## **[🔗 Hoisting in js](./jslang/other-concepts/hoisting.md)**

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

      - As we know arrays are objects under the hood, so their indices are keys, thatswhy we get index on all the array inbuilt methods in js.
      - As we know arrays are objects under the hood, so we can even add custom properties to array like we do in objects.

   3. [🔗 Functions in js](./jslang/dataManupulationinjs/functioninjs.js)

> ℹ️Imp: - **Object, Arrays, Date, RegExp, Map, Set, WeakMap, WeakSet**, etc.✅ _All of these return "object" from typeof, **except functions, which return "function"** (but still technically objects under the hood). Note that **typeof null === 'object'** due to a historical bug, even though null is a primitive value, so always handle null explicitly in type checks._

## **[🔗Operators in js](./jslang/operatorsinjs.md#operators)**

## **[🔗 Execution Context in js](./jslang/other-concepts/execution-context.md)**

### deep vs shallow copy

1. shallow copy: -
