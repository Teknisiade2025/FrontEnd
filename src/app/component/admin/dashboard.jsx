'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Check, Calendar, Trophy, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-amber-900 mb-4" style={{fontFamily: 'serif'}}>
            Selamat Datang, Admin!
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto leading-relaxed font-medium">
            Selamat datang di menu utama. Dari sini, Anda bisa memulai untuk memverifikasi atlet, 
            mengatur jadwal pertandingan, mengatur timeline event, atau mengupdate skor.
          </p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-6">
          {/* Verifikasi Registrasi Atlet */}
          <div className="bg-amber-800 hover:bg-amber-700 transition-colors duration-200 rounded-full px-8 py-6 flex items-center justify-between cursor-pointer shadow-lg">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-amber-800" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Verifikasi Registrasi Atlet</h3>
                <p className="text-amber-100 text-lg">Verifikasi atlet berdasarkan cabang lomba.</p>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 text-amber-100" />
          </div>

          {/* Schedule Pertandingan */}
          <div className="bg-white hover:bg-gray-50 transition-colors duration-200 rounded-full px-8 py-6 flex items-center justify-between cursor-pointer shadow-lg">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-700 mb-1">Schedule Pertandingan</h3>
                <p className="text-gray-600 text-lg font-semibold">Tambah, edit, atau atur pertandingan.</p>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 text-blue-500" />
          </div>

          {/* Update Skor */}
          <div className="bg-white hover:bg-gray-50 transition-colors duration-200 rounded-full px-8 py-6 flex items-center justify-between cursor-pointer shadow-lg">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-700 mb-1">Update Skor</h3>
                <p className="text-gray-600 text-lg font-semibold">Tambah dan edit perolehan nilai akhir.</p>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  );
}