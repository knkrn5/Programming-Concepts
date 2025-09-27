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