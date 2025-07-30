import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage1() {
  return (
      <div className="h-screen flex flex-col pt-40 justify-center items-center text-center relative z-10">
        {/* Judul */}
        <h2 className="text-black text-2xl font-black font-['Sofia_Sans_Condensed'] mb-6 [text-shadow:_0px_0px_100px_rgb(170_109_0_/_1.00)]">
          Pekan Olahraga dan Seni Fakultas Teknik 2025
        </h2>

        {/* Logo Teks */}
        <Image
          src="/TeksTeknisiade2025.png"
          alt="Logo Teknisade"
          width={800}
          height={200}
          className="w-[65vw] h-auto mb-8"
        />

        <Link href={"https://www.instagram.com/reel/DMfQ6D9Titd/?igsh=YmFlajdyM211OTl4"}>
          <button className="w-50 h-16 px-2 py-2 bg-amber-500 rounded-[30.4px] shadow-md inline-flex justify-center items-center ">

              <span className="text-neutral-800 text-xl font-bold font-['Sofia_Sans_Condensed']">Lihat Teaser</span>

              

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="text-neutral-800 "
              viewBox="0 0 16 16"
            >
              <path d="M6 3.5v9l6-4.5-6-4.5z" />
            </svg>
          </button>
        
        </Link>

        {/* Tombol Lihat Teaser */}
        
      </div>

    
  );
}
