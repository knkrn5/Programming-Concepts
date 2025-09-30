# **Operators**

1. **Arthematic Operations**

2. **Logical Operations**

3. **Comparision Operations: -** In js we have two type of comparision `Strict Comparision(===)` and `Loose Comparision(==)`

   - Value Comparision
   - Type Comparision
   - Memory address(Reference) Comparision

   | Comparison             | Behavior                                    |
   | ---------------------- | ------------------------------------------- |
   | Primitive == Primitive | Value (coerced if types differ)             |
   | Object == Object       | Reference only (no coercion)                |
   | Object == Primitive    | Object converted to primitive, then compare |

   ```js
   // == Examples (Loose) (only compares value after automatic type coercion)
   //ℹ️⭐ Convertion priority give to number(every type si first converted to number)
   5 == '5'       // true (string '5' is converted to number 5)
   0 == false     // true (false is converted to 0)
   true == "1"   // true (true converted to 1, then "1" converted to 1)
   null == undefined  // true, Unlike many other == comparisons, null and undefined are only loosely equal to each other, and not to any number, even 0.
   [] == 0 // true → [] becomes "" → then "" becomes 0
   [] == false    // true (both are converted to 0)
   [] == []  // false (Each array/object literal creates a new reference in memory)
   {} == {}  // false (Each array/object literal creates a new reference in memory)
   [] == ""       // true, [] → "" via toString
    [1] == "1"     // true, [1] → "1"
    [1,2] == "1,2" // true, [1,2] → "1,2"
    {} == "[object Object]" // true ({} coerced to [object, object])

   " \t\n" == 0;    // true → whitespace string → becomes 0
   (5 != '5'); // false (because '5' is converted to 5)
   (0 != false); // false (false is converted to 0)

   ```

   `⭐This is how js converts the Non-Primitive DataType to Primitive dataType` before comparing it will any Primitive DataType using **.valueOf()** and **.toString()** methods⬇️

   | Object Type  | `.valueOf()`  | `.toString()`          | Coerced primitive   |
   | ------------ | ------------- | ---------------------- | ------------------- |
   | `[]`         | array itself  | `""` (empty string)    | `""`                |
   | `[1,2]`      | array itself  | `"1,2"`                | `"1,2"`             |
   | `{}`         | object itself | `"[object Object]"`    | `"[object Object]"` |
   | `new Date()` | Date object   | `"Tue Sep 30 2025..."` | date string         |

   ***

   ```js
   // === Examples (Strict) compartion. Js compares both value and type for primitive Datatype
   5 === 5        // true (same value and type)
   5 === '5'      // false (different types)
   null === undefined  // false
   [] === []      // false (Each array/object literal creates a new reference in memory)
   {} === {}   // false (Each array/object literal creates a new reference in memory)
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
