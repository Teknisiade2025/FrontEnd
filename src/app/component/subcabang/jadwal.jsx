"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IoChevronDownSharp } from "react-icons/io5";

const Jadwal = () => {
  const [selectedDropdown, setSelectedDropdown] = useState("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Mendatang");
  const dropdownRef = useRef(null);

  const dropdownOptions = ["Semua", "HMTPWK", "KMTA", "KMTG", "KMTSL", "HMTG", "HMTI", "KMTETI", "KMTNTF", "KMTM", "KMTK"];


  const scheduleData = [
  //   {
  //     id: 1,
  //     date: "2025-08-01T19:00:00",
  //     venue: "Gor Kridosono",
  //     teamA: { name: "KMHM", logo: "https://placehold.co/80x80" },
  //     teamB: { name: "KMTETI", logo: "https://placehold.co/80x80" },
  //   },
  //   {
  //     id: 2,
  //     date: "2025-07-01T20:00:00",
  //     venue: "Gor Amongrogo",
  //     teamA: { name: "KMFT", logo: "https://placehold.co/80x80" },
  //     teamB: { name: "KMTETI", logo: "https://placehold.co/80x80" },
  //   },
  //   {
  //     id: 3,
  //     date: "2025-07-01T20:00:00",
  //     venue: "Gor Amongrogo",
  //     teamA: { name: "KMFT", logo: "https://placehold.co/80x80" },
  //     teamB: { name: "KMHM", logo: "https://placehold.co/80x80" },
  //   },
  //   {
  //     id: 4,
  //     date: "2025-07-01T20:00:00",
  //     venue: "Gor Amongrogo",
  //     teamA: { name: "KMFT", logo: "https://placehold.co/80x80" },
  //     teamB: { name: "KMHM", logo: "https://placehold.co/80x80" },
  //   },
  ];

  const filteredSchedule = scheduleData.filter((match) => {
    if (selectedDropdown === "Semua") return true;
    return match.teamA.name === selectedDropdown || match.teamB.name === selectedDropdown;
  });

  const now = new Date();
  const isUpcoming = (date) => new Date(date) > now;

  const displayedMatches = filteredSchedule.filter((match) =>
    selectedTab === "Mendatang" ? isUpcoming(match.date) : !isUpcoming(match.date)
  );

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
                  isDropdownOpen ? "max-h-[350px] opacity-100 translate-y-1" : "max-h-0 opacity-0 -translate-y-2"
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
                    selectedTab === tab ? "bg-[#806037] text-[#FBEBD2]" : "bg-[#1D2225] text-[#FBEBD2] hover:bg-[#2a2f33]"
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
              displayedMatches.map((match) => <MatchCard key={match.id} match={match} />)
            ) : (
              <div className="flex items-center justify-center h-screen">
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
        <div className="text-[#1D2225] font-[Snowstorm] text-sm sm:text-base md:text-xl font-bold">
          BABAK PENYISIHAN
        </div>
      </div>
      {/* Baris 2: Logo A | Info Tengah | Logo B */}
      <div className="flex flex-row justify-between items-center gap-2 sm:gap-4">
        {/* Team A */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <img src={match.teamA.logo} alt={match.teamA.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-[#1D2225] font-bold font-snowstorm text-sm sm:text-base md:text-xl text-center">
            {match.teamA.name}
          </span>
        </div>

        {/* Info Tengah */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-6 mx-auto flex-1 min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]">
          <div  className="flex flex-col items-center text-center ">
          <p className="text-[#1D2225] self-stretch h-5 text-sm sm:text-lg font-sofia font-extrabold">
            {new Date(match.date).toLocaleString("id-ID", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            WIB
          </p>
          <p className="text-[#1D2225] font-sofia font-extrabold text-sm sm:text-lg">{match.venue}</p>
          </div>
          <div className="text-[#1D2225] font-extrabold text-lg sm:text-4xl lg:text-5xl font-snowstorm">V/S</div>
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:underline">
            <span className="flex items-center gap-1 text-[#1D2225] font-sofia font-bold text-sm sm:text-lg cursor-pointer hover:underline">Tonton Live</span>
            <HiArrowRight className="text-[#1D2225] text-xs sm:text-sm" />
          </div>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <img src={match.teamB.logo} alt={match.teamB.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-[#1D2225] font-bold font-snowstorm text-sm sm:text-base md:text-xl text-center">
            {match.teamB.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Jadwal;