
// **🎯 Types of array** (refer datatypes in programming-langs)


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


// 🎯 Inbuilt Array methods in js(.map, .filter, .reduce, .some, .every, .split)