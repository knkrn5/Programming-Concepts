# **Event Handling in JS**

> Events are actions or occurrences that happen in the system you are programming, which the system tells you about so your code can respond to them. Examples of events include user interactions like clicks, key presses, mouse movements, and system-generated events like page load or network responses.

## **Event Loop / Microtask vs Macrotask**

```js
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Correct order: Start, End, Promise, Timeout ✅
```

- `Synchronous code` runs first → 'Start', 'End'
- `Microtasks` (Promises) run after sync code but before setTimeout → 'Promise'
- `Macrotasks` (setTimeout) run last → 'Timeout'

### **Event-driven programming works in JS**

- In JS, like in Promise, event listeners like addEventListener, and setTimeout, **we only pass the function reference**, and **these methods automatically call the functions after the event is triggered** because we `want these functions to all get called after the event is triggered and not when the event is registered/created` in a memory. These are called `"callback functions/patterns"`.
