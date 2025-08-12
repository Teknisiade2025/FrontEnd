"use client";

import React, { useState } from "react";
import KmhmNavigasi from "@/app/component/admin/compNavigasiCabang/kmhmNav";
import MedalManage from "@/app/component/admin/klasemen/medalManage.jsx";
import { Suspense } from "react";

const MedalPage = () => {
  const [activeKmhm, setActiveKmhm] = useState(null);

  return (
    <div className="flex flex-row max-h-screen pt-10 gap-1 w-[100vw] bg-[url('/admin/bg-medal.svg')]">
      <div className="flex items-center">
        {/* Navigasi KMHM */}
        <div>
          <KmhmNavigasi
            activeKmhm={activeKmhm}
            setActiveKmhm={setActiveKmhm}
          />
        </div>
 
        {/* Konten Kanan */}
        <div className="ml-4">
          {activeKmhm ? (
            <MedalManage kmhm={activeKmhm} />
          ) : (
            <div className="text-white text-lg font-semibold">
              Silahkan pilih KMHM
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedalPage;
