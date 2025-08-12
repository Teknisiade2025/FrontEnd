import React from "react";
import NavigasiCabang from "@/app/component/admin/compNavigasiCabang/cabangNav.jsx"
import ScoreboardSeni from "@/app/component/admin/scoreboard/scoreboardSeni.jsx";
import { Suspense } from "react";

const ScoreboardPage = () => {
  return (
    <div className="flex flex-row min-h-screen pt-10 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
      {/* Sidebar Navigasi */}
      <div className="pt-5 pl-5">
        <NavigasiCabang />
      </div>
      
      {/* Konten Utama - Scoreboard */}
      <div className="flex-1 pr-20">
        <ScoreboardSeni />
      </div>
    </div>
  );
};

export default ScoreboardPage;