# PetWorld - Project Overview

## What it is

PetWorld is a pet ecosystem platform for Colombia. Pet owners create digital profiles for their pets and manage health records, contact info, and more from a single dashboard. The core feature is PawTag: each pet gets a unique ID (a `tagId` generated as a CUID) that can be written to an NFC tag or printed as a QR code. When someone finds a lost pet and scans the tag, they see a public profile with the owner's contact info and the pet's medical details, with no login required. The platform also includes an AI chat assistant that answers questions about pet care and the platform itself.

## Tech stack

- **Next.js 16 (App Router)** - Full-stack framework. Server components for protected pages, client components for interactive UI. API routes handle all backend logic.
- **React 19** - UI layer with client-side interactivity (chat widget, forms, animated SVG illustrations).
- **TypeScript 5** - Strict mode across the entire codebase. Path alias `@/*` maps to project root.
- **Tailwind CSS 4** - Styling via `@tailwindcss/postcss`. Custom theme with orange/green/yellow palette.
- **Prisma 6 + PostgreSQL 16** - ORM and database. Schema defines 6 models with full relations and cascade deletes.
- **Custom session auth** - No Auth.js. Hand-rolled sessions using SHA-256 hashed tokens stored in the database, Argon2 for password hashing, httpOnly cookies with SameSite protection.
- **Anthropic SDK** - Powers the AI chat assistant using `claude-haiku-4-5` with streaming SSE responses.
- **Zod 4** - Request validation on all API routes. Error messages are in Spanish.
- **Docker Compose** - Two configs: `docker-compose.dev.yml` (Postgres only, for local dev) and `docker-compose.yml` (full stack: app + Postgres).

## Architecture

```
Browser (React client components)
   |
   | fetch / SSE
   v
Next.js App Router (API routes in app/api/)
   |
   | Prisma Client
   v
PostgreSQL 16
```

- **Frontend:** Mix of server and client components. Server components handle protected pages (dashboard, pet views) by calling `getCurrentUser()` at the top and redirecting to `/auth/login` if unauthenticated. Client components handle forms, the chat widget, and interactive elements.
- **API routes:** All under `app/api/`. Handle auth (register, login, logout, password reset), CRUD for pets, public PawTag lookup, and AI chat. Every route validates input with Zod and returns `{ error, details? }` on failure.
- **Auth flow:** No middleware. Each protected route/page calls `getCurrentUser()` from `lib/auth.ts`, which reads the session cookie, hashes the token, looks it up in the Session table, and returns the user if valid. Sessions expire after 30 days (configurable).
- **Pet ownership:** Every pet API operation checks `pet.ownerId === currentUser.id` before proceeding.

## Database

Six models in Prisma, all using CUID primary keys:

```
User
 ├── has many Pet (cascade delete)
 ├── has many Session (cascade delete)
 ├── has many ChatConversation (cascade delete)
 └── has many PasswordResetToken (cascade delete)

Pet
 ├── belongs to User (via ownerId)
 ├── core fields: name, species (DOG/CAT/OTHER), breed, birthDate, sex, weightKg, avatarUrl, bio
 └── PawTag fields: tagId (unique), ownerName, ownerPhone, altPhone, allergies, medications, conditions, vetName, vetPhone

Session
 └── tokenHash (unique), expiresAt — linked to User

ChatConversation
 ├── optionally linked to User (anonymous users can chat too)
 └── has many ChatMessage (cascade delete)

ChatMessage
 └── role (USER/ASSISTANT), content — linked to ChatConversation

PasswordResetToken
 └── tokenHash (unique), expiresAt, usedAt — linked to User
```

## AI chatbot

### What it does

A floating chat widget (`components/chat-widget.tsx`) appears on every page. Users type questions about pet care or the platform and get streaming responses.

### How it works

The chat flow lives in `app/api/chat/route.ts`:

1. The client sends a POST with the user's message and conversation history.
2. The route validates the input with Zod, checks an in-memory rate limit (10 requests per minute per IP), and verifies the Anthropic API key exists.
3. It calls `getKnowledgeContext()` from `lib/knowledge.ts` to load platform knowledge, then passes it to `getSystemPrompt()` from `lib/chat-config.ts` to build the full system prompt.
4. It calls the Anthropic SDK's `client.messages.stream()` with model `claude-haiku-4-5-20251001`, the system prompt, and the conversation history (trimmed to the last 20 turns).
5. The response streams back as Server-Sent Events (SSE). Each `content_block_delta` event is forwarded to the client as a `data:` line containing the text chunk and conversation ID.
6. For logged-in users, both the user message and the full assistant response are persisted to the database (ChatConversation + ChatMessage tables).

### Static context injection

The chatbot does not use RAG. Instead, it uses static context injection:

- Three markdown files in the `knowledge/` directory provide all platform-specific information:
  - `platform.md` - what PetWorld is, features, registration info, roadmap
  - `faq.md` - frequently asked questions about accounts, pets, the assistant
  - `services.md` - currently available and upcoming services
- `lib/knowledge.ts` reads all `.md` files from the `knowledge/` directory at startup using `readFileSync`, joins them with `---` separators, and caches the result in a module-level variable. It only reads from disk once per server process.
- `lib/chat-config.ts` takes this concatenated knowledge string and embeds it at the end of a Spanish-language system prompt that defines the assistant's role, tone, and rules (never diagnose, always recommend a vet for health concerns, don't invent features).
- The full system prompt (instructions + knowledge) is passed to the Anthropic API on every request.

This approach grounds the chatbot in accurate, platform-specific information instead of relying on the model's general knowledge. It works because the knowledge base is small (three short files). If the knowledge base grew significantly, this would need to be replaced with a retrieval-based approach (RAG) to stay within token limits.

## How to deploy

### Run locally

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```
2. Start a local Postgres database:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```
3. Create a `.env` file (see `.env.example`). Required variables:
   ```
   DATABASE_URL=postgresql://petworld:petworld@localhost:5432/petworld?schema=public
   ANTHROPIC_API_KEY=sk-ant-...
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   APP_SECRET=<random string, at least 32 characters>
   ```
4. Run database migrations and seed demo data:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
5. Start the dev server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000`. Demo account: `demo@petworld.co` / `demo1234`.

### Deploy with Docker

1. Set `ANTHROPIC_API_KEY` and `APP_SECRET` as environment variables.
2. Run the full stack:
   ```bash
   docker compose up --build
   ```
   This starts both Postgres and the Next.js app. The app runs on port 3000.

### Deploy to a host (Vercel, VPS, etc.)

1. Provision a PostgreSQL 16 database and get the connection string.
2. Set the four required environment variables (`DATABASE_URL`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_APP_URL`, `APP_SECRET`).
3. Build:
   ```bash
   npm run build
   ```
   This runs `prisma generate` then `next build`.
4. Start:
   ```bash
   npm run start
   ```
