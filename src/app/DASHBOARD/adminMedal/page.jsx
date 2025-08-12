"use client";

import React, { useState } from "react";
import KmhmNavigasi from "@/app/component/admin/compNavigasiCabang/kmhmNav";
import MedalManage from "@/app/component/admin/klasemen/medalManage.jsx";
import { Suspense } from "react";
 
const MedalPage = () => {
  const [activeKmhm, setActiveKmhm] = useState(null);

  return (
    <div className="flex flex-row max-h-screen items-center pt-10 pl-10 gap-1 w-[100vw] bg-[url('/admin/bg-medal.svg')] overflow-y-hidden overflow-x-hidden">
      <div className="flex items-center mt-15">
        {/* Navigasi KMHM */}
        <div>
          <KmhmNavigasi
            activeKmhm={activeKmhm}
            setActiveKmhm={setActiveKmhm}
          />
        </div>
 
        {/* Konten Kanan */}
        <div className="ml-2  h-full w-full">
          {activeKmhm ? (
            <MedalManage kmhm={activeKmhm} />
          ) : (
                  <div className="w-full h-full  max-w-7xl mx-auto px-25 rounded-[32px] shadow-lg"
                  style={{
          width: "900px",
          height: "600px",
          backgroundColor: "#806037",
          border: "3px solid #FFFFFF",
        }}>
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
  );
};

export default MedalPage;
