'use client';
import Dashboard from '@/app/component/admin/dashboard/managerDashboard';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();  
  const router = useRouter();  

  const [role, setRole] = useState(null);
  const [kmhmName, setKmhmName] = useState('');

  useEffect(() => {
    const r = searchParams.get('role') || 'manager'; // default manager
    const k = searchParams.get('kmhm') || '';
    setRole(r);
    setKmhmName(k);

    if (r && r !== 'manager') {
      router.replace(`/athletes?kmhm=${k}&role=${r}`);
    }
  }, [searchParams, router]);

  if (!role) return <div>Loading...</div>;
  if (role !== 'manager') return null;

  const goToAthletes = (selectedSport, role) => {
    const query = new URLSearchParams({
      kmhm: kmhmName,
      role: role,
      mainCategory: selectedSport.mainCategory,
      subCategory: selectedSport.subCategory
    }).toString();

    router.push(`/athletes?${query}`);
  };

  return (
    <div className="flex flex-row min-h-screen pt-10 gap-1 w-screen bg-[url('/bgdashboard.svg')] bg-cover bg-no-repeat bg-center">
      <div className="flex-1 pt-8">
        <Dashboard kmhmName={kmhmName} goToAthletes={goToAthletes} />
      </div>
    </div>
  );
}
