# PetWorld

**El hogar digital de tu mascota** - Plataforma web para mascotas en Colombia, lanzando en Manizales.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL + Prisma 6 ORM
- **Auth:** Custom cookie-based sessions, argon2 password hashing
- **AI:** Anthropic SDK (Claude Haiku) for the chat assistant
- **Validation:** Zod on all inputs

## Quick start (local development)

### Prerequisites

- Node.js 20+
- Docker (for PostgreSQL)
- An Anthropic API key (optional, for the chat assistant)

### Steps

```bash
# 1. Clone and install
git clone <repo-url> && cd PawTag
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY if you want the chatbot to work

# 3. Start PostgreSQL
docker compose -f docker-compose.dev.yml up -d

# 4. Run migrations and seed
npx prisma migrate deploy
npm run db:seed

# 5. Start dev server
npm run dev
```

Open http://localhost:3000. Demo account: `demo@petworld.co` / `demo1234`

## Project structure

```
app/                  Routes (pages + API)
  api/                API routes (auth, pets, chat, health)
  auth/               Auth pages (login, registro, password reset)
  dashboard/          Protected pages (mascotas, cuenta)
  acerca/             Public about page
  servicios/          Public services page
components/           Reusable UI components
lib/                  Shared logic (auth, db, validation, chat config, rate limiter)
knowledge/            Markdown knowledge base for the chatbot
prisma/               Schema, migrations, seed
tests/                Unit + e2e tests
```

## Auth approach

Custom session-based authentication:
- Passwords hashed with argon2
- Sessions stored in DB with SHA-256 hashed tokens
- httpOnly + Secure + SameSite=Lax cookies
- Server-side session validation on every protected request

Justification: full control over the session lifecycle, no external dependencies, straightforward to audit, and works with any hosting platform without requiring specific adapters.

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint + Prettier check |
| `npm run format` | Auto-format with Prettier |
| `npm run db:migrate` | Run Prisma migrations (dev) |
| `npm run db:seed` | Seed demo data |
| `npm run db:studio` | Open Prisma Studio |
| `npm run test` | Run tests |

## Deploy

### Option A: Container platform (Railway, Render, Fly.io)

1. Push to a Git repository
2. Connect the repo to your platform
3. Set environment variables from `.env.example`
4. Set build command: `npm run build`
5. Set start command: `npm run start`
6. Add a managed PostgreSQL service and set `DATABASE_URL`
7. After deploy, run migrations: `npx prisma migrate deploy`

### Option B: VPS with Docker (DigitalOcean, etc.)

```bash
# On the VPS
git clone <repo-url> && cd PawTag

# Create .env with production values
cp .env.example .env
# Edit .env: set DATABASE_URL, ANTHROPIC_API_KEY, APP_SECRET (random 64 chars)

# Build and run
docker compose up -d --build

# Run migrations
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run db:seed
```

The app will be at port 3000. Put nginx or Caddy in front for HTTPS.

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ANTHROPIC_API_KEY` | No | Enables the AI chatbot |
| `APP_SECRET` | Yes | Session signing secret (64+ random chars) |
| `NEXT_PUBLIC_APP_URL` | Yes | Public URL (e.g. https://petworld.co) |
| `SESSION_MAX_AGE_DAYS` | No | Session duration, default 30 |

## Adding a new ecosystem module

The project is organized as a modular monolith. To add a new module (e.g. services booking):

1. Add models to `prisma/schema.prisma`, create a migration
2. Add API routes in `app/api/<module>/`
3. Add pages in `app/dashboard/<module>/` (protected) or `app/<module>/` (public)
4. Add validation schemas to `lib/validation.ts`
5. Add reusable UI to `components/`
6. If the module needs knowledge, add Markdown to `knowledge/`

Each module should only import from `lib/` and `components/`, never directly from another module's routes.

## Data protection (Ley 1581)

- Consent captured at registration (version + timestamp stored)
- Privacy policy and terms pages in place
- Passwords hashed, sessions secure, inputs validated
- Full RNBD registration and formal compliance procedures should be handled by legal counsel before production launch
