import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage1() {
   const scrollToSection = () => {
    const section = document.getElementById("tentang");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
      // <div className="h-screen flex flex-col -mt-[9vh] md:mt-0 -pt-6 md:pt-40 justify-center items-center text-center relative z-10">
      <section id="hero" className="h-screen flex flex-col -mt-[9vh] md:mt-0 -pt-6 md:pt-40 justify-center items-center text-center relative z-10">
        {/* Judul */}
        <h2 className="text-black text-[4vw] md:text-[2vw] lg:text-[2vw] font-sofia  mb-2 md:mb-6 [text-shadow:_0px_0px_100px_rgb(170_109_0_/_1.00)] font-bold">
          Pekan Olahraga dan Seni Fakultas Teknik 2025
        </h2>

        {/* Logo Teks */}
        <Image
          src="/TeksTeknisiade2025.png"
          alt="Logo Teknisade"
          width={800}
          height={200}
          className="w-[80vw] md:w-[65vw] h-auto mb-8"
        />
          <button  onClick={scrollToSection} className=" w-[45vw] h-[9vw] sm:h-[7vw] sm:w-[30vw]  md:w-[20vw] md:h-[6vw]  lg:w-[14vw] lg:h-[4.2vw] px-2 py-2 bg-amber-500 rounded-[30.4px] shadow-md inline-flex justify-center items-center ">

              <span className="text-neutral-800 text-[4vw] sm:text-[2.5vw] md:text-[1.5vw] font-bold font-sofia">Lihat Teaser</span>

              

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="text-neutral-800 w-[5vw] h-[5vw] md:w-[3vw] md:h-[3vw] lg:w-[2.3vw] lg:h-[2.3vw] ml-2"
              viewBox="0 0 16 16"
            >
              <path d="M6 3.5v9l6-4.5-6-4.5z" />
            </svg>
          </button>
        

        {/* Tombol Lihat Teaser */}
        
      {/* </div> */}
</section>
    
  );
}
