"use client";

import React from "react";
import Pertandingan from "../component/subcabang/pertandingan";
import Jadwal from "../component/subcabang/jadwal";
import Atlet from "../component/subcabang/atlet";

const Schedule = () => {
  return (
    <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden pb-[20vh]">
      
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
      <main className="relative z-10 flex flex-col items-center gap-[280px] md:gap-[800px] ">
        
        {/* Pertandingan Section */}
        <section className="w-full flex justify-end px-5 md:px-6 pt-[100px] md:pt-[200px]">
          <div className="w-full max-w-[600px]">
            <Pertandingan />
          </div>
        </section>

        {/* Jadwal & Atlet Section */}
        <section className="w-full flex flex-col items-center gap-[100px] md:gap-[280px]">
          <Jadwal />
          <Atlet />
        </section>

      </main>
    </div>
  );
};

export default Schedule;
