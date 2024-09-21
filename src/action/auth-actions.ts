'use server';

import { createUser, isEmailExists } from '@/drizzle/queries';
import { createSession } from '@/lib/lucia';
import { hashPassword } from '@/lib/utils';
import { redirect } from 'next/navigation';

interface signupFormState {
  email?: string;
  password?: string;
  general?: string;
}

export async function signup(
  _: signupFormState,
  formData: FormData
): Promise<signupFormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const errors: signupFormState = {};

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
