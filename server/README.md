# Payroll Infrastructure

> A modern payroll platform that lets companies manage employees, calculate payroll, and deliver payments through configurable payout rails — including crypto and traditional payment providers.

---

## 1. Overview

**Payroll Infrastructure** is a full-stack side project exploring how modern payroll systems can separate the **payroll calculation layer** from the **payment delivery layer**.

Instead of treating payroll as simply "send money to employees", the system models the complete flow:

```text
                    ┌─────────────────────┐
                    │       Company       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │     Employees       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Payroll Engine    │
                    │                     │
                    │ Salary calculation │
                    │ Deductions         │
                    │ Net pay             │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Payout Service    │
                    └──────────┬──────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
        ┌────────────────┐          ┌────────────────┐
        │ Crypto Rail    │          │ Bank / Fiat    │
        │                │          │ Rail           │
        └────────────────┘          └────────────────┘
```

The key architectural idea is simple:

> **Payroll determines what someone is owed. Payout providers determine how they receive it.**

This separation makes the system easier to extend without coupling the payroll engine to a particular payment provider.

---

# 2. Project Goals

The project focuses on building a practical payroll backend with:

* Company accounts
* Employee management
* Salary and compensation management
* Payroll runs
* Payroll calculations
* Payroll approval
* Payout processing
* Transaction tracking
* Authentication and authorization
* Provider abstraction
* PostgreSQL persistence
* REST APIs
* A modern React frontend

The project intentionally avoids unnecessary enterprise complexity.

It is a **side project designed to demonstrate real backend engineering**, not an attempt to recreate an entire financial institution.

---

# 3. Core Architecture

```text
┌──────────────────────────────────────────────────┐
│                    Frontend                      │
│                                                  │
│                 React + TypeScript               │
└───────────────────────┬──────────────────────────┘
                        │
                        │ REST API
                        ▼
┌──────────────────────────────────────────────────┐
│                    Backend                       │
│                                                  │
│  Authentication                                  │
│  Authorization                                   │
│  Company Management                              │
│  Employee Management                             │
│  Payroll Engine                                  │
│  Payout Service                                  │
│  Transaction Service                             │
└───────────────────────┬──────────────────────────┘
                        │
                        ▼
┌──────────────────────────────────────────────────┐
│                  PostgreSQL                      │
│                                                  │
│ Users                                            │
│ Companies                                        │
│ Memberships                                      │
│ Employees                                        │
│ Compensations                                    │
│ Payroll Runs                                     │
│ Payroll Items                                    │
│ Payouts                                          │
│ Transactions                                     │
└──────────────────────────────────────────────────┘
                        │
                        │
                        ▼
             ┌──────────────────────┐
             │   Payment Providers  │
             │                      │
             │   Mock               │
             │   Crypto             │
             │   Bank               │
             └──────────────────────┘
```

---

# 4. Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Router
* REST API integration

## Backend

* Node.js
* TypeScript
* Express
* JWT authentication
* REST API

## Database

* PostgreSQL
* Prisma ORM

## Development

* npm
* Git
* dotenv
* ESLint
* Prettier

---

# 5. Repository Structure

```text
project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── sql/
│   │   └── schema.sql
│   │
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   └── TECHNICAL.md
│
└── README.md
```

---

# 6. Domain Model

The application uses nine core database entities.

```text
User
 │
 ├───────────────┐
 │               │
 ▼               ▼
Membership      Session
 │
 ▼
Company
 │
 ├──────────────────┐
 │                  │
 ▼                  ▼
Employee         PayrollRun
 │                  │
 ▼                  ▼
Compensation     PayrollItem
                     │
                     ▼
                   Payout
                     │
                     ▼
                Transaction
```

---

# 7. Database Schema

## 7.1 Users

Users represent authenticated accounts.

A user can belong to one or more companies through memberships.

### Fields

| Field         | Type      | Description     |
| ------------- | --------- | --------------- |
| id            | UUID      | Primary key     |
| email         | VARCHAR   | Unique email    |
| password_hash | TEXT      | Hashed password |
| first_name    | VARCHAR   | First name      |
| last_name     | VARCHAR   | Last name       |
| created_at    | TIMESTAMP | Creation time   |
| updated_at    | TIMESTAMP | Last update     |

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email
    ON users(email);
```

---

# 7.2 Companies

Companies are organizations using the payroll platform.

```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,

    currency VARCHAR(10) NOT NULL DEFAULT 'USD',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_companies_slug
    ON companies(slug);
