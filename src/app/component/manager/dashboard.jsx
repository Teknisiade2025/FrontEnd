'use client';

import React, { useState } from 'react';
import { HiChevronRight, HiUser } from 'react-icons/hi';
import { IoLogOut, IoAddCircleSharp } from 'react-icons/io5';
import { AiTwotoneEdit } from 'react-icons/ai';

const ManagerDashboard = () => {
  const [selectedSport, setSelectedSport] = useState('Sepak Bola');
  const [activeTab, setActiveTab] = useState('Atlet');
  
  const sportsCategories = [
    'Sepak Bola', 'Voli', 'Basket', 'Badminton', 'Futsal', 
    'Tenis Meja', 'Atletik', 'Catur', 'PUBG', 'Mobile Legends', 'Valorant', 'FIFA'
  ];
  
  const artCategories = [
    'Band', 'Vokal Grup', 'Solo Vocal', 'Modern Dance', 'Tari Tradisional',
    'Fotografi', 'Seni Lukis', 'Cipta Puisi', 'Monolog', 'Poster'
  ];

  const athletes = [
    {
      id: 1,
      name: "John Doe",
      sport: "Basket Putra",
      kmhm: "KMTETI",
      major: "Teknik Elektro",
      year: "2022",
      email: "JohnDoe@gmail.com",
      phone: "08123456789",
      birthPlace: "Jakarta, 25 April 2022",
      city: "DKI Jakarta",
      comments: [
        "Ipsum congue eget pretium non sit blandit at. Tellus nunc sed morbi eget cras. Elementum amet penatibus elementum ultrices consectetur elementum aliquet.",
        "Ipsum congue eget pretium non sit blandit at. Tellus nunc sed morbi eget cras. Elementum amet penatibus elementum ultrices consectetur elementum aliquet."
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      sport: "Basket Putra", 
      kmhm: "KMTETI",
      major: "Teknik Elektro",
      year: "2022",
      email: "JaneSmith@gmail.com",
      phone: "08123456789",
      birthPlace: "Jakarta, 25 April 2022",
      city: "DKI Jakarta",
      comments: []
    }
  ];

  return (
    <div className="min-h-screen bg-amber-100 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-6 bg-amber-100">
        {/* Category Tabs */}
        <div className="flex bg-amber-600 rounded-full p-1">
          <button 
            onClick={() => setActiveTab('Atlet')}
            className={`px-8 py-2 rounded-full font-extrabold text-sm ${
              activeTab === 'Atlet' 
                ? 'bg-white text-gray-800' 
                : 'bg-transparent text-gray-800'
            }`}
          >
            Atlet
          </button>
          <button 
            onClick={() => setActiveTab('Coach')}
            className={`px-6 py-2 rounded-full font-extrabold text-sm ${
              activeTab === 'Coach' 
                ? 'bg-white text-gray-800' 
                : 'bg-transparent text-gray-800'
            }`}
          >
            Coach
          </button>
        </div>

        {/* Title and Logout */}
        <div className="flex items-center gap-6">
          <h1 className="text-4xl font-normal text-blue-900" style={{fontFamily: 'Snowstorm, serif'}}>
            Registrasi Atlet
          </h1>
          <div className="w-px h-9 bg-black"></div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-900">Keluar</span>
            <IoLogOut className="w-8 h-8 text-blue-900 rotate-180" />
          </div>
        </div>

        {/* Sport Category */}
        <div className="flex items-center gap-4">
          <span className="text-3xl font-extrabold text-blue-900">Putra</span>
          <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
          <span className="text-4xl font-normal text-blue-900" style={{fontFamily: 'Snowstorm, serif'}}>
            SEPAK BOLA
          </span>
        </div>
      </div>

      <div className="flex gap-10 px-6 h-[calc(100vh-120px)]">
        {/* Left Sidebar */}
        <div className="w-96 bg-amber-600 rounded-3xl shadow-lg p-7 flex flex-col">
          <div className="flex-1 overflow-y-auto">
            {/* Sports Section */}
            <div className="mb-6">
              <h2 className="text-2xl font-normal text-white mb-5 px-5" style={{fontFamily: 'Snowstorm, serif'}}>
                Cabang Olahraga
              </h2>
              <div className="space-y-2.5">
                {sportsCategories.map((sport, index) => (
                  <div
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`flex justify-between items-center px-4 py-2 rounded-2xl cursor-pointer ${
                      selectedSport === sport && index === 0
                        ? 'bg-orange-300 text-gray-800'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    <span className="text-sm font-bold">{sport}</span>
                    <HiChevronRight className="w-6 h-6" />
                  </div>
                ))}
              </div>
            </div>

            {/* Arts Section */}
            <div>
              <h2 className="text-xl font-normal text-white mb-5 px-5" style={{fontFamily: 'Snowstorm, serif'}}>
                Cabang SENI
              </h2>
              <div className="space-y-2.5">
                {artCategories.map((art) => (
                  <div
                    key={art}
                    className="flex justify-between items-center px-4 py-2 bg-white rounded-2xl cursor-pointer"
                  >
                    <span className="text-sm font-bold text-gray-600">{art}</span>
                    <div className="w-1.5 h-4 border-2 border-gray-600 rounded-sm"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Scrollbar */}
          <div className="w-3 h-full bg-orange-100 rounded-2xl ml-2 relative">
            <div className="w-2 h-32 bg-gray-800 rounded-2xl absolute top-8 left-0.5"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-amber-600 rounded-3xl shadow-lg relative overflow-hidden">
          {/* Status Filters */}
          <div className="absolute top-10 left-18 flex items-center gap-10">
            <div className="flex gap-2.5">
              <div className="flex justify-between items-center bg-orange-300 rounded-full px-8 py-3 shadow-md">
                <span className="font-bold text-orange-100">UNVERIFIED</span>
                <div className="flex items-center gap-1">
                  <div className="w-px h-5 bg-orange-100"></div>
                  <span className="text-sm text-orange-100">16</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white rounded-full px-8 py-3 shadow-md">
                <span className="font-bold text-gray-800">REVISI</span>
                <div className="flex items-center gap-1">
                  <div className="w-px h-5 bg-gray-800"></div>
                  <span className="text-sm text-gray-800">4</span>
                </div>
              </div>
              <div className="flex justify-between items-center bg-white rounded-full px-8 py-3 shadow-md">
                <span className="font-bold text-gray-800">VERIFIED</span>
                <div className="flex items-center gap-1">
                  <div className="w-px h-5 bg-gray-800"></div>
                  <span className="text-sm text-gray-800">4</span>
                </div>
              </div>
            </div>
            <span className="text-xl font-extrabold text-white">Total Atlet: 24</span>
          </div>

          {/* Add Athlete Button */}
          <div className="absolute top-10 right-16 flex flex-col items-center gap-1">
            <IoAddCircleSharp className="w-16 h-16 text-orange-300" />
            <span className="text-lg font-bold text-white text-center leading-tight">
              Daftarkan<br/>Atlet
            </span>
          </div>

          {/* Athletes List */}
          <div className="absolute top-40 left-16 right-16 bottom-4 overflow-y-auto">
            <div className="space-y-6">
              {athletes.map((athlete, index) => (
                <div key={athlete.id} className="flex gap-2.5">
                  {/* Athlete Card */}
                  <div className="w-[724px] bg-white rounded-3xl p-11 flex gap-11">
                    {/* Avatar */}
                    <div className="w-36 h-44 bg-orange-300 rounded-xl flex items-center justify-center">
                      <HiUser className="w-28 h-28 text-white" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 space-y-1">
                      {[
                        ['Nama', athlete.name],
                        ['Cabang', athlete.sport],
                        ['Asal KMHM', athlete.kmhm],
                        ['Jurusan', athlete.major],
                        ['Angkatan', athlete.year],
                        ['Email', athlete.email],
                        ['No. HP', athlete.phone],
                        ['Tempat, Tanggal Lahir', athlete.birthPlace],
                        ['Asal Kota', athlete.city]
                      ].map(([label, value]) => (
                        <div key={label} className="flex">
                          <div className="w-44 font-bold text-gray-800 text-base leading-none">
                            {label}
                          </div>
                          <div className="flex-1 text-gray-800 text-base leading-none">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="w-60 bg-sky-800 rounded-3xl p-6 flex flex-col">
                    <div className="flex-1 flex gap-2.5">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-white mb-2.5">
                          Riwayat Komentar
                        </h3>
                        <div className="space-y-2.5 h-60 overflow-y-auto">
                          {athlete.comments.length > 0 ? (
                            athlete.comments.map((comment, i) => (
                              <div key={i} className="px-2 py-1">
                                <p className="text-xs text-white leading-tight">
                                  {comment}
                                </p>
                                <div className="h-px bg-white mt-2.5"></div>
                              </div>
                            ))
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-xs text-white text-center">
                                Belum ada komentar
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`w-1 rounded-2xl ${
                        athlete.comments.length > 0 ? 'bg-white h-64' : 'bg-slate-400 h-64'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Scrollbar */}
          <div className="absolute right-4 top-40 bottom-4 w-3 bg-orange-100 rounded-2xl">
            <div className="w-2 h-24 bg-gray-800 rounded-2xl ml-0.5 mt-0.5"></div>
          </div>
        </div>
      </div>

      {/* Edit Buttons */}
      <div className="absolute bottom-32 right-32 flex flex-col gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-800">Edit</span>
            <div className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center">
              <AiTwotoneEdit className="w-6 h-6 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerDashboard;