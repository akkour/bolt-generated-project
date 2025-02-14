import React from 'react';

export const PaymentsInvoices: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Payment History</h4>
      <div className="border rounded-md p-3 mb-2">
        <p className="text-gray-600">Invoice #1234 - $50.00 - Paid</p>
      </div>
      <div className="border rounded-md p-3 mb-2">
        <p className="text-gray-600">Invoice #1235 - $75.00 - Paid</p>
      </div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Pay Now</button>
    </div>
  );
};
