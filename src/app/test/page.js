import React from 'react';

const page = () => {
  const descriptionText = `Teknisiade telah menjadi bagian tak terpisahkan dari kehidupan kampus, dan tahun ini, lebih dari 4000 mahasiswa siap merayakannya. Teknisiade bukan sekadar acara biasa. Ia adalah panggung bagi para mahasiswa untuk mengekspresikan bakat, semangat, dan dedikasi mereka. Bagi banyak orang, Teknisiade adalah lebih dari sekadar kompetisi; ia adalah perayaan persaudaraan dan kebersamaan.`;

  return (
    <section className="flex flex-col items-center justify-center px-6 md:px-28 mt-[10vh] mb-10 text-center min-h-screen">
      {/* Judul */}
      <h2 className="text-black text-[10vw] sm:text-[6vw] md:text-[4vw] lg:text-[4vw] font-bold font-sans font-snowstorm drop-shadow-md mb-6">
        TAG LINE
      </h2>

      {/* Deskripsi */}
      <p className="w-[90%] sm:w-[85%] md:w-[80%] text-gray-800 text-[4.5vw] sm:text-[3.5vw] md:text-[1.2vw] lg:text-[1.5vw] font-semibold font-['Sofia_Sans_Condensed'] leading-relaxed">
        {descriptionText}
      </p>
    </section>
  );
};

export default page;
