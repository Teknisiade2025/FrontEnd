
import '@/app/globals.css';
import NavbarDashboard from '@/app/component/navbar/navbarDashboard';

export default function scheduleLayout({ children }) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-black">
      <NavbarDashboard />
   
      <main>{children}</main>
     
    </div>
  );
}