# Server Architecture Documentation

Complete documentation of how the `server/` Express + TypeScript backend is organized: the folder structure, the request/response flow, the layered architecture (routes → controllers → services), and the error-handling strategy.

---

## 1. Tech Stack

| Concern       | Technology                                                                      |
| ------------- | ------------------------------------------------------------------------------- |
| Runtime       | Node.js (ESM — `"type": "module"`)                                              |
| Framework     | Express 5                                                                       |
| Language      | TypeScript (run with `tsx watch`, build `tsc`)                                  |
| Validation    | Zod                                                                             |
| Database      | MongoDB via Mongoose                                                            |
| Cache/Session | Redis (`redis` client with JSON module)                                         |
| Auth          | Signed cookies + server-side sessions, Google OAuth (`google-auth-library`)     |
| AI            | OpenAI SDK (multi-provider: OpenRouter, NVIDIA NIM, HuggingFace, GitHub Models) |
| Email         | Nodemailer                                                                      |
| File upload   | Multer (disk storage → `public/`)                                               |
| File parsing  | `pdf-parse`, `mammoth`                                                          |

**Scripts** (`package.json`):

```bash
npm run dev     # tsx watch src/app.ts  (dev server with hot reload)
npm run build   # tsc                   (compile to JS)
```

---

## 2. Folder Structure

```
server/
├── src/
│   ├── app.ts                     # Entry point: Express app setup, global middleware, router mounting, global error handler
│   │
│   ├── routes/                    # HTTP layer — maps URL paths to controller methods
│   │   ├── authRoute.ts           #   /auth/*
│   │   ├── oauthRouter.ts         #   /oauth/*
│   │   ├── aiRoute.ts             #   /ai/*
│   │   ├── accountRoute.ts        #   /account/*
│   │   ├── debateRoute.ts         #   /debate/*
│   │   ├── adminRoute.ts          #   /admin/*
│   │   ├── emailRoute.ts          #   /email/*
│   │   └── filesRoute.ts          #   /files/*
│   │
│   ├── controllers/               # Request handlers — read req, call services, shape res
│   │   ├── authController.ts
│   │   ├── oauthController.ts
│   │   ├── aiController.ts
│   │   ├── accountController.ts
│   │   ├── debateController.ts
│   │   ├── adminController.ts
│   │   ├── emailController.ts
│   │   └── filesController.ts
│   │
│   ├── services/                  # Business logic — returns ApiResponse, never touches req/res
│   │   ├── authService.ts
│   │   ├── oauthService.ts
│   │   ├── aiService.ts
│   │   ├── accountService.ts
│   │   ├── debateService.ts
│   │   ├── adminService.ts
│   │   ├── emailService.ts
│   │   └── filesService.ts
│   │
│   ├── validators/                # Zod schemas for request bodies
│   │   ├── authValidator.ts       #   class-based: static schema properties
│   │   └── validators.ts          #   function-based: validateAskAiBody()
│   │
│   ├── middlewares/               # Express middleware
│   │   ├── sessionMiddleware/
│   │   │   ├── initGuestSession.ts    # creates a guest session if no cookie
│   │   │   └── validateSession.ts     # validates session cookie, attaches req.sessionData
│   │   ├── authMiddlewares.ts     # role-based access (validateRoleAccessMiddleware)
│   │   └── multer.ts              # file upload config (diskStorage → public/)
│   │
│   ├── dtos/                      # Data Transfer Objects — standard shapes
│   │   ├── apiResponse.ts         #   ApiResponse { statusCode, success, message, data }
│   │   └── appError.ts            #   AppError { statusCode, message, cause, extraDetails, isOperational }
│   │
│   ├── managers/                  # Stateful helpers between services and clients
│   │   ├── sessionManager.ts      #   SessionManager — session CRUD in Redis
│   │   ├── userSessionManager.ts  #   per-user session list (multi-device login, max sessions)
│   │   ├── filesManager.ts        #   FilesManager — fs helpers (exists, mkdir, read, append-log)
│   │   └── cookieManager.ts       #   (reserved / empty)
│   │
│   ├── clients/                   # External connections (singletons, connect on import)
│   │   ├── mongooseClient.ts      #   MongoDB connection + graceful shutdown
│   │   ├── redisClient.ts         #   Redis connection with retry strategy
│   │   ├── openaiClient.ts        #   OpenAI SDK client cache + streaming chat completion
│   │   ├── emailClient.ts         #   Nodemailer transporter
│   │   ├── googleOauthClient.ts   #   Google OAuth2Client
│   │   └── mongodbClient.ts       #   (native driver, alternative to mongoose)
│   │
│   ├── models/                    # Mongoose schemas/models
│   │   ├── userModel.ts           #   User (bcrypt hashing, methods, virtuals, statics)
│   │   ├── sessionModel.ts        #   Session (guest session records)
│   │   └── debateModel.ts         #   DebateTitle + Debate (messages)
│   │
│   ├── configs/                   # Static/validated configuration
│   │   ├── envConfigs.ts          #   EnvConfig — zod-validated .env, fail-fast at startup
│   │   ├── llmConfigs.ts          #   LlmConfigs — model registry + provider auth configs
│   │   ├── personaConfigs.ts      #   PersonaConfigs — system prompts per persona
│   │   ├── emailTemplatesConfigs.ts # getEmailTemplatesConfig() — subject+html per email type
│   │   └── mongodbConfig.ts
│   │
│   ├── templates/                 # HTML templates
│   │   ├── emailTemplates/        #   otpTemplate.ts, welcomeEmailTemplate.ts
│   │   └── otherTemplates/
│   │
│   ├── utils/                     # Pure helper functions
│   │   ├── errorNormalizer.ts     #   normalizeError() — any thrown value → NormalizedError
│   │   ├── filepathManager.ts     #   FilepathManager — path resolution helpers
│   │   ├── filesParser.ts         #   Fileparser — extract text/media from uploaded files
│   │   └── userAndRolevalidator.ts #  getUser, validateUserAccountStatus, validateRoleAction
│   │
│   └── types/                     # Shared TypeScript types
│       ├── index.ts               #   re-exports
│       ├── authTypes.ts           #   LoginData (union), RegisterUserData (z.infer)
│       └── openai.d.ts            #   type declarations
│
├── public/                        # Uploaded files land here (multer diskStorage)
├── logs/                          # Error logs (FilesManager.writeAfile target)
├── updates/                       # WIP/experimental code (aiProviderErrUpdates)
├── .env                           # Environment variables (validated by EnvConfig)
├── tsconfig.json
└── package.json
```

