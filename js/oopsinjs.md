# **_OOPS in javaScripts_**

## **JavaScript: Declare Fields Inside the Constructor (or with Class Fields): -**

1.  Traditional way (pre-ES2022):

    ```javascript
    class User {
      constructor(name, age) {
        this.name = name; // Field created dynamically
        this.age = age;
      }
    }
    ```

2.  Modern (ES2022+) way:

    ````javascript
    class User {
    name;
    age;

        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

    }

        ```
    ````

> ## **Class in js = Template/Blueprint⬇️**

```javascript
class User {
  #password;

  // this is constructor in js
  constructor(name, password) {
    this.name = name;
    this.#password = password; // private
  }

  getPassword() {
    return this.#password;
  }

  setPassword(newPass) {
    this.#password = newPass;
  }
}
```

## **Creating/ Initializing Object in py = Instance Created from the Class Blueprint⬇️**

```javascript
const u = new User("Karan", "secret");
console.log(u.getPassword()); // ✅ "secret"
u.setPassword("newpass");
console.log(u.getPassword()); // ✅ "newpass"
console.log(u.#password); // ❌ SyntaxError: Private field not accessible
```

> ## **Access Modifiers in js**

```javascript
class User {
  name = "Karan"; // public
  _role = "Admin"; // protected-ish
  #password = "123456"; // truly private

  getPassword() {
    return this.#password;
  }
}

const u = new User();
console.log(u.name); // ✅ "Karan"
console.log(u._role); // ✅ but discouraged
console.log(u.#password); // ❌ SyntaxError
```

- so in javascript any field without \_ underscore or # hashtag is public
