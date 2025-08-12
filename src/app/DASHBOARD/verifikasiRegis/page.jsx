import React from "react";
import NavigasiVerifikasi from '@/app/component/admin/compNavigasiCabang/verifikasiNav';
import Verifikasi from "@/app/component/admin/verifikasiKMHM/verifikasiRegis";

const MedalPage = () => {
  return (
    <div className="flex flex-row min-h-screen pt-10 gap-1 pl-10 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
      
      {/* Konten utama dengan navigasi cabang dan medal */}
      
        {/* Navigasi cabang (sidebar kiri) */}
        <div className="pt-5 pl-5">
          <NavigasiVerifikasi />
        </div>
        
        {/* Area konten utama (kanan) */}
        <div className = "pt-18">
          <Verifikasi />
        </div>
      
    </div>
  );
};

export default MedalPage;