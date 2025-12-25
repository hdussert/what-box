import { env } from '@/env'
import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres'

import * as schema from './schema'

export const db = env.VERCEL
  ? drizzleNeon({
      client: neon(env.DATABASE_URL),
      schema,
      casing: 'snake_case',
    })
  : drizzlePostgres(env.DATABASE_URL, { schema, casing: 'snake_case' })
