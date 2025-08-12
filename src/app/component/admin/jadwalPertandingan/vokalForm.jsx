"use client";

import React, { useState, useRef, useEffect } from 'react';
import { BsCalendar2PlusFill, BsXCircleFill } from 'react-icons/bs';
import { IoSaveSharp } from 'react-icons/io5';
import Image from 'next/image';
import { supabase } from "@/app/lib/supabase";

const InputJadwalSeni = ({
  cabang,
  kategori,
  initialData,
  onSubmit,
  onCancel
}) => {
  const [tim, setTim] = useState(initialData?.tim || 'HMTPWK');
  const [babak, setBabak] = useState(initialData?.babak || 'Penyisihan');
  const [tanggal, setTanggal] = useState(initialData?.tanggal || '2002-10-10'); // format YYYY-MM-DD
  const [waktu, setWaktu] = useState(initialData?.waktu || '19:00');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimDropdown, setShowTimDropdown] = useState(false);
  const [showBabakDropdown, setShowBabakDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  const datePickerRef = useRef(null);
  const timDropdownRef = useRef(null);
  const babakDropdownRef = useRef(null);

  const pilihanTim = [
    'HMTPWK', 'KMTA', 'KMTG', 'KMTETI', 'KMTNTF', 'KMTM', 'KMTK', 'KMTSL',
     'HMTI', 'HMTG'
  ];
  const pilihanBabak = ['Penyisihan', 'Semi Final', 'Final', 'Perebutan Juara 3'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (timDropdownRef.current && !timDropdownRef.current.contains(event.target)) {
        setShowTimDropdown(false);
      }
      if (babakDropdownRef.current && !babakDropdownRef.current.contains(event.target)) {
        setShowBabakDropdown(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTim = (selectedTim) => {
    setTim(selectedTim);
    setShowTimDropdown(false);
  };

  const handleSelectBabak = (selectedBabak) => {
    setBabak(selectedBabak);
    setShowBabakDropdown(false);
  };

  const handleDateChange = (e) => {
    setTanggal(e.target.value); // langsung format YYYY-MM-DD
    setShowDatePicker(false);
  };

  const handleSave = async () => {
    if (!cabang || !kategori || !tim || !babak || !tanggal || !waktu) {
      alert('Semua field harus diisi!');
      return;
    }

    setLoading(true);
    try {
      const data = { cabang, kategori, tim, babak, tanggal, waktu };
      let savedData;

      if (initialData) {
        const { data: updated, error } = await supabase
          .from('jadwal_seni')
          .update(data)
          .eq('id', initialData.id)
          .select();

        if (error) throw error;
        savedData = updated[0];
      } else {
        const { data: inserted, error } = await supabase
          .from('jadwal_seni')
          .insert([data])
          .select();

        if (error) throw error;
        savedData = inserted[0];
      }

      onSubmit(savedData);
    } catch (error) {
      console.error('Error saving schedule:', error);
      alert('Gagal menyimpan jadwal: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) {
      alert('Tidak ada data untuk dihapus');
      return;
    }

    if (!window.confirm('Yakin ingin menghapus jadwal ini?')) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('jadwal_seni')
        .delete()
        .eq('id', initialData.id);

      if (error) throw error;

      alert('Jadwal berhasil dihapus');
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      alert('Gagal menghapus jadwal: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 rounded-[20px] w-full">
      {/* Header Cabang & Kategori */}
      <div className="mb-4 flex justify-end w-full">
        <div className="px-4 py-1 rounded-full shadow-md bg-[#806037]">
          <h1 className="text-lg font-normal font-['Snowstorm'] text-[#FCFCFC]">
            {cabang} - {kategori}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-[100%] mt-5 px-16 py-8 bg-[#B1844D] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-white flex items-center">
        <div className="flex-1 self-stretch flex flex-col justify-between items-center gap-8">
          {/* Judul */}
          <div className="self-stretch text-center justify-start text-[#FCFCFC] text-3xl font-normal font-['Snowstorm']">
            Atur Jadwal Pertandingan
          </div>
          
          {/* Form Input */}
          <div className="self-stretch flex flex-col justify-start items-center gap-4 w-full">

            {/* Tim */}
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="self-stretch text-left justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Tim
              </div>
              <div 
                className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden cursor-pointer"
                onClick={() => setShowTimDropdown(!showTimDropdown)}
              >
                <div className="flex-1 self-stretch text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] flex items-center justify-center">
                  {tim}
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
                           
              {/* Dropdown Tim */}
              {showTimDropdown && (
                <div 
                  ref={timDropdownRef}
                  className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-[#FBEBD2] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-[#806037] z-50"
                >
                  <div className="px-4 py-3 text-center text-[#806037] text-xl font-normal font-['Sofia_Sans_Condensed'] border-b border-[#806037]">
                    KMHM
                  </div>
                  {pilihanTim.map((pilihan, index) => (
                    <div 
                      key={index}
                      className={`px-4 py-3 text-center text-[#806037] text-lg font-bold font-['Sofia_Sans_Condensed'] cursor-pointer hover:bg-[#e6d9c0] ${
                        pilihan === tim ? 'bg-[#e6d9c0]' : ''
                      }`}
                      onClick={() => handleSelectTim(pilihan)}
                    >
                      {pilihan}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Babak */}
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="self-stretch text-left justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
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
                  className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-[#FBEBD2] rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-[#806037] z-50"
                >
                  {pilihanBabak.map((pilihan, index) => (
                    <div 
                      key={index}
                      className={`px-4 py-3 text-center text-[#806037] text-lg font-bold font-['Sofia_Sans_Condensed'] cursor-pointer hover:bg-[#e6d9c0] ${
                        pilihan === babak ? 'bg-[#e6d9c0]' : ''
                      }`}
                      onClick={() => handleSelectBabak(pilihan)}
                    >
                      {pilihan}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Tanggal */}
            <div className="w-full flex flex-col justify-center items-start relative">
              <div className="self-stretch text-left justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Tanggal
              </div>
              <div className="relative w-full">
                <div 
                  className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden cursor-pointer"
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
                    className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 p-4 text-black font-sofia text-sm"
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
              <div className="self-stretch justify-start text-left items-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Waktu (WIB)
              </div>
              <div className="self-stretch h-14 px-6 bg-[#FBEBD2] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-center items-center overflow-hidden">
                <input
                  type="time"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="flex-1 self-stretch bg-transparent border-none text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center appearance-none"
                  placeholder="HH.MM"
                />
              </div>
            </div>
          </div>
       
          
          {/* Tombol Aksi */}
          <div className="self-stretch h-14 inline-flex justify-center items-start gap-6 mt-4">
            {/* Tombol Simpan */}
            <button 
              className="flex-1 self-stretch px-8 py-2 bg-[#065D79] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#0a7a9a] transition-colors disabled:opacity-50"
              onClick={handleSave}
              disabled={loading}
            >
              <div className="justify-start text-[#F0EED7] text-2xl font-bold font-['Sofia_Sans_Condensed']">
                {loading ? 'Menyimpan...' : 'Simpan'}
              </div>
              {!loading && <IoSaveSharp className="w-5 h-5 text-[#F0EED7]" />}
            </button>
            
            {/* Tombol Hapus */}
            <button 
              className="flex-1 self-stretch px-8 py-2 bg-[#806037] rounded-full outline-[1.5px] outline-offset-[-1.5px] outline-[#F0EED7] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#9a7b5e] transition-colors"
              onClick={handleDelete}
              disabled={loading}
            >
              <div className="justify-start text-[#F0EED7] text-2xl font-bold font-['Sofia_Sans_Condensed']">
                {initialData ? 'Batal' : 'Hapus'}
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

export default InputJadwalSeni;