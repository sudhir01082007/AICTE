# AICTE Approval Workflow Automation Platform
**Problem Statement:** Smart India Hackathon (SIH 2026) – PS 26262  
**System Architecture & Foundation Document (Phase 1)**

---

## 1. System Architecture Overview

The **AICTE Approval Workflow Automation Platform** is an enterprise-grade regulatory administration and compliance monitoring platform engineered for the All India Council for Technical Education (AICTE), Ministry of Education, Government of India.

The platform streamlines technical institution application approvals, monitoring, scrutiny, and expert visits while strictly enforcing human regulatory decision sovereignty.

```
                           +------------------------------------+
                           |    Client Tier (React + Vite)     |
                           |   Bootstrap 5, React-Bootstrap,    |
                           |   React Router, Axios, Recharts    |
                           +-----------------+------------------+
                                             |
                                     HTTP/REST (Port 4000)
                                     Bearer JWT + RBAC
                                             |
+--------------------------------------------v--------------------------------------------+
|                               Server Tier (NestJS API)                                 |
|                                                                                         |
|   +-----------------------+  +----------------------+  +----------------------------+   |
|   | Global Prefix: /api   |  | CORS & Validation    |  | Swagger Docs: /api/docs    |   |
|   +-----------------------+  +----------------------+  +----------------------------+   |
|                                                                                         |
|   [ Authentication & RBAC Guard ] <---> [ Institution Scope Isolation Guard ]           |
|                                                                                         |
|   +-------------------+  +--------------------+  +------------------+  +-------------+  |
|   | Workflow Engine   |  | Compliance Engine  |  | Pendency Engine  |  | Audit Trail |  |
|   | (Dynamic Routing) |  | (Expiry & Alerts)  |  | (SLA & Ageing)   |  | (Hash-Chain)|  |
|   +---------+---------+  +---------+----------+  +--------+---------+  +------+------+  |
|             |                      |                      |                   |         |
|             +----------------------+----------+-----------+-------------------+         |
|                                               |                                         |
|                                [ Prisma ORM Persistence ]                               |
+-----------------------------------------------+-----------------------------------------+
                                                |
                               +----------------v---------------+
                               |     PostgreSQL 18 Database     |
                               |  - Foreign Key Integrity       |
                               |  - Append-Only Audit Logs      |
                               |  - Persistent Job Locks        |
                               +--------------------------------+
```

---

## 2. Technology Stack

### Frontend Client
* **Framework:** React 18
* **Language:** JavaScript (Modern ES6+) — *Strictly non-TypeScript for React layer*
* **Build Tooling:** Vite
* **UI & Design System:** Bootstrap 5.3, React-Bootstrap
* **Icons:** Lucide React (Clean SVG icons; no emoji icons)
* **Routing:** React Router DOM (v6) with protected and role-based routes
* **HTTP Client:** Axios (configured with JWT interceptors)
* **State Management:** React Context API & Custom Hooks
* **Visualisations:** Recharts

### Backend Server
* **Runtime:** Node.js (v26 LTS)
* **Framework:** NestJS 10 (TypeScript)
* **API Paradigm:** RESTful APIs with Swagger/OpenAPI 3.0 specification
* **Validation:** `class-validator` and `class-transformer`
* **Data Access / ORM:** Prisma ORM
* **Security:** Helmet, Bcrypt password hashing, Passport JWT

### Database & Storage
* **Relational Database:** PostgreSQL 18
* **Document Engine:** Isolated file storage driver with MIME-type verification

---

## 3. Frontend Architecture & Folder Responsibilities

```
client/
├── public/                     # Static assets, logos, and favicon
├── src/
│   ├── assets/
│   │   ├── images/             # Static imagery
│   │   ├── icons/              # Custom brand SVGs
│   │   └── styles/
│   │       ├── global.css      # Core global stylesheet
│   │       ├── variables.css   # AICTE institutional design tokens
│   │       └── bootstrap-overrides.css # Enterprise Bootstrap customisations
│   ├── components/
│   │   ├── common/             # Reusable UI widgets (PageHeader, StatusBadge, DataTable, LoadingSpinner, EmptyState)
│   │   ├── layout/             # Application shell (Header, Sidebar, Footer, MainLayout)
│   │   └── charts/             # Recharts wrappers (BarChart, LineChart, PieChart)
│   ├── features/               # Independent domain modules
│   │   ├── auth/               # Login, session persistence, role switching
│   │   ├── dashboard/          # Pendency, SLA violations, ageing metrics
│   │   ├── institutions/       # Institution profile management & records
│   │   ├── applications/       # Submission forms, course intakes, stage progress
│   │   ├── workflow/           # Routing rules, stage instances, human gating
│   │   ├── compliance/         # Undertakings, lease expiry alerts, evidence verification
│   │   ├── evc/                # Expert Visit Committee scheduling and reports
│   │   └── audit/              # Cryptographic audit explorer and hash verification
│   ├── hooks/                  # Reusable hooks (useAuth, useDebounce, usePagination)
│   ├── context/                # Shared state providers (AuthContext, NotificationContext)
│   ├── services/               # Centralised Axios client & endpoint constants (api.js, apiEndpoints.js)
│   ├── routes/                 # Routing table (AppRoutes.jsx, ProtectedRoute.jsx, RoleBasedRoute.jsx)
│   ├── utils/                  # Formatters, date helpers, validators, constants
│   ├── App.jsx                 # Top-level routing and layout binding
│   └── main.jsx                # DOM mounting entrypoint
├── .env                        # Client environment configuration
├── package.json
└── vite.config.js
```

