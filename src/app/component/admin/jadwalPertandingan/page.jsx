"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BsCalendar2PlusFill, BsXCircleFill } from "react-icons/bs";
import { IoSaveSharp } from "react-icons/io5";

const InputJadwalOlahraga = ({
  cabang,
  kategori,
  tim1,
  setTim1,
  tim2,
  setTim2,
  babak,
  setBabak,
  tanggal,
  setTanggal,
  waktu,
  setWaktu,
  handleSave,
  handleCancel,
  pilihanTim = [
    "HMTPWK",
    "KMTA",
    "KMTG",
    "KMTETI",
    "HMTF",
    "HMM",
    "HME",
    "HIMATIKA",
    "HIMAFAR",
    "HIMAKOM"
  ],
  pilihanBabak = ["Penyisihan", "Perempat Final", "Semi Final", "Final"]
}) => {
  // local UI state
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTim1Dropdown, setShowTim1Dropdown] = useState(false);
  const [showTim2Dropdown, setShowTim2Dropdown] = useState(false);
  const [showBabakDropdown, setShowBabakDropdown] = useState(false);

  const datePickerRef = useRef(null);
  const tim1DropdownRef = useRef(null);
  const tim2DropdownRef = useRef(null);
  const babakDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tim1DropdownRef.current && !tim1DropdownRef.current.contains(event.target)) {
        setShowTim1Dropdown(false);
      }
      if (tim2DropdownRef.current && !tim2DropdownRef.current.contains(event.target)) {
        setShowTim2Dropdown(false);
      }
      if (babakDropdownRef.current && !babakDropdownRef.current.contains(event.target)) {
        setShowBabakDropdown(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectTim = (tim, setter) => {
    setter(tim);
    setShowTim1Dropdown(false);
    setShowTim2Dropdown(false);
  };

  const handleSelectBabak = (selectedBabak) => {
    setBabak(selectedBabak);
    setShowBabakDropdown(false);
  };

  const handleDateChange = (e) => {
    if (!e.target.value) return;
    // e.target.value format: "YYYY-MM-DD"
    const date = new Date(e.target.value);
    if (isNaN(date.getTime())) return;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    setTanggal(`${day}/${month}/${year}`);
    setShowDatePicker(false);
  };

  const handleDelete = () => {
  setTim1("");
  setTim2("");
  setBabak("");
  setTanggal("");
  setWaktu("");
};


  return (
    <div className="flex flex-col items-center p-14 rounded-[20px]">
      {/* Header Cabang & Kategori */}
      <div className="mb-1 flex justify-end">
        <div className="px-4 py-1 rounded-full shadow-md bg-[#806037]">
          <h1 className="text-lg font-normal font-['Snowstorm'] text-[#FCFCFC]">
            {cabang} - {kategori}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[100%] h-[100vh] -mt-5 px-16 py-8 bg-[#B1844D] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-white flex items-center scale-y-90 relative">
        <button
    onClick={handleCancel}
    className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors text-3xl font-bold"
    aria-label="Cancel"
    type="button"
  >
    ×
  </button>
        
        <div className="flex-1 self-stretch flex flex-col justify-between items-center gap-8">
          {/* Judul */}
          <div className="self-stretch text-center justify-start text-[#FCFCFC] text-3xl font-normal font-['Snowstorm']">
            Atur Jadwal Pertandingan
          </div>
          
          {/* Tim 1 vs Tim 2 */}
          <div className="self-stretch inline-flex justify-center items-center gap-6">
            {/* Tim 1 */}
            <div className="flex-1 h-24 inline-flex flex-col justify-between items-center relative">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9">
                TIM 1
              </div>
              <div 
                className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden cursor-pointer"
                onClick={() => setShowTim1Dropdown(!showTim1Dropdown)}
              >
                <div className="flex-1 self-stretch text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] flex items-center justify-center">
                  {tim1}
                </div>
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
              
              {/* Dropdown Tim 1 */}
              {showTim1Dropdown && (
                <div 
                  ref={tim1DropdownRef}
                  className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-[#FBEBD2] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  outline-[3px] outline-offset-[-3px] outline-[#806037] z-50"
                >
                  <div className="px-4 py-3 text-center text-[#806037] text-xl font-normal font-['Sofia_Sans_Condensed'] border-b border-[#806037]">
                    KMHM
                  </div>
                  {pilihanTim.map((tim, index) => (
                    <div 
                      key={index}
                      className={`px-4 py-3 text-center text-[#806037] text-lg font-bold font-['Sofia_Sans_Condensed'] cursor-pointer hover:bg-[#e6d9c0] ${
                        tim === tim1 ? 'bg-[#e6d9c0]' : ''
                      }`}
                      onClick={() => handleSelectTim(tim, setTim1)}
                    >
                      {tim}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* VS */}
            <div className="justify-start text-[#FCFCFC] text-2xl font-normal font-['Sofia_Sans_Condensed']">
              VS
            </div>
            
            {/* Tim 2 */}
            <div className="flex-1 h-24 inline-flex flex-col justify-between items-center relative">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9">
                TIM 2
              </div>
              <div 
                className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden cursor-pointer"
                onClick={() => setShowTim2Dropdown(!showTim2Dropdown)}
              >
                <div className="flex-1 self-stretch text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] flex items-center justify-center">
                  {tim2}
                </div>
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
              
              {/* Dropdown Tim 2 */}
              {showTim2Dropdown && (
                <div 
                  ref={tim2DropdownRef}
                  className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-[#FBEBD2] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-[#806037] z-50"
                >
                  <div className="px-4 py-3 text-center text-[#806037] text-xl font-normal font-['Sofia_Sans_Condensed'] border-b border-[#806037]">
                    KMHM
                  </div>
                  {pilihanTim.map((tim, index) => (
                    <div 
                      key={index}
                      className={`px-4 py-3 text-center text-[#806037] text-lg font-bold font-['Sofia_Sans_Condensed'] cursor-pointer hover:bg-[#e6d9c0] ${
                        tim === tim2 ? 'bg-[#e6d9c0]' : ''
                      }`}
                      onClick={() => handleSelectTim(tim, setTim2)}
                    >
                      {tim}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Form Input */}
          <div className="self-stretch flex flex-col justify-start items-center gap-4">
            {/* Babak */}
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Babak
              </div>
              <div 
                className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden cursor-pointer"
                onClick={() => setShowBabakDropdown(!showBabakDropdown)}
              >
                <div className="flex-1 self-stretch text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] flex items-center justify-center">
                  {babak}
                </div>
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
              
              {/* Dropdown Babak */}
              {showBabakDropdown && (
                <div 
                  ref={babakDropdownRef}
                  className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-[#FBEBD2] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]  outline-[3px] outline-offset-[-3px] outline-[#806037] z-50"
                >
                  <div className="px-4 py-3 text-center text-[#806037] text-xl font-normal font-['Sofia_Sans_Condensed'] border-b border-[#806037]">
                    Babak
                  </div>
                  {pilihanBabak.map((babakOption, index) => (
                    <div 
                      key={index}
                      className={`px-4 py-3 text-center text-[#806037] text-lg font-bold font-['Sofia_Sans_Condensed'] cursor-pointer hover:bg-[#e6d9c0] ${
                        babakOption === babak ? 'bg-[#e6d9c0]' : ''
                      }`}
                      onClick={() => handleSelectBabak(babakOption)}
                    >
                      {babakOption}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Tanggal */}
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Tanggal
              </div>
              <div className="relative">
                <div 
                  className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <div className="w-150 self-stretch text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] flex items-center justify-center">
                    {tanggal}
                  </div>
                  <BsCalendar2PlusFill className="w-6 h-6 text-[#806037] cursor-pointer" />
                </div>
                
                {/* Date Picker */}
                {showDatePicker && (
                  <div 
                    ref={datePickerRef}
                    className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 p-4"
                  >
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#806037]"
                      onChange={handleDateChange}
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Waktu */}
            <div className="w-full flex flex-col justify-center items-start">
              <div className="self-stretch justify-start text-[#FCFCFC] text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Waktu (WIB)
              </div>
              <div className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <input
                  type="time"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="flex-1 self-stretch bg-transparent border-none text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                  placeholder="HH.MM"
                />
              </div>
            </div>
          </div>
          
          {/* Tombol Aksi */}
          <div className="self-stretch h-14 inline-flex mx-auto justify-center items-center gap-6 mt-4 w-[60%]">
            {/* Tombol Simpan */}
            <button 
              className="flex-1 self-stretch px-8 py-2 bg-[#065D79] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#0a7a9a] transition-colors"
              onClick={handleSave}
            >
              <div className="justify-start text-[#F0EED7] text-2xl font-bold font-['Sofia_Sans_Condensed']">
                Simpan
              </div>
              <IoSaveSharp className="w-5 h-5 text-[#F0EED7]" />
            </button>
            
            {/* Tombol Hapus */}
            <button 
              className="flex-1 self-stretch px-8 py-2 bg-[#806037] rounded-full outline-[1.5px] outline-offset-[-1.5px] outline-[#F0EED7] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#9a7b5e] transition-colors"
              onClick={handleDelete}
            >
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

export default InputJadwalOlahraga;
