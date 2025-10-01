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

   - This means if we have any Primitive DataType value in the copied variable it will not the affect the orginal variable, but if we change any Non-primitive DataType(nested object) in the copied variable, then this change will also affect the orignal variable

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
   ```

2. **Deep Copy: -** _Deep copy means everything even the (Nested Non-Primitive Datatype) nested objects is copy, no reference is passed._

   - so this means that making changes in the copied variable will not change anything in the original variable.

   ```js
   // To copy the value of the nested object we would first need to convert the whole object to Primitive DataType(string) using JSON.Stringigy
   ```
