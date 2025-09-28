# **TYPECHECK**

There are two types of programming language: -

1. **Statically Typed Programming language: -** java, c , c++, go, rust, ts, kotin etc
2. **Dynamically Typed Programming language: -** python, js, php etc

## **Typecheck in Dynamically Typed Typed Programming language: -**

- **TypeCheck in js: -** We use TypeScript, a superset of JavaScript that adds static type checking.

  - [🔗TypesScript](../jsANDts/ts.md)

- **TypeCheck in py** We use Pydantic
  - [🔗Pydantic](../py/pydantic.md)

### **Disabling TypeCheck Exceptional Case: -** There are always exceptional cases in development, which is why tools like TypeScript, ESLint, Pydantic, Pyright, MyPy allow us to disable type checking or linting rules for specific lines.

```ts
// eslint-disable-next-line <rule-name>  // disables the rule for the next line
// eslint-disable-line <rule-name>       // disables the rule for the current line
```

```py
some_risky_function()  # type: ignore
# pyright: ignore[reportGeneralTypeIssues]
```

## **TypeCheck in Schemas**

> ### **⭐Application/Language-level Type-Checking (e.g., Java DTOs, Pydantic BaseModel)** 🆚 **Database/ORM/ODM-level Type-Checking (e.g., JPA @Entity, SQLAlchemy/SQLModel)⬇️**

- Like in java **Jpa-hibernate** if the class is created using **@entity** annotation (jakarta validation will not work on @entity tables/class, will only work on normal DTO) then the normal java DTO type-check will fail even after adding **@validate**
- similarly in python **sqlalchamy** if the class is created using the **SQLModel** (pydantic validations will not work on sqlModel table, will only work on baseModel)(Pydantic won't validate the model data unless we parse it. like this `base_model_name(**data` then assigning this to SQLmodel ), then the normal pydantic type-check **(BaseModel)** will fail. ( Pydantic validation does happen when we instantiate a SQLModel object.)
