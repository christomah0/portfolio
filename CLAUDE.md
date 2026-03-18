# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack portfolio website built with Next.js 15 (App Router), React 19, TypeScript, PostgreSQL, Prisma, and Tailwind CSS v4. Features a public portfolio and an authenticated admin dashboard for managing projects and skills.

## Common Commands

- `npm run dev` — Start dev server with Turbopack
- `npm run build` — Production build
- `npm run lint` — Run ESLint
- `npx prisma generate` — Regenerate Prisma client (output: `app/generated/prisma`)
- `npx prisma db push` — Push schema changes to database
- `npx prisma migrate dev` — Create and apply migrations

## Architecture

### Routing & Pages

- **Public**: `/` (home with all portfolio sections), `/admin` (login)
- **Protected**: `/dashboard/*` (projects/skills CRUD) — guarded by `middleware.ts` which checks session and redirects unauthenticated users to `/`

### Server Actions (`app/actions/`)

All data mutations use Next.js server actions. Each action revalidates relevant paths (`/`, `/dashboard/*`) after mutations. Pattern: `getX()`, `createX()`, `updateX(id, data)`, `deleteX(id)`.

### Authentication

Uses **better-auth** with Prisma adapter and username plugin:
- Server config: `lib/auth.ts`
- Client wrapper: `lib/auth-client.ts`
- Auth API routes: `app/api/auth/[...all]/route.ts`
- Sign-up action is currently commented out

### Database

PostgreSQL via Prisma. Singleton client in `lib/db.ts`. Schema defines User/Session/Account/Verification (auth) plus Project and Skill (content). Prisma client is generated to `app/generated/prisma` (non-default location).

### UI & Components

- `components/sections/` — Page sections (hero, projects, skills, about-me, contact)
- `components/ui/` — shadcn/ui components (new-york style, Radix primitives)
- `components/` — Shared components (header, footer, cards)
- Path alias: `@/*` maps to project root

### Contact Form

`app/api/contact/route.ts` sends email via nodemailer. Requires SMTP env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`.

## Key Conventions

- Dashboard UI labels are in **French**; public-facing content is in English
- Types for domain models live in `types/` (e.g., `project.type.ts`, `skill.type.ts`)
- Projects and skills have an `order` field for display ordering
- Validation uses Zod
- Data tables use @tanstack/react-table
