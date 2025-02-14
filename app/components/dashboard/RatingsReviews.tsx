import React from 'react';

export const RatingsReviews: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Rate Your Experience</h4>
      <p className="text-gray-600">Select a provider and rate your experience.</p>
      <select className="w-full p-2 border rounded-md mb-3">
        <option>Select a provider</option>
        <option>John Doe</option>
        <option>Jane Smith</option>
      </select>
      <textarea className="w-full p-2 border rounded-md mb-3" placeholder="Enter your review"></textarea>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Review</button>
    </div>
  );
};
