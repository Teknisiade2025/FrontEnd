"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IoChevronDownSharp } from "react-icons/io5";
import { useSearchParams } from 'next/navigation';
import { supabase } from "@/app/lib/supabase";

const Jadwal = () => {
  const searchParams = useSearchParams();
  const nama = searchParams.get("nama")?.toUpperCase() || "";

  const [selectedDropdown, setSelectedDropdown] = useState("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Mendatang");
  const [scheduleData, setScheduleData] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState(["Semua"]);
  const dropdownRef = useRef(null);

  const [matchData, setMatchData] = useState(null);

  // Fetch data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("jadwal").select("*");
      if (error) {
        console.error("Supabase error:", error);
      } else {
        // Filter berdasarkan cabang
        const filteredByCabang = (data || []).filter(
          (item) => item.cabang?.toUpperCase().trim() === nama.trim()
        );

        setScheduleData(filteredByCabang);

        // Buat dropdown tim unik
        const teams = new Set();
        filteredByCabang.forEach(
          (item) => item.tim1 && teams.add(item.tim1.toUpperCase())
        );
        filteredByCabang.forEach(
          (item) => item.tim2 && teams.add(item.tim2.toUpperCase())
        );

        setDropdownOptions(["Semua", ...Array.from(teams)]);
      }
    };

    fetchData();
  }, [nama]);

  // Tentukan match hari ini
  useEffect(() => {
    if (!scheduleData || scheduleData.length === 0) return;

    const today = new Date();
    const todayMatches = scheduleData.filter((m) => {
      const matchDate = new Date(`${m.tanggal}T${m.waktu}`);
      return (
        matchDate.getFullYear() === today.getFullYear() &&
        matchDate.getMonth() === today.getMonth() &&
        matchDate.getDate() === today.getDate()
      );
    });

    if (todayMatches.length > 0) {
      const m = todayMatches[0];
      setMatchData({
        date: new Date(`${m.tanggal}T${m.waktu}`).toLocaleString("id-ID", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }) + " WIB",
        teamA: {
          name: m.tim1?.toUpperCase() ?? "TEAM A",
          logo: `/logoKMHM/${m.tim1?.toUpperCase() ?? "default"}.svg`,
        },
        teamB: {
          name: m.tim2?.toUpperCase() ?? "TEAM B",
          logo: `/logoKMHM/${m.tim2?.toUpperCase() ?? "default"}.svg`,
        },
        scoreA: m.skor_tim1 ?? 0,
        scoreB: m.skor_tim2 ?? 0,
        babak: m.babak ?? "",
        kategori: m.kategori ?? "",
      });
    } else {
      setMatchData(null);
    }
  }, [scheduleData]);

  // Filter schedule berdasarkan dropdown tim
  const filteredSchedule = scheduleData.filter((match) => {
    if (selectedDropdown === "Semua") return true;
    return (
      match.tim1?.toUpperCase() === selectedDropdown ||
      match.tim2?.toUpperCase() === selectedDropdown
    );
  });

  const now = new Date();
  const isUpcoming = (match) => {
    const matchDate = new Date(`${match.tanggal}T${match.waktu}`);
    return matchDate >= now;
  };

  const displayedMatches = filteredSchedule.filter((match) =>
    selectedTab === "Mendatang" ? isUpcoming(match) : !isUpcoming(match)
  );

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-stretch gap-5 sm:gap-50 px-4 sm:px-14 max-w-7xl mx-auto">
        {/* Gambar Jadwal */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-start lg:min-w-[200px] lg:self-stretch">
          <div className="h-full flex items-center justify-center py-6">
            <img
              src="/subcabang/schedule.svg"
              alt="Schedule"
              className="w-[180px] sm:w-[240px] lg:w-[300px] h-auto object-contain"
            />
          </div>
        </div>

        {/* Main Container */}
        <div className="flex-1 w-full h-auto lg:h-[500px] p-6 lg:p-8 bg-[#FAEDDABD] shadow-lg rounded-[47px] flex flex-col gap-6">
          <style jsx>{`
            .matches-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .matches-scrollbar::-webkit-scrollbar-track {
              background: rgba(251, 235, 210, 0.3);
              border-radius: 8px;
              margin: 8px 0;
            }
            .matches-scrollbar::-webkit-scrollbar-thumb {
              background-color: #806037;
              border-radius: 8px;
              border: 1px solid rgba(250, 237, 218, 0.7);
              min-height: 30px;
            }
            .matches-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #6b4e2a;
            }
            .matches-scrollbar {
              scrollbar-color: #806037 rgba(251, 235, 210, 0.3);
              scrollbar-width: thin;
            }
          `}</style>

          {/* Header Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Dropdown */}
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between gap-3 bg-[#806037] text-[#FBEBD2] px-5 py-3 rounded-full shadow-md font-sofia font-extrabold text-base w-full sm:w-auto sm:min-w-[160px]"
              >
                {selectedDropdown}
                <IoChevronDownSharp size={16} />
              </button>
              <div
                className={`absolute left-0 mt-2 w-full bg-[#FBEBD2] rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10 ${
                  isDropdownOpen
                    ? "max-h-[350px] opacity-100 translate-y-1"
                    : "max-h-0 opacity-0 -translate-y-2"
                }`}
              >
                <ul className="font-sofia text-base font-extrabold flex flex-col px-4 py-3 text-[#1D2225] ">
                  {dropdownOptions.map((option, idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer py-1 hover:underline text-sm font-medium"
                      onClick={() => {
                        setSelectedDropdown(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-around md:gap-1 px-1 py-1 rounded-full bg-[#1D2225] item-center shadow-md w-full sm:w-auto">
              {["Mendatang", "Selesai"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`w-[150px] py-2.5 font-sofia font-extrabold text-base rounded-full transition-all duration-200 ${
                    selectedTab === tab
                      ? "bg-[#806037] text-[#FBEBD2]"
                      : "bg-[#1D2225] text-[#FBEBD2] hover:bg-[#2a2f33]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Matches */}
          <div
            className="flex flex-col gap-4 overflow-y-auto matches-scrollbar pr-2"
            style={{ maxHeight: "380px" }}
          >
            {displayedMatches.length > 0 ? (
              displayedMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-center text-[#1D2225] font-sofia font-bold text-lg mt-8">
                  Tidak ada jadwal untuk pertandingan ini.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchCard = ({ match }) => {
  return (
    <div className="w-full px-3 py-4 sm:px-16 sm:py-6 bg-[#5F56487F] shadow-md rounded-[38px] flex flex-col gap-1 sm:gap-1">
      {/* Judul Pertandingan */}
      <div className="text-center">
        <div className="text-[#1D2225] font-[Snowstorm] self-stretch h-5 text-sm sm:text-base md:text-xl font-bold">
          SEPAK BOLA - PUTRI
        </div>
        <div className="text-[#1D2225] font-[Snowstorm] text-xs sm:text-sm font-semibold">
          {match.babak}
        </div>
      </div>

      {/* Tim & Skor */}
      <div className="flex items-center justify-between gap-5 sm:gap-10 py-2 sm:py-4">
        {/* Team A */}
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
          <img
            src={match.teamA.logo}
            alt={match.teamA.name}
            className="w-10 sm:w-14 h-10 sm:h-14 object-contain"
          />
          <p className="text-[#1D2225] font-sofia font-extrabold text-sm sm:text-lg">
            {match.teamA.name}
          </p>
        </div>

        {/* Skor */}
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
          <p className="text-[#1D2225] font-sofia font-extrabold text-base sm:text-xl">
            {match.scoreA} - {match.scoreB}
          </p>
          <p className="text-[#1D2225] font-sofia font-medium text-xs sm:text-sm">
            {match.kategori}
          </p>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center justify-center gap-2 sm:gap-3">
          <img
            src={match.teamB.logo}
            alt={match.teamB.name}
            className="w-10 sm:w-14 h-10 sm:h-14 object-contain"
          />
          <p className="text-[#1D2225] font-sofia font-extrabold text-sm sm:text-lg">
            {match.teamB.name}
          </p>
        </div>
      </div>

      {/* Tanggal & Waktu */}
      <div className="flex justify-center items-center gap-2 sm:gap-3">
        <p className="text-[#1D2225] font-sofia font-extrabold text-xs sm:text-sm">
          {new Date(match.date).toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          WIB
        </p>
      </div>
    </div>
  );
};

export default Jadwal;
