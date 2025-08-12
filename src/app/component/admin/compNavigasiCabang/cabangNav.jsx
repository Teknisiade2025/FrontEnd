"use client";

import React, { useState, useRef } from "react";
import { HiChevronRight } from "react-icons/hi";
import { useRouter, useSearchParams } from "next/navigation";

const CabangNavigasi = ({ onCategorySelect, onClose }) => {
  const [activeCabang, setActiveCabang] = useState(null);
  const [hoveredCabang, setHoveredCabang] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const itemRefs = useRef({});
  const router = useRouter();
  const searchParams = useSearchParams();

  const cabangOlahraga = [
    "Sepak Bola",
    "Voli",
    "Basket",
    "Badminton",
    "Futsal",
    "Tenis Meja",
    "Atletik",
    "Catur",
    "PUBG",
    "Mobile Legend",
    "Valorant",
    "FIFA",
  ];

  const cabangSeni = [
    "Band",
    "Vokal Grup",
    "Solo Vokal",
    "Modern Dance",
    "Tari Tradisional",
    "Fotografi",
    "Seni Lukis",
    "Cipta Puisi",
    "Monolog",
    "Desain Poster",
  ];

  const subCategories = {
    "Sepak Bola": ["Putra" ,"putri"], 
    "Voli": ["Putra", "Putri"],
    "Basket": ["Putra", "Putri"],
    "Badminton": [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran",
    ],
    "Futsal": ["Putra", "Putri"],
    "Tenis Meja": [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran",
    ],
    "Atletik": [
      "100m Putra",
      "100m Putri",
      "400m Putra",
      "400m Putri",
      "1500m Putra",
      "1500m Putri",
      "4x100m Putra",
      "4x100m Putri",
    ],
    "Valorant": ["Putra"],
    "PUBG": ["Putra"],
    "FIFA": ["Putra"],
    "Mobile Legend": ["Putra", "putri"],
    "Catur": ["Campuran"],
    "Solo Vokal": ["Putra", "Putri"],
    "Band": [" "],
    "Modern Dance": [" "],
  "Tari Tradisional": [" "],
  "Fotografi": [" "],
  "Seni Lukis": [" "],
  "Cipta Puisi": [" "],
  "Monolog": [" "],
  "Desain Poster": [" "],
  "Vokal Grup": [" "],

    
  };

  const scaleFactor = 0.77; // sesuai scale-77
  
  const handleMouseEnter = (cabang, index, section) => {
    // Kalau tidak ada atau cuma 1 subkategori → tidak tampilkan popup
    if (!subCategories[cabang] || subCategories[cabang].length <= 1) {
      setHoveredCabang(null);
      return;
    }
    setHoveredCabang(cabang);
    const refKey = `${section}-${index}`;
    if (itemRefs.current[refKey]) {
      const rect = itemRefs.current[refKey].getBoundingClientRect();
      const popupHeight = 160;
      setPopupPosition({
        top: ((rect.top + window.scrollY) + (rect.height / 2) - (popupHeight / 2)) / scaleFactor - 280,
        left: rect.right - 20
      });
    }
  };

  const handleSelectKategori = (mainCategory, subCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", mainCategory);
    if (subCategory) params.set("subcategory", subCategory);
    router.push(`?${params.toString()}`);

    setActiveCabang(mainCategory);
    setHoveredCabang(null);

    onCategorySelect?.({ mainCategory, subCategory });
    onClose?.();
  };

  const handleCategoryClick = (cabang) => {
    if (!subCategories[cabang]) {
      handleSelectKategori(cabang, null);
    } else if (subCategories[cabang].length === 1) {
      handleSelectKategori(cabang, subCategories[cabang][0]);
    }
  };

  return (
    <div className = "w-[30vw] scale-77">
      <div className="w-full h-[790px] px-12 pt-9 pb-12 bg-[#806037] rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  border-[5px] outline-offset-[-3px] border-white">
        <div className="w-full h-[738px] flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          
          {/* Cabang Olahraga */}
          <div className="w-full">
            <div className="px-3 pb-4">
              <div className="text-[#FBEBD2] text-[26px] font-normal font-['Snowstorm']">
                Cabang Olahraga
              </div>
            </div>
            <div className="w-full p-2.8 flex flex-col gap-3.5 overflow-y-auto max-h-[300px] custom-scrollbar">
              {cabangOlahraga.map((cabang, index) => (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[`olahraga-${index}`] = el)}
                  className={`relative w-full h-10 px-6 rounded-2xl inline-flex justify-between items-center cursor-pointer transition-all duration-200 ${
                    activeCabang === cabang
                      ? "bg-[#065D79]"
                      : hoveredCabang === cabang
                      ? "bg-[#065D79]"
                      : "bg-[#FBEBD2] text-gray-900"
                  }`}
                  onClick={() => handleCategoryClick(cabang)}
                  onMouseEnter={() =>
                    handleMouseEnter(cabang, index, "olahraga")
                  }
                  onMouseLeave={() => setHoveredCabang(null)}
                >
                  <div
                    className={`text-[20px] font-bold font-sofia ${
                      activeCabang === cabang || hoveredCabang === cabang
                        ? "text-gray-300"
                        : "text-gray-900"
                    }`}
                  >
                    {cabang}
                  </div>
                  <HiChevronRight
                    className={`w-5 h-5 ${
                      activeCabang === cabang || hoveredCabang === cabang
                        ? "text-[#FBEBD2]"
                        : "text-[#355665]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Seni */}
          <div className="w-full mt-6">
            <div className="px-3 pb-4">
              <div className="text-[#FBEBD2] text-[26px] font-normal font-['Snowstorm']">
                Cabang SENI
              </div>
            </div>
            <div className="w-full p-2.8 flex flex-col gap-3.5 overflow-y-auto max-h-[300px] custom-scrollbar">
              {cabangSeni.map((cabang, index) => (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[`seni-${index}`] = el)}
                  className={`relative w-full h-10 px-6 rounded-2xl inline-flex justify-between items-center cursor-pointer transition-all duration-200 ${
                    activeCabang === cabang
                      ? "bg-[#065D79]"
                      : hoveredCabang === cabang
                      ? "bg-[#065D79]"
                      : "bg-[#FBEBD2] text-gray-900"
                  }`}
                  onClick={() => handleCategoryClick(cabang)}
                  onMouseEnter={() => handleMouseEnter(cabang, index, "seni")}
                  onMouseLeave={() => setHoveredCabang(null)}
                >
                  <div
                    className={`text-[20px] font-bold font-sofia ${
                      activeCabang === cabang || hoveredCabang === cabang
                        ? "text-gray-300"
                        : "text-gray-900"
                    }`}
                  >
                    {cabang}
                  </div>
                  <HiChevronRight
                    className={`w-5 h-5 ${
                      activeCabang === cabang || hoveredCabang === cabang
                        ? "text-[#FBEBD2]"
                        : "text-[#355665]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Popup Subkategori */}
      {hoveredCabang && subCategories[hoveredCabang] && subCategories[hoveredCabang].length > 1 && (
        <div
          className="absolute z-100"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left - 20}px`,
          }}
          onMouseEnter={() => setHoveredCabang(hoveredCabang)}
          onMouseLeave={() => setHoveredCabang(null)}
        >
          <div className="w-56 px-6 py-5 bg-[#065D79] rounded-2xl shadow-md outline-[3px] outline-offset-[-3px] outline-[#FBEBD2] flex flex-col gap-3.5">
            <div className="text-[#FBEBD2] text-[22px] font-normal font-['Snowstorm'] text-center">
              Kategori
            </div>
            {subCategories[hoveredCabang].map((sub) => (
              <div
                key={sub}
                className="text-[#FBEBD2] text-[20px] font-bold font-sofia cursor-pointer hover:opacity-80 py-2 hover:bg-[#0A7CA0] rounded-md text-center"
                onClick={() => handleSelectKategori(hoveredCabang, sub)}
              >
                {sub}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #262626 #FBEBD2;
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
      `}</style>
    </div>
  );
};

export default CabangNavigasi;
