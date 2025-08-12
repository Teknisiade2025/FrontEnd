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
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-orange-200 to-amber-300 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-7 flex flex-col items-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6" style={{fontFamily: 'serif'}}>
            Selamat Datang, Admin!
          </h1>
          <p className="text-xl text-gray-700 font-semibold max-w-2xl leading-8">
            Selamat datang di menu utama. Dari sini, Anda bisa memulai untuk memverifikasi atlet, 
            mengatur jadwal pertandingan, mengatur timeline event, atau mengupdate skor.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-5">
          {/* Verifikasi Registrasi Atlet */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/adminVerifikasi')}
            className="w-full bg-amber-800 hover:bg-amber-700 transition-colors duration-300 rounded-full px-14 py-6 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-8 h-8 text-amber-800" />
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

          {/* Schedule Pertandingan */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/formJadwal')}
            className="w-full bg-amber-100 hover:bg-amber-50 transition-colors duration-300 rounded-full px-14 py-7 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10">
              <Calendar className="w-14 h-14 text-slate-700" />
              <div className="flex flex-col gap-0.5">
                <h3 className="text-2xl font-bold text-slate-700 mb-0">
                  Schedule Pertandingan
                </h3>
                <p className="text-slate-700 text-base font-semibold">
                  Tambah, edit, atau atur pertandingan.
                </p>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 text-teal-600 group-hover:text-teal-700 transition-colors duration-300" />
          </div>

          {/* Update Skor */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/adminScoreboard')}
            className="w-full bg-amber-100 hover:bg-amber-50 transition-colors duration-300 rounded-full px-14 py-8 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10">
              <Trophy className="w-15 h-15 text-slate-700" style={{width: '60px', height: '60px'}} />
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-slate-700 mb-0">
                  Update Skor
                </h3>
                <p className="text-slate-700 text-base font-semibold">
                  Tambah dan edit perolehan nilai akhir.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-11 text-slate-700 group-hover:text-slate-800 transition-colors duration-300" strokeWidth={6} />
          </div>

          {/* Update Klasemen */}
          <div 
            onClick={() => handleNavigation('/DASHBOARD/adminMedal')}
            className="w-full bg-amber-100 hover:bg-amber-50 transition-colors duration-300 rounded-full px-14 py-8 flex items-center justify-between cursor-pointer shadow-lg group"
          >
            <div className="flex items-center gap-10">
              <Award className="w-15 h-15 text-slate-700" style={{width: '60px', height: '60px'}} />
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold text-slate-700 mb-0">
                  Update Klasemen
                </h3>
                <p className="text-slate-700 text-base font-semibold">
                  Tambah dan edit perolehan medali.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-11 text-slate-700 group-hover:text-slate-800 transition-colors duration-300" strokeWidth={6} />
          </div>
        </div>
      </div>
    </div>
  );
}