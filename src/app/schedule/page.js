import React from "react";
import Schedule from "../component/schedule/schedule";
import Kalender from "../component/schedule/kalender";

const schedulePage = () => {
  return (
    <div className="relative w-full max-w-[1920px] mx-auto overflow-hidden pb-[20vh]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover z-0
        bg-[url('/bgschedulemobile.png')] sm:bg-[url('/bgschedule.png')]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Konten */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-2 sm:px-8 pt-15 sm:pt-32 pb-10 gap-[130px] sm:gap-[400px]">
        {/* Schedule Section */}
        <div className="w-full max-w-[450px] sm:max-w-[700px] ">
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
