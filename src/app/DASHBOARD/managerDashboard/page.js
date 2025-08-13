"use client";


import Dashboard from '@/app/component/admin/dashboard/managerDashboard';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';


export default function HomePage() {
  const searchParams = useSearchParams();  
  const kmhmName = searchParams.get('kmhm') || '';

  return (
    <div
      className="flex flex-row min-h-screen pt-10 gap-1 w-screen bg-[url('/bgdashboard.svg')] bg-cover bg-no-repeat bg-center">
    <div className="flex-1 pt-8">
      <Dashboard kmhmName={kmhmName} />
    </div>
    </div>
  );
}

