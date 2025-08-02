# **DevOp Concepts**

## **Environment Isolation or Environment Management: -** _This means each environment has its own dedicated infrastructure, including:_

- **Databases:** Each environment connects to a different database, preventing test data from mixing with real user data.

- **Servers & Hosting:** Code for each branch runs on a different server. Staging and testing branches are often privately hosted (e.g., behind a VPN or password-protected) so they aren't accessible to the public.

- **Services:** Any other services, like a Content Management System (CMS), caching layers, or third-party APIs, have separate instances or use different credentials for each environment.

### **Infratructure**

### **Hosting Platforms**

1. **Railway deploys all applications using Docker under the hood**, but it provides both Dockerfile-based and native (non-Docker) workflows.
   - Railway auto-detects your project type (like Node.js, Python, Go, Java, etc.) based on the repository contents and **uses internal Docker templates** to build and run it. **(Native Build (No Dockerfile Required) – "Zero Config")**

### **Port forwarding or Reverse proxying: -** _The platform maps that internal port to a public domain, this is called port forwarding_

| Internal (inside container) | External (public)                   |
| --------------------------- | ----------------------------------- |
| `localhost:12345`           | `https://myapp.onrender.com`        |
| `localhost:8080`            | `https://api.myproject.railway.app` |

- The platform runs a reverse proxy like Nginx or Envoy in front of your app. It takes requests from the internet and forwards them to our app’s local port inside the container.

### **Local Hosting**

- Tools like **ngrok** are more used for **port forwarding http to https**
