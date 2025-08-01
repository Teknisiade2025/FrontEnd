"use client";

import React from "react";
import Pertandingan from "../component/subcabang/pertandingan";
import Jadwal from "../component/subcabang/jadwal";
import Atlet from "../component/subcabang/atlet";

const Schedule = () => {
  return (
    <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden">
      
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover z-0
                   bg-[url('/bgsubcabangmobile.svg')] sm:bg-[url('/bgsubcabang.svg')]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Konten di atas background */}
      <main className="relative z-10 flex flex-col items-center gap-[550px]">
        
        {/* Pertandingan Section */}
        <section className="w-full flex justify-center md:justify-end px-4 md:px-[100px] pt-[100px] md:pt-[200px]">
          <div className="max-w-full">
            <Pertandingan />
          </div>
        </section>

        {/* Jadwal & Atlet Section */}
        <section className="w-full flex flex-col items-center gap-[300px]">
          <Jadwal />
          <Atlet />
        </section>

      </main>
    </div>
  );
};

export default Schedule;
