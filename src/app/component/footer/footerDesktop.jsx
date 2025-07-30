import React from 'react'
import Image from 'next/image'

import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'

const FooterTeknisiade = () => {
  return (
    <div className="relative w-full -top-35">
        {/* Background awan atas */}
        <Image
            src="/Footer/footerdesktopBG.png"
            alt="BG"
            width={1920}
            height={280}
            className="absolute top-0 left-0 w-full h-auto object-cover"
        />

        {/* Konten */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-8 py-10 pt-[48vh] flex flex-col md:flex-row justify-center items-center gap-15 ">
            {/* Kiri: Logo dan teks */}
            <div className="flex flex-col gap-5 max-w-lg text-neutral-800">
                <Image src={"/TeksTeknisiade2025.png"} alt="Logo Teknisade" width={400} height={100} className="w-[30vw] h-auto" />


                <div className="font-bold text-xl md:text-2xl font-['Sofia_Sans_Condensed'] leading-snug">
                    OASE BEM KMFT<br />
                    FAKULTAS TEKNIK<br />
                    UNIVERSITAS GADJAH MADA
                </div>



                <p className="text-md md:text-lg opacity-80 font-['Sofia_Sans_Condensed']">
                    Jl. Grafika No.2, Senolowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                </p>



                {/* Icon Sosial */}
                <div className="flex gap-4 mt-4 text-black text-2xl">
                    <a href="https://www.instagram.com/nama_akun_ig" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="hover:text-gray-700 w-[2.2vw] h-[2.2vw]" />
                    </a>
                    <a href="https://twitter.com/nama_akun_twitter" target="_blank" rel="noopener noreferrer">
                        <Image src="/Footer/logoX.svg" alt="Logo X" width={20} height={20} className="hover:opacity-80 w-[2vw] h-[2vw]" />
                    </a>
                    <a href="https://www.youtube.com/channel/nama_channel" target="_blank" rel="noopener noreferrer">
                        <FaYoutube className="hover:text-gray-700 w-[2.2vw] h-[2.2vw]" />
                    </a>
                </div>
            </div>




            {/* Kanan: Penyelenggara */}
            <div className="flex flex-col items-center gap-4 text-neutral-800">
                <div className="font-bold text-xl md:text-3xl font-['Sofia_Sans_Condensed'] leading-snug">
                    Diselenggarakan oleh
                </div>
                <div className="flex gap-4">
                    <img src={"/Footer/logoUgm.png"} className="w-[4vw] h-[4vw]" />
                    <img src={"/Footer/logoBemFT.png"} className="w-[4vw] h-[4vw]" />
                    <img src={"/Footer/logoKementrian.png"} className="w-[4vw] h-[4vw]" />
                </div>
            </div>
        </div>


    </div>

  )
}

export default FooterTeknisiade