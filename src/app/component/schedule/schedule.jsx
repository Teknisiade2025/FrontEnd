"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IoChevronDownSharp } from "react-icons/io5";

const Schedule = () => {
  const [selectedDropdown, setSelectedDropdown] = useState("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Mendatang");
  const dropdownRef = useRef(null);

  const dropdownOptions = ["Semua", "KMHM", "KMFT", "KMTETI", "KMKMTG"];

  const scheduleData = [
    {
      id: 1,
      date: "2025-08-01T19:00:00",
      venue: "Gor Kridosono",
      teamA: { name: "KMHM", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMTETI", logo: "https://placehold.co/80x80" },
    },
    {
      id: 2,
      date: "2025-07-01T20:00:00",
      venue: "Gor Amongrogo",
      teamA: { name: "KMFT", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMTETI", logo: "https://placehold.co/80x80" },
    },
    {
      id: 3,
      date: "2025-07-01T20:00:00",
      venue: "Gor Amongrogo",
      teamA: { name: "KMFT", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMHM", logo: "https://placehold.co/80x80" },
    },
    {
      id: 4,
      date: "2025-07-01T20:00:00",
      venue: "Gor Amongrogo",
      teamA: { name: "KMFT", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMHM", logo: "https://placehold.co/80x80" },
    },
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
    <div className="w-full px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center w-full gap-6">
          {/* Gambar Jadwal */}
          <div className="flex justify-center items-center w-full">
            <img
              src="/subcabang/schedule.svg"
              alt="Schedule"
              className="w-[300px] h-auto object-contain"
            />
          </div>

          {/* Main Container: DITENGAH */}
          <div className="w-full max-w-[800px] mx-auto h-[440px] p-[30px] bg-[#FAEDDABD] shadow-md rounded-[40px] flex flex-col gap-6">
            <style jsx>{`
              .matches-scrollbar::-webkit-scrollbar {
                width: 12px;
              }

              .matches-scrollbar::-webkit-scrollbar-track {
                background: rgba(251, 235, 210, 0.3);
                border-radius: 10px;
              }

              .matches-scrollbar::-webkit-scrollbar-thumb {
                background-color: #806037;
                border-radius: 10px;
                border: 2px solid rgba(250, 237, 218, 0.7);
              }

              .matches-scrollbar::-webkit-scrollbar-thumb:hover {
                background-color: #6B4E2A;
              }

              .matches-scrollbar {
                scrollbar-color: #806037 rgba(251, 235, 210, 0.3);
                scrollbar-width: thin;
              }
            `}</style>

            {/* Header Filter */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between gap-2 bg-[#806037] text-[#FBEBD2] px-6 py-2 rounded-full shadow-md font-sofia font-extrabold text-[18px] min-w-[140px]"
                >
                  {selectedDropdown}
                  <IoChevronDownSharp size={18} />
                </button>
                <div
                  className={`absolute left-0 mt-2 w-full bg-[#FBEBD2] rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10 ${
                    isDropdownOpen
                      ? "max-h-[500px] opacity-100 translate-y-1"
                      : "max-h-0 opacity-0 -translate-y-2"
                  }`}
                >
                  <ul className="flex flex-col px-4 py-2 text-[#1D2225]">
                    {dropdownOptions.map((option, idx) => (
                      <li
                        key={idx}
                        className="cursor-pointer py-1 hover:underline"
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
              <div className="flex flex-wrap justify-center gap-2 px-4 py-2 rounded-full bg-[#1D2225] shadow-md w-full md:w-auto">
                {["Mendatang", "Selesai"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`px-6 py-2 font-sofia font-extrabold text-sm md:text-[16px] rounded-full ${
                      selectedTab === tab
                        ? "bg-[#806037] text-[#FBEBD2]"
                        : "bg-[#1D2225] text-[#FBEBD2]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Match Cards */}
            <div
              className="flex flex-col gap-4 overflow-y-auto matches-scrollbar pr-2"
              style={{ maxHeight: "240px" }}
            >
              {displayedMatches.length > 0 ? (
                displayedMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="text-center text-[#1D2225] font-sofia font-bold text-lg mt-4">
                  Tidak ada jadwal untuk tim ini.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchCard = ({ match }) => {
  return (
    <div className="w-full p-4 bg-[#5F56487F] shadow-md rounded-[30px] flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Team A */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center overflow-hidden">
          {/* <img src={match.teamA.logo} alt={match.teamA.name} /> */}
        </div>
        <span className="text-[#1D2225] font-bold font-snowstorm text-[20px]">{match.teamA.name}</span>
      </div>

      {/* Info */}
      <div className="flex flex-col items-center text-center gap-2">
        <p className="text-[#1D2225] text-[18px] font-[Snowstorm] font-bold leading-[135%]">
          SEPAK BOLA - PENYISIHAN
        </p>
        <p className="text-[#1D2225] font-sofia text-[14px] font-normal">
          {new Date(match.date).toLocaleString("id-ID", {
            weekday: "short",
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          })} WIB
        </p>
        <p className="text-[#1D2225] font-sofia text-[14px] font-normal">{match.venue}</p>
        <div className="flex items-center gap-3 text-[#1D2225] text-[32px] font-snowstorm">
          <span>0</span>
          <span>:</span>
          <span>0</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-[#1D2225] text-[14px] font-sofia font-bold">Tonton Live</span>
          <HiArrowRight className="text-[#1D2225] text-[16px]" />
        </div>
      </div>

      {/* Team B */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center overflow-hidden">
          {/* <img src={match.teamB.logo} alt={match.teamB.name} /> */}
        </div>
        <span className="text-[#1D2225] font-bold font-snowstorm text-[20px]">{match.teamB.name}</span>
      </div>
    </div>
  );
};

export default Schedule;