---

## 4. Backend Architecture & Folder Responsibilities

```
server/
├── prisma/
│   └── schema.prisma           # Relational PostgreSQL schema definitions
├── src/
│   ├── auth/                   # JWT generation, Bcrypt hashing, AuthController
│   ├── users/                  # Officer, Institution user entity management
│   ├── roles/                  # Role & Permission RBAC definitions
│   ├── institutions/           # Institution metadata and regional binding
│   ├── applications/           # Application creation, type resolution (New/EoA/Intake)
│   ├── workflow/               # Dynamic rule evaluation & stage transition state machine
│   ├── scrutiny/               # Deficiency tracking, return-to-institution, re-scrutiny
│   ├── evc/                    # Committee assignment & inspection report tracking
│   ├── compliance/             # Undertaking compliance & document validity engine
│   ├── documents/              # File upload validation, MIME checking, storage driver
│   ├── notifications/          # Alert generator (90/60/30/7-day alerts) & deduplication
│   ├── scheduler/              # Persistent database-backed task executor
│   ├── audit/                  # Append-only SHA-256 hash-chaining verification engine
│   ├── analytics/              # Dynamic queries for regional & stage pendency
│   ├── common/                 # Reusable guards, interceptors, decorators, and exception filters
│   ├── config/                 # Environment validation and configuration services
│   ├── app.module.ts           # Root NestJS module aggregating all domains
│   └── main.ts                 # Bootstrap script configuring Swagger, Pipes, and CORS
├── .env                        # Server configuration (PORT, DATABASE_URL, JWT_SECRET)
├── package.json
└── tsconfig.json
```

---

## 5. Development Commands

### Root Orchestrator
```bash
# Run both Backend API and Client Frontend
npm run dev:server
npm run dev:client

# Production Builds
npm run build:server
npm run build:client
```

### Server Independent Commands
```bash
cd server
npm run start:dev       # Starts NestJS with hot reloading on port 4000
npm run build           # Compiles NestJS TypeScript to dist/
npm run prisma:generate # Generates Prisma Client
```

### Client Independent Commands
```bash
cd client
npm run dev             # Starts Vite dev server on port 3000
npm run build           # Bundles React production build into dist/
npm run preview         # Previews production bundle locally
```

---

## 6. Environment Configuration

### Server (`server/.env`)
| Variable | Default Value | Description |
|---|---|---|
| `PORT` | `4000` | Port for the NestJS API |
| `NODE_ENV` | `development` | Runtime environment |
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/aicte_db?schema=public` | Connection string for PostgreSQL |
| `JWT_SECRET` | `aicte_super_secure_jwt_secret_key_2026_regulatory_platform` | Secret signing key for JWT tokens |
| `JWT_EXPIRES_IN` | `1d` | Token expiry duration |
| `UPLOAD_DIR` | `./uploads` | Local storage location for uploaded evidence |
| `MAX_FILE_SIZE_BYTES` | `10485760` (10MB) | File upload size ceiling |

### Client (`client/.env`)
| Variable | Default Value | Description |
|---|---|---|
| `VITE_API_BASE_URL` | `http://localhost:4000/api` | API Base URL for Axios requests |
| `VITE_APP_TITLE` | `AICTE Approval Workflow Platform` | Application page header |

---

## 7. Architectural Decisions & Principles

1. **Human Decision Sovereignty:** Automated rules generate stage recommendations and track SLAs, but approving or rejecting an application strictly requires an authenticated human officer signature.
2. **Deterministic Hash Chaining:** Audit log entries form a cryptographic merkle chain where each record incorporates `SHA256(prev_hash + actor_id + action + timestamp + payload)` to guarantee immediate tamper detection.
3. **Database-Backed Persistent Scheduler:** Compliance notifications are stored with idempotency keys (`application_id + tier + date`) and scheduled execution states (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`) to survive server restarts with zero duplicate alerts.
4. **Clean UI Standards:** Bootstrap 5 with enterprise color overrides provides accessible contrast, clean typography, responsive tables, and zero unnecessary visual bloat.

