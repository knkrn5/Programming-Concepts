# **Memory Reference vs Copy**

## **Pass by value VS Pass by Reference**

> In most of the programming languages, primitive datatypes are pass by value in directly with means it will always be a copy,(that’s why primitive are immutable) but in case of non-primitive these are passed by reference(Non-Primitives: CAN Mutate), which means if data is mutated it changes the parent variable too, but if the non-primitive data is re-assigned, then there can be two scenarios⬇️:

1. If we `reassign in the same scope`(not as function parameter) then the parent variable will point to the memory reference of the newly created object, and old object will be garbage collected if no other variable is pointing to it.
2. `Reassigned any non-primitive datatype passed as function parameters` will create a local copy of the reference, so the parent variable remains unchanged.

## ⭐The value of the primitive datatypes are copied but incase of the Non-primitive datatypes memory address reference is copied/passed

> **So then How do we copy the Non-Primitive DataType, Here comes the concept of `shallow copy VS Deep copy`⬇️**

## **Shallow Copy VS Deep Copy**

1. **Shallow Copy: -** _Shallow Copy mean that whenever we copy any object or array, only the Primitive property/values will be copied, while for any Non-primitive Property/values(nested object) the reference will be copied/passed_

   - This means if we change any Primitive DataType value in the copied variable it will not the affect the orginal variable, but if we change any Non-primitive DataType(nested object,array) in the copied variable, then this change will also affect the orignal variable

2. **Deep Copy: -** _Deep copy means everything even the (Nested Non-Primitive Datatype) nested objects is copy, no reference is passed, So nothing is Shared_

   - so this means that making changes even in the nested non-primitive property/value in the copied variable will not change/affect anything in the original variable.

### **But why this behavior is designed in programming languages?**

- `Performance:` References are fast, copying large data is slow and causes cpu/memory-intensive operations
- `Memory:` Sharing data prevents duplication, memory efficiency
- `Practicality:` Most code needs to share/modify data
- `Flexibility:` we can deep copy when needed, but it's not the default
- `Hardware:` Matches how computers actually work

### **Stack vs Heap Memory: -** _Stack holds primitive (copied by values), while heap holds non-primitive (memory-reference types)_

1. **Stack Allocation: -** Primitive Types **Are generally stored directly in memory** where the variable is allocated (on the stack).
2. **Heap Allocation: -** Non-Primitive Types (Reference Types): 
when we create the object the value itself is stored in the heap memory. **so all other variables holds a memory-address reference or a pointer to this value in heap memory**.
