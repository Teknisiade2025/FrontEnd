"use client";
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { IoChevronDownSharp, IoLogInOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const dropdownRef = useRef();
  const mobileMenuRef = useRef();
  const router = useRouter() 

  const dropdownOptions = {
  Olahraga: ["Sepak Bola", "Futsal", "Mobile Legends", "valorant",
              "Voli", "Tenis Meja", "FIFA", "Atletik",
              "Badminton", "Basket", "catur", "PUBG"],
  Seni: ["Band", "Tari Tradisional", "Cipta Puisi", "Fotografi",
          "Vokal Grup", "Dance", "Poster", "Seni Lukis", 
          "Solo Vokal", "Monolog" ],
  };



  // Close dropdown or mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-150">
      {/* Navbar Wrapper */}
      <div className="p-4 sm:p-4 md:p-7">
        <div className="rounded-[40px] shadow-md bg-[radial-gradient(ellipse_75.58%_75.58%_at_45.52%_50%,_#FBEAD1_0%,_#D0B58D_100%)] flex items-center justify-between px-6 py-1 md:py-2 relative z-40">
          {/* Logo */}
          <Image
            src="/logoTeksid.png"
            alt="Logo"
            width={56}
            height={56}
            className="w-12 h-12 object-contain"
            onClick={() => router.push("/mainPage")}
          />

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 lg:gap-12 items-center text-neutral-800 text-base lg:text-xl font-black font-['Sofia_Sans_Condensed'] flex-wrap max-w-[70%]">
            <a href="/schedule" className="hover:underline whitespace-nowrap">Schedule</a>
            <a href="/klasemen" className="hover:underline whitespace-nowrap">Klasemen</a>
            <div className="relative flex flex-col justify-center" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                      className="flex items-center justify-center gap-1 hover:underline whitespace-nowrap">
                      Cabang <IoChevronDownSharp className="text-lg" />
              </button>
              <div className={`absolute top-full -left-25 min-w-[300px] grid grid-cols-2 gap-6 p-6 bg-[radial-gradient(ellipse_75.58%_75.58%_at_45.52%_50%,_#FBEAD1_0%,_#D0B58D_100%)] rounded-xl shadow-md z-30 overflow-hidden transition-all duration-1000 ease-in-out transform ${isDropdownOpen ? 'max-h-[500px] opacity-100 translate-y-1' : 'max-h-0 opacity-0 -translate-y-2'} origin-top mt-6`}>
                {/* Olahraga Column */}
                <div>
                <h3 className="font-extrabold text-left font-sofia text-base mb-3 max-w-[150px] px-3 text-[#806037]">Olahraga</h3>
                <ul className="flex flex-col gap-2 text-medium font-sofia text-left max-w-[150px]  px-3">
                  {dropdownOptions.Olahraga.map((option, idx) => (
                    <li key={`olahraga-${idx}`}
                    className="cursor-pointer hover:underline text-sm py-1 hover:text-[#806037] transition-colors"
                    onClick={() => {
                    router.push(`/subcabang?nama=${option.toUpperCase()}`);
                    setSelectedDropdown(option);
                    setIsDropdownOpen(false);}}>
                      {option}
                    
                    </li>
                  ))}
                </ul>
                </div>
                {/* Seni Column */}
                <div>
                  <h3 className="font-extrabold text-base text-left mb-3 max-w-[150px] px-3 text-[#806037]">Seni</h3>
                  <ul className="flex flex-col gap-2 text-base text-left max-w-[150px]  px-3">
                    {dropdownOptions.Seni.map((option, idx) => (
                      <li key={`seni-${idx}`}
                      className="cursor-pointer hover:underline text-sm py-1 hover:text-[#806037] transition-colors"
                      onClick={() => {
                        router.push(`/subcabang?nama=${option.toUpperCase()}`);
                        setSelectedDropdown(option);
                        setIsDropdownOpen(false);}}>
                        {option}
                        
                      </li>
                    ))}
                  </ul>
              </div>
              </div>
            </div>
            <a href="/supporterPage" className="hover:underline whitespace-nowrap">Supporter</a>
            <a href="/faq" className="hover:underline whitespace-nowrap">FAQ</a>
          </div>

          {/* Login (Desktop) */}
          <div className="hidden md:flex items-center gap-2 text-neutral-800 text-base lg:text-xl font-black font-['Sofia_Sans_Condensed'] cursor-pointer hover:bg-amber-100 transition-colors duration-200 p-2 px-7 rounded-4xl"
              onClick={() => router.push("/login")}>
            <span>Login</span>
            <IoLogInOutline size={24} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ">
            <AiOutlineMenu size={28} onClick={() => setIsMenuOpen(true)} className="cursor-pointer text-black" />
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-In */}
      <div ref={mobileMenuRef} className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[radial-gradient(ellipse_75.58%_75.58%_at_45.52%_50%,_#FBEAD1_0%,_#D0B58D_100%)] z-50 shadow-lg transition-transform duration-300 ease-in-out rounded-l-2xl px-6 py-8 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Close Button */}
        <div className="flex justify-end">
          <AiOutlineClose size={24} onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-black" />
        </div>

        {/* Mobile Menu Items */}
        <nav className="mt-13 flex flex-col gap-13 text-neutral-800 text-xl  font-black font-['Sofia_Sans_Condensed'] items-center">
          <Link href="/schedule" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Schedule</Link>
          <a href="/klasemen" className="hover:underline" onClick={() => router.push("/klasemen")}>Klasemen</a>

          {/* Dropdown Mobile */}
          <div className="w-full">
            <button onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)} className="flex justify-center items-center gap-1 hover:underline w-full">
              Cabang <IoChevronDownSharp className="text-lg" />
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isMobileDropdownOpen ? 'max-h-[400px] mt-2' : 'max-h-0'}`}>  
              <div className="bg-transparant shadow-lg rounded-xl p-4 space-y-6 max-h-[400px] overflow-y-auto">
              {/* Olahraga */}
              {/* Olahraga */}
      <div>
        <h3 className="font-bold text-base mb-3 text-[#806037] text-center">Olahraga</h3>
        <ul className="flex flex-col gap-2 text-black text-lg">
          {dropdownOptions.Olahraga.map((item, index) => (
            <li key={`mobile-olahraga-${index}`}>
              <Link
                href={`/subcabang?nama=${item.toUpperCase()}`}
                onClick={() => {
                  setIsMobileDropdownOpen(false);
                  setIsMenuOpen(false);
                }}
                className="block hover:underline text-center"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Seni */}
      <div>
        <h3 className="font-bold text-base mb-3 text-[#806037] text-center">Seni</h3>
        <ul className="flex flex-col gap-2 text-black text-lg">
          {dropdownOptions.Seni.map((item, index) => (
            <li key={`mobile-seni-${index}`}>
              <Link
                href={`/subcabang?nama=${item.toUpperCase()}`}
                onClick={() => {
                  setIsMobileDropdownOpen(false);
                  setIsMenuOpen(false);
                }}
                className="block hover:underline text-center"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
       </div>
            </div>
          </div>



          <a href="/supporter" className="hover:underline" onClick={() => router.push("/supporterPage")}>Supporter</a>
          <a href="/faq" className="hover:underline" onClick={() => router.push("/faq")}>FAQ</a>

          <div className="flex items-center gap-2 cursor-pointer self-start hover:bg-amber-100 transition-colors duration-200 p-2 rounded"
          onClick={() => router.push("/login")}>
            <span>Login</span>
            <IoLogInOutline size={24} />
          </div>
        </nav>
      </div>

      {/* Background overlay with blur for mobile menu only */}
      {isMenuOpen && (
        <div
          className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsDropdownOpen(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default Navbar;
