// 👉 In js negative indexing is not supported natively like python but we can achieve it using at() method.
// 👉 In js Array indices must be integers ≥ 0. Any floating/Decimal number, negative number, string, boolean, null, undefined are not a valid array index, so JavaScript treats/create it like a normal object property, becuase under the hood array is also a object in js.


// **🎯 Types of array** (refer datatypes in programming-langs)

// 🎯 Inbuilt Array methods in js(.map, .filter, .reduce, .some, .every, .split, .flat(Infinity) etc)
const arr = [10, 20, 30];
// All predefined array methods in js⬇️
arr.push(40); // Adds the element 40 to the end of the array
arr.unshift(5); // Adds the element 5 to the beginning of the array
arr.pop(); // Removes the last element of the array
arr.shift(); // Removes the first element of the array
arr.splice(3); // Removes elements from index 3 to the end of the array
arr.sort((a, b) => a - b); // Sorts the array in place (default is ascending order for numbers)
arr.reverse(); // Reverses the order of elements in the array

arr.indexOf(30); // Returns the index of the first occurrence of 30, or -1 if not found
arr.includes(20); // Returns true if 20 is in the array, false otherwise

//🎯======READING ARRAY DATA IN JS========================
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(arr1[0]); // Output: 1

// 🎯=======ARRAY DATA MANIPULATION IN JS========================
const arr3 = [10, 20, 30];

delete arr3[1]; // Deletes the element at index 1, but leaves an "undefined" hole in the array ❌Not recommended
console.log(arr3);
// Output: [10, undefined, 30]

// If we want to completely remove elements from an array, you should use splice instead:
arr3.splice(1, 1); // Removes the element at index 1 // Output: [10, 30]



//======Using length property in js array========================
const arr2 = [1, 2, 3, 4, 5];
arr2.length = 3; // Truncates the array to the first 3 elements
console.log(arr2); // Output: [1, 2, 3]
// --------------------------------------
arr2.length = 5; // Extends the array length to 5, new elements are undefined
console.log(arr2); // Output: [1, 2, 3, <empty>, <empty>]
// These empty slots are not the same as undefined. They're literally holes — they don’t even exist as keys in the array.
// These empty slots will not show up in loops like .forEach() or .map() unless you manually assign values.
//---------------Changing value of array index that is out of range----------------
let a = [1, 2, 3];
a[5] = undefined;
console.log(a); // [1, 2, 3, <2 empty items>, undefined]
a.forEach((val, i) => console.log(i, val)); // 0 1,  1 2,  2 3,  5 undefined // Note: index 3 and 4 are skipped
//----------------------------------------------
arr2.length = 0; // Clears the array
console.log(arr2); // Output: []
//---------------------------------------------
const arr4 = [1, 2, 3];
arr4[5] = 10; // Sets index 5 to 10, and creates holes (empty items) at index 3 and 4
console.log(arr4); // Output: [1, 2, 3, <empty>, <empty>, 10]

//==== Negative indexing in js array================================
// 👉 In js Array indices must be integers ≥ 0. No negative or floating point numbers, string, boolean, null, undefined, are allowed.
const arr5 = [10, 20, 30];
console.log(arr5[-2]); // Output: undefined (negative indexing does not work directly in js)
arr5[-5] = 50; // This does NOT add an element at the "fifth from last" position. Instead, it creates a property with the key "-5" and sets its value to 50.
console.log(arr5); // Output: [10, 20, 30] // the property "-5" is not part of the array index, so it won't show up in the array elements when logged.
console.log(arr5.length); // Output: 3 (Since -5 isn't a valid array index (non-negative integer), the array's length remains 3.)
console.log(Object.keys(arr5)); // Output: ['0', '1', '2', '-5'] (shows all keys, including the "-5" property)
console.log(arr5[-5]); // Output: 50 (accessing the property "-5" directly)
console.log(arr5.at(-1)); // Output: 30 (using at() to access the last element)

//=====As we know array in js is object under the hood, any Non-integers ≥ 0 value/index will create  property in array, which will be shown when console.logged, but will be ignore by more of the array methods.
arr5["5"] = 300; // This adds a new element at index 5, Normal numeric index (string "5" coerced to number 5)
arr5[1.5] = 100; // This also behaves same like arr5[-5]
arr5["hello"] = 200; // This also behaves same like arr5[-5]

//---------------------------------------------------
const arr6 = [10, 20, 30, 40, 50];
console.log(arr6.at(-10)); // Output: undefined (index -10 is out of bounds)
arr6.at(-10) = 100; // This does NOT add an element at the "tenth from last" position. Instead, it tries to set a value at an out-of-bounds index, which is undefined, so this will become something like undefined = 100, which is meaningless, so No element is added, and the array stays the same. ❌ Fails silently, cannot assign via .at()
console.log(arr6); // Output: [10, 20, 30, 40, 50] (the array remains unchanged)
