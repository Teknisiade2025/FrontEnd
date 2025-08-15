
import '@/app/globals.css';

import { Suspense } from 'react';

export default function scheduleLayout({ children }) {
  return (

   
      <main>
        <Suspense fallback={<div className="pt-5 text-white">Loading...</div>}>
          {children}
        </Suspense>
      </main>

  );
}