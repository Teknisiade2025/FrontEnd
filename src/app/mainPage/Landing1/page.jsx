
{/* MASIH BELUM BENER */}



export default function LandingPage1() {
  return (
    <main className="relative w-full min-h-screen bg-[#f4e3b2] overflow-hidden">
      
    
      {/* Background with columns */}
      <img
        src="/Landing1/dindingBG.svg"
        alt="Background Dinding"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top pillars */}
      <img
        src="/Landing1/tiang_kiri_kanan_atas.svg"
        alt="Tiang Atas"
        className="absolute top-0 left-0 w-full object-cover"
      />

      {/* Bottom stairs (full width) */}
      <img
        src="/Landing1/tangga.svg"
        alt="Tangga"
        className="absolute bottom-0 left-0 w-full"
      />

      {/* Cloud at the bottom */}
      <img
        src="/Landing1/awanLP1.svg"
        alt="Awan Bawah"
        className="absolute bottom-0 left-0 w-full"
      />

      {/* Left Red-Blue Slash */}
      <img
        src="/Landing1/slashAtas.svg"
        alt="Slash Kiri"
        className="absolute top-1/2 left-0 translate-y-[-30%] max-w-[35%] md:max-w-[25%]"
      />

      {/* Right Red-Blue Slash */}
      <img
        src="/Landing1/slashBawah.svg"
        alt="Slash Kanan"
        className="absolute top-1/2 right-0 translate-y-[-20%] max-w-[35%] md:max-w-[25%]"
      />

      {/* Medal on the top right (larger & slightly lower) */}
      <img
        src="/Landing1/medal.svg"
        alt="Medal"
        className="absolute top-8 right-8 w-48 md:w-64 lg:w-72"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        
        {/* Small Title */}
        <h2 className="text-base md:text-lg font-semibold text-black">
          Pekan Olahraga dan Seni Fakultas Teknik 2025
        </h2>

        {/* Large Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-wider mt-3 leading-tight">
          TEKNISIADE <span className="text-red-600">2025</span>
        </h1>

        {/* "See teaser" Button */}
        <button className="mt-6 px-6 md:px-8 py-3 md:py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-md flex items-center gap-2">
          Lihat teaser
          <span className="text-xl">➔</span>
        </button>

        {/* ================= PODIUM BOX ================= */}
        <div className="relative mt-10">
          {/* Podium Box */}
          <img
            src="/Landing1/kotak_coklat.svg"
            alt="Kotak Coklat"
            className="w-[240px] md:w-[340px] lg:w-[400px] mx-auto"
          />

          {/* Decorative Slash in the top left corner of the box */}
          <img
            src="/Landing1/slash3.svg"
            alt="Slash Dekorasi Kotak"
            className="absolute -top-6 -left-6 w-14 md:w-20"
          />
        </div>

      </div>

      {/* ===================== SCROLL DOWN ICON ===================== */}
      <div className="absolute bottom-28 md:bottom-20 w-full flex justify-center z-20">
        <button className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
          ↑
        </button>
      </div>

    </main>
  );
}
