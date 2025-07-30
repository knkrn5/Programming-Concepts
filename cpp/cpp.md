# **C Plus Plus Programming lang**

## **C++ Platform dependent**

- C/C++ **compilers translate source code directly into native machine code** specific to the target processor architecture and operating system

> ### Becuase c++ is complied in the **native machine code**, that why this c++ is also _complied programming language_

```cpp
// cpp example
#include <iostream>
int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}
```

- Compiled on Windows x64 (MSVC):

```assembly
main:
    sub     rsp, 40                    ; Windows shadow space allocation
    lea     rdx, [rel str_hello]       ; Load string address into RDX (2nd param)
    mov     rcx, qword ptr [rel std::cout] ; Load cout object into RCX (1st param)
    call    std::basic_ostream::operator<<  ; Call cout << operator
    mov     rdx, qword ptr [rel std::endl] ; Load endl manipulator
    mov     rcx, rax                   ; Move cout result to RCX
    call    std::basic_ostream::operator<<  ; Call cout << endl
    xor     eax, eax                   ; Return 0
    add     rsp, 40                    ; Restore stack
    ret

str_hello: db "Hello World", 0
```

- Compiled on Linux x64 (GCC):

```assembly
main:
    sub     rsp, 40                    ; Windows shadow space allocation
    lea     rdx, [rel str_hello]       ; Load string address into RDX (2nd param)
    mov     rcx, qword ptr [rel std::cout] ; Load cout object into RCX (1st param)
    call    std::basic_ostream::operator<<  ; Call cout << operator
    mov     rdx, qword ptr [rel std::endl] ; Load endl manipulator
    mov     rcx, rax                   ; Move cout result to RCX
    call    std::basic_ostream::operator<<  ; Call cout << endl
    xor     eax, eax                   ; Return 0
    add     rsp, 40                    ; Restore stack
    ret

str_hello: db "Hello World", 0
```

## **[🔗 OOPS in CPP](./cpplang/oopsincpp.md)**
