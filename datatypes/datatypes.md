# **DataTypes**

```text
The key to mastering any programming language is knowing how to work with data — understanding, transforming, and manipulating all types of data structures and types.
```

> ## **_Datatypes Flow Diagram⬇️_**

![datatypes flow diagram](./imgs/datatypesflowdiagram.png)

- NOTE: Datatypes differs based on different programming language and there sizes

## **TypeCheck**

There are two types of programming language: -

1. Statically Typed Programming language: - java, c , c++, go, rust, ts, kotin etc
2. Dynamically Typed Programming language: - python, js, php etc

> ### **Application/Language-level Type-Checking (e.g., Java DTOs, Pydantic BaseModel)** 🆚 **Database/ORM/ODM-level Type-Checking (e.g., JPA @Entity, SQLAlchemy/SQLModel)⬇️**

- Like in java **Jpa-hibernate** if the class is created using **@entity** annotation (jakarta validation will not work on @entity tables/class, will only work on normal DTO) then the normal java DTO type-check will fail even after adding **@validate**
- similarly in python **sqlalchamy** if the class is created using the **SQLModel** (pydantic validations will not work on sqlModel table, will only work on baseModel), then the normal pydantic type-check **(BaseModel)** will fail. ( Pydantic validation does happen when we instantiate a SQLModel object.)
