# REST API Basics

## What is an API?

An **API (Application Programming Interface)** is a set of rules and protocols that allows one software application to interact with another. It defines the methods and data formats that applications can use to communicate, enabling developers to integrate functionalities between different systems.

### Key Features of APIs

1. **Abstraction:**

   - APIs abstract the complexity of underlying implementations and expose only the necessary functionalities.

2. **Interoperability:**

   - APIs enable communication between different software systems, regardless of the platform or technology.

3. **Automation:**

   - APIs allow applications to interact without user intervention, enabling automation of tasks.

4. **Scalability:**
   - APIs support scalability by enabling developers to extend functionalities or integrate with external systems easily.

---

## What is a REST API?

A **REST API** (Representational State Transfer Application Programming Interface) is a web service architecture that allows clients (e.g., browsers, mobile apps) to interact with servers using standard HTTP methods. REST APIs enable data exchange between applications in a stateless, resource-focused manner.

### Key Principles of REST APIs

1. **Resource-Based:**

   - Resources (e.g., `users`, `orders`) are identified using unique URIs (Uniform Resource Identifiers).

2. **Stateless:**

   - Each request from a client to the server must contain all the information needed to process the request.

3. **HTTP Methods:**

   - `GET`: Retrieve data
   - `POST`: Create new resources
   - `PUT`: Update existing resources
   - `PATCH`: Partially update resources
   - `DELETE`: Remove resources

4. **Representation of Resources:**

   - Resources are typically represented in formats like JSON or XML.

5. **Client-Server Architecture:**
   - Separation of concerns between the client (frontend) and the server (backend).

---

## Best Practices for REST APIs

### 1. **Use Descriptive URIs**

- **Good:** `/users/1/orders`
- **Bad:** `/getUserOrders`

### 2. **Follow HTTP Standards**

- Use HTTP methods correctly for the desired operation (e.g., `GET` for retrieval, `POST` for creation).

### 3. **Version Your API**

- Include versioning in your URI to handle updates gracefully:
  ```
  /v1/users
  /v2/users
  ```

### 4. **Provide Clear Error Messages and Status Codes**

- Use meaningful HTTP status codes and error messages to aid debugging.
  - `200 OK`
  - `201 Created`
  - `400 Bad Request`
  - `401 Unauthorized`
  - `404 Not Found`
  - `500 Internal Server Error`

### 5. **Use Secure Authentication and Authorization**

- Implement secure methods such as **OAuth2** or **JWT (JSON Web Tokens)** to protect sensitive operations.

### 6. **Paginate Large Data Sets**

- When returning a large number of records, paginate the results to improve performance:
  ```
  GET /users?page=2&limit=50
  ```

### 7. **Rate Limiting**

- Protect your API from abuse by limiting the number of requests a client can make:
  ```
  429 Too Many Requests
  ```

### 8. **Cache Responses**

- Implement caching for frequently requested data to improve performance and reduce server load:
  - Use HTTP caching headers like `Cache-Control` and `ETag`.

Adhering to these best practices ensures that your REST API is robust, secure, and user-friendly.

The API which follow REST principles is called a RESTful API.
