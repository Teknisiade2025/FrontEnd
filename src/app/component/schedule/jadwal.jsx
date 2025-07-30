"use client";
import React, { useState } from 'react';

const Atlet = () => {
  const [selectedTab, setSelectedTab] = useState('Semua');

  const atletData = [
    {
      id: 1,
      nama: "John Doe",
      cabang: "Basket Putra",
      asalkmhm: "KMTETI",
      jurusan: "Teknik Elektro",
      angkatan: "2022",
      email: "JohnDoe@gmail.com",
      nohp: "08123456789",
      tempattgllahir: "Jakarta, 25 April 2022",
      asalkota: "DKI Jakarta"
    },
    {
      id: 2,
      nama: "Jane Smith",
      cabang: "Volley Putri",
      asalkmhm: "KMTM",
      jurusan: "Teknik Mesin",
      angkatan: "2021",
      email: "JaneSmith@gmail.com",
      nohp: "08123456790",
      tempattgllahir: "Bandung, 15 Mei 2021",
      asalkota: "Jawa Barat"
    },
    {
      id: 3,
      nama: "Ahmad Rizki",
      cabang: "Futsal Putra",
      asalkmhm: "KMTS",
      jurusan: "Teknik Sipil",
      angkatan: "2023",
      email: "AhmadRizki@gmail.com",
      nohp: "08123456791",
      tempattgllahir: "Yogyakarta, 10 Januari 2023",
      asalkota: "DI Yogyakarta"
    },
    {
      id: 4,
      nama: "Sari Dewi",
      cabang: "Badminton Putri",
      asalkmhm: "KMTK",
      jurusan: "Teknik Kimia",
      angkatan: "2022",
      email: "SariDewi@gmail.com",
      nohp: "08123456792",
      tempattgllahir: "Surabaya, 20 Maret 2022",
      asalkota: "Jawa Timur"
    }
  ];

  const fieldLabels = [
    { key: 'nama', label: 'Nama' },
    { key: 'cabang', label: 'Cabang' },
    { key: 'asalkmhm', label: 'Asal KMHM' },
    { key: 'jurusan', label: 'Jurusan' },
    { key: 'angkatan', label: 'Angkatan' },
    { key: 'email', label: 'Email' },
    { key: 'nohp', label: 'No. HP' },
    { key: 'tempattgllahir', label: 'Tempat, Tgl Lahir' },
    { key: 'asalkota', label: 'Asal Kota' }
  ];

  return (
    <div className="relative min-h-screen px-4 md:px-6 lg:px-10 py-8 md:py-12 bg-gradient-to-b from-blue-50 to-white">
      {/* Dekorasi - responsif */}
      <div className="hidden lg:block">
        <div className="absolute left-5 top-[600px] w-60 h-60 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20"></div>
        <div className="absolute right-5 top-[600px] w-60 h-60 bg-gradient-to-l from-orange-200 to-yellow-200 rounded-full opacity-20"></div>
      </div>

      {/* Judul */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-gray-800 font-bold text-center leading-tight mb-6 md:mb-8 drop-shadow-lg">
        ATLET/SENIMAN
      </h1>

      {/* Tab navigasi */}
      <div className="flex justify-center mb-6 md:mb-10">
        <div className="inline-flex bg-gray-800 rounded-full p-2 gap-1">
          <button
            onClick={() => setSelectedTab("Semua")}
            className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
              selectedTab === "Semua" 
                ? "bg-amber-600 text-amber-50 shadow-lg" 
                : "text-amber-50 hover:bg-gray-700"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setSelectedTab("KMHM")}
            className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
              selectedTab === "KMHM" 
                ? "bg-amber-600 text-amber-50 shadow-lg" 
                : "text-amber-50 hover:bg-gray-700"
            }`}
          >
            KMHM
          </button>
        </div>
      </div>

      {/* Grid kartu atlet */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
        {atletData.map((atlet, idx) => (
          <div 
            key={atlet.id} 
            className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-6 md:p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
              idx === 0
                ? "bg-amber-600 text-amber-50"
                : "bg-white/90 text-gray-800 border border-gray-200"
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-24 h-32 md:w-32 md:h-40 bg-amber-50 rounded-xl flex items-center justify-center shadow-inner">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">
                    {atlet.nama.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
            </div>

            {/* Info tabel */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {fieldLabels.map((field) => (
                  <div key={field.key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <div className={`font-bold text-sm md:text-base w-full sm:w-40 md:w-48 flex-shrink-0 ${
                      idx === 0 ? "text-amber-100" : "text-gray-600"
                    }`}>
                      {field.label}
                    </div>
                    <div className={`text-sm md:text-base font-medium ${
                      idx === 0 ? "text-amber-50" : "text-gray-800"
                    }`}>
                      {atlet[field.key]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight badge untuk kartu pertama */}
            {idx === 0 && (
              <div className="absolute -top-3 -right-3">
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  ⭐ Featured
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer info */}
      <div className="text-center mt-12 text-gray-600">
        <p className="text-sm md:text-base">
          Menampilkan {atletData.length} atlet/seniman
        </p>
      </div>
    </div>
  );
};

export default Atlet;