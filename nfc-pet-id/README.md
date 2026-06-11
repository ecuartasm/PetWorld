# NFC Pet ID

Full-stack app for managing NFC pet ID necklaces.

## Stack
- **Client:** React + Vite + TypeScript + React Router
- **Server:** Node + Express + TypeScript
- **Database:** SQLite (`server/data/pets.db`) via better-sqlite3
- **Auth:** Email + password (bcrypt), JWT in httpOnly cookie

## Setup

### 1. Install all dependencies
```bash
npm run install:all
```

### 2. Seed the demo user and pet
```bash
npm run seed
```

Output will look like:
```
✓ Demo user: demo@example.com / demo1234
✓ Demo pet: Luna (ID: aBcDeFgH12)
✓ Public URL: http://localhost:5173/p/aBcDeFgH12
```

Copy the public URL — paste it in a browser to simulate an NFC tap.

### 3. Start dev server (client + server together)
```bash
npm run dev
```

- **Client (owner dashboard):** http://localhost:5173
- **Server API:** http://localhost:3001
- **Demo public pet page:** http://localhost:5173/p/{petId from seed output}

## Demo credentials
| Field    | Value              |
|----------|--------------------|
| Email    | demo@example.com   |
| Password | demo1234           |

## NFC pipeline
1. In the owner dashboard → select a pet → **Digital ID** tab
2. The pet's public URL and QR code are shown there
3. Write that URL to a physical NFC tag using any NFC writer app, or use the **Write to NFC tag** button (Chrome on Android only, via Web NFC API)
4. Simulate a tap by opening the public URL directly in any browser
