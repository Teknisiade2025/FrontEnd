import React from 'react'
 // Pastikan file berada di folder yang sama
import { IoChevronDownSharp, IoLogInOutline } from 'react-icons/io5'

const NavbarDesktop = () => {
  return (

    <div className='fixed top-0 left-0 w-full z-50 bg-transparent'>
      <div className=' grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-0 gap-16 sm:p-20'>

          <div className="w-full px-8 py-4 bg-[radial-gradient(ellipse_75.58%_75.58%_at_45.52%_50%,_#FBEAD1_0%,_#D0B58D_100%)] rounded-[40px] shadow-md flex justify-between items-center  ">
            
            {/* Logo */}
            <img className="w-14 h-14" src={"/NavbarDesk/logoTeksid.png"} alt="Logo" />

            {/* Menu Links */}
            <div className="flex gap-12 items-center text-neutral-800 text-xl font-black font-['Sofia_Sans_Condensed']">
              <a href="#schedule" className="hover:underline">Schedule</a>
              <a href="#klasemen" className="hover:underline">Klasemen</a>
              <button className="flex items-center gap-1 hover:underline">
                Cabang <IoChevronDownSharp className="text-lg" />
              </button>
              <a href="#supporter" className="hover:underline">Supporter</a>
              <a href="#faq" className="hover:underline">FAQ</a>
            </div>

            {/* Login */}
            <div className="flex items-center gap-2 text-neutral-800 text-xl font-black font-['Sofia_Sans_Condensed'] cursor-pointer">
              <span>Login</span>
              <IoLogInOutline size={24} />
              
            </div>
          </div>
        </div>

    </div>
    
  )
}

export default NavbarDesktop
