import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaYoutube } from 'react-icons/fa';

const FooterTeknisiade = () => {
  return (
    <footer className="relative w-full -top-38 lg:-top-84 ">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background */}
        <div className="hidden md:block w-full">
          <Image
            src="/Footer/footerdesktopBG.png"
            alt="BG Desktop"
            width={1920}
            height={280}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Mobile Background */}
        <div className="md:hidden w-full">
          <Image
            src="/Footer/footerBG.svg"
            alt="BG Mobile"
            width={400}
            height={716}
            className="w-full aspect-[7/16] object-cover"
          />
        </div>
      </div>


      {/* Konten */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-12 md:py-16  flex flex-col md:flex-row justify-center items-center md:items-start gap-10 md:gap-10 lg:gap-20 -mt-[2vh] sm:-mt-[5vh] md:mt-15 lg:mt-45">
        {/* Kolom Kiri */}
        <div className="flex flex-col gap-4 text-neutral-800 items-center md:items-start text-center md:text-left md:pt-0 -mb-[2vh] sm:-mb-[13vh] lg:-mb-[35vh] mt-[30vh] sm:mt-[25vh] md:mt-[6vh] lg:mt-[34vh] ">
          <Image
            src="/TeksTeknisiade2025.png"
            alt="Logo Teknisade"
            width={400}
            height={100}
            className="w-[60vw] md:w-[36vw] lg:w-[30vw] h-auto"
          />

          <div className="font-bold text-lg md:text-[2.3vw] lg:text-2xl font-['Sofia_Sans_Condensed'] leading-snug">
            OASE BEM KMFT<br />
            FAKULTAS TEKNIK<br />
            UNIVERSITAS GADJAH MADA
          </div>

          <p className="text-sm md:text-[2.1vw] lg:text-lg opacity-80 font-['Sofia_Sans_Condensed'] sm:w-[35vw]  max-w-xs md:max-w-xs lg:max-w-lg">
            Jl. Grafika No.2, Senolowo, Sinduadi, Kec. Mlati, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
          </p>

          <div className="flex gap-4 md:-mt-2 lg:mt-2 text-black text-xl md:text-2xl">
            <a href="https://www.instagram.com/nama_akun_ig" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-700 w-6 h-6 md:w-[2.2vw] md:h-[2.2vw]" />
            </a>
            <a href="https://twitter.com/nama_akun_twitter" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Footer/logoX.svg"
                alt="Logo X"
                width={24}
                height={24}
                className="hover:opacity-80 w-6 h-6 md:w-[2vw] md:h-[2vw]"
              />
            </a>
            <a href="https://www.youtube.com/channel/nama_channel" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="hover:text-gray-700 w-6 h-6 md:w-[2.2vw] md:h-[2.2vw]" />
            </a>
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="flex flex-col items-center text-neutral-800 text-center -mb-[20vh] mt-10 sm:mt-[12vh] md:mt-[13vh] lg:mt-[50vh]">
          <div className="font-bold text-base md:text-[2.1vw] lg:text-2xl font-['Sofia_Sans_Condensed']">
            Diselenggarakan oleh
          </div>
          <div className="flex gap-4 mt-2">
            <Image src="/Footer/logoUgm.png" alt="UGM" width={64} height={64} className="w-16 h-16 md:w-[6vw] md:h-[6vw]" />
            <Image src="/Footer/logoBemFT.png" alt="BEM FT" width={64} height={64} className="w-16 h-16 md:w-[6vw] md:h-[6vw]" />
            <Image src="/Footer/logoKementrian.png" alt="Kementrian" width={64} height={64} className="w-16 h-16 md:w-[6vw] md:h-[6vw]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTeknisiade;
