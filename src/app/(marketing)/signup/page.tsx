import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase-server';
import SignupForm from './SignupForm';

export const metadata = {
  title: 'Sign Up · DeveloperCertified',
  description: 'Create your account to access realtor utilities and the broker group chat.',
};

export default async function SignupPage({ searchParams }: { searchParams: { next?: string } }) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect(searchParams.next ?? '/profile');

  return (
    <main className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-md">
        <h1 className="font-heading text-3xl text-white mb-2">Create your account</h1>
        <p className="text-ivory-400/70 mb-8">
          Free. No marketing fluff.
        </p>
        <SignupForm next={searchParams.next} />
      </div>
    </main>
  );
}
