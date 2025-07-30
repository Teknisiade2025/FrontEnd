"use client";
import React from "react";
import Pertandingan from "../component/schedule/pertandingan";
import Jadwal from "../component/schedule/jadwal";
import Atlet from "../component/schedule/atlet";

const Schedule = () => {
  return (
    <div className="w-full max-w-[1920px] mx-auto relative overflow-hidden min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover z-0
          bg-[url('/faqmobilebg.svg')] 
          sm:bg-[url('/bgschedule.svg')]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      <div className="Frame143728151" style={{width: 903, left: 865, top: 449, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
        <Pertandingan />
        </div>

      <div className="Frame1049" style={{left: 104, top: 1823, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 38, display: 'inline-flex'}}>
        {/* Komponen Jadwal */}
        <Jadwal />
        </div>

        <div className="Frame143728158" style={{width: 1759.58, padding: 10, left: 80, top: 2845, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
        {/* Komponen Atlet */}
        <Atlet />
        </div>

    </div>
  );
};

export default Schedule;