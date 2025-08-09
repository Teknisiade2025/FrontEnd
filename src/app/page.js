
import React from "react";
import LandingPage from "@/app/mainPage/page"
import Navbar from '@/app/component/navbar/navbarMobileDesktop';
import Footer from '@/app/component/footer/footerMobileDesktop';


export default function Home() {
  return (
    <div className = "min-h-screen">
      <Navbar />

      <LandingPage />
      <Footer/>

    </div>
  );
}
