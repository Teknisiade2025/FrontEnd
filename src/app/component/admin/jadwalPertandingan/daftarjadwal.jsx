"use client";

import React, { useState, useEffect } from "react";
import { BsCalendar2PlusFill, BsXCircleFill } from "react-icons/bs";
import { IoSaveSharp } from "react-icons/io5";
import { HiArrowRight, HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import Image from "next/image";



// Logo mapping untuk demo
const teamLogos = {
  "HMTPWK": "/team-logos/hmtpwk.png",
  "KMTETI": "/team-logos/kmteti.png",
  "HIMATIKA": "/team-logos/himatika.png",
  "HIMAFAR": "/team-logos/himafar.png",
  "HME": "/team-logos/hme.png",
  "KMTA": "/team-logos/kmta.png",
  "KMTG": "/team-logos/kmtg.png",
  "HMTF": "/team-logos/hmtf.png",
  "HMM": "/team-logos/hmm.png",
  "HIMAKOM": "/team-logos/himakom.png"
};

const MatchCard = ({ match, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short"
    });
  };

  return (
    <div className="w-full p-5 md:p-6 bg-[#5F56487F] shadow-md rounded-[42px] flex flex-col gap-2 relative">
      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => onEdit(match)}
          className="p-2 bg-[#065D79] rounded-full hover:bg-[#0a7a9a] transition-colors"
        >
          <HiPencil className="w-4 h-4 text-white" />
        </button>
        <button 
          onClick={() => onDelete(match.id)}
          className="p-2 bg-[#806037] rounded-full hover:bg-[#9a7b5e] transition-colors"
        >
          <HiTrash className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Judul Pertandingan */}
      <div className="text-center mt-4">
        <div className="text-[#1D2225] text-base md:text-lg font-['Snowstorm'] flex flex-col items-center font-bold leading-[135%] text-center">
          <span>{match.cabang.toUpperCase()} - {match.kategori.toUpperCase()}</span>
          <span>BABAK {match.babak.toUpperCase()}</span>
        </div>
      </div>

      {/* Baris 2: Logo A | Info Tengah | Logo B */}
      <div className="flex flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Team A */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <div className="w-full h-full bg-gradient-to-br from-[#806037] to-[#B1844D] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{match.tim1.substring(0, 3)}</span>
            </div>
          </div>
          <span className="text-[#1D2225] font-bold font-['Snowstorm'] text-sm sm:text-base lg:text-lg text-center">
            {match.tim1}
          </span>
        </div>

        {/* Info Tengah */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-6 mx-auto flex-1 min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]">
          <div className="flex flex-col items-center text-center">
            <p className="text-[#1D2225] font-['Sofia_Sans_Condensed'] text-sm md:text-base font-normal">
              {formatDate(match.tanggal)}, {match.waktu} WIB
            </p>
            <p className="text-[#1D2225] font-['Sofia_Sans_Condensed'] text-sm md:text-base font-normal">
              {match.venue}
            </p>
          </div>
          <div className="text-[#1D2225] font-extrabold text-xl sm:text-3xl lg:text-4xl font-['Snowstorm']">V/S</div>
          <a
            href="https://youtube.com/@teknisiadeugm?si=OTakLii6k8IdSqua" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 text-[#1D2225] text-sm sm:text-base font-['Sofia_Sans_Condensed'] font-bold hover:underline"
          >
            <span>Tonton Live</span>
            <HiArrowRight className="text-[#1D2225]" />
          </a>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <div className="w-full h-full bg-gradient-to-br from-[#806037] to-[#B1844D] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{match.tim2.substring(0, 3)}</span>
            </div>
          </div>
          <span className="text-[#1D2225] font-bold font-['Snowstorm'] text-sm sm:text-base lg:text-lg text-center">
            {match.tim2}
          </span>
        </div>
      </div>
    </div>
  );
};

