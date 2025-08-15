'use client';
import { useState, useEffect } from 'react';

import React from 'react';
import Sidebar from '@/app/component/admin/compNavigasiCabang/scheduleNav.jsx';
import { useSearchParams, useRouter } from 'next/navigation';
import AthleteRegistration from '@/app/component/manager/registrasi/registv2.jsx';
import { IoLogOut } from "react-icons/io5";
import { Suspense } from 'react';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Inisialisasi selectedRole sekali saja
  const [selectedRole, setSelectedRole] = useState(() => {
    return searchParams.get('role') || 'Atlet';
  });
  
  const [selectedData, setSelectedData] = useState(null);
  const kmhmName = searchParams.get('kmhm') || '';

  // Update URL ketika selectedRole berubah, tapi jangan reset selectedRole dari URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('role', selectedRole);
    
    // Hanya update URL jika role di URL berbeda dengan selectedRole
    if (searchParams.get('role') !== selectedRole) {
      router.push(`?${params.toString()}`);
    }
  }, [selectedRole, searchParams, router]);

  // Sinkronisasi selectedData dengan URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    
    if (category) {
      const newData = {
        mainCategory: category,
        subCategory: subcategory || null
      };
      
      // Hanya update jika data benar-benar berubah
      setSelectedData(prevData => {
        if (!prevData || 
            prevData.mainCategory !== newData.mainCategory || 
            prevData.subCategory !== newData.subCategory) {
          console.log('Updating selectedData:', newData);
          return newData;
        }
        return prevData;
      });
    }
  }, [searchParams]);

  const handleCategorySelect = (data) => {
    setSelectedData(data);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      router.push('/login');
    }
  };

  return (
    <div
      className="flex flex-col h-[110vh] max-w-screen pt-10 gap-1 w-[100vw] bg-[url('/bglogin.svg')] bg-no-repeat bg-cover overflow-hidden"
    >
      {/* HEADER */}
      <div className="relative z-50 flex items-center justify-between pl-20 pt-0 w-[95%]">

      {/* Toggle Role */}
          <div className="font-sofia font-semibold flex w-82 h-14 px-2 py-2 justify-center bg-[#8B5E3C] rounded-[44.15px]  gap-[8px] ">
            <button
              onClick={() => handleRoleChange('Atlet')}
              className={`flex-1 py-2 w-full rounded-[37.74px] flex justify-center items-center
                ${selectedRole === 'Atlet' ? 'bg-[#F8E7C1]' : 'bg-[#BFA78A]'}`}
            >
              <span className="text-neutral-800 text-sm font-extrabold">Atlet</span>
            </button>
            <button
              onClick={() => handleRoleChange('Coach')}
              className={`flex-1 py-2 w-full rounded-[37.74px] flex justify-center items-center
                ${selectedRole === 'Coach' ? 'bg-[#F8E7C1]' : 'bg-[#BFA78A]'}`}
            >
              <span className="text-neutral-800 text-sm font-extrabold">Coach</span>
            </button>
          </div>

        <div className="flex justify-start items-center gap-10 ">
          {/* Judul Registrasi */}
          <h1 className="text-3xl font-normal font-snowstorm text-neutral-900">
            Registrasi {selectedRole}
          </h1>
          
          <div className="h-8 border-l border-neutral-900"></div>
          
          {/* Logout Button */}
            <div
              className="flex flex-row items-center gap-1 cursor-pointer"
              onClick={handleLogout} // bikin fungsi handleLogout sesuai kebutuhan
            >
                <IoLogOut className="w-7 h-7 " />
              <div className="text-center  text-xl  font-snowstorm font-normal">
                Keluar
              </div>
            </div>
        </div>
      
        {/* Info Cabang */}
        {selectedData && (
          <div className="flex items-center gap-2 font-normal font-snowstorm">
            <span className="text-3xl">{selectedData.mainCategory}</span>
            <span>•</span> 
            <span className="text-xl">{selectedData.subCategory}</span>
          </div>
        )}



      </div>

      {/* SIDEBAR + FORM */}

      <div className="flex flex-row pr-15 pl-5 gap-45 h-[600px] w-full items-center justify-center">
        
        <div className="w-64 px-2 -mt-40 h-full">
      
            <Sidebar onCategorySelect={handleCategorySelect} />
   
        </div>

        <div className="flex-1 px-3 h-full pt-3">
        
                <AthleteRegistration 
                    selectedSport={selectedData} 
                    kmhmName={kmhmName} 
                    role={selectedRole.toLowerCase()} 
                />
         
        </div>
      </div>



    </div>
  );
}