# **TypesScripts**

> Flowchart: -

1. for ts file execttion

2. for ts files compilation
   1. tsc (TypeScript Compiler): - everything it will compile will be based on config file
      1. config file: - this config file is used by both `tsc` and `tserver` cli.
         1. tsconfig.json
         2. jsconfig.json

> TypeScript only compiles .ts files — it doesn't copy .html, .js, .css or other static assets

---

## **Type Declaration is TS**

1. string: - used for string
2. number: - used for number
3. bigint: -
4. boolean:- used for true and false
5. `array<type>` or any[]: - used for array
6. object: - for declaring any Non-Primitive Type
7. Record: - for declaring key-value pair
8. enum
9. Tuple
10. symbol
11. void: -
12. any: - can declared any datatype
13. unknown: - force type safe check before using that variable
14. null
15. undefined

## **Type Convertion is JS: -** _Number(), String(), Boolean() are built-in JavaScript constructor functions that convert a value to a number, string, or boolean at runtime._

## **Type Extraction/Indexed Access Types in TS: -** _We can only use bracket-notation to extract any single property for the type or interface, we cannot use the dot-notation_

### **[🔗 Type vs Interface](./tslang/typeVSinterface.md)**

### **[🔗 Utility in ts](./tslang/tsUtilities.md)**

### **[🔗 Decorator in ts](./tslang/decoratorints.md)**

### js 🆚 ts

```ts
// need to learn about these types of type checking more in detail
const conn = navigator.connection as NetworkPropTypes;

const battery = await (
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

### **Type assertion in ts: -**

### **TypeScript VS Zod: -** _Both ts and zod uses native JavaScript (typeof, instanceof, Array.isArray, etc.) for typechecking, subtle difference is ts checks at compile time while zod checks at runtime._

- ts will only check the type when we build/compile the app, but after compling the ts files will get convert to js and All type annotations are erased and then that build will not check for the type again, but with zod, the zod code remains in that build/compiled js files and that will always check for the types at runtime.
- ts cannot validate the dynamic data like that fetched for database/api, but with zod it will validate the dynamic data with our schema.
- ts does throw error when we even assign the wrong datatype value, but zod will throw the runtime error and will crash application if unhandled.
- zod cannot be used like ts to statically assign the types if can only be used to validate the types but `we can create/infer the the ts type for zod schema` and then assign that ts type statistically and use zod schema for validations.
