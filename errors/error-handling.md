# **Error Handling**

> the error in catch block in js can be any thing

```js

// Error can be in any datatype

throw new Error("Something broke"); // ✅ good

throw "oops"; // 😬 string
throw 123; // 😬 number
throw { msg: "bad" }; // 😬 plain object
```

Imp: - know details about main error instance

## this is the whole point of cause in Error Instance: -

1. Outer error → AppError: -
   👉 This stack starts where you created the new error
   (i.e., where you wrapped it)
2. Inner error (cause) → NotFoundError from OpenAI
   👉 This stack shows where the original failure happened
   (deep inside OpenAI SDK)

```js

//here we can see the stack difference in of same error but wrap in another error, thatiswhy the casue property was introduced in es6 in js
{
  "timestamp": "27/3/2026, 17:45:47",
  "error": {
    "name": "Error",
    "message": "NimImg3 generation failed: 404 404 page not found\n",
    "statusCode": 500,
    "stack": "Error: NimImg3 generation failed: 404 404 page not found\n\n    at nimimg3 (/home/karan/Desktop/server/src/aiclients/nimimg3.ts:125:11)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async Function.askai (/home/karan/Desktop/server/src/services/ai.service.ts:54:24)\n    at async askai (/home/karan/Desktop/server/src/controllers/ai.controller.ts:50:27)",
    "cause": {
      "status": 404,
      "headers": {},
      "requestID": null,
      "name": "Error",
      "message": "404 404 page not found\n",
      "stack": "Error: 404 404 page not found\n\n    at Function.generate (/home/karan/Desktop/server/node_modules/openai/src/core/error.ts:84:14)\n    at OpenAI.makeStatusError (/home/karan/Desktop/server/node_modules/openai/src/client.ts:478:28)\n    at OpenAI.makeRequest (/home/karan/Desktop/server/node_modules/openai/src/client.ts:728:24)\n    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n    at async nimimg3 (/home/karan/Desktop/server/src/aiclients/nimimg3.ts:44:24)\n    at async Function.askai (/home/karan/Desktop/server/src/services/ai.service.ts:54:24)\n    at async askai (/home/karan/Desktop/server/src/controllers/ai.controller.ts:50:27)"
    }
  }
}


// learn to read the stack trace
```
