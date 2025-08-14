'use client';
import React, { useState, useEffect }  from 'react';
import NavigasiCabang from "@/app/component/admin/compNavigasiCabang/scheduleNav.jsx"
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
    <div className="flex flex-col h-[100vh] items-center w-screen  bg-[url('/admin/bg-medal.svg')] overflow-x-hidden">

      {/* HEADER */}
      <div className="flex items-center justify-end pl-22 mx-15  w-[100%]">
        <div className="flex items-center gap-2 px-20 text-2xl font-normal font-snowstorm">
        {/* Info Cabang */}
        {selectedData && (
          <div>
            <span>{selectedData.mainCategory}</span>
            <span>•</span> 
            <span>{selectedData.subCategory}</span>
          </div>
        )}
      </div>
      </div>

  {/* Sidebar Navigasi */}
  <div className="flex flex-row h-[500px] w-full items-center scale-90">
  <div className=" pl-10 h-full">
    <NavigasiCabang onCategorySelect={handleCategorySelect} />
  </div>
  
  {/* Konten Utama - Scoreboard */}
  <div className="flex  pr-20  h-full mt-20" fallback={<div>Loading...</div>}>
    
    {selectedData ? (
      CABANG_SENI.includes(selectedData.mainCategory) ? (
        <div className=" h-full w-full">
        <ScoreboardSeni
          cabang={selectedData.mainCategory} 
          kategori={selectedData.subCategory} 
        />
        </div>
      ) : (
        <div className="h-full w-full">
        <ScoreboardOlahraga 
          cabang={selectedData.mainCategory} 
          kategori={selectedData.subCategory} 
        />
        </div>
      )
    ) : (
      <div
        className="w-full h-full mt-13 rounded-[32px] shadow-lg"
        style={{
          width: "900px",
          height: "605px",
          backgroundColor: "#806037",
          border: "3px solid #FFFFFF",
        }}
      >
        <div className="flex-1  h-full flex items-center justify-center">
          <div className="text-lg font-semibold text-white text-center">
            Silakan pilih cabang dan kategori dari menu sebelah
          </div>
        </div>      
      </div>
    )}
  </div>
</div>
</div>

  );
};

export default ScoreboardPage;