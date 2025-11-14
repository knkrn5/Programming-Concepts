# **Number System**

![number-system](./number-system.svg)

## Number Literal Prefixes/Suffixes: -

| Prefix            | Meaning     | Example    | Base |
| ----------------- | ----------- | ---------- | ---- |
| _(no prefix)_     | Decimal     | `33`       | 10   |
| `0` (old C-style) | Octal       | `033`      | 8    |
| `0o` or `0O`      | Octal       | `0o33`     | 8    |
| `0x` or `0X`      | Hexadecimal | `0x33`     | 16   |
| `0b` or `0B`      | Binary      | `0b100001` | 2    |

## Unicode and UTF-8 Encoding

| **Binary Pattern**                    | **Bytes Used** | **Value Range (in Unicode)** | **Meaning / Notes**                                                                             |
| ------------------------------------- | -------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `0xxxxxxx`                            | 1 byte         | U+0000 – U+007F              | Standard ASCII characters (0–127)                                                               |
| `110xxxxx 10xxxxxx`                   | 2 bytes        | U+0080 – U+07FF              | Extended Latin, Greek, Cyrillic, etc.                                                           |
| `1110xxxx 10xxxxxx 10xxxxxx`          | 3 bytes        | U+0800 – U+FFFF              | Most common multilingual characters (e.g., Arabic, Hindi, Chinese, emojis before U+10000)       |
| `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx` | 4 bytes        | U+10000 – U+10FFFF           | Supplementary characters (emoji, rare scripts, historical symbols)                              |
| `10xxxxxx`                            | —              | —                            | **Continuation byte** — cannot appear as the first byte; used only after a multibyte start byte |

- 'A' = 1 byte: [65] (0-127 range)
- 'é' = 2 bytes: [195, 233] (uses 128-255 range)
- '中' = 3 bytes: [228, 184, 173] (uses 128-255 range)
- '😀' = 4 bytes: [240, 159, 152, 128] (uses 128-255 range)
