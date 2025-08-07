"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SponsorSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sponsors = []; // Sponsor masih kosong
  // const sponsors = new Array(16).fill('/path-to-your-sponsor.png'); 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="w-full flex justify-center items-center min-h-screen bg-transparent px-4 py-5 md:mt-[70vh]">
      {/* Desktop Layout */}
      <div className="hidden md:flex w-[80%] max-w-screen-xl mx-auto flex-col items-center gap-10">
        {/* Left: Description (1/6) */}
        <div className="w-2/6 flex flex-col px-4">
          <h2 className="text-8xl font-['Snowstorm'] text-neutral-800 drop-shadow-md mb-4">
            Sponsor
          </h2>
          <p className="text-xl font-['Sofia_Sans_Condensed'] text-neutral-800 leading-6">
            Terima kasih kepada para sponsor atas dukungan dan kontribusi yang luar biasa dalam menyukseskan event ini.
          </p>
        </div>

        {/* Right: Grid (5/6) */}
        <div className="w-4/6 grid grid-cols-4 gap-2 place-items-center px-4">
          {sponsors.map((src, index) => (
            <div
              key={index}
              className="w-25 h-14 bg-orange-100 rounded-xl shadow-[inset_1px_3px_17px_rgba(0,0,0,0.25),inset_2px_4px_4px_rgba(0,0,0,0.11),inset_-3px_-5px_2px_rgba(235,222,173,0.72)] blur-[0.5px] flex items-center justify-center overflow-hidden"
            >
              <Image
                src={src}
                alt={`Sponsor ${index + 1}`}
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full flex flex-col items-center gap-8 px-4 -top-15 mt-[30]">
        {/* Title */}
        <h2 className="text-[20vw] font-['Snowstorm'] text-neutral-800 drop-shadow-md">
          Sponsor
        </h2>

        {/* Thank You Message */}
        <p className="text-bold text-center font-sofia text-neutral-800 leading-6">
            Terima kasih kepada para sponsor atas dukungan dan kontribusi yang luar biasa dalam menyukseskan event ini.
          </p>

        {/* Sponsors Grid */}
        <div className="w-full grid grid-cols-2 gap-4 place-items-center">
          {sponsors.slice(0, 6).map((src, index) => (
            <div
              key={index}
              className="w-full h-20 bg-orange-100 rounded-xl shadow-[inset_1px_3px_17px_rgba(0,0,0,0.25),inset_2px_4px_4px_rgba(0,0,0,0.11),inset_-3px_-5px_2px_rgba(235,222,173,0.72)] blur-[0.5px] flex items-center justify-center overflow-hidden p-2"
            >
              <Image
                src={src}
                alt={`Sponsor ${index + 1}`}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorSection;