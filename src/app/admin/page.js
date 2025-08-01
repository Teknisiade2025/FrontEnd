import React from 'react';
import Dashboard from '../component/admin/dashboard.jsx';

export default function HomePage() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bgadmin.svg')" }}
    >
      <Dashboard />
    </div>
  );
}
