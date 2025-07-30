"use client";
import React, { useEffect, useState } from "react";
import { BsBroadcast } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";
import Image from 'next/image';

const Pertandingan = () => {
  const [isLive, setIsLive] = useState(true);
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
      logo: "🏆" ,
    },
    teamB: {
      name: "KMHM",
      logo: "⚙️",
    },
    scoreA: 0,
    scoreB: 0,
  };

  return (
    <div className="flex flex-col items-center w-[903px] gap-4">
      {/* Judul */}
      <h1 className="text-[85px] text-[#1D2225] font-[Snowstorm] font-normal text-center">
        SEPAK BOLA
      </h1>

      {/* Icon Live */}
      <div className="relative w-[38px] h-[38px]">
        <div
          className={`absolute w-[38px] h-[27.55px] top-[5.22px] bg-[#FF0000] ${
            pulse ? "animate-pulse" : ""
          }`}
        ></div>
      </div>

      {/* Live Score */}
      <div className="text-[30px] font-extrabold font-[Sofia Sans] text-[#1D2225] text-center shadow-md">
        Live Score
      </div>

      {/* Kartu Pertandingan */}
      <div className="relative w-full h-[329px] bg-[#FAEDDAbd] rounded-[50px] shadow-[0_7px_16px_4px_rgba(0,0,0,0.25)]">
        {/* Lingkaran & Logo Kiri */}
        <div className="absolute left-[58px] top-[29px] w-[133px] h-[133px] bg-[#D9D9D9] rounded-full" />
        <div className="absolute left-[64px] top-[65px] w-[149px] h-[149px] bg-[#1D2225] rounded-full" />
        <img
          src={matchData.teamA.logo}
          alt="Logo Tim A"
          className="absolute left-[50.45px] top-[62.29px] w-[170.18px] h-[154.42px]"
        />

        {/* Lingkaran & Logo Kanan */}
        <div className="absolute left-[688px] top-[65px] w-[149px] h-[149px] bg-[#1D2225] rounded-full" />
        <img
          src={matchData.teamB.logo}
          alt="Logo Tim B"
          className="absolute left-[683.62px] top-[56.79px] w-[157.22px] h-[164.89px]"
        />

        {/* Skor */}
        <div className="absolute left-[355px] top-[116px] text-[#1D2225] text-[85px] font-[Snowstorm]">
          {matchData.scoreA}
        </div>
        <div className="absolute left-[439px] top-[116px] text-[#1D2225] text-[85px] font-[Snowstorm]">
          :
        </div>
        <div className="absolute left-[496px] top-[116px] text-[#1D2225] text-[85px] font-[Snowstorm]">
          {matchData.scoreB}
        </div>

        {/* Tonton Live */}
        <div className="absolute top-[247.5px] left-[375px] flex items-center gap-2 text-[#1D2225] font-[Sofia Sans] font-bold text-[24.76px] cursor-pointer hover:underline">
          Tonton Live
          <HiArrowRight className="w-[23.8px] h-[23.8px]" />
        </div>

        {/* Info Tanggal & Lokasi */}
        <div className="absolute top-[22px] left-[333.54px] text-center text-[#1D2225] font-[Sofia Sans] font-bold text-[19.56px] leading-[26.4px]">
          {matchData.date}
        </div>
        <div className="absolute top-[46.45px] left-[375.10px] text-center text-[#1D2225] font-[Sofia Sans] font-bold text-[19.56px] leading-[26.4px]">
          {matchData.venue}
        </div>

        {/* Nama Tim */}
        <div className="absolute left-[87px] top-[234px] text-center text-[#1D2225] text-[29.21px] font-[Snowstorm] leading-[39.44px]">
          {matchData.teamA.name}
        </div>
        <div className="absolute left-[712px] top-[234px] text-center text-[#1D2225] text-[29.21px] font-[Snowstorm] leading-[39.44px]">
          {matchData.teamB.name}
        </div>
      </div>
    </div>
  );
};

export default Pertandingan;
