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
