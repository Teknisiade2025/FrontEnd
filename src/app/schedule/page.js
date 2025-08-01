import React from "react";
import Schedule from "../component/schedule/schedule";
import Kalender from "../component/schedule/kalender";

const schedulePage = () => {
  return (
    <div className="w-full max-w-[1920px] h-auto mx-auto relative overflow-hidden pb-[100px]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover z-0
        bg-[url('/faqmobilebg.svg')] sm:bg-[url('/bgschedule.svg')]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Konten */}
      <main className="relative z-10 flex flex-col items-center w-full px-4 sm:px-8 pt-32 gap-[500] pb-20">
        {/* Schedule Section */}
        <div className="w-full max-w-6xl">
          <Schedule />
        </div>

        {/* Kalender Section */}
        <div className="w-full max-w-6xl">
          <Kalender />
        </div>
      </main>
    </div>
  );
};

export default schedulePage;
