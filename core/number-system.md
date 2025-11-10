# **Number System**

## It's the range of values one byte can hold: -
- When we say a number system has a certain base, that’s the number of unique symbols (digits) it uses.

### What is a byte?

- A byte = **8 bits**
- A bit = either **0 or 1**

### Why 0-255?

```txt
8 bits can make 2^8 = 256 different combinations
Starting from 0: 0, 1, 2, 3, ... 254, 255
Total: 256 different values
```

## Visual breakdown:

```txt
Binary:     Decimal:
00000000  →  0      (smallest)
00000001  →  1
00000010  →  2
00000011  →  3
...
01001000  →  72     (Letter 'H')
...
11111110  →  254
11111111  →  255    (largest)
```

### Base-4 (Quaternary) - 2-bit grouping:
Binary: 10111010
Group in 2s: 10|11|10|10
Base-4: 2 3 2 2
So 10111010₂ = 2322₄
Base-4 exists but is rarely used because Not compact enough: Base-4 numbers are almost as long as binary itself

- A 2-bit system can only represent $2^2 = 4$ unique values (00, 01, 10, 11). You could only count from 0 to 3. This is too small for any practical numeric data, even simple decimal digits (0-9)

## Visual Example: Why Position Matters

```
The number "5" means different things based on position:

      5 = 5 × 1     = 5
     50 = 5 × 10    = 50
    500 = 5 × 100   = 500
  5,000 = 5 × 1,000 = 5,000

Same digit (5), different position, different value!
```

## Number Literal Prefixes/Suffixes: - _This is how we recognise the where the number is decimal, octal, hexadecimal_

| Prefix            | Meaning     | Example    | Base |
| ----------------- | ----------- | ---------- | ---- |
| _(no prefix)_     | Decimal     | `33`       | 10   |
| `0` (old C-style) | Octal       | `033`      | 8    |
| `0o` or `0O`      | Octal       | `0o33`     | 8    |
| `0x` or `0X`      | Hexadecimal | `0x33`     | 16   |
| `0b` or `0B`      | Binary      | `0b100001` | 2    |

### Method 2: **Check Which Digits Are Used**

You can **eliminate** bases by checking if the number contains invalid digits:

#### Example: `89`

```
Can it be Binary?    ❌ NO  (Binary only uses 0,1. Contains 8,9)
Can it be Octal?     ❌ NO  (Octal only uses 0-7. Contains 8,9)
Can it be Decimal?   ✅ YES (Decimal uses 0-9)
Can it be Hex?       ✅ YES (Hex uses 0-9,A-F)

Conclusion: Must be Decimal or Hex (need more context)
```

#### Example: `ABC`

```
Can it be Binary?    ❌ NO  (Contains A,B,C)
Can it be Octal?     ❌ NO  (Contains A,B,C)
Can it be Decimal?   ❌ NO  (Decimal doesn't use letters)
Can it be Hex?       ✅ YES (Hex uses 0-9,A-F)

Conclusion: Must be Hexadecimal
```

#### Example: `765`

```
Can it be Binary?    ❌ NO  (Binary only uses 0,1)
Can it be Octal?     ❌ NO  (Octal only uses 0-7. Contains 7 is OK, but digits must be 0-7)
Wait, let me check: 7,6,5 - all are ≤ 7
Can it be Octal?     ✅ YES (All digits are 0-7)
Can it be Decimal?   ✅ YES (All digits are 0-9)
Can it be Hex?       ✅ YES (All digits/letters are valid)
---

## Why this matters for encoding:

### ASCII (0-127):

```

Uses only 7 bits, so values 0-127
0 = null character
65 = 'A'
97 = 'a'
127 = delete character

Values 128-255 are NOT used in ASCII

```

### Extended ASCII / Latin-1 (0-255):

```

Uses full 8 bits, so values 0-255
0-127 = Same as ASCII
128-255 = Extended characters (é, ñ, ©, etc.)

128 = €
233 = é
241 = ñ

```

### UTF-8 (uses multiple bytes):

```

For characters beyond 255, UTF-8 uses multiple bytes:

