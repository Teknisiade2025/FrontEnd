import React from 'react';
import Dashboard from '../component/manager/dashboard';


export default function HomePage() {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bgmanager.svg')" }}
    >
      <Dashboard />
    </div>
  );
}
