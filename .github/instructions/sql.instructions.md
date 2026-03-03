---
description: "SQL and Flyway migration standards for database development"
applyTo: "database/**"
---

# SQL and Flyway Migration Standards

This document defines SQL coding standards and Flyway migration conventions for the CIVIC database layer targeting Azure SQL Database with H2 compatibility for local development.

## Target Databases

| Environment | Database          | Configuration                         |
|-------------|-------------------|---------------------------------------|
| Local       | H2 (in-memory)    | MODE=MSSQLServer for compatibility    |
| Azure       | Azure SQL Database| Production environment                |

## Flyway Migration Conventions

### File Location

Store migrations in: `backend/src/main/resources/db/migration/`

### File Naming

Format: `V{version}__{description}.sql`

* Version uses three-digit padding: `V001`, `V002`, `V003`
* Double underscore between version and description
* Description uses lowercase with underscores

Examples:

* `V001__create_program_type.sql`
* `V002__create_program.sql`
* `V003__create_notification.sql`
* `V004__seed_program_types.sql`

### Idempotent Migrations

Use `IF NOT EXISTS` guards for all DDL operations:

```sql
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'program_type')
BEGIN
    CREATE TABLE program_type (
        -- columns
    );
END
```

## Data Types

### Text Columns

Use `NVARCHAR` for all bilingual text columns to support Unicode:

| Column Type          | Data Type      | Example                    |
|---------------------|----------------|----------------------------|
| Short text (EN/FR)  | NVARCHAR(100)  | type_name, type_name_fr    |
| Medium text         | NVARCHAR(200)  | program_name, subject      |
| Long text           | NVARCHAR(500)  | recipient_email            |
| Unlimited text      | NVARCHAR(MAX)  | program_description, body  |

### Primary Keys

Use `INT IDENTITY(1,1)` for auto-incrementing primary keys:

```sql
id INT IDENTITY(1,1) PRIMARY KEY
```

### Timestamps

Use `DATETIME2` instead of `DATETIME` for better precision and range:

```sql
created_at DATETIME2 NOT NULL,
updated_at DATETIME2 NOT NULL,
submitted_at DATETIME2 NULL
```

### Boolean Columns

Use `BIT` with explicit 0/1 values:

```sql
is_active BIT DEFAULT 1
```

## Naming Conventions

### Tables

* Use lowercase with underscores: `program_type`, `notification`
* Singular names: `program` not `programs`

### Columns

* Use lowercase with underscores: `program_name`, `created_at`
* Prefix foreign keys with referenced table: `program_type_id`, `program_id`

### Constraints

| Constraint    | Format                      | Example                          |
|--------------|-----------------------------|---------------------------------|
| Primary Key  | PK_{table}                  | PK_program                      |
| Foreign Key  | FK_{child}_{parent}         | FK_program_program_type         |
| Unique       | UQ_{table}_{column}         | UQ_program_type_type_name       |
| Check        | CK_{table}_{column}         | CK_program_status               |
| Default      | DF_{table}_{column}         | DF_program_status               |
| Index        | IX_{table}_{column}         | IX_program_status               |

## Foreign Keys

Define foreign keys with explicit constraint names:

```sql
ALTER TABLE program
ADD CONSTRAINT FK_program_program_type
FOREIGN KEY (program_type_id) REFERENCES program_type(id);
```

## Indexes

Create indexes for commonly queried columns:

```sql
CREATE INDEX IX_program_status ON program(status);
CREATE INDEX IX_program_program_type_id ON program(program_type_id);
CREATE INDEX IX_notification_program_id ON notification(program_id);
```

## Audit Columns

Include audit columns on transactional tables:

| Column     | Type         | Constraints         | Description              |
|------------|--------------|---------------------|--------------------------|
| created_at | DATETIME2    | NOT NULL            | Record creation time     |
| updated_at | DATETIME2    | NOT NULL            | Last modification time   |
| created_by | NVARCHAR(100)| NULL                | User who created record  |

Lookup tables (static reference data) do not require audit columns.

## Seed Data Pattern

Use `INSERT ... WHERE NOT EXISTS` pattern for seed data:

```sql
INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Community Services', 'Services communautaires'
WHERE NOT EXISTS (
    SELECT 1 FROM program_type WHERE type_name = 'Community Services'
);

INSERT INTO program_type (type_name, type_name_fr)
SELECT 'Health & Wellness', 'Santé et bien-être'
WHERE NOT EXISTS (
    SELECT 1 FROM program_type WHERE type_name = 'Health & Wellness'
);
```

**Important:** Never use `MERGE` statement — it is not portable to H2.

## Status Columns

Use `NVARCHAR` with check constraints for status columns:

```sql
status NVARCHAR(20) DEFAULT 'DRAFT',
CONSTRAINT CK_program_status CHECK (status IN ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'))
```

## Default Values

Apply defaults at the database level:

```sql
status NVARCHAR(20) DEFAULT 'DRAFT',
created_at DATETIME2 DEFAULT GETDATE(),
updated_at DATETIME2 DEFAULT GETDATE()
```

## Complete Table Examples

### program_type (Lookup Table)

```sql
CREATE TABLE program_type (
    id INT IDENTITY(1,1) PRIMARY KEY,
    type_name NVARCHAR(100) NOT NULL,
    type_name_fr NVARCHAR(100) NOT NULL,
    CONSTRAINT UQ_program_type_type_name UNIQUE (type_name)
);
```

### program (Transactional Table)

```sql
CREATE TABLE program (
    id INT IDENTITY(1,1) PRIMARY KEY,
    program_name NVARCHAR(200) NOT NULL,
    program_description NVARCHAR(MAX) NOT NULL,
    program_type_id INT NOT NULL,
    status NVARCHAR(20) DEFAULT 'DRAFT',
    reviewer_comments NVARCHAR(MAX) NULL,
    submitted_at DATETIME2 NULL,
    reviewed_at DATETIME2 NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    created_by NVARCHAR(100) NULL,
    CONSTRAINT FK_program_program_type FOREIGN KEY (program_type_id) 
        REFERENCES program_type(id),
    CONSTRAINT CK_program_status CHECK (status IN ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'))
);

CREATE INDEX IX_program_status ON program(status);
CREATE INDEX IX_program_program_type_id ON program(program_type_id);
```

### notification (Transactional Table)

```sql
CREATE TABLE notification (
    id INT IDENTITY(1,1) PRIMARY KEY,
    program_id INT NOT NULL,
    notification_type NVARCHAR(50) NOT NULL,
    recipient_email NVARCHAR(200) NOT NULL,
    subject NVARCHAR(500) NOT NULL,
    body NVARCHAR(MAX) NOT NULL,
    sent_at DATETIME2 NULL,
    created_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    updated_at DATETIME2 NOT NULL DEFAULT GETDATE(),
    status NVARCHAR(20) DEFAULT 'PENDING',
    CONSTRAINT FK_notification_program FOREIGN KEY (program_id) 
        REFERENCES program(id),
    CONSTRAINT CK_notification_status CHECK (status IN ('PENDING', 'SENT', 'FAILED')),
    CONSTRAINT CK_notification_type CHECK (notification_type IN ('SUBMISSION', 'APPROVAL', 'REJECTION'))
);

CREATE INDEX IX_notification_program_id ON notification(program_id);
CREATE INDEX IX_notification_status ON notification(status);
```
