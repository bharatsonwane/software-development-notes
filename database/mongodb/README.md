# MongoDB

Notes for MongoDB — documents, queries, aggregation, and schema design.

Files are numbered in **learning order**: `01-mongo-topic.md`, `02-mongo-topic.md`, and so on.

**Prerequisite:** [PostgreSQL](../postgresql/) basics (01–04) recommended — helps compare relational vs document modeling.

## Contents

**01. [Introduction & Setup](./01-mongo-introduction-and-setup.md)**  
Tier — Fundamental

1. What is MongoDB  
2. Document model vs tables  
3. Installing and connecting (`mongosh`)  
4. Databases, collections, and documents  
5. Common questions

**02. [Documents & BSON](./02-mongo-documents-bson.md)**  
Tier — Fundamental

1. BSON types  
2. `_id` field  
3. Embedded documents vs arrays  
4. Schema flexibility and validation  
5. Common questions

**03. [CRUD Operations](./03-mongo-crud.md)**  
Tier — Fundamental

1. `insertOne` / `insertMany`  
2. `find` and query filters  
3. `updateOne` / `updateMany`  
4. `deleteOne` / `deleteMany`  
5. Common questions

**04. [Schema Design Patterns](./04-mongo-schema-design.md)**  
Tier — Fundamental

1. Embedding vs referencing  
2. One-to-few, one-to-many, many-to-many  
3. Duplication vs joins  
4. Schema versioning  
5. Common questions

**05. [Queries & Operators](./05-mongo-queries-operators.md)**  
Tier — Intermediate

1. Comparison and logical operators  
2. Array operators (`$elemMatch`, `$all`)  
3. Projection  
4. Cursors and batch size  
5. Common questions

**06. [Indexes](./06-mongo-indexes.md)**  
Tier — Intermediate

1. Single-field and compound indexes  
2. Multikey indexes  
3. Text and geospatial (intro)  
4. Index performance and `explain()`  
5. Common questions

**07. [Aggregation Pipeline](./07-mongo-aggregation.md)**  
Tier — Intermediate

1. `$match`, `$group`, `$project`  
2. `$lookup` (join-like behavior)  
3. `$unwind` and `$sort`  
4. Pipeline vs SQL `GROUP BY`  
5. Common questions

**08. [Relationships & Transactions](./08-mongo-relationships-transactions.md)**  
Tier — Intermediate

1. `$lookup` patterns in depth  
2. Multi-document transactions  
3. Replica sets (overview)  
4. Read concern and write concern (intro)  
5. Common questions

**09. [Mongoose & Node.js](./09-mongo-mongoose-nodejs.md)**  
Tier — Intermediate

1. ODM vs driver  
2. Schemas and models  
3. Middleware hooks  
4. Population  
5. Common questions

**10. [Production & Best Practices](./10-mongo-production-best-practices.md)**  
Tier — Advanced

1. Atlas vs self-hosted (overview)  
2. Backup and restore  
3. Security (auth, IP allowlist)  
4. SQL vs MongoDB — when to choose which  
5. Common questions

## Learning path

```
01–04  Fundamental  →  documents, CRUD, schema patterns
05–09  Intermediate →  operators, indexes, aggregation, Mongoose
10     Advanced     →  production and trade-offs
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).

## Topic map (by area)

| Area | Files |
|------|-------|
| Core model | 01, 02, 04 |
| Data access | 03, 05, 07 |
| Performance | 06 |
| App integration | 08, 09 |
| Production | 10 |
