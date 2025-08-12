"use client";

import React, { useState } from 'react';
import CabangNavigasi from '@/app/component/admin/compNavigasiCabang/cabangNav';
import JadwalPertandingan from '@/app/component/admin/jadwalPertandingan/page';
import VokalForm from '@/app/component/admin/jadwalPertandingan/vokalForm';
import DaftarJadwalPertandingan from '@/app/component/admin/jadwalPertandingan/daftarjadwal';

const AdminSchedulePage = () => {
  const [selectedData, setSelectedData] = useState(null);

  // utils/cabangList.js

const CABANG_SENI = [
 "Band",
    "Vokal Grup",
    "Solo Vokal",
    "Modern Dance",
    "Tari Tradisional",
    "Fotografi",
    "Seni Lukis",
    "Cipta Puisi",
    "Monolog",
    "Desain Poster"
];




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
      <div>
        {selectedData ? (
          CABANG_SENI.includes(selectedData.cabang)
            ? <VokalForm selectedSport={selectedData} />
            : <DaftarJadwalPertandingan selectedSport={selectedData} />
        ) : (
          <p className="text-gray-500">Silakan pilih cabang dan kategori</p>
        )}
      </div>
    </div>
  );
};

export default AdminSchedulePage;
