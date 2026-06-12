# PetWorld - Claude Code Project Reference

## What is this project?

PetWorld ("El hogar digital de tu mascota") is a full-stack pet ecosystem platform for Colombia, launching in Manizales. It provides digital pet profiles, NFC/QR-based PawTags for lost pet recovery, and an AI-powered chat assistant. All user-facing text is in Spanish.

## Tech Stack

- **Framework:** Next.js 16.2.9 (App Router, Turbopack, standalone output)
- **Language:** TypeScript 5 (strict mode), path alias `@/*` maps to project root
- **UI:** React 19.2.4, Tailwind CSS 4 (via `@tailwindcss/postcss`)
- **Database:** PostgreSQL 16 via Prisma 6.19
- **Auth:** Custom session-based (SHA-256 hashed tokens, Argon2 password hashing, httpOnly cookies)
- **AI:** Anthropic SDK (`@anthropic-ai/sdk`), Claude Haiku 4.5, streaming SSE
- **Validation:** Zod 4 (all error messages in Spanish)
- **Testing:** Vitest 4 + Testing Library + jsdom (infrastructure configured, no tests written yet)

## Commands

```bash
# Development
npm run dev              # Start Next.js dev server (port 3000)
npm run build            # Prisma generate + Next.js build
npm run start            # Production server
npm run lint             # ESLint + Prettier check
npm run format           # Auto-format with Prettier

# Database
npm run db:migrate       # Run Prisma migrations
npm run db:seed          # Seed demo data (demo@petworld.co / demo1234)
npm run db:studio        # Open Prisma Studio GUI

# Testing
npm run test             # Vitest single run
npm run test:watch       # Vitest watch mode

# Docker
docker compose -f docker-compose.dev.yml up   # DB only (for local dev)
docker compose up --build                      # Full stack (app + DB)
```

## Environment Variables

Defined in `.env` (see `.env.example` for template):

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `ANTHROPIC_API_KEY` | Claude API key (server-only) | Yes (for chat) |
| `NEXT_PUBLIC_APP_URL` | Frontend base URL | Yes |
| `APP_SECRET` | Application secret (min 32 chars) | Yes |
| `SESSION_MAX_AGE_DAYS` | Session duration (default: 30) | No |

## Project Structure

```
app/                            # Next.js App Router
  page.tsx                      # Landing page
  layout.tsx                    # Root layout (Header + Footer + ChatWidget)
  globals.css                   # Tailwind theme (primary=orange, secondary=green) + animations
  acerca/page.tsx               # About page
  servicios/page.tsx            # Services showcase
  explorar/page.tsx             # Interactive explorer (client component, 9 tabs)
  privacidad/page.tsx           # Privacy policy (Ley 1581/2012)
  terminos/page.tsx             # Terms & conditions
  auth/
    login/page.tsx              # Login form
    registro/page.tsx           # Registration form (with consent checkbox)
    forgot-password/page.tsx    # Request password reset
    reset-password/page.tsx     # Reset password (token from URL params)
  dashboard/                    # Protected routes (server components, force-dynamic)
    page.tsx                    # Dashboard home (greeting + nav cards)
    cuenta/page.tsx             # Account settings (client component)
    mascotas/
      page.tsx                  # Pet list with delete buttons
      nuevo/page.tsx            # Create pet form
      [id]/page.tsx             # Pet detail view + PawTag section
      [id]/editar/page.tsx      # Edit pet form
  p/[tagId]/page.tsx            # Public PawTag profile (no auth, for NFC/QR)
  api/
    health/route.ts             # GET - DB connectivity check
    auth/
      register/route.ts         # POST - Create account
      login/route.ts            # POST - Sign in
      logout/route.ts           # POST - Sign out
      me/route.ts               # GET/PATCH - Current user profile
      password-reset/
        request/route.ts        # POST - Request reset (logs link to console in dev)
        reset/route.ts          # POST - Execute reset (invalidates all sessions)
    pets/
      route.ts                  # GET (list) / POST (create) - requires auth
      [id]/route.ts             # GET / PATCH / DELETE - requires auth + ownership check
    public/
      pet/[tagId]/route.ts      # GET - Public PawTag lookup (no auth)
    chat/route.ts               # POST - AI chat (SSE stream, rate-limited 10/min/IP)

components/
  header.tsx                    # Sticky nav with mobile menu, frosted glass effect
  footer.tsx                    # Site footer with links and contact
  chat-widget.tsx               # Floating AI chat widget (bottom-right)
  pet-form.tsx                  # Reusable create/edit pet form
  delete-pet-button.tsx         # Delete with confirmation dialog
  logout-button.tsx             # Logout action button
  hero-illustration.tsx         # Animated SVG dog + cat illustration
  pawtag-section.tsx            # PawTag management (URL copy, QR, NFC write, medical info)

lib/
  auth.ts                       # createSession, getSession, getCurrentUser, destroySession
  db.ts                         # Prisma client singleton (dev hot-reload safe)
  validation.ts                 # Zod schemas: register, login, updateAccount, pet, passwordReset
  rate-limit.ts                 # In-memory rate limiter (10 req/60s, auto-cleanup)
  chat-config.ts                # Claude model config, system prompt, conversation limits
  knowledge.ts                  # Loads + caches markdown files from knowledge/ dir

knowledge/
  platform.md                   # PetWorld platform description (for AI context)
  faq.md                        # Frequently asked questions (for AI context)
  services.md                   # Available + coming services (for AI context)

prisma/
  schema.prisma                 # 6 models: User, Pet, Session, ChatConversation, ChatMessage, PasswordResetToken
  seed.ts                       # Demo user (Maria Lopez) + 2 pets (Luna, Milo)
  migrations/                   # 0001_init, 20260610_add_pawtag_fields

nfc-pet-id/                     # Legacy standalone prototype (Express + SQLite + Vite React)
                                # Superseded by main app's PawTag feature
```

