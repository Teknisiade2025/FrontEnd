'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const CabangDiversifikasi = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mapping path gambar untuk setiap cabang
  const iconMap = {
    "Sepak Bola": "/dashboard-verifikasi/sepakbola.png",
    "Voli": "/dashboard-verifikasi/voli2.png",
    "Basket": "/dashboard-verifikasi/basket.png",
    "Bulu Tangkis": "/dashboard-verifikasi/badminton.png",
    "Futsal": "/dashboard-verifikasi/futsal.png",
    "Tenis Meja": "/dashboard-verifikasi/tenismeja.png",
    "Atletik": "/dashboard-verifikasi/atletik2.png",
    "Catur": "/dashboard-verifikasi/catur2.png",
    "FIFA": "/dashboard-verifikasi/fifa2.png",
    "PUBG": "/dashboard-verifikasi/pubg2.png",
    "Mobile Legends": "/dashboard-verifikasi/ml2.png",
    "Valorant": "/dashboard-verifikasi/valo.png",
    "Band": "/dashboard-verifikasi/band2.png",
    "Vokal Grup": "/dashboard-verifikasi/vokalgrup.png",
    "Vokal Solo": "/dashboard-verifikasi/vokalsolo.png",
    "Dance": "/dashboard-verifikasi/dance2.png",
    "Tari Tradisional": "/dashboard-verifikasi/tariTrad2.png",
    "Fotografi": "/dashboard-verifikasi/fotografi2.png",
    "Seni Lukis": "/dashboard-verifikasi/lukis.png",
    "Cipta Puisi": "/dashboard-verifikasi/puisi2.png",
    "Monolog": "/dashboard-verifikasi/monolog.png",
    "Poster": "/dashboard-verifikasi/poster.svg"
  };

  const cabangOlahraga1 = [
    { name: "Sepak Bola", kategori: ["Putra"] },
    { name: "Voli", kategori: ["Putra", "Putri"] },
    { name: "Basket", kategori: ["Putra", "Putri"] },
    { name: "Bulu Tangkis", kategori: [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran",
    ] },
    { name: "Futsal", kategori: ["Putra", "Putri"] },
    { name: "Tenis Meja", kategori: [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran",
    ] },
  ];

  const cabangOlahraga2 = [
    
    { name: "Atletik", kategori: [
      "100m Putra",
      "100m Putri", 
      "400m Putra",
      "400m Putri",
      "1500m Putra",
      "1500m Putri",
      "4x100m Putra",
      "4x100m Putri",
    ] },
    { name: "Catur", kategori: ["Campuran"] },
    { name: "FIFA", kategori: ["Putra"] },
    { name: "PUBG", kategori: ["Putra"] },
    { name: "Mobile Legends", kategori: ["Putra"] },
    { name: "Valorant", kategori: ["Putra"] }
  ];

  const cabangSeni1 = [
    { name: "Band", kategori: [] },
    { name: "Vokal Grup", kategori: [] },
    { name: "Vokal Solo", kategori: ["Putra", "Putri"] },
    { name: "Dance", kategori: [] },
    { name: "Tari Tradisional", kategori: [] },
   
  ];

  const cabangSeni2 =[
    { name: "Fotografi", kategori: [] },
    { name: "Seni Lukis", kategori: [] },
    { name: "Cipta Puisi", kategori: [] },
    { name: "Monolog", kategori: [] },
    { name: "Poster", kategori: [] }
  ]

  const [selectedCabang, setSelectedCabang] = useState(null);
  const [selectedKategori, setSelectedKategori] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
 

  const handleSelectKategori = (mainCategory, subCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', mainCategory);
    if (subCategory) params.set('subcategory', subCategory);
    router.push(`?${params.toString()}`);
  };


  const handleCabangClick = (cabang, kategoriLabel) => {
    if (!cabang.kategori || cabang.kategori.length <= 1) {
      const kategori = cabang.kategori?.[0] || null;
      handleSelectKategori(cabang.name, kategori, kategoriLabel);
    } else {
      setSelectedCabang(cabang);
      setSelectedKategori(null);
      setShowPopup(true);
    }
  };

  const handleKategoriChange = (kategori, kategoriLabel) => {
    if (!selectedCabang) return;
    handleSelectKategori(selectedCabang.name, kategori, kategoriLabel);
  };

  // Fungsi untuk merender daftar cabang dengan desain baru
  const renderCabangList = (list, kategoriLabel) => (
    <div className="-space-y-3">
      {list.map((cabang, idx) => {
        const iconPath = iconMap[cabang.name] || "";
        return (
          <div 
            key={idx} 
            className="relative group cursor-pointer scale-70"
            onClick={() => handleCabangClick(cabang, kategoriLabel)}
          >
            <div className="w-[26vw] h-20 px-9 py-6 bg-[#98764B] rounded-[51.89px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  outline-[3px] outline-offset-[-3px] outline-white flex justify-between items-center gap-8 overflow-hidden transition-all hover:bg-[#065D79]">
              <div className="flex items-center gap-8">
                {iconPath && (
                  <div className="relative w-10 h-10">
                    <Image 
                      src={iconPath} 
                      alt={cabang.name} 
                      layout="fill"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
                <div className="flex-1 h-7 flex flex-col justify-start items-start gap-3 w-full">
                  <div className="w-full flex justify-center text-[#FBEBD2] text-2xl font-bold font-['Sofia_Sans_Condensed']">
                    {cabang.name}
                  </div>
                </div>
              </div>
              <div className="w-8 h-11 flex justify-end items-end gap-2">
                <div className="w-0 h-11 rounded-[34.46px]  outline-1 outline-offset-[-0.57px] outline-[#FBEBD2]" />
                <div className="justify-start text-[#FBEBD2] text-3xl font-normal font-['Snowstorm']">
                  12
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto rounded-lg shadow-lg font-sans relative">
        <div>
            <h1 className="text-3xl font-bold mb-8 text-[#3C3022] text-center font-snowstorm">
                Pilih Cabang Untuk Diversifikasi
            </h1>
            <p className="text-center mb-12 text-[#3C3022] font-semibold text-sofia text-md">
                Angka di bagian kanan menunjukkan jumlah Atlet yang belum terverifikasi
            </p>
        </div>

    




    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Olahraga */}
        <div>
            <h2 className="text-Color-8 text-3xl font-normal font-['Snowstorm'] mb-6 border-b border-[#3C3022] pb-2">
            Olahraga
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 ">
            {/* Kolom Olahraga 1 */}
            <div>{renderCabangList(cabangOlahraga1, 'olahraga')}</div>
            {/* Kolom Olahraga 2 */}
            <div>{renderCabangList(cabangOlahraga2, 'olahraga')}</div>
            </div>
        </div>

        {/* Seni */}
        <div>
            <h2 className="text-Color-8 text-3xl font-normal font-['Snowstorm'] mb-6 border-b border-[#3C3022] pb-2">
            Seni
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kolom Seni 1 */}
            <div>{renderCabangList(cabangSeni1, 'seni')}</div>
            {/* Kolom Seni 2 */}
            <div>{renderCabangList(cabangSeni2, 'seni')}</div>
            </div>
        </div>
        </div>




      {/* Popup kategori */}
      {showPopup && selectedCabang && (
        <div
            className="fixed inset-0 backdrop-blur-sm  bg-opacity-40 flex justify-center items-center z-50"
            onClick={() => setShowPopup(false)}
        >
            <div
            className="w-80 h-auto p-5 relative bg-[#065D79] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  outline-[3px] outline-offset-[-3px] outline-orange-100 overflow-hidden "
            onClick={(e) => e.stopPropagation()}
            >
            {/* Judul */}
            <div className="w-60 pl-10 left-[48px] top-[20px] text-center text-orange-100 text-xl font-bold font-['Sofia_Sans_Condensed'] mb-4">
                Kategori {selectedCabang.name}
            </div>

            {/* Pilihan kategori langsung */}
            <div className="w-60 pl-10 left-[48px] top-[60px]  flex flex-col items-center gap-2">
                {selectedCabang.kategori.map((kat, i) => (
                <button
                    key={i}
                    onClick={() => {
                    handleKategoriChange(kat, selectedCabang.name);
                    setShowPopup(false);
                    }}
                    className="self-stretch text-center text-orange-100 text-lg font-bold font-['Sofia_Sans_Condensed'] hover:opacity-50 transition"
                >
                    {kat}
                </button>
                ))}
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default CabangDiversifikasi;