### Layer responsibility rules

| Layer          | Knows about `req`/`res`? | Returns         | May throw?                     |
| -------------- | ------------------------ | --------------- | ------------------------------ |
| `routes/`      | wires them               | —               | —                              |
| `middlewares/` | yes                      | calls `next()`  | yes (via `next(err)`)          |
| `controllers/` | yes                      | writes response | delegates via `next(err)`      |
| `services/`    | **no**                   | `ApiResponse`   | yes (unexpected errors bubble) |
| `managers/`    | no                       | plain data      | yes                            |
| `clients/`     | no                       | SDK objects     | yes                            |
| `models/`      | no                       | Mongoose docs   | yes                            |
| `validators/`  | no                       | parsed data     | yes (`ZodError`)               |

---

## 3. Request Lifecycle

Every request flows through the same pipeline:

```
Client
  │
  ▼
┌────────────────────────────────────────────────────────────┐
│ app.ts — GLOBAL MIDDLEWARE                                 │
│  1. CORS (dynamic, checked against EnvConfig.ALLOWED_DOMAIN)│
│  2. express.json({ limit: "2mb" })                          │
│  3. cookieParser(TOKEN_SECRET)  → req.signedCookies         │
│  4. fullUrl logger            → req.fullUrl                 │
└────────────────────────────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────────────────────────────┐
│ ROUTER MOUNTING (app.ts)                                   │
│  /email   → emailRouter           (public)                  │
│  /auth    → authRouter            (public + session routes) │
│  /oauth   → oauthRouter           (public)                  │
│  /files   → filesRouter           (public)                  │
│  /ai      → initGuestSession → validateSession → aiRouter   │
│  /account → validateSession → accountRouter                 │
│  /debate  → validateSession → debateRouter                  │
│  /admin   → validateSession → adminRouter (+role per route) │
└────────────────────────────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────────────────────────────┐
│ ROUTE FILE (routes/*.ts)                                   │
│  - thin: only maps method+path → controller static method   │
│  - attaches route-level middleware (multer, role guard)     │
└────────────────────────────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────────────────────────────┐
│ CONTROLLER (controllers/*.ts)                              │
│  1. try {                                                   │
│  2.   validate req.body with Zod schema (.parse → throws)   │
│  3.   extract params / session (req.sessionData)            │
│  4.   const result = await XService.method(...)             │
│  5.   res.status(result.statusCode).json(result.message|data)│
│  6. } catch (err) { next(err) }                             │
└────────────────────────────────────────────────────────────┘
  │
  ▼
┌────────────────────────────────────────────────────────────┐
│ SERVICE (services/*.ts)                                    │
│  - pure business logic; uses models/managers/clients        │
│  - expected outcomes → return new ApiResponse(...)          │
│  - unexpected failures → throw (bubbles to error middleware)│
└────────────────────────────────────────────────────────────┘
  │
  ▼ (on any throw anywhere)
┌────────────────────────────────────────────────────────────┐
│ GLOBAL ERROR MIDDLEWARE (app.ts, 4-arg handler)             │
│  normalizeError(err) → { name, message, statusCode, ... }   │
│  res.status(ne.statusCode).json(ne.message)                 │
└────────────────────────────────────────────────────────────┘
```

