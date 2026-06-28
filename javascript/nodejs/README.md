# Node.js

Notes for the Node.js runtime and server-side JavaScript.

Files are numbered in **learning order**: `01-node-topic.md`, `02-node-topic.md`, and so on.

**Prerequisite:** complete [JavaScript Language](../javascript-language/README.md) (at least files 01–07, 10–11) and async basics before building servers.

## Contents

**01. [Runtime & Setup](./01-node-runtime-and-setup.md)**  
Tier — Fundamental

1. What is Node.js  
2. Node vs browser JavaScript  
3. REPL and running scripts  
4. `process` and globals  
5. Common questions

**02. [Modules & npm](./02-node-modules-and-npm.md)**  
Tier — Fundamental

1. CommonJS (`require`, `module.exports`)  
2. ES modules in Node  
3. `package.json` and scripts  
4. npm, npx, and dependencies  
5. Common questions

**03. [File System & Paths](./03-node-fs-and-paths.md)**  
Tier — Fundamental

1. `path` module  
2. Reading and writing files  
3. Directories and watching  
4. `__dirname`, `import.meta.url`  
5. Common questions

**04. [HTTP Fundamentals](./04-node-http-fundamentals.md)**  
Tier — Fundamental

1. HTTP request and response model  
2. Built-in `http` module  
3. Status codes and headers  
4. JSON APIs without a framework  
5. Common questions

**05. [Express & REST APIs](./05-node-express-rest.md)**  
Tier — Intermediate

1. Express setup and routing  
2. Middleware chain  
3. REST conventions  
4. Request body and query params  
5. Project structure  
6. Common questions

**06. [Error Handling & Debugging](./06-node-error-handling.md)**  
Tier — Intermediate

1. Sync vs async errors  
2. Express error middleware  
3. Unhandled rejections and exceptions  
4. Logging basics  
5. Debugging with Node inspector  
6. Common questions

**07. [Async Patterns in Node](./07-node-async-patterns.md)**  
Tier — Intermediate

1. Callbacks in server code  
2. Promises and async/await  
3. Node event loop (server view)  
4. Concurrent I/O patterns  
5. Common questions

**08. [Streams & Buffers](./08-node-streams-buffers.md)**  
Tier — Intermediate

1. Buffer basics  
2. Readable and writable streams  
3. `pipeline` and backpressure  
4. Transform streams  
5. Common questions

**09. [Environment & Config](./09-node-env-and-config.md)**  
Tier — Intermediate

1. Environment variables  
2. `dotenv` and secrets  
3. Config per environment  
4. Twelve-factor basics  
5. Common questions

**10. [Databases](./10-node-databases.md)**  
Tier — Intermediate

1. SQL vs document stores (overview)  
2. Connection pools  
3. Query patterns with `pg` / Mongoose  
4. Migrations and seeds (intro)  
5. Common questions

**11. [Auth & Security](./11-node-auth-security.md)**  
Tier — Intermediate

1. Password hashing (bcrypt)  
2. JWT and sessions  
3. CORS, Helmet, rate limiting  
4. Input validation (Zod)  
5. Common questions

**12. [Testing](./12-node-testing.md)**  
Tier — Advanced

1. Jest setup for Node  
2. Unit vs integration tests  
3. Supertest for HTTP APIs  
4. Mocking modules and DB  
5. Common questions

**13. [Workers & Clustering](./13-node-workers-cluster.md)**  
Tier — Advanced

1. Single-thread model recap  
2. `worker_threads`  
3. `cluster` module  
4. When to scale horizontally  
5. Common questions

**14. [Performance & Deployment](./14-node-performance-deployment.md)**  
Tier — Advanced

1. Profiling and bottlenecks  
2. Caching strategies  
3. PM2 and process managers  
4. Docker and deployment overview  
5. Production checklist  
6. Common questions

## Learning path

```
01–04  Fundamental  →  runtime, modules, fs, raw HTTP
05–11  Intermediate →  Express, errors, async, streams, DB, auth
12–14  Advanced     →  testing, scaling, production
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file). Subsections nest under their parent.

## Topic map (by area)

| Area | Files |
|------|-------|
| Runtime & tooling | 01, 02, 09 |
| I/O & HTTP | 03, 04, 05 |
| Server behavior | 06, 07, 08 |
| Data & security | 10, 11 |
| Production | 12, 13, 14 |
