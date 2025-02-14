import React, { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { Database } from '~/lib/supabase/types';
import { UserManagement } from './UserManagement'; // Import UserManagement
import { ServiceCategoryManagement } from './ServiceCategoryManagement'; // Import ServiceCategoryManagement
import { SystemAnalytics } from './SystemAnalytics'; // Import SystemAnalytics


type Profile = Database['public']['Tables']['profiles']['Row'];
interface AdminDashboardProps {
  user: User;
  profile: Profile | null;
}

export function AdminDashboard({ user, profile }: AdminDashboardProps) {
  const [userManagementExpanded, setUserManagementExpanded] = useState(false);
  const [serviceCategoriesExpanded, setServiceCategoriesExpanded] = useState(false);
  const [systemAnalyticsExpanded, setSystemAnalyticsExpanded] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
        <span className="rounded-full h-10 w-10 bg-red-500 text-white flex items-center justify-center font-bold">
          {profile?.firstName ? profile?.firstName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "?"}
        </span>
      </div>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-gray-700">User Management</h3>
          <button
            onClick={() => setUserManagementExpanded(!userManagementExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {userManagementExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">Manage user accounts and roles.</p>
        {userManagementExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <UserManagement /> {/* Render UserManagement Component */}
          </div>
        )}
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-gray-700">Service Categories</h3>
          <button
            onClick={() => setServiceCategoriesExpanded(!serviceCategoriesExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {serviceCategoriesExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">Manage service categories offered on the platform.</p>
        {serviceCategoriesExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <ServiceCategoryManagement /> {/* Render ServiceCategoryManagement Component */}
          </div>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold text-gray-700">System Analytics</h3>
          <button
            onClick={() => setSystemAnalyticsExpanded(!systemAnalyticsExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {systemAnalyticsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">View platform usage and performance analytics.</p>
        {systemAnalyticsExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <SystemAnalytics /> {/* Render SystemAnalytics Component */}
          </div>
        )}
      </section>
    </div>
  );
}