---

## 4. The Layers in Detail

### 4.1 Entry Point — `src/app.ts`

Responsibilities:

1. **Loads infrastructure first** — importing `./clients/mongooseClient.js` and `./clients/redisClient.js` has side effects: both connect at import time (top-level `await`). If a connection fails, the process crashes on startup (fail-fast).
2. **Extends the Express Request type** globally so middleware can attach session data:

```ts
declare global {
  namespace Express {
    interface Request {
      fullUrl: string;
      sessionId: string;
      sessionData: SessionDatatype;
    }
  }
}
```

3. **Dynamic CORS** — only applies CORS headers when the request `Origin` is in the `ALLOWED_DOMAIN` env list; exposes custom auth headers (`x-auth-type`, etc.) to the browser.
4. **Mounts routers** with their route-level middleware (see §5).
5. **Registers the global error-handling middleware last** (Express matches it by its 4-parameter signature `(err, req, res, next)`).

### 4.2 Routes — `src/routes/*.ts`

Route files are intentionally **thin**. They contain zero logic — only:

- `Router()` creation
- HTTP method + path → controller method mapping
- route-specific middleware (session validation, role guard, multer)

Example — `routes/authRoute.ts`:

```ts
import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { validateSessionMiddleware } from "../middlewares/sessionMiddleware/validateSession.js";

const router = Router();

router.post("/send-otp-email", AuthController.sendOtpEmail);
router.post("/verify-email-otp", AuthController.verifyEmailOtp);
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/logout", validateSessionMiddleware, AuthController.logout);
router.post("/logout-all", validateSessionMiddleware, AuthController.logoutAll);
router.post("/reset-password", AuthController.resetPassword);
router.get(
  "/is-authenticated",
  validateSessionMiddleware,
  AuthController.isAuthenticated
);

export { router as authRouter };
```

Example with role guard — `routes/adminRoute.ts`:

```ts
route.get(
  "/all-users",
  validateRoleAccessMiddleware("grp3"),
  AdminController.getAllLoginedInUsers
);
route.delete(
  "/remove-session",
  validateRoleAccessMiddleware("grp3"),
  AdminController.removeUserSession
);
route.delete(
  "/delete-user/:userId",
  validateRoleAccessMiddleware("grp2"),
  AdminController.deleteUser
);
```

**Naming convention:** each file exports a named router (`authRouter`, `aiRouter`, …) which `app.ts` imports and mounts.

### 4.3 Controllers — `src/controllers/*.ts`

Controllers are **classes with only static methods** and a `private constructor()` (they are never instantiated — used as namespaces).

Every method follows the exact same template:

```ts
static async someAction(req: Request, res: Response, next: NextFunction) {
  try {
    // 1. Validate input (Zod .parse() throws ZodError on failure)
    const { email, password } = AuthValidator.loginSchema.parse(req.body);

    // 2. Call the service layer — returns an ApiResponse DTO
    const result = await AuthService.login({ oauth: false, email, password }, sessionId);

    // 3. Optional side effects: cookies / custom headers
    if (result.success) {
      res.setHeader("x-auth-type", "auth");
      res.cookie("sessionId", result.data, { signed: true, httpOnly: true, ... });
    }

    // 4. Send response using the DTO's statusCode; body is message OR data
    return res.status(result.statusCode).json(result.message);
  } catch (err) {
    // 5. NEVER handle errors here — delegate to the global error middleware
    next(err);
  }
}
```

Key rules:

- **Controllers never contain business logic** — they parse input, call one service method, and shape the HTTP response.
- **Every code path is wrapped in try/catch**, and the catch always calls `next(err)` — this is what funnels errors into the global error middleware.
- **Response body choice:** controllers pick either `result.message` (for action-style endpoints: login, register, logout, delete) or `result.data` (for fetch-style endpoints: profile, titles, models). The `ApiResponse` envelope itself is not sent over the wire — only one of its fields.
- **Exception:** `AuthController.register` additionally handles MongoDB-specific errors inline before falling back to `next(err)`:
  - `code === 121` (document validation failure) → parses `errInfo.details.schemaRulesNotSatisfied` into a friendly `400` message.
  - `code === 11000` (duplicate key) → reads `keyPattern`/`keyValue` → `409 "<field> \"<value>\" already exists"`.
- **Streaming exception:** `AIController.askai` does not use the standard JSON pattern. The service returns an **async generator**; the controller:
  1. pulls the first chunk (`result.next()`); if done immediately → `204` end,
  2. writes headers manually (`Content-Type: text/plain`, `Transfer-Encoding: chunked`, `Cache-Control: no-cache`),
  3. pipes each chunk as `JSON.stringify(chunk) + "\n"` (newline-delimited JSON),
  4. aborts generation via `AbortController` if the client disconnects (`res.destroyed`).

### 4.4 Services — `src/services/*.ts`

Services hold **all business logic**. They are also static-method classes with `private constructor()`.

Rules:

- **Never import `express`** — no `req`/`res` objects here. All input arrives as plain function arguments.
- **Expected outcomes return `ApiResponse`**, including "failures" that are part of normal flow (wrong password, OTP expired, not found):

```ts
static async verifyEmailOtp(email: string, enteredOtp: string): Promise<ApiResponse> {
  const storedOtp = await redisClient.get(`otp:${email}`);
  if (!storedOtp) {
    return new ApiResponse(404, false, "OTP expired, please resend", null);
  }
  if (storedOtp === enteredOtp) {
    return new ApiResponse(200, true, "OTP verified successfully", null);
  }
  return new ApiResponse(401, false, "Invalid OTP", null);
}
```

- **Unexpected errors are thrown** and bubble up through the controller's `next(err)` to the global error middleware (e.g. DB connection drop, OpenAI API failure).
- **Multi-write DB operations use Mongoose transactions** with the standard pattern:

```ts
const session = await mongoose.startSession();
session.startTransaction();
try {
  await modelA.create([...], { session });
  await modelB.deleteOne({...}, { session });
  await session.commitTransaction();
} catch (err) {
  await session.abortTransaction();
  throw err;                    // bubble → 500 via error middleware
} finally {
  session.endSession();
}
```

Used in: `AuthService.register`, `AuthService.login` (guest → user data migration), `DebateService.deleteDebate`, `AccountService.hardDeleteUser`.

- **Services may call other services** — e.g. `OauthService.GoogleOAuth` reuses `AuthService.register` / `AuthService.login`; `AdminService.suspendUser` delegates to `AccountService.softDeleteUser`; `AuthService` uses `EmailService` for OTP/welcome emails.

### 4.5 DTOs — `src/dtos/`

#### `ApiResponse` — the uniform service return type

```ts
export class ApiResponse {
  constructor(
    public statusCode: number,
    public success: boolean,
    public message: string,
    public data: any
  ) {}
}
```

Every service method returns this shape so controllers can blindly do `res.status(result.statusCode).json(...)`.

#### `AppError` — the throwable domain error

```ts
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;        // default true — expected, safe to show message
  extraDetails?: Record<string, unknown>;
  cause?: unknown;

  constructor(params: {
    statusCode: number;
    message: string;
    cause?: unknown;
    extraDetails?: Record<string, unknown>;
    isOperational?: boolean;
  }) { ... }
}
```

Thrown when a layer wants a specific HTTP status to reach the client (used e.g. by the OpenAI client to normalize provider errors). The error normalizer gives it special treatment (see §6).

### 4.6 Validators — `src/validators/`

