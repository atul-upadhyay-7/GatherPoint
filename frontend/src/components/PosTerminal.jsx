import React from 'react';
import useAuth from '../hooks/useAuth';

export default function PosTerminal() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">POS Terminal</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user?.name}!</h2>
        <p className="text-gray-400">You have access to the POS system.</p>
      </div>
    </div>
  );
}