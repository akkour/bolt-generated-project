import React from 'react';

export const JobTracking: React.FC = () => {
  const currentJobs = [
    { id: 'job1', title: 'Leaky Faucet Repair', customer: 'John Doe', status: 'Scheduled', date: '2024-08-15' },
    { id: 'job2', title: 'Outlet Not Working', customer: 'Jane Smith', status: 'In Progress', date: '2024-08-10' },
    { id: 'job3', title: 'Install New Light Fixture', customer: 'Robert Brown', status: 'Pending', date: '2024-08-09' },
  ];

  const pastJobs = [
    { id: 'job4', title: 'Bathroom Tile Replacement', customer: 'Alice Johnson', status: 'Completed', date: '2024-08-05' },
    { id: 'job5', title: 'Garden Clean Up', customer: 'Bob Williams', status: 'Completed', date: '2024-08-02' },
    { id: 'job6', title: 'Broken Window Repair', customer: 'Charlie Davis', status: 'Cancelled', date: '2024-07-28' },
  ];

  const statusColors = {
    'Scheduled': 'bg-blue-200 text-blue-800',
    'In Progress': 'bg-yellow-200 text-yellow-800',
    'Completed': 'bg-green-200 text-green-800',
    'Cancelled': 'bg-red-200 text-red-800',
    'Pending': 'bg-gray-200 text-gray-800',
  };

  const statusIcons = {
    'Scheduled': '📅',
    'In Progress': '🛠️',
    'Completed': '✅',
    'Cancelled': '❌',
    'Pending': '⏳',
  };


  return (
    <div>
      <h4 className="text-lg font-semibold mb-3 text-gray-700">Current Jobs</h4>
      {currentJobs.length > 0 ? (
        <div className="mb-4">
          {currentJobs.map(job => (
            <div key={job.id} className="p-4 mb-2 border rounded-md bg-gray-50 flex justify-between items-center">
              <div>
                <h5 className="font-semibold text-gray-700">{job.title}</h5>
                <p className="text-gray-600 text-sm">Customer: {job.customer}</p>
                <p className="text-gray-600 text-sm">Date: {job.date}</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                  {statusIcons[job.status]} {job.status}
                </span>
                <button
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={() => alert('View details for job ID: ' + job.id)} // Placeholder action - using string concatenation
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4 p-3 border rounded-md bg-gray-100">
          <p className="text-gray-600">No current jobs.</p>
        </div>
      )}

      <h4 className="text-lg font-semibold mb-3 text-gray-700">Past Jobs</h4>
      {pastJobs.length > 0 ? (
        <div>
          {pastJobs.map(job => (
            <div key={job.id} className="p-4 mb-2 border rounded-md bg-gray-50 flex justify-between items-center">
              <div>
                <h5 className="font-semibold text-gray-700">{job.title}</h5>
                <p className="text-gray-600 text-sm">Customer: {job.customer}</p>
                <p className="text-gray-600 text-sm">Date: {job.date}</p>
              </div>
              <div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                  {statusIcons[job.status]} {job.status}
                </span>
                <button
                  className="ml-2 px-3 py-1 bg-gray-400 text-white rounded-md text-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                  disabled
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 border rounded-md bg-gray-100">
          <p className="text-gray-600">No past jobs.</p>
        </div>
      )}
    </div>
  );
};
