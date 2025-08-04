import React, { useState, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import Image from 'next/image';

const events = [
  // { title: 'Upacara Pembukaan', date: '29 Agustus' },
  // { title: 'Bulu Tangkis', date: '1 September' },
  // { title: 'Softball', date: '3 September' },
  // { title: 'Basket', date: '5 September' },
  // { title: 'Futsal', date: '7 September' },
  // { title: 'Softball', date: '3 September' },
  // { title: 'Basket', date: '5 September' },
  // { title: 'Futsal', date: '7 September' },
];

const CalendarCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileItemsToShow, setMobileItemsToShow] = useState(2); // Default 2 item
  
  // Hitung jumlah slide untuk dot navigasi
  const totalSlides = isMobile 
    ? Math.max(1, events.length - mobileItemsToShow + 1) 
    : Math.max(1, events.length - 3);
  
  // Status tombol navigasi
  const isPrevDisabled = startIndex === 0;
  const isNextDisabled = isMobile 
    ? startIndex >= events.length - mobileItemsToShow
    : startIndex >= events.length - 3;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Sesuaikan jumlah item berdasarkan tinggi layar
      if (mobile) {
        const screenHeight = window.innerHeight;
        if (screenHeight < 600) {
          setMobileItemsToShow(1); // Layar kecil: tampilkan 1 item
        } else if (screenHeight < 700) {
          setMobileItemsToShow(2); // Layar sedang: tampilkan 2 item
        } else {
          setMobileItemsToShow(3); // Layar besar: tampilkan 3 item
        }
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    if (!isPrevDisabled) {
      setStartIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      setStartIndex(prev => prev + 1);
    }
  };

  const handlePrevMobile = () => {
    if (!isPrevDisabled) {
      setStartIndex(prev => prev - 1);
    }
  };

  const handleNextMobile = () => {
    if (!isNextDisabled) {
      setStartIndex(prev => prev + 1);
    }
  };

  const goToSlide = (index) => {
    setStartIndex(index);
  };

  return (
    <div className="flex justify-center items-center mt-[8vh] sm:mt-[2vh] md:mt-[4vh] lg:mt-[60vh] relative">
      {/* Container utama untuk desktop dan mobile */}
      <div className={`absolute w-full max-w-[1500px] ${isMobile ? 'h-[80vh]' : 'h-[55vh]'} mb-0 flex items-center justify-center relative`}>
        
        {/* Konten kalender - struktur berbeda untuk mobile dan desktop */}
        <div className={`${isMobile ? 'w-[58vw] h-[81vh] sm:w-[30vw] sm:pt-15 pt-24 top-2 flex-col gap-[5vh] ' : 'md:w-[8%]  md:h-[37%] lg:h-[60%] lg:w-[87%] md:-mt-[6vh] lg:-mt-24 flex-row justify-betwen'} flex items-center  px-6 py-8 bg-[radial-gradient(ellipse_64.47%_64.47%_at_53.91%_50.00%,_#FBEBD2_0%,_#C6A97D_100%)] relative z-10`}>
          
          {/* Title Section - selalu di atas baik mobile maupun desktop */}
          <div className="w-[30%] flex justify-center lg:justify-end md:mb-5 ">
            <div className="text-center text-black text-4xl md:text-[4vw] lg:text-[4vw] px-2 font-normal font-snowstorm leading-[50px] md:leading-[7vh] lg:leading-[60.5px] [text-shadow:_0px_5px_11px_rgb(0_0_0_/_0.25)]">
              Calendar <br /> Events
            </div>
          </div>

          {/* Carousel Section - layout berbeda untuk mobile dan desktop */}
          {events.length === 0 ? (
  <div className="w-full h-[100px] flex items-center justify-center text-center text-black font-sofia font-bold text-[2vw]">
    Tidak ada event untuk ditampilkan.
  </div>
) : isMobile ? (
            // Mobile Version - Vertikal
            <div className="w-full flex flex-col items-center justify-center gap-1 min-h-[250px]">
              {/* Tombol atas */}
              <button 
                onClick={handlePrevMobile} 
                className={`z-30 ${isPrevDisabled ? 'text-gray-400' : 'text-black'}`}
                disabled={isPrevDisabled}
              >
                <IoChevronDown className="rotate-180 w-8 h-8" />
              </button>

              {/* Viewport Carousel */}
              <div 
                className="w-full overflow-hidden flex justify-center"
                style={{ height: `${mobileItemsToShow * 100}px` }}
              >
                <div
                  className="transition-transform duration-500 ease-in-out flex flex-col"
                  style={{ transform: `translateY(-${startIndex * 100}px)` }}
                >
                  
                    {events.map((event, i) => (
                    <div
                      key={i}
                      className="h-[100px] w-full flex-shrink-0 flex flex-col items-center justify-center text-black p-2"
                    >
                      <div className="text-center font-['Snowstorm'] text-xl leading-tight mb-1">
                        {event.title}
                      </div>
                      <div className="text-center font-['Sofia_Sans_Condensed'] text-base">
                        {event.date}
                       </div>
          </div>
        ))}
      </div>
    </div>
              

              {/* Tombol bawah */}
              <button 
                onClick={handleNextMobile} 
                className={`z-30 ${isNextDisabled ? 'text-gray-400' : 'text-black'}`}
                disabled={isNextDisabled}
              >
                <IoChevronDown className="w-8 h-8" />
              </button>

              {/* Dot Navigation - Mobile */}
              <div className="flex justify-center mt-4 space-x-2 z-30">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full ${
                      startIndex === idx ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Desktop Version - Horizontal
            <div className="w-full md:w-[70%] flex flex-col items-center">
              <div className="w-full flex items-center justify-center gap-2">
                <button 
                  onClick={handlePrev} 
                  className={`z-30 ${isPrevDisabled ? 'text-gray-400' : 'text-black'}`}
                  disabled={isPrevDisabled}
                >
                  <IoChevronDown className="rotate-90 w-8 h-8" />
                </button>

                <div className="w-full max-w-xl overflow-hidden">
                  <div
                    className="flex gap-4 transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${startIndex * 33.333}%)` }}
                  >
                    {events.map((event, i) => (
                      <div
                        key={i}
                        className="w-1/3 flex-shrink-0 grid grid-rows-[2fr_auto] place-items-center text-black"
                      >
                        <div className="h-[3.5rem] flex items-center justify-center text-center font-['Snowstorm'] text-2xl md:text-[2.5vw] lg:text-[2vw] leading-7 mb-2">
                          {event.title}
                        </div>
                        <div className="text-center font-['Sofia_Sans_Condensed'] text-base md:text-[1.8vw] lg:text-[1.4vw]">
                          {event.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleNext} 
                  className={`z-30 ${isNextDisabled ? 'text-gray-400' : 'text-black'}`}
                  disabled={isNextDisabled}
                >
                  <IoChevronDown className="-rotate-90 w-8 h-8" />
                </button>
              </div>

              {/* Dot Navigation - Desktop */}
              <div className="flex justify-center mt-4 space-x-2 z-30">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full ${
                      startIndex === idx ? 'bg-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Frame overlay di posisi paling depan */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {isMobile ? (
            <Image 
              src="/KalenderEventLP/frameKalenderMob.svg" 
              alt="Mobile Frame"
              width={800}
              height={1000}
              objectFit="contain"
              className='w-[125vw] h-[85vh] absolute top-0 left-0 pointer-events-none'
            />
          ) : (
            <Image 
              src="/KalenderEventLP/frameKalender.svg" 
              alt="Desktop Frame"
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarCarousel;