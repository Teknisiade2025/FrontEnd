"use client";

import React, { useState, useRef } from 'react';
import { HiChevronRight } from 'react-icons/hi';

const CabangNavigasi = ({ onSelect }) => {
  const [activeCabang, setActiveCabang] = useState('Sepak Bola');
  const [hoveredCabang, setHoveredCabang] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const itemRefs = useRef({});
  
  const cabangOlahraga = [
    "HMTPWK",
  "KMTA",
  "KMTG",
  "KMTSL",
  "HMTG",
  "HMTI",
  "KMTETI",
  "KMTNTF",
  "KMTM",
  "KMTK"
  ];
  
  
  const scaleFactor = 0.65; 

  // Handle hover untuk menampilkan popup
  const handleMouseEnter = (cabang, index, section) => {
    setHoveredCabang(cabang);
    const refKey = `${section}-${index}`;
    if (itemRefs.current[refKey]) {
      const rect = itemRefs.current[refKey].getBoundingClientRect();
      const popupHeight = 160;
      setPopupPosition({
        top: ((rect.top + window.scrollY) + (rect.height / 2) - (popupHeight / 2)) / scaleFactor - 230,
        left: rect.right - 10 
      });
    }
  };

  // Handle pemilihan kategori
  const handleSelectKategori = (cabang, kategori) => {
    setActiveCabang(cabang);
    setHoveredCabang(null); // Tutup popup setelah memilih
    if (onSelect) {
      onSelect(cabang, kategori);
    }
  };

  return (
    <div className = "w-[30vw] scale-77">
      <div className="w-full h-[780px] px-12 pt-9 pb-12 bg-[#806037] rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  border-[5px] outline-offset-[-3px] border-white">
        <div className="w-full h-[731px] justify-start items-start gap-2.5 overflow-hidden">
          
          {/* Cabang Olahraga */}
          <div className="w-full">
            {/* Perubahan font untuk judul */}
            <div className="px-3 pb-4">
              <div className="justify-start text-[#FBEBD2] text-[26px] font-normal font-['Snowstorm']">
                KMHM
              </div>
            </div>
            <div className="w-full p-2.8 flex flex-col justify-start items-start gap-3.5 overflow-y-auto max-h-[800px] custom-scrollbar">
              {cabangOlahraga.map((cabang, index) => (
                <div 
                  key={index}
                  ref={el => itemRefs.current[`olahraga-${index}`] = el}
                  className={`relative w-full h-13 px-6 rounded-2xl inline-flex justify-start items-center cursor-pointer transition-all duration-200 ${
                    activeCabang === cabang 
                      ? 'bg-[#065D79]' 
                      : hoveredCabang === cabang
                        ? 'bg-[#065D79]'
                        :  'bg-[#FBEBD2] text-gray-900'
                  }`}
                  onMouseEnter={() => handleMouseEnter(cabang, index, 'olahraga')}
                  onMouseLeave={() => setHoveredCabang(null)}
                >
                  {/* Perubahan font untuk jenis cabang */}
                  <div className={`w-6/7 justify-start py-2.5 text-[20px] font-bold font-sofia leading-tight ${
                    activeCabang === cabang || hoveredCabang === cabang
                      ? 'text-gray-300'
                      :  'text-gray-900' 
                  }`}>
                    {cabang}
                  </div>
                  <div className="w-1/7 h-6 flex justify-center items-center">
                    <HiChevronRight 
                      className={`w-5 h-5 ${
                        activeCabang === cabang || hoveredCabang === cabang
                          ? 'text-[#FBEBD2]'
                          :  'text-[#355665]' 
                      }`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #262626 #FBEBD2;
          padding-right: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FBEBD2;
          border-radius: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #262626;
          border-radius: 8px;
          border: 2px solid #FBEBD2;
        }

        .custom-scrollbar::-webkit-scrollbar-button {
        display: none;
        height: 0;
        width: 0;
        }
    
      `}</style>
    </div>
  );
};

export default CabangNavigasi;