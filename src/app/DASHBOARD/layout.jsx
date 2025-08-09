
import '@/app/globals.css';

export default function scheduleLayout({ children }) {
  return (
    <div className="min-h-screen flex justify-center items-center">
   
      <main>{children}</main>
     
    </div>
  );
}