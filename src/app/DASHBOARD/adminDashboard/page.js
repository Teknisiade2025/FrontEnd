import Dashboard from '@/app/component/admin/dashboard/dashboard';
import React from 'react';


export default function HomePage() {
  return (
    <div
      className="h-[100vh] w-screen bg-[url('/bgdashboard.svg')] bg-cover bg-no-repeat bg-center overflow-hidden">
        <div className="h-[100vh] flex items-center justify-center p-8">
          <Dashboard />
        </div>
    </div>
  );
}
