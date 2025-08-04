import React from 'react';
import Admin from '../component/admin/dashboard.jsx';

export default function HomePage() {
  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bglogin.svg')" }}
    >
      <Admin />
    </div>
  );
}
