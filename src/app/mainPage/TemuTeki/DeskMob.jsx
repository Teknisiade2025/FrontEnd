import React from 'react';
import Image from 'next/image';

const TemuTekiSection = () => {
  return (
    <section className="relative w-full px-4 md:px-10 lg:-mt-[90] lg:px-40 py-8 md:py-2 lg:mb-[7vh]">
      {/* Container utama */}
      <div className="max-w-[1564px] mx-auto flex flex-col items-center relative z-10">
        {/* Versi Desktop/Laptop */}
        <div className="hidden md:block w-full">
          {/* Container untuk judul dan badak */}
          <div className="relative w-full flex justify-center mb-8">
            {/* Gambar Judul */}
            <div className="w-full lg:w-[100vw] max-w-[1200px] relative z-10 mt-10">
              <Image
                src="/TemuTekiLP/JudulTemuTeki.png"
                alt="Judul Temu Teki"
                width={1564}
                height={416}
                className="w-full lg:w-[120vw] h-auto object-contain"
                priority
              />
            </div>

            {/* Gambar Badak - lebih besar dan lebih ke atas */}
            <div className="absolute md:top-[18vh] lg:right-[20vw] lg:top-[14vh] md:w-[40%] lg:w-[45%] max-w-[600px] z-20">
              <Image
                src="/TemuTekiLP/Badak.png"
                alt="Maskot Badak"
                width={743}
                height={1069}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Teks deskripsi desktop - lebih sempit */}
          <div className="w-full flex flex-row justify-center gap-[30vw] lg:gap-[32vw] mt-26  lg:right-[100vw]">
            <div className="w-full max-w-[30%]">
              <p className="text-center text-neutral-900 text-xl md:text-[2vw] lg:text-[1.4vw] font-bold font-['Sofia_Sans_Condensed'] leading-relaxed">
                Teki, sang badak bercula satu, kembali hadir membawa semangat juang yang tak tergoyahkan. Tahun ini, ia tampil gagah dengan kostum bertema kesatria yang melambangkan kekuatan, keberanian, dan ketangguhan.
              </p>
            </div>
            
            <div className="w-full max-w-[30%]">
              <p className="text-center text-neutral-900 text-xl md:text-[2vw] lg:text-[1.4vw] font-bold font-['Sofia_Sans_Condensed'] leading-relaxed">
                Sosok Teki merepresentasikan semangat para atlet, seniman, KM/HM, dan panitia Teknisiade yang siap berjuang dengan tekad baja, solidaritas tinggi, dan jiwa pantang menyerah layaknya seorang kesatria sejati.
              </p>
            </div>
          </div>
        </div>

        {/* Versi Mobile */}
        <div className="md:hidden w-full">
          {/* Container untuk badak dan judul */}
          <div className="relative w-full flex justify-center -mt-12">
            {/* Gambar Badak - dipindah lebih ke bawah */}
            <div className="w-full md:w-[3vw] max-w-[500px] mt-24">
              <Image
                src="/TemuTekiLP/Badak.png"
                alt="Maskot Badak"
                width={743}
                height={1069}
                className="w-full h-auto opacity-78 md:opacity-100 "
                priority
              />
            </div>
            
            {/* Judul di kaki badak */}
            <div className="absolute bottom-[29%] w-[100%] z-10 md:w-[80vw] lg:w-[100vw] max-w-[1200px] ">
              <Image
                src="/TemuTekiLP/JudulTemuTeki.png"
                alt="Judul Temu Teki"
                width={1564}
                height={416}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Teks deskripsi mobile - satu kolom */}
          <div className="w-full mt-8 px-4">
            <p className="text-center text-neutral-900 text-base font-bold font-['Sofia_Sans_Condensed'] leading-relaxed mb-6">
              Teki, sang badak bercula satu, kembali hadir membawa semangat juang yang tak tergoyahkan. Tahun ini, ia tampil gagah dengan kostum bertema kesatria yang melambangkan kekuatan, keberanian, dan ketangguhan.
            </p>
            
            <p className="text-center text-neutral-900 text-base font-bold font-['Sofia_Sans_Condensed'] leading-relaxed">
              Sosok Teki merepresentasikan semangat para atlet, seniman, KM/HM, dan panitia Teknisiade yang siap berjuang dengan tekad baja, solidaritas tinggi, dan jiwa pantang menyerah layaknya seorang kesatria sejati.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemuTekiSection;