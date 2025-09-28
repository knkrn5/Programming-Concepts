
// **🎯 Types of array** (refer datatypes in programming-langs)


// 🎯 =====Types of array=============================
// 1. Homogeneous array
const arr1 = [1, 2, 3, 4, 5]; // All elements are of the same type (numbers)
const arr2 = ["apple", "banana", "cherry"]; // All elements are of the same type (strings)
const arr3 = [{}, {}, {}, {}]; // All elements are of the same type (objects)

// 2. Heterogeneous array
const arr4 = [
    1, // Number
    "hello", // String
    true, // Boolean
    { name: "John" }, // Object
    [
        {}, // First array
        {
            nested: [
                // Nested array inside an object
                {},
                {},
            ],
        },
    ],
    [
        // Second array
        {},
    ],
    [
        // Third array
        {},
    ],
];

// 3. Multidimensional array
const arr5 = [
    [
        [1, 2, 3], // First sub-array
        [4, 5, 6], // Second sub-array
    ],
    [
        [7, 8, 9], // Third sub-array
        [10, 11, 12], // Fourth sub-array
    ],
];


// 🎯=======ARRAY DATA MANIPULATION IN JS========================
const arr = [10, 20, 30];
delete arr[1]; // Deletes the element at index 1, but leaves an "undefined" hole in the array

console.log(arr);
// Output: [10, undefined, 30]

// If we want to completely remove elements from an array, you should use splice instead:
arr.splice(1, 1); // Removes the element at index 1

console.log(arr);
// Output: [10, 30]

arr.push(40); // Adds the element 40 to the end of the array
arr.unshift(5); // Adds the element 5 to the beginning of the array
arr.pop(); // Removes the last element of the array
arr.shift(); // Removes the first element of the array
arr.sort((a, b) => a - b); // Sorts the array in place (default is ascending order for numbers)
arr.reverse(); // Reverses the order of elements in the array


// 🎯 Inbuilt Array methods in js(.map, .filter, .reduce, .some, .every, .split)