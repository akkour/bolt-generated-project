import React from 'react';

export const SmartSuggestionsInsights: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Recommended Services</h4>
      <div className="border rounded-md p-3 mb-2">
        <p className="text-gray-600">Recommended: Plumbing service for leaky faucet</p>
      </div>
      <div className="border rounded-md p-3 mb-2">
        <p className="text-gray-600">Insight: Save money by bundling services</p>
      </div>
    </div>
  );
};
