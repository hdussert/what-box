## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

I’m the GitHub Copilot Chat Assistant.

## Database schema & migrations (Drizzle + Postgres/Neon)

This project uses **Drizzle ORM** with **Postgres (Neon)**. Schema changes are applied via **migrations**.

### Env notes

Pull env vars from Vercel (so `DATABASE_URL` points to the correct DB):

```bash
vercel env pull .env.development.local --environment=development
```

### 1) Make a schema change

Edit the schema in `db/schema.ts` (tables: `users`, `boxes`, `boxes_images`, etc.).

### 2) Generate a migration (creates SQL files)

Generate migration files after any schema edit:

```bash
# Development
yarn db:generate:dev

```

This writes migration SQL files to the configured `out` folder (e.g. `./drizzle`) and updates `drizzle/meta/_journal.json`. **Commit these migration files**.

### 3) Apply migrations to the database (updates tables)

Run migrations against the target environment:

```bash
# Development
yarn db:migrate:dev
```

> If migrations aren’t being picked up, check you have `*.sql` files under `./drizzle` and that `drizzle/meta/_journal.json` contains migration entries.
