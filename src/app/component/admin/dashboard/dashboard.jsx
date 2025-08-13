'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { UserCheck, Calendar, Trophy, Award, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-35 px-4">
      <div className="w-full max-w-[650px]">
        {/* Header */}
        <div className="text-center mb-4 flex flex-col items-center">
          <h1 className="font-snowstorm text-6xl font-normal text-[#1D2225] text-center mb-2">
            Selamat Datang, Admin!
          </h1>
          <p className="font-sofia text-xl text-[#1D2225] font-bold text-center max-w-[739px] leading-8">
            Selamat datang di menu utama. Dari sini, Anda bisa memulai untuk memverifikasi atlet, 
            mengatur jadwal pertandingan, mengatur timeline event, atau mengupdate skor.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-2">
          {/* Verifikasi Registrasi Atlet */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/adminVerifikasi')}
            className="w-full bg-amber-100 hover:bg-[#876146] hover:text-amber-100  transition-colors duration-300 rounded-full px-10 py-2 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10 ">
              <UserCheck className="w-10 h-10 text-[#355665] group-hover:text-amber-100" />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[1.5vw] font-bold  text-[#355665] font-sofia group-hover:text-amber-100 mb-0">
                  Verifikasi Registrasi Atlet
                </h3>
                <p className="text-[#355665] group-hover:text-amber-100 font-sofia text-base font-semibold">
                  Verifikasi atlet berdasarkan cabang lomba.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-11 text-[#355665] group-hover:text-amber-100  transition-colors duration-300" strokeWidth={6} />
          </div>

          {/* Schedule Pertandingan */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/adminJadwal')}
            className="w-full bg-amber-100 hover:bg-[#876146] transition-colors duration-300 rounded-full px-10 py-2 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10">
              <Calendar className="w-10 h-10 text-[#355665] group-hover:text-amber-100" />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-[1.5vw] font-bold font-sofia text-[#355665] group-hover:text-amber-100 mb-0">
                  Schedule Pertandingan
                </h3>
                <p className="text-[#355665] group-hover:text-amber-100 font-sofia text-base font-semibold">
                  Tambah, edit, atau atur pertandingan.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-11 text-[#355665] group-hover:text-amber-100 transition-colors duration-300" strokeWidth={6} />
          </div>

          {/* Update Skor */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/adminScoreboard')}
            className="w-full bg-amber-100 hover:bg-[#876146] transition-colors duration-300 rounded-full px-10 py-2 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10">
              <Trophy className="w-10 h-10 text-[#065D79] group-hover:text-amber-100" />
              <div className="flex flex-col">
                <h3 className="text-[1.5vw] font-bold font-sofia text-[#355665] group-hover:text-amber-100 mb-0">
                  Update Skor
                </h3>
                <p className="text-[#355665] group-hover:text-amber-100 font-sofia text-base font-semibold">
                  Tambah dan edit perolehan nilai akhir.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-11 text-[#355665] group-hover:text-amber-100 transition-colors duration-300" strokeWidth={6} />
          </div>

          {/* Update Klasemen */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/adminMedal')}
            className="w-full bg-amber-100 hover:bg-[#876146] transition-colors duration-300 rounded-full px-10 py-2 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10">
              <Award className="w-10 h-10 text-[#355665] group-hover:text-amber-100" />
              <div className="flex flex-col gap-1">
                <h3 className="text-[1.5vw] font-bold font-sofia text-[#355665] group-hover:text-amber-100 mb-0">
                  Update Klasemen
                </h3>
                <p className="text-[#355665] group-hover:text-amber-100 font-sofia text-base font-semibold">
                  Tambah dan edit perolehan medali.
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