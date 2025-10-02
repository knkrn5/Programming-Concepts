# **PYTHON**

```PY
if __name__ == '__main__':
    main()
```

## Alternative Python Implementations with JIT

While standard CPython doesn't JIT compile, some alternative implementations do:

- **PyPy:** Has a sophisticated JIT compiler that can compile hot Python bytecode to machine code (often 4-5x faster than CPython)
- **Jython:** Runs on the JVM, so benefits from the JVM's JIT compilation
- **IronPython:** Runs on .NET, uses .NET's JIT
- **Numba:** A JIT compiler for numerical Python functions
- **Nuitka/Cython:** Ahead-of-time compilers that translate Python to C++/C

## **Datatypes in py**

1. **Primitive**
2. **Non-Primitive**

> ℹ️Imp: - `Everything in Python is an object.`

## **[🔗 OOPS in Python](./pylang/oopsinpy.md)**

## **Operators**

1. **Arthematic Operations**

2. **Logical Operations**

3. **Comparision Operations: -** In py we don't have `Loose Comparision` like js, we only have `Strict Comparision(==)`

4. **Other Operators**

   - **unpacking operator**

   ```py
    # coping list/array
    original_list = [1, 2, 3]
    copied_array = [*original_array, 4, 5]

    # copying dict/obj
    dict1 = { "name": "karan", "age": 24 }
    copy_dict = { **obj, "sex": "male" }
   ```
