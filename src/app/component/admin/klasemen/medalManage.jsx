"use client";

import React, { useState, useEffect } from "react";
import { Save, Trash2 } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/app/lib/supabase";

// Data KMHM 
const daftarKmhm = {
  hmtpwk: { nama: "HMTPWK", logo: "/logoKMHM/HMTPWK.svg" },
  kmta: { nama: "KMTA", logo: "/logoKMHM/KMTA.svg" },
  kmtg: { nama: "KMTG", logo: "/logoKMHM/KMTG.svg" },
  kmtsl: { nama: "KMTSL", logo: "/logoKMHM/KMTSL.svg" },
  hmtg: { nama: "HMTG", logo: "/logoKMHM/HMTG.svg" },
  hmti: { nama: "HMTI", logo: "/logoKMHM/HMTI.svg" },
  kmteti: { nama: "KMTETI", logo: "/logoKMHM/KMTETI.svg" },
  kmtntf: { nama: "KMTNTF", logo: "/logoKMHM/KMTNTF.svg" },
  kmtm: { nama: "KMTM", logo: "/logoKMHM/KMTM.svg" },
  kmtk: { nama: "KMTK", logo: "/logoKMHM/KMTK.svg" },
};

const MedalManage = ({ kmhm }) => {
  const [medals, setMedals] = useState({ emas: 0, perak: 0, perunggu: 0 });
  const [savedMedals, setSavedMedals] = useState({ emas: 0, perak: 0, perunggu: 0 });
  const [loading, setLoading] = useState(false);

  const kmhmKey = kmhm?.toLowerCase();
  const kmhmData = daftarKmhm[kmhmKey] || { nama: kmhm, logo: null };

  // Fetch data dari Supabase
  useEffect(() => {
    if (!kmhm) return;

    const fetchMedals = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("medali")
        .select("emas, perak, perunggu")
        .eq("kmhm", kmhmKey)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Select Error:", error);
      }

      if (!data) {
        // Buat row baru kalau belum ada
        const { error: insertError } = await supabase
          .from("medali")
          .insert([{ kmhm: kmhmKey, emas: 0, perak: 0, perunggu: 0 }]);

        /* if (insertError) {
          console.error("Insert Error:", insertError);
        } */

        setMedals({ emas: 0, perak: 0, perunggu: 0 });
        setSavedMedals({ emas: 0, perak: 0, perunggu: 0 });
      } else {
        setMedals(data);
        setSavedMedals(data);
      }

      setLoading(false);
    };

    fetchMedals();
  }, [kmhm]);

  // Update jumlah medal
  const updateMedal = (type, increment) => {
    setMedals((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment),
    }));
  };

  // Simpan perubahan ke DB
  const saveMedals = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("medali")
      .update(medals)
      .eq("kmhm", kmhmKey);

    if (error) {
      console.error("Update Error:", error);
    } else {
      setSavedMedals({ ...medals }); // Tampilkan angka terakhir disimpan
    }

    setLoading(false);
  };

  // Reset ke 0
  const resetMedals = async () => {
    const resetValues = { emas: 0, perak: 0, perunggu: 0 };
    setMedals(resetValues);
    setSavedMedals(resetValues);

    setLoading(true);
    const { error } = await supabase
      .from("medali")
      .update(resetValues)
      .eq("kmhm", kmhmKey);

    if (error) {
      console.error("Reset Error:", error);
    }

    setLoading(false);
  };

  // Kartu medal
  const MedalCard = ({ type, value }) => (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-[#FBEBD2] text-[30px] font-semibold font-sofia">
        {type}
      </h3>

      <div className="relative w-24 h-24 flex items-center justify-center">
        {type === "EMAS" && <Image src={"/klasemen/Gold.svg"} alt="Gold Medal" width={60} height={60} />}
        {type === "PERAK" && <Image src={"/klasemen/Silver.svg"} alt="Silver Medal" width={60} height={60} />}
        {type === "PERUNGGU" && <Image src={"/klasemen/Bronze.svg"} alt="Bronze Medal" width={60} height={60} />}
      </div>

      <div className="flex items-center bg-transparent rounded-lg overflow-hidden border-[2px] border-[#FBEBD2]">
        <button
          onClick={() => updateMedal(type.toLowerCase(), -1)}
          className="px-4 py-1.5 text-[#FBEBD2] text-[35px] font-sofia hover:bg-[#9C6F3C] transition-colors"
          disabled={value <= 0}
        >
          −
        </button>
        <div className="px-5 py-1.5 text-[#FBEBD2] text-[35px] font-sofia font-semibold min-w-[60px] text-center bg-transparent border-l-[2px] border-r-[2px] border-[#FBEBD2]">
          {value}
        </div>
        <button
          onClick={() => updateMedal(type.toLowerCase(), 1)}
          className="px-4 py-1.5 text-[#FBEBD2] text-[35px] font-sofia hover:bg-[#9C6F3C] transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen">
      <div
        className="flex flex-col items-center p-10 rounded-[20px]"
        style={{
          width: "900px",
          height: "600px",
          backgroundColor: "#806037",
          border: "3px solid #FFFFFF",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-6">
            <h1 className="text-white text-5xl font-bold tracking-wider">
              {kmhmData.nama}
            </h1>
            <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-yellow-400 overflow-hidden bg-white">
              {kmhmData.logo ? (
                <Image
                  src={kmhmData.logo}
                  alt={kmhmData.nama}
                  width={60}
                  height={60}
                />
              ) : (
                <div className="text-white text-xs font-bold text-center leading-tight">
                  SUPREME
                  <br />
                  PLANNER
                </div>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <MedalCard type="EMAS" value={medals.emas} />
              <MedalCard type="PERAK" value={medals.perak} />
              <MedalCard type="PERUNGGU" value={medals.perunggu} />
            </div>

            <div className="flex justify-center space-x-6">
              <button
                onClick={saveMedals}
                className="flex justify-between items-center w-[350px] px-8 py-2 bg-[#065D79] hover:bg-[#054A61] text-[#F0EED7] text-[26px] rounded-[50px] font-sofia font-bold transition-colors shadow-lg"
              >
                <span>Simpan</span>
                <Save size={30} className="ml-2" />
              </button>

              <button
                onClick={resetMedals}
                className="flex justify-between items-center w-[350px] px-8 py-2 bg-transparent border-[2px] border-[#F0EED7] hover:bg-[#9C6F3C] rounded-[50px] text-[#F0EED7] text-[26px] font-sofia font-bold transition-colors"
              >
                <span>Hapus</span>
                <Trash2 size={30} className="ml-2" />
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-[#F0EED7] font-sofia text-sm opacity-75">
                Status:{" "}
                {JSON.stringify(medals) === JSON.stringify(savedMedals)
                  ? "Tersimpan"
                  : "Belum tersimpan"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MedalManage;
