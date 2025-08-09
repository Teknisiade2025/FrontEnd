"use client";

import React, { useState, useEffect } from "react";
import { Save, Trash2 } from "lucide-react";
import Image from "next/image";

const MedalManage = () => {
  const [medals, setMedals] = useState({
    emas: 10,
    perak: 10,
    perunggu: 10,
  });

  const [savedMedals, setSavedMedals] = useState({
    emas: 10,
    perak: 10,
    perunggu: 10,
  });

  // Load data awal
  useEffect(() => {
    const loadedData = {
      emas: 10,
      perak: 10,
      perunggu: 10,
    };
    setMedals(loadedData);
    setSavedMedals(loadedData);
  }, []);

  const updateMedal = (type, increment) => {
    setMedals((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment),
    }));
  };

  const saveMedals = () => {
    setSavedMedals({ ...medals });
    console.log("Saving medals to database:", medals);
  };

  const resetMedals = () => {
    const resetValues = { emas: 0, perak: 0, perunggu: 0 };
    setMedals(resetValues);
    setSavedMedals(resetValues);
    console.log("Resetting medals in database");
  };

  // Sub-komponen kartu medali
  const MedalCard = ({ type, value, color }) => (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-[#FBEBD2] text-[30px] font-semibold uppercase">
        {type}
      </h3>

      {/* Ikon medali */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {type === "EMAS" && (
            <Image src={"/klasemen/Gold.svg"} alt="Gold Medal" width={60} height={60} />
        )}
        {type === "PERAK" && (
            <Image src={"/klasemen/Silver.svg"} alt="Silver Medal" width={60} height={60} />
        )}
        {type === "PERUNGGU" && (
            <Image src={"/klasemen/Bronze.svg"} alt="Bronze Medal" width={60} height={60} />
        )}
      </div>

      {/* Kontrol Counter */}
      <div className="flex items-center bg-transparent rounded-lg overflow-hidden border-[2px] border-[#FBEBD2]">
        <button
          onClick={() => updateMedal(type.toLowerCase(), -1)}
          className="px-4 py-1.5 text-[#FBEBD2] text-[35px] font-sofia hover:bg-[#9C6F3C] transition-colors text-xl font-semibold"
          disabled={value <= 0}
        >
          −
        </button>
        <div className="px-5 py-1.5 text-[#FBEBD2] text-[35px] font-sofia font-semibold min-w-[60px] text-center bg-transparent border-l-[2px] border-r-[2px] border-[#FBEBD2]">
          {value}
        </div>
        <button
          onClick={() => updateMedal(type.toLowerCase(), 1)}
          className="px-4 py-1.5 text-[#FBEBD2] text-[35px] font-sofia hover:bg-[#9C6F3C] transition-colors text-xl font-semibold"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen bg-gray-900">
      {/* Wrapper khusus desktop */}
      <div
        className="flex flex-col items-center p-8 rounded-[40px]"
        style={{
          width: "900px",
          height: "780px",
          backgroundColor: "#806037",
          border: "3px solid #FFFFFF",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-6">
            <h1 className="text-white text-5xl font-bold tracking-wider">
              HMTPШK
            </h1>
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-orange-700 rounded-full flex items-center justify-center border-4 border-yellow-400">
              <div className="text-white text-xs font-bold text-center leading-tight">
                SUPREME
                <br />
                PLANNER
              </div>
            </div>
          </div>
        </div>

        {/* Medal Cards */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <MedalCard
            type="EMAS"
            value={medals.emas}
            />
            <MedalCard
            type="PERAK"
            value={medals.perak}
            />
            <MedalCard
            type="PERUNGGU"
            value={medals.perunggu}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={saveMedals}
            className="flex justify-between items-center w-[350px] px-8 py-2 bg-[#065D79] hover:bg-[#054A61] text-[#F0EED7] text-[26px] rounded-[50px] font-sofia font-bold transition-colors shadow-lg"
          >
            <span>Simpan</span>
            <Save size={30} className="ml-2"/>
          </button>

          <button
            onClick={resetMedals}
            className="flex justify-between items-center w-[350px] px-8 py-2 bg-transparent border-[2px] border-[#F0EED7] hover:bg-[#9C6F3C] rounded-[50px] text-[#F0EED7] text-[26px] font-sofia font-bold transition-colors"
          >
            <span>Hapus</span>
            <Trash2 size={30} className="ml-2" />
          </button>
        </div>

        {/* Status Display */}
        <div className="mt-6 text-center">
          <p className="text-white text-sm opacity-75">
            Status:{" "}
            {JSON.stringify(medals) === JSON.stringify(savedMedals)
              ? "Tersimpan"
              : "Belum tersimpan"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedalManage;