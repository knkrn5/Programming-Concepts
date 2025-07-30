
// adding property in object in js
const obj = { name: "Karan" };

// Dot notation
obj.age = 25;

// Bracket notation
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