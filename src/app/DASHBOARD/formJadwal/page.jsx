"use client";

import React, { useState, useRef, useEffect } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { BsCalendar2PlusFill, BsXCircleFill } from 'react-icons/bs';
import { IoSaveSharp } from 'react-icons/io5';
import Image from 'next/image';
import CabangNavigasi from '@/app/component/admin/compNavigasiCabang/cabangNav';
import JadwalPertandingan from '@/app/component/admin/jadwalPertandingan/page';
import VokalForm from '@/app/component/admin/jadwalPertandingan/vokalForm'



const AdminSchedulePage = () => {
  const [selectedCabang, setSelectedCabang] = useState('Sepak Bola');
  const [selectedKategori, setSelectedKategori] = useState('Putra');

  const handleCabangSelect = (cabang, kategori) => {
    setSelectedCabang(cabang);
    setSelectedKategori(kategori);
  };
  console.log("Nama:", selectedCabang);

  return (
    
    <div className="flex flex-row min-h-screen pt-15 pl-19 gap-1 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
          
          {/* Konten utama dengan navigasi cabang dan medal */}
          
            {/* Navigasi cabang (sidebar kiri) */}
            <div className="pt-5">
              <CabangNavigasi onSelect={handleCabangSelect} />
            </div>
          
            {/* Area konten utama (kanan) */}
            <div>
              {selectedCabang? (
                selectedCabang === 'Vokal Grup' ? 
                <VokalForm cabang={selectedCabang} kategori={selectedKategori} />
                : <JadwalPertandingan cabang={selectedCabang} kategori={selectedKategori} />
              ): (
                <p className="text-gray-500">Silakan pilih cabang dan kategori</p>
              )
              }


              {/* <JadwalPertandingan 
                cabang={selectedCabang} 
                kategori={selectedKategori} 
              /> */}
            </div>
          
        </div>
  );
};

export default AdminSchedulePage;