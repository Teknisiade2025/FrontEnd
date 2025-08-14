import Navbar from '@/app/component/navbar/navbarMobileDesktop';
import Footer from '@/app/component/footer/footerMobileDesktop';
import { Suspense } from 'react';
import '@/app/globals.css';

export default function subCabangLayout({ children }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading Pertandingan...</div>}> 
      <main>{children}</main>
      </Suspense>
      
      <Footer />
    </>
  );
}