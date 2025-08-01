"use client";


import React from 'react'

import Hero from '@/app/mainPage/Hero/page'
import NextImage from 'next/image';
import { useEffect, useState } from 'react';
import KalerderEvent from '@/app/mainPage/KalenderEvent/page';
import TentangTeksid from '@/app/mainPage/TentangTeksid/page'
import TemuTeki from '@/app/mainPage/TemuTeki/page'
import Chant from '@/app/mainPage/Chant/page'
import Olahraga from '@/app/mainPage/CabangOlahraga/page'
import Seni from '@/app/mainPage/CabangSeni/page'
import Sponsorship from '@/app/mainPage/Sponsorsip/page'

const page = () => {
  const [bgHeight, setBgHeight] = useState('90vh'); // default

  useEffect(() => {
    const img = new window.Image(); 
    img.src = '/landingPageBG.png';
    img.onload = () => {
      const screenWidth = window.innerWidth;
      const ratio = img.height / img.width;
      setBgHeight(`${screenWidth * ratio *0.93}px`);
    };
  }, []);

  return (
    <div
      className="bg-no-repeat bg-cover bg-top bg-[#E1C791] "
      style={{
        backgroundImage: "url('/landingPageBG.png')",
        height: bgHeight, // 90% of the calculated height
        backgroundSize: '100% auto',
        backgroundPosition: 'top',
        
      }}
    >
      <Hero />
      <KalerderEvent/>
      <TentangTeksid/>
      <TemuTeki/>
      <Chant/>
      <Olahraga/>
      <Seni/>
      <Sponsorship/>

      
    </div>
  
    
  )
}

export default page