# **Execution Context in Js**

## **Execution Context in js: -** Understanding execution context in JavaScript is key to mastering weird behaviors like: -⬇️

- Why variables are undefined/referenceError when accessed before declaration
- Why functions can be called before they are defined

> **There are Two Phases of Execution:**

1.  `Memory Allocation Phase (Creation Phase): -`

    - JS scans the code before it starts executing
    - It allocates memory for:
      - Variables → initialized with undefined
      - Function declarations → fully hoisted (the whole function is placed in memory)

2.  `Code Execution Phase: -`

    - JS runs the code line-by-line
    - Variables get assigned their actual values
    - Functions get called as needed

### Call Stack vs Stack Overflow
