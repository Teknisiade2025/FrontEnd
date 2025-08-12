'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CabangDiversifikasi = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cabangOlahraga1 = [
    { name: "Sepak Bola", icon: "⚽", kategori: ["Putra"] },
    { name: "Voli", icon: "🏐", kategori: ["Putra", "Putri"] },
    { name: "Basket", icon: "🏀", kategori: ["Putra", "Putri"] },
    { name: "Bulu Tangkis", icon: "🏸", kategori: [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran",
    ] },
    { name: "Futsal", icon: "⚽", kategori: ["Putra", "Putri"] },
    { name: "Tenis Meja", icon: "🏓", kategori: [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran",
    ] },
  ];

  const cabangOlahraga2 = [
    { name: "Atletik", icon: "🏃", kategori: [
      "100m Putra",
      "100m Putri", 
      "400m Putra",
      "400m Putri",
      "1500m Putra",
      "1500m Putri",
      "4x100m Putra",
      "4x100m Putri",
    ] },
    { name: "Catur", icon: "♟️", kategori: ["Campuran"] },
    { name: "FIFA", icon: "🎮", kategori: ["Putra"] },
    { name: "PUBG", icon: "🎮", kategori: ["Putra"] },
    { name: "Mobile Legends", icon: "📱", kategori: ["Putra"] },
    { name: "Valorant", icon: "🎯", kategori: ["Putra"] }
  ];

  const cabangSeni = [
    { name: "Band", icon: "🎵", kategori: [] },
    { name: "Vokal Grup", icon: "🎤", kategori: [] },
    { name: "Vokal Solo", icon: "🎤", kategori: ["Putra", "Putri"] },
    { name: "Dance", icon: "💃", kategori: [] },
    { name: "Tari Tradisional", icon: "🩰", kategori: [] },
    { name: "Fotografi", icon: "📸", kategori: [] },
    { name: "Seni Lukis", icon: "🎨", kategori: [] },
    { name: "Cipta Puisi", icon: "📝", kategori: [] },
    { name: "Monolog", icon: "🎭", kategori: [] },
    { name: "Poster", icon: "📋", kategori: [] }
  ];

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

  const renderCabangList = (list, kategoriLabel) => (
    <div className="space-y-3">
      {list.map((cabang, idx) => (
        <div key={idx} className="relative group">
          <button
            className={`
              w-full flex justify-between items-center px-6 py-3 rounded-md font-semibold transition
              bg-amber-700 text-amber-50 hover:bg-blue-600 hover:text-white
            `}
            onClick={() => handleCabangClick(cabang, kategoriLabel)}
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">{cabang.icon}</span>
              <span>{cabang.name}</span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto  rounded-lg shadow-lg font-sans relative">
      <h1 className="text-3xl font-bold mb-8 text-[#3C3022] text-center font-snowstorm">
        Pilih Cabang Untuk Diversifikasi
      </h1>
      <p className="text-center mb-12 text-[#3C3022] font-semibold text-sofia text-md">
        Angka di bagian kanan menunjukkan jumlah Atlet yang belum terverifikasi
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-amber-900 font-pixel border-b border-amber-900 pb-2">
            Olahraga
          </h2>
          {renderCabangList(cabangOlahraga1, 'olahraga')}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-amber-900 font-pixel border-b border-amber-900 pb-2 invisible md:visible">
            &nbsp;
          </h2>
          {renderCabangList(cabangOlahraga2, 'olahraga')}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-amber-900 font-pixel border-b border-amber-900 pb-2">
            Seni
          </h2>
          {renderCabangList(cabangSeni, 'seni')}
        </div>
      </div>

      {/* Popup kategori */}
      {showPopup && selectedCabang && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-blue-700 rounded-md p-6 w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white font-bold text-xl mb-4">
              Pilih kategori untuk {selectedCabang.name}
            </h3>
            <select
              className="w-full p-2 rounded-md text-black"
              onChange={(e) => handleKategoriChange(e.target.value, selectedCabang.name)}
              defaultValue=""
            >
              <option value="" disabled>
                Pilih kategori
              </option>
              {selectedCabang.kategori.map((kat, i) => (
                <option key={i} value={kat}>
                  {kat}
                </option>
              ))}
            </select>

            <button
              className="mt-4 w-full bg-amber-700 hover:bg-blue-600 text-amber-50 font-semibold py-2 rounded-md"
              onClick={() => setShowPopup(false)}
            >
              Batal
            </button>
          </div>
        </div>
      )}

  
    </div>
  );
};

export default CabangDiversifikasi;
