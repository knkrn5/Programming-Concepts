# **Operators**

`⭐This is how js converts the Non-Primitive DataType to Primitive dataType` before comparing it will any Primitive DataType using **.valueOf()** and **.toString()** methods⬇️

| Object Type  | `.valueOf()`  | `.toString()`          | Coerced primitive   |
| ------------ | ------------- | ---------------------- | ------------------- |
| `[]`         | array itself  | `""` (empty string)    | `""`                |
| `[1,2]`      | array itself  | `"1,2"`                | `"1,2"`             |
| `{}`         | object itself | `"[object Object]"`    | `"[object Object]"` |
| `new Date()` | Date object   | `"Tue Sep 30 2025..."` | date string         |

---

## 1. **Arthematic Operations**

- `+` → **string concatenation if either side is string** after coercion to string(arrays/objects converted to string)

- `-, *, /, %` → **always numeric conversion, arrays/objects converted to numbers via ToPrimitive** → **.valueOf**() → **.toString()** → numeric cast

  ```js
  [] + 1      // "1"  ->  [] coerced to "" then "" + 1 = "1"
  [1,2] + 3     // "1,23"  -> [1,2].toString() -> "1,2", then + "3"
  [] + {}       // "[object Object]" -> "" + "[object Object]"
  {} + []       // 0 ??? depends on context / block parsing ⚠️ Note: {} at the start of a line is parsed as a block, so {} + [] can give 0 in some cases. Always wrap in parentheses if testing: ({} + []).
  {} + 1  // 1  -> {} at line start → parsed as block → 0 + 1
  {a:1} + {b:2} // "[object Object][object Object]"
  [1] + {a:1}  // "1[object Object]"  -> [1] → "1", {a:1} → "[object Object]" then "1" + "[object Object]"
  ```

  **These results will be same with all these `-, *, /, % etc` arthemethic operator⬇️**

  | Expression    | Step-by-step Conversion         | Result |
  | ------------- | ------------------------------- | ------ |
  | `[] - 1`      | `"" → 0`                        | -1     |
  | `[1] - 1`     | `"1" → 1`                       | 0      |
  | `[1,2] - 1`   | `"1,2"` → NaN                   | NaN    |
  | `{}` - 1      | `"[object Object]"` → NaN       | NaN    |
  | `[1] - {a:1}` | `"1" - "[object Object]" → NaN` | NaN    |

  ***

## 2. **Logical Operations**

## 3. **Comparision Operations: -** In js we have two type of comparision `Strict Comparision(===)` and `Loose Comparision(==)`

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

---

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

➡️So we have seen that the js compares the primitive datatype will the value and the Non-Primitive DataType with the Memory Reference

1.  There is `no way in js, that we can compare the primitive DataType will their memory address/reference`
2.  But `we can compare the Non-Primitive dataType by value`, **after stringifying the Non-Primitive DataType**

    ```js
    const obj1 = { name: "karan" };
    const obj2 = { name: "karan" };
    console.log(obj1 === obj2); // ❌ false (different memory references)
    // With JSON.stringify - comparing values⬇️
    JSON.stringify(obj1) === JSON.stringify(obj2); // ✅ true
    // JSON.stringify(obj1) → "{"name":"karan"}" (primitive string)
    // JSON.stringify(obj2) → "{"name":"karan"}" (primitive string)
    // Same string value, so true

    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3];
    console.log(arr1 === arr2); // ❌ false (different memory references)
    // With JSON.stringify - comparing values⬇️
    console.log(JSON.stringify(arr1) === JSON.stringify(arr2)); // ✅ true
    // JSON.stringify(arr1) → "[1,2,3]" (primitive string)
    // JSON.stringify(arr2) → "[1,2,3]" (primitive string)
    // Same string value, so true
    ```

## 4. **Other Operators**

- **Spread operator** to create a shallow copy of an array or object

  ```js
  const originalArray = [1, 2, 3];
  const copiedArray = [...originalArray, 4, 5]; // copiedArray is now [1, 2, 3, 4, 5]

  const obj = { name: "karan", age: 24 };
  const copyObj = { ...obj, sex: "male" };
  ```
