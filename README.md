# WhatBox

> Find your items in an instant.

WhatBox is a small web app to inventory what you store in boxes, so you never have to dig through them again.

## What it does

You have boxes in the attic, the basement or the garage, and you can never remember which one holds the blankets, the cutlery or the winter tires. WhatBox keeps that inventory for you:

1. **Create a box** and give it a name and a photo.
2. **List what's inside**: each item has a name, a quantity and its own photos.
3. **Print a QR code label** and stick it on the box. Each box also gets a short ID (e.g. `BOX 7K2Q9X`).
4. **Find things later**: search for an item and see which box holds it, or scan a box's QR code to open its content.

Other features:

- Email/password accounts with a password reset by email. Everything is private to the account that created it.
- Search across boxes _and_ the items inside them, with sorting by date, name, ID or quantity.
- Multi-select on the dashboard for bulk delete and bulk label printing.
- Photos in JPEG, PNG or WebP (5 MB max per upload).
- Dark-only, mobile-first UI.

## Tech stack

| Concern    | Choice                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------ |
| Framework  | [Next.js](https://nextjs.org) (App Router, server components, server actions), React, TypeScript |
| Database   | Postgres on [Neon](https://neon.tech), accessed with [Drizzle ORM](https://orm.drizzle.team)     |
| Auth       | Custom: bcrypt password hashes, JWT (`jose`) in a cookie                                         |
| Files      | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) for images                            |
| Email      | [Resend](https://resend.com) (password reset)                                                    |
| UI         | Tailwind CSS 4, shadcn/ui-style primitives on Radix, Sonner toasts, `react-qr-code`              |
| Validation | [Zod](https://zod.dev) for forms and server actions, `@t3-oss/env-nextjs` for env vars           |
| Hosting    | [Vercel](https://vercel.com)                                                                     |

## Repo layout

This is a yarn workspaces monorepo:

```
apps/web/          The Next.js app described below
packages/shared/   Zod schemas/types shared across apps (e.g. auth validation)
```

`apps/mobile/` is a planned addition for a future Expo mobile app, which will depend on `packages/shared/` alongside `apps/web/`.

## Architecture

Inside `apps/web/`, the code is organized by layer, then by feature (`box`, `item`, `image`, `auth`):

```
app/           Routing only. Route groups: (marketing) landing page,
               (auth) sign in / sign up / password reset,
               (authenticated) dashboard and box pages
actions/       Server actions: one per mutation, validated with Zod,
               they return an ActionResponse instead of throwing
lib/           Data layer: queries and mutations per domain (box, item, image, user...)
db/            Drizzle schema, relations and client
components/    UI by feature; components/ui holds the shared primitives
drizzle/       Generated SQL migrations (commit them)
env.ts         Typed and validated environment variables
```

How a request flows:

- **Reads:** server components in `app/` call `lib/*` queries directly. Client components never fetch data.
- **Writes:** a client form calls a server action in `actions/`, which validates the input and calls `lib/*`. Actions never touch `db` directly.
- **Authorization lives in the data layer.** There is no middleware: every `lib/*` query or mutation calls `getCurrentUser()` and scopes its `where` by `userId`.
- **Sessions:** a 7-day JWT stored in a cookie. Changing a password sets `users.tokenInvalidBefore`, which revokes every token issued before that moment.

### Data model

```
users ──< boxes ──< items
```

- A box and an item each have at most one image, stored on their own row (`imageUrl` and `imagePathname`).
- Deleting a user, box or item cascades in the database.
- **It does not cascade to Vercel Blob.** Remove image files through `lib/image` so the files are deleted along with the box or item.
- A box's QR code encodes `<NEXT_PUBLIC_APP_URL>/boxes/<box id>`.

## Getting started

### Prerequisites

- Node.js 20.9+ (Next.js 16 requirement)
- [Yarn 1](https://classic.yarnpkg.com) (this project uses yarn, not npm)
- The [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`), logged in (`vercel login`) with access to the project

### 1. Install dependencies

```bash
yarn install
```

Run from the repo root — this installs for every workspace (`apps/web`, and any future `apps/*`/`packages/*`) at once.

### 2. Environment variables

App-specific scripts (`env:pull`, `db:*`) run from inside `apps/web`. Link the folder to the Vercel project once (`vercel link`), then pull the development variables:

```bash
cd apps/web
yarn env:pull
```

This writes `.env.development.local` (git-ignored). Variables are validated on startup by `env.ts`, and the app won't start if one is missing or invalid.

| Variable                | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`          | Neon Postgres connection string                             |
| `JWT_SECRET`            | Secret used to sign session tokens (at least 32 characters) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token, for image storage                        |
| `RESEND_API_KEY`        | Resend API key, for password reset emails                   |
| `NEXT_PUBLIC_APP_URL`   | Base URL encoded in the QR code labels                      |

> `NEXT_PUBLIC_APP_URL` is required. Labels printed from a dev environment point to your dev URL, so print the ones you'll actually stick on boxes from production.

### 3. Set up the database

There is no local database to install. `DATABASE_URL` points to a hosted Neon Postgres database: the app talks to it over HTTPS through `@neondatabase/serverless`, and Drizzle Kit connects to it with the same URL to run migrations.

Apply the migrations (from `apps/web`):

```bash
yarn db:migrate
```

### 4. Run the development server

From the repo root:

```bash
yarn dev
```

The app is available at [http://localhost:3000](http://localhost:3000).

## Database

Schema changes are applied through **migrations**, not `db:push`. The commands below run from `apps/web`.

### 1) Change the schema

Edit `db/schema.ts` (tables: `users`, `boxes`, `items`).

### 2) Generate a migration

```bash
yarn db:generate
```

This creates a folder `drizzle/<timestamp>_<name>/` containing `migration.sql` and a `snapshot.json`. **Read the generated SQL** before applying it (dropping a column or adding `NOT NULL` on a table that already has rows can lose data or fail), and **commit the folder**.

### 3) Apply it

```bash
yarn db:migrate
```

If nothing is applied, check that `drizzle/` contains migration folders and that `DATABASE_URL` points to the database you expect.

> ⚠️ Every `db:*` script has a `:prod` variant (`db:migrate:prod`, `db:studio:prod`...) that runs against the **production** database with `.env.production.local` (`yarn env:pull:prod`). Only use them on purpose.

## Scripts

Run from the repo root, delegating to `apps/web`:

| Script              | What it does                     |
| ------------------- | --------------------------------- |
| `yarn dev`          | Start the dev server (Turbopack)  |
| `yarn build`        | Production build                  |
| `yarn lint`         | Run ESLint                        |
| `yarn tsc --noEmit` | Type-check                        |

Run from `apps/web` (not wired to the root yet):

| Script                                  | What it does                             |
| ---------------------------------------- | ----------------------------------------- |
| `yarn start`                             | Serve a production build                  |
| `yarn env:pull` / `yarn env:pull:prod`   | Pull env vars from Vercel (dev / prod)    |
| `yarn db:generate`                       | Generate a migration from schema changes  |
| `yarn db:migrate`                        | Apply pending migrations                  |
| `yarn db:studio`                         | Open Drizzle Studio to browse the data    |

There is no test runner yet. Before opening a PR, run `yarn lint` and `yarn tsc --noEmit` from the repo root. Errors under `.next/types/` come from stale generated files and can be ignored.

## Contributing

- Work on a branch and open a PR into `main`, using [conventional commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `refactor:`...).
- Coding conventions and project rules are documented in [`CLAUDE.md`](./CLAUDE.md), which is written for AI coding assistants but is a good read for humans too.
