import React from 'react';
import type { Database } from '~/lib/supabase/types';

interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  status: Database['public']['Enums']['request_status'];
  created_at: string;
  service_categories?: {
    name: string | null;
    icon_url: string | null;
  } | null;
}

interface ServiceRequestCardProps {
  request: ServiceRequest;
  statusColors: { [key: string]: string };
  categoryIcons: { [key: string]: string };
  handleCancelRequest: (requestId: string) => void;
  openModal: (request: ServiceRequest) => void;
}

export const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({ request, statusColors, categoryIcons, handleCancelRequest, openModal }) => {
  // Use the provided icon_url if available, otherwise fallback to the category-based icon
  const iconUrl = request.service_categories?.icon_url || categoryIcons[request.service_categories?.name || 'default'];

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 flex flex-col justify-between">
      <button
        onClick={() => openModal(request)}
        className="w-full block rounded-t-lg p-4"
        style={{ textAlign: 'left' }}
      >
        <div className="p-4">
          <div className="flex items-center mb-3">
            <img
              src={iconUrl}
              alt={`${request.service_categories?.name || 'Service'} Icon`}
              className="h-12 w-12 mr-4 rounded-full border"
            />
            <div>
              <h5 className="font-semibold text-lg text-gray-800 mb-1">{request.title}</h5>
              <p className="text-gray-500 text-sm truncate">{request.description}</p>
            </div>
          </div>

          <div className="flex items-center justify-start">
            <span className="text-gray-500 text-sm mr-4">
              Submitted: {new Date(request.created_at).toLocaleDateString()}
            </span>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[request.status]}`}>
              {request.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>
      </button>
      <div className="border-t p-4 flex justify-between items-center bg-gray-50 rounded-b-lg">
        <span className="text-sm text-gray-600">
          Category: {request.service_categories?.name || 'N/A'}
        </span>
        {request.status === 'pending' || request.status === 'in_progress' ? (
          <button
            onClick={() => handleCancelRequest(request.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Cancel Request
          </button>
        ) : null}
      </div>
    </div>
  );
};
