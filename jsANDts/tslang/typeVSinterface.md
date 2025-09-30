# **Type vs Interfce**

> both `type and interface are used to define object shapes`, but they have some key differences: -

## **1. Basic Usage**

**Using `interface`:**

```ts
interface Person {
  name: string;
  age: number;
}
```

**Using `type`:**

```ts
type Person = {
  name: string;
  age: number;
};
```

✅ Both define the **shape of an object**.

---

## **2. Extending / Inheritance**

**Interface can extend another interface:**

```ts
interface Animal {
  species: string;
}

interface Dog extends Animal {
  breed: string;
}
```

**Type can also extend using intersections:**

```ts
type Animal = { species: string };
type Dog = Animal & { breed: string };
```

- ✅ Both allow you to “extend” types.
- ⚠️ Interface uses `extends`, type uses `&`.

---

## **3. Declaration Merging**

- **Interface supports merging:**

```ts
interface Person {
  name: string;
}
interface Person {
  age: number;
}
const p: Person = { name: "Karan", age: 25 };
```

- ✅ Works perfectly

- **Type does NOT support merging:**

```ts
type Person = { name: string };
type Person = { age: number }; // ❌ Error: Duplicate identifier
```

---

## **4. Union / Intersection Types**

- **Type** can do unions:

```ts
type ID = string | number; // Union type
```

- **Interface** cannot directly do union types — you need `type`.

---

## **5. Other differences**

| Feature                        | `interface`                                                         | `type`               |
| ------------------------------ | ------------------------------------------------------------------- | -------------------- |
| Object shape definition        | ✅                                                                  | ✅                   |
| Extending / inheritance        | `extends`                                                           | `&` (intersection)   |
| Declaration merging            | ✅ Yes                                                              | ❌ No                |
| Union / tuple / primitive type | ❌                                                                  | ✅ Yes               |
| Implemented by class           | ✅                                                                  | ✅ (but less common) |
| Preferred for React props      | Both work, but `interface` often preferred for **extendable props** |                      |

---

## **Utility Difference on both: -**

- _For object utilities (Pick, Omit, Partial, Required, etc.), always produce/returns a type as output_

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Works fine - result is a type
type PublicUser = Omit<User, "password">;
type UserPreview = Pick<User, "id" | "name">;

// You can also do this with types
type Admin = {
  id: number;
  role: string;
  permissions: string[];
};

type AdminPreview = Pick<Admin, "id" | "role">;
```

- _For union utilities (Exclude, Extract), Only make sense with type since interfaces can't represent unions_

```ts
type Status = "pending" | "approved" | "rejected";
type ActiveStatus = Exclude<Status, "rejected">; // 'pending' | 'approved'

// Can't do this with interface since it can't be a union
```
