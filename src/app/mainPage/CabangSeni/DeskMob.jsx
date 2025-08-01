'use client'
import Image from 'next/image'
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';

const SeniList = [
  { src: '/SeniLP/Band.png', alt: 'Band' },
  { src: '/SeniLP/cipta puisi.png', alt: 'Cipta Puisi' },
  { src: '/SeniLP/dance.png', alt: 'Dance' },
  { src: '/SeniLP/Fotografi.png', alt: 'Fotografi' },
  { src: '/SeniLP/Monologi.png', alt: 'Monolog' },
  { src: '/SeniLP/Poster.png', alt: 'Poster' },
  { src: '/SeniLP/seni lukis.png', alt: 'Seni Lukis' },
  { src: '/SeniLP/solo vokal.png', alt: 'Solo Vokal' },
  { src: '/SeniLP/tari tradisional.png', alt: 'Tari Tradisional' },
  { src: '/SeniLP/vokal grup.png', alt: 'Vokal Grup' }
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
      {/* Desktop Layout (horizontal) */}
      <div className="hidden lg:flex w-[70%] flex-row-reverse items-center justify-between gap-10">
        {/* Left: Title + Carousel */}
        <div className="w-3/5 flex flex-col items-center gap-6">
          <Image
            src="/SeniLP/judulSeni.png"
            alt="Cabang Seni"
            width={522}
            height={190}
            className="w-[60%] max-w-md h-auto"
          />
          
          <div className="flex items-center gap-2">
            <button onClick={handlePrev} className="text-3xl px-0 text-black">‹</button>
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
            <button onClick={handleNext} className="text-3xl px-0 text-black">›</button>
          </div>
        </div>

        {/* Right: Perkamen */}
        <div className="relative w-2/5 flex justify-center">
          <Image
            src="/OlahragaLP/perkamen.png"
            alt="Perkamen"
            width={518}
            height={320}
            className="w-[90%] h-auto max-w-md"
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-8">
            <p className="text-center text-neutral-800 text-lg md:text-xl font-bold font-['Sofia_Sans_Condensed'] leading-6">
              Cabang Seni terdiri dari 7 lomba, yaitu Modern Dance, Lukis, Vokal Group, Fotografi, Band, Monolog, dan Desain Grafis
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Layout (vertical) - Matches Cabang Olahraga */}
      <div className="lg:hidden w-[70%] flex flex-col items-center gap-6">
        {/* Title */}
        <Image
          src="/SeniLP/judulSeni.png"
          alt="Cabang Seni"
          width={522}
          height={190}
          className="w-[100%] md:w-[75%] max-w-md h-auto"
        />

        {/* Perkamen */}
        <div className="relative w-full flex justify-center">
          <Image
            src="/OlahragaLP/perkamen.png"
            alt="Perkamen"
            width={518}
            height={320}
            className="w-[90%] h-auto max-w-md"
          />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center px-8">
            <p className="text-center text-neutral-800 text-lg md:text-xl font-bold font-['Sofia_Sans_Condensed'] leading-6">
              Cabang Seni terdiri dari 7 lomba, yaitu Modern Dance, Lukis, Vokal Group, Fotografi, Band, Monolog, dan Desain Grafis
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