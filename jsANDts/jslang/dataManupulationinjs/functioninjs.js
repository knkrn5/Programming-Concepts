//👉 Three Main steps of function 1. function declaration 2. function initialization 3. Function call
// 👉 In js implicit return is only avaliable in arrow functions

//**🎯 arguments in function**
// passing unlimited arguments to a function
function add(...args) { } // 'args' is an array with name "arg" of all arguments passed to the function


//**🎯 hoisting in functions**

//**🎯 higher order functions**
// A higher-order function is a function that either takes one or more functions as arguments or returns a function as its result.
function a(fn) {
    console.log("hello")
    fn()
}

a(() => {  // wrote the function code directly as an argument
    console.log("this is another function")
})

//**🎯 callback functions**
// A callback function is a function that is passed as an argument to another function and is executed after some operation is completed.
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback(); // Call the callback function
}


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


// **🎯 closure and lexical scoping**
function createCounter() {
    let count = 0;
    return function () {
        count++;
        console.log('Current count:', count);
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
