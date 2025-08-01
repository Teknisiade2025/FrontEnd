"use client";

import React, { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IoChevronDownSharp } from "react-icons/io5";

const Jadwal = () => {
  const [selectedDropdown, setSelectedDropdown] = useState("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownOptions = {
  Olahraga: ["Sepak Bola", "Futsal", "Mobile Legends", "valorant",
              "Voli", "Tenis Meja", "FIFA", "Atletik",
              "Badminton", "Basket", "catur", "PUBG"],
  Seni: ["Band", "Tari Tradisional", "Cipta Puisi", "Fotografi",
          "Vokal Grup", "Dance", "Poster", "Seni Lukis", 
          "Solo Vokal", "Monolog" ],
  };

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

  const displayedMatches = filteredSchedule;

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
    <div className="w-full px-3 py-8 overflow-x-hidden">
  <div className="w-full  mx-auto flex flex-col items-center">
      {/* Schedule Image - Positioned at Top */}
      <div className="mb-8">
        <img
          src="/subcabang/schedule.svg"
          alt="Schedule"
          className="w-[200px] sm:w-[280px] md:w-[350px] h-auto object-contain"
        />
      </div>

      {/* Main Container - Centered and Wider */}
      <div className="w-full  h-auto md:h-[520px] p-6 md:p-8 bg-[#FAEDDABD] shadow-lg rounded-[30px] flex flex-col gap-6">
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

        {/* Dropdown Filter - Full Width */}
        <div className="w-full" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between gap-3 bg-[#806037] text-[#FBEBD2] px-6 sm:py-3 py:6 rounded-full shadow-md font-sofia font-extrabold text-base"
            >
              {selectedDropdown}
              <IoChevronDownSharp size={16} />
            </button>

            <div
              className={`absolute left-0 mt-2 w-full bg-[#FBEBD2] rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-10 ${
                isDropdownOpen ? "max-h-[200px] sm:max-h-[300px] overflow-y-auto opacity-100 translate-y-1" : "max-h-0 opacity-0 -translate-y-2"
              }`}
            >
              <div className="grid grid-cols-2 gap-6 p-6 text-[#1D2225]">
                {/* Olahraga Column */}
                <div>
                  <h3 className="font-bold text-base mb-3 text-[#806037]">Olahraga</h3>
                  <ul className="flex flex-col gap-2">
                    {dropdownOptions.Olahraga.map((option, idx) => (
                      <li
                        key={`olahraga-${idx}`}
                        className="cursor-pointer hover:underline text-sm py-1 hover:text-[#806037] transition-colors"
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

                {/* Seni Column */}
                <div>
                  <h3 className="font-bold text-base mb-3 text-[#806037]">Seni</h3>
                  <ul className="flex flex-col gap-2">
                    {dropdownOptions.Seni.map((option, idx) => (
                      <li
                        key={`seni-${idx}`}
                        className="cursor-pointer hover:underline text-sm py-1 hover:text-[#806037] transition-colors"
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
            </div>
          </div>
        </div>

        {/* Matches */}
        <div
          className="flex flex-col gap-4 overflow-y-auto matches-scrollbar pr-2"
          style={{ maxHeight: "420px" }}
        >
          {displayedMatches.length > 0 ? (
            displayedMatches.map((match) => <MatchCard key={match.id} match={match} />)
          ) : (
            <div className="text-center text-[#1D2225] font-sofia font-bold text-lg mt-8">
              Tidak ada jadwal untuk tim ini.
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
    <div className="w-full px-3 py-4 sm:px-6 sm:py-6 bg-[#5F56487F] shadow-md rounded-[20px] flex flex-col gap-4">
      {/* Judul Pertandingan */}
  <div className="text-center">
    <div className="text-[#1D2225] font-[Snowstorm] text-sm sm:text-base md:text-lg font-bold">
      SEPAK BOLA - PUTRI
    </div>
    <div className="text-[#1D2225] font-[Snowstorm] text-sm sm:text-base md:text-lg font-bold">
      BABAK PENYISIHAN
    </div>
  </div>


      {/* Baris 2: Logo A | Info Tengah | Logo B */}
      <div className="flex flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Team A */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <img src={match.teamA.logo} alt={match.teamA.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-[#1D2225] font-bold font-snowstorm text-xs sm:text-sm lg:text-base text-center">
            {match.teamA.name}
          </span>
        </div>

        {/* Info Tengah */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-6 mx-auto flex-1 min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]">
          <div  className="flex flex-col items-center text-center ">
          <p className="text-[#1D2225] font-sofia text-xs sm:text-sm font-normal">
            {new Date(match.date).toLocaleString("id-ID", {
              weekday: "short",
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            WIB
          </p>
          <p className="text-[#1D2225] font-sofia text-xs sm:text-sm">{match.venue}</p>
          </div>
          <div className="text-[#1D2225] font-extrabold text-lg sm:text-2xl lg:text-3xl font-snowstorm">V/S</div>
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:underline">
            <span className="text-[#1D2225] text-xs sm:text-sm font-sofia font-bold">Tonton Live</span>
            <HiArrowRight className="text-[#1D2225] text-xs sm:text-sm" />
          </div>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <img src={match.teamB.logo} alt={match.teamB.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-[#1D2225] font-bold font-snowstorm text-xs sm:text-sm lg:text-base text-center">
            {match.teamB.name}
          </span>
        </div>
      </div>
    </div>
  );
};


export default Jadwal;