```

---

# 7.3 Memberships

Memberships connect users to companies.

This allows the same user to potentially belong to multiple organizations.

```sql
CREATE TYPE company_role AS ENUM (
    'OWNER',
    'ADMIN',
    'MEMBER'
);

CREATE TABLE memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL,
    company_id UUID NOT NULL,

    role company_role NOT NULL DEFAULT 'MEMBER',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_membership_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_membership_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_user_company
        UNIQUE(user_id, company_id)
);

CREATE INDEX idx_memberships_user
    ON memberships(user_id);

CREATE INDEX idx_memberships_company
    ON memberships(company_id);
```

---

# 7.4 Employees

Employees are the people who receive payroll.

An employee belongs to a company.

```sql
CREATE TYPE employee_status AS ENUM (
    'ACTIVE',
    'INACTIVE'
);

CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    company_id UUID NOT NULL,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL,

    status employee_status NOT NULL DEFAULT 'ACTIVE',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_employee_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_employees_company
    ON employees(company_id);

CREATE INDEX idx_employees_email
    ON employees(email);
```

---

# 7.5 Compensations

Compensation stores an employee's payroll configuration.

The first version keeps this intentionally simple.

```sql
CREATE TYPE pay_frequency AS ENUM (
    'MONTHLY',
    'BIWEEKLY',
    'WEEKLY'
);

CREATE TABLE compensations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    employee_id UUID NOT NULL,

    amount NUMERIC(18,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,

    frequency pay_frequency NOT NULL DEFAULT 'MONTHLY',

    effective_from DATE NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_compensation_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE,

    CONSTRAINT positive_compensation
        CHECK (amount >= 0)
);

CREATE INDEX idx_compensations_employee
    ON compensations(employee_id);

CREATE INDEX idx_compensations_effective_date
    ON compensations(effective_from);
```

---

# 7.6 Payroll Runs

A payroll run represents one payroll execution for a company.

Example:

```text
August 2026 Payroll
Status: APPROVED
Employees: 42
Gross: $150,000
Net: $132,500
```

```sql
CREATE TYPE payroll_status AS ENUM (
    'DRAFT',
    'CALCULATED',
    'APPROVED',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
);

CREATE TABLE payroll_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    company_id UUID NOT NULL,

    period_start DATE NOT NULL,
    period_end DATE NOT NULL,

    status payroll_status NOT NULL DEFAULT 'DRAFT',

    total_gross NUMERIC(18,2) NOT NULL DEFAULT 0,
    total_deductions NUMERIC(18,2) NOT NULL DEFAULT 0,
    total_net NUMERIC(18,2) NOT NULL DEFAULT 0,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_payroll_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE CASCADE,

    CONSTRAINT valid_payroll_period
        CHECK (period_end >= period_start)
);

CREATE INDEX idx_payroll_runs_company
    ON payroll_runs(company_id);

CREATE INDEX idx_payroll_runs_status
    ON payroll_runs(status);

CREATE INDEX idx_payroll_runs_period
    ON payroll_runs(period_start, period_end);
```

---

# 7.7 Payroll Items

Payroll items represent individual employees inside a payroll run.

```text
Payroll Run
    │
    ├── Employee A → $4,000
    ├── Employee B → $3,500
    ├── Employee C → $5,200
    └── Employee D → $2,800
```

```sql
CREATE TABLE payroll_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    payroll_run_id UUID NOT NULL,
    employee_id UUID NOT NULL,

    gross_amount NUMERIC(18,2) NOT NULL,
    deductions NUMERIC(18,2) NOT NULL DEFAULT 0,
    net_amount NUMERIC(18,2) NOT NULL,

    currency VARCHAR(10) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_payroll_item_run
        FOREIGN KEY (payroll_run_id)
        REFERENCES payroll_runs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_payroll_item_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE RESTRICT,

    CONSTRAINT valid_payroll_amounts
        CHECK (
            gross_amount >= 0
            AND deductions >= 0
            AND net_amount >= 0
        ),

    CONSTRAINT unique_employee_payroll
        UNIQUE(payroll_run_id, employee_id)
);

CREATE INDEX idx_payroll_items_run
    ON payroll_items(payroll_run_id);

CREATE INDEX idx_payroll_items_employee
    ON payroll_items(employee_id);
