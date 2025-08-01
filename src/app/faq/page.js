import React from "react";
import { FaqSection } from "../component/FaqSection/faqDesktop";

const FaqPage = () => {
  return (
    <div className="w-full max-w-[1920px] mx-auto relative min-h-screen pb-[100px]">
      {/* Background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover z-0
        bg-[url('/faqmobilebg.svg')] sm:bg-[url('/faqBG.svg')]"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      />

      {/* Konten FAQ */}
      <main className="relative z-10 flex justify-center pt-32 px-4 sm:px-0">
        <div className="w-full max-w-6xl">
          <FaqSection />
        </div>
      </main>
    </div>
  );
};

export default FaqPage;
