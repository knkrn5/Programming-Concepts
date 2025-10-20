# **Promise and This Keyword in JavaScript**

## **Promise: -** _A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value._

- Async Functions is always needed to called with await or .then() to get the resolved value from that async function. Or void if we just want to call that async function without caring about its resolved value.

### **Chaining Promises**

1. **Basic Chaining**: You can chain multiple `.then()` calls to handle a sequence of asynchronous operations.

   ```js
   fetchData().then(processData).then(displayData).catch(handleError);
   ```

2. **Returning Promises**: Each `.then()` can return a new promise to the caller, allowing for more complex workflows.

   1. `awaiting promise`: - _pause the execution of the current async function until the promise resolves or rejects._

      - Returns the unwrapped value (not a promise).
      - Lets us work with the result immediately in that function

        ```js
        // WITH await - breaks the chain, then rebuilds it if we return a promise
        async function getUser() {
          const response = await fetch("/api/user"); // Wait here
          const data = await response.json(); // Wait here
          return data; // Return the value (wrapped in a new promise)
        }
        ```

   2. `returning Promise` : - _Doesn't pause - returns immediately with a promise_

      - The caller must handle the promise (with await or .then()) or Caller can continue the chain.
      - More efficient if we don't need to do anything with the result in this function

        ```js
        // WITHOUT await - maintains the chain
        function getUser() {
          return fetch("/api/user").then((response) => response.json()); // Direct chain
        }
        ```

## **The `this` Keyword**
