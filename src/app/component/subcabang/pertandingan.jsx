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
      logo: "/supreme-planner-logo.png", // ganti sesuai path logo sebenarnya
    },
    teamB: {
      name: "KMHM",
      logo: "/supermesin-logo.png", // ganti sesuai path logo sebenarnya
    },
    scoreA: 0,
    scoreB: 0,
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Judul */}
      <h1 className="text-center text-[#1D2225] font-[Snowstorm_Bold] text-[85px] font-normal leading-none w-full">
        SEPAK BOLA
      </h1>

      {/* Live Indicator */}
      <div className="flex flex-row items-center gap-1">
        <div
          className={`w-[38px] h-[38px] rounded-full bg-[#FF0000] ${
            pulse ? "animate-pulse" : ""
          }`}
        />
        <div className="text-[#1D2225] text-[30px] font-[Sofia_Sans] font-normal leading-none drop-shadow-md">
          Next Match
        </div>
      </div>

      {/* Kartu Pertandingan */}
      <div className="w-full max-w-5xl rounded-[43.582px] bg-[#F1E0C4] shadow-[0_6.102px_13.946px_3.487px_rgba(0,0,0,0.25)] px-[55px] py-[20px] flex justify-between items-center">
        {/* Tim A */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
            {/* <img src={matchData.teamA.logo} alt="Team A Logo" className="object-contain w-[90%]" /> */}
          </div>
          <div className="text-[#1D2225] text-center font-[Snowstorm] text-[25.465px]">
            {matchData.teamA.name}
          </div>
        </div>

        {/* Info Pertandingan */}
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="text-[#1D2225] font-[Snowstorm] text-[22.173px] font-bold leading-[135%]">
            SEPAK BOLA
          </div>
          <div className="text-[#1D2225] font-[Snowstorm] text-[22.173px] font-bold leading-[135%]">
            BABAK PENYISIHAN
          </div>
          <div className="text-[#1D2225] font-[Sofia_Sans] text-[17.047px] font-normal leading-[135%]">
            {matchData.date}
          </div>
          <div className="text-[#1D2225] font-[Sofia_Sans] text-[17.047px] font-normal leading-[135%]">
            {matchData.venue}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#1D2225] text-[74.09px] font-[Snowstorm_Bold]">
              {matchData.scoreA}
            </span>
            <span className="text-[#1D2225] text-[74.09px] font-[Snowstorm_Bold]">:</span>
            <span className="text-[#1D2225] text-[74.09px] font-[Snowstorm_Bold]">
              {matchData.scoreB}
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#1D2225] font-[Sofia_Sans] font-bold text-[24.76px] cursor-pointer hover:underline">
            Tonton Live
            <HiArrowRight className="w-[20.745px] h-[20.745px]" />
          </div>
        </div>

        {/* Tim B */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
            {/* <img src={matchData.teamB.logo} alt="Team B Logo" className="object-contain w-[90%]" /> */}
          </div>
          <div className="text-[#1D2225] text-center font-[Snowstorm] text-[25.465px]">
            {matchData.teamB.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pertandingan;