Two styles, both Zod:

**Style A — class with static schemas** (`authValidator.ts`), consumed with `.parse()` inside controllers (throws `ZodError`):

```ts
export class AuthValidator {
  private constructor() {}

  public static readonly loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
  });

  public static readonly RegisterSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().nullable().default(null),
    email: z.email("Invalid email address"),
    otp: z.string().trim().min(1, "OTP is required"),
    password: z.string().min(1, "Password is required"),
  });
  // ...
}
```

**Style B — schema + safeParse wrapper function** (`validators.ts`), used for complex bodies needing `preprocess` (multipart form sends everything as strings, so `stream`, `history`, `files` are preprocessed/JSON-parsed):

```ts
export function validateAskAiBody(body: unknown): AskAiBody {
  const parseResult = askAiBodySchema.safeParse(body);
  if (!parseResult.success) {
    throw parseResult.error; // ZodError → normalized to 400 by error middleware
  }
  return parseResult.data;
}
```

**Types are derived from schemas**, never duplicated — `types/authTypes.ts`:

```ts
export type RegisterUserData = z.infer<typeof AuthValidator.RegisterSchema>;
```

### 4.7 Middlewares — `src/middlewares/`

#### `sessionMiddleware/validateSession.ts` — the core auth guard

Runs on all protected routers. Steps:

1. Reads `sessionId` from `req.signedCookies` (signed with `TOKEN_SECRET`).
2. No cookie → `401` + header `x-auth-type: unauth`.
3. Validates the id is a UUID via Zod (`z.uuid()`) → else `400`.
4. Loads session from Redis via `SessionManager.getSession()`.
5. Missing → clears cookie, `401` "Session data not found".
6. Expired (`exp <= now`) → deletes session, clears cookie, `401` "Session expired".
7. Valid → attaches `req.sessionId` + `req.sessionData` and sets `x-auth-type: guest | auth`, then `next()`.

#### `sessionMiddleware/initGuestSession.ts`

Used only on `/ai` — if the visitor has no cookie, it creates a **guest session** (Mongo `sessionModel` record + Redis session + signed cookie) so guests can use AI features and later be migrated to a full account on register/login.

#### `authMiddlewares.ts` — role-based access control

```ts
export const roleRank = { user: 1, manager: 2, admin: 3, owner: 4 };

export const roleGroups = {
  grp1: ["owner"],
  grp2: ["owner", "admin"],
  grp3: ["owner", "admin", "manager"],
  grp4: ["owner", "admin", "manager", "user"],
};

export const validateRoleAccessMiddleware =
  (roleGrp = "grp1") =>
  (req, res, next) => {
    const userRole = req.sessionData?.role;
    if (!userRole || !roleGroups[roleGrp].includes(userRole)) {
      return res.status(403).json("Forbidden: Role not authorized");
    }
    next();
  };
```

Requires `validateSessionMiddleware` to have run first (it reads `req.sessionData.role`). Rank-based action checks (can actor X modify user Y) live in `utils/userAndRolevalidator.ts` → `validateRoleAction()`.

#### `multer.ts`

Disk storage into `public/` with `crypto.randomUUID()` filenames preserving the original extension. Used as `storage.none()` (parse multipart, no files) or `storage.array("file")`.

### 4.8 Managers — `src/managers/`

Sit between services and clients; encapsulate stateful/recurring operations:

- **`SessionManager`** — low-level session CRUD in Redis (`redisClient.json.set/get`, `del`, `exists`). Defines `SessionDatatype` = `{ userId, role, isGuest, exp }`.
- **`userSessionManager`** — per-user multi-session handling: a Redis **list** per `userId` holds that user's session ids. `manageUserSessions()` enforces `MAX_SESSIONS_PER_USER` (evicts oldest), `deleteUserSession()` / `deleteUserAllSessions()` for logout / logout-all / account deletion.
- **`FilesManager`** — fs helpers; on module load ensures `logs/` and `public/` exist (static block). `writeAfile()` appends timestamped JSON entries — intended for `logs/error.log` (currently commented out in the error middleware).

### 4.9 Clients — `src/clients/`

One file per external system; each exports a ready-to-use singleton:

