# ResumeAI Database Schema Documentation

## Overview

The database uses MySQL 8.0+ and stores user accounts, resume metadata, and dynamic resume sections. It is designed to be highly flexible while maintaining data integrity through relational constraints.

---

## Entity Relationship Summary

```
+---------------+        1 : N         +-----------------+        1 : N         +----------------------+
|     users     | -------------------> |     resumes     | -------------------> |   resume_sections    |
+---------------+                      +-----------------+                      +----------------------+
| id (PK)       |                      | id (PK)         |                      | id (PK)              |
| name          |                      | user_id (FK)    |                      | resume_id (FK)       |
| email (UNIQUE)|                      | title           |                      | section_type (ENUM)  |
| password_hash |                      | created_at      |                      | content (JSON)       |
| created_at    |                      | updated_at      |                      | sort_order (INT)     |
+---------------+                      +-----------------+                      | created_at           |
                                                                                | updated_at           |
                                                                                +----------------------+
```

---

## Tables Overview

### 1. `users`
Stores user profile credentials and metadata.
- **`id`**: Auto-incrementing primary key.
- **`name`**: Full name of the user.
- **`email`**: Unique email address used for authentication.
- **`password_hash`**: Securely hashed password (e.g., bcrypt/argon2).
- **`created_at`**: Timestamp when the account was registered.

### 2. `resumes`
Stores top-level resume entries created by users.
- **`id`**: Auto-incrementing primary key.
- **`user_id`**: Foreign key referencing `users(id)` (`ON DELETE CASCADE`). Deleting a user automatically deletes all their resumes.
- **`title`**: Descriptive title for the resume (e.g., "Software Engineer 2026", "Product Manager Resume").
- **`created_at`**: Creation timestamp.
- **`updated_at`**: Last modification timestamp.

### 3. `resume_sections`
Stores individual sections belonging to a resume.
- **`id`**: Auto-incrementing primary key.
- **`resume_id`**: Foreign key referencing `resumes(id)` (`ON DELETE CASCADE`). Deleting a resume automatically removes all its sections.
- **`section_type`**: `ENUM` defining the type of section:
  - `personal_info`, `education`, `experience`, `projects`, `skills`, `certifications`, `achievements`, `positions_of_responsibility`, `languages`, `interests`
- **`content`**: `JSON` document containing section-specific structured data (e.g., arrays of job objects, list of skills, contact info).
- **`sort_order`**: Integer defining the display order of sections on the resume layout.
- **`created_at`**: Section creation timestamp.
- **`updated_at`**: Section last updated timestamp.

---

## Rationale for JSON `content` Column

Instead of creating separate tables for each section type (e.g., `education_items`, `experience_items`, `skill_items`), `resume_sections` uses a flexible **JSON** column for the following key reasons:

1. **Schema Agility & Zero Migration Overhead**: As resume templates evolve or new fields are introduced (e.g., adding a "LinkedIn URL" or "GitHub profile" to `personal_info`, or adding "technologies_used" array to `projects`), schema changes do not require ALTER TABLE database migrations.
2. **Simplified Queries & Atomic Section Fetching**: Each section can be fetched, saved, or re-ordered with a single query without complex SQL joins across dozens of normalized tables.
3. **Template Customization**: Different resume templates can store custom metadata or custom styling properties directly inside the JSON payload without requiring dedicated database schema columns.
