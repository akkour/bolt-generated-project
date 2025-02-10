import React from 'react';
import type { User } from '@supabase/supabase-js';
import type { Database } from '~/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface CustomerDashboardProps {
  user: User;
  profile: Profile | null;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, profile }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Customer Dashboard</h2>
        <span className="rounded-full h-10 w-10 bg-blue-500 text-white flex items-center justify-center font-bold">
          {profile?.firstName ? profile?.firstName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "?"}
        </span>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Find Services</h3>
        <p className="text-gray-600">Search for service providers in your area.</p>
        {/* Add search component here */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [Search Services Functionality Placeholder]
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Your Bookings</h3>
        <p className="text-gray-600">View and manage your service bookings.</p>
        {/* Add booking list component here */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [Your Bookings Placeholder]
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Profile Information</h3>
        <p className="text-gray-600">View and update your profile details.</p>
        {/* Add profile summary component or link to profile page */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [Profile Information Placeholder]
        </div>
      </section>
    </div>
  );
};
