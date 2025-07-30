const arr = [10, 20, 30];
delete arr[1]; // Deletes the element at index 1, but leaves an "undefined" hole in the array

console.log(arr);
// Output: [10, undefined, 30]

// If you want to completely remove elements from an array, you should use splice instead:
arr.splice(1, 1); // Removes the element at index 1

console.log(arr);
// Output: [10, 30]