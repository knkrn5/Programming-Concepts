# **RealTime Events**

## **🎯SSE 🆚 WebSocket**

| Feature                  | SSE (Server-Sent Events)  | WebSockets                              |
| ------------------------ | ------------------------- | --------------------------------------- |
| Direction                | Server ➡️ Client only     | Two-way (Client ↔️ Server)              |
| Built-in Browser Support | Yes (`EventSource` API)   | Yes (`WebSocket` API)                   |
| Protocol                 | HTTP/1.1                  | Separate protocol (`ws://` or `wss://`) |
| Best for                 | Notifications, live feeds | Chat apps, multiplayer games            |

### 1. **Sever Side Event(SSE): -** _By the name only we can understand that event sent by the server. not by the client, so this is one way only(Unidirectional Communication)_, It allows a server to push real-time updates to a browser over a single, long-lived HTTP connection. It’s built on top of HTTP and is designed for scenarios where the server needs to send data to the client incrementally (e.g., live notifications, chat messages, or AI response streaming)

- The server sends/streams response as `raw text(unit8array)` over the HTTP connection, the Data **arrives in `network packets`, not in our logical "chunks"** `Network Layer - Converts to Raw Bytes` The HTTP protocol itself (not the reader) converts the string to raw bytes for transmission example like for this⬇️

  ```py
  # python eg
  yield f"data: {chunk.choices[0].delta.content}\n\n"
  ```

  ```sh
  # Data comes like this in network packets⬇️
  String: "data: Hello\n\n"
  ↓ (HTTP protocol conversion)
  Bytes: [100, 97, 116, 97, 58, 32, 72, 101, 108, 108, 111, 10, 10]
          (d    a   t   a   :  sp  H   e   l   l   o   \n  \n)
  ```

  - The **browser receives these bytes** through the HTTP network connection.
    -ℹ️ Network chunks **don't necessarily align with our logical messages**. You might get:

    ```sh
    # We can also get data like this in raw byte format
    Chunk 1: "data: Hel"
    Chunk 2: "lo\n\ndata: world\n\n"
    ```

- ### **EventScorce VS ReadableSteam**

1. **Eventscorce: -** _EventSource is a browser-native high-level wrapper Constructor API used to receive real-time data from the server via Server-Sent Events (SSE). It automatically Parses `data:` prefix, automatically `handles the byte-to-string conversion (low-level byte manipulation)` and Delivers `event.data as a string` and Handles the streaming and parsing for us .
   However, **the server must send data in a specific format** for EventSource to work correctly.⬇️_

   - `data:` - Required prefix for message content
   - `\n\n` - Required double newline to mark message end
   - And the last word of the full response depends of the dev, whatever we want ot keep like `data: [DONE]\n\n` or `data: [END]\n\n` etc, this is needed **to close the eventsource** after the response is completed.
   - ℹ️EventSource `maintains a live, persistent connection` where **data is automatically pushed to the client** in the text/event-stream format
     - EventScource only works with `get` HTTP method, and thats why **data can be send via Query Parameter** only.

   ```py
     # The browser's EventSource API follows the Server-Sent Events (SSE) specification, which defines these strict formatting rules: -⬇️
     yield f"data: {chunk}\n\n" # Output: - data: chunk\n\n
   ```

2. **Fetch with ReadableSteam API: -** _This is the complete manual process from backend to frontend chucks handling. It is lower-level and more flexible, works with any content type, any HTTP method and is essential for full streaming control like AI response tokens, binary data, etc_

- **Step- 1:** why do we use `.getReader()` and **not .text() or .json() with ReadableSteam**:- Because **.text() and .json() are high-level convenience method**. These are designed/built to be more convinenent for the end user to get the response from the server, so these **.text() and .json() method Buffers everything from response.body**, Decodes `(from raw byte to string)` after the full body is received and then Then gives us the whole text as one big string
  - `.getReader() method` The **reader is just a tool to read data** - it's not the data itself. So this reader method is designed to get chuck response from the server it does not buffer the responses.
- **Step- 2: -** This reader method does not automatically parses the **raw byte to string**, have to manually do that using `TextDecoder` Constructor.
- **Step- 3: -** [🔗 More on .getReader().read() Method](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStreamDefaultReader/read) This `.getReader().read() method` **retruns the Promise** and we know promise has two method **resolve(value) and reject(done)**, so if the chuck is avaliable it resolves `{ value: theChunk, done: false }` and when the stream ends (cleanly) the done becomes true `{ value: undefined, done: true }`.
  - `ℹ️We must explicitly call .read() repeatedly to receive and process each chunk of data from the stream, whether it is sent by the server or buffered in the browser's internal queue`. The **browser buffers the chunks** if the server sends data faster than the client reads it using the .read() method.
  - we **don’t need to send data: [DONE]\n\n from the server** if we're using .getReader() — because:- `reader.read() automatically returns done: true when the stream ends` (i.e., the server closes the connection or the stream completes).

### 2. **WebSocket: -** _this_
