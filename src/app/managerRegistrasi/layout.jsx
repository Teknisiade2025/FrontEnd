
import '@/app/globals.css';
import { Suspense } from 'react';

export default function subCabangLayout({ children }) {
  return (
    <>
  <Suspense fallback={<div>Loading Form...</div>}>
   <main>{children}</main>
  </Suspense>
     
    
    </>
  );
}