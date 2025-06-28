# **_Rest API Concept_**

```text
Technically, we can perform any action with any HTTP method, but each method has a specific purpose in REST design — for semantic clarity, consistency, and often security
```

> ## **_Rest API Flow Diagram ⬇️_**

![Rest API Flow Diagram](./imgs/restapiflowdiagram.png)

### Some Rules of Rest API: -

1. **Request Body** is not recommended with **_Get_** and **_Delete_** Method

---

### REST is a design philosophy, not a technical requirement. We follow it because it makes APIs: -

1. Predictable for developers
2. Safe for automated systems
3. Compatible with HTTP infrastructure
4. Self-documenting through method semantics

### Infrastructure Behavior: -

- Caches only cache GET/HEAD by default
- Proxies may handle methods differently
- Firewalls may block certain methods
- Browsers have different behavior (CORS preflight for PUT/DELETE)

```python
def hello():
    print("Hello, world!")
```

```javascript
function test() {}
```
