import Dashboard from '@/app/component/admin/dashboard/dashboard';
import React from 'react';


export default function HomePage() {
  return (
    <div
      className="flex flex-row min-h-screen pt-10 gap-1 w-screen bg-[url('/bgdashboard.svg')] bg-cover bg-no-repeat bg-center">
    <div className="flex-1 pt-20">
      <Dashboard />
    </div>
    </div>
  );
}

