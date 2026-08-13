import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '../db/schema.js';
import * as relations from '../db/relations.js';

// Verify env variable loading
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing in environment variables!');
}

console.log('Connecting to Neon URL host:', connectionString.split('@')[1] || 'URL malformed');

const sql = neon(connectionString);

export const db = drizzle(sql, { 
  schema: { ...schema, ...relations } 
});