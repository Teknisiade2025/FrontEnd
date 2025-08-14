import Dashboard from '@/app/component/admin/dashboard/managerDashboard';
import React from 'react';
import { Suspense } from 'react';


export default function HomePage() {
  return (
    <div
      className="h-[100vh] w-screen bg-[url('/bgdashboard2.svg')] bg-cover bg-no-repeat bg-center overflow-hidden">
    <div className="flex-1 pt-8">
        
      <Dashboard />
    </div>
    </div>
  );
}

