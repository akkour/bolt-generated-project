import React from 'react';
import type { User } from '@supabase/supabase-js';
import type { Database } from '~/lib/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
interface AdminDashboardProps {
  user: User;
  profile: Profile | null;
}

export function AdminDashboard({ user, profile }: AdminDashboardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        <span className="rounded-full h-10 w-10 bg-red-500 text-white flex items-center justify-center font-bold">
          {profile?.firstName ? profile?.firstName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "?"}
        </span>
      </div>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">User Management</h3>
        <p className="text-gray-600">Manage user accounts and roles.</p>
        {/* Add user management component here */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [User Management Placeholder]
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">Service Categories</h3>
        <p className="text-gray-600">Manage service categories offered on the platform.</p>
        {/* Add service categories component here */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [Service Categories Placeholder]
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">System Analytics</h3>
        <p className="text-gray-600">View platform usage and performance analytics.</p>
        {/* Add analytics component here */}
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          [System Analytics Placeholder]
        </div>
      </section>
    </div>
  );
}