- 'A' = 1 byte: [65] (0-127 range)
- 'é' = 2 bytes: [195, 233] (uses 128-255 range)
- '中' = 3 bytes: [228, 184, 173] (uses 128-255 range)
- '😀' = 4 bytes: [240, 159, 152, 128] (uses 128-255 range)

````

## Practical example:

```javascript
// One byte can only store 0-255
const buffer = Buffer.alloc(1); // Create 1 byte

buffer[0] = 72; // ✅ OK (within 0-255)
buffer[0] = 255; // ✅ OK (maximum value)
buffer[0] = 256; // ❌ Wraps to 0 (overflow!)
buffer[0] = 300; // ❌ Wraps to 44 (overflow!)

console.log(buffer[0]); // Can only be 0-255
````

## Why 255 specifically?

```
8 bits:
Bit position:  7  6  5  4  3  2  1  0
Power of 2:   128 64 32 16  8  4  2  1
              ↓  ↓  ↓  ↓  ↓  ↓  ↓  ↓
All 1s:        1  1  1  1  1  1  1  1  = 255

Calculate: 128+64+32+16+8+4+2+1 = 255
```

## Real-world analogy:

Think of a **3-digit odometer** on a car:

- Can show: 000 to 999 (1000 possible values)
- After 999, it wraps back to 000

Similarly, **1 byte (8 bits)**:

- Can show: 00000000 to 11111111 (256 possible values)
- In decimal: 0 to 255
- After 255, it wraps back to 0

## In images (RGB colors):

```javascript
// Each color channel is 1 byte (0-255)
rgb(255, 0, 0); // Pure red (max red, no green, no blue)
rgb(0, 255, 0); // Pure green
rgb(128, 128, 128); // Gray (middle value)
rgb(0, 0, 0); // Black (minimum)
rgb(255, 255, 255); // White (maximum)
```

## Summary:

| Concept                   | Value          |
| ------------------------- | -------------- |
| **1 byte**                | 8 bits         |
| **Possible combinations** | 2^8 = 256      |
| **Range**                 | 0 to 255       |
| **Minimum**               | 00000000 = 0   |
| **Maximum**               | 11111111 = 255 |

**TL;DR**: 0-255 is the range of numbers you can represent with 8 bits (1 byte). It's like having 256 slots numbered from 0 to 255! 🎯

**Great question!** Let me explain binary to decimal conversion:

## What are these number systems?

### Binary (Base-2):

- Uses only **2 digits**: 0 and 1
- Used by computers (on/off, true/false)

### Decimal (Base-10):

- Uses **10 digits**: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
- What humans use in everyday life

## How Binary Works:

Each position represents a **power of 2**:

```
Position:     7      6     5     4     3     2     1     0
Power of 2:  2^7    2^6   2^5   2^4   2^3   2^2   2^1   2^0
Value:       128    64    32    16     8     4     2     1
```

## Converting Binary → Decimal:

### Example 1: `01001000` (letter 'H')

```
Binary:    0    1    0    0    1    0    0    0
           ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Position:  128  64   32   16   8    4    2    1
           ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Multiply:  0×128 1×64 0×32 0×16 1×8 0×4 0×2 0×1
           ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Result:    0  + 64 + 0  + 0  + 8 + 0 + 0 + 0  = 72

Decimal: 72 (which is ASCII 'H')
```

### Example 2: `11111111` (maximum value)

```
Binary:    1    1    1    1    1    1    1    1
           ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Position:  128  64   32   16   8    4    2    1
           ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Result:    128+ 64 + 32 + 16 + 8 + 4 + 2 + 1  = 255

Decimal: 255
```

### Example 3: `00000101` (simple number)

```
Binary:    0    0    0    0    0    1    0    1
           ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Position:  128  64   32   16   8    4    2    1
           ↓    ↓    ↓    ↓    ↓    ↓    ↓    ↓
Result:    0  + 0  + 0  + 0  + 0 + 4 + 0 + 1  = 5

Decimal: 5
```

## Step-by-Step Method:

**To convert binary to decimal:**

1. Write the binary number
2. Write powers of 2 above each bit (right to left: 1, 2, 4, 8, 16...)
3. Multiply each bit by its power of 2
4. Add all results together

```txt
Example: 1011

     1    0    1    1
     ↓    ↓    ↓    ↓
     8    4    2    1     (powers of 2)
     ↓    ↓    ↓    ↓
    1×8  0×4  1×2  1×1    (multiply)
     ↓    ↓    ↓    ↓
     8  + 0  + 2  + 1     (add)

