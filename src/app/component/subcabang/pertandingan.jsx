"use client";

import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";

const Pertandingan = () => {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const matchData = {
    date: "29 Februari, 19.00 WIB",
    venue: "Gor Kridosono",
    teamA: {
      name: "KMHM",
      logo: "/supreme-planner-logo.png",
    },
    teamB: {
      name: "KMHM",
      logo: "/supermesin-logo.png",
    },
    scoreA: 0,
    scoreB: 0,
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full px-3 sm:px-6 py-8">
      {/* Judul */}
      <h1 className="text-center text-[#1D2225] font-[Snowstorm_Bold] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none w-full">
        SEPAK BOLA
      </h1>

      {/* Live Indicator */}
      <div className="flex flex-row items-center gap-2">
        <div
          className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#FF0000] ${
            pulse ? "animate-pulse" : ""
          }`}
        />
        <div className="text-[#1D2225] text-base sm:text-lg md:text-xl font-[Sofia_Sans] drop-shadow-md">
          Next Match
        </div>
      </div>

      {/* Kartu Pertandingan */}
      <div className="w-full max-w-4xl rounded-[20px] sm:rounded-[30px] bg-[#F1E0C4] shadow-md px-3 py-4 sm:px-6 sm:py-6 flex flex-row justify-between items-center gap-2 sm:gap-4">
        {/* Tim A */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-none">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
            {/* <img src={matchData.teamA.logo} alt="Team A Logo" className="object-contain w-[90%]" /> */}
          </div>
          <div className="text-[#1D2225] text-center font-[Snowstorm] text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
            {matchData.teamA.name}
          </div>
        </div>

        {/* Info Pertandingan */}
        <div className="flex flex-col items-center gap-1 text-center flex-1 px-2">
          <div className="text-[#1D2225] font-[Snowstorm] text-xs sm:text-sm md:text-base font-bold">
            SEPAK BOLA
          </div>
          <div className="text-[#1D2225] font-[Snowstorm] text-xs sm:text-sm md:text-base font-bold">
            BABAK PENYISIHAN
          </div>
          <div className="text-[#1D2225] font-[Sofia_Sans] text-xs sm:text-sm">
            {matchData.date}
          </div>
          <div className="text-[#1D2225] font-[Sofia_Sans] text-xs sm:text-sm">
            {matchData.venue}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 my-1 sm:my-2">
            <span className="text-[#1D2225] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Snowstorm_Bold]">
              {matchData.scoreA}
            </span>
            <span className="text-[#1D2225] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Snowstorm_Bold]">
              :
            </span>
            <span className="text-[#1D2225] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Snowstorm_Bold]">
              {matchData.scoreB}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#1D2225] font-[Sofia_Sans] font-bold text-xs sm:text-sm md:text-base cursor-pointer hover:underline">
            Tonton Live
            <HiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        </div>

        {/* Tim B */}
        <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-[100px] sm:max-w-none">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
            {/* <img src={matchData.teamB.logo} alt="Team B Logo" className="object-contain w-[90%]" /> */}
          </div>
          <div className="text-[#1D2225] text-center font-[Snowstorm] text-xs sm:text-sm md:text-base lg:text-lg leading-tight">
            {matchData.teamB.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pertandingan;