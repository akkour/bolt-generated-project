import React from 'react';

export const CommunicationNotifications: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Notifications</h4>
      <div className="border rounded-md p-3 mb-2">
        <p className="text-gray-600">New message from provider John Doe</p>
      </div>
      <div className="border rounded-md p-3 mb-2">
        <p className="text-gray-600">Your service request has been accepted</p>
      </div>
      <div className="border rounded-md p-3 mb-2">
        <p className="text-gray-600">Upcoming appointment with provider Jane Smith</p>
      </div>
    </div>
  );
};
