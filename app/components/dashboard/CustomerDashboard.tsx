import type { Database } from "~/lib/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];

type CustomerDashboardProps = {
  user: {
    id: string;
    email: string | null;
  };
  profile: Profile | null;
};

export function CustomerDashboard({ user, profile }: CustomerDashboardProps) {
  return (
    <div>
      <h2>Customer Dashboard</h2>
      <p>Welcome, {profile?.first_name}!</p>
      {/* Add customer-specific content here */}
    </div>
  );
}
