import React from "react";
import NavigasiCabang from '@/app/component/admin/compNavigasiCabang/kmhmNav';
import MedalManage from "@/app/component/admin/klasemen/medalManage.jsx";

const MedalPage = () => {
  return (
    <div className="flex flex-row min-h-screen pt-10 gap-1 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
      
      {/* Konten utama dengan navigasi cabang dan medal */}
      
        {/* Navigasi cabang (sidebar kiri) */}
        <div className="pt-5 pl-5">
          <NavigasiCabang />
        </div>
        
        {/* Area konten utama (kanan) */}
        <div>
          <MedalManage />
        </div>
      
    </div>
  );
};

export default MedalPage;