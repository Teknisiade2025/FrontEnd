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
  const [selectedDropdown, setSelectedDropdown] = useState(null);

  const dropdownRef = useRef();
  const mobileMenuRef = useRef();
  const router = useRouter() 




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
          <Link href="/mainPage">
          <Image
            src="/logoTeksid.png"
            alt="Logo"
            width={56}
            height={56}
            className="w-12 h-12 object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 lg:gap-12 items-center text-neutral-800 text-base lg:text-xl font-black font-['Sofia_Sans_Condensed'] flex-wrap max-w-[70%]">
            <a href="/DASHBOARD/adminDashboard" className="hover:underline whitespace-nowrap">Menu Utama</a>
            <a href="/DASHBOARD/adminVerifikasi" className="hover:underline whitespace-nowrap">Verifikasi Peserta</a>
            <a href="/DASHBOARD/adminJadwal" className="hover:underline whitespace-nowrap">Schedule Pertandingan</a>

            <a href="/DASHBOARD/adminScoreboard" className="hover:underline whitespace-nowrap">Update Skor</a>
            <Link href="/DASHBOARD/adminMedal" className="hover:underline whitespace-nowrap">Update Klasmen</Link>
          </div>

          {/* Login (Desktop) */}
          <Link href="/DASHBOARD/login" passHref>
            <div className="hidden md:flex items-center gap-2 text-neutral-800 text-base lg:text-xl font-black font-['Sofia_Sans_Condensed'] cursor-pointer hover:bg-amber-100 transition-colors duration-200 p-2 px-7 rounded-4xl">
              <span>Keluar</span>
              <IoLogInOutline size={24} />
            </div>
          </Link>
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
          <Link href="" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Menu Utama</Link>
          <Link href="/schedule" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Verifikasi Peserta</Link>
          <a href="/klasemen" className="hover:underline" onClick={() => router.push("/klasemen")}>Schedule Pertandingan</a>
          <a href="/supporterPage" className="hover:underline" onClick={() => router.push("/supporterPage")}>Update Skor</a>

          <div className="flex items-center gap-2 cursor-pointer self-start hover:bg-amber-100 transition-colors duration-200 p-2 rounded"
          onClick={() => router.push("/comingsoon")}>
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
