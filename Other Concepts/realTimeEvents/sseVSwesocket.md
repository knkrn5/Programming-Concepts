# **SSE and WebSocket**

## Other

### 1. **Sever Side Event(SSE): -** _By the name only we can understand that event sent by the server, so this is one way only_

- ℹ️The server must format the SSE stream like this. so we have to always fomat the data, from the server like this:

  - `data:` - Required prefix for message content
  - `\n\n` - Required double newline to mark message end

  ```py
    # The browser's EventSource API follows the Server-Sent Events (SSE) specification, which defines these strict formatting rules: -⬇️
    yield f"data: {chunk}\n\n" # Output: - data: chunk\n\n
  ```

  - **Eventscorce VS ReadableSteam**

### 2. **WebSocket: -** _this_

| Feature                  | SSE (Server-Sent Events)  | WebSockets                              |
| ------------------------ | ------------------------- | --------------------------------------- |
| Direction                | Server ➡️ Client only     | Two-way (Client ↔️ Server)              |
| Built-in Browser Support | Yes (`EventSource` API)   | Yes (`WebSocket` API)                   |
| Protocol                 | HTTP/1.1                  | Separate protocol (`ws://` or `wss://`) |
| Best for                 | Notifications, live feeds | Chat apps, multiplayer games            |
