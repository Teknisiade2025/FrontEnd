'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { HiChevronRight } from "react-icons/hi";

const CabangDiversifikasi = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    { name: "Bulu Tangkis", kategori: ["Tunggal Putra", "Tunggal Putri", "Ganda Putra", "Ganda Putri", "Ganda Campuran"] },
    { name: "Futsal", kategori: ["Putra", "Putri"] },
    { name: "Tenis Meja", kategori: ["Tunggal Putra", "Tunggal Putri", "Ganda Putra", "Ganda Putri", "Ganda Campuran"] },
  ];

  const cabangOlahraga2 = [
    { name: "Atletik", kategori: ["100m Putra", "100m Putri", "400m Putra", "400m Putri", "1500m Putra", "1500m Putri", "4x100m Putra", "4x100m Putri"] },
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

  const cabangSeni2 = [
    { name: "Fotografi", kategori: [] },
    { name: "Seni Lukis", kategori: [] },
    { name: "Cipta Puisi", kategori: [] },
    { name: "Monolog", kategori: [] },
    { name: "Poster", kategori: [] }
  ];

  const [selectedCabang, setSelectedCabang] = useState(null);

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
      setSelectedCabang(prev =>
        prev?.name === cabang.name ? null : cabang
      );
    }
  };

  const renderCabangList = (list, kategoriLabel) => (
    <div className="-space-y-3">
      {list.map((cabang, idx) => {
        const iconPath = iconMap[cabang.name] || "";
        const isOpen = selectedCabang?.name === cabang.name;

        return (
          <div key={idx} className="relative mb-4">
            {/* Card utama */}
            <div
              className="relative group cursor-pointer "
              onClick={() => handleCabangClick(cabang, kategoriLabel)}
            >
              <div className="w-[20vw] h-10 px-9 py-6 bg-[#98764B] rounded-[51.89px] shadow-md outline-[3px] outline-offset-[-3px] outline-white flex justify-between items-center gap-8 transition-all hover:bg-[#065D79]">
                <div className="flex items-center gap-8">
                  {iconPath && (
                    <div className="relative w-7 h-7">
                      <Image
                        src={iconPath}
                        alt={cabang.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col  justify-center items-center">
                    <div className="text-[#FBEBD2] text-[1vw] font-bold font-['Sofia_Sans_Condensed']">
                      {cabang.name}
                    </div>
                  </div>
                </div>

                {/* Chevron kanan */}
                <div className={`flex items-center justify-center text-[#FBEBD2] transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}>
                  <HiChevronRight className="text-3xl" />
                </div>
              </div>

              {/* Dropdown kategori */}
              {isOpen && cabang.kategori.length > 1 && (
                <div className="absolute left-0 top-full mt-2 w-[20vw] bg-[#065D79] rounded-xl p-3 shadow-lg z-[9999]">
                  {cabang.kategori.map((kat, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        handleSelectKategori(cabang.name, kat);
                        setSelectedCabang(null);
                      }}
                      className="block w-full text-left text-orange-100 text-lg font-bold py-1 px-2 hover:bg-[#05485f] rounded"
                    >
                      {kat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="max-h-screen p-6 max-w-7xl mx-auto font-sans relative">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-[#3C3022] text-center font-snowstorm">
          Pilih Cabang Untuk Diversifikasi
        </h1>
        <p className="text-center mb-2 text-[#3C3022] font-semibold text-sofia text-md">
          Angka di bagian kanan menunjukkan jumlah Atlet yang belum terverifikasi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        {/* Olahraga */}
        <div>
          <h2 className="text-Color-8 text-3xl font-normal font-['Snowstorm'] mb-6 border-b border-[#3C3022] pb-2">
            Olahraga
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10  overflow-visible relative">
            <div >{renderCabangList(cabangOlahraga1, 'olahraga')}</div>
            <div>{renderCabangList(cabangOlahraga2, 'olahraga')}</div>
          </div>
        </div>

        {/* Seni */}
        <div>
          <h2 className="text-Color-8 text-3xl font-normal font-['Snowstorm'] mb-6 border-b border-[#3C3022] pb-2">
            Seni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>{renderCabangList(cabangSeni1, 'seni')}</div>
            <div>{renderCabangList(cabangSeni2, 'seni')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabangDiversifikasi;
