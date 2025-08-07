'use client'
import Image from 'next/image'
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';

const olahragaList = [
  { src: '/OlahragaLP/ateltik.png', alt: 'Atletik' },
  { src: '/OlahragaLP/basket.png', alt: 'Basket' },
  { src: '/OlahragaLP/badminton.png', alt: 'Badminton' },
  { src: '/OlahragaLP/futsal.png', alt: 'Futsal' },
  { src: '/OlahragaLP/catur.png', alt: 'catur' },
  { src: '/OlahragaLP/fifa.png', alt: 'fifa' },
  { src: '/OlahragaLP/ml.png', alt: 'ml' },
  { src: '/OlahragaLP/pubg.png', alt: 'pubg' },
  { src: '/OlahragaLP/tenismeja.png', alt: 'tenisMeja' },
  { src: '/OlahragaLP/valorant.png', alt: 'valo' },
  { src: '/OlahragaLP/voli.png', alt: 'voli' },
  { src: '/OlahragaLP/sepakbola.png', alt: 'sepakbola' },
]

export default function CabangOlahragaSection() {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : olahragaList.length - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % olahragaList.length)
  }

  const getDisplayedItems = () => {
    const items = []
    for (let i = 0; i < 4; i++) {
      const index = (startIndex + i) % olahragaList.length
      items.push(olahragaList[index])
    }
    return items
  }

  return (
    <section className="w-full lg:h-[70vh] flex justify-center mt-[35vh] lg:mt-[35vh]">
      {/* Desktop Layout (horizontal) */}
      <div className="hidden lg:flex lg:w-[90%] flex-row items-center justify-between gap-[10%] ">
        {/* Left: Title + Carousel */}
        <div className="w-3/5 flex flex-col items-center gap-6">
          <Image
            src="/OlahragaLP/judulCabang.png"
            alt="Cabang Olahraga"
            width={522}
            height={190}
            className="w-[75%] max-w-md h-auto"
          />
          
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="text-3xl px-0 text-black">‹</button>
            <div className="flex gap-6">
              {getDisplayedItems().map((item, idx) => (
                <Image
                  key={idx}
                  src={item.src}
                  alt={item.alt}
                  width={180}
                  height={180}
                  className="w-36  h-36 object-contain"
                />
              ))}
            </div>
            <button onClick={handleNext} className="text-3xl px-0 text-black">›</button>
          </div>
        </div>

        {/* Right: Perkamen */}
        <div className="relative w-2/5 flex justify-center">
          <Image
            src="/OlahragaLP/Perkamen.png"
            alt="Perkamen"
            width={518}
            height={320}
            className="w-[100%] h-auto max-w-md"
          />
          <div className="absolute top-0 left-12 w-[80%] h-full flex justify-center items-center px-6">
            <p className="text-center text-neutral-800 text-lg md:text-[1.5vw] font-bold font-['Sofia_Sans_Condensed'] leading-relative">
              Para Atlet Teknisiade 2025 akan berkompetisi pada delapan cabang olahraga, yaitu Catur, Tenis Meja, Atletik, Futsal, Voli, Basket, Badminton, dan E-Sports.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (vertical) */}
      <div className="lg:hidden w-[70%] flex flex-col items-center gap-6">
        {/* Title */}
        <Image
          src="/OlahragaLP/judulCabang.png"
          alt="Cabang Olahraga"
          width={522}
          height={190}
          className="w-[100%] md:w-[75%] max-w-md h-auto"
        />

        {/* Perkamen */}
        <div className="relative w-full flex justify-center">
          <Image
            src="/OlahragaLP/Perkamen.png"
            alt="Perkamen"
            width={518}
            height={320}
            className="w-[90%] h-auto max-w-md"
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-8">
            <p className="text-center text-neutral-800 text-lg md:text-xl font-bold font-['Sofia_Sans_Condensed'] leading-6">
              Para Atlet Teknisiade 2025 akan berkompetisi pada delapan cabang olahraga, yaitu Catur, Tenis Meja, Atletik, Futsal, Voli, Basket, Badminton, dan E-Sports.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex flex-col items-center gap-4">
          <button onClick={handlePrev} className="z-30">
            <IoChevronDown className="text-black rotate-180 w-8 h-8" />
          </button>
          <div className="grid grid-cols-2 gap-4">
            {getDisplayedItems().map((item, idx) => (
              <Image
                key={idx}
                src={item.src}
                alt={item.alt}
                width={120}
                height={120}
                className="w-40 h-40 object-contain"
              />
            ))}
          </div>
          <button onClick={handleNext} className="z-30">
            <IoChevronDown className="text-black w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  )
}