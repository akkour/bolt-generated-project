import type { Database } from "~/lib/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

type ProviderDashboardProps = {
  user: {
    id: string;
    email: string | null;
  };
  profile: Profile | null;
};

export function ProviderDashboard({ user, profile }: ProviderDashboardProps) {
  return (
    <div>
      <h2>Provider Dashboard</h2>
      <p>Welcome, {profile?.first_name}!</p>
      {/* Add provider-specific content here */}
    </div>
  );
}
