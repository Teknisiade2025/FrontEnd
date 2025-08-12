
import '@/app/globals.css';
import NavbarDashboard from '@/app/component/navbar/navbarDashboard';
import { Suspense } from 'react';

export default function scheduleLayout({ children }) {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-black">
      <NavbarDashboard />
   
      <main>
        <Suspense fallback={<div className="pt-5 text-white">Loading...</div>}>
          {children}
        </Suspense>
      </main>
     
    </div>
  );
}