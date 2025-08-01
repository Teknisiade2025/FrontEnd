import React from 'react';
import Login from '../component/login/login.jsx';

export default function HomePage() {
  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/bglogin.svg')" }}
    >
      <Login />
    </div>
  );
}
