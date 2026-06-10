import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabase-server';
import ProfileContent from './ProfileContent';

export const metadata = { title: 'Your Profile · DeveloperCertified' };

export default async function ProfilePage() {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin?next=/profile');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main className="min-h-screen bg-charcoal-950 px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-heading text-3xl text-white mb-8">Your account</h1>
        <ProfileContent
          email={user.email!}
          fullName={profile?.full_name ?? null}
          tier={profile?.tier ?? 'reader'}
          brokerageName={profile?.brokerage_name ?? null}
          realtorLicense={profile?.realtor_license ?? null}
          salesAgentDevSlug={profile?.sales_agent_dev_slug ?? null}
        />
      </div>
    </main>
  );
}
