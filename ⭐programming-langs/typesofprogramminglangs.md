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

### The Foundation: The CPU and its Language

The CPU only understands **machine code**, which is a series of **binary instructions (0s and 1s)** specific to its architecture (like x86, ARM, etc.).

## 💡 Step 2: What is Machine Code vs Bytecode?

| Term         | What it is                                                                                                                                  | Used by                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Machine Code | **Binary instructions** run directly by the CPU, Machine Code is Binary Code, that cpu actually understands                                 | All compiled languages eventually |
| Bytecode     | **Intermediate code**, not readable by CPU directly. it's the machine code for a virtual machine (a program that pretends to be a computer) | Java, Python (sometimes)          |
| Source Code  | Code you write (JS, Py, Java)                                                                                                               | You 👨‍💻                            |

---

So, the ultimate goal of any programming language is to have its logic translated into the specific **Machine Code** for the CPU it's running on. How it gets there is what makes languages different.

Let's look at the three main approaches, using your examples.

---

### 1. The Compiled Approach (e.g., C, C++, Rust)

This is the most direct route. While you didn't provide a C++ example, it's the classic case.

1.  **You write Source Code:** `int sum(int a, int b) { return a + b; }`
2.  **You use a Compiler:** A compiler is a special program that reads your entire source code at once. It analyzes it, optimizes it, and translates it directly into the Machine Code for a specific CPU architecture (like x86-64 for most laptops or ARM for smartphones).
3.  **Result is an Executable File:** The output is a `.exe` file on Windows or a binary file on Linux/macOS. This file contains pure machine code.
4.  **Execution:** When you run this file, the operating system loads this machine code directly into memory, and the CPU executes the instructions one by one.

**Analogy:** A compiler is like a professional translator who takes an entire book written in English and translates the whole thing into a finished French book. Anyone who can read French can then pick up the translated book and read it directly.

---

### 2. The Interpreted Approach (e.g., Python, JavaScript)

This is where things get clever. Your code is not translated into machine code beforehand.

1.  **You write Source Code:** `def sum(a, b): return a + b`
2.  **You run it with an Interpreter:** The interpreter (e.g., the CPython interpreter for Python, the V8 engine for JavaScript in Chrome) is an **executable program that is already compiled into machine code**.
3.  **Execution:** The interpreter reads your source code line by line (or statement by statement).
    - For each line it reads, like `return a + b`, the interpreter figures out what you want to do.
    - The interpreter then executes its _own pre-compiled machine code_ that corresponds to that action. For example, it will execute its internal machine code function for "addition."

**So, is the code compiled to machine code?** Yes, but not in the way you might think. Your Python/JS code isn't directly compiled into a standalone `.exe` file. Instead, the **interpreter itself** is a compiled program, and it processes your script in real-time. The CPU is running the interpreter's machine code, and the interpreter is deciding which of its machine code routines to run based on the script it's reading.

**Modern Optimization: Just-In-Time (JIT) Compilation**

Pure interpretation (reading line-by-line) can be slow. Modern interpreters for JavaScript (like V8) and Python (like PyPy, and parts of the standard CPython) use a technique called **Just-In-Time (JIT) Compilation**.

- The interpreter starts by running the code line-by-line.
- It notices that some pieces of code, like a function in a loop, are being run many times.
- To speed things up, it takes that "hot" piece of code and, _at that moment (just in time)_, compiles it into machine code and saves it.
- The next time that code needs to run, it executes the newly compiled, super-fast machine code directly instead of re-interpreting it.

**Analogy:** An interpreter is like a live translator at the UN. They listen to one sentence in English, and immediately translate it into French for the audience. A JIT compiler is a very smart translator who, after hearing the speaker say the same phrase "thank you for your cooperation" five times, writes it down on a card. For the sixth and subsequent times, they just show the card instead of re-translating it, which is much faster.

### 1. Compilation: Implicit vs. Explicit

- **Java:** Compilation is an **explicit and mandatory step** for the programmer. You _must_ run the `javac` compiler to turn your `.java` file into a `.class` file. You cannot run a `.java` file directly. You distribute the `.class` files.
- **Python:** Compilation is an **implicit and automatic step** handled by the interpreter. You, the programmer, almost never think about it. You just run the `.py` file. The creation of the `.pyc` file is purely a **performance optimization** to speed up startup time on subsequent runs. If you delete the `__pycache__` folder, your program will still run perfectly fine; it will just take a fraction of a second longer to start the first time as it recompiles the bytecode.

#### 2. Virtual Machine: JIT Compiler vs. Interpreter

This is the biggest difference in performance.

- **Java Virtual Machine (JVM):** The JVM is a highly sophisticated piece of engineering. Its primary feature is a powerful **Just-In-Time (JIT) compiler**. As it interprets the bytecode, it analyzes which parts of the code are run most often (the "hot spots"). It then compiles these specific parts from bytecode into super-fast, native **machine code** on the fly. This is why a long-running Java application can achieve speeds close to a C++ program.
- **Python Virtual Machine (PVM) in CPython:** The standard version of Python (called CPython, which is what most people use) has a PVM that is primarily a **bytecode interpreter**. It executes a simple loop: read one bytecode instruction, execute the C code that corresponds to that instruction, and repeat. It does **not** have a JIT compiler. It always stays at the level of interpreting bytecode.

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

