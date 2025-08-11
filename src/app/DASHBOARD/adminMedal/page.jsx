import React from "react";
import NavigasiCabang from '@/app/component/admin/compNavigasiCabang/kmhmNav';
import MedalManage from "@/app/component/admin/klasemen/medalManage.jsx";

const MedalPage = () => {
  return (
    <div className="flex flex-row min-h-screen pt-10 gap-1 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
      
        <div className="pt-5 pl-5">
          <NavigasiCabang />
        </div>
        
        <div>
          <MedalManage />
        </div>
      
    </div>
  );
};

export default MedalPage;