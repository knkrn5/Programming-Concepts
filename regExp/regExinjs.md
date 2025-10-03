# **Regular Expressions in JavaScript**

## **Creating a Regular Expression**

In JavaScript, you can create a regular expression in two ways:

1. **Using Literal Notation**: This is the most common way to create a regex. You enclose the pattern in slashes (`/`).

   ```javascript
   const regex = /pattern/;
   regex.test("string to test");
   ```

2. **Using the RegExp Constructor**: This method is useful when you need to create a regex dynamically.

   ```javascript
   const regex = new RegExp("pattern");
   regex.test("string to test");
   ```

## **Common Regex Patterns**

1. **Matching a Specific String**:

   ```javascript
   const regex = /hello/;
   ```

2. **Matching Any Character**:

   ```javascript
   const regex = /h.llo/; // Matches "hello", "hallo", "hxllo", etc.
   ```

3. **Matching a Range of Characters**:

   ```javascript
   const regex = /[a-z]/; // Matches any lowercase letter
   ```

4. **Matching a Digit**:

   ```javascript
   const regex = /\d/; // Matches any digit
   ```

5. **Matching a Word Boundary**:
   ```javascript
   const regex = /\bword\b/; // Matches "word" as a whole word
   ```

| Pattern | Meaning                       | Example                                                |       |                            |
| ------- | ----------------------------- | ------------------------------------------------------ | ----- | -------------------------- |
| `.`     | Any single character          | `/./` matches `"a"` or `"1"`                           |       |                            |
| `^`     | Start of string               | `/^Hi/` matches `"Hi there"`                           |       |                            |
| `$`     | End of string                 | `/end$/` matches `"The end"`                           |       |                            |
| `*`     | 0 or more                     | `/lo*/` matches `"l"`, `"lo"`, `"loo"`                 |       |                            |
| `+`     | 1 or more                     | `/lo+/` matches `"lo"`, `"loo"`                        |       |                            |
| `?`     | 0 or 1                        | `/colou?r/` matches `"color"` and `"colour"`           |       |                            |
| `{n}`   | Exactly n times               | `/a{3}/` matches `"aaa"`                               |       |                            |
| `{n,}`  | n or more                     | `/a{2,}/` matches `"aa"`, `"aaa"`, etc                 |       |                            |
| `{n,m}` | Between n and m times         | `/a{2,4}/` matches `"aa"`, `"aaa"`, `"aaaa"`           |       |                            |
| `[]`    | Match any one in the brackets | `/[abc]/` matches `"a"`, `"b"`, or `"c"`               |       |                            |
| `[^]`   | NOT in the brackets           | `/[^abc]/` matches anything except `"a"`, `"b"`, `"c"` |       |                            |
| `\d`    | Digit [0-9]                   | `/\d/` matches `"5"`                                   |       |                            |
| `\D`    | Non-digit                     | `/\D/` matches `"a"`                                   |       |                            |
| `\w`    | Word character [a-zA-Z0-9_]   | `/\w/` matches `"a"` or `"1"` or `"_"`                 |       |                            |
| `\W`    | Non-word character            | `/\W/` matches `"!"`, `" "`                            |       |                            |
| `\s`    | Whitespace                    | `/\s/` matches `" "`                                   |       |                            |
| `\S`    | Non-whitespace                | `/\S/` matches `"a"`                                   |       |                            |
| `       | `                             | OR                                                     | `/yes | no/`matches`"yes"`or`"no"` |
| `()`    | Group                         | `/(ab)+/` matches `"ab"`, `"abab"`                     |       |                            |
