"use client";

import React, { useState } from 'react';
import CabangNavigasi from '@/app/component/admin/compNavigasiCabang/cabangNav';
import JadwalOlahraga from '@/app/component/admin/jadwalPertandingan/daftarjadwal';
import JadwalSeni from '@/app/component/admin/jadwalPertandingan/vokalFormtable';

const CABANG_SENI = [
  "Band", "Vokal Grup", "Solo Vokal", "Modern Dance", "Tari Tradisional",
  "Fotografi", "Seni Lukis", "Cipta Puisi", "Monolog", "Desain Poster"
];

const AdminSchedulePage = () => {
  const [selectedData, setSelectedData] = useState(null);

  const handleCategorySelect = (data) => {
    setSelectedData(data);
  }; 

  return (
    <div className="flex flex-row min-h-screen pt-15 pl-19 gap-1 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
      {/* Sidebar */}
      <div className="pt-5">
        <CabangNavigasi onCategorySelect={handleCategorySelect} />
      </div>

      {/* Konten utama */}
      <div className="flex-1 p-4">
        {selectedData ? (
          CABANG_SENI.includes(selectedData.mainCategory) ? (
            <JadwalSeni 
              cabang={selectedData.mainCategory} 
              kategori={selectedData.subCategory} 
            />
          ) : (
            <JadwalOlahraga 
              cabang={selectedData.mainCategory} 
              kategori={selectedData.subCategory} 
            />
          )
        ) : (
          <div className="w-full h-full max-w-7xl mx-auto px-14 py-9 bg-amber-900 rounded-[32px] shadow-lg">
                  <div className="flex items-center justify-center h-64">
                    <div className="text-white text-lg font-semibold">
                      Silakan pilih cabang dan kategori dari menu sebelah
                    </div>
                  </div>
                </div>
        )}
      </div>
    </div>
  );
};

export default AdminSchedulePage;