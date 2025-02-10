import type { Database } from "~/lib/supabase/types";
import type { User } from '@supabase/supabase-js';

type Profile = Database['public']['Tables']['profiles']['Row'];

type ProviderDashboardProps = {
  user: User;
  profile: Profile | null;
};

export function ProviderDashboard({ user, profile }: ProviderDashboardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Service Provider Dashboard</h2>
        <span className="rounded-full h-10 w-10 bg-green-500 text-white flex items-center justify-center font-bold">
          {profile?.firstName ? profile?.firstName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "?"}
        </span>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Service Listings</h3>
        <p className="text-gray-600">Manage your service listings and availability.</p>
        {/* Add service listings component here */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [Service Listings Placeholder]
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Booking Requests</h3>
        <p className="text-gray-600">View and respond to booking requests from customers.</p>
        {/* Add booking requests component here */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [Booking Requests Placeholder]
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Profile &amp; Settings</h3>
        <p className="text-gray-600">Update your profile information and account settings.</p>
        {/* Add profile and settings component or link */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [Profile & Settings Placeholder]
        </div>
      </section>
    </div>
  );
}
