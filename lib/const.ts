/**
 * Name of the session cookie. Kept here rather than in `lib/session.ts` so
 * `proxy.ts` can read it without importing the session module (and the DB).
 */
export const SESSION_COOKIE_NAME = 'auth_token'

export const SITE_NAME = 'WhatBox'
export const SITE_TAGLINE = 'Find your items in an instant.'
/** Default description for search results and link previews. */
export const SITE_DESCRIPTION =
  'WhatBox keeps track of what is in your storage boxes: list the items, add photos, print a QR label and scan it to see what is inside.'
