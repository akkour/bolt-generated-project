import React, { useState } from 'react';
import type { User } from '@supabase/supabase-js';
import type { Database } from '~/lib/supabase/types';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { CustomerProfileForm } from '../profile/CustomerProfileForm';
import { ServiceRequestBooking } from './ServiceRequestBooking';
import { CommunicationNotifications } from './CommunicationNotifications';
import { PaymentsInvoices } from './PaymentsInvoices'; // Import PaymentsInvoices
import { RatingsReviews } from './RatingsReviews'; // Import RatingsReviews
import { SmartSuggestionsInsights } from './SmartSuggestionsInsights'; // Import SmartSuggestionsInsights
import { ServiceRequestHistory } from './ServiceRequestHistory';
import { RealTimeCommunication } from './RealTimeCommunication'; // Import RealTimeCommunication


type Profile = Database['public']['Tables']['profiles']['Row'];

interface CustomerDashboardProps {
  user: User;
  profile: Profile | null;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, profile }) => {

  const [profileExpanded, setProfileExpanded] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [serviceRequestsExpanded, setServiceRequestsExpanded] = useState(true);
  const [communicationExpanded, setCommunicationExpanded] = useState(false);
  const [paymentsExpanded, setPaymentsExpanded] = useState(false);
  const [ratingsExpanded, setRatingsExpanded] = useState(false);
  const [suggestionsExpanded, setSuggestionsExpanded] = useState(false);

  const sectionStyle = 'bg-white shadow rounded-lg p-6 mb-6';
  const sectionHeaderStyle = 'flex justify-between items-center mb-3';
  const sectionTitleStyle = 'text-xl font-semibold text-gray-700';
  const sectionContentStyle = 'mt-4 p-4 border rounded-md bg-gray-50 transition-all duration-300 ease-in-out';
  const buttonStyle = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
  const expandButtonStyle = 'text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center';

  return (
    <div className="container mx-auto p-4">
      <div className={sectionStyle}>
        <div className={sectionHeaderStyle}>
          <h2 className={sectionTitleStyle}>Customer Dashboard</h2>
          <span className="rounded-full h-10 w-10 bg-blue-500 text-white flex items-center justify-center font-bold">
            {profile?.first_name ? profile?.first_name[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : "?"}
          </span>
        </div>
      </div>

      {/* Profile & Preferences */}
      <section className={sectionStyle}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={sectionTitleStyle}>Profile & Preferences</h3>
          <button
            onClick={() => setProfileExpanded(!profileExpanded)}
            className={expandButtonStyle}
          >
            {profileExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
            {profileExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {profileExpanded && (
          <div className={sectionContentStyle}>
            {!editProfile ? (
              <>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">First name</dt>
                    <dd className="mt-1 text-sm text-gray-900 opacity-70">{profile?.first_name || 'N/A'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Last name</dt>
                    <dd className="mt-1 text-sm text-gray-900 opacity-70">{profile?.last_name || 'N/A'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900 opacity-70">{profile?.phone || 'N/A'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 opacity-70">{profile?.address || 'N/A'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">City</dt>
                    <dd className="mt-1 text-sm text-gray-900 opacity-70">{profile?.city || 'N/A'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">State</dt>
                    <dd className="mt-1 text-sm text-gray-900 opacity-70">{profile?.state || 'N/A'}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Zip Code</dt>
                    <dd className="mt-1 text-sm text-gray-900 opacity-70">{profile?.zip_code || 'N/A'}</dd>
                  </div>
                </dl>
                <div className="mt-2">
                  <button
                    onClick={() => setEditProfile(true)}
                    className={buttonStyle}
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <div className={sectionContentStyle}>
                <CustomerProfileForm user={user} profile={profile} setIsEditing={setEditProfile} isEditing={editProfile} />
              </div>
            )}
          </div>
        )}
      </section>

      {/* Unified Service Requests Section */}
      <section className={sectionStyle}>
        <div className={sectionHeaderStyle}>
          <h3 className={sectionTitleStyle}>Service Requests</h3>
          <button
            onClick={() => setServiceRequestsExpanded(!serviceRequestsExpanded)}
            className={expandButtonStyle}
          >
            {serviceRequestsExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
            {serviceRequestsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {serviceRequestsExpanded && (
          <div className={sectionContentStyle}>
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-2">Request a Service</h4>
              <ServiceRequestBooking user={user} />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Service Request History</h4>
              <ServiceRequestHistory user={user} />
            </div>
          </div>
        )}
      </section>

      {/* Communication & Notifications */}
      <section className={sectionStyle}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={sectionTitleStyle}>Communication & Notifications</h3>
          <button
            onClick={() => setCommunicationExpanded(!communicationExpanded)}
            className={expandButtonStyle}
          >
            {communicationExpanded ? <ChevronDownIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
             {communicationExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {communicationExpanded && (
          <div className={sectionContentStyle}>
            <CommunicationNotifications />
            <RealTimeCommunication /> {/* Render RealTimeCommunication Component */}
          </div>
        )}
      </section>

      {/* Payments & Invoices */}
      <section className={sectionStyle}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={sectionTitleStyle}>Payments & Invoices</h3>
          <button
            onClick={() => setPaymentsExpanded(!paymentsExpanded)}
            className={expandButtonStyle}
          >
            {paymentsExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
             {paymentsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {paymentsExpanded && (
          <div className={sectionContentStyle}>
            <PaymentsInvoices /> {/* Render PaymentsInvoices Component */}
          </div>
        )}
      </section>

      {/* Ratings & Reviews */}
      <section className={sectionStyle}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={sectionTitleStyle}>Ratings & Reviews</h3>
          <button
            onClick={() => setRatingsExpanded(!ratingsExpanded)}
            className={expandButtonStyle}
          >
            {ratingsExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
             {ratingsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {ratingsExpanded && (
          <div className={sectionContentStyle}>
            <RatingsReviews /> {/* Render RatingsReviews Component */}
          </div>
        )}
      </section>

      {/* Smart Suggestions & Insights */}
      <section className={sectionStyle}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={sectionTitleStyle}>Smart Suggestions & Insights</h3>
          <button
            onClick={() => setSuggestionsExpanded(!suggestionsExpanded)}
            className={expandButtonStyle}
          >
            {suggestionsExpanded ? <ChevronUpIcon className="h-5 w-5 mr-1" /> : <ChevronDownIcon className="h-5 w-5 mr-1" />}
             {suggestionsExpanded ? 'Collapse' : 'Expand'}
          </button>
        </div>
        {suggestionsExpanded && (
          <div className={sectionContentStyle}>
            <SmartSuggestionsInsights /> {/* Render SmartSuggestionsInsights Component */}
          </div>
        )}
      </section>
    </div>
  );
};
