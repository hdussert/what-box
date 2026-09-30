/**
 * Returns `path` if it's a same-site path, `fallback` otherwise. Guards
 * redirects built from user input (e.g. `?next=`) against sending users to
 * another site. Parsing with `URL` catches what a prefix check misses, like
 * `//evil.com`, `/\evil.com` or `/\t/evil.com` (browsers strip tabs).
 */
export function safeRedirectPath(path: unknown, fallback = '/dashboard') {
  if (typeof path !== 'string' || !path.startsWith('/')) {
    return fallback
  }

  const base = 'http://localhost'
  // URL throws on unparsable input like `//[`: treat it as unsafe too.
  const url = URL.canParse(path, base) ? new URL(path, base) : null
  if (url?.origin !== base) {
    return fallback
  }
  return url.pathname + url.search + url.hash
}

/** Escapes `\`, `%` and `_` so user input matches literally in `LIKE`/`ILIKE`. */
export function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, '\\$&')
}

const pluralRules = new Intl.PluralRules('en')

/** Prefixes `count` to the word form it takes: "1 box", "3 boxes". */
export function pluralize(
  count: number,
  forms: { one: string; other: string },
) {
  const form = pluralRules.select(count) === 'one' ? forms.one : forms.other
  return `${count} ${form}`
}
