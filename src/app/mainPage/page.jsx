"use client";

import React, { useEffect, useState } from 'react'
import Hero from '@/app/mainPage/Hero/DeskMob'
import KalerderEvent from '@/app/mainPage/KalenderEvent/DeskMob'
import TentangTeksid from '@/app/mainPage/TentangTeksid/DeskMob'
import TemuTeki from '@/app/mainPage/TemuTeki/DeskMob'
import Chant from '@/app/mainPage/Chant/DeskMob'
import Olahraga from '@/app/mainPage/CabangOlahraga/DeskMob'
import Seni from '@/app/mainPage/CabangSeni/DeskMob'
import Sponsorship from '@/app/mainPage/Sponsorsip/DeskMob'

const Page = () => {
  const [bgHeight, setBgHeight] = useState('80vh')
  const [bgImage, setBgImage] = useState('/landingPageBG.png')

  useEffect(() => {
    const calculateBgHeight = (isMobile = false) => {
      const img = new Image()
      const imagePath = isMobile ? '/landingPageBGmobile.png' : '/landingPageBG.png'
      img.src = imagePath
      
      img.onload = () => {
        const screenWidth = window.innerWidth
        const ratio = img.height / img.width
        const adjustedMultiplier = isMobile ? 0.907 : 0.94
        const calculatedHeight = screenWidth * ratio * adjustedMultiplier
        setBgHeight(`${calculatedHeight}px`)
        setBgImage(imagePath)
      }
    }

    const handleResize = () => {
      const isMobile = window.innerWidth <= 640
      calculateBgHeight(isMobile)
    }

    // Initial calculation
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className="w-[100%] sm:w-[100%] g-no-repeat bg-cover bg-top bg-[#E1C791] overflow-hidden"
      style={{
        backgroundImage: `url('${bgImage}')`,
        height: bgHeight,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      <Hero />
      <KalerderEvent />
      <TentangTeksid />
      <TemuTeki />
      <Chant />
      <Olahraga />
      <Seni />
      <Sponsorship />
    </div>
  )
}

export default Page