import React, { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { Database } from '~/lib/supabase/types';
import { ProviderProfileForm } from '~/components/profile/ProviderProfileForm';
import { JobTracking } from './JobTracking';
import { EarningsReports } from './EarningsReports'; // Import EarningsReports
import { RealTimeCommunication } from './RealTimeCommunication'; // Import RealTimeCommunication
import { ProfileVerification } from './ProfileVerification'; // Import ProfileVerification
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'; // Import icons


type Profile = Database['public']['Tables']['profiles']['Row'];

interface ProviderDashboardProps {
  user: User;
  profile: Profile | null;
}

export const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ user, profile }) => {

  const [jobTrackingExpanded, setJobTrackingExpanded] = useState(false);
  const [earningsExpanded, setEarningsExpanded] = useState(false);
  const [communicationExpanded, setCommunicationExpanded] = useState(false);
  const [profileManagementExpanded, setProfileManagementExpanded] = useState(false);
  const [profileVerificationExpanded, setProfileVerificationExpanded] = useState(false);


  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Service Provider Dashboard</h2>
        <span className="rounded-full h-10 w-10 bg-green-500 text-white flex items-center justify-center font-bold">
          {profile?.firstName ? profile?.firstName[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "?"}
        </span>
      </div>

      {/* Job Tracking - Replaced Placeholder with JobTracking Component */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Job Tracking</h3>
          <button
            onClick={() => setJobTrackingExpanded(!jobTrackingExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center"
          >
            {jobTrackingExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
            {jobTrackingExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">Manage and track your current and past jobs.</p>
        {jobTrackingExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 transition-all duration-300 ease-in-out">
            <JobTracking /> {/* Render JobTracking Component here */}
          </div>
        )}
      </section>

      {/* Earnings Reports - Moved up, after Job Tracking */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Earnings Reports</h3>
          <button
            onClick={() => setEarningsExpanded(!earningsExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center"
          >
            {earningsExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
            {earningsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">View detailed reports of your earnings and transactions.</p>
        {earningsExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 transition-all duration-300 ease-in-out">
            <EarningsReports /> {/* Render EarningsReports Component */}
          </div>
        )}
      </section>

      {/* Real-time Communication - Moved before Profile Management */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Real-time Communication</h3>
          <button
            onClick={() => setCommunicationExpanded(!communicationExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center"
          >
            {communicationExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
            {communicationExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">Communicate with customers in real-time.</p>
        {communicationExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 transition-all duration-300 ease-in-out">
            <RealTimeCommunication /> {/* Render RealTimeCommunication Component */}
          </div>
        )}
      </section>

      {/* Profile Management - Moved to after Real-time Communication */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Profile Management - Edit Your Profile</h3>
          <button
            onClick={() => setProfileManagementExpanded(!profileManagementExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center"
          >
            {profileManagementExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
            {profileManagementExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">Update your profile information here.</p>
        {profileManagementExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 transition-all duration-300 ease-in-out">
            <ProviderProfileForm user={user} profile={profile as any} /> {/* Render ProviderProfileForm */}
          </div>
        )}
      </section>

      {/* Profile Verification - Moved down */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Profile Verification</h3>
          <button
            onClick={() => setProfileVerificationExpanded(!profileVerificationExpanded)}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center"
          >
            {profileVerificationExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
            {profileVerificationExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        <p className="text-gray-600">Verify your profile to gain customer trust.</p>
        {profileVerificationExpanded && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50 transition-all duration-300 ease-in-out">
            <ProfileVerification /> {/* Render ProfileVerification Component */}
          </div>
        )}
      </section>
    </div>
  );
};
