import React from 'react'
import Image from 'next/image'

const page = () => {
  const descriptionText = `Teknisiade telah menjadi bagian tak terpisahkan dari kehidupan kampus, dan tahun ini, lebih dari 4000 mahasiswa siap merayakannya. Teknisiade bukan sekadar acara biasa. Ia adalah panggung bagi para mahasiswa untuk mengekspresikan bakat, semangat, dan dedikasi mereka. Bagi banyak orang, Teknisiade adalah lebih dari sekadar kompetisi; ia adalah perayaan persaudaraan dan kebersamaan.`;

  return (
    <section className="px-6 md:px-28 py-14 lg:-py-3 mt-[8vh] lg:-top-10 flex flex-col md:flex-row-reverse justify-center items-center gap-6 md:gap-12 sm:mt-[27vh] md:mt-0">
      {/* Mobile: Title and Logos (Top) */}
      <div className="md:hidden w-full flex justify-between items-start">
        <div>
          <h2 className="text-black text-[13vw] sm:text-[10vw] md:text-[1vw] lg:text-[5vw] font-bold font-sans drop-shadow-md">
            CHANT
          </h2>
          <Image
            src="/TeksTeknisiade2025.png"
            alt="Teks Teknisiade 2025"
            width={220}
            height={35}
            className="mt-1 "
          />
        </div>
        
      </div>

      {/* Left Side - Video Frame (Mobile: Middle) */}
      <div className="relative w-full md:w-3/5 max-w-2xl aspect-video md:order-none order-2 scale-110 md:scale-130 lg:scale-104 right-4 md:right-10 lg:right-0 ">
        {/* Video inside the frame */}
        <div className="absolute top-[13%] md:top-[10%] left-[16%] w-[78%] h-[64%]  md:h-[70%] z-45 rounded-xl overflow-hidden">
            <video
            controls
            autoPlay loop
            className="w-full h-full object-cover"
            >
            <source src="/videos/videoTest.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>

        {/* Frame PNG */}
        <Image
            src="/TentangTeksidLP/frameVideo.png"
            alt="Frame Video"
            width={920}
            height={80}
            className="object-contain z-50 absolute -top-3 left-0 w-full h-full pointer-events-none"
        />
      </div>

      {/* Right Side - Text and Logos (Desktop) */}
      <div className="max-w-xl md:w-2/5 hidden md:block">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-black text-6xl md:text-[6vw] font-bold font-sans drop-shadow-md">
              CHANT
            </h2>
            <Image
              src="/TeksTeknisiade2025.png"
              alt="Teks Teknisiade 2025"
              width={280}
              height={30}
              className="mt-2"
            />
          </div>
          
        </div>

        {/* Desktop Paragraph */}
        <p className="text-justify text-gray-800 text-sm md:text-lg mt-5 font-semibold font-['Sofia_Sans_Condensed'] leading-5">
          {descriptionText}
        </p>
      </div>

      {/* Mobile: Description (Bottom) */}
      <p className="md:hidden w-[50vw] text-center text-gray-800 text-[5vw] sm:text-[3.5vw] font-semibold font-['Sofia_Sans_Condensed'] leading-5 mt-4 order-3">
        {descriptionText}
      </p>
    </section>
  )
}

export default page