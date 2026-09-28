/**
 * An error whose message is written for users: actions show it as is. Any
 * other error could expose internals (a failed query, an API response), so
 * actions show a generic message instead and log it.
 */
export class UserError extends Error {}

/**
 * What an action shows for a caught error: its message if it's a UserError,
 * else `fallback`. Only the unexpected ones are logged.
 */
export function toUserMessage(error: unknown, fallback: string) {
  if (error instanceof UserError) {
    return error.message
  }
  console.error(error)
  return fallback
}
