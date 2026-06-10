import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase-server';
import SigninForm from './SigninForm';

export const metadata = {
  title: 'Sign In · DeveloperCertified',
};

export default async function SigninPage({ searchParams }: { searchParams: { next?: string; redirect?: string } }) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  const redirectTo = searchParams.next ?? searchParams.redirect ?? '/profile';
  if (user) redirect(redirectTo);

  return (
    <main className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-3xl text-white mb-8">Welcome back</h1>
        <SigninForm next={redirectTo} />
      </div>
    </main>
  );
}
