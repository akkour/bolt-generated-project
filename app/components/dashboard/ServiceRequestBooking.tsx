import React, { useState, useEffect } from 'react';
import { services } from '../../lib/api/services';

interface ServiceRequestBookingProps {
  user: {
    id: string;
    email: string | null;
  } | null;
}

export const ServiceRequestBooking: React.FC<ServiceRequestBookingProps> = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [requestDetails, setRequestDetails] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await services.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("ServiceRequestBooking:handleSubmit - User object received:", user);

    if (!user?.id) {
      console.log("ServiceRequestBooking:handleSubmit - No user ID found, prompting login");
      alert('Please log in to submit a request.');
      return;
    }

    if (!selectedCategory || !requestDetails) {
      alert('Please select a category and enter the request details.');
      return;
    }

    const requestPayload = {
      client_id: user.id,
      category_id: selectedCategory,
      description: requestDetails,
      title: 'Service Request',
      address: 'Placeholder Address', // Consider making these dynamic
      city: 'Placeholder City',
      state: 'PA',
      zip_code: '12345',
    };
    console.log("ServiceRequestBooking:handleSubmit - Request payload:", requestPayload);


    try {
      console.log("ServiceRequestBooking:handleSubmit - Calling services.createRequest...");
      await services.createRequest(requestPayload);
      console.log("ServiceRequestBooking:handleSubmit - services.createRequest call successful");
      alert('Request submitted successfully!');
      // Reset the form
      setSelectedCategory('');
      setRequestDetails('');
    } catch (error) {
      console.error('ServiceRequestBooking:handleSubmit - Failed to create request:', error);
      console.log('Failed to submit request. Please try again.');
    }
  };

  console.log("ServiceRequestBooking:Component - User prop received:", user);

  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Request a Service</h4>
      <p className="text-gray-600 mb-4">Select a service category and provide details for your request.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
            <select
              id="category"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Request Details</label>
          <textarea
            id="details"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Enter details of your request"
            rows={4}
            value={requestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};