= 11 (decimal)
```

## Converting Decimal → Binary:

**Method: Keep dividing by 2, track remainders**

### Example: Convert 72 to binary

```
72 ÷ 2 = 36  remainder 0  ← Read from bottom to top
36 ÷ 2 = 18  remainder 0
18 ÷ 2 = 9   remainder 0
9  ÷ 2 = 4   remainder 1
4  ÷ 2 = 2   remainder 0
2  ÷ 2 = 1   remainder 0
1  ÷ 2 = 0   remainder 1

Binary: 01001000 (reading remainders bottom to top)
```

## Quick Reference Table:

| Binary   | Decimal | ASCII Character |
| -------- | ------- | --------------- |
| 00000000 | 0       | null            |
| 00000001 | 1       | -               |
| 00000101 | 5       | -               |
| 01000001 | 65      | A               |
| 01001000 | 72      | H               |
| 01100101 | 101     | e               |
| 01101100 | 108     | l               |
| 01101111 | 111     | o               |
| 11111111 | 255     | ÿ               |

## In JavaScript:

```javascript
// Binary to Decimal
parseInt("01001000", 2); // 72
parseInt("11111111", 2); // 255

// Decimal to Binary
(72).toString(2); // '1001000'
(255).toString(2); // '11111111'

// With padding to 8 bits
(72).toString(2).padStart(8, "0"); // '01001000'
```

## Why computers use binary:

```
Electricity has 2 states:
- ON  = 1
- OFF = 0

That's why computers "think" in binary!
```

## Real example with text: -

```javascript
const text = "Hi";

// Each character → decimal → binary
'H' → 72  → 01001000
'i' → 105 → 01101001

// Computer stores:
01001000 01101001
```

**Great question!** There are several number systems (bases) we can convert to/from. Let me show you:

## Common Number Systems:

### 1️⃣ **Binary (Base-2)**

- Digits: `0, 1`
- Used by: Computers internally

```
Example: 1010 = 10 (decimal)
```

### 2️⃣ **Octal (Base-8)**

- Digits: `0, 1, 2, 3, 4, 5, 6, 7`
- This means each digit can be from 0 to 7, not more than 7 like 8 or 9
- Used by: Unix file permissions, legacy systems

```
Example: 12 (octal) = 10 (decimal)
chmod 755 → rwxr-xr-x
```

### 3️⃣ **Decimal (Base-10)**

- Digits: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
- Used by: Humans everywhere
- This means each digit can be from 0 to 9

```

### 4️⃣ **Hexadecimal (Base-16)**

- Digits: `0-9, A-F` (A=10, B=11, C=12, D=13, E=14, F=15)
- Used by: Colors, memory addresses, hashes

```

Example: A (hex) = 10 (decimal)
Color: #FF5733 → Red: 255, Green: 87, Blue: 51

```

### 5️⃣ **Base64**

- Digits: `A-Z, a-z, 0-9, +, /`
- Used by: Encoding binary data as text (emails, URLs, images in HTML)

```

Example: "Hello" → "SGVsbG8="

```

### 6️⃣ **Base32**

- Digits: `A-Z, 2-7`
- Used by: QR codes, Google Authenticator

```

Less common than Base64

```

## Conversion Examples:

### Same number in different bases:

| Binary   | Octal | Decimal | Hexadecimal |
| -------- | ----- | ------- | ----------- |
| 0000     | 0     | 0       | 0           |
| 0001     | 1     | 1       | 1           |
| 1010     | 12    | 10      | A           |
| 1111     | 17    | 15      | F           |
| 11111111 | 377   | 255     | FF          |

### Detailed conversion of 255:

11010111: = (215)₁₀ = (D7)₁₆ = (327)₈

```

Binary: 11111111
Octal: 377
Decimal: 255
Hexadecimal: FF

```

## How Each System Works:

### **Binary (Base-2)**: Powers of 2

```

Position: 7 6 5 4 3 2 1 0
Power: 128 64 32 16 8 4 2 1

1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10 (decimal)

```

