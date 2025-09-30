# **TypesScripts**

## **Type Declaration is TS**

### **[🔗 Type vs Interface](./tslang/typeVSinterface.md)**

### js 🆚 ts

```ts
// need to learn about these types of type checking more in detail
const conn = navigator.connection as NetworkPropTypes;

const battery = await(
  navigator.getBattery as () => Promise<BatteryPropTypes>
)();

interface UserAgentData {
  getHighEntropyValues(hints: string[]): Promise<UserAgentPropTypes>;
}

const pass: string = (prompt("enter password to access the app") as string)
  .trim()
  .toLowerCase();
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

2. **Infer: -** infer lets you extract and capture types within conditional types. (The `infer keyword can only be used within the extends clause of a conditional type`)

```ts
T extends SomeType<infer U> ? U : never //"If T matches SomeType, extract and capture the inner type as U"

//some exmple ⬇️
type GetArrayType<T> = T extends Array<infer ElementType> 
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

//
```
