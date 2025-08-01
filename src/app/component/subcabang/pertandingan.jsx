"use client";

import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSearchParams } from 'next/navigation'

const Pertandingan = () => {
  const [pulse, setPulse] = useState(true);
  const searchParams = useSearchParams()
  const nama = searchParams.get('nama')

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
    <div className="flex flex-col items-center gap-4 w-full mac-w[400px] px-2 sm:px-5 py-2">
      {/* Judul */}
      <h1 className="text-center text-[#1D2225] font-[Snowstorm_Bold] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none w-full">
        <strong>{nama}</strong>
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
      <div className="w-full rounded-[20px] sm:rounded-[30px] bg-[#F1E0C4] shadow-md px-4 py-6 flex flex-col gap-1 sm:gap-4">
  {/* Judul Pertandingan */}
  <div className="text-center">
    <div className="text-[#1D2225] font-[Snowstorm] text-sm sm:text-base md:text-lg font-bold">
      <strong>{nama}</strong> - PUTRA
    </div>
    <div className="text-[#1D2225] font-[Snowstorm] text-sm sm:text-base md:text-lg font-bold">
      BABAK PENYISIHAN
    </div>
  </div>

  {/* Baris bawah: logo A | info | logo B */}
  <div className="flex flex-row justify-between items-center gap-2 sm:gap-4">
    {/* Logo A */}
    <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-[100px]">
      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
        {/* <img src={matchData.teamA.logo} alt="Team A Logo" className="object-contain w-[90%]" /> */}
      </div>
      <div className="text-[#1D2225] text-center font-[Snowstorm] text-xs sm:text-sm md:text-base leading-tight">
        {matchData.teamA.name}
      </div>
    </div>

    <div className="flex flex-col items-center text-center gap-4 sm:gap-6  flex-[2]">
    {/* Info Pertandingan */}
      <div  className="flex flex-col items-center text-center ">
          <p className="text-[#1D2225] font-sofia text-xs sm:text-sm font-normal">
            {matchData.date}
          </p>
          <p className="text-[#1D2225] font-sofia text-xs sm:text-sm">{matchData.venue}</p>
          </div>
      <div className="text-[#1D2225] font-extrabold text-lg sm:text-2xl lg:text-3xl font-snowstorm">V/S</div>
      <div className="flex items-center gap-1 text-[#1D2225] font-[Sofia_Sans] font-bold text-xs sm:text-sm cursor-pointer hover:underline">
        Tonton Live
        <HiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </div>
    
    </div>

    {/* Logo B */}
    <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-[100px]">
      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
        {/* <img src={matchData.teamB.logo} alt="Team B Logo" className="object-contain w-[90%]" /> */}
      </div>
      <div className="text-[#1D2225] text-center font-[Snowstorm] text-xs sm:text-sm md:text-base leading-tight">
        {matchData.teamB.name}
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Pertandingan;