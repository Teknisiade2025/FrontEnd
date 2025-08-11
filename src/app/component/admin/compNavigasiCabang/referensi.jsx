import React, { useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';

const CabangNavigasi = () => {
  const [activeCabang, setActiveCabang] = useState('Sepak Bola');
  
  const cabangOlahraga = [
    'Sepak Bola', 'Voli', 'Basket', 'Badminton', 'Futsal', 
    'Tenis Meja', 'Atletik', 'Catur', 'PUBG', 'Mobile Legends', 
    'Valorant', 'FIFA'
  ];
  
  const cabangSeni = [
    'Band', 'Vokal Grup', 'Solo Vokal', 'Modern Dance', 
    'Tari Tradisional', 'Fotografi', 'Seni Lukis', 
    'Cipta Puisi', 'Monolog', 'Poster'
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 p-6 font-sans">
      {/* Sidebar Navigasi (1/4 lebar) */}
      <div className="w-1/4 mr-6">
        <div className="w-full h-[765px] px-8 pt-9 pb-8 bg-gray-800 rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-[3px] outline-offset-[-3px] outline-white">
          <div className="w-full h-[731px] flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            
            {/* Cabang Olahraga */}
            <div className="px-5 w-full">
              <div className="justify-start text-neutral-100 text-2xl font-normal font-sans">Cabang Olahraga</div>
            </div>
            <div className="w-full p-2.5 flex flex-col justify-start items-start gap-2.5 overflow-y-auto max-h-[300px]">
              {cabangOlahraga.map((cabang, index) => (
                <div 
                  key={index}
                  className={`w-full h-8 px-6 rounded-2xl inline-flex justify-start items-center cursor-pointer transition-all duration-200 ${
                    activeCabang === cabang 
                      ? 'bg-amber-500' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveCabang(cabang)}
                >
                  <div className={`w-4/5 justify-start text-sm font-bold leading-tight ${
                    activeCabang === cabang 
                      ? 'text-gray-900' 
                      : 'text-gray-300'
                  }`}>
                    {cabang}
                  </div>
                  <div className="w-1/5 h-6 flex justify-center items-center">
                    <HiChevronRight 
                      className={`w-4 h-4 ${
                        activeCabang === cabang 
                          ? 'text-gray-900' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Cabang Seni */}
            <div className="px-5 w-full mt-4">
              <div className="justify-start text-neutral-100 text-xl font-normal font-sans">Cabang SENI</div>
            </div>
            <div className="w-full p-2.5 flex flex-col justify-start items-start gap-2.5 overflow-y-auto max-h-[300px]">
              {cabangSeni.map((cabang, index) => (
                <div 
                  key={index}
                  className={`w-full h-8 px-6 rounded-2xl inline-flex justify-start items-center cursor-pointer transition-all duration-200 ${
                    activeCabang === cabang 
                      ? 'bg-amber-500' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveCabang(cabang)}
                >
                  <div className={`w-4/5 justify-start text-sm font-bold leading-tight ${
                    activeCabang === cabang 
                      ? 'text-gray-900' 
                      : 'text-gray-300'
                  }`}>
                    {cabang}
                  </div>
                  <div className="w-1/5 h-6 flex justify-center items-center">
                    <HiChevronRight 
                      className={`w-4 h-4 ${
                        activeCabang === cabang 
                          ? 'text-gray-900' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Area Konten (3/4 lebar) */}
      <div className="w-3/4">
        <div className="bg-gray-800 rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline outline-[3px] outline-offset-[-3px] outline-white p-8 h-full">
          <h1 className="text-3xl font-bold text-amber-500 mb-8">{activeCabang}</h1>
          
          <div className="bg-gray-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Input Jadwal</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Tanggal</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-600 text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Waktu</label>
                <input 
                  type="time" 
                  className="w-full bg-gray-600 text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-gray-400 mb-2">Lokasi</label>
                <input 
                  type="text" 
                  placeholder="Masukkan lokasi pertandingan/pertunjukan"
                  className="w-full bg-gray-600 text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-gray-400 mb-2">Peserta/Tim</label>
                <textarea 
                  placeholder="Masukkan nama peserta atau tim yang akan bertanding/berpartisipasi"
                  className="w-full bg-gray-600 text-gray-200 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-amber-500"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="bg-amber-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors duration-200">
                Simpan Jadwal
              </button>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Jadwal Terdaftar</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-gray-300">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-3 px-4 text-left rounded-tl-lg">Tanggal</th>
                    <th className="py-3 px-4 text-left">Waktu</th>
                    <th className="py-3 px-4 text-left">Lokasi</th>
                    <th className="py-3 px-4 text-left">Peserta</th>
                    <th className="py-3 px-4 text-right rounded-tr-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-600 hover:bg-gray-700">
                    <td className="py-3 px-4">15 Agustus 2025</td>
                    <td className="py-3 px-4">14:00 - 16:00</td>
                    <td className="py-3 px-4">Lapangan Utama</td>
                    <td className="py-3 px-4">Tim A vs Tim B</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-amber-500 hover:text-amber-400 mr-2">Edit</button>
                      <button className="text-red-500 hover:text-red-400">Hapus</button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-600 hover:bg-gray-700">
                    <td className="py-3 px-4">17 Agustus 2025</td>
                    <td className="py-3 px-4">10:00 - 12:00</td>
                    <td className="py-3 px-4">Lapangan 2</td>
                    <td className="py-3 px-4">Tim C vs Tim D</td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-amber-500 hover:text-amber-400 mr-2">Edit</button>
                      <button className="text-red-500 hover:text-red-400">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabangNavigasi;