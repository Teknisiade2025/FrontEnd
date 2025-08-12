'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Verifikasi from '@/app/component/admin/verifikasi/verifikasi';
import CabangDiversifikasi from '@/app/component/admin/verifikasi/cabang';
import KmhmNavigasi from '@/app/component/admin/compNavigasiCabang/kmhmNav';
import { Suspense } from 'react';

const AdminVerifikasi = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [dataTerpilih, setDataTerpilih] = useState(null);
  const [activeKmhm, setActiveKmhm] = useState(null);

  const [selectedRole, setSelectedRole] = useState(() => searchParams.get('role') || '');
  const [selectedData, setSelectedData] = useState({
    mainCategory: searchParams.get('category') || null,
    subCategory: searchParams.get('subcategory') || null,
  });

  // Sinkronisasi state selectedRole dengan URL query
  useEffect(() => {
    if (searchParams.get('role') !== selectedRole) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('role', selectedRole);
      router.push(`?${params.toString()}`);
    }
  }, [selectedRole]);
  const handleExport = () => {
    console.log('Exporting data for', selectedRole, 'in', activeKmhm);
  };

  // Sinkronisasi state selectedData dengan URL query
  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');

    setSelectedData({
      mainCategory: category,
      subCategory: subcategory,
    });
  }, [searchParams]);

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="flex flex-col min-h-screen pt-10 gap-1 w-[100vw] bg-[url('/bglogin.svg')]">
      {/* Render pemilihan cabang hanya jika belum pilih category */}
      {!selectedData.mainCategory && (
        <CabangDiversifikasi />
      )}

      {/* Render konten jika sudah pilih */}
      {selectedData.mainCategory && (
        <>
          <header className="flex items-center justify-between px-6 pt-20 w-full">
            <div className="flex items-center gap-4 pr-5">
              {/* Toggle Role */}
              <div className="w-80 h-14 px-8 py-2 bg-[#8B5E3C] rounded-[44.15px] inline-flex gap-[5px] overflow-hidden">
                {['Atlet', 'Coach'].map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleChange(role)}
                    className={`flex-1 py-2 px-12 w-full rounded-[37.74px] flex justify-center items-center
                      ${selectedRole === role ? 'bg-[#F8E7C1]' : 'bg-[#BFA78A]'}`}
                  >
                    <span className="text-neutral-800 text-sm font-extrabold">{role}</span>
                  </button>
                ))}
              </div>

              <h1 className="text-xl px-15 font-extrabold text-neutral-900">
                Registrasi {selectedRole}
              </h1>
            </div>

            <div className="flex items-center gap-2 px-20 text-xxl font-extrabold">
              <span>{selectedData.mainCategory}</span>
              <span>•</span>
              <span>{selectedData.subCategory || '-'}</span>
            </div>
          </header>

          {/* Navigasi dan Konten Kanan */}
          <div className="flex items-center">
            {/* Navigasi KMHM */}
            <KmhmNavigasi
              activeKmhm={activeKmhm}
              setActiveKmhm={setActiveKmhm}
            />

            {/* Konten Verifikasi atau pesan pilih KMHM */}
            <div className="ml-4">
              {activeKmhm ? (
                <Verifikasi
                  kmhmName={activeKmhm}
                  role={selectedRole.toLowerCase()}
                  selectedSport={dataTerpilih}
                  onExport={handleExport}
                />
              ) : (
                <div className="text-white text-lg font-semibold">
                  Silahkan pilih KMHM
                </div>
              )}
            </div>
              
          </div>
        </>
      )}
    </div>
  );
};

export default AdminVerifikasi;
