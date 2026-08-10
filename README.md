 # Payroll.

> Modern payroll infrastructure for companies paying people across borders.

Payroll is changing.

Teams are global, employees work from anywhere, and money increasingly moves across both traditional financial systems and digital assets. Yet payroll operations are still often built around spreadsheets, manual transfers, disconnected tools, and repetitive reconciliation.

**Payroll.** is being built to provide a single infrastructure layer for running global payroll.

Companies manage their payroll from one place. Employees choose how they receive their earnings. The system coordinates the payroll run, payout routing, settlement, and transaction records across supported rails.

---

## The idea

The core principle is simple:

**One payroll operation. Multiple payout rails. One source of truth.**

A company should not need a completely different payroll workflow because one employee wants a bank transfer while another wants to receive USDC.

Payroll abstracts that complexity.

```text
                         COMPANY
                            │
                            ▼
                    ┌───────────────┐
                    │    PAYROLL    │
                    │    ENGINE     │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          BANK RAIL      CRYPTO RAIL   OTHER RAILS
              │             │             │
              ▼             ▼             ▼
          LOCAL FIAT       USDC        FUTURE
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                       EMPLOYEES
```

The payroll engine remains the central layer while the payout destination can vary independently.

---

## What it solves

Traditional payroll becomes increasingly complicated as a company becomes more distributed.

A finance team may need to coordinate:

* Employee compensation
* Payroll schedules
* Bank transfers
* Crypto transfers
* Exchange or conversion workflows
* Wallet addresses
* Payment confirmations
* Treasury balances
* Employee payout preferences
* Reconciliation
* Payroll records
* Audit history

These responsibilities are often spread across multiple systems.

Payroll brings the operational layer together.

### For companies

* Centralized payroll management
* Employee onboarding
* Compensation management
* Payroll runs
* Treasury visibility
* Payout routing
* Transaction tracking
* Approval workflows
* Payroll history
* Auditable records

### For employees

* Personal payout preferences
* Multiple payout options
* Wallet or bank destinations
* Payment history
* Settlement status
* Greater control over how earnings are received

### For developers

The long-term goal is to make payroll infrastructure programmable.

Applications should be able to integrate payroll capabilities rather than rebuilding payment orchestration from scratch.

---

# Architecture

The project is organized around two primary applications:

```text
payroll/
│
├── backend/
│   └── Payroll API & infrastructure
│
├── frontend/
│   └── Payroll web application
│
└── README.md
```

The architecture separates the product interface from the underlying payroll infrastructure.

```text
┌─────────────────────────────────────────────────────┐
│                    WEB APPLICATION                  │
│                                                     │
│   Dashboard · Employees · Payroll · Treasury       │
│   Preferences · Reports · Administration            │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ API
                        ▼
┌─────────────────────────────────────────────────────┐
│                    BACKEND                           │
│                                                     │
│   Authentication                                    │
│   Organizations                                     │
│   Employees                                         │
│   Payroll Engine                                    │
│   Payout Orchestration                              │
│   Treasury                                          │
│   Transactions                                      │
│   Audit History                                     │
└───────────────────────┬─────────────────────────────┘
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
      Traditional Rails       Digital Assets
             │                     │
             ▼                     ▼
       Local Currency             Crypto
```

The frontend is responsible for the user experience.

The backend is responsible for the actual business logic, data, authorization, payroll processing, and integration with payout infrastructure.

---

# Frontend

The frontend provides the operational interface for companies and employees.

The experience is designed around clarity rather than financial complexity.

## Core areas

### Payroll dashboard

A centralized overview of the organization's payroll activity.

It provides visibility into:

* Current payroll
* Employee count
* Treasury
* Payroll spending
* Upcoming payroll runs
* Recent payouts
* Settlement status

### Payroll management

Companies can manage payroll runs from a single workflow.

The intended flow is:

**Prepare → Review → Approve → Execute → Reconcile**

### Employee management

Organizations can onboard and manage employees while keeping compensation and payout information connected to the payroll system.

### Payout preferences

Employees can select their preferred payout method rather than relying on a single company-wide payment rail.

### Treasury

The treasury layer gives companies visibility into funds available for payroll and the relationship between available funds and upcoming obligations.

### Transaction history

Payroll activity should remain understandable after the payment has happened.

Each payout is associated with the relevant payroll run and transaction information.

---

# Backend

The backend is the core of the platform.

It provides the infrastructure required to move from a payroll instruction to an executed and recorded payout.

The backend is responsible for:

* Authentication and authorization
* Organizations
* Employee records
* Compensation
* Payroll schedules
* Payroll runs
* Payout instructions
* Payout routing
* Treasury records
* Transaction states
* Settlement tracking
* Audit history
* External payment integrations

The backend is intentionally designed as the source of truth for payroll operations.

The frontend should never be responsible for determining whether a payroll operation is valid or whether a payout has actually settled.

---

# Payroll lifecycle

A payroll run follows a defined lifecycle.

```text
                 CREATE
                    │
                    ▼
                 REVIEW
                    │
                    ▼
                APPROVE
                    │
                    ▼
                 FUND
                    │
                    ▼
                EXECUTE
                    │
                    ▼
                SETTLE
                    │
                    ▼
                RECONCILE
```

