# **_OOPS in javaScripts_**

>## **Access Modifiers in js**

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
