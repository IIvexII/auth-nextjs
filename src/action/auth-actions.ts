'use server';

import {
  createUser,
  isEmailExists,
  validateCredentials,
} from '@/drizzle/queries';
import { createSession } from '@/lib/lucia';
import { hashPassword } from '@/lib/utils';
import { redirect } from 'next/navigation';

interface authFormState {
  email?: string;
  password?: string;
  general?: string;
}

export async function signup(
  _: authFormState,
  formData: FormData
): Promise<authFormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const errors: authFormState = {};

  if (!email || !email.includes('@')) {
    errors.email = 'Invalid email address';
  } else if (await isEmailExists(email)) {
    errors.email = 'Email address already exists';
  }

  if (!password || password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  let userId: string;
  // Save user to database
  try {
    // convert the password into hash
    const hashedPassword = await hashPassword(password);

    userId = await createUser(email, hashedPassword);
    // create session
  } catch (error) {
    return errors;
  }

  await createSession(userId);

  redirect('/login');
}

export async function login(
  _: authFormState,
  formData: FormData
): Promise<authFormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const errors: authFormState = {};

  if (!email || !email.includes('@') || !password || password.length < 8) {
    errors.general = 'Invalid email or password';
    return errors;
  }

  let userId: string | null;
  // Save user to database
  try {
    userId = await validateCredentials(email, password);

    if (!userId) {
      errors.general = 'Invalid email or password';
      return errors;
    }

    // create session
  } catch (error) {
    return errors;
  }

  await createSession(userId);

  redirect('/');
}
