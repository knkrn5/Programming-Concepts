# 🧠 **TypeScript Utility Types Cheat Sheet**

---

### **1. `Partial<T>`**

- Makes **all properties optional**

```ts
type Person = { name: string; age: number };
type PartialPerson = Partial<Person>;
// { name?: string; age?: number }
```

✅ Use: Update forms, partial objects.

---

### **2. `Required<T>`**

- Makes **all properties required**

```ts
type PartialPerson = { name?: string; age?: number };
type FullPerson = Required<PartialPerson>;
// { name: string; age: number }
```

✅ Use: Ensure object has all fields.

---

### **3. `Readonly<T>`**

- Makes **all properties readonly**

```ts
type Person = { name: string; age: number };
type ReadonlyPerson = Readonly<Person>;
// { readonly name: string; readonly age: number }
```

✅ Use: Prevent mutation.

---

### **4. `Pick<T, K>`**

- Picks **specific properties** from T

```ts
type Person = { name: string; age: number; email: string };
type NameEmail = Pick<Person, "name" | "email">;
// { name: string; email: string }
```

✅ Use: Limit API response or function parameters.

---

### **5. `Omit<T, K>`**

- Removes **specific properties**

```ts
type Person = { name: string; age: number; email: string };
type WithoutEmail = Omit<Person, "email">;
// { name: string; age: number }
```

✅ Use: Hide sensitive info, remove keys for updates.

---

### **6. `Exclude<T, U>`**

- Removes types from a union

```ts
type Union = "a" | "b" | "c";
type WithoutB = Exclude<Union, "b">;
// "a" | "c"
```

✅ Use: Narrow union types.

---

### **7. `Extract<T, U>`**

- Keeps only types assignable to U

```ts
type Union = "a" | "b" | "c";
type OnlyAorB = Extract<Union, "a" | "b">;
// "a" | "b"
```

✅ Use: Filter union types.

---

### **8. `ReturnType<T>`**

- Gets the **return type of a function**

```ts
function getUser() {
  return { name: "Karan", age: 25 };
}
type User = ReturnType<typeof getUser>;
// { name: string; age: number }
```

✅ Use: Reuse function return type safely.

---

### **9. `Parameters<T>`**

- Gets the **parameters type of a function** as a tuple

```ts
function createUser(id: number, name: string) {}
type Params = Parameters<typeof createUser>;
// [number, string]
```

✅ Use: Reuse function parameters.

---

### **10. `Required<T>` vs `Partial<T>`**

| Type          | Effect       |
| ------------- | ------------ |
| `Partial<T>`  | All optional |
| `Required<T>` | All required |

---

### **11. `NonNullable<T>`**

- Removes `null` and `undefined`

```ts
type Name = string | null | undefined;
type CleanName = NonNullable<Name>;
// string
```

✅ Use: Make sure a type is always defined.

---

### **12. `Record<K, T>`**

- Creates an object type with **keys K** and **values T**

```ts
type Roles = "admin" | "user";
type RolePermissions = Record<Roles, string[]>;
// { admin: string[]; user: string[] }
```

✅ Use: Map keys to values cleanly.

---

### **13. `Awaited<T>`**

- Extracts the **resolved value of a Promise**

```ts
type PromiseType = Promise<number>;
type Resolved = Awaited<PromiseType>;
// number
```

✅ Use: Async function return types.

---

### **14. `ReturnType<()=>T>` + `Awaited`**

```ts
async function fetchUser() {
  return { id: 1 };
}
type User = Awaited<ReturnType<typeof fetchUser>>;
// { id: number }
```

✅ Use: Combine for async API calls.

---

### **15. Mapped Types**

```ts
type Person = { name: string; age: number };
type ReadonlyPerson = { readonly [K in keyof Person]: Person[K] };
// same as Readonly<T>
```

---

Boss, this sheet covers **90% of interview and real-world TypeScript utility types**.

If you want, I can make a **visual “Type Mapping Cheat Diagram”** showing how `Partial`, `Pick`, `Omit`, `Readonly`, `Record` all transform types — super handy for interviews and memory recall.

Do you want me to make that diagram?
