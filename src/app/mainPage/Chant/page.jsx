import React from 'react'
import Image from 'next/image';

const page = () => {
  return (
    <section className="px-6 md:px-28 py-14 flex flex-col md:flex-row-reverse justify-center items-center gap-12">
          {/* Left Side - Video Frame */}
          <div className="relative w-full md:w-4/6 max-w-2xl aspect-video">
            {/* Video inside the frame (z-10) */}
            <div className="absolute top-[9%] left-[11.5%] w-[78%] h-[78%] z-10 rounded-xl overflow-hidden">
                <video
                controls
                className="w-full h-full object-cover"
                >
                <source src="/videos/teknisiade.mp4" type="video/mp4" />
                Your browser does not support the video tag.
                </video>
            </div>
    
            {/* Frame PNG (z-50) harus di atas video */}
            <Image
                src="/ChantLP/frameVideoChant.png"
                alt="Frame Video"
                width={920}
                height={80}
                className="object-contain z-50 absolute -top-3 left-0 w-full h-full"
            />
        </div>
    
          {/* Right Side - Text and Logos */}
          <div className="max-w-xl md:w-2/6">
            {/* Title and Logos */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-black text-6xl md:text-7xl font-bold font-sans drop-shadow-md">
                  TENTANG
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
    
            {/* Paragraph */}
            <p className="text-justify text-gray-800 text-sm md:text-lg mt-5 font-semibold font-['Sofia_Sans_Condensed'] leading-5">
              Lorem ipsum dolor sit amet adipiscing elit, sed do eiusmod incididunt ut labore et dolore magna Ut enim ad minim veniam exercitation ullamco laboris ea commodo consequat 
            </p>
          </div>
        </section>
  )
}

export default page