const DaftarJadwalPertandingan = () => {
  const [jadwalList, setJadwalList] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [selectedSport, setSelectedSport] = useState("Semua");

  // Form states
  const [cabang, setCabang] = useState("Sepak Bola");
  const [kategori, setKategori] = useState("Putra");
  const [tim1, setTim1] = useState("HMTPWK");
  const [tim2, setTim2] = useState("KMTETI");
  const [babak, setBabak] = useState("Semi Final");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("19:00");
  const [venue, setVenue] = useState("Lapangan Pancasila UGM");

  const cabangOptions = ["Sepak Bola", "Basket", "Voli", "Badminton", "Futsal"];
  const pilihanTim = [
    "HMTPWK", "KMTA", "KMTG", "KMTETI", "HMTF", "HMM", 
    "HME", "HIMATIKA", "HIMAFAR", "HIMAKOM"
  ];
  const pilihanBabak = ["Penyisihan", "Perempat Final", "Semi Final", "Final"];

  const filteredJadwal = selectedSport === "Semua" 
    ? jadwalList 
    : jadwalList.filter(match => match.cabang === selectedSport);

  const handleAdd = () => {
    setEditingMatch(null);
    setCabang("Sepak Bola");
    setKategori("Putra");
    setTim1("HMTPWK");
    setTim2("KMTETI");
    setBabak("Semi Final");
    setTanggal("");
    setWaktu("19:00");
    setVenue("Lapangan Pancasila UGM");
    setShowForm(true);
  };

  const handleEdit = (match) => {
    setEditingMatch(match);
    setCabang(match.cabang);
    setKategori(match.kategori);
    setTim1(match.tim1);
    setTim2(match.tim2);
    setBabak(match.babak);
    setTanggal(match.tanggal);
    setWaktu(match.waktu);
    setVenue(match.venue || "Lapangan Pancasila UGM");
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
      setJadwalList(prev => prev.filter(match => match.id !== id));
      alert("Jadwal berhasil dihapus!");
    }
  };

  const handleSave = () => {
    if (!tanggal) {
      alert("Mohon pilih tanggal pertandingan!");
      return;
    }

    const newMatch = {
      id: editingMatch ? editingMatch.id : Date.now(),
      cabang,
      kategori,
      tim1,
      tim2,
      babak,
      tanggal,
      waktu,
      venue
    };

    if (editingMatch) {
      setJadwalList(prev => prev.map(match => 
        match.id === editingMatch.id ? newMatch : match
      ));
      alert("Jadwal berhasil diperbarui!");
    } else {
      setJadwalList(prev => [...prev, newMatch]);
      alert("Jadwal berhasil ditambahkan!");
    }

    setShowForm(false);
    setEditingMatch(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMatch(null);
  };

  if (showForm) {
    return (
      <div className="flex flex-col items-center p-14 rounded-[20px]">
        {/* Header */}
        <div className="mb-1 flex justify-between items-center w-full">
          <button 
            onClick={handleCancel}
            className="px-4 py-2 bg-[#806037] text-white rounded-full hover:bg-[#9a7b5e] transition-colors"
          >
            ← Kembali
          </button>
          <div className="px-4 py-1 rounded-full shadow-md bg-[#806037]">
            <h1 className="text-lg font-normal font-['Snowstorm'] text-[#FCFCFC]">
              {editingMatch ? 'Edit' : 'Tambah'} Jadwal - {cabang} - {kategori}
            </h1>
          </div>
        </div>

        {/* Form Content */}
        <div className="w-[100%] h-[100vh] -mt-5 px-16 py-8 bg-[#B1844D] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-white flex items-center scale-y-90">
          <div className="flex-1 self-stretch flex flex-col justify-between items-center gap-6">
            {/* Judul */}
            <div className="self-stretch text-center justify-start text-[#FCFCFC] text-3xl font-normal font-['Snowstorm']">
              {editingMatch ? 'Edit' : 'Atur'} Jadwal Pertandingan
            </div>

            {/* Cabang Olahraga */}
            <div className="w-full flex flex-col justify-center items-start">
              <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Cabang Olahraga
              </div>
              <select
                value={cabang}
                onChange={(e) => setCabang(e.target.value)}
                className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
              >
                {cabangOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Kategori */}
            <div className="w-full flex flex-col justify-center items-start">
              <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                Kategori
              </div>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
              >
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
              </select>
            </div>
            
            {/* Tim 1 vs Tim 2 */}
            <div className="self-stretch inline-flex justify-center items-center gap-6">
              {/* Tim 1 */}
              <div className="flex-1 h-20 inline-flex flex-col justify-between items-center">
                <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9">
                  TIM 1
                </div>
                <select
                  value={tim1}
                  onChange={(e) => setTim1(e.target.value)}
                  className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                >
                  {pilihanTim.map(tim => (
                    <option key={tim} value={tim}>{tim}</option>
                  ))}
                </select>
              </div>
              
              <div className="justify-start text-[#FCFCFC] text-2xl font-normal font-['Sofia_Sans_Condensed']">
                VS
              </div>
              
              {/* Tim 2 */}
              <div className="flex-1 h-20 inline-flex flex-col justify-between items-center">
                <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9">
                  TIM 2
                </div>
                <select
                  value={tim2}
                  onChange={(e) => setTim2(e.target.value)}
                  className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                >
                  {pilihanTim.map(tim => (
                    <option key={tim} value={tim}>{tim}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Form Input */}
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              {/* Babak */}
              <div className="w-full flex flex-col justify-center items-start">
                <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                  Babak
                </div>
                <select
                  value={babak}
                  onChange={(e) => setBabak(e.target.value)}
                  className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                >
                  {pilihanBabak.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Tanggal */}
              <div className="w-full flex flex-col justify-center items-start">
                <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                  Tanggal
                </div>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                />
              </div>
              
              {/* Waktu */}
              <div className="w-full flex flex-col justify-center items-start">
                <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                  Waktu (WIB)
                </div>
                <input
                  type="time"
                  value={waktu}
                  onChange={(e) => setWaktu(e.target.value)}
                  className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                />
              </div>

              {/* Venue */}
              <div className="w-full flex flex-col justify-center items-start">
                <div className="self-stretch justify-start text-[#FCFCFC] text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-9 mb-1">
                  Tempat
                </div>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full h-12 px-6 bg-[#FBEBD2] rounded-full text-[#806037] text-lg font-normal font-['Sofia_Sans_Condensed'] focus:outline-none text-center"
                  placeholder="Nama tempat pertandingan"
                />
              </div>
            </div>
            
            {/* Tombol Aksi */}
            <div className="self-stretch h-14 inline-flex mx-auto justify-center items-center gap-6 mt-4 w-[60%]">
              <button 
                className="flex-1 self-stretch px-8 py-2 bg-[#065D79] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#0a7a9a] transition-colors"
                onClick={handleSave}
              >
                <div className="justify-start text-[#F0EED7] text-xl font-bold font-['Sofia_Sans_Condensed']">
                  {editingMatch ? 'Update' : 'Simpan'}
                </div>
                <IoSaveSharp className="w-5 h-5 text-[#F0EED7]" />
              </button>
              
              <button 
                className="flex-1 self-stretch px-8 py-2 bg-[#806037] rounded-full outline-[1.5px] outline-offset-[-1.5px] outline-[#F0EED7] flex justify-center items-center gap-2 overflow-hidden hover:bg-[#9a7b5e] transition-colors"
                onClick={handleCancel}
              >
                <div className="justify-start text-[#F0EED7] text-xl font-bold font-['Sofia_Sans_Condensed']">
                  Batal
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
            src: url('/fonts/Snowstorm-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          
          @font-face {
            font-family: 'Sofia_Sans_Condensed';
            src: url('/fonts/SofiaSansCondensed-Regular.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          
          @font-face {
            font-family: 'Sofia_Sans_Condensed';
            src: url('/fonts/SofiaSansCondensed-Bold.woff2') format('woff2');
            font-weight: bold;
            font-style: normal;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-14 rounded-[20px]">
      {/* Header */}
      <div className="mb-1 flex justify-between items-center w-full">
        <div className="px-4 py-1 rounded-full shadow-md bg-[#806037]">
          <h1 className="text-lg font-normal font-['Snowstorm'] text-[#FCFCFC]">
            Daftar Jadwal Pertandingan
          </h1>
        </div>
        <button 
          onClick={handleAdd}
          className="px-6 py-3 bg-[#065D79] rounded-full shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center gap-2 hover:bg-[#0a7a9a] transition-colors"
        >
          <HiPlus className="w-5 h-5 text-white" />
          <span className="text-white font-bold font-['Sofia_Sans_Condensed']">Tambah Jadwal</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-[100%] min-h-[80vh] -mt-5 px-16 py-8 bg-[#B1844D] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-[3px] outline-offset-[-3px] outline-white">
        {/* Filter */}
        <div className="mb-6 flex justify-center">
          <div className="flex gap-2 bg-[#FBEBD2] rounded-full p-2">
            {["Semua", ...cabangOptions].map(sport => (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`px-4 py-2 rounded-full font-['Sofia_Sans_Condensed'] font-bold transition-colors ${
                  selectedSport === sport 
                    ? 'bg-[#065D79] text-white' 
                    : 'text-[#806037] hover:bg-[#e6d9c0]'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Jadwal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJadwal.length > 0 ? (
            filteredJadwal.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match} 
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-[#FCFCFC] text-xl font-['Sofia_Sans_Condensed'] py-12">
              {selectedSport === "Semua" 
                ? "Belum ada jadwal pertandingan" 
                : `Belum ada jadwal untuk ${selectedSport}`}
            </div>
          )}
        </div>
      </div>

      {/* Font Styles */}
      <style jsx global>{`
        @font-face {
          font-family: 'Snowstorm';
          src: url('/fonts/Snowstorm-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'Sofia_Sans_Condensed';
          src: url('/fonts/SofiaSansCondensed-Regular.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
        }
        
        @font-face {
          font-family: 'Sofia_Sans_Condensed';
          src: url('/fonts/SofiaSansCondensed-Bold.woff2') format('woff2');
          font-weight: bold;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default DaftarJadwalPertandingan;