1. From C:\Users\User\Desktop\express-throttle run: npm link This reads the current package.json bin field and (re)creates the shim files. If it was linked before under a stale config, running npm link again overwrites the old shim with the new one pointing at ./bin/express-throttle.js.

a) at this path: - C:\Users\User\AppData\Roaming\npm 

2. Check that C:\Users\User\AppData\Roaming\npm has test.cmd and test.ps1 (that's the global npm bin folder for Windows). You already have express-throttle.js there from before — you should now also see test.cmd/test.ps1 alongside it.

3. 

===================================================
1. searches for the package in the current dir via name in package.json file
2. if found -> search for bin key
3. 

=========================================
More workflow: - 
What you're describing is npx <package-spec>, not npx <command-name>. These are two genuinely different things npx can do:

1. npx <command-name> (what we've been doing, e.g. npx test) — npx assumes this is the name of an already-installed/linked command and goes searching for an existing shim (local .bin → global bin → cache). This is the chain we diagrammed. It needs something to already exist.
2. npx <package-spec> — if the argument isn't found as an existing command, or if you give it something that's clearly a package reference (a package name from npm, a git URL, or a local path like . or ./some-folder), npx treats it as "resolve this package, then run its bin, right now" — no linking required at all. It reads that package's bin field itself, on the fly, temporarily, and executes it directly. This is exactly the mechanism behind things like npx create-react-app — you've never linked or installed create-react-app globally, npx just fetches it and runs its bin entry in one shot.

-------------------------------------------------------------
## 1. Running an installed package

## 2. Running your package that you are developing locally

----------------------------------------------------
For local development, maybe we need this (npm link) in window becuase: -
the npx cmd is not running the bin file path in window

-------------------------------------------------------
## 1. Package resolution — can TypeScript/Node actually find the package?
## 2. Auto-import suggestions — will VS Code suggest the package?

====================================================
1. .TypeScript's auto-import dedupes by resolved real file, not by specifier name.
When the language service builds its list of "where could Logger be auto-imported from," it resolves each candidate declaration to a canonical file path. Since et and express-throttle both resolve to the same physical .d.ts file, TS treats them as one underlying module and only surfaces one suggestion for it — and in this case it happened to keep et (probably