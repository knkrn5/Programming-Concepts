# **Event Handling in JS**

> Events are actions or occurrences that happen in the system you are programming, which the system tells you about so your code can respond to them. Examples of events include user interactions like clicks, key presses, mouse movements, and system-generated events like page load or network responses.

## **Synchronous / Microtask vs Macrotask**

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

## **Event Loop: -** _The event loop manages the illusion of multitasking_

- ### **So if js is single-threaded, how does it handle multiple events?**

  ![Event Loop](../js-media/eventloopinjs.svg)

> Note: - JS is Always single-threaded and executes one by one from the call stack. The `event loop just makes it non-blocking`.
