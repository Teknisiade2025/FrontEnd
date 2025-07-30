"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Atlet = () => {
  const [selectedTab, setSelectedTab] = useState('Semua');

  const atletData = [
    {
      id: 1,
      nama: "John Doe",
      cabang: "Basket Putra",
      asalKMHM: "KMTETI",
      jurusan: "Teknik Elektro",
      angkatan: "2022",
      email: "JohnDoe@gmail.com",
      noHP: "08123456789",
      tempatTanggalLahir: "Jakarta, 25 April 2022",
      asalKota: "DKI Jakarta"
    },
    {
      id: 2,
      nama: "John Doe",
      cabang: "Basket Putra",
      asalKMHM: "KMTETI",
      jurusan: "Teknik Elektro",
      angkatan: "2022",
      email: "JohnDoe@gmail.com",
      noHP: "08123456789",
      tempatTanggalLahir: "Jakarta, 25 April 2022",
      asalKota: "DKI Jakarta"
    },
    {
      id: 3,
      nama: "John Doe",
      cabang: "Basket Putra",
      asalKMHM: "KMTETI",
      jurusan: "Teknik Elektro",
      angkatan: "2022",
      email: "JohnDoe@gmail.com",
      noHP: "08123456789",
      tempatTanggalLahir: "Jakarta, 25 April 2022",
      asalKota: "DKI Jakarta"
    },
    {
      id: 4,
      nama: "John Doe",
      cabang: "Basket Putra",
      asalKMHM: "KMTETI",
      jurusan: "Teknik Elektro",
      angkatan: "2022",
      email: "JohnDoe@gmail.com",
      noHP: "08123456789",
      tempatTanggalLahir: "Jakarta, 25 April 2022",
      asalKota: "DKI Jakarta"
    }
  ];

  return (
    <div className="relative min-h-screen px-10 py-12 font-['Sofia_Sans_Condensed']">
      {/* Dekorasi: dipertahankan posisi dan file aslinya */}
      <Image src="/schedule/atletkiri.svg" alt="Dekorasi Kiri" width={369.41} height={335.31}
             className="absolute left-[20px] top-[2855px]" />
      <Image src="/schedule/atletkanan.svg" alt="Dekorasi Kanan" width={369.41} height={335.31}
             className="absolute left-[1433px] top-[2855px]" />

      {/* Judul */}
      <h1 className="text-[103px] text-[#1D2225] font-[Snowstorm] text-center leading-tight drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)] mb-8">
        ATLET/SENIMAN
      </h1>

      {/* Tab navigasi */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-[#1D2225] rounded-[53px] px-[13.8px] py-[10px] gap-[6px]">
          <button
            onClick={() => setSelectedTab("Semua")}
            className={`flex-1 rounded-[45.6px] text-[18px] font-extrabold ${
              selectedTab === "Semua" ? "bg-[#806037] text-[#FBEBD2]" : "text-[#FBEBD2]"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setSelectedTab("KMHM")}
            className={`flex-1 rounded-[27.6px] text-[18px] font-extrabold relative ${
              selectedTab === "KMHM" ? "bg-[#1D2225] text-[#F0EED7]" : "text-[#F0EED7]"
            }`}
          >
            KMHM
            {/* Ikon dropdown bisa dilengkapi nanti */}
          </button>
        </div>
      </div>

      {/* Grid kartu atlet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1759px] mx-auto">
        {atletData.map((a, idx) => (
          <div key={a.id} className={`relative flex items-center gap-8 h-[350px] p-[49px] rounded-[27px] shadow-[–6.8px_6.8px_6.8px_rgba(0,0,0,0.25)] ${
            idx === 0
              ? "bg-[#806037] text-[#F0EED7]"
              : "bg-[rgba(240,238,215,0.8)] text-[#3C3022]"
          }`}>
            {/* Avatar icon */}
            <div className="w-[156px] h-[198px] bg-[#F0EED7] rounded-[13.7px] relative flex items-center justify-center">
              <div className="absolute w-[90px] h-[97px] bg-[#806037] rounded-full"></div>
            </div>

            {/* Info tabel */}
            <div className="flex flex-col gap-4">
              {["Nama","Cabang","Asal KMHM","Jurusan","Angkatan","Email","No. HP","Tempat, Tgl Lahir","Asal Kota"].map((label, i) => (
                <div key={i} className="flex">
                  <div className={`w-[253px] font-bold text-[19.97px] ${idx === 0 ? "text-[#F0EED7]" : "text-[#3C3022]"}`}>
                    {label}
                  </div>
                  <div className={`text-[19.97px] ${idx === 0 ? "text-[#F0EED7]" : "text-[#3C3022]"}`}>
                    {a[label.toLowerCase().replace(/\s|,/g, '')] || a.nama}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Atlet;
