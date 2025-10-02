# **Memory Reference VS Copy**

> To understand this first we need to understand how the js, Primitive and Non-Primitive dataTypes

## ⭐In js the value of the primitive datatypse are copied but incase of the Non-primitive datatypes memory address reference is copied/passed

```js
// Incase of Primitive datatype
const a = 5;
let b = a; // so the value of the a is copied to b
b = 6; //this only changes the value of b not the a
console.log(a, b); // 5, 6

//Incase of Non-Primitive Datatype
const obj1 = { a: 1, b: 2 };
const obj2 = obj1; // Now this does not copy the value of the obj1 , instead the memory address is copied so if we make any change in obj2, it will also change the value of obj1
obj2.a = 3; //this has changed the object at this memory reference, so any variable pointing at this memory-reference will have the same modified value
console.log(obj1); // {a: 3, b: 2}
console.log(obj2); // {a: 3, b: 2}
```

> **So then How do we copy the Non-Primitive DataType, Here comes the concept of `shallow copy VS Deep copy`⬇️**

## **Shallow Copy VS Deep Copy**

1. **Shallow Copy: -** _Shallow Copy mean that whenever we copy any object or array using `speard operator` or `oject.assign` in js, only the Primitive property/values will be copied, while for any Non-primitive Property/values(nested object) the reference will be copied/passed_

   - This means if we change any Primitive DataType value in the copied variable it will not the affect the orginal variable, but if we change any Non-primitive DataType(nested object,array) in the copied variable, then this change will also affect the orignal variable

   ```js
   const original_obj = {
     name: "karan",
     age: 22,
     address: { city: "mkt", country: "india" },
     marks: [23, 54, 56],
   };
   const copy_obj = { ...original_obj }; // this will only copy the value of primitive property, and for the non-primitive property like address and marks the memory-reference is passed
   copy_obj.name = "marx"; //this only changes the value of the name property in the copied variable only, the value of the name is not changed in the original obj
   copy_obj.age = 24; //this only changes the value of the age property in the copied variable only, the value of the age is not changed in the original obj
   console.log(original_obj); // {name: "karan", age: 22, address: { city: "mkt", country: "india" }, marks: [23, 54, 56]}
   console.log(copy_obj); // {name: "marx", age: 24, address: { city: "mkt", country: "india" }, marks: [23, 54, 56]}

   //Now lets change Non-primitive property
   copy_obj.address.city = "tis hazari"; //Now this will change the value of address property in both the original and copy variable, as we have discussed erlier, that for the non-primitive property there memory-reference are copied/passed
   copy_obj.marks.push(55); // This will change the value of marks property in both the original and copy variable, as we have discussed erlier, that for the non-primitive property there memory-reference are copied/passed
   console.log(original_obj); // {name: "karan", age: 22, address: { city: "tis hazari", country: "india" }, marks: [23, 54, 56, 55 ]}
   console.log(copy_obj); // {name: "marx", age: 24, address: { city: "tis hazari", country: "india" }, marks: [23, 54, 56, 55 ]}
   // as we can see both the obj got affected when change the non-primitive property, cause these are shared in shallow copy
   ```

2. **Deep Copy: -** _Deep copy means everything even the (Nested Non-Primitive Datatype) nested objects is copy, no reference is passed, So nothing is Shared_

   - so this means that making changes even in the nested non-primitive property/value in the copied variable will not change/affect anything in the original variable.

   ```js
   // To copy the value of the nested object we would first need to convert the whole object to Primitive DataType(string) using JSON.Stringigy (we can also use thrid party packages which behind the scene does the same)

   const original_obj = {
     name: "karan",
     age: 22,
     address: { city: "mkt", country: "india" },
     marks: [23, 54, 56],
   };

   const copy_obj = JSON.parse(JSON.stringify(original_obj)); // So now this copy everything, even nested Non-Primitive Types, Nothing is Shared
   copy_obj.address.city = "tis hazari"; // Now this will only change the address property in the copy variable only, as we have discussed erlier in deep copy no memory-reference is passed, everything is copied.
   copy_obj.marks.push(55); // this will also only change the marks property in the copy variable only, as we have discussed erlier in deep copy no memory-reference is passed, everything is copied.
   console.log(original_obj); // {name: "karan", age: 22, address: { city: "mkt", country: "india" }, marks: [23, 54, 56 ]}
   console.log(copy_obj); // {name: "karan", age: 22, address: { city: "tis hazari", country: "india" }, marks: [23, 54, 56, 55 ]}
   ```

   ℹ️Note: Third-party libraries like Lodash's \_.cloneDeep() or structuredClone() (native) are often better than JSON methods because JSON.stringify() has limitations (loses functions, undefined, Date objects, etc.), but for simple objects like shown above, it works perfectly!

| Feature             | JSON Method   | structuredClone() | Lodash \_.cloneDeep() |
| ------------------- | ------------- | ----------------- | --------------------- |
| **Simple objects**  | ✅            | ✅                | ✅                    |
| **Nested objects**  | ✅            | ✅                | ✅                    |
| **Arrays**          | ✅            | ✅                | ✅                    |
| **Date objects**    | ❌ (→ string) | ✅                | ✅                    |
| **RegExp**          | ❌ (→ {})     | ✅                | ✅                    |
| **Functions**       | ❌ (lost)     | ❌                | ✅                    |
| **undefined**       | ❌ (lost)     | ✅                | ✅                    |
| **Symbols**         | ❌ (lost)     | ❌                | ✅                    |
| **Infinity**        | ❌ (→ null)   | ✅                | ✅                    |
| **NaN**             | ❌ (→ null)   | ✅                | ✅                    |
| **Circular refs**   | ❌ (error)    | ✅                | ✅                    |
| **Map/Set**         | ❌            | ✅                | ✅                    |
| **No dependencies** | ✅            | ✅                | ❌ (needs lodash)     |
