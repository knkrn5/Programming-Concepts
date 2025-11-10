/* const num = [2, 4, 6, 5];


function reverseArray(arr) {
let number = 0;
for (let i = 0; i < arr.length; i++) {
    number += arr[i] * (10 ** i);
}
return number;
}

console.log(reverseArray(num)); */

let binary = "10101010";
let octal = parseInt(binary, 2).toString(8);
console.log(octal);  // Output: 52