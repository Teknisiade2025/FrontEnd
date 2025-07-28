"use client";


import React from 'react'

import Hero from '@/app/mainPage/Hero/page'
import NextImage from 'next/image';
import { useEffect, useState } from 'react';


const page = () => {
  const [bgHeight, setBgHeight] = useState('100vh'); // default

  useEffect(() => {
    const img = new window.Image(); 
    img.src = '/landingPageBG.png';
    img.onload = () => {
      const screenWidth = window.innerWidth;
      const ratio = img.height / img.width;
      setBgHeight(`${screenWidth * ratio}px`);
    };
  }, []);

  return (
    <div
      className="bg-no-repeat bg-cover bg-top bg-[#E1C791] "
      style={{
        backgroundImage: "url('/landingPageBG.png')",
        height: bgHeight,
        backgroundSize: '100% auto',
        backgroundPosition: 'top',
        
      }}
    >
      
    </div>
  
    
  )
}

export default page