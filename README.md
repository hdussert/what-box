# WhatBox

> Find your items in an instant.

WhatBox keeps track of what's in your storage boxes. You list the items in each box, add photos, and print a QR label to stick on it. Later, you can search for an item to see which box holds it, or scan a label to see what's inside.

## Features

- Each box has a name and a photo, and each item inside it has a name, a quantity and a photo.
- Every box gets a short ID and a printable QR label that opens the box when scanned.
- Search covers both boxes and the items inside them, and results can be sorted by date, name, ID or quantity.
- You can select several boxes at once to delete them or print their labels.
- Accounts use an email and password, with password reset by email. Everything you create is private to your account.

## Stack

The app is built with Next.js 16 (App Router and server actions), React and TypeScript. Data lives in Postgres on Neon, accessed with Drizzle, and photos are stored in Vercel Blob. Emails are sent with Resend, the UI uses Tailwind and shadcn/ui, and forms are validated with Zod. Everything is hosted on Vercel.

## Architecture

```
app/         Routes: (marketing), (auth), (legal) and (authenticated)
actions/     Server actions: validate the input with Zod, call lib/, return errors
lib/         The data layer, one folder per domain (box, item, image, user)
db/          The Drizzle schema and client
components/  UI grouped by feature; components/ui holds the shared primitives
drizzle/     Database migrations
```

- Pages read data through `lib/`, and client components never fetch data themselves.
- Every change goes through a server action in `actions/`, which calls `lib/` and never touches the database directly.
- Authorization lives in `lib/`: every query calls `getCurrentUser()` and filters by `userId`.
- Deleting a box or item doesn't remove its photo from Vercel Blob on its own, so photos are deleted through `lib/image`.

## Getting started

You'll need Node 20.9 or later, Yarn 1, and the Vercel CLI. Log in with `vercel login`, then run `vercel link` once to connect the folder to the project.

```bash
yarn install
yarn env:pull     # writes .env.development.local
yarn db:migrate   # the database is hosted on Neon, so there's nothing to install
yarn dev          # starts the app on http://localhost:3000
```

At startup, `env.ts` checks that these variables are set: `DATABASE_URL`, `JWT_SECRET`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY` and `NEXT_PUBLIC_APP_URL`.

## Workflow

- Work on a branch from `dev`, then open a PR into `dev`, which is squash-merged. `dev` deploys to staging.
- To release, open a PR from `dev` into `main` and merge it with a merge commit. `main` deploys to production.
- Run `yarn verify` before opening a PR: it type-checks, lints and builds the app. CI runs the same checks, and they must pass before merging.
- To change the schema, edit `db/schema.ts`, run `yarn db:generate`, read the generated SQL and commit it. Staging and production apply new migrations when they deploy, so don't run `db:migrate:prod` by hand.

The project's rules and conventions are in [`CLAUDE.md`](./CLAUDE.md).
