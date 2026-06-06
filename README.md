# ATS — Applicant Tracking System

A full-stack app for managing job postings and receiving applications. Built with Next.js on the frontend and NestJS on the backend.

## Quick Start

```bash
# database
docker compose up -d

# backend (port 5000)
cd backend
cp env .env
npm install
npx prisma generate
npm run start:dev

# frontend (port 3000)
cd frontend
cp env .env
npm install
npm run dev
```

Open http://localhost:3000/jobs to browse jobs.  
Admin panel at http://localhost:3000/auth/login — use `admin@example.com` / `admin123`.

---

## Backend

A NestJS app with Prisma talking to PostgreSQL. CORS is configured to allow requests from the frontend origin.

### Endpoints

| Method | Path | Auth | What it does |
|--------|------|------|-------------|
| POST | `/auth/login` | no | Login, returns a JWT |
| GET | `/jobs` | no | Lists jobs (public sees only LIVE ones) |
| GET | `/jobs/:id` | no | Single job by UUID |
| GET | `/jobs/slug/:slug` | no | Single job by slug |
| POST | `/jobs` | JWT | Create a job |
| PATCH | `/jobs/:id` | JWT | Update a job |
| DELETE | `/jobs/:id` | JWT | Delete a job |
| POST | `/applications/create` | no | Submit an application |

### How auth works

There's a middleware (`ContextMiddleware`) on every route. If a request has a valid `Authorization: Bearer <token>` header, it extracts the user info and attaches it to the request. If not, it just passes through. No blocking.

Admin endpoints (creating/editing/deleting jobs) are protected by `JwtAuthGuard` — they require a valid token.

Login gives you a JWT with `sub` (user ID) and `email`, expires in 1 day.

### Database

Quick overview of the Prisma models:

- **User** — id, email, hashed password, timestamps
- **Job** — title, description, pay range, location, job/location type (enums), status (enum), slug (unique), toggles for requiring resume/cover letter, timestamps
- **Application** — name, email, phone (optional), resume path, cover letter (optional), linked to a job

Enums: job types are `FULL_TIME`, `PART_TIME`, `INTERNSHIP`, `CONTRACT`. Location types are `REMOTE`, `ONSITE`, `HYBRID`. Statuses are `DRAFT`, `PENDING`, `LIVE`, `CLOSED`.

---

## Frontend

Next.js 16 with React 19, Formik for forms, Zustand for auth state, LESS modules for styling.

### Pages

| Route | What's there |
|-------|-------------|
| `/jobs` | Public listing — search and filter live jobs |
| `/jobs/[slug]` | Job detail page with an apply form |
| `/auth/login` | Admin login form |
| `/admin/dashboard` | Stats overview (total, live, pending, closed counts) |
| `/admin/jobs` | Job management — table with search, filter, delete |
| `/admin/jobs/create` | Create a new job |
| `/admin/jobs/[id]/edit` | Edit an existing job |

### How auth works on the frontend

1. User logs in → token and user data go into a Zustand store that persists to localStorage as `ats_auth`.
2. An Axios interceptor picks up the token from localStorage and adds it as `Authorization: Bearer <token>` on every outgoing request.
3. The admin layout reads `isAuthenticated` from the store — if false, it redirects to the login page.
4. If any API call returns a 401, the interceptor clears the stored token and redirects to login.
5. Logout clears the store and sends the user back to login.

### Components

**UI kit** (`components/ui/`): Button, Input, Select, TextArea, Toggle, Badge, Table, Modal, Skeleton, Toast

**Feature components**: AdminSidebar, PublicHeader, JobCard, JobForm, JobTable, JobActions, JobApplyForm, DynamicFieldsBuilder, FileUploadField, FormFieldToggle

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Notes |
|----------|---------|-------|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/ats?schema=public` | Prisma connection string |
| `JWT_SECRET` | `my-super-secret-key` | Used to sign JWTs |
| `PORT` | `5000` | What port the server listens on |
| `CORS_ORIGIN` | `http://localhost:3000,http://localhost:3001` | Comma-separated allowed origins |

### Frontend (`frontend/.env`)

| Variable | Default | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000` | Where the backend lives |

---

## Scripts

### Backend

| `npm run ...` | What it does |
|--------------|-------------|
| `start:dev` | Starts with hot reload (port 5000) |
| `build` | Compiles the NestJS app |
| `lint` | ESLint with autofix |
| `test` | Unit tests |
| `test:e2e` | End-to-end tests |

### Frontend

| `npm run ...` | What it does |
|--------------|-------------|
| `dev` | Dev server with webpack (port 3000) |
| `build` | Production build |
| `lint` | ESLint |

---

## Project Layout

```
ats-assignment/
  docker-compose.yml           # PostgreSQL
  backend/
    prisma/schema.prisma       # Database models
    src/
      main.ts
      auth/                    # Login, JWT
      jobs/                    # Job CRUD
      applications/            # Applications
      common/                  # Middleware, decorators
      guards/                  # JWT guard
      prisma/                  # Prisma module
  frontend/
    src/
      app/                     # Pages (App Router)
      components/
        ui/                    # Reusable UI
        jobs/                  # Job components
        forms/                 # Form components
        layout/                # Header, sidebar
      store/                   # Auth state (Zustand)
      hooks/                   # useApi
      lib/                     # Axios, utilities
      types/                   # TypeScript types
      yup/                     # Validation schemas
```
