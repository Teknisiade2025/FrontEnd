
import '@/app/globals.css';

export default function scheduleLayout({ children }) {
  return (
    <div className="min-h-screen flex justify-center bg-black items-center">
   
      <main>{children}</main>
     
    </div>
  );
}