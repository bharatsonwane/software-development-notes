# System Design

Notes for system design — scalability, architecture patterns, and interviews.

Files are numbered in **learning order**: `01-sd-topic.md`, `02-sd-topic.md`, and so on.

**Prerequisite:** [JavaScript](../javascript/) or [Python](../python/), [Database](../database/), and basic [Docker](../docker/) / [AWS](../aws/) help for later chapters.

## Contents

**01. [Introduction & Framework](./01-sd-intro-framework.md)**  
Tier — Fundamental

1. What system design interviews test  
2. Requirements — functional vs non-functional  
3. Back-of-the-envelope estimation  
4. Step-by-step interview approach  
5. Common questions

**02. [Scalability Basics](./02-sd-scalability-basics.md)**  
Tier — Fundamental

1. Vertical vs horizontal scaling  
2. Stateless vs stateful services  
3. Load balancers (intro)  
4. Single points of failure  
5. Common questions

**03. [Caching](./03-sd-caching.md)**  
Tier — Fundamental

1. Cache-aside, read-through, write-through  
2. CDN  
3. Redis / Memcached (overview)  
4. Cache invalidation  
5. Common questions

**04. [Databases in System Design](./04-sd-databases.md)**  
Tier — Intermediate

1. SQL vs NoSQL trade-offs  
2. Replication and sharding  
3. Read replicas  
4. CAP theorem (overview)  
5. Common questions

**05. [Load Balancing & Reverse Proxies](./05-sd-load-balancing-proxies.md)**  
Tier — Intermediate

1. Layer 4 vs Layer 7 LB  
2. Round robin, least connections  
3. Nginx / ALB (overview)  
4. Health checks  
5. Common questions

**06. [Message Queues & Async](./06-sd-message-queues-async.md)**  
Tier — Intermediate

1. Why async processing  
2. Pub/sub vs queues  
3. Kafka, RabbitMQ, SQS (overview)  
4. Idempotency and retries  
5. Common questions

**07. [Microservices vs Monolith](./07-sd-microservices-monolith.md)**  
Tier — Intermediate

1. Monolith benefits and limits  
2. Microservice boundaries  
3. API gateway  
4. Service discovery (intro)  
5. Common questions

**08. [API Design](./08-sd-api-design.md)**  
Tier — Intermediate

1. REST conventions  
2. GraphQL vs REST (overview)  
3. Versioning and pagination  
4. Rate limiting  
5. Common questions

**09. [Reliability & Fault Tolerance](./09-sd-reliability-fault-tolerance.md)**  
Tier — Advanced

1. Redundancy and failover  
2. Circuit breakers  
3. Timeouts and bulkheads  
4. Disaster recovery (intro)  
5. Common questions

**10. [Case Study — URL Shortener](./10-sd-case-url-shortener.md)**  
Tier — Advanced

1. Requirements and estimates  
2. API and data model  
3. Hashing and collisions  
4. Scaling reads and writes  
5. Common questions

**11. [Case Study — News Feed / Chat](./11-sd-case-feed-chat.md)**  
Tier — Advanced

1. Feed generation — fan-out on write vs read  
2. WebSockets and polling  
3. Presence and ordering  
4. Storage choices  
5. Common questions

**12. [Interview Prep & Trade-offs](./12-sd-interview-tradeoffs.md)**  
Tier — Advanced

1. Common follow-up questions  
2. Documenting trade-offs  
3. What interviewers look for  
4. Practice checklist  
5. Common questions

## Learning path

```
01–03  Fundamental  →  framework, scale, cache
04–08  Intermediate →  DB, LB, queues, services, APIs
09–12  Advanced     →  reliability, case studies, interview prep
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).
