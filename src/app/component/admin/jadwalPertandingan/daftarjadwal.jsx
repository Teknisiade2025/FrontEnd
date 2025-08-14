"use client";

import React, { useState, useEffect } from "react";
import { BsCalendar2PlusFill, BsXCircleFill } from "react-icons/bs";
import { IoSaveSharp } from "react-icons/io5";
import { HiArrowRight, HiPencil, HiTrash, HiPlus } from "react-icons/hi";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase";
import InputJadwalOlahraga from "./page";


// Logo mapping untuk demo
const teamLogos = {
  "HMTPWK": "/logoKMHM/HMTPWK.svg",
  "KMTETI": "/logoKMHM/KMTETI.svg",
  "KMTA": "/logoKMHM/KMTA.svg",
  "KMTG": "/logoKMHM/KMTG.svg",
  "KMTK": "/logoKMHM/KMTK.svg",
  "KMTM": "/logoKMHM/KMTM.svg",
  "KMTNTF": "/logoKMHM/KMTNTF.svg",
  "KMTSL": "/logoKMHM/KMTSL.svg",
  "HMTI": "/logoKMHM/HMTI.svg",
  "HMTG": "/logoKMHM/HMTG.svg"
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

  const getLogo = (teamName) => {
    return teamLogos[teamName.toUpperCase()] || null;
  };

  const renderTeam = (teamName) => {
    const logo = getLogo(teamName);
    return (
      <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
        <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
          {logo ? (
            <img
              src={logo}
              alt={teamName}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#806037] to-[#B1844D] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">
                {teamName.substring(0, 3)}
              </span>
            </div>
          )}
        </div>
        <span className="text-[#1D2225] font-bold font-['Snowstorm'] text-sm sm:text-base lg:text-lg text-center">
          {teamName}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full p-5 md:p-6 bg-[#FBEBD2] shadow-md rounded-[42px] flex flex-col gap-2 relative">
      {/* Action Buttons */}
      <div className="absolute top-8 right-7 flex gap-2">
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
      <div className="text-center mt-4 ">
        <div className="text-[#1D2225] text-base md:text-lg font-['Snowstorm'] flex flex-col items-center font-bold leading-[135%] text-center">
          <span>{match.cabang.toUpperCase()} - {match.kategori.toUpperCase()}</span>
          <span>BABAK {match.babak.toUpperCase()}</span>
        </div>
      </div>

      {/* Baris Logo & Info */}
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-6">
        {renderTeam(match.tim1)}

        {/* Info Tengah */}
        <div className="flex flex-col items-center text-center justify-center gap-3 sm:gap-6 mx-1 w-[200px]">
          <div className="flex flex-col items-center text-center">
            <p className="text-[#1D2225] font-['Sofia_Sans_Condensed'] text-sm md:text-base font-normal">
              {formatDate(match.tanggal)}, {match.waktu} WIB
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

        {renderTeam(match.tim2)}
      </div>
    </div>
  );
};


const JadwalOlahraga = ({ cabang, kategori }) => {
  const [jadwalList, setJadwalList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  // State form
  const [tim1, setTim1] = useState("HMTPWK");
  const [tim2, setTim2] = useState("KMTETI");
  const [babak, setBabak] = useState("Semi Final");
  const [tanggal, setTanggal] = useState("");
  const [waktu, setWaktu] = useState("19:00");
  const [currentCabang, setCabang] = useState(cabang);
  const [currentKategori, setKategori] = useState(kategori);

  const cabangOptions = ["Basket", "Sepak Bola", "Bulu Tangkis"];
  const pilihanTim = ["HMTPWK",
  "KMTA",
  "KMTG",
  "KMTSL",
  "HMTG",
  "HMTI",
  "KMTETI",
  "KMTNTF",
  "KMTM",
  "KMTK"];
  const pilihanBabak = ["Penyisihan", "Perempat Final", "Semi Final", "Final"];

  // Fetch data dari Supabase
  const fetchJadwal = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("jadwal_pertandingan")
        .select("*")
        .eq("cabang", cabang)
        .eq("kategori", kategori)
        .order("tanggal", { ascending: true })
        .order("waktu", { ascending: true });

      if (error) throw error;
      setJadwalList(data || []);
      if (!initialFetchDone) setInitialFetchDone(true);
    } catch (err) {
      setError("Gagal memuat jadwal: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTanggal = (tgl) => {
  // Dari "DD/MM/YYYY" ke "YYYY-MM-DD"
  const [day, month, year] = tgl.split("/");
  return `${year}-${month}-${day}`;
};

  // Save (add/edit)
  const handleSave = async () => {
    if (!tanggal) {
      alert("Mohon pilih tanggal pertandingan!");
      return;
    }

    const matchData = {
      cabang: currentCabang,
      kategori: currentKategori,
      tim1,
      tim2,
      babak,
      tanggal: formatTanggal(tanggal),
      waktu,
      
    };

    try {
      if (editingMatch) {
        const { error } = await supabase
          .from("jadwal_pertandingan")
          .update(matchData)
          .eq("id", editingMatch.id);

        if (error) throw error;

        setJadwalList((prev) =>
          prev.map((match) =>
            match.id === editingMatch.id ? { ...match, ...matchData } : match
          )
        );
        alert("Jadwal berhasil diperbarui!");
      } else {
        const { data, error } = await supabase
          .from("jadwal_pertandingan")
          .insert([matchData])
          .select();

        if (error) throw error;

        setJadwalList((prev) => [...prev, ...data]);
        alert("Jadwal berhasil ditambahkan!");
      }
    } catch (err) {
      alert("Gagal menyimpan jadwal: " + err.message);
    }

    setShowForm(false);
    setEditingMatch(null);
  };

  // Delete
  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus jadwal ini?")) {
      try {
        const { error } = await supabase
          .from("jadwal_pertandingan")
          .delete()
          .eq("id", id);

        if (error) throw error;

        setJadwalList((prev) => prev.filter((match) => match.id !== id));
        alert("Jadwal berhasil dihapus!");
      } catch (err) {
        alert("Gagal menghapus jadwal: " + err.message);
      }
    }
  };

  // Cancel
  const handleCancel = () => {
    setEditingMatch(null);
    setCabang(cabang);
    setKategori(kategori);
    setTim1("HMTPWK");
    setTim2("KMTETI");
    setBabak("Semi Final");
    setTanggal("");
    setWaktu("19:00");
    
    setShowForm(false);
  };

  const handleAdd = () => {
    handleCancel(); // reset form
    setShowForm(true);
  };

  const handleEdit = (match) => {
    setEditingMatch(match);
    setCabang(match.cabang);
    setKategori(match.kategori);
    setTim1(match.tim1);
    setTim2(match.tim2);
    setBabak(match.babak);
    setTanggal(formatTanggalForInput(match.tanggal));
    setWaktu(match.waktu);
    
    setShowForm(true);
  };

  const formatTanggalForInput = (tgl) => {
  // Dari "YYYY-MM-DD" ke "DD/MM/YYYY"
  const [year, month, day] = tgl.split("-");
  return `${day}/${month}/${year}`;
};

  useEffect(() => {
    if (cabang && kategori) {
      fetchJadwal();
    }
  }, [cabang, kategori]);

  // Jika sedang tampil form
  if (showForm) {
    return (
      <InputJadwalOlahraga
        editingMatch={editingMatch}
        cabang={currentCabang}
        setCabang={setCabang}
        kategori={currentKategori}
        setKategori={setKategori}
        tim1={tim1}
        setTim1={setTim1}
        tim2={tim2}
        setTim2={setTim2}
        babak={babak}
        setBabak={setBabak}
        tanggal={tanggal}
        setTanggal={setTanggal}
        waktu={waktu}
        setWaktu={setWaktu}
        handleSave={handleSave}
        handleCancel={handleCancel}
        cabangOptions={cabangOptions}
        pilihanTim={pilihanTim}
        pilihanBabak={pilihanBabak}
      />
    );
  }


  return (
    <div className="flex flex-col items-center p-14 rounded-[20px]">
      

      {/* Main Content */}
      {loading ? (
        <div className="w-full text-center py-10 text-white">
          Memuat data...
        </div>
      ) : (
        <div className="flex flex-col gap-6 w-full min-h-[80vh] mt-5 px-16 py-8  rounded-[32px] shadow-lg"
        style={{
          width: "900px",
          height: "605px",
          backgroundColor: "#806037",
          border: "3px solid #FFFFFF",}}>
            {/* Header */}
      <div className="mb-1 flex justify-between items-center w-full">

        <button 
          onClick={handleAdd}
          className="px-6 py-3 bg-[#065D79] rounded-full shadow-md flex items-center gap-2 hover:bg-[#0a7a9a] transition-colors"
        >
          <HiPlus className="w-5 h-5 text-white" />
          <span className="text-white font-bold">Tambah Jadwal</span>
        </button>
      </div>
          <div className="flex flex-col gap-6 overflow-y-auto max-h-[500px]">
            {jadwalList.length > 0 ? (
              jadwalList.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-white text-xl py-12">
                Belum ada jadwal pertandingan untuk {cabang} {kategori}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalOlahraga;