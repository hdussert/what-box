/**
 * An error whose message is written for users: actions show it as is. Any
 * other error could expose internals (a failed query, an API response), so
 * actions show a generic message instead and log it.
 */
export class UserError extends Error {}
