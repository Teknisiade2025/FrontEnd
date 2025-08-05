import React from 'react';

const page = () => {
  const descriptionText = `Melalui tagline ini, Teknisiade 2025 tidak hanya menjadi ajang unjuk bakat dan kemampuan, tetapi juga perayaan atas perjalanan kolektif yang membangun, mempersatukan, dan meninggalkan jejak bermakna bagi seluruh keluarga besar Fakultas Teknik kUGM.`;

  return (
    <section className="flex flex-col items-center justify-center px-6 md:px-28 -mt-[5vh] md:mt-1vh lg:mt-[10vh] mb-1 sm:mb-10 lg:mb-[70vh] text-center min-h-screen">
      {/* Judul */}
      <h2 className="text-black text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3.6vw] font-bold font-sans font-snowstorm drop-shadow-md mb-6">
        Perjalanan Harmoni, Jejak Prestasi Terukir
      </h2>

      {/* Deskripsi */}
      <p className="w-[90%] sm:w-[85%] md:w-[80%] text-gray-800 text-[4.8vw] sm:text-[3.5vw] md:text-[1.2vw] lg:text-[1.65vw] font-semibold font-['Sofia_Sans_Condensed'] leading-relaxed">
        {descriptionText}
      </p>
    </section>
  );
};

export default page;
