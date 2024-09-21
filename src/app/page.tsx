import { validateRequest } from '@/lib/lucia';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await validateRequest();

  if (session.user === null) {
    redirect('/login');
  }
  return <>Protected</>;
}
