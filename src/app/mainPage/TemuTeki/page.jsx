import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <section className="relative w-full px-6 md:px-40 py-14 overflow-hidden">
      {/* Kontainer utama */}
      <div className="max-w-[1564px] mx-auto flex flex-col items-center gap-24 relative z-10">
        {/* Judul gambar */}
        <Image
          src="/TemuTekiLP/JudulTemuTeki.png"
          alt="Judul Temu Teki"
          width={1564}
          height={416}
          className="w-full h-auto object-contain"
        />

        {/* Teks deskripsi */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-12 md:gap-[160px] z-10">
          <p className="w-full md:w-[502px] text-justify text-neutral-900 text-lg md:text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-relaxed">
            Teki, sang badak bercula satu, kembali hadir membawa semangat juang yang tak tergoyahkan. Tahun ini, ia tampil gagah dengan kostum bertema kesatria yang melambangkan kekuatan, keberanian, dan ketangguhan.
          </p>
          <p className="w-full md:w-[502px] text-justify text-neutral-900 text-lg md:text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-relaxed">
            Sosok Teki merepresentasikan semangat para atlet, seniman, KM/HM, dan panitia Teknisiade yang siap berjuang dengan tekad baja, solidaritas tinggi, dan jiwa pantang menyerah layaknya seorang kesatria sejati.
          </p>
        </div>
      </div>

      {/* Gambar Badak (posisi tengah, absolute) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 z-50">
        <Image
          src="/TemuTekiLP/Badak.png"
          alt="Maskot Badak"
          width={743}
          height={1069}
          className="w-[400px] md:w-[500px] lg:w-[30vw] h-auto"
        />
      </div>
    </section>
  )
}

export default page