So, you are right to see the similarity. Python uses a compilation-to-bytecode step just like Java, but it does it transparently as an optimization. The main reason Python is generally slower than Java is that its standard PVM interprets that bytecode, whereas the JVM JIT-compiles it into native machine code for maximum performance.

---

### 3. The Hybrid/Virtual Machine Approach (e.g., Java, C#)

You were very accurate in your description of Java. It combines both compilation and interpretation.

1.  **You write Source Code:** `public static int sum(int a, int b) { return a + b; }`
2.  **You use the Java Compiler (`javac`):** You compile your `.java` file. However, it does **not** compile to machine code. It compiles to **Bytecode**. This results in a `.class` file.
3.  **What is this Bytecode?** It's a set of instructions for a fake, idealized computer called the **Java Virtual Machine (JVM)**. This bytecode is platform-independent; the same `.class` file can run on Windows, macOS, or Linux.
4.  **Execution:** To run the program, you use the `java` command, which starts the JVM. The JVM is a sophisticated program (an interpreter/runtime environment) that is native to your OS (i.e., it's machine code for your CPU).
5.  **The JVM runs the Bytecode:** The JVM reads the bytecode instructions. Like modern interpreters, it uses a powerful **JIT compiler**. It analyzes the bytecode as it runs and compiles the most frequently used parts into highly optimized native Machine Code for the CPU you're actually using.

This approach gives Java its famous "Write Once, Run Anywhere" capability. You compile it once to bytecode, and then the JVM on any machine can run that same bytecode.

**Analogy:** Java bytecode is like IKEA assembly instructions. The instructions are universal (platform-independent). You don't need a specific Swedish, American, or Japanese version. You just need the right toolset (the JVM) to understand and execute those instructions, whether you are in Stockholm, Seattle, or Tokyo.

### Summary

| Language Type   | How it Works                                                 | Your Example       | CPU runs...                                                                                   |
| :-------------- | :----------------------------------------------------------- | :----------------- | :-------------------------------------------------------------------------------------------- |
| **Compiled**    | Source Code → Compiler → Machine Code                        | C++, C, Rust       | ...the Machine Code generated from your program.                                              |
| **Interpreted** | Source Code → Interpreter (which is Machine Code)            | Python, JavaScript | ...the Machine Code of the **Interpreter program**.                                           |
| **Hybrid (VM)** | Source Code → Compiler → Bytecode → JVM (JIT) → Machine Code | Java, C#           | ...the Machine Code of the **JVM**, which in turn JIT-compiles your bytecode to Machine Code. |

So, you were very close! The key is that in all cases, the CPU is only ever running Machine Code. The difference lies in _when_ and _how_ your human-readable source code gets turned into that Machine Code.

**💡 Step 1: What does the **CPU** understand?**

**Example:**

```sh
10110000 01100001
```

This might tell the CPU: “Move the number `0x61` into a register”.

That’s it. That’s the language of the CPU. All your fancy Python/JS/Java stuff must **eventually** become this.

---

## 🧠 Now, language by language:

---

### ⚡ JavaScript (Interpreted + JIT compiled)

JS is usually run in **browsers** (like Chrome's V8 engine), or on **Node.js**.

1. **JS is not compiled ahead of time.**
2. The engine (like V8) **interprets** your JS code line-by-line.
3. But for performance, JS engines use **JIT (Just-In-Time) Compilation**:

   - Hot parts of the code are **compiled to machine code** during runtime.

4. So yes, **JS becomes machine code**, just **on the fly**.

✅ Final execution: **Machine code**

---

### 🐍 Python (Mostly interpreted)

Python is traditionally an **interpreted language**.

1. Your Python `.py` file is converted to **bytecode (.pyc)** first by the CPython interpreter.
2. This bytecode is **interpreted** by the Python Virtual Machine (PVM).
3. The PVM is written in C, which **is already compiled to machine code**.

💡 So technically:

- Your Python → Bytecode → Interpreted by PVM → Executed via machine code

✅ Final execution: **Machine code**
⚠️ But no JIT by default (unless you use PyPy, which has a JIT engine).

---

### ☕ Java (Compiled + Interpreted + JIT)

Java is a hybrid beast 💪:

1. Java source code `.java` is **compiled** into **bytecode (.class files)** using `javac`.
2. Bytecode is run on the **JVM (Java Virtual Machine)**.
3. JVM first **interprets** the bytecode.
4. For better performance, JVM uses **JIT** to compile **hot methods** to **machine code**.

✅ Final execution: **Machine code**

---

All your code (JS, Python, Java) **eventually becomes machine code**, otherwise your CPU wouldn't be able to run it. The only difference is:

- **When** and **how** it gets turned into machine code
- **Who** is doing the job (interpreter, JIT, compiler, etc.)

---

## **Platform Independent VS Platform dependent**

1. **[🔗Platform dependent](../cpp/cpp.md#c-platform-dependent)**

2. **[🔗Platform Independent](../java/java.md#java-platorm-independent)**

## **Statiscally Typed vs Dynaically Typed**

### **TypeCheck**

- **[🔗TypeCheck](./typeCheck.md)**
