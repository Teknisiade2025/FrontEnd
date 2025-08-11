"use client";

import React, { useState } from 'react';
import { BsCalendar2PlusFill, BsXCircleFill } from 'react-icons/bs';
import { IoSaveSharp } from 'react-icons/io5';
import Image from 'next/image';

const JadwalPertandingan = ({ cabang, kategori }) => {
  const [tim1, setTim1] = useState('HMTPWK');
  const [tim2, setTim2] = useState('KMTETI');
  const [babak, setBabak] = useState('Semi Final');
  const [tanggal, setTanggal] = useState('10/10/2002');
  const [waktu, setWaktu] = useState('19.00');

  return (
    <div className="flex flex-col w-[60vw] scale-65">
      {/* Header Cabang & Kategori */}
      {/* <div className="mb-4 flex justify-end">
        <div className="px-4 py-1 bg-[#806037] rounded-full shadow-md">
          <h1 className="text-lg font-normal font-['Snowstorm'] text-[#FCFCFC]">
            {cabang} - {kategori}
          </h1>
        </div>
      </div> */}

      {/* Main Content - Diperkecil */}
      <div className="w-[100%] h-[120vh] px-16 py-8 bg-[#B1844D] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-white flex  items-center">
        <div className="flex-1 self-stretch flex flex-col justify-between items-center gap-8">
          {/* Judul */}
          <div className="self-stretch text-center justify-start text-[#FCFCFC] text-3xl font-normal font-['Snowstorm']">
            Atur Jadwal Pertandingan
          </div>
          
          {/* Tim 1 vs Tim 2 */}
          <div className="self-stretch inline-flex justify-center items-center gap-6">
            {/* Tim 1 */}
            <div className="flex-1 h-24 inline-flex flex-col justify-between items-center">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9">
                TIM 1
              </div>
              <div className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <input
                  type="text"
                  value={tim1}
                  onChange={(e) => setTim1(e.target.value)}
                  className="flex-1 self-stretch bg-transparent border-none text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                />
                <div className="w-4 h-3  rounded-sm cursor-pointer flex items-center justify-center">
                  <Image 
                    src="/dashboard-jadwalPertandingan/dropdown.svg" 
                    alt="dropdown" 
                    width={14}
                    height={14}
                    className="w-2.8 h-2.8"
                  />
                </div>
              </div>
            </div>
            
            {/* VS */}
            <div className="justify-start text-[#FCFCFC] text-2xl font-normal font-['Sofia_Sans_Condensed']">
              VS
            </div>
            
            {/* Tim 2 */}
            <div className="flex-1 h-24 inline-flex flex-col justify-between items-center">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9">
                TIM 2
              </div>
              <div className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <input
                  type="text"
                  value={tim2}
                  onChange={(e) => setTim2(e.target.value)}
                  className="flex-1 self-stretch bg-transparent border-none text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                />
                <div className="w-4 h-3rounded-sm cursor-pointer flex items-center justify-center">
                  <Image 
                    src="/dashboard-jadwalPertandingan/dropdown.svg" 
                    alt="dropdown" 
                    width={14}
                    height={14}
                    className="w-2.8 h-2.8"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Input */}
          <div className="self-stretch flex flex-col justify-start items-center gap-4">
            {/* Babak */}
            <div className="w-full flex flex-col justify-center items-start">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Babak
              </div>
              <div className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <input
                  type="text"
                  value={babak}
                  onChange={(e) => setBabak(e.target.value)}
                  className="flex-1 self-stretch bg-transparent border-none text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                />
                <div className="w-4 h-3 rounded-sm cursor-pointer flex items-center justify-center">
                  <Image 
                    src="/dashboard-jadwalPertandingan/dropdown.svg" 
                    alt="dropdown" 
                    width={14}
                    height={14}
                    className="w-2.8 h-2.8"
                  />
                </div>
              </div>
            </div>
            
            {/* Tanggal */}
            <div className="w-full flex flex-col justify-center items-start">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Tanggal
              </div>
              <div className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <input
                  type="text"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-48 self-stretch bg-transparent border-none text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                />
                <BsCalendar2PlusFill className="w-6 h-6 text-[#806037]" />
              </div>
            </div>
            
            {/* Waktu */}
            <div className="w-full flex flex-col justify-center items-start">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Waktu (WIB)
              </div>
              <div className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <input
                  type="text"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="flex-1 self-stretch bg-transparent border-none text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                />
              </div>
            </div>
          </div>
          
          {/* Tombol Aksi */}
          <div className="self-stretch h-14 inline-flex justify-center items-start gap-6 mt-4">
            {/* Tombol Simpan */}
            <button className="flex-1 self-stretch px-8 py-2 bg-[#065D79] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#0a7a9a] transition-colors">
              <div className="justify-start text-[#F0EED7] text-2xl font-bold font-['Sofia_Sans_Condensed']">
                Simpan
              </div>
              <IoSaveSharp className="w-5 h-5 text-[#F0EED7]" />
            </button>
            
            {/* Tombol Hapus */}
            <button className="flex-1 self-stretch px-8 py-2 bg-[#806037] rounded-full outline outline-[1.5px] outline-offset-[-1.5px] outline-[#F0EED7] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#9a7b5e] transition-colors">
              <div className="justify-start text-[#F0EED7] text-2xl font-bold font-['Sofia_Sans_Condensed']">
                Hapus
              </div>
              <BsXCircleFill className="w-5 h-5 text-[#F0EED7]" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Font Styles */}
      <style jsx global>{`
        @font-face {
          font-family: 'Snowstorm';
          src: url('/fonts/Snowstorm-Regular.woff2') format('woff2'),
               url('/fonts/Snowstorm-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Sofia_Sans_Condensed';
          src: url('/fonts/SofiaSansCondensed-Regular.woff2') format('woff2'),
               url('/fonts/SofiaSansCondensed-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Sofia_Sans_Condensed';
          src: url('/fonts/SofiaSansCondensed-Bold.woff2') format('woff2'),
               url('/fonts/SofiaSansCondensed-Bold.woff') format('woff');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </div>
  );
};

export default JadwalPertandingan;