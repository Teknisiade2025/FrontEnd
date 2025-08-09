import Navbar from '@/app/component/navbar/navbarMobileDesktop';
import Footer from '@/app/component/footer/footerMobileDesktop';
import '@/app/globals.css';

export default function scheduleLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}