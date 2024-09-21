'use client';

import * as actions from '@/action/auth-actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useFormState } from 'react-dom';

export default function SignupPage() {
  const [formState, formAction] = useFormState(actions.signup, {});

  return (
    <form
      action={formAction}
      className='min-h-screen flex justify-center items-center'
    >
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Create Account</CardTitle>
          <CardDescription>
            Please enter the information to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                name='email'
                id='email'
                placeholder='Enter your email'
                type='email'
              />
              {formState.email && (
                <p className='text-red-600 text-sm'>{formState.email}</p>
              )}
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                name='password'
                id='password'
                placeholder='Enter your password'
                type='password'
              />
              {formState.password && (
                <p className='text-red-600 text-sm'>{formState.password}</p>
              )}
            </div>
          </div>
          {formState.general && (
            <p className='text-red-600 text-sm'>{formState.general}</p>
          )}
        </CardContent>
        <CardFooter className='grid gap-4'>
          <Button type='submit' className='w-full'>
            Login
          </Button>
          <p className='text-sm text-center'>
            Already have an account?{' '}
            <Link href='/login' className='underline'>
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