- **`mongooseClient.ts`** — connects on import, lifecycle event logging, graceful shutdown on `SIGINT`/`SIGTERM`.
- **`redisClient.ts`** — connects on import, exponential-backoff reconnect (max 5 retries), event logging.
- **`openaiClient.ts`** — caches `OpenAI` SDK instances per `apiKey|baseUrl` pair (one client per LLM provider), streams chat completions, wraps SDK errors into `AppError`.
- **`emailClient.ts`** — a single `sendMail` helper built on a Nodemailer transporter configured from env.
- **`googleOauthClient.ts`** — shared `OAuth2Client` for verifying Google ID tokens.

### 4.10 Models — `src/models/`

Mongoose schemas. Notable `userModel.ts` features:

- field validation (`match`, `minLength`, `enum`, custom validators — e.g. role forced to `"user"` on insert),
- `pre("save")` bcrypt password hashing (cost 12, only when modified),
- instance method `comparePassword()`,
- static `findByEmail()`,
- virtuals (`fullName`, `isAdult`), `timestamps: true`, `optimisticConcurrency: true`, `strict: "throw"`.

`debateModel.ts` exports two models: `debateTitleModel` (one doc per debate: userId + debateId UUID + title) and `debateModel` (messages array per debate). `sessionModel.ts` stores guest-session backing records with an `exp` unix timestamp.

### 4.11 Configs — `src/configs/`

- **`envConfigs.ts`** — the only place that reads `.env`. A Zod schema validates **every** required variable at startup (with transforms, e.g. `ALLOWED_DOMAIN` → string array, `MAX_SESSIONS_PER_USER` → number). Invalid env → process throws immediately (fail-fast). Everything else reads `EnvConfig.envs.*`.
- **`llmConfigs.ts`** — `LlmConfigs` static class: registry of models (`model`, `provider`, `reasoning`, `multimodal`) + per-provider `apiKey`/`baseUrl` auth configs. `getLlmConfig(name)`, `getLlmProviderAuthConfig(provider)`.
- **`personaConfigs.ts`** — `PersonaConfigs.getPersonaPrompt(persona)` returns the system prompt; `PersonaList` drives Zod refinement in the ask-ai validator.
- **`emailTemplatesConfigs.ts`** — `getEmailTemplatesConfig(data)` is a discriminated-union switch (`otp` | `userAgent` | `welcome`) returning `{ subject, html }` from the templates folder.

### 4.12 Utils — `src/utils/`

- **`errorNormalizer.ts`** — see §6.
- **`filepathManager.ts`** — path helpers (`createSourceCodeApath` relative to src root, `createFileExecApath` relative to cwd, `getExtension`).
- **`filesParser.ts`** — `Fileparser.extractText(files)` reads uploads from `public/` and converts them to OpenAI message parts: images/videos → base64 `image_url`/`video_url`, PDFs → text via `pdf-parse`, DOCX → text via `mammoth`.
- **`userAndRolevalidator.ts`** — shared user checks returning `ApiResponse` (`getUser`, `validateUserAccountStatus` — active/deactivated/suspended/deleted, `validateRoleAction` — rank comparison).

---

## 5. Router Mounting & Endpoint Map

Defined in `app.ts`:

```ts
app.use("/email", emailRouter);
app.use("/auth", authRouter);
app.use("/oauth", oauthRouter);
app.use("/files", filesRouter);
app.use(
  "/ai",
  initGuestvalidateSessionMiddleware,
  validateSessionMiddleware,
  aiRouter
);
app.use("/account", validateSessionMiddleware, accountRouter);
app.use("/debate", validateSessionMiddleware, debateRouter);
app.use("/admin", validateSessionMiddleware, adminRouter);
```

### Full endpoint list

