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
    <div className="flex flex-col h-[100vh] gap-1 pl-9.5 pr-13 w-screen bg-[url('/admin/bg-medal.svg')] bg-center bg-contain overflow-hidden">

    <div className="scale-80 pt-18">
     {/* HEADER */}
      <div className="flex items-center justify-end pl-22 mx-15 w-[100%] h-[50px]">
        <div className="flex items-center gap-2 mr-10 px-20 text-2xl font-normal font-snowstorm relative -top-10">
        {/* Info Cabang */}
        {selectedData && (
          <div className="flex items-center gap-2">
            <span className="text-[2vw] font-snowstorm font-normal text-[#3C3022]">{selectedData.mainCategory}</span>
            <span>•</span> 
            <span className="text-[1.3vw] font-snowstorm font-normal text-[#3C3022]">{selectedData.subCategory}</span>
          </div>
        )}
      </div>
      </div>

      <div className="flex flex-row h-[500px] w-full items-center">
      {/* Sidebar */}
      <div className="pt-5">
        <NavigasiCabang onCategorySelect={handleCategorySelect} />
      </div>

      {/* Konten utama */}
      <div className="flex-1  mt-5">
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
              className="w-full h-full max-w-7xl mx-auto rounded-[32px] shadow-lg"
              style={{
                width: "900px",
                height: "605px",
                backgroundColor: "#806037",
                border: "3px solid #FFFFFF",
              }}>
                    <div className="flex-1 h-full flex items-center justify-center">
                      <div className="text-lg font-semibold text-white text-center">
                         Silakan pilih cabang dan kategori dari menu sebelah
                      </div>
                    </div>
                  </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ScoreboardPage;