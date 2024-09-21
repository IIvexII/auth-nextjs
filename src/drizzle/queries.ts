import { eq } from 'drizzle-orm';
import { db } from './db';
import { userTable } from './schema';

export async function createUser(email: string, password: string) {
  try {
    return db.insert(userTable).values({
      email,
      password,
    });
  } catch (error) {
    throw 'Failed to create the user. Please try again later';
  }
}

// check user exists
export async function isEmailExists(email: string): Promise<boolean> {
  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email));

  return user.length > 0 ? true : false;
}