## Database Schema

**Enums:** Species (DOG, CAT, OTHER), Sex (MALE, FEMALE, UNKNOWN), ChatRole (USER, ASSISTANT)

**User** — id (cuid), email (unique), passwordHash, displayName, phone?, city (default "Manizales"), consentVersion, consentTimestamp, createdAt, updatedAt, lastLoginAt
  - Relations: pets[], sessions[], chatConversations[], passwordResetTokens[]

**Pet** — id (cuid), ownerId (FK User, cascade delete), name, species, breed?, birthDate?, sex, weightKg?, avatarUrl?, bio?
  - PawTag fields: tagId (unique cuid), ownerName?, ownerPhone?, altPhone?, allergies?, medications?, conditions?, vetName?, vetPhone?
  - Indexes: ownerId, tagId

**Session** — id, userId (FK, cascade), tokenHash (unique), expiresAt, createdAt

**ChatConversation** — id, userId? (FK), createdAt; has messages[]

**ChatMessage** — id, conversationId (FK, cascade), role (USER/ASSISTANT), content, createdAt

**PasswordResetToken** — id, userId (FK, cascade), tokenHash (unique), expiresAt, usedAt?, createdAt

## Architecture Patterns

- **Auth:** No middleware. Each protected route calls `getCurrentUser()` from `lib/auth.ts` and redirects to `/auth/login` if unauthenticated. API routes return 401.
- **Protected pages:** Server components with `export const dynamic = "force-dynamic"` to prevent caching.
- **Client pages:** Auth pages, account page, and explorer are client components (`"use client"`).
- **Pet ownership:** Every pet API operation verifies `pet.ownerId === currentUser.id` before proceeding.
- **AI chat:** Knowledge markdown files are loaded into the Claude system prompt. Conversations are persisted for logged-in users. Rate limiting is IP-based and in-memory.
- **Password reset:** Tokens are SHA-256 hashed before storage, 1-hour expiry, single-use. All user sessions are deleted on successful reset.
- **API error format:** `{ error: string, details?: object }` with standard HTTP status codes (400, 401, 403, 404, 409, 429, 500, 503).
- **Email delivery:** Not implemented. Password reset links are logged to console in dev.

## Code Style

- Prettier: double quotes, semicolons, trailing commas, 100 char width, 2-space indent
- ESLint: flat config with next/core-web-vitals and next/typescript
- No middleware.ts file exists
- Validation messages and all UI text are in Spanish
- Color theme: primary = orange (#ee7514), secondary = green (#22c55e), warm = yellow accents

## Known Gaps

- No tests written (test infrastructure is ready)
- No email delivery (password reset links log to console)
- No CSRF tokens (relies on SameSite cookies + JSON content-type)
- No account lockout after failed login attempts
- No email verification flow
- `nfc-pet-id/` is a legacy prototype that can be removed
- Rate limiting is in-memory (resets on server restart, not shared across instances)