```

---

# 7.8 Payouts

A payout represents an attempt to deliver a payroll item to an employee.

The payout layer deliberately doesn't care whether the money is delivered through crypto, bank transfer, or another provider.

```sql
CREATE TYPE payout_status AS ENUM (
    'PENDING',
    'PROCESSING',
    'COMPLETED',
    'FAILED'
);

CREATE TYPE payout_method AS ENUM (
    'BANK',
    'CRYPTO'
);

CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    payroll_item_id UUID NOT NULL,

    amount NUMERIC(18,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,

    method payout_method NOT NULL,

    provider VARCHAR(100),
    provider_reference VARCHAR(255),

    status payout_status NOT NULL DEFAULT 'PENDING',

    processed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_payout_payroll_item
        FOREIGN KEY (payroll_item_id)
        REFERENCES payroll_items(id)
        ON DELETE RESTRICT,

    CONSTRAINT positive_payout
        CHECK (amount >= 0)
);

CREATE INDEX idx_payouts_payroll_item
    ON payouts(payroll_item_id);

CREATE INDEX idx_payouts_status
    ON payouts(status);

CREATE INDEX idx_payouts_provider_reference
    ON payouts(provider_reference);
```

---

# 7.9 Transactions

Transactions provide a simple financial record associated with payouts.

This is intentionally **not** a full accounting ledger.

```sql
CREATE TYPE transaction_status AS ENUM (
    'PENDING',
    'COMPLETED',
    'FAILED'
);

CREATE TYPE transaction_type AS ENUM (
    'PAYROLL_PAYOUT',
    'REFUND'
);

CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    payout_id UUID,

    type transaction_type NOT NULL,

    amount NUMERIC(18,2) NOT NULL,
    currency VARCHAR(10) NOT NULL,

    status transaction_status NOT NULL DEFAULT 'PENDING',

    provider VARCHAR(100),
    provider_reference VARCHAR(255),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_transaction_payout
        FOREIGN KEY (payout_id)
        REFERENCES payouts(id)
        ON DELETE SET NULL,

    CONSTRAINT positive_transaction
        CHECK (amount >= 0)
);

CREATE INDEX idx_transactions_payout
    ON transactions(payout_id);

CREATE INDEX idx_transactions_status
    ON transactions(status);

CREATE INDEX idx_transactions_provider_reference
    ON transactions(provider_reference);
```

---

# 8. Database Relationship Summary

```text
users
  │
  │ 1:N
  ▼
memberships
  │
  │ N:1
  ▼
companies
  │
  ├───────────────┐
  │               │
  │ 1:N           │ 1:N
  ▼               ▼
employees      payroll_runs
  │               │
  │ 1:N           │ 1:N
  ▼               ▼
compensations  payroll_items
                  │
                  │ 1:1
                  ▼
                payouts
                  │
                  │ 1:N
                  ▼
             transactions
```

---

# 9. Authentication

Authentication uses JWT-based sessions.

### Registration

```http
POST /api/v1/auth/register
```

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password"
}
```

### Login

```http
POST /api/v1/auth/login
```

Response:

```json
{
  "user": {
    "id": "uuid",
    "email": "john@example.com"
  },
  "accessToken": "jwt"
}
```

Protected routes require:

```http
Authorization: Bearer <token>
```

Passwords are never stored directly.

---

# 10. Authorization

Authentication answers:

> Who are you?

Authorization answers:

> What are you allowed to do?

Company-level authorization is enforced through memberships.

Example:

```text
OWNER
 ├── Manage company
 ├── Manage employees
 ├── Create payroll
 ├── Approve payroll
 └── Process payouts

ADMIN
 ├── Manage employees
 ├── Create payroll
 └── Process payroll

MEMBER
 └── Read permitted company data
```

Every company-scoped request must verify that the authenticated user belongs to the requested company.

---

# 11. Payroll Engine

The payroll engine is the core business logic.

A simplified payroll calculation:

```text
Gross Salary
      │
      ▼
Deductions
      │
      ▼
Net Salary
```

For example:

```text
Gross salary       $5,000
Deductions          $500
────────────────────────
Net salary         $4,500
```

The payroll engine creates a `payroll_run` and generates one `payroll_item` for every employee included in the run.

---

# 12. Payroll Lifecycle

Payroll runs follow an explicit state machine.

