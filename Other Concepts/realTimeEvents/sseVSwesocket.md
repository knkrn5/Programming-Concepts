# **SSE and WebSocket**

## Other

### 1. **Sever Side Event(SSE): -** _By the name only we can understand that event sent by the server, so this is one way only(Unidirectional Communication)_, It allows a server to push real-time updates to a browser over a single, long-lived HTTP connection. It’s built on top of HTTP and is designed for scenarios where the server needs to send data to the client incrementally (e.g., live notifications, chat messages, or AI response streaming)\_

- The server sends `raw text` over the HTTP connection in this exact format that we have defined in the backend/server, Data **arrives in `network packets`, not in our logical "chunks"** example like for this

  ```py
  # python eg
  yield f"data: {chunk.choices[0].delta.content}\n\n"
  ```

  ```txt
  # Data comes like this in network packets⬇️
  Time 0ms:  "data: Hello\n\n"
  Time 50ms:  "data: world\n\n"
  Time 100ms: "data: !\n\n"
  Time 150ms: "data: [DONE]\n\n"

  # Network chunks don't necessarily align with your logical messages. You might get:⬇️
  Chunk 1: "data: Hel"
  Chunk 2: "lo\n\ndata: world\n\n"
  ```

1. **Eventscorce: -** _EventSource is a browser-native API used to receive real-time data from the server via Server-Sent Events (SSE). It automatically Parses `data:` prefix, Delivers `event.data as a string` and Handles the streaming and parsing for us .
   However, **the server must send data in a specific format** for EventSource to work correctly.⬇️_

   - `data:` - Required prefix for message content
   - `\n\n` - Required double newline to mark message end
   - And the last word of the full response depends of the dev, whatever we want ot keep like `data: [DONE]\n\n` or `data: [END]\n\n` etc, this is needed **to close the eventsource** after the response is completed.

   ```py
     # The browser's EventSource API follows the Server-Sent Events (SSE) specification, which defines these strict formatting rules: -⬇️
     yield f"data: {chunk}\n\n" # Output: - data: chunk\n\n
   ```

2. **Fetch with ReadableSteam API: -** _This is the complete manual process from backend to frontend chucks handling_

### 2. **WebSocket: -** _this_

| Feature                  | SSE (Server-Sent Events)  | WebSockets                              |
| ------------------------ | ------------------------- | --------------------------------------- |
| Direction                | Server ➡️ Client only     | Two-way (Client ↔️ Server)              |
| Built-in Browser Support | Yes (`EventSource` API)   | Yes (`WebSocket` API)                   |
| Protocol                 | HTTP/1.1                  | Separate protocol (`ws://` or `wss://`) |
| Best for                 | Notifications, live feeds | Chat apps, multiplayer games            |
