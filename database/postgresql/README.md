# PostgreSQL

Notes for PostgreSQL — SQL, schemas, queries, and performance.

Files are numbered in **learning order**: `01-pg-topic.md`, `02-pg-topic.md`, and so on.

**Prerequisite:** none for basics. Complements [MongoDB](../mongodb/) for comparing SQL vs document stores.

## Contents

**01. [Introduction & Setup](./01-pg-introduction-and-setup.md)**  
Tier — Fundamental

1. What is PostgreSQL  
2. SQL vs NoSQL (overview)  
3. Installing and connecting (`psql`, clients)  
4. Databases, schemas, and tables  
5. Common questions

**02. [Data Types & Schema](./02-pg-data-types-schema.md)**  
Tier — Fundamental

1. Core data types  
2. `CREATE TABLE` and constraints  
3. Primary keys and foreign keys  
4. `ALTER TABLE` and migrations (intro)  
5. Common questions

**03. [CRUD & Queries](./03-pg-crud-queries.md)**  
Tier — Fundamental

1. `INSERT`, `UPDATE`, `DELETE`  
2. `SELECT` and filtering (`WHERE`)  
3. Sorting and pagination (`ORDER BY`, `LIMIT`)  
4. `NULL` handling  
5. Common questions

**04. [Joins & Relationships](./04-pg-joins-relationships.md)**  
Tier — Fundamental

1. One-to-many and many-to-many  
2. `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`  
3. Self-joins and cross joins  
4. Designing relational schemas  
5. Common questions

**05. [Aggregations & Grouping](./05-pg-aggregations-grouping.md)**  
Tier — Intermediate

1. `COUNT`, `SUM`, `AVG`, `MIN`, `MAX`  
2. `GROUP BY` and `HAVING`  
3. Subqueries  
4. `DISTINCT`  
5. Common questions

**06. [Indexes & Performance](./06-pg-indexes-performance.md)**  
Tier — Intermediate

1. Why indexes matter  
2. B-tree indexes  
3. Partial and composite indexes  
4. `EXPLAIN` and `EXPLAIN ANALYZE`  
5. Common questions

**07. [Transactions & Concurrency](./07-pg-transactions-concurrency.md)**  
Tier — Intermediate

1. ACID properties  
2. `BEGIN`, `COMMIT`, `ROLLBACK`  
3. Isolation levels  
4. Locks and deadlocks (intro)  
5. Common questions

**08. [Constraints & Normalization](./08-pg-constraints-normalization.md)**  
Tier — Intermediate

1. Normal forms (1NF–3NF overview)  
2. Unique, check, and not-null constraints  
3. Referential integrity  
4. When to denormalize  
5. Common questions

**09. [Advanced SQL](./09-pg-advanced-sql.md)**  
Tier — Advanced

1. Common Table Expressions (CTEs)  
2. Window functions  
3. JSONB operators  
4. Views and materialized views  
5. Common questions

**10. [Administration & Production](./10-pg-admin-production.md)**  
Tier — Advanced

1. Roles, grants, and security  
2. Backups and restore (overview)  
3. Connection pooling (PgBouncer intro)  
4. Monitoring and slow queries  
5. Common questions

## Learning path

```
01–04  Fundamental  →  types, CRUD, joins
05–08  Intermediate →  aggregates, indexes, transactions, design
09–10  Advanced     →  advanced SQL, production
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).

## Topic map (by area)

| Area | Files |
|------|-------|
| Foundations | 01, 02, 03 |
| Relational modeling | 04, 08 |
| Query power | 05, 09 |
| Operations | 06, 07, 10 |