This distinction matters.

A payroll instruction is not the same thing as a successful payment.

The system should be able to distinguish between states such as:

* Draft
* Pending
* Approved
* Processing
* Paid
* Failed
* Cancelled

This provides a reliable operational history and prevents the interface from treating an attempted transaction as a completed one.

---

# Multi-rail payments

One of the fundamental ideas behind Payroll. is separating **payroll logic** from **payout rails**.

The payroll engine determines:

> Who should receive what?

The payout layer determines:

> How should they receive it?

This allows the same payroll run to contain different payout destinations.

For example:

| Employee | Compensation | Payout |
| -------- | -----------: | ------ |
| Alex     |       $3,800 | USDC   |
| Sarah    |       $2,900 | NGN    |
| Daniel   |       $3,200 | USDC   |

From the company's perspective, this remains a single payroll operation.

The underlying infrastructure handles the differences between the payout rails.

---

# Treasury

Payroll depends on knowing whether the company can actually meet its payroll obligations.

The treasury layer is therefore treated as a first-class part of the system.

It provides the foundation for:

* Available payroll funds
* Payroll obligations
* Funding requirements
* Treasury movements
* Settlement records
* Reconciliation

The long-term architecture is intended to support multiple treasury sources without coupling the payroll engine to a single financial provider.

---

# Security model

Payroll handles sensitive financial and organizational information.

Security is therefore part of the architecture rather than a feature added later.

The system is designed around several principles.

### Least privilege

Users should only have access to the operations required for their role.

### Explicit authorization

Critical actions such as approving or executing payroll should be authorized server-side.

### Auditability

Important payroll operations should leave an immutable or strongly protected history.

### Separation of concerns

Payroll logic, payout execution, authentication, and presentation should remain separated.

### Verification

Financial state should be verified by the backend rather than trusted from client-side state.

### Idempotency

Payment operations must be designed to avoid accidentally executing the same payroll instruction multiple times.

---

# Why this architecture

Payroll is not simply a payment form.

A payment system answers:

> Send $3,800.

A payroll system needs to answer:

> Why is Alex receiving $3,800?
> Which payroll run does it belong to?
> Was it approved?
> Which payout rail was selected?
> Was the transaction executed?
> Did it settle?
> Can the company prove what happened?

That distinction is central to the project.

The system is therefore being built around **financial state and operational history**, not simply transaction submission.

---

# Project principles

### One source of truth

Payroll information should not be scattered across spreadsheets and disconnected payment tools.

### Rails are replaceable

The payroll engine should not be tightly coupled to a particular payment provider, blockchain, bank, or asset.

### Employees get choice

The company controls payroll. Employees should have meaningful control over how their earnings are received.

### Everything important is traceable

A payroll operation should be understandable from creation to settlement.

### Infrastructure first

The goal is not simply to build another payroll dashboard.

The long-term goal is to build programmable payroll infrastructure that other products can build on.

---

# Product direction

Payroll. is being developed toward a broader financial infrastructure platform.

The roadmap is expected to expand around areas such as:

* More local payout rails
* Additional stablecoins and digital assets
* Automated currency conversion
* Recurring payroll
* Advanced approval workflows
* Role-based organization management
* Payroll reporting
* Tax and compliance integrations
* Developer APIs
* Webhooks
* Embedded payroll
* Treasury automation
* Accounting integrations

The underlying objective remains the same:

**Make paying a global team feel like one operation.**

---

# Development

The repository contains two primary applications.

### Frontend

The web interface used by companies and employees.

It provides the visual and operational layer for interacting with the payroll system.

### Backend

The API and business-logic layer responsible for authentication, organizations, payroll processing, payout orchestration, transaction state, and persistence.

Each application maintains its own development environment and dependencies.

Refer to the respective application directory for environment configuration and local development instructions.

---

# Project status

Payroll. is currently under active development.

The interface and architecture are being developed toward a production-grade payroll infrastructure platform.

Some capabilities represented in the product experience may currently be conceptual, simulated, or under implementation.

This repository should therefore be considered a **work in progress**, not a production financial service.

---

# Contributing

Contributions, discussions, architecture ideas, and technical feedback are welcome.

Before opening a pull request:

1. Keep changes focused.
2. Follow the existing project structure.
3. Avoid introducing unnecessary dependencies.
4. Document meaningful architectural changes.
5. Test changes before submitting them.
6. Keep security and financial correctness in mind when modifying payment-related functionality.

For larger changes, open an issue first so the architecture and direction can be discussed before implementation.

---

# Disclaimer

Payroll. is a software project and does not currently represent a licensed financial institution, bank, money transmitter, exchange, or payment processor.

Any financial, crypto, or payout functionality shown in the project should not be interpreted as a claim of production availability, regulatory approval, or live settlement capability unless explicitly stated.

---

# License

This project is currently under development.

License terms will be added as the project approaches a public release.

---

## The vision

The future of work is global.

Payroll infrastructure should be global too.

**One company.
One payroll.
Everywhere.**

**Payroll.**
