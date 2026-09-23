/**
 * Name of the session cookie. Kept here rather than in `lib/session.ts` so
 * `proxy.ts` can read it without importing the session module (and the DB).
 */
export const SESSION_COOKIE_NAME = 'auth_token'
