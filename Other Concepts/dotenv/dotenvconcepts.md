# **About Dotenv Package**

> Dotenv packages provide a convenience layer that makes .env file variables available to our application during runtime, but only within that specific running process. Dotenv packages do NOT add variables to the actual host system environment like we do like this:
>
> ```bash
> echo "export DB_URL=http://localhost:5432"
> ```

```text
so whenever we use the process.env in node.js, os.evion in python or system.getenv/System.getProperty in java there are inbuilt in these programming language only, they accesses the variable from the host system environment or from runtime processes not for the .env file
```

## **_Default Precedence (Most dotenv libraries):_**

- **Highest Priority:** Actual host system environment variables
- **Lower Priority:** Variables loaded from .env file

- Each dotenv file only **loads variables into the memory of its own running process.**
  It does not set global OS-level environment variables that affect other processes or folders.
  - When we run different programs, **each gets its own separate process with its own environment variable space**. They don't interfere with each other

| Language | Runs In             | Env Scope                    |
| -------- | ------------------- | ---------------------------- |
| Node.js  | `node index.js`     | Local to that Node process   |
| Python   | `python app.py`     | Local to that Python process |
| Java     | `java -jar app.jar` | Local to that JVM instance   |

### **How does Env works in Hosting Platform**

- Render's Environment Variables → Set in Render dashboard → Injected into at runtime Environtment.
