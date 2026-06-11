# Security

## Implemented

- **Password hashing:** argon2 (memory-hard, timing-safe)
- **Session management:** random 32-byte tokens, SHA-256 hashed before storage, httpOnly + Secure + SameSite=Lax cookies
- **Input validation:** zod schemas on all API inputs (registration, login, pet CRUD, chat)
- **Server-side authorization:** pet ownership verified on every operation; session validated per request
- **No secrets in client bundle:** ANTHROPIC_API_KEY and APP_SECRET are server-only environment variables
- **API rate limiting:** in-memory rate limiter on /api/chat (10 requests/minute per IP)
- **Password reset:** token-based with SHA-256 hashed tokens, 1-hour expiry, single-use
- **Data consent:** explicit consent capture at registration with version and timestamp
- **Secure headers:** Next.js default security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- **No email enumeration:** password reset always returns success regardless of email existence

## Deferred (not yet implemented)

- **CSRF tokens:** currently relying on SameSite cookies + JSON content-type (adequate for API routes, but explicit tokens recommended for form-based actions)
- **Account lockout:** no brute-force protection beyond rate limiting on chat; auth endpoints need rate limiting too
- **Email verification:** accounts are created without email confirmation
- **Full Ley 1581 compliance:** consent is captured, but RNBD registration, data access/deletion request handling, and full privacy impact assessment are deferred to legal counsel
- **WAF / DDoS protection:** relying on hosting platform; no application-level DDoS mitigation
- **Content Security Policy:** not configured beyond Next.js defaults
- **Dependency auditing:** npm audit not automated in CI
- **Penetration testing:** not performed

## Reporting

If you discover a security vulnerability, please email hola@petworld.co with details. Do not open a public issue.