### **Octal (Base-8)**: Powers of 8

```

Position: 2 1 0
Power: 64 8 1

12 (octal) = 1×8 + 2×1 = 10 (decimal)

```

### **Hexadecimal (Base-16)**: Powers of 16

```

Position: 1 0
Power: 16 1

A (hex) = 10×1 = 10 (decimal)
FF (hex) = 15×16 + 15×1 = 255 (decimal)

````

## JavaScript Conversions:

```javascript
const num = 255;

// Decimal to other bases:
num.toString(2); // '11111111' (binary)
num.toString(8); // '377' (octal)
num.toString(16); // 'ff' (hexadecimal)

// Other bases to decimal:
parseInt("11111111", 2); // 255 (from binary)
parseInt("377", 8); // 255 (from octal)
parseInt("ff", 16); // 255 (from hexadecimal)

// Binary to hexadecimal (via decimal):
parseInt("11111111", 2).toString(16); // 'ff'

// Hexadecimal to binary:
parseInt("ff", 16).toString(2); // '11111111'
````

## Real-World Uses:

### **Hexadecimal (most common after decimal):**

#### Colors:

```javascript
#FF5733
  ↓↓ Red: FF = 255
    ↓↓ Green: 57 = 87
      ↓↓ Blue: 33 = 51
```

#### Memory addresses:

```
0x7fff5fbff5c0  (pointer address)
```

#### Hash values:

```
MD5: 5d41402abc4b2a76b9719d911017c592
```

### **Octal:**

#### File permissions (Unix/Linux):

```bash
chmod 755 file.txt
  ↓↓↓
  7 = 111 (rwx) - owner
  5 = 101 (r-x) - group
  5 = 101 (r-x) - others
```

### **Base64:**

#### Embed images in HTML:

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..." />
```

#### JWT tokens:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0...
```

## Conversion Chart:

```
Decimal → Binary:    255 → 11111111
Decimal → Octal:     255 → 377
Decimal → Hex:       255 → FF

Binary → Decimal:    11111111 → 255
Binary → Hex:        11111111 → FF
Binary → Octal:      11111111 → 377

Hex → Decimal:       FF → 255
Hex → Binary:        FF → 11111111

Octal → Decimal:     377 → 255
Octal → Binary:      377 → 11111111
```

## Quick Reference:

| Base   | Name        | Digits              | Common Use             |
| ------ | ----------- | ------------------- | ---------------------- |
| **2**  | Binary      | 0-1                 | Computer internals     |
| **8**  | Octal       | 0-7                 | File permissions       |
| **10** | Decimal     | 0-9                 | Human counting         |
| **16** | Hexadecimal | 0-9, A-F            | Colors, memory, hashes |
| **32** | Base32      | A-Z, 2-7            | QR codes, 2FA          |
| **64** | Base64      | A-Z, a-z, 0-9, +, / | Encoding data as text  |

## Practical Example - Color Conversion:

```javascript
// CSS color in hex
const hexColor = "#FF5733";

// Extract RGB values
const r = parseInt(hexColor.slice(1, 3), 16); // FF → 255
const g = parseInt(hexColor.slice(3, 5), 16); // 57 → 87
const b = parseInt(hexColor.slice(5, 7), 16); // 33 → 51

console.log(`rgb(${r}, ${g}, ${b})`); // rgb(255, 87, 51)

// Convert back
const toHex = (n) => n.toString(16).padStart(2, "0");
const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
console.log(hex.toUpperCase()); // #FF5733
```

## Summary:

Most common conversions you'll encounter:

1. **Binary ↔ Decimal** (understanding how computers work)
2. **Hexadecimal ↔ Decimal** (colors, memory addresses)
3. **Base64 ↔ Binary** (encoding data for transmission)
4. **Octal ↔ Decimal** (file permissions)

**The most important for web development: Binary, Decimal, Hexadecimal, and Base64!** 🎯

| Conversion           | Base            | Common Use Case                 |
| -------------------- | --------------- | ------------------------------- |
| **Binary ↔ Decimal** | 2 ↔ 10          | CPU instructions, hardware data |
| **Hex ↔ Decimal**    | 16 ↔ 10         | colors, memory, debugging       |
| **Base64 ↔ Binary**  | (text encoding) | network data, APIs, JWT, email  |
| **Octal ↔ Decimal**  | 8 ↔ 10          | Unix permissions                |

