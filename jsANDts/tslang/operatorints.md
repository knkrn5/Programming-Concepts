# **Ts Specific Operators**

1. `keyof` — Key Operator

   ```ts
   // Used to extract the keys of an object type as a union.
   type User = { name: string; age: number };
   type UserKeys = keyof User; // "name" | "age"
   ```

2. `typeof` — Type from Variable

   - JavaScript typeof (runtime - value level), TypeScript typeof (compile-time - type level)

   ```ts
   //Extracts type from an actual value.
   const person = { name: "Karan", age: 20 };
   type PersonType = typeof person; // infers the type
   ```

3. `extends` — Type Constraint / Check

   ```ts
   type IsString<T> = T extends string ? true : false;
   ```

4. `in` — Mapped Types

   ```ts
   //Loops over a union of keys and builds an object type.
   type Keys = "name" | "email";
   type Obj = { [K in Keys]: string };
   ```

5. `readonly` — Property Modifiers

   ```ts
   type User = {
     readonly id: number; // can't be changed
     email: string;
   };
   ```

6. `Optional Chaining Operator ?.`

   ```ts
   type User = {
     name?: string; // optional
     age: number; //required
   };
   ```

7. `Nullish Coalescing Operator ??` (TypeScript/ES2020)

8. `is` — Type Guard Return Type
9. `!` (Non-null Assertion Operator)

## **Type Assertion Operator in ts**

1. `as` — Type Assertion Operator
2. `[] and <>` — Index Access & Generics
3. `satisfies` — TS 4.9+ (📌 checks structure)

```ts
//1. Using `as Syntax` (✅ most common & preferred): -
const el2 = document.getElementById("id") as HTMLDivElement;
// 2. Using `Angle-Bracket <Type> Syntax` (⚠️ not allowed in JSX,TSX)
const el1 = <HTMLDivElement>document.getElementById("id");
//3. satisfies operator (NOT a type assertion, but similar)
const obj = {
  name: "Karan",
  age: 25,
} satisfies { name: string; age: number };
```

```ts
let value: unknown = "hello";

// tell TS this is string
let str = value as string;
let num = value as number;
console.log(str.length); // ✅ TS now knows it’s a string

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const;
// All properties become readonly and literal types
```

- `Double Assertion (Escape Hatch)`

```ts
const str = "123" as unknown as number;
```

## **Advance Typescript feature**

1. **Conditional Types: -** Conditional types work like ternary operators for types - they allow you to choose between two types based on a condition

   ```ts
   T extends U ? X : Y

   // Basic conditional type
   type IsString<T> = T extends string ? true : false;

   type A = IsString<string>;  // true
   type B = IsString<number>;  // false
   type C = IsString<"hello">; // true
   ```

2. **infer Operator** — infer lets you extract and capture types within conditional types. (The `infer keyword can only be used within the extends clause of a conditional type`)

   ```ts
   T extends SomeType<infer U> ? U : never //"If T matches SomeType, extract and capture the inner type as U"

   //some exmple ⬇️
   type GetArrayType<T> = T extends Array<infer ElementType>
   ? ElementType
   : never;
   //or
   type GetArrayType<T> = T extends (infer ElementType)[]
   ? ElementType
   : never;

   type Numbers = GetArrayType<number[]>;     // number
   type Strings = GetArrayType<string[]>;     // string
   type NotArray = GetArrayType<string>;      // never

   //more example
   type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

   type Result1 = UnwrapPromise<Promise<string>>;  // string
   type Result2 = UnwrapPromise<Promise<number>>;  // number
   type Result3 = UnwrapPromise<boolean>;          // boolean (not a Promise)

   //Extract Function Return Type

   // Extract Function Parameters

   // Extract Object Property Type
   ```
