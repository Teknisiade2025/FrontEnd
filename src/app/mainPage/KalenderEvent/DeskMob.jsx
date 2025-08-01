import React, { useState, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import Image from 'next/image';

const events = [
  { title: 'Upacara Pembukaan', date: '29 Agustus' },
  { title: 'Bulu Tangkis', date: '1 September' },
  { title: 'Softball', date: '3 September' },
  { title: 'Basket', date: '5 September' },
  { title: 'Futsal', date: '7 September' },
  { title: 'Softball', date: '3 September' },
  { title: 'Basket', date: '5 September' },
  { title: 'Futsal', date: '7 September' },
];

const CalendarCarousel = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : events.length - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % events.length);
  };

  const handlePrevMobile = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : events.length - 1));
  };

  const handleNextMobile = () => {
    setStartIndex((prev) => (prev + 1) % events.length);
  };

  const getDisplayedEvents = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % events.length;
      visible.push(events[index]);
    }
    return visible;
  };

  const getDisplayedMobileEvents = () => {
    const visible = [];
    for (let i = 0; i < 2; i++) {
      const index = (startIndex + i) % events.length;
      visible.push(events[index]);
    }
    return visible;
  };

  return (
    <div className="flex justify-center items-center mt-[8vh] sm:mt-[2vh] md:mt-[4vh] lg:mt-79 relative">
      {/* Container utama untuk desktop dan mobile */}
      <div className={`absolute w-full max-w-[1500px] ${isMobile ? 'h-[80vh]' : 'h-[55vh]'} mb-0 flex items-center justify-center relative`}>
        
        {/* Konten kalender - struktur berbeda untuk mobile dan desktop */}
        <div className={`${isMobile ? 'w-[55vw] h-[81vh] sm:w-[30vw] sm:pt-15 pt-24 top-2 flex-col gap-[5vh] ' : 'md:w-[80vw]  md:h-[25vh] lg:h-[30vh] lg:w-[75vw] md:-mt-[10vh] lg:-mt-24 flex-row justify-betwen'} flex items-center  px-6 py-8 bg-[radial-gradient(ellipse_64.47%_64.47%_at_53.91%_50.00%,_#FBEBD2_0%,_#C6A97D_100%)] relative z-10`}>
          
          {/* Title Section - selalu di atas baik mobile maupun desktop */}
          <div className="w-full flex justify-center md:justify-start  md:mb-0">
            <div className="text-center text-black text-4xl md:text-[4vw] lg:text-5xl px-8 font-normal font-['Snowstorm'] leading-[50px] md:leading-[7vh] lg:leading-[60.5px] [text-shadow:_0px_5px_11px_rgb(0_0_0_/_0.25)]">
              Calendar <br /> Events
            </div>
          </div>

          {/* Carousel Section - layout berbeda untuk mobile dan desktop */}
          {isMobile ? (
            // Mobile Version - Vertikal
            <div className="w-full flex flex-col items-center justify-center gap-1 ">
              {/* Tombol atas untuk prev */}
              <button onClick={handlePrevMobile} className="z-30">
                <IoChevronDown className="text-black rotate-180 w-8 h-8" />
              </button>

              {/* Carousel Mobile - Vertikal */}
              <div className="w-full h-[200px] overflow-hidden mt-2">
                <div
                  className="h-full transition-transform duration-500 ease-in-out flex flex-col"
                  style={{ transform: `translateY(-${startIndex * 50}%)` }}
                >
                  {events.map((event, i) => (
                    <div
                      key={i}
                      className="h-1/2 w-full flex-shrink-0 flex flex-col items-center justify-center text-black p-2"
                    >
                      <div className="text-center font-['Snowstorm'] text-xl leading-tight">
                        {event.title}
                      </div>
                      <div className="text-center font-['Sofia_Sans_Condensed'] text-base">
                        {event.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tombol bawah untuk next */}
              <button onClick={handleNextMobile} className="z-30">
                <IoChevronDown className="text-black w-8 h-8" />
              </button>
            </div>
          ) : (
            // Desktop Version - Horizontal
            <div className="w-full md:w-3/4 flex items-center justify-center gap-4">
              <button onClick={handlePrev} className="z-30">
                <IoChevronDown className="text-black rotate-90 w-8 h-8" />
              </button>

              <div className="w-full max-w-xl overflow-hidden mt-5 ">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${startIndex * 50}%)` }}
                >
                  {events.map((event, i) => (
                    <div
                      key={i}
                      className="w-1/3 flex-shrink-0 flex flex-col items-center text-black "
                    >
                      <div className="text-center font-['Snowstorm'] text-2xl md:text-[2.5vw] lg:text-[2vw] leading-tight">
                        {event.title}
                      </div>
                      <div className="text-center font-['Sofia_Sans_Condensed'] text-base md:text-[1.8vw] lg:text-[1.4vw]">
                        {event.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleNext} className="z-30">
                <IoChevronDown className="text-black -rotate-90 w-8 h-8" />
              </button>
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