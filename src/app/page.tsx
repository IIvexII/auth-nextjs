import { validateRequest } from '@/lib/lucia';

export default async function Home() {
  const session = await validateRequest();

  if (session.user === null) {
    return <>Unauthorized</>;
  }
  return <>Protected</>;
}
