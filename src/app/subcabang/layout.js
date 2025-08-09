import Navbar from '@/app/component/navbar/navbarMobileDesktop';
import Footer from '@/app/component/footer/footerMobileDesktop';
import '@/app/globals.css';

export default function subCabangLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}