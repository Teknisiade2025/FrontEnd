'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { UserCheck, ChevronRight } from 'lucide-react';
import { HiPencilAlt } from "react-icons/hi";

export default function Dashboard({ kmhmName }) {
  const router = useRouter();
  const goToReports = () => {
    router.push(`/managerRegistrasi?kmhm=${encodeURIComponent(kmhmName)}`);
  };




  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-35 px-4">
      <div className="w-full max-w-[650px]">
        {/* Header */}
        <div className="text-center mb-4 flex flex-col items-center">
          <h1 className="font-snowstorm text-6xl font-normal text-[#1D2225] text-center mb-2">
            Selamat Datang, Manager!
          </h1>
          <p className="font-sofia text-xl text-[#1D2225] font-bold text-center max-w-[739px] leading-8">
            Selamat datang di menu utama. Dari sini, Anda bisa memulai untuk mendaftarkan atlet atau coach serta melihat status verifikasi.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-3">
          {/* Verifikasi Registrasi Atlet */}
          <div 
            onClick={goToReports} 
            className="w-full bg-amber-100 hover:bg-[#98764B] hover:text-amber-100 transition-colors duration-300 rounded-full px-10 py-4 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10">
              <HiPencilAlt className="w-10 h-10 text-[#355665] group-hover:text-amber-100" />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[1.5vw] font-bold font-sofia group-hover:text-amber-100 text-[#355665] mb-0">
                  Daftarkan Atlet/Coach
                </h3>
                <p className="text-[#355665] font-sofia group-hover:text-amber-100 text-base font-semibold">
                  Mendaftarkan atlet atau coach untuk cabang lomba.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-11 text-[#355665] group-hover:text-amber-100 transition-colors duration-300" strokeWidth={6} />
          </div>

        </div>
      </div>
    </div>
  );
}