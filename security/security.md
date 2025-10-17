# **SECURITY**

> **Never use the secret/sensitive api key(env vars) in the frontend**, cause all the keys are visible from the browser dev-tool, **always use all very-very senisitive key from the backend/server only**

## **CORS(Cross-origin resources sharing): -** _It is a client-side/ browser-based security feature, only applies to web pages running in a browser. (So bydefualt the browser blocks all the request, if` cors are not config` to allow the request from the domains)_

- It does not apply to mobile apps, desktop apps, CLI tools/ terminals(like Node.js, Python scripts, curl, Postman, etc), Old or hacked browsers etc
- CORS is not a real security mechanism for your API — it’s just a browser safety feature.
  If you want to protect your data from mods, scripts, or mobile apps, you need server-side checks (auth, tokens, rate limiting, request validation)

## **CSRF (Cross-Site Request Forgery): -** _attacker tricks a logged-in user into running code that sends a request (like login, logout, delete account)._

- **[🔗Fetch security](./fetchAttack/fetchSecurity.js)**

## **XSS(Cross Site Scripting) Attact**

## **SQL Injection**

## **API Security**

- [🔗RestAPi Security](../rest%20api/restapi.md#api-security)
