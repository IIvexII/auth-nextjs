import { and, eq } from 'drizzle-orm';
import { db } from './db';
import { user } from './schema';
import { verifyPassword } from '@/lib/utils';

export async function createUser(email: string, password: string) {
  try {
    const userId = await db
      .insert(user)
      .values({
        email,
        password,
      })
      .returning({ id: user.id });

    return userId[0].id;
  } catch (error) {
    throw 'Failed to create the user. Please try again later';
  }
}

export async function validateCredentials(email: string, password: string) {
  const users = await db.select().from(user).where(eq(user.email, email));

  if (users.length === 0) {
    return null;
  }

  if (await verifyPassword(password, users[0].password)) {
    return users[0].id;
  } else {
    return null;
  }
}

// check user exists
export async function isEmailExists(email: string): Promise<boolean> {
  const users = await db.select().from(user).where(eq(user.email, email));

  return users.length > 0 ? true : false;
}
