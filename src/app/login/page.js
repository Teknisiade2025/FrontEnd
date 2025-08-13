'use client';
import SignIn from '@/app/component/login/login';
import { useState } from 'react';
import React from 'react';


export default function HomePage() {
  const [selectedData, setSelectedData] = useState(null);

  const handleCategorySelect = (data) => {
    setSelectedData(data); 
  };

  return (
    <div
      className="flex flex-row min-h-screen pt-10 gap-1 w-screen bg-[url('/bglogin.svg')] pb-20 bg-cover bg-no-repeat bg-center">
      <SignIn/>
      </div>

  );
}