| Method | Path                         | Middleware                                    | Controller → Service                 | Notes                                                          |
| ------ | ---------------------------- | --------------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| GET    | `/`                          | —                                             | inline                               | `"server ok"`                                                  |
| GET    | `/health`                    | —                                             | inline                               | `200 OK`                                                       |
| POST   | `/email/send`                | —                                             | EmailController.sendEmail            | body: `{ toEmail, emailData }`                                 |
| POST   | `/auth/send-otp-email`       | —                                             | AuthController.sendOtpEmail          | Zod-validated; OTP stored in Redis 5 min                       |
| POST   | `/auth/verify-email-otp`     | —                                             | AuthController.verifyEmailOtp        | 6-digit OTP                                                    |
| POST   | `/auth/register`             | —                                             | AuthController.register              | sets signed `sessionId` cookie; handles mongo 121/11000 inline |
| POST   | `/auth/login`                | —                                             | AuthController.login                 | migrates guest data; sets cookie; `x-auth-type: auth`          |
| POST   | `/auth/logout`               | validateSession                               | AuthController.logout                | clears cookie                                                  |
| POST   | `/auth/logout-all`           | validateSession                               | AuthController.logoutAll             | deletes all user sessions                                      |
| POST   | `/auth/reset-password`       | —                                             | AuthController.resetPassword         | OTP-gated                                                      |
| GET    | `/auth/is-authenticated`     | validateSession                               | AuthController.isAuthenticated       | returns `"authenticated"`                                      |
| POST   | `/oauth/google`              | —                                             | OauthController.GoogleOAuth          | verifies Google ID token → register or login                   |
| POST   | `/files/upload`              | multer `storage.array("file")`                | FilesController.upload               | saves to `public/` with uuid names                             |
| GET    | `/files/:fileName`           | —                                             | FilesController.getFiles             | `res.sendFile` or 404                                          |
| GET    | `/files/down`                | —                                             | inline                               | test `res.download`                                            |
| GET    | `/ai/models`                 | initGuest + validateSession                   | AIController.getAllLlms              | list of LLM configs                                            |
| GET    | `/ai/model/:llmName`         | initGuest + validateSession                   | AIController.getLlmConfig            | `?prop[]=x` filters config keys                                |
| POST   | `/ai/askai`                  | initGuest + validateSession + multer `none()` | AIController.askai                   | **streamed** NDJSON response                                   |
| GET    | `/account/profile`           | validateSession                               | AccountController.getUserProfile     |                                                                |
| PUT    | `/account/update`            | validateSession + multer `none()`             | AccountController.update             |                                                                |
| DELETE | `/account/delete`            | validateSession                               | AccountController.deleteUser         | hard delete + cascade debates, in transaction                  |
| POST   | `/debate/save-title`         | validateSession                               | DebateController.saveDebateTitle     |                                                                |
| POST   | `/debate/save-msg`           | validateSession                               | DebateController.saveDebateMsg       | upsert + `$push` message                                       |
| GET    | `/debate/titles`             | validateSession                               | DebateController.getDebateTitles     | sorted by `updatedAt` desc                                     |
| GET    | `/debate/msgs/:debateId`     | validateSession                               | DebateController.getDebateMsgs       | 404 if missing                                                 |
| DELETE | `/debate/:debateId`          | validateSession                               | DebateController.deleteDebate        | transaction (title + msgs)                                     |
| GET    | `/admin/all-users`           | validateSession + role `grp3`                 | AdminController.getAllLoginedInUsers | manager+                                                       |
| DELETE | `/admin/remove-session`      | validateSession + role `grp3`                 | AdminController.removeUserSession    | rank-checked                                                   |
| DELETE | `/admin/delete-user/:userId` | validateSession + role `grp2`                 | AdminController.deleteUser           | soft delete (suspend), admin+                                  |

### Custom response headers (auth state contract with the frontend)

| Header                                                                      | Values                                |
| --------------------------------------------------------------------------- | ------------------------------------- |
| `x-auth-type`                                                               | `auth`, `guest`, `unauth`, `not-auth` |
| `x-token-expired`, `x-login-success`, `x-authenticated`, `x-logout-success` | exposed via CORS                      |

### Cookie contract

- Name: `sessionId`; **signed** (`TOKEN_SECRET`), `httpOnly`, `maxAge` 10 h.
- `secure` + `sameSite: "none"` in production; `sameSite: "lax"` in dev.

---

## 6. Error Handling Strategy

Three building blocks: **throwing**, **normalizing**, **responding**.

### 6.1 Who throws what

| Source                        | Throws                                                        |
| ----------------------------- | ------------------------------------------------------------- |
| Zod validators (`.parse`)     | `ZodError`                                                    |
| OpenAI client / domain layers | `AppError` (with `statusCode` + `cause`)                      |
| Mongoose / Redis / anything   | native `Error` (or driver error objects)                      |
| Services (expected failures)  | **do not throw** — return `ApiResponse` with `success: false` |

### 6.2 The funnel

1. Every controller wraps its body in `try/catch` and calls `next(err)`.
2. Middleware also calls `next(err)` on failure.
3. Express skips all remaining handlers and lands in the **4-arg error middleware** registered last in `app.ts`.

