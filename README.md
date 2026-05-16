# pollUnit — Poll & Voting System

A civic engagement platform for Nigerian citizens to participate in polls and view results broken down by state.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21, Angular Material, Tailwind CSS, SSR |
| Backend | NestJS 11, TypeORM |
| Database | PostgreSQL |
| Auth | JWT (passport-jwt), bcrypt |

## Features

- **Authentication** — Sign up with Nigerian state selection, login, JWT-based auth, route guards
- **Poll Management** — Admin can create, edit, close, and delete polls (2–4 options each)
- **Voting** — One vote per user per poll, validated server-side
- **Results** — Vote counts per option with state-based filtering and progress bars
- **User Profile** — View account info, voter ID, residency, and update password

## Project Structure

```
poll-voting-system/
├── backend/    # NestJS API
└── frontend/   # Angular app
```

## Prerequisites

- Node.js 20+
- PostgreSQL database

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/KingoSolo/poll-unit.git
cd poll-unit
```

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=pollunit
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

Start the backend:

```bash
# development
npm run start:dev

# production
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`.

### 3. Seed the admin account

With the backend running, open a new terminal and run:

```bash
cd backend
npm run seed
```

This creates a default admin account (safe to run multiple times — skips if it already exists):

| Field | Value |
|---|---|
| Email | `admin@pollunit.com` |
| Password | `Admin1234` |

### 4. Frontend

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:4200`.

---

## Test Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@pollunit.com` | `Admin1234` |
| Regular user | Sign up via `/signup` | — |

**Admin access:** Log in with the admin credentials above. You will be redirected to `/admin` automatically where you can create, edit, close, and delete polls.

**Regular user:** Sign up with any Nigerian state, then browse and vote on active polls at `/home`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USERNAME` | Database username | `postgres` |
| `DB_PASSWORD` | Database password | `password` |
| `DB_NAME` | Database name | `pollunit` |
| `JWT_SECRET` | Secret key for signing JWTs | `supersecretkey` |
| `PORT` | Port the API listens on | `3000` |

> The database schema is auto-synced via TypeORM `synchronize: true`. No migrations needed.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/signup` | — | Register a new user |
| POST | `/auth/login` | — | Login, returns JWT |
| GET | `/users/me` | JWT | Get current user profile |
| PATCH | `/users/me/password` | JWT | Update password |
| GET | `/polls` | JWT | List all polls |
| POST | `/polls` | Admin | Create a poll |
| GET | `/polls/:id` | JWT | Get a single poll |
| PATCH | `/polls/:id` | Admin | Update a poll |
| PATCH | `/polls/:id/close` | Admin | Close a poll |
| DELETE | `/polls/:id` | Admin | Delete a poll |
| GET | `/polls/:id/results` | JWT | Results with optional `?state=` filter |
| POST | `/votes` | JWT | Cast a vote |

---

## Notes

- TypeORM `synchronize: true` is enabled — the database schema updates automatically on startup. Disable this in production.
- CORS is enabled for all origins in development. Restrict `origin` in `main.ts` for production.
