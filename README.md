# Todo App — Authentication & Roles

A full-stack task manager built with **Next.js 16 (App Router)**. Users log in, manage their own tasks, and an **admin** can see and manage everyone's tasks. Access is controlled with **role-based permissions (RBAC)** that are checked on the server for every action.

## Features

- **Authentication** with NextAuth (credentials + JWT sessions)
- **Two roles** — `USER` and `ADMIN` — with a permission system (`lib/permissions.ts`)
- **Protected routes**: guests are redirected to `/login`, users cannot open `/admin`
- **Todos**: add, edit inline (Enter to save, Esc to cancel), mark as done, delete
- **Filters**: All / Active / Completed, plus filter by user on the admin page
- **Stats & progress bar** that update after every change
- **Admin panel**: all users, all tasks with their owner, task counts per user
- **Server Actions** instead of a public REST API — there is no `/api` for todos
- **Loading skeletons**, empty states, success/error messages
- **Responsive** (mobile-first) with light and dark mode
- **Accessible**: keyboard-friendly, ARIA labels, WCAG 2 AA color contrast (checked with axe)
- **Tested**: unit/component tests (Vitest) and end-to-end tests (Playwright)

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16, React 19, TypeScript |
| Auth | NextAuth v4 (Credentials provider, JWT) |
| Styling | Tailwind CSS 4 (design tokens in `app/globals.css`) |
| Data | JSON files in `data/` (no database needed) |
| Dates | Day.js |
| Testing | Vitest, React Testing Library, Playwright, axe-core |

## Getting started

**Requirements:** Node.js 20 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local
```

Open `.env.local` and set a secret:

```bash
# generate a random secret
openssl rand -base64 32
```

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<paste the generated value>
```

```bash
# 3. Start the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo accounts

| Role | Username | Password | Lands on |
| --- | --- | --- | --- |
| ADMIN | `Admin` | `1234` | `/admin` |
| USER | `Giorgi` | `123` | `/` |

Users are stored in `data/users.json`. To add one, add an object with a unique `id`, `name`, `email`, `password` and `role` (`"USER"` or `"ADMIN"`).

## Roles & permissions

Permissions are defined once in `lib/permissions.ts` and checked inside every Server Action and protected page.

| Permission | USER | ADMIN |
| --- | :---: | :---: |
| `todo:create` | ✅ | ✅ |
| `todo:read/update/delete:own` | ✅ | ✅ |
| `todo:read/update/delete:any` | ❌ | ✅ |
| `user:read` (admin panel) | ❌ | ✅ |

## How it works

1. **Login** — `LoginForm` calls `signIn("credentials")`. `authorize()` in `app/api/auth/[...nextauth]/option.ts` checks `data/users.json` and returns the user **without the password**.
2. **Session** — the `jwt` and `session` callbacks put `id` and `role` into the session (`session.user.id`, `session.user.role`). Types are extended in `types/next-auth.d.ts`.
3. **Route protection** — `proxy.ts` redirects guests away from `/` and `/admin`. Each page also checks the session and role on the server.
4. **Mutations** — `lib/actions/todos.ts` (`addTodo`, `editTodo`, `toggleDone`, `deleteTodo`). Each action:
   - checks the session,
   - validates the input,
   - checks permissions (own task vs. any task),
   - saves to `data/todos.json`,
   - calls `revalidatePath()` so the UI updates.

   The client only sends the title; `id`, `userId`, `done` and `createdAt` are set on the server.

## Project structure

```
app/
  page.tsx                  Home — the user's own tasks
  login/page.tsx            Login page
  admin/page.tsx            Admin panel (needs "user:read")
  api/auth/[...nextauth]/   NextAuth config (option.ts) and route
components/
  homeComponent/            Home page components (TodoList, TodoItem, ProgressCard…)
  loginComponent/           Login page components
  adminComponent/           Admin page components
  sharedComponent/          Used on several pages (Header, Logo, StatCard, RoleBadge…)
  skeletonComponent/        Loading skeletons
lib/
  actions/todos.ts          Server Actions
  permissions.ts            Roles → permissions (RBAC)
  tasks.ts, users.ts        Read/write the JSON files
  formatDate.ts             "22 Nov, 2026"
types/                      Global types + NextAuth type extensions
data/                       users.json, todos.json
__tests__/
  unit/                     Vitest + React Testing Library
  e2e/                      Playwright (+ axe accessibility checks)
proxy.ts                    Route protection
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build (also type-checks the project) |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm test` | Unit tests in watch mode |
| `npm run test:run` | Unit tests once |
| `npm run test:coverage` | Unit tests + coverage report (fails below 90% lines) |
| `npm run test:e2e` | End-to-end tests in Chromium (desktop + mobile) |

## Testing

**Unit & component tests** (`__tests__/unit`) cover the auth logic, every Server Action (including "a user cannot touch someone else's task"), permissions, data helpers and all interactive components.

```bash
npm run test:coverage
```

An HTML report is written to `coverage/index.html`.

**End-to-end tests** (`__tests__/e2e`) run in a real browser against a production build on port `3100`, so they don't interfere with your dev server:

```bash
npx playwright install chromium   # first time only
npm run test:e2e
```

They cover login/logout, role redirects, adding/editing/completing/deleting tasks, filters, the admin panel, and accessibility (axe, WCAG 2 AA).

> The E2E tests write test data to `data/todos.json`, but they back the file up first and **restore it when they finish**.

## Limitations

This is a learning project, so a few things are intentionally simple:

- **Data is stored in JSON files.** Fine locally, but hosts like Vercel have a read-only file system — a real deployment needs a database.
- **Passwords are stored in plain text** in `data/users.json`. A real app must hash them (e.g. bcrypt).
- There is no registration page; users are added in `data/users.json`.

## Author

**Demetre Berdzenadze**

- GitHub: [@DemetreBerdzenadze7](https://github.com/DemetreBerdzenadze7)

