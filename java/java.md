# **JAVA Programming Language**

`java byte code` is like a `docker container` which is platform indepentent, like in java `JVM` is OS dependant which converts the byte-code to the machine-specific instruction, similarly `docker engine` is os-dependent which run can all the container build in any platform.

## **JAVA Platorm Independent**

- Java source code is **compiled into bytecode** (stored in .class files), which is an intermediate representation that's **not specific to any particular hardware or operating system.**
- This bytecode runs on the Java Virtual Machine (JVM), which acts as a layer between your program and the operating system. **Each platform (Windows, Linux, macOS, etc.) has its own JVM implementation**, but they all understand the same bytecode format. This is why Java follows the principle "write once, run anywhere" (WORA).

> ### Becuase java is complied in the **Bytecode**, that why this java is also _complied programming language_

### **The Bytecode is Universal but JVMs are Platform-Specific: -** _JVM is written/implementation in c - it's the native code that makes up the JVM software._

- When our Java bytecode says `INVOKEVIRTUAL java/io/File.exists`, the JVM (written in C) sees that instruction and says "Oh, I need to check if a file exists" and then runs the appropriate C code (like the stat() system call on macOS).

- **Windows JVM:** Knows how to talk to Windows APIs, uses Windows threads, Windows file system, etc.
- **Linux JVM:** Knows how to talk to Linux system calls, uses pthreads, Linux file system, etc.
- **macOS JVM:** Knows how to talk to macOS/BSD APIs, uses macOS threading, etc.

### **Why the JAVA complied code is called Bytecode:** _The term "bytecode" comes from the fact that each instruction in Java's intermediate representation is identified by a single byte (8-bit value)_

- What we see **(human-readable)**

  ```class
  NEW java/io/File
  INVOKESPECIAL java/io/File.<init>
  INVOKEVIRTUAL java/io/File.exists
  ```

- What's **actually stored** in the .class file (the real bytecode)

  ```bytecode
  BB 00 07        // NEW instruction (BB = 187 in decimal, that's 1 byte)
  B7 00 08        // INVOKESPECIAL (B7 = 183 in decimal, that's 1 byte)
  B6 00 09        // INVOKEVIRTUAL (B6 = 182 in decimal, that's 1 byte)
  ```

- The human-readable version (NEW java/io/File) is just for our convenience. The actual .class file contains the numeric byte values that the JVM reads directly

## **[🔗 OOPS in JAVA](./javalang/oopsinjava.md)**
