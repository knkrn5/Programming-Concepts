# **Type vs Interfce**

> Both `type and interface are used to define object shapes`, but they have some key differences: -

## **1. Basic Usage**

> type can be used to alias any type (including primitive, tuple, function, etc.), but interface can only be used to describe objects.

**Using `type`:**

```ts
type Person = {
  name: string;
  age: number;
};

//Direct way
type ID = string | number;
```

- type supports direct single type assignment, while interface must always be in object

**Using `interface`:**

- The interface keyword doesn't support direct assignment like type

```ts
interface Person {
  name: string;
  age: number;
}
```

## **2. Extending / Inheritance**

**Interface can extend another interface:**

```ts
interface Animal {
  species: string;
}

interface Dog extends Animal {
  breed: string;
} // {species:string; breed:string;}
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

- **Interface** cannot directly do union types — you need `type`. |

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
// The interface keyword doesn't support direct assignment like that, so instead we can do like this
interface PublicUser extends Omit<User, "password"> {} // This works, but it's more verbose

// You can also do this with types
type Admin = {
  id: number;
  role: string;
  permissions: string[];
};

type AdminPreview = Pick<Admin, "id" | "role">;
//with interface
interface AdminPreview extends Pick<Admin, "id" | "role"> {}
```

- _For union utilities (Exclude, Extract), Only make sense with type since interfaces can't represent unions_

```ts
type Status = "pending" | "approved" | "rejected";
type ActiveStatus = Exclude<Status, "rejected">; // 'pending' | 'approved'

// Can't do this with interface since it can't be a union
```
