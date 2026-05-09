| Concept                     | **SSE**                                                                 | **WebSocket**                                                   |
| --------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Who initiates**           | ✅ Client (frontend) starts the connection using `new EventSource(url)` | ✅ Client also starts the connection using `new WebSocket(url)` |
| **Who “keeps it open”**     | 🖥️ Server keeps sending messages _one-way_                              | 🔁 Both client and server can send anytime                      |
| **Protocol**                | HTTP (kept open with `text/event-stream`)                               | Starts as HTTP, upgrades to TCP (full-duplex)                   |
| **Communication Direction** | ➡️ Server → Client only                                                 | 🔄 Client ↔ Server (two-way)                                    |
| **Who closes**              | ❌ Usually client (EventSource auto-reconnects unless closed manually)  | ✅ Either client _or_ server can close intentionally            |
| **How closed**              | Client: `eventSource.close()`                                           | Client: `ws.close()`<br>Server: `socket.close()`                |

---


