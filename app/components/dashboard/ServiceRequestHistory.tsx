import React, { useState, useEffect } from 'react';
import { services } from '~/lib/api/services';
import type { Database } from '~/lib/supabase/types';
import { ServiceRequestDetailModal } from './ServiceRequestDetailModal';
import { ServiceRequestCard } from './ServiceRequestCard';


interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: Database['public']['Enums']['request_status'];
  created_at: string;
  service_categories?: {
    id: string;
    name: string | null;
    icon_url: string | null;
  } | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  estimated_duration: number | null;
  estimated_cost: number | null;
  actual_cost: number | null;
  scheduled_date: string | null;
}

interface ServiceRequestHistoryProps {
  user: {
    id: string;
    email: string | null;
  } | null;
}

export const ServiceRequestHistory: React.FC<ServiceRequestHistoryProps> = ({ user }) => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStatusTab, setActiveStatusTab] = useState<'pending' | 'in_progress' | 'closed'>('pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);


  const fetchServiceRequests = () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    services.getClientRequests(user.id)
      .then(requests => {
        setServiceRequests(requests || []);
      })
      .catch(e => {
        setError(e.message || 'Failed to load service request history.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchServiceRequests();
  }, [user?.id]);

  const handleCancelRequest = async (requestId: string) => {
    if (!window.confirm('Are you sure you want to cancel this service request?')) {
      return;
    }

    setLoading(true);
    try {
      await services.updateRequestStatus(requestId, 'cancelled');
      fetchServiceRequests();
    } catch (e: any) {
      setError(e.message || 'Failed to cancel service request.');
    } finally {
      setLoading(false);
    }
  };

  const pendingRequests = serviceRequests.filter(req => req.status === 'pending');
  const inProgressRequests = serviceRequests.filter(req => req.status === 'in_progress');
  const closedRequests = serviceRequests.filter(req => req.status === 'completed' || req.status === 'cancelled');

  const statusCategories = [
    { status: 'pending', displayStatus: 'Pending Requests', requests: pendingRequests },
    { status: 'in_progress', displayStatus: 'In Progress Requests', requests: inProgressRequests },
    { status: 'closed', displayStatus: 'Closed Requests', requests: closedRequests },
  ];

  const statusColors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
  };

    const categoryIcons = {
    'Plumbing': '/plumbing-icon.png',
    'Electrical': '/electrical-icon.png',
    'Cleaning': '/cleaning-icon.png',
    'Gardening': '/gardening-icon.png',
    'default': '/default-service-icon.png',
  };

  const openModal = (request: ServiceRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  if (loading) {
    return <div>Loading Service Request History...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Service Request History</h3>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-4" aria-label="Tabs">
          {statusCategories.map(({ status, displayStatus }) => (
            <button
              key={status}
              onClick={() => setActiveStatusTab(status)}
              className={`border-b-2 w-1/4 py-2 text-sm font-medium text-center whitespace-nowrap border-transparent ${activeStatusTab === status ? 'border-blue-500 text-blue-700' : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'} focus:outline-none`}
            >
              {displayStatus}
            </button>
          ))}
        </nav>
      </div>

      {statusCategories.map(({ status, displayStatus, requests }) => (
        activeStatusTab === status && (
          <div key={status} className="mb-8">
            <h4 className="text-md font-semibold mb-3">{displayStatus}</h4>
            {requests.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {requests.map(request => (
                  <ServiceRequestCard
                    key={request.id}
                    request={request}
                    statusColors={statusColors}
                    categoryIcons={categoryIcons}
                    handleCancelRequest={handleCancelRequest}
                    openModal={openModal}
                  />
                ))}
              </div>
            ) : (
              <div className="p-3 border rounded-md bg-gray-100 text-gray-600">
                No {displayStatus} requests.
              </div>
            )}
          </div>
        )
      ))}

      <ServiceRequestDetailModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        request={selectedRequest}
      />
    </div>
  );
};
