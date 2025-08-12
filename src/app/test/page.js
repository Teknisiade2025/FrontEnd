"use client";
import React from 'react';
import NavigasiCabang from '@/app/component/admin/compNavigasiCabang/cabangNav';
import JadwalPertandingan from '@/app/component/admin/jadwalPertandingan/page';
import { Suspense } from "react";

const page = () => {
 
  return (  
    <div className='flex flex-row'>
      <Suspense className="flex min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 p-20 font-sans w-[40vw] relative">
        <NavigasiCabang/>
      </Suspense>
      <div className='flex min-h-screen bg-gradient-to-br from-blue-200 to-indigo-200 font-sans w-[60vw] py-20 relative'>
        <JadwalPertandingan/>
      </div>

    </div>
    
    
  );
};

export default page;
