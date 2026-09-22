# WhatBox mobile

Expo/React Native companion to the web app. Current scope: sign in, view your
boxes, view a box's items - read-only, no image upload or editing yet (see
the root README's mobile section for why, and `apps/web/app/api` for what's
exposed).

## Running locally

From the repo root:

```bash
yarn workspace web dev    # the API this app calls - keep it running
yarn workspace mobile ios # or: android / web
```

`.env` defaults `EXPO_PUBLIC_API_URL` to `http://localhost:3000`, which the
iOS Simulator can reach directly. From a physical device or the Android
emulator, override it with the dev machine's LAN IP instead (see the same
constraint on `apps/web`'s `allowedDevOrigins` in `next.config.ts`).

## How it talks to the backend

- `src/api/client.ts` / `src/api/auth.ts` / `src/api/boxes.ts` call
  `apps/web`'s `/api/*` routes with a `Authorization: Bearer <token>` header,
  not Server Actions (those aren't a stable API for an external client - see
  `apps/web/lib/api/response.ts`).
- The JWT comes back from `POST /api/auth/sign-in` and is stored with
  `expo-secure-store`, alongside the signed-in user's `id`/`email` (there's no
  `/api/me` yet, so the stored user is what restores auth state on relaunch -
  see the comment on `getStoredUser` in `src/api/auth.ts`).
- `SignInSchema` comes from `@what-box/shared`, the same schema the server
  validates against.

## Styling

NativeWind (Tailwind classes on RN components), pinned to Tailwind v3 - the
stable NativeWind 4.x release doesn't support v4 yet (`apps/web` is on v4;
see the comment in `tailwind.config.js`). No UI is shared with the web app,
only `packages/shared`'s validation schemas.
