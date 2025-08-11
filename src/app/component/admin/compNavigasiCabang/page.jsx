"use client";

import React, { useState, useRef } from 'react';
import { HiChevronRight } from 'react-icons/hi';

const CabangNavigasi = ({ onSelect }) => {
  const [activeCabang, setActiveCabang] = useState('Sepak Bola');
  const [hoveredCabang, setHoveredCabang] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const itemRefs = useRef({});
  
  const cabangOlahraga = [
    'Sepak Bola', 'Voli', 'Basket', 'Badminton', 'Futsal', 
    'Tenis Meja', 'Atletik', 'Catur', 'PUBG', 'Mobile Legends', 
    'Valorant', 'FIFA'
  ];
  
  const cabangSeni = [
    'Band', 'Vokal Grup', 'Solo Vokal', 'Modern Dance', 
    'Tari Tradisional', 'Fotografi', 'Seni Lukis', 
    'Cipta Puisi', 'Monolog', 'Poster'
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
    <div className = "w-[40vw] scale-70">
      <div className="w-full h-[780px] px-8 pt-9 pb-8 bg-[#806037] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  outline-[3px] outline-offset-[-3px] outline-white">
        <div className="w-full h-[731px] flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          
          {/* Cabang Olahraga */}
          <div className="w-full">
            {/* Perubahan font untuk judul */}
            <div className="px-3 pb-4">
              <div className="justify-start text-neutral-100 text-2xl font-normal font-['Snowstorm']">
                Cabang Olahraga
              </div>
            </div>
            <div className="w-full p-2.8 flex flex-col justify-start items-start gap-3.5 overflow-y-auto max-h-[300px] custom-scrollbar">
              {cabangOlahraga.map((cabang, index) => (
                <div 
                  key={index}
                  ref={el => itemRefs.current[`olahraga-${index}`] = el}
                  className={`relative w-full h-10 px-6 rounded-2xl inline-flex justify-start items-center cursor-pointer transition-all duration-200 ${
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
                  <div className={`w-6/7 justify-start py-2.5 text-md font-bold font-['Sofia_Sans_Condensed'] leading-tight ${
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
          
          {/* Cabang Seni */}
          <div className="w-full mt-6"> {/* Tambah margin top */}
            {/* Perubahan font untuk judul */}
            <div className="px-3 pb-4">
              <div className="justify-start text-neutral-100 text-xl font-normal font-['Snowstorm']">
                Cabang SENI
              </div>
            </div>
            <div className="w-full p-2.8 flex flex-col justify-start items-start gap-3.5 overflow-y-auto max-h-[300px] custom-scrollbar">
              {cabangSeni.map((cabang, index) => (
                <div 
                  key={index}
                  ref={el => itemRefs.current[`seni-${index}`] = el}
                  className={`relative w-full h-10 px-6 rounded-2xl inline-flex justify-start items-center cursor-pointer transition-all duration-200 ${
                    activeCabang === cabang 
                      ? 'bg-[#065D79]' 
                      : hoveredCabang === cabang
                        ? 'bg-[#065D79]'
                        : 'bg-[#FBEBD2] text-gray-900'
                  }`}
                  onMouseEnter={() => handleMouseEnter(cabang, index, 'seni')}
                  onMouseLeave={() => setHoveredCabang(null)}
                >
                  {/* Perubahan font untuk jenis cabang */}
                  <div className={`w-5/6 justify-start py-2.5 text-md font-bold font-['Sofia_Sans_Condensed'] leading-tight ${
                    activeCabang === cabang || hoveredCabang === cabang
                      ? 'text-gray-300'
                      :  'text-gray-900' 
                  }`}>
                    {cabang}
                  </div>
                  <div className="w-1/6 h-6 flex justify-center items-center">
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

      {/* Popup Kategori */}
      {hoveredCabang && (
        <div 
          className="absolute z-50 transition-all duration-300"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left - 20 }px`
          }}
          onMouseEnter={() => setHoveredCabang(hoveredCabang)}
          onMouseLeave={() => setHoveredCabang(null)}
        >
          <div className="w-56 px-6 py-5 bg-[#065D79] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-[#FBEBD2] inline-flex flex-col justify-start items-center gap-3.5 overflow-hidden">
            <div className="self-stretch text-center justify-start text-[#FBEBD2] text-xl font-normal font-['Snowstorm']">
              Kategori
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-2.5">
              <div 
                className="self-stretch text-center justify-start text-[#FBEBD2] text-lg font-bold font-['Sofia_Sans_Condensed'] cursor-pointer hover:opacity-80 py-2 hover:bg-[#0A7CA0] rounded-md"
                onClick={() => handleSelectKategori(hoveredCabang, 'Putra')}
              >
                Putra
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-center gap-2.5">
              <div 
                className="self-stretch text-center justify-start text-[#FBEBD2] text-lg font-bold font-['Sofia_Sans_Condensed'] cursor-pointer hover:opacity-80 py-2 hover:bg-[#0A7CA0] rounded-md"
                onClick={() => handleSelectKategori(hoveredCabang, 'Putri')}
              >
                Putri
              </div>
            </div>
          </div>
        </div>
      )}

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