## Role and goal

You are the lead full-stack engineer building the MVP of a pet-ecosystem web platform for Colombia. Build a production-quality, scalable React web application that I can run locally during development and later deploy to a web host without code changes. Work incrementally: scaffold, get it running, then build feature by feature, verifying each milestone before moving on. Ask me to confirm only when a decision is genuinely ambiguous or irreversible; otherwise make sensible, well-documented choices and keep going.

**Project identity (fill these in):**
- Brand / product name: **[BRAND NAME]**
- Tagline: **[TAGLINE]**
- Launch city: **[CITY, e.g. Manizales]**
- Primary UI language: **[Spanish (es-CO)]**, with the codebase i18n-ready for English later.

This MVP is the "identity + knowledge + chatbot" core of a larger pet ecosystem (commerce, services marketplace, telemedicine, social network, events, matchmaking come later). Design every boundary so those modules can be added later without rewrites, but **do not build them now**.

## What to build in this MVP (scope — build exactly this)

1. **Public site shell**: responsive landing page, an "About the ecosystem" page, a "Services" overview page (describe the future ecosystem modules — knowledge, vets, services, community, etc.), and a header/footer/nav. Spanish-first, clean and modern, mobile-first, accessible.
2. **Authentication**: email + password **registration and login** for pet owners ("clients"), with email-as-identity, secure password hashing, persistent sessions, logout, "edit my account," and basic password reset scaffolding (token-based, can stub the email send in dev and log the link to console).
3. **Pet management**: an authenticated owner can **create, read, update, and delete their pets**. Each pet has a profile (see data model). One owner has many pets. A simple "My Pets" dashboard plus a per-pet profile page.
4. **Database**: a real relational database with migrations and a seed script. Local dev runs against a containerized Postgres; production points at a managed Postgres via env var — same code, different connection string.
5. **Dynamic AI chatbot**: a floating chat widget available site-wide that answers general questions about the site, the ecosystem, and its services. It calls the Anthropic API **from the server only** (never expose the key to the browser), streams responses, and is grounded in a curated knowledge base so it answers about *this* platform, not generic pet trivia. It should gracefully say when something is out of scope and suggest contacting support.
6. **Deployment readiness**: runs with one command locally (Docker Compose) and is deployable to any Node host or container platform. Stateless app process, env-based config, health-check endpoint, build script, and clear deploy docs.

**Out of scope for now (do NOT build):** payments, real e-commerce, services booking, social feed, telemedicine, file uploads beyond a single avatar URL field, admin panel beyond what's needed to verify data. Leave clean extension points (clear module boundaries, typed service layer) but no stubs that pretend to work.

## Tech stack (use this stack)

- **Framework:** Next.js (latest stable, App Router) with **React + TypeScript (strict mode)**. Rationale: one cohesive full-stack React codebase, built-in API routes for auth and the chatbot, server-side rendering for SEO (the content hub matters later), and trivially deployable to localhost and to any Node host or platform — which is exactly the "local + scalable hosting" requirement. *(If I later say I prefer a decoupled SPA, the equivalent is Vite + React for the frontend and Fastify/Express for the API — but default to Next.js.)*
- **Styling:** Tailwind CSS. Keep a small, consistent design system (tokens for color, spacing, type). Modern, warm, trustworthy aesthetic; not a generic template look.
- **Database:** PostgreSQL via **Prisma ORM** (migrations + typed client + seed script).
- **Auth:** Auth.js (NextAuth) with the Credentials provider and the Prisma adapter, **or** a clean custom implementation using httpOnly, Secure, SameSite cookie sessions stored in the DB. Either way: hash passwords with **argon2** (preferred) or bcrypt, never store plaintext, and keep sessions server-validated so the app scales horizontally. Pick one approach, justify it briefly in the README, and implement it fully.
- **Validation:** zod on every API input and form (shared schemas between client and server where possible).
- **AI / chatbot:** the official Anthropic SDK (`@anthropic-ai/sdk`), called from a server route. Default model **`claude-haiku-4-5`** (fast and inexpensive — right for a general Q&A widget); make the model a single config constant so it's trivial to switch to `claude-sonnet-4-6` for higher quality. Use the Messages API with streaming. *(Model IDs current as of June 2026; if the SDK or docs indicate newer IDs, prefer those and note it.)*
- **Tooling:** ESLint + Prettier, TypeScript strict, a few meaningful tests (auth flow, pet CRUD authorization, chatbot route returns a stream) with Vitest + Testing Library / Playwright for one happy-path e2e. Don't over-test the MVP, but cover the security-critical paths.

