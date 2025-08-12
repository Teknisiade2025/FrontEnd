'use client';
import React, { useState, useEffect }  from 'react';
import NavigasiCabang from "@/app/component/admin/compNavigasiCabang/cabangNav.jsx"


import { Suspense } from 'react';
import ScoreboardOlahraga from "@/app/component/admin/scoreboard/scoreboard";
import ScoreboardSeni from "@/app/component/admin/scoreboard/scoreboardSeni";

const CABANG_SENI = [
  "Band", "Vokal Grup", "Solo Vokal", "Modern Dance", "Tari Tradisional",
  "Fotografi", "Seni Lukis", "Cipta Puisi", "Monolog", "Desain Poster"
];

const ScoreboardPage = () => {
  const [selectedData, setSelectedData] = useState(null);
  
    const handleCategorySelect = (data) => {
      setSelectedData(data);
    }; 
  return (
    <div className="flex flex-row min-h-screen pt-10 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
      {/* Sidebar Navigasi */}
      <div className="pt-5 pl-5">
        <NavigasiCabang onCategorySelect={handleCategorySelect} />
      </div>
      
      {/* Konten Utama - Scoreboard */}
      <div className="flex-1 pr-20" fallback={<div>Loading...</div>}>
      {selectedData ? (
        CABANG_SENI.includes(selectedData.mainCategory) ? (
                    <ScoreboardSeni
                      cabang={selectedData.mainCategory} 
                      kategori={selectedData.subCategory} 
                    />
                  ) : (
                    <ScoreboardOlahraga 
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

export default ScoreboardPage;