```text
        ┌─────────┐
        │  DRAFT  │
        └────┬────┘
             │ calculate
             ▼
      ┌─────────────┐
      │ CALCULATED  │
      └──────┬──────┘
             │ approve
             ▼
       ┌───────────┐
       │ APPROVED  │
       └─────┬─────┘
             │ process
             ▼
      ┌────────────┐
      │ PROCESSING │
      └──────┬─────┘
             │
       ┌─────┴─────┐
       ▼           ▼
┌────────────┐ ┌────────┐
│ COMPLETED  │ │ FAILED │
└────────────┘ └────────┘
```

Invalid state transitions should be rejected by the service layer.

For example:

```text
DRAFT → COMPLETED
```

is invalid.

---

# 13. Payout Provider Architecture

The payroll system should not directly depend on a specific payment provider.

Instead:

```ts
interface PayoutProvider {
    createPayout(request: PayoutRequest): Promise<PayoutResult>;
    getPayout(reference: string): Promise<PayoutResult>;
}
```

Possible implementations:

```text
PayoutProvider
│
├── MockPayoutProvider
├── CryptoPayoutProvider
└── BankPayoutProvider
```

This makes local development possible without requiring real money movement.

### Example

```ts
const provider = payoutProviderFactory.get(method);

await provider.createPayout({
    amount,
    currency,
    destination
});
```

The payroll engine doesn't need to know how the provider works internally.

---

# 14. API Design

All APIs are versioned:

```text
/api/v1
```

## Authentication

```text
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
```

## Companies

```text
POST   /companies
GET    /companies/:id
PATCH  /companies/:id
GET    /companies/:id/members
```

## Employees

```text
POST   /employees
GET    /employees
GET    /employees/:id
PATCH  /employees/:id
DELETE /employees/:id
```

## Payroll

```text
POST   /payroll/runs
GET    /payroll/runs
GET    /payroll/runs/:id
POST   /payroll/runs/:id/calculate
POST   /payroll/runs/:id/approve
POST   /payroll/runs/:id/process
```

## Payouts

```text
GET    /payouts
GET    /payouts/:id
POST   /payouts/:id/retry
```

## Transactions

```text
GET    /transactions
GET    /transactions/:id
```

---

# 15. Example Payroll Flow

A normal payroll execution looks like:

```text
1. Company creates payroll run
             │
             ▼
2. Employees selected
             │
             ▼
3. Compensation loaded
             │
             ▼
4. Payroll calculated
             │
             ▼
5. Payroll items created
             │
             ▼
6. Company approves payroll
             │
             ▼
7. Payouts created
             │
             ▼
8. Provider processes payments
             │
             ▼
9. Transactions recorded
             │
             ▼
10. Payroll marked completed
```

---

# 16. Idempotency

Financial operations should not accidentally execute twice.

For example, calling:

```http
POST /payroll/runs/:id/process
```

twice should not create two payments for every employee.

The backend therefore checks the current payroll state before processing.

Conceptually:

```text
if payroll.status !== APPROVED
    reject request

if payroll already processing/completed
    reject or return existing result

otherwise
    begin processing
```

The database transaction should also protect the critical state changes.

---

# 17. Money Handling

Money must never be represented using JavaScript floating-point arithmetic for financial calculations.

Avoid:

```ts
const amount = 0.1 + 0.2;
```

Use database `NUMERIC` values and a proper money representation in application code.

The database uses:

```sql
NUMERIC(18,2)
```

for fiat-style amounts.

For cryptocurrency amounts requiring greater precision, the schema can later be extended to support asset-specific decimal precision.

---

# 18. Error Handling

The API uses consistent error responses.

Example:

```json
{
  "success": false,
  "error": {
    "code": "PAYROLL_NOT_APPROVED",
    "message": "Payroll must be approved before processing."
  }
}
```

Common errors include:

```text
AUTH_REQUIRED
INVALID_CREDENTIALS
FORBIDDEN
RESOURCE_NOT_FOUND
VALIDATION_ERROR
PAYROLL_NOT_APPROVED
PAYROLL_ALREADY_PROCESSED
PAYOUT_FAILED
PROVIDER_ERROR
INTERNAL_SERVER_ERROR
```

---

# 19. Backend Layering

The backend follows a simple layered architecture.

```text
HTTP Request
     │
     ▼
Routes
     │
     ▼
Middleware
     │
     ▼
Controller
     │
     ▼
Service
     │
     ▼
Prisma
     │
     ▼
PostgreSQL
```

### Controllers

