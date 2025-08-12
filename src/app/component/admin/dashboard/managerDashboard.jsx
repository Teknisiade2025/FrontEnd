'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { UserCheck,Calendar, Trophy, Award, ChevronRight } from 'lucide-react';
import { HiPencilAlt } from 'react-icons/hi';

export default function Dashboard() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-7 flex flex-col items-center">
          <h1 className="text-6xl font-snowstorm font-bold text-gray-800 mb-6" style={{fontFamily: 'serif'}}>
            Selamat Datang, Manager!
          </h1>
          <p className="text-xl text-gray-700 font-sofia font-semibold max-w-2xl leading-8">
            Selamat datang di menu utama. Dari sini, Anda bisa memulai untuk mendaftarkan atlet atau coach serta melihat status verifikasi.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-5">
          {/* Verifikasi Registrasi Atlet */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/managerRegistrasi')}
            className="w-full bg-[#876146] hover:bg-amber-900 transition-colors duration-300 rounded-full px-14 py-6 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <HiPencilAlt className="w-8 h-8 text-[#876146] hover:text-bg-amber-900" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-amber-100 mb-1">
                  Verifikasi Registrasi Atlet
                </h3>
                <p className="text-amber-200 text-base">
                  Verifikasi atlet berdasarkan cabang lomba.
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