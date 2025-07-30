'use client'
import Image from 'next/image'
import { useState } from 'react'

const SeniList = [
  { src: '/OlahragaLP/ateltik.png', alt: 'Atletik' },
  { src: '/OlahragaLP/basket.png', alt: 'Basket' },
  { src: '/OlahragaLP/badminton.png', alt: 'Badminton' },
  { src: '/OlahragaLP/futsal.png', alt: 'Futsal' },
  { src: '/OlahragaLP/futsal.png', alt: 'Futsal' },
  { src: '/OlahragaLP/futsal.png', alt: 'Futsal' },
  // Tambahkan cabang lainnya jika ada
]

export default function CabangSeniSection() {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : SeniList.length - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % SeniList.length)
  }

  const getDisplayedItems = () => {
    const items = []
    for (let i = 0; i < 4; i++) {
      const index = (startIndex + i) % SeniList.length
      items.push(SeniList[index])
    }
    return items
  }

  return (
    <section className="w-full flex justify-center mt-40">
        <div className="w-[70%] flex flex-col lg:flex-row-reverse items-center justify-between gap-10">
            {/* Kiri: Judul + Carousel */}
            <div className="w-full lg:w-3/5 flex flex-col items-center gap-6">
            <Image
                src="/SeniLP/judulSeni.png"
                alt="Cabang Olahraga"
                width={522}
                height={190}
                className="w-[60%] max-w-md h-auto"
            />

            {/* Carousel Desktop */}
            <div className="hidden lg:flex items-center gap-2">
                <button onClick={handlePrev} className="text-3xl -px-2 text-black">‹</button>
                <div className="flex gap-6">
                {getDisplayedItems().map((item, idx) => (
                    <Image
                    key={idx}
                    src={item.src}
                    alt={item.alt}
                    width={160}
                    height={160}
                    className="w-36 h-36 object-contain"
                    />
                ))}
                </div>
                <button onClick={handleNext} className="text-3xl -px-2 text-black">›</button>
            </div>

            {/* Carousel Mobile (2x2 grid) */}
            <div className="lg:hidden flex flex-col items-center gap-4">
                <button onClick={handlePrev} className="text-3xl">▲</button>
                <div className="grid grid-cols-2 gap-4">
                {getDisplayedItems().map((item, idx) => (
                    <Image
                    key={idx}
                    src={item.src}
                    alt={item.alt}
                    width={120}
                    height={120}
                    className="w-28 h-28 object-contain"
                    />
                ))}
                </div>
                <button onClick={handleNext} className="text-3xl">▼</button>
            </div>
            </div>

            {/* Kanan: Perkamen Deskripsi */}
            <div className="relative w-full lg:w-2/5 flex justify-center">
            <Image
                src="/OlahragaLP/perkamen.png"
                alt="Perkamen"
                width={518}
                height={320}
                className="w-[90%] h-auto max-w-md"
            />
            <div className="absolute top-0 left-10 w-[80%] h-full flex justify-center items-center px-6">
                <p className="text-center text-neutral-800 text-lg md:text-xl font-bold font-['Sofia_Sans_Condensed'] leading-6">
                Cabang Seni terdiri dari 7 lomba, yaitu Modern Dance, Lukis, Vokal Group, Fotografi, Band, Monolog, dan Desain Grafis
                </p>
            </div>
            </div>
        </div>
        </section>

  )
}
