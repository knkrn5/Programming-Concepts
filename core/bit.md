Yep — even small integers take 28 bytes 😅 because Python wraps them in a whole object with metadata (type info, reference count, etc.). So Python trades off memory efficiency for flexibility and safety.

## Why 8 bit became important

> This "8-bit" chunk became the industry-standard building block. We gave it a name: the byte.

- In Ancient times: - Memory chips, Data buses, address bus and storage systems are also built around 8-bit bytes and multiples thereof

## Why not 9-bit or 10-bit?

- It would create awkward memory addressing
- Incompatible with existing standards (bytes are 8 bits)
- Harder to design circuits efficiently
- Would waste transistors and make everything more complex

```
🕰️ 5. There were odd-sized architectures once!

DEC PDP-10 had a 36-bit word.

UNIVAC 1100 series used 36 bits too.

Some DSPs (Digital Signal Processors) use 24-bit or 40-bit words today.

But those are special-purpose architectures, not general-purpose CPUs
```

---

- Repetition → each position is independent → use powers

- No repetition → each choice reduces the next options → use factorials

---

## Number evolution

- When early humans needed to count, they used their fingers.

  - When they counted past 10, they ran out of fingers. They had to start a new "group."
  - This idea of "grouping by 10" became the foundation of how we count everything.
  - Because we "group by 10," we only invented ten symbols to write numbers: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  - By doing this, we have just defined a new rule: "Any digit in this new, second column is worth 10 times as much as the first column."

- We decided (by convention) that digits on the LEFT represent LARGER values because:
  - It's easier to read numbers that way (like reading text from left to right in most Western languages).
  - There's no mathematical reason it HAS to be this way. We could have chosen the opposite!, We put the most important digit first.
    - Reading direction: Most early mathematical systems (Arabic numerals, which we use) were developed by cultures that read left-to-right
    - Natural language: We say "five thousand four hundred twenty-one" - we mention the BIGGER units first (thousands before hundreds)
    - Consistency: Writing largest-to-smallest matches how we describe quantities: "3 hours, 25 minutes, 14 seconds"
- ## Egyptian hieroglyphics and some ancient number systems actually wrote numbers with smaller values on the left!

> **so this is the reason in computer binary we are increasing every left most with 2x , for making the computer understandable because computer has only 2 fingers(0,1) like 10x is human understandable becuase human has 10 fingers**

- AryaBhatta is `credited for formalizing the use of zero as a number and a placeholder/place-value in the decimal system` around the 5th century AD. But was discovered much earlier in other cultures.
- so zero is not discovered by any one it is just a shape that may have been used my many ancient people at that time(u might have seen child drawing a circle), so it was just the matter of formalizing zero in arthematic for `placeholder`, and before zero shape people have been `using different shapes for placeholder`
  - So zero is just a oval/Circle space, similar to O in alphabet, it today the shape would have been different still thing would have worked the same/perfectly.
- ALL mathematical symbols: +, -, ×, ÷, =, π, ∞ - they're all just agreed-upon shapes for concepts!
- Brahmagupta (628 CE): Formalized zero as a number in his text, the Brahmasphutasiddhanta. He was the first to write down rules for how to add, subtract, and multiply with zero, and also introduced the concept of negative numbers ("debts").

---

## Why do we use power of 2 in computer systems?

🔢 Now add one more bit

Now you have 2 bits.

```
Each bit can be 0 or 1, so you can form these:

00
01
10
11
```

That’s 4 possibilities → 2 \* 2 = 4 = 2²

- Binary Lorgarithm: - log₂(x)

> - So here only have 2 unique digits, so whats matter the number positions(bit) we are given and condion that digits can repeat themselfs in any position.

---

| Data type              | Size              | Range           | Used for                |
| ---------------------- | ----------------- | --------------- | ----------------------- |
| `uint8` / `char`       | 1 byte (8 bits)   | 0–255           | small values (like 0–3) |
| `uint16` / `short`     | 2 bytes (16 bits) | 0–65,535        | medium values           |
| `uint32` / `int`       | 4 bytes (32 bits) | 0–4,294,967,295 | normal integers         |
| `uint64` / `long long` | 8 bytes (64 bits) | huge numbers    |                         |

---

bit only represent that it can create numbers/combinations from 1 to 4,294,967,296 using 32 bits

---

A 32-bit CPU can process 32 bits (4 bytes) at once.
That means:

- CPU registers are 32 bits wide.
- It reads/writes memory in 4-byte chunks efficiently.
- But it doesn’t mean every variable uses 4 bytes.

---

- Notice how each place value is 10 times bigger than the one to its right. We get these values by multiplying by 10 each time:
- Each place is 8 times greater than the one to its right.
- This means each place value is 2 times bigger than the one to its right.

---

## so 2^10 is kb and 2^20 is mb and so on ? so for desigin memory why did we went for 10 incremental and not 11, 12, 13 ?

- Early computer engineers wanted to use familiar decimal prefixes (kilo, mega, etc.) but had to work with binary memory sizes. So 1024 is the closest power of 2 to 1000, making it a natural compromise between binary and decimal systems.

---

## Questions

1. why dont we group in decimal when we group in octal and hexadecimal?
   Grouping is just a SHORTCUT for convenience - it's not the only way to convert numbers.

2. if decimal dont align with binary then why do we need to call it base 10(decimal) when we would have something else?
   We call it base 10 because it uses 10 unique digits (0-9) to represent values, which is the standard in everyday life.

3. When ever we create memory card or Ram why do we go in table of 2 and not like 1 , 2, 3 , 4 ,5, 6 ,7 ,8?
   Because computer memory is designed to work with binary (base 2) systems. Memory sizes are typically powers of 2, because it aligns perfectly with how data is stored and accessed in binary form. This makes addressing and managing memory more efficient for the hardware.
   | Bits | Possible Combinations | Range (byte) |
   | :---- | :-------------------- | :---- |
   | 1-bit | 2 | 0–1 |
   | 2-bit | 4 | 0–3 |
   | 3-bit | 8 | 0–7 |
   | 4-bit | 16 | 0–15 |
   | 5-bit | 32 | 0–31 |
   | 6-bit | 64 | 0–63 |
   | 7-bit | 128 | 0–127 |
   | 8-bit | 256 | 0–255 |

4. what is the reason that we go 1024 increament in memory and not 1000 or anything else ?

- Since computers use binary, powers of 2 are the most natural and efficient increments:

2¹⁰ = 1024
2²⁰ = 1,048,576 (1 MB)
2³⁰ = 1,073,741,824 (1 GB)
