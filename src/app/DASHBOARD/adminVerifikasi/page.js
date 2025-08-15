'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Verifikasi from '@/app/component/admin/verifikasi/verifikasi';
import CabangDiversifikasi from '@/app/component/admin/verifikasi/revisiFE';
import KmhmNavigasi from '@/app/component/admin/compNavigasiCabang/kmhmNav';

const AdminVerifikasi = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeKmhm, setActiveKmhm] = useState(null);
  const [selectedData, setSelectedData] = useState({
    mainCategory: searchParams.get('category') || null,
    subCategory: searchParams.get('subcategory') || null,
  });

  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    setSelectedData({
      mainCategory: category,
      subCategory: subcategory,
    });
  }, [searchParams]);

  const handleExport = () => {
    console.log('Exporting data for', activeKmhm);
  };

  return (
    <div className={`flex flex-col h-[110vh] w-screen pt-1 gap-1 bg-[url('/bgadminverif.svg')] bg-center bg-contain overflow-hidden font-sofia`}>
      {!selectedData.mainCategory && (
        <CabangDiversifikasi />
      )}

      {selectedData.mainCategory && (
        <>
        <div className="scale-85 ">
          <header className="relative z-30 flex items-center justify-between mx-auto px-6 pt-14 w-[95%]">
            <div className="flex items-center gap-4 pr-5">
              <button 
                onClick={() => {
                  setSelectedData({ mainCategory: null, subCategory: null });
                  setActiveKmhm(null);
                }}
                className="flex items-center gap-2 text-[2vw] text-[#3C3022] font-snowstorm font-normal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="#3C3022" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Cabang
              </button>
            </div>

            <div className="flex items-center gap-2 px-5">
              <span className="text-[2vw] font-snowstorm font-normal text-[#3C3022]">
                {selectedData.mainCategory}
              </span>
              {selectedData.subCategory && (
                <>
                  <span className="text-3xl font-bold text-[#3C3022]">•</span>
                  <span className="text-[1.3vw] font-snowstorm font-normal text-[#3C3022]">
                    {selectedData.subCategory}
                  </span>
                </>
              )}
            </div>
          </header>

          <div className="flex flex-row pr-15 pl-5 gap-45 h-[600px] w-full items-center justify-center">
            <div className="w-64 px-2 -mt-40 h-full">
              <KmhmNavigasi
                activeKmhm={activeKmhm}
                setActiveKmhm={setActiveKmhm}
              />
            </div>
            
            <div className="flex-1 px-3 h-full w-[100vh] pt-3">
              {activeKmhm ? (
                <Verifikasi
                  kmhmName={activeKmhm}
                  selectedSport={selectedData}
                  onExport={handleExport}
                />
              ) : (
                <div className="w-full h-full max-w-7xl mx-auto px-10 bg-[#806037] border-4 border-white rounded-[32px] shadow-lg">
                  <div className="flex-1 h-full flex items-center justify-center">
                    <div className="text-lg font-semibold text-white text-center">
                      Silahkan pilih nama KMHM terlebih dahulu.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          </div>
        </>
      )}
    </div>
  );
};

export default AdminVerifikasi;