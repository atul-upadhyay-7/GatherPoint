import React from 'react';
import { Link } from 'react-router-dom';

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl mb-6 text-gray-400">
          You don't have permission to access this page.
        </p>
        <p className="text-gray-500 mb-8">
          Your current role does not have access to this section. Please contact an administrator if you need access.
        </p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}