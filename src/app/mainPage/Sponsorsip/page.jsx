import Image from 'next/image';
import { useEffect, useState } from 'react';

const SponsorSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const sponsors = new Array(16).fill('/path-to-your-sponsor.png'); 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleSponsors = isMobile ? sponsors.slice(0, 5) : sponsors;

  return (
    <section className="w-[80%] flex justify-center items-center min-h-screen bg-transparent px-4 md:px-8 py-5 mt-30 m-30 ">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:items-center gap-10">
        
        {/* Kiri: Deskripsi (1/6) */}
        <div className="w-full md:w-2/6 flex flex-col   px-4">
          <h2 className="text-4xl md:text-8xl font-['Snowstorm'] text-neutral-800 drop-shadow-md mb-4">
            Sponsor
          </h2>
          <p className="text-xl teks-justify  font-['Sofia_Sans_Condensed'] text-neutral-800 leading-6">
            Terima kasih kepada para sponsor atas dukungan dan kontribusi yang luar biasa dalam menyukseskan event ini.
          </p>
        </div>

        {/* Kanan: Grid (5/6) */}
        <div className="w-full md:w-4/6 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-2 place-items-center px-4">
          {visibleSponsors.map((src, index) => (
            <div
              key={index}
              className="w-13 h-8 md:w-25 md:h-14 bg-orange-100 rounded-xl shadow-[inset_1px_3px_17px_rgba(0,0,0,0.25),inset_2px_4px_4px_rgba(0,0,0,0.11),inset_-3px_-5px_2px_rgba(235,222,173,0.72)] blur-[0.5px] flex items-center justify-center overflow-hidden"
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
    </section>
  );
};

export default SponsorSection;
