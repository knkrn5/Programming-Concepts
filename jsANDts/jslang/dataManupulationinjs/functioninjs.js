//👉 Three Main steps of function 1. function defination 2. function initialization 3. Function call
// 👉 In js implicit return is only avaliable in arrow functions
// 👉 Order of the function parameter matters, if parameter are not written in object.
// 👉async always returns a response wrapped in a Promise like promise<string>, promise<number> etc
// 👉In JavaScript an function parameter can be of any Datatype — a number, string, object, array, function etc and in calling function argument we can pass any DataType: - a number, string, object, array and even call any function in function argument its returned value will be passed as argument.
// 👉  this keyword in normal function point to window object and   in constructor function , when we call function with new keyword, it alway creates new object and then retruns the new object, now this keyword in constructor function refer this return object

//**🎯 arguments in function**
// passing unlimited arguments to a function
function add(...args) {
  return args.reduce((acc, val) => acc + val, 0);
} // 'args' is an array with name "arg" which has the value of all arguments passed to the function
add(2)(3)(10)(55)(16);

//**🎯 hoisting in functions**
// Function declarations are hoisted completely and can be called before they appear in the code.
function myFunction2() {
  console.log(
    "This is type of function defination is called function declaration",
  );
}
// Function expressions (assigned to variables with let or const) are **not callable before assignment**.
const myFunction1 = function () {
  console.log(
    "This is type of function defination is called function expression",
  );
};

//**🎯 higher order functions**
// A higher-order function is a function that either takes one or more functions as arguments or returns a function as its result.
function a(callback) {
  console.log("hello");
  callback(); // Call the callback function
}

//**🎯 callback functions**
// A callback function is a function that is passes function as an argument calling the another function.
a(() => {
  console.log("Hello from the callback!");
});

// **🎯 curry functions**
// Currying is a functional programming technique where a function is transformed into a sequence of functions, each taking a single argument.
function sum(a) {
  return function (b) {
    return a + b;
  };
}

sum(5)(10); // Returns 15

// infinite arguments and infinte curry functions
function add(a) {
  return function (b) {
    if (b !== undefined) {
      return add(a + b);
    } else {
      return a;
    }
  };
}
console.log(add(1)(2)(3)()); // Returns 6

//🎯 closure and lexical scoping**
function createCounter() {
  let count = 0;
  return function () {
    count++;
    console.log("Current count:", count);
    return count;
  };
}
const counter = createCounter();
counter(); //this will call the inner function and not the outer function

//🎯 anonymous functions
// An anonymous function is a function that does not have a name. It is often used as an argument to other functions or as a callback.
const myFunction = function () {
  console.log("This is an anonymous function");
};

//🎯 IIFE (Immediately Invoked Function Expression)
(function sayHi() {
  console.log("This is an IIFE function");
})();
//OR
(() => {
  console.log("This is an IIFE arrow function");
})();

// **🎯 factory functions**
// A factory function is a function that returns a new object. It is a way to create multiple instances of an object without using classes.
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    greet: function () {
      console.log(
        `Hello, my name is ${this.name} and I am ${this.age} years old.`,
      );
    },
  };
}
const person1 = createPerson("Alice", 30);
const person2 = createPerson("Bob", 25);
person1.greet(); // Hello, my name is Alice and I am 30 years old.
person2.greet(); // Hello, my name is Bob and I am 25 years old.

// **🎯 Constructor functions**
// when a funciton is called using new keyword
function createUser(firstName, lastName, age) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;

  console.log(this);
}

const cu = new createUser("k", "n", 12);
console.log(cu.firstName);

//🎯 async Functions=============
// async always returns a response wrapped in a Promise
async function fetchData() {
  return "karan"; // Implicitly returns a resolved Promise with the value "karan"
}

//🎯 generator functions
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

// async iterator protocol
```js

gen.next()

Each call returns:

{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }

---------------------------
When you break out of a for await loop:

👉 JavaScript automatically calls:

iterator.return(): -  JS automatically calls .return() on the iterator, which propagates down the entire chain of nested async iterators like dominoes.

This is part of the async iterator protocol.

-----------------------------
🔥 6. The important hidden methods

Async iterators also support:

iterator.return()
iterator.throw()

----------------------------
convert: -

async iterator → stream
stream → async iterator
```;