### 6.3 Global error middleware (`app.ts`)

```ts
app.use(
  async (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("error middleware", err);

    const ne = normalizeError(err);

    const errorDetails = {
      request: {
        method: req.method,
        path: req.originalUrl,
        fullUrl: req.fullUrl,
        ip: req.ip,
        userAgent: req.get("user-agent") || null,
      },
      errDetails: ne,
    };
    // await FilesManager.writeAfile(errorDetails, ["logs", "error.log"]);  // log-to-file (currently disabled)

    if (res.headersSent) {
      return next(err); // delegate to Express default handler if streaming already started
    }

    return res.status(ne.statusCode).json(ne.message);
  }
);
```

### 6.4 `normalizeError()` (`utils/errorNormalizer.ts`)

Converts **anything** thrown into a uniform `NormalizedError`:

```ts
type NormalizedError = {
  name: string;
  message: string;
  statusCode: number;
  stack?: string;
  cause?: unknown;
  rawErr?: unknown;
};
```

Priority of handling:

| Input               | statusCode                | message                                                       |
| ------------------- | ------------------------- | ------------------------------------------------------------- |
| `AppError`          | `err.statusCode`          | `err.message` (+ `cause`, `extraDetails` preserved)           |
| `ZodError`          | **400**                   | `"field.path: issue; other.field: issue"` (all issues joined) |
| `Error`             | **500**                   | `err.message`                                                 |
| thrown `string`     | **500**                   | the string itself (`NonErrorThrow`)                           |
| thrown plain object | `e.statusCode` or **500** | `e.message` or fallback (`NonErrorObjectThrow`)               |
| anything else       | **500**                   | `String(err)` (`UnknownThrow`)                                |

### 6.5 The resulting client-facing error contract

- Body is **always a plain string message** (`res.json(ne.message)`), never an object.
- Validation problems → `400` with `"email: Invalid email address; password: Password is required"` style message.
- Domain errors (`AppError`) → their configured status and message.
- Everything unexpected → `500` with the raw error message.

### 6.6 Special cases outside the normalizer

- **Mongo duplicate key (`11000`)** and **document validation (`121`)** are handled **inline in `AuthController.register`** (before `next(err)`) because they need field-level friendly messages (`409 "<field> already exists"` / `400 "Validation error: ..."`).
- **Streaming responses:** if the client disconnects mid-stream, `AIController.askai` aborts the upstream LLM request via `AbortController`; if an error happens after headers are sent, the middleware delegates to Express's default handler via the `res.headersSent` check.

---

## 7. Response Conventions Summary

| Situation                               | Status                    | Body                            |
| --------------------------------------- | ------------------------- | ------------------------------- |
| Action success (login, save, delete)    | `result.statusCode`       | `result.message` (string)       |
| Fetch success (profile, lists)          | `result.statusCode`       | `result.data` (payload)         |
| Expected failure (wrong OTP, not found) | `result.statusCode` (4xx) | `result.message` (string)       |
| Validation failure (Zod)                | 400                       | joined issue string             |
| Unhandled error                         | 500                       | error message string            |
| AI streaming                            | 200 chunked               | NDJSON lines (`{...}\n{...}\n`) |
| AI stream with no content               | 204                       | empty                           |
| File download                           | 200                       | binary via `res.sendFile`       |

---

## 8. Recipe: Adding a New Feature Endpoint

Follow the existing pattern — 5 touch points:

1. **Validator** — add a Zod schema (in `validators/`), e.g. `MyValidator.createSchema`.
2. **Service** — add a static method in `services/myService.ts` that takes plain arguments and returns `new ApiResponse(status, success, message, data)`. Use a Mongoose transaction if writing to multiple collections.
3. **Controller** — add a static method: `try { const input = MyValidator.schema.parse(req.body); const result = await MyService.action(input); return res.status(result.statusCode).json(result.message); } catch (err) { next(err); }`.
4. **Route** — register in `routes/myRoute.ts`: `router.post("/action", MyController.action);` (add `validateSessionMiddleware` / role guard / multer if needed).
5. **Mount** (only for a new router) — `app.use("/my", validateSessionMiddleware, myRouter);` in `app.ts`.

That's it — errors are handled globally, sessions/roles by middleware, and responses follow the `ApiResponse` contract.