Responsible for HTTP concerns.

```text
Request
Response
Status codes
```

### Services

Responsible for business logic.

```text
Payroll calculation
Authorization rules
State transitions
Payout processing
```

### Models / Prisma

Responsible for persistence.

This prevents business logic from becoming scattered throughout route handlers.

---

# 20. Environment Variables

Example `.env`:

```env
NODE_ENV=development

PORT=5000

DATABASE_URL="postgresql://user:password@localhost:5432/payroll"

JWT_SECRET="change-me"
JWT_EXPIRES_IN="15m"

CORS_ORIGIN="http://localhost:5173"
```

Secrets should never be committed to Git.

`.env` should be included in `.gitignore`.

---

# 21. Local Development

Clone the repository:

```bash
git clone <repository-url>
cd payroll
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```bash
cp .env.example .env
```

Start PostgreSQL.

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

Start backend:

```bash
npm run dev
```

Start frontend:

```bash
npm run dev
```

---

# 22. Development Commands

Backend:

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

Database:

```bash
npx prisma migrate dev
npx prisma studio
npx prisma generate
```

---

# 23. Security Principles

Even though this is a side project, the backend follows basic security practices.

### Passwords

Passwords are hashed before storage.

### JWT

Tokens are signed using a server-side secret.

### Authorization

Company resources require membership verification.

### Validation

All external input is validated before reaching business logic.

### SQL Injection

Database access is performed through Prisma's parameterized queries.

### Secrets

API keys and credentials are stored in environment variables.

### Financial Operations

Payroll processing uses explicit state transitions and database transactions where necessary.

---

# 24. What This Project Is Not

This project is intentionally **not** trying to be:

* A complete banking system
* A production accounting platform
* A regulatory compliance platform
* A full blockchain payroll protocol
* A distributed microservice architecture
* A replacement for established payroll providers

The purpose is to explore the engineering behind a modern payroll platform while keeping the architecture understandable and buildable by a small team or individual developer.

---

# 25. Future Extensions

The architecture leaves room for additional functionality without requiring a rewrite.

Potential extensions include:

### Payment Rails

```text
Crypto
Stablecoins
Bank transfers
Mobile money
```

### Payroll Features

```text
Taxes
Bonuses
Overtime
Allowances
Deductions
Multiple currencies
Recurring payroll
```

### Company Features

```text
Teams
Departments
Multiple administrators
Invitations
Employee onboarding
```

### Financial Features

```text
Wallet balances
Funding accounts
Exchange rates
Transaction history
Payment reconciliation
```

### Infrastructure

```text
Webhooks
Background jobs
Queue processing
Notifications
Provider retries
Observability
```

These should be added only when the project actually needs them.

---

# 26. Design Philosophy

The project follows a few simple principles.

### Keep the core small

The fewer moving parts the better.

### Separate business logic from infrastructure

Payroll calculations should not know about HTTP or payment-provider implementation details.

### Make state explicit

Payroll and payouts have clearly defined states rather than relying on ambiguous booleans.

### Design for extension, not speculation

The system should be easy to extend without building infrastructure that isn't currently needed.

### Build the simplest correct system

Complexity should be introduced because the product requires it, not because the architecture diagram looks impressive.

---

# 27. Project Status

**Status:** Active side project

Current focus:

* [x] Project architecture
* [x] Company onboarding
* [x] Employee onboarding
* [ ] Authentication
* [ ] Employee management API
* [ ] Compensation management
* [ ] Payroll calculation
* [ ] Payroll approval
* [ ] Payout abstraction
* [ ] Transaction tracking
* [ ] Frontend integration
* [ ] Testing
* [ ] Deployment

---

# 28. The Core Idea

Traditional payroll systems often treat payment as the final implementation detail.

This project explores a different abstraction:

```text
                    EMPLOYEE
                       ▲
                       │
                       │ payment
                       │
              ┌────────┴────────┐
              │ Payout Provider │
              └────────┬────────┘
                       ▲
                       │
                 payout request
                       │
              ┌────────┴────────┐
              │ Payroll Engine  │
              └────────┬────────┘
                       ▲
                       │
                 compensation
                       │
              ┌────────┴────────┐
              │    Company      │
              └─────────────────┘
```

The payroll engine determines **what should happen**.

The payout layer determines **how it happens**.

That separation is the foundation of the system.

---

## License

This project is currently a personal side project and is provided for educational and experimental purposes.
