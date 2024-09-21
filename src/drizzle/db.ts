import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

// for query purposes
export const queryClient = postgres(process.env.DATABASE_URL as string);
export const db = drizzle(queryClient);
