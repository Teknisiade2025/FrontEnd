"use client";


import Dashboard from '@/app/component/admin/dashboard/managerDashboard';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';


export default function HomePage() {
  const searchParams = useSearchParams();  
  const kmhmName = searchParams.get('kmhm') || '';

  return (
    <div
      className="h-[100vh] w-screen bg-[url('/bgdashboard.svg')] bg-cover bg-no-repeat bg-center overflow-hidden">
    <div className="flex-1 pt-30">
      <Dashboard kmhmName={kmhmName} />
    </div>
    </div>
  );
}