---

---

### Binary Example: 1011

```
Position:    3       2       1       0
            ↓       ↓       ↓       ↓
Digit:      1       0       1       1
            ↓       ↓       ↓       ↓
Power:      2³      2²      2¹      2⁰
            ↓       ↓       ↓       ↓
Value:      8       4       2       1
            ↓       ↓       ↓       ↓
Calc:     1×8     0×4     1×2     1×1
            ↓       ↓       ↓       ↓
         = 8     + 0     + 2     + 1  = 11 (in decimal)
```

## 🧮 1️⃣ Binary → Decimal

Binary is **base 2**, so each bit position represents a power of 2:

```
Position: 7 6 5 4 3 2 1 0
Binary: 1 0 1 1 0 1 0 1
Power: 2⁷ 2⁶ 2⁵ 2⁴ 2³ 2² 2¹ 2⁰
Value: 128 64 32 16 8 4 2 1
```

### Decimal Example: 5,432

```
Position:    3       2       1       0
            ↓       ↓       ↓       ↓
Digit:      5       4       3       2
            ↓       ↓       ↓       ↓
Power:     10³     10²     10¹     10⁰
            ↓       ↓       ↓       ↓
Value:   1,000     100      10       1
            ↓       ↓       ↓       ↓
Calc:    5×1000  4×100   3×10    2×1
            ↓       ↓       ↓       ↓
         = 5000  + 400   + 30    + 2  = 5,432
```

Now, add up all `1` bits:
`128 + 64 + 16 + 4 + 2 = 214`

✅ **Decimal = 214**

---

## 🔢 2️⃣ Binary → Octal (base 8)

Group binary digits into groups of **3 bits** from **right to left** (since 2³ = 8):

Binary: `11010110`
→ Grouped: `11 010 110`
Pad left with zeros to make each 3 bits: `011 010 110`

Now convert each group to decimal:

| Group | Binary | Decimal |
| ----- | ------ | ------- |
| 011   | 3      |         |
| 010   | 2      |         |
| 110   | 6      |         |

Combine: `326`

✅ **Octal = 326**

```
Example 1: Octal 265 → DecimalOctal: 265₈Digit:        2         6         5
Position:     2         1         0
Power:        8²        8¹        8⁰
Value:        64        8         1
Result:     2×64      6×8       5×1
            = 128   +  48    +   5   = 181 (decimal)
```

---

## 🎨 3️⃣ Binary → Hexadecimal (base 16)

Group into **4 bits** from right (since 2⁴ = 16):

Binary: `11010110`
→ Groups: `1101 0110`

Convert each 4-bit group:

| Group | Binary | Decimal | Hex |
| ----- | ------ | ------- | --- |
| 1101  | 13     | D       |     |
| 0110  | 6      | 6       |     |

Combine: `D6`

✅ **Hexadecimal = D6**

### Hex: B5₁₆

```
Digit:        B         5
              ↓         ↓
Decimal:     11         5         (B = 11 in decimal)
Position:     1         0
Power:       16¹       16⁰
Value:       16         1
Result:    11×16      5×1
            = 176   +   5   = 181 (decimal)
```

- A-F: - represent 10-15 in decimal.

---

## 💡 Quick Summary

| Representation | Base | Value      |
| -------------- | ---- | ---------- |
| Binary         | 2    | `11010110` |
| Decimal        | 10   | `214`      |
| Octal          | 8    | `326`      |
| Hexadecimal    | 16   | `D6`       |

---

## ⚙️ General Conversion Logic

| From             | To                                      | How |
| ---------------- | --------------------------------------- | --- |
| Binary → Decimal | multiply each bit × (2ⁿ) and add        |     |
| Binary → Octal   | group bits in 3s                        |     |
| Binary → Hex     | group bits in 4s                        |     |
| Decimal → Binary | divide by 2 repeatedly, take remainders |     |
| Decimal → Octal  | divide by 8 repeatedly                  |     |
| Decimal → Hex    | divide by 16 repeatedly                 |     |

---


