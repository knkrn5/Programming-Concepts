# **JavaScript Concept**

> ## javascript flow chart⬇️

![JS Diagram](./imgs/js-flow-chart.png)

## **[🔗 OOPS in js](./jslang/oopsinjs.md)**

## **Variable Declaration**

- Undefined 🆚 Not-Defined

## **Primitive and Non-Primitive Datatypes**

1. **Primitive**
2. **Non-Primitive**

   1. Objects

      ```js
      // adding property in object in js
      const obj = { name: "Karan" };

      // Dot notation
      obj.age = 25;

      // Bracket notation
      obj["city"] = "Delhi";

      console.log(obj);
      // 👉 { name: 'Karan', age: 25, city: 'Delhi' }
      ```

      ```js
      // delteing property from an object in js
      const person = {
        name: "John",
        age: 30,
        city: "New York",
      };

      console.log(person);
      // Output: { name: "John", age: 30, city: "New York" }

      delete person.age;

      console.log(person);
      // Output: { name: "John", city: "New York" }
      ```

   2. Array

      ```js
      const arr = [10, 20, 30];
      delete arr[1];

      console.log(arr);
      // Output: [10, undefined, 30]

      // If you want to completely remove elements from an array, you should use splice instead:
      arr.splice(1, 1); // Removes the element at index 1

      console.log(arr);
      // Output: [10, 30]
      ```

   3. Functions

## **Operators**

1. **Arthematic Operations**

2. **Logical Operations**

3. **Comparision Operations**

   - Value Comparision
   - Type Comparision
   - Memory address(Reference) Comparision

### deep vs shallow copy
