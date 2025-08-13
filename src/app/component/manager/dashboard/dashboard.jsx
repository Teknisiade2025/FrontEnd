'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { UserCheck, Calendar, Trophy, Award, ChevronRight } from 'lucide-react';

export default function Dashboard({ kmhmName }) {
  const router = useRouter();
  
  const goToReports = () => {
    router.push(`/DASHBOARD/managerRegistrasi?kmhm=${encodeURIComponent(kmhmName)}`);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-7 flex flex-col items-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6" style={{fontFamily: 'serif'}}>
            Selamat Datang, Manager!
          </h1>
          <p className="text-xl text-gray-700 font-semibold max-w-2xl leading-8">
            Selamat datang di menu utama. Dari sini, Anda bisa memulai untuk mendaftarkan
            atlet atau coach serta melihat status verifikasi.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-5">
          {/* Daftar Atlet/Coach */}
          <div 
            onClick={goToReports} 
            className="w-full bg-amber-800 hover:bg-amber-700 transition-colors duration-300 rounded-full px-14 py-6 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-amber-800" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-amber-100 mb-1">
                  Daftarkan Atlet/Coach
                </h3>
                <p className="text-amber-200 text-base">
                  Daftarkan atlet atau coach untuk event yang akan datang.
                </p>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 text-amber-200 group-hover:text-amber-100 transition-colors duration-300" />
          </div>

          
        </div>
      </div>
    </div>
  );
}