import React from "react";
import Schedule from "../component/schedule/schedule";
import Kalender from "../component/schedule/kalender";

const schedulePage = () => {
  return (
    <div className="w-full min-h-[2000px] max-w-[1920px] mx-auto relative overflow-visible pb-[200px]">
      {/* Background */}
      <div
        className="absolute inset-0 h-[1000px] bg-no-repeat bg-cover z-0
        bg-[url('/faqmobilebg.svg')] sm:bg-[url('/bgschedule.svg')]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Konten */}
      <main className="relative z-10 flex flex-col justify-center w-full px-4 sm:px-8 pt-32 pb-5 gap-[1200px]">
        {/* Schedule Section */}
        <div className="w-full max-w-[500px] ">
          <Schedule />
        </div>

        {/* Kalender Section */}
        <div className="w-full max-w-4xl">
          <Kalender />
        </div>
      </main>
    </div>
  );
};

export default schedulePage;
