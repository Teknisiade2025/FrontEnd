import React from 'react'
import Image from 'next/image'
import { Carousel } from "@material-tailwind/react";

const page = () => {
  return (
    <div className='flex justify-center items-center mt-[26vw]'>
        <div
          className="w-[150vw] h-[55vh] bg-[url('/KalenderEventLP/frameKalender.svg')] bg-contain bg-no-repeat bg-center mb-8"
        >
          {/* Konten di dalam frame */}
          <div className="flex justify-center items-center min-h-[200px] ">
            
          </div>


        </div>

      
    </div>
  )
}

export default page
