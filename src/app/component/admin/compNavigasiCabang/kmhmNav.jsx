"use client";

import React, { useState } from "react";

const KmhmNavigasi = ({ activeKmhm, setActiveKmhm }) => {
  const [hoveredKmhm, setHoveredKmhm] = useState(null);

  const daftarKmhm = [
    "HMTPWK",
    "KMTA",
    "KMTG",
    "KMTSL",
    "HMTG",
    "HMTI",
    "KMTETI",
    "KMTNTF",
    "KMTM",
    "KMTK",
  ];

  const handleSelectKmhm = (nama) => {
    setActiveKmhm(nama);
    setHoveredKmhm(null);
  };

  return (
    <div className="w-[30vw] scale-77">
      <div className="w-full h-[780px] px-12 pt-9 pb-12 bg-[#806037] rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[5px] outline-offset-[-3px] border-white">
        <div className="w-full h-[731px] overflow-hidden">
          {/* Judul */}
          <div className="px-3 pb-4">
            <div className="text-[#FBEBD2] text-[26px] font-normal font-['Snowstorm']">
              KMHM
            </div>
          </div>

          {/* List KMHM */}
          <div className="w-full p-2.8 flex flex-col gap-3.5 ">
            {daftarKmhm.map((nama, index) => (
              <div
                key={index}
                className={`w-full h-13 px-6 rounded-2xl flex items-center cursor-pointer transition-all 
                  ${hoveredKmhm === nama ? "bg-[#065D79] text-gray-300" :
                  activeKmhm === nama ? "bg-[#065D79] text-gray-300" :
                  "bg-[#FBEBD2] text-gray-900"
                }`}

                onClick={() => handleSelectKmhm(nama)}
                onMouseEnter={() => setHoveredKmhm(nama)}
                onMouseLeave={() => setHoveredKmhm(null)}
              >
                <div className="w-full py-2.5 text-[20px] font-bold font-sofia leading-tight">
                  {nama}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default KmhmNavigasi;
