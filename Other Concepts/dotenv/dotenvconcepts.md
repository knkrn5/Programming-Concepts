# **About Dotenv Package**

## **⭐How `Dotenv` works in Backend/Server applicaitons**

> Dotenv packages **read key-value pairs from a .env file and load them into the environment variables** of the running process of our application, so these are only avaliable during that specific running process. Dotenv packages do NOT add variables to the actual host system environment like we do like this:
>
> ```bash
> echo "export DB_URL=http://localhost:5432"
> ```

```text
so whenever we use the process.env in node.js, os.evion in python or system.getenv/System.getProperty in java. these are inbuilt in these programming language, they let us accesse the variable from the host system environment or from runtime processes, and not for the .env file
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

## **⭐How `Environment variables` works in Frontend applicaitons**

> In a frontend (web) application, environment variables > don’t work the same way as they do in a backend like Node.js or FastAPI, because: -

- ### Frontend runs in the browser, which cannot access .env files at runtime

- .env variables in frontend projects are **injected at build time, not runtime.**

  | Framework            | Public Prefix Required | Example                                     |
  | -------------------- | ---------------------- | ------------------------------------------- |
  | **Vite**             | ✅ `VITE_`             | `VITE_API_URL=http://localhost:3000`        |
  | **Create React App** | ✅ `REACT_APP_`        | `REACT_APP_API_URL=http://localhost:3000`   |
  | **Next.js**          | ✅ `NEXT_PUBLIC_`      | `NEXT_PUBLIC_API_URL=http://localhost:3000` |

- Any variable not starting with the required prefix will be stripped out during the build.
