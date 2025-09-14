# **DataTypes**

```text
The key to mastering any programming language is knowing how to work with data — understanding, transforming, and manipulating all types of data structures and types.
```

> ## **_Datatypes Flow Diagram⬇️_**

![datatypes flow diagram](./datatypes-imgs/datatypesflowdiagram.png)

### Types of Brackets we have: -

1. **Parentheses ( ) : -** _In Programming_

   - In python, data in brackets like ("name", "age", "gender") **represents tuple**

2. **Square Brackets [ ] : -** _In programming square bracket generally represents array like in js and py_

   ```js
   // **🎯 Types of array**
   // 1. Homogeneous array
   [1, 2, 3, 4, 5]; // All elements are of the same type (numbers)
   ["apple", "banana", "cherry"]; // All elements are of the same type (strings)
   [{}, {}, {}, {}]; // All elements are of the same type (objects)

   // 2. Heterogeneous array
   [
     1, // Number
     "hello", // String
     true, // Boolean
     { name: "John" }, // Object
     [
       {}, // First array
       {
         nested: [
           // Nested array inside an object
           {},
           {},
         ],
       },
     ],
     [
       // Second array
       {},
     ],
     [
       // Third array
       {},
     ],
   ];

   // 3. Multidimensional array
   [
     [
       [1, 2, 3], // First sub-array
       [4, 5, 6], // Second sub-array
     ],
     [
       [7, 8, 9], // Third sub-array
       [10, 11, 12], // Fourth sub-array
     ],
   ];
   ```

3. **Curly Brackets { } : -** _In programming curly bracket generally represents object like in js and py_

4. **Angle Brackets < > : -** _Used in HTML/XML tags, template parameters (C++), and some mathematical or technical notations_

- NOTE: Datatypes differs based on different programming language and there sizes

## **TypeCheck**

- **[🔗TypeCheck](./typeCheck.md)**

## **Platform Independent VS Platform dependent**

1. **[🔗Platform dependent](../cpp/cpp.md#c-platform-dependent)**

2. **[🔗Platform Independent](../java/java.md#java-platorm-independent)**

> ### **⭐Application/Language-level Type-Checking (e.g., Java DTOs, Pydantic BaseModel)** 🆚 **Database/ORM/ODM-level Type-Checking (e.g., JPA @Entity, SQLAlchemy/SQLModel)⬇️**

- Like in java **Jpa-hibernate** if the class is created using **@entity** annotation (jakarta validation will not work on @entity tables/class, will only work on normal DTO) then the normal java DTO type-check will fail even after adding **@validate**
- similarly in python **sqlalchamy** if the class is created using the **SQLModel** (pydantic validations will not work on sqlModel table, will only work on baseModel)(Pydantic won't validate the model data unless we parse it. like this `base_model_name(**data` then assigning this to SQLmodel ), then the normal pydantic type-check **(BaseModel)** will fail. ( Pydantic validation does happen when we instantiate a SQLModel object.)
