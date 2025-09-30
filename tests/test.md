# **TypesScripts**

## **Type Declaration is TS**

```ts
interface typeProps {
  func: (a: number) => void; // function type defining old way
  func2(a: string, b: number): void | null; // function type defining modern way
}
```

### js 🆚 ts



```ts
let user: [string, number, boolean] = ["Alice", 25, true]; // This is a tuple type in ts
```

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
