# **TypesScripts**

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

## **Type Extraction is TS: - _We can only use bracket-notation to extract any single property for the type or interface, we cannot use the dot-notation_

### **[🔗 Type vs Interface](./tslang/typeVSinterface.md)**

### **[🔗 Utility in ts](./tslang/tsUtilities.md)**

### **[🔗 Decorator in ts](./tslang/decoratorints.md)**

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


### **Type assertion in ts: -**
