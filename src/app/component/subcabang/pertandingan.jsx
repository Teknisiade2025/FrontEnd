"use client";

import React, { useEffect, useState } from "react";
import { HiArrowRight } from "react-icons/hi";
import { useSearchParams } from 'next/navigation';
import { Radio } from "lucide-react";
import { supabase } from '@/app/lib/supabase'; 
import Image from "next/image";

const Pertandingan = () => {
  const [pulse, setPulse] = useState(true);
  const [matchData, setMatchData] = useState(null);

  const searchParams = useSearchParams();
  const nama = searchParams.get("nama")?.toUpperCase() || "";

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch jadwal hari ini
  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from("jadwal_pertandingan")
        .select("*")
        .order("tanggal", { ascending: true });

      if (error) {
        console.error("Error fetching match:", error);
        return;
      }

      const today = new Date();

      // Filter berdasarkan nama/cabang dan hari ini
      const todayMatches = data.filter((m) => {
        const matchDate = new Date(`${m.tanggal}T${m.waktu}`);
        const isToday =
          matchDate.getFullYear() === today.getFullYear() &&
          matchDate.getMonth() === today.getMonth() &&
          matchDate.getDate() === today.getDate();

        const matchesNama =
          m.tim1?.toUpperCase().includes(nama) ||
          m.tim2?.toUpperCase().includes(nama) ||
          m.cabang?.toUpperCase().includes(nama);

        return isToday && matchesNama;
      });

      if (todayMatches.length > 0) {
        const m = todayMatches[0];
        setMatchData({
          date: new Date(`${m.tanggal}T${m.waktu}`).toLocaleString('id-ID', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
}) + " WIB",

          teamA: { name: m.tim1?.toUpperCase() ?? "TEAM A", logo: `/logoKMHM/${m.tim1?.toUpperCase() ?? "default"}.svg` },
          teamB: { name: m.tim2?.toUpperCase() ?? "TEAM B", logo: `/logoKMHM/${m.tim2?.toUpperCase() ?? "default"}.svg` },
          scoreA: m.skor_tim1 ?? 0,
          scoreB: m.skor_tim2 ?? 0,
          babak: m.babak ?? "",
          kategori: m.kategori ?? "",
        });
      } else {
        setMatchData(null);
      }
    };

    fetchMatches();
  }, [nama]);

  return (
    <div className="flex flex-col items-center gap-4 w-full mac-w[400px] px-2 sm:px-5 py-2">
      {/* Judul */}
      <h1 className="text-center text-[#1D2225] font-snowstorm text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none w-full">
        <strong>{nama}</strong>
      </h1>

      {/* Live Indicator */}
      <div className="flex flex-row items-center gap-2">
        <Radio
          className={`text-red-500 ${pulse ? "animate-pulse" : ""}`}
          size={28}
        />
        <div className="text-[#1D2225] font-sofia font-extrabold text-base sm:text-lg md:text-xl drop-shadow-md">
          Next Match
        </div>
      </div>

      {/* Kartu Pertandingan */}
      <div className="w-full max-h-[300px] rounded-[20px] sm:rounded-[38px] bg-[#F1E0C4] shadow-md px-14 py-5 flex flex-col gap-1 sm:gap-1">
        {/* Judul Pertandingan */}
        {matchData && matchData.teamA && matchData.teamB ? (
        <>
          <div className="text-center">
  <div className="text-[#1D2225] font-[Snowstorm] self-stretch h-5 text-sm sm:text-base md:text-xl font-bold">
    <strong>{nama}</strong> {matchData.kategori ? `- ${matchData.kategori}` : ""}
  </div>
  <div className="text-[#1D2225] font-[Snowstorm] text-sm sm:text-base md:text-xl font-bold">
    {matchData.babak ?? ""}
  </div>
</div>


          {/* Baris bawah: logo A | info | logo B */}
          <div className="flex flex-row justify-between items-center gap-2 sm:gap-4">
            {/* Logo A */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-[100px]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] lg:h-[100px] mt-10 rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
                <img src={matchData.teamA.logo} alt={matchData.teamA.name} className="w-[100] h-[100] object-contain" />
              </div>
              <div className="text-[#1D2225] text-center font-[Snowstorm] text-sm sm:text-base md:text-xl leading-tight">
                {matchData.teamA.name}
              </div>
            </div>

            <div className="flex flex-col items-center text-center gap-4 sm:gap-6 flex-[2]">
              {/* Info Pertandingan */}
              <div className="flex flex-col items-center text-center gap-1 sm:gap-2">
                <p className="text-[#1D2225] font-sofia font-extrabold mb-10 self-stretch h-3 text-sm sm:text-lg">
                  {matchData.date}
                </p>
              </div>
              <div className="text-[#1D2225] font-extrabold text-lg sm:text-4xl lg:text-5xl font-snowstorm">V/S</div>
              <div className="flex items-center gap-1 text-[#1D2225] font-sofia font-bold text-sm sm:text-lg cursor-pointer hover:underline">
                Tonton Live
                <HiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Logo B */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-[100px]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[100px] mt-10 lg:h-[100px] rounded-full overflow-hidden bg-[#1D2225] flex items-center justify-center">
                <img src={matchData.teamB.logo} alt={matchData.teamB.name} className="w-[100] h-[100] object-contain" />
              </div>
              <div className="text-[#1D2225] text-center font-[Snowstorm] text-sm sm:text-base md:text-xl leading-tight">
                {matchData.teamB.name}
              </div>
            </div>
          </div>
        </>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center text-[#1D2225] font-sofia font-bold text-lg mt-8">
              Tidak ditemukan jadwal next match.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pertandingan;
