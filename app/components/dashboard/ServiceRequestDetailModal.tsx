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

interface ServiceRequestDetailModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  request: ServiceRequest | null;
}

export const ServiceRequestDetailModal: React.FC<ServiceRequestDetailModalProps> = ({ isOpen, onRequestClose, request }) => {
  if (!isOpen || !request) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay, when modal is open */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onRequestClose}></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  Service Request Details
                </h3>
                <div className="mt-2">
                  {request && (
                    <div>
                      <p><strong>Request ID:</strong> {request.id}</p>
                      <p><strong>Title:</strong> {request.title}</p>
                      <p><strong>Description:</strong> {request.description}</p>
                      <p><strong>Status:</strong> {request.status.toUpperCase()}</p>
                      <p><strong>Category:</strong> {request.service_categories?.name || 'N/A'}</p>
                      <p><strong>Submitted Date:</strong> {new Date(request.created_at).toLocaleDateString()}</p>
                      <p><strong>Address:</strong> {request.address}, {request.city}, {request.state} {request.zip_code}</p>
                      <p><strong>Estimated Duration:</strong> {request.estimated_duration || 'N/A'} hours</p>
                      <p><strong>Estimated Cost:</strong> ${request.estimated_cost || 'N/A'}</p>
                      <p><strong>Actual Cost:</strong> ${request.actual_cost || 'N/A'}</p>
                      <p><strong>Scheduled Date:</strong> {request.scheduled_date ? new Date(request.scheduled_date).toLocaleDateString() : 'Not Scheduled'}</p>
                      {/* Add more details as needed */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onRequestClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