## Data model (Prisma schema)

Implement at least these entities; add fields only if needed for the features above.

- **User** (the owner/client): `id`, `email` (unique), `passwordHash`, `displayName`, `phone` (optional), `city` (default launch city), `createdAt`, `updatedAt`, `lastLoginAt`. Relations: many `Pet`, many `Session` (if custom auth), many `ChatConversation`.
- **Pet**: `id`, `ownerId` (FK → User), `name`, `species` (enum: DOG, CAT, OTHER), `breed` (optional), `birthDate` (optional), `sex` (enum: MALE, FEMALE, UNKNOWN), `weightKg` (optional), `avatarUrl` (optional string), `bio` (optional), `createdAt`, `updatedAt`. **Authorization rule: a user may only read/update/delete their own pets** — enforce on the server, not just the UI.
- **Session** (if not using Auth.js's tables): `id`, `userId`, `tokenHash`, `expiresAt`, `createdAt`.
- **ChatConversation** + **ChatMessage** (so chats can persist for logged-in users; allow anonymous ephemeral chats too): conversation has `id`, `userId` (nullable for anonymous), `createdAt`; message has `id`, `conversationId`, `role` (USER/ASSISTANT), `content`, `createdAt`.
- **PasswordResetToken**: `id`, `userId`, `tokenHash`, `expiresAt`, `usedAt`.

Provide a `seed.ts` that creates one demo owner with two pets and a few knowledge-base entries so the app is explorable immediately.

## Chatbot requirements (be specific)

- **Server-only key.** `ANTHROPIC_API_KEY` is read from env on the server. The browser never sees it. The widget talks to an internal route (e.g. `/api/chat`) which calls Anthropic.
- **Grounding / knowledge base.** Create a `knowledge/` folder of Markdown files describing the platform: what the ecosystem is, the services (current and planned), how registration and pets work, the launch city, and an FAQ. **If `pet_ecosystem_report.md` exists in the repo, extract a concise, user-facing summary from it to seed these files** (do not dump the whole strategic report at users — write friendly, customer-facing copy). Start simple: load and concatenate the curated knowledge into the system prompt (it's small). Structure the retrieval behind a single `getKnowledgeContext()`-style function so it can later be upgraded to embeddings/RAG without touching the route.
- **System prompt.** Write a clear system prompt that: defines the assistant as the site's helpful guide; tells it to answer in the user's language (Spanish by default); restricts it to the platform, the ecosystem, and general pet-care info; forbids medical diagnosis or medication dosing and instead routes health concerns to "consult a veterinarian"; and tells it to say it doesn't know and offer support contact when a question is out of scope. Keep persona warm and concise.
- **Streaming UX.** Stream tokens to a floating chat widget with message history, a typing indicator, error states, and a "clear conversation" action. Persist history for logged-in users (ChatConversation/ChatMessage); keep it in-memory for anonymous users.
- **Safety/limits.** Rate-limit the chat route per IP/session. Cap conversation length sent to the model (trim/window older turns). Handle API errors and timeouts gracefully with a friendly fallback message.

## Non-functional requirements

- **Scalability / 12-factor.** All config via environment variables (`.env.example` committed, real `.env` git-ignored). App process is **stateless** (sessions in DB, no local file/session state) so it can run behind a load balancer with N replicas. Use a pooled DB connection suitable for serverless/long-running (document the choice). Provide a `/api/health` endpoint.
- **Local ↔ production parity.** `docker-compose.yml` brings up app + Postgres locally with one command. The same image/build runs in production against managed Postgres. No code differences between environments — only env vars. Document deploy steps for at least: a container platform (Railway/Render/Fly) **and** a VPS (e.g. DigitalOcean droplet with Docker), since both are likely targets.
- **Security.** Hashed passwords; httpOnly+Secure+SameSite cookies; zod-validated inputs; server-side authorization on every pet and chat route; CSRF protection on state-changing requests; security headers; no secrets in the client bundle; sane rate limits on auth and chat. Add a short `SECURITY.md` listing what's handled and what's deferred.
- **Data protection note.** This will operate under Colombia's Ley 1581 (data protection). At signup, capture explicit consent to a privacy policy (`política de tratamiento de datos`), store the consent timestamp/version on the User, and include placeholder privacy-policy and terms pages. Don't implement full compliance, but leave the consent hook in place and note it in the README.
- **Accessibility & responsiveness.** Semantic HTML, keyboard navigable, labeled forms, adequate contrast, works well on mobile (the dominant device locally).
- **i18n-ready.** Centralize user-facing strings so a second language can be added later; default everything to Spanish (es-CO).
- **Quality.** TypeScript strict with no `any` escapes in app code; ESLint/Prettier clean; meaningful errors; no dead/placeholder code that pretends to function.

## Suggested project structure

Organize by domain so future ecosystem modules slot in cleanly. Propose and create a clear structure along these lines (adapt to Next.js App Router conventions):

```
/app            → routes (public pages, auth pages, dashboard, /api/* routes)
/components      → reusable UI (chat widget, forms, layout, pet cards)
/lib            → auth, db client, anthropic client, validation schemas, rate limiter, i18n
/knowledge      → markdown knowledge base for the chatbot
/prisma         → schema.prisma, migrations, seed.ts
/styles         → tailwind config / globals
/tests          → unit + e2e
docker-compose.yml, Dockerfile, .env.example, README.md, SECURITY.md
```

## Build order (milestones — do these in sequence and verify each)

1. **Scaffold & run.** Init Next.js + TS + Tailwind + Prisma + ESLint/Prettier. Get a styled landing page rendering and `docker-compose up` bringing app + Postgres online. Commit. Show me how to run it.
2. **Database & models.** Define the Prisma schema, run the first migration, write `seed.ts`, verify with a DB query/log. Add `/api/health`.
3. **Auth.** Registration, login, logout, session, account edit, password-reset scaffolding, consent capture at signup. Protect a `/dashboard` route. Add tests for auth + an unauthorized-access check.
4. **Pet CRUD.** "My Pets" dashboard, create/edit/delete, per-pet profile page, server-side ownership authorization, validation, tests for the authorization rule.
5. **Chatbot.** Knowledge base files, `/api/chat` streaming route to Anthropic (server-only key), floating widget with history and persistence, rate limiting, safety system prompt, error handling. Verify it answers platform questions and refuses medical diagnosis.
6. **Polish & ship docs.** Responsive/a11y pass, public pages content, README (run locally + deploy to container platform + deploy to VPS), `.env.example`, `SECURITY.md`, and a short "how to add a new ecosystem module" note for future me.

## Definition of done

- `git clone` → set `.env` from `.env.example` → `docker-compose up` → working app at `localhost` with seeded demo data, on first try, per the README.
- I can register, log in, add/edit/delete my pets (and cannot touch another user's pets), and chat with a working, grounded, streaming assistant.
- The same codebase deploys to a managed-Postgres host by changing only environment variables, with documented steps for a container platform and a VPS.
- TypeScript strict passes, lint passes, the security-critical tests pass, and no secret is present in the client bundle.

Start with milestone 1 now. After each milestone, summarize what you built, how to run/verify it, and what's next — then continue without waiting unless a decision needs me.