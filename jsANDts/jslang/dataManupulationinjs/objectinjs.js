//👉 In JavaScript, object keys are always strings or symbols(Created with Symbol("word-name")).
/* 👉 In JavaScript, whenever we want to add any already declared variable, as the property in an object, we have to always wrap that word in square brackets [] in object, 
 and ℹ️the value of that variable will become the key name in the object */
// 👉 in JavaScript, if an object property name contains spaces or other special characters that aren’t valid in identifiers, you must wrap it in quotes (single ' or double ").

//=============================================================
const obj1 = {
    name: "Karan",
    age: 24,
    hobbies: ["coding", "music"],
    address: { city: "Delhi", country: "India" },
    greet: function () {
        console.log("Hello!");
    },
    greet2() {
        console.log("Hi there!");
    } // ES6 object method shorthand syntax
};

//==============================================================
// adding property in object in js
const obj = {
    name: "Karan",
    "home address": "123 Main St"
};

// Dot notation
obj.age = 25;

// Bracket notation : - this is more useful when the property name contain spaces like: - "home address"
obj["city"] = "Delhi";

console.log(obj);
// 👉 { name: 'Karan', age: 25, city: 'Delhi' }

//======================================================

// deleteing property from an object in js
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

//======================================================
//using an object as a key in another object

const a = {};              // 'a' is an empty object
const b = { name: 'tilak' }; // 'b' is an object
const c = { name: 'ram' };   // 'c' is also an object

// Using objects 'b' and 'c' as keys in object 'a'
// Note: When using objects as keys, they are converted to strings, which results in '[object Object]' for both 'b' and 'c'. that's why the last one [object Object] will overwrite the first one.
a[b] = { name: 'ankit' };    // using object 'b' as key
a[c] = { name: 'rahul' };    // using object 'c' as key

//output
console.log(a); // Output: { '[object Object]': { name: 'rahul' } }
console.log(a[b]);  // Output: { name: 'ankit' }



//=======================================================
// In JavaScript’s Map Constructor, you can use any value as a key — not just strings.


//===============================
//🎯Object.entries(object): - This method returns an array of a given object's, containing nested enumerable arrays (one per key-value pair)..
const user = {
    name: "Karan",
    age: 22,
    country: "India"
};

console.log(Object.entries(user));

// Output:
// [
//   ["name", "Karan"],
//   ["age", 22],
//   ["country", "India"]
// ]

for (const [key, value] of Object.entries(user)) {
    console.log(`${key} → ${value}`);
}
// OR
Object.entries(user).map(([key, value]) => (
    console.log(`${key} → ${value}`)
));
