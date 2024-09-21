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

export default function LoginPage() {
  return (
    <form className='min-h-screen flex justify-center items-center'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Please enter your credentials to login.
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
            </div>
            <div className='grid gap-2'>
              <div className='flex '>
                <Label htmlFor='password'>Password</Label>
                <Link href='#' className='ml-auto text-sm underline font-bold'>
                  Forgot Password?
                </Link>
              </div>
              <Input
                name='password'
                id='password'
                placeholder='Enter your password'
                type='password'
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='grid gap-4'>
          <Button type='submit' className='w-full'>
            Login
          </Button>
          <p className='text-sm text-center'>
            Don't have an account?{' '}
            <Link href='/signup' className='underline'>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
