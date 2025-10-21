//👉 In JavaScript, object keys are always strings or symbols(Created with Symbol("word-name")).
/* 👉 In JavaScript, whenever we want to add any already declared variable, as the property in an object, we have to always wrap that word in square brackets [] in object, 
 and ℹ️the value of that variable will become the key name in the object */

// 👉 in JavaScript, if an object property/key name contains spaces or other special characters that aren not valid identifiers, then we must wrap it in quotes (single ' or double ") and ℹ️These properties can only be accessed using bracket notation, cannot be accessed using dot notation.
// 👉In JavaScript an object property value can hold anything Datatype — a number, string, object, array, function, or even another function returning another object.
// 👉In JavaScript’s Map Constructor, you can use any value as a key — not just strings.


//🎯======READING OBJECT DATA IN JS========================
// Object.entries(object): - This method returns an array of a given object's, containing nested enumerable arrays (one per key-value pair)..
const user = {
    name: "Karan",
    age: 22,
    country: "India"
};

console.log(Object.entries(user)); // returns array of key-value pairs as nested arrays.

/* Output:
[
  ["name", "Karan"],
  ["age", 22],
  ["country", "India"]
] */

user.name; // → "Karan"
user["age"]; // → 22
const key = "country";
user[key]; // → "India"

for (const [key, value] of Object.entries(user)) {
    console.log(`${key} → ${value}`);
}
Object.entries(user).forEach(([key, value]) => console.log(`${key} → ${value}`)); //Here with forEach loop we are using destructuring to get key and value from each entry array.

//=====object.keys and object.values in js========================
console.log(Object.keys(user)); // returns array of keys. Output: ['name', 'age', 'country']
console.log(Object.values(user)); // returns array of values. Output: ['Karan', 22, 'India']

for (const key in user) { // for..in is Designed to iterate over the key
  console.log("Key:", key);      
  console.log("Value:", user[key]);
}

//🎯======OBJECT DATA MANIPULATION IN JS==================
//👉 In js we can manipulate the object data using both dot and bracket notation.
// ===== adding property in object in js=========================
const obj = {
    name: "Karan",
    "home address": "123 Main St" // NOTICE: key with space — must be in quotes (Can any single or double quotes)
};

// Dot notation
obj.age = 25;

// Bracket notation : - this is more useful when the property name contain spaces like: - "home address"
obj["city"] = "Delhi";

console.log(obj);
// 👉 { name: 'Karan', age: 25, city: 'Delhi' }

//===== deleteing property from an object in js=================
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

//=====Destructuring object in js========================
const { name, age } = person;
console.log(name); // Output: John
console.log(age);  // Output: 30

//=======================================================


