import React, { useState, useEffect, useRef } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

const Atlet = () => {
  const [selectedTab, setSelectedTab] = useState("Semua");
  const [selectedDropdown, setSelectedDropdown] = useState("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [atletData, setAtletData] = useState([]);
  const dropdownRef = useRef(null);

  const searchParams = useSearchParams();
  const nama = searchParams.get("nama")?.toUpperCase() || "";

  const dropdownOptions = ["HMTPWK", "KMTA", "KMTG", "KMTSL", "HMTG", "HMTI", "KMTETI", "KMTNTF", "KMTM", "KMTK"];

  // Ambil data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      let { data, error } = await supabase
        .from("athletes")
        .select("*")
        .order("cabang", { ascending: true }); // sortir berdasarkan cabang

      if (error) {
        console.error("Error fetching athletes:", error);
      } else {
        setAtletData(data);
      }
    };

    fetchData();
  }, []);

  const filteredAtlet = atletData.filter((a) => {
    // Filter nama sesuai query param
    const matchNama = nama ? a.cabang.toUpperCase().includes(nama) : true;

    // Filter tab & dropdown
    if (selectedTab === "Semua") return matchNama;
    if (selectedTab === "KMHM") {
      if (selectedDropdown === "Semua") return matchNama;
      return a.asal_pknin === selectedDropdown && matchNama;
    }
    return matchNama;
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center gap-10 px-4 sm:px-6 md:px-20 font-['Sofia_Sans_Condensed']">
      <style jsx>{`
        .atlet-scrollbar::-webkit-scrollbar {
          width: 14px;
        }
        .atlet-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 20px;
          margin: 10px 0;
        }
        .atlet-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a68458;
          border-radius: 20px;
          border: 2px solid #3c3022;
          min-height: 40px;
        }
        .atlet-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #8b6f42;
        }
        .atlet-scrollbar {
          scrollbar-color: #a68458 #3c3022;
          scrollbar-width: thin;
        }
      `}</style>

      <h1 className="font-snowstorm text-center text-[#1D2225] text-4xl sm:text-5xl md:text-7xl font-bold drop-shadow-md">
        ATLET/SENIMAN
      </h1>

      {/* Tab Navigasi */}
      <div className="relative flex flex-row flex-wrap w-full sm:w-[565px] h-auto sm:h-[66px] px-2 py-2 gap-4 sm:gap-[6.031px] rounded-[53.415px] bg-[#1D2225] z-30">
        {/* Tab Semua */}
        <div
          className={`font-sofia flex-1 flex items-center justify-center px-4 py-2 rounded-[45.66px] cursor-pointer transition-all duration-200
          ${selectedTab === "Semua" ? "bg-[#806037] text-[#FBEBD2]" : "bg-[#1D2225] text-[#FBEBD2] hover:bg-[#2a2f33]"}`}
        >
          <button
            onClick={() => {
              setSelectedTab("Semua");
              setSelectedDropdown("Semua");
              setIsDropdownOpen(false);
            }}
            className="font-sofia text-center text-[#FBEBD2] text-[16px] sm:text-[18px] font-extrabold"
          >
            Semua
          </button>
        </div>

        {/* Tab KMHM + Dropdown */}
        <div
          ref={dropdownRef}
          className={`relative flex-1 flex items-center justify-center px-4 py-2 rounded-[27.57px] cursor-pointer
          ${selectedTab === "KMHM" ? "bg-[#806037] text-[#FBEBD2]" : "bg-[#1D2225] text-[#FBEBD2] hover:bg-[#2a2f33]"}`}
        >
          <button
            onClick={() => {
              setSelectedTab("KMHM");
              setIsDropdownOpen((prev) => !prev);
            }}
            className={`flex items-center justify-center gap-2 w-full text-[16px] sm:text-[18px] font-extrabold
            ${selectedTab === "KMHM" ? "text-[#FBEBD2]" : "text-[#F0EED7]"}`}
          >
            {selectedDropdown === "Semua" ? "KMHM" : selectedDropdown}
            <IoChevronDownSharp
              className={`text-xl ${selectedTab === "KMHM" ? "text-[#FBEBD2]" : "text-[#F0EED7]"}`}
            />
          </button>

          {/* Dropdown */}
          <div
            className={`absolute left-0 top-full mt-2 w-full bg-[#FBEBD2] rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out z-10
            ${isDropdownOpen ? "max-h-[300px] opacity-100 translate-y-0 py-2" : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"}`}
          >
            <ul className="font-sofia text-base text-medium text-sm flex flex-col px-4 text-[#1D2225]">
              {dropdownOptions.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      setSelectedDropdown(option);
                      setSelectedTab("KMHM");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-2 py-1 hover:underline"
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Kartu Atlet */}
      <div className="w-full h-[400px] pr-2 atlet-scrollbar max-w-full">
        {filteredAtlet.length > 0 ? (
          <div className="w-full h-[400px] overflow-y-scroll pr-2 atlet-scrollbar max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[1600px] mx-auto pb-8">
              {filteredAtlet.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col md:flex-row items-start gap-6 p-6 rounded-2xl hover:bg-[#806037] bg-[#F0EED7] transition-colors duration-300 shadow-lg hover:text-[#F0EED7] text-[#806037] min-h-[300px] w-full"
                >
                  <div className="w-[100px] h-[120px] bg-[#806037] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#F0EED7] transition-colors duration-300">
                    <FaUserCircle className="w-[70px] h-[70px] text-[#F0EED7] group-hover:text-[#806037] transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col gap-1 text-base leading-snug break-words">
                    <Info label="Nama" value={a.nama} />
                    <Info label="Kategori" value={a.kategori} />
                    <Info label="Asal KMHM" value={a.asal_pknin} />
                    <Info label="Jurusan" value={a.jerasam} />
                    <Info label="Angkatan" value={a.angkatan} />
                    <Info label="Email" value={a.email} />
                    <Info label="No. HP" value={a.telp} />
                    <Info label="Tempat, Tgl Lahir" value={a.tanggal_lahir} />
                    <Info label="Asal Kota" value={a.asal_provinsi} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-top justify-center h-screen">
            <div className="text-center text-[#1D2225] font-sofia font-bold text-lg mt-8">
              Tidak ada atlet/seniman untuk ditampilkan.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex gap-2 md:gap-4 flex-wrap">
    <div className="w-[140px] font-sofia font-bold">{label}</div>
    <div className="flex-1 font-sofia break-words">{value}</div>
  </div>
);

export default Atlet;
