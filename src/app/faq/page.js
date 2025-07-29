import React from "react";
import { FaqSection } from "../component/FaqSection/faqDesktop";

const FaqPage = () => {
  return (
     <div
      className="w-full max-w-[1920px] mx-auto relative overflow-hidden"
      style={{ height: "2504px" }}
    >
      {/* Background */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover bg-top z-0"
        style={{
          backgroundImage: "url('/faqBG.svg')",
          backgroundSize: "1920px 3646px",
        }}
      />

      {/* Konten FAQ */}
      <main className="relative z-10 flex justify-center pt-[180px]">
        <div
          className="w-[1167px] max-h-[1460px] overflow-visible"
        >
          <FaqSection />
        </div>
      </main>
    </div>
  );
};

export default FaqPage;