# **Types of Programming Langs**

```mermaid
flowchart TD
    A(Languages) ==> B{Type of programming languages}
    B e1@--> |One| D([Compiled vs Interpreter])
    B e2@-->|Two| E([Statically vs Dynamically typed])
    B e3@-->|Three| F([Platform Independent vs Dependent])
    e1@{ animate: true, animation: fast, curve: linear }
    e2@{ animate: true, animation: fast }
    e3@{ animate: true, animation: fast, curve: linear }
```

## **Interpreter vs Compiled Language**

> The language itself isn't "compiled" or "interpreted" — it's the implementation that matters.

> The classification is about the language design and programmer experience (implicit and explicit), not the implementation

So, the ultimate goal of any programming language is to have its logic translated into the specific **Machine Code** for the CPU it's running on. How it gets there is what makes languages different.

Let's look at the three main approaches, using your examples.

---

---

**Modern Optimization: Just-In-Time (JIT) Compilation**

| Term                    | Meaning                                                      |
| ----------------------- | ------------------------------------------------------------ |
| **AOT (Ahead of Time)** | Compilation happens before you run the program. Ex: C, Rust  |
| **JIT (Just in Time)**  | Compilation happens _while_ the program runs. Ex: Java, PyPy |

### 1. Compilation: Implicit vs. Explicit

**(Note: There are other implementations of Python, like PyPy, which _do_ include a JIT compiler and can be much faster than standard CPython for certain tasks.)**

### Summary

| Feature               | Python (CPython)                           | Java                                                 |
| :-------------------- | :----------------------------------------- | :--------------------------------------------------- |
| **Source File**       | `.py`                                      | `.java`                                              |
| **Intermediate Code** | Python Bytecode                            | Java Bytecode                                        |
| **Intermediate File** | `.pyc` (in `__pycache__`)                  | `.class`                                             |
| **Compilation Step**  | **Automatic & Hidden** (for caching/speed) | **Manual & Required** (using `javac`)                |
| **Virtual Machine**   | PVM (Python Virtual Machine)               | JVM (Java Virtual Machine)                           |
| **Execution Method**  | **Interprets** the bytecode                | **JIT-compiles** the bytecode to native machine code |

### **Virtal Machine in python**

1. **No JIT in CPython:** The standard Python implementation (CPython) is a pure interpreter - it doesn't have a JIT compiler
2. **pypy:** An alternative implementation of Python that includes a JIT compiler.

> NOTE: So in Py if we use pypy then it will also use JIT compiler and the performance will be much better than CPython

---

### 3. The Hybrid/Virtual Machine Approach (e.g., Java, C#)

### Summary

| Language Type   | How it Works                                                 | Your Example       | CPU runs...                                                                                   |
| :-------------- | :----------------------------------------------------------- | :----------------- | :-------------------------------------------------------------------------------------------- |
| **Compiled**    | Source Code → Compiler → Machine Code                        | C++, C, Rust       | ...the Machine Code generated from your program.                                              |
| **Interpreted** | Source Code → Interpreter (which is Machine Code)            | Python, JavaScript | ...the Machine Code of the **Interpreter program**.                                           |
| **Hybrid (VM)** | Source Code → Compiler → Bytecode → JVM (JIT) → Machine Code | Java, C#           | ...the Machine Code of the **JVM**, which in turn JIT-compiles your bytecode to Machine Code. |

So, you were very close! The key is that in all cases, the CPU is only ever running Machine Code. The difference lies in _when_ and _how_ your human-readable source code gets turned into that Machine Code.

**💡 Step 1: What does the **CPU** understand?**

## 🧠 Now, language by language:

---

### 🐍 Python (Mostly interpreted)

2. This bytecode is **interpreted** by the Python Virtual Machine (PVM).
3. The PVM is written in C, which **is already compiled to machine code**.

💡 So technically:

- Your Python → Bytecode → Interpreted by PVM → Executed via machine code

✅ Final execution: **Machine code**
⚠️ But no JIT by default (unless you use PyPy, which has a JIT engine).

---

---

## **Platform Independent VS Platform dependent**

1. **[🔗Platform dependent](../cpp/cpp.md#c-platform-dependent)**

2. **[🔗Platform Independent](../java/java.md#java-platorm-independent)**

## **Statiscally Typed vs Dynaically Typed**

### **TypeCheck**

- **[🔗TypeCheck](./typeCheck.md)**
