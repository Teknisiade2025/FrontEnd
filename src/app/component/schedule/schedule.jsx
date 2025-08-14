'use client';
import React, { useState, useEffect, useRef } from "react";
import { HiArrowRight } from "react-icons/hi";
import { IoChevronDownSharp } from "react-icons/io5";
import { supabase } from '@/app/lib/supabase'; 

const Jadwal = () => {
  const [selectedDropdown, setSelectedDropdown] = useState("Semua");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const dropdownRef = useRef(null);
  const [seniData, setSeniData] = useState([]);

  const dropdownOptions = {
    Olahraga: ["Semua", "Sepak Bola", "Futsal", "Mobile Legends", "Valorant",
                "Voli", "Tenis Meja", "FIFA", "Atletik",
                "Badminton", "Basket", "Catur", "PUBG"],
    Seni: ["Band", "Tari Tradisional", "Cipta Puisi", "Fotografi",
            "Vokal Grup", "Dance", "Poster", "Seni Lukis", 
            "Solo Vokal", "Monolog" ],
  };

  // Mapping cabang ke kategori
  const cabangOlahraga = [
    "Sepak Bola", "Futsal", "Mobile Legends", "Valorant",
    "Voli", "Tenis Meja", "FIFA", "Atletik",
    "Badminton", "Basket", "Catur", "PUBG"
  ];

  const cabangSeni = [
    "Band", "Tari Tradisional", "Cipta Puisi", "Fotografi",
    "Vokal Grup", "Dance", "Poster", "Seni Lukis", 
    "Solo Vokal", "Monolog"
  ];

  // Fungsi untuk mengecek apakah dropdown adalah kategori seni
  const isSeniCategory = (category) => {
    return dropdownOptions.Seni.includes(category);
  };

  // Fungsi untuk mengecek apakah cabang termasuk seni
  const isCabangSeni = (cabang) => {
    return cabangSeni.some(seni => seni.toLowerCase() === cabang?.toLowerCase());
  };

  // Ambil tanggal hari ini
  const today = new Date();
  
  // Filter data olahraga untuk hari ini
  const todayMatches = scheduleData.filter((match) => {
    const matchDate = new Date(match.date);
    return (
      matchDate.getFullYear() === today.getFullYear() &&
      matchDate.getMonth() === today.getMonth() &&
      matchDate.getDate() === today.getDate()
    );
  });

  


  // Filter data seni untuk hari ini
  const todaySeniMatches = seniData.filter((match) => {
    const matchDate = new Date(match.date);
    return (
      matchDate.getFullYear() === today.getFullYear() &&
      matchDate.getMonth() === today.getMonth() &&
      matchDate.getDate() === today.getDate()
    );
  });

  // Gabungkan semua data dan pisahkan berdasarkan kategori
  const allTodayData = [
    ...todayMatches.map(match => ({ ...match, type: 'olahraga' })),
    ...todaySeniMatches.map(match => ({ ...match, type: 'seni' }))
  ];

  // Filter berdasarkan dropdown
  const getFilteredData = () => {
  if (selectedDropdown === "Semua") return allTodayData;

  const dataSource = isSeniCategory(selectedDropdown) ? todaySeniMatches : todayMatches;
  return dataSource.filter(match => match.sport?.toLowerCase() === selectedDropdown.toLowerCase());
};


  const filteredData = getFilteredData();
  const uniqueData = filteredData.map((match, index) => ({
  ...match,
  id: `${match.id}-${index}`, // adds uniqueness if IDs might repeat
}));

  // Ambil data olahraga dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("jadwal_pertandingan")
          .select("*")
          .order("tanggal", { ascending: true })
          .order("waktu", { ascending: true });

        console.log("Data Olahraga Supabase:", data, "Error:", error);

        if (error) {
          console.warn("Tidak bisa ambil data olahraga:", error.message || error);
          setScheduleData([]);
          return;
        }

        if (!data || data.length === 0) {
          console.warn("Data olahraga kosong dari Supabase");
          setScheduleData([]);
          return;
        }

        // Mapping agar sesuai struktur MatchCard
        const mappedMatches = data.map((match) => ({
          id: match.id || `${match.tim1}-${match.tim2}-${match.tanggal}-${match.waktu}`,
          sport: match.cabang,
          category: match.kategori,
          stage: match.babak,
          date: `${match.tanggal}T${match.waktu}`,
          venue: match.venue || "",
          teamA: {
            name: match.tim1.toUpperCase(),
            logo: `/logoKMHM/${match.tim1.toUpperCase()}.svg`
          },
          teamB: {
            name: match.tim2.toUpperCase(),
            logo: `/logoKMHM/${match.tim2.toUpperCase()}.svg`
          }
        }));

        console.log("Mapped Olahraga Matches:", mappedMatches);
        setScheduleData(mappedMatches);
      } catch (err) {
        console.error("Error fetching olahraga data:", err);
        setScheduleData([]);
      }
    };

    fetchData();
  }, []);

  // Ambil data seni dari Supabase
  useEffect(() => {
    const fetchDataSeni = async () => {
      try {
        const { data, error } = await supabase
          .from("jadwal_seni")
          .select("*")
          .order("tanggal", { ascending: true })
          .order("waktu", { ascending: true });

        console.log("Data Seni Supabase:", data, "Error:", error);

        if (error) {
          console.warn("Tidak bisa ambil data seni:", error.message || error);
          setSeniData([]);
          return;
        }

        if (!data || data.length === 0) {
          console.warn("Data seni kosong dari Supabase");
          setSeniData([]);
          return;
        }
        
        const mapped = data.map((match, index) => ({
  id: match.id || `seni-${index}-${match.tanggal}`, // unique
  sport: match.cabang,
  category: match.kategori || "",
  stage: match.babak,
  date: `${match.tanggal}T${match.waktu}`,
  venue: match.venue || "",
  teamA: {
    name: match.tim.toUpperCase(),
    logo: `/logoKMHM/${match.tim.toUpperCase()}.svg`
  },
  type: "seni" // tambahan supaya gampang filter
}));

        
        console.log("Mapped Seni Matches:", mapped);
        setSeniData(mapped);
      } catch (err) {
        console.error("Error fetching seni data:", err);
        setSeniData([]);
      }
    };

    fetchDataSeni();
  }, []);

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
    <div className="w-full px-3 py-8 overflow-x-hidden">
      <div className="w-full mx-auto flex flex-col items-center">
        {/* Schedule Image */}
        <div className="mb-8">
          <img
            src="/subcabang/schedule.svg"
            alt="Schedule"
            className="w-[200px] sm:w-[280px] md:w-[350px] h-auto object-contain"
          />
        </div>

        {/* Main Container */}
        <div className="w-full h-auto md:h-[520px] pb-6 md:p-8 bg-[#FAEDDABD] shadow-lg rounded-[30px] flex flex-col gap-6">
          {/* Style Scrollbar */}
          <style jsx>{`
            .matches-scrollbar::-webkit-scrollbar { width: 8px; }
            .matches-scrollbar::-webkit-scrollbar-track {
              background: rgba(251, 235, 210, 0.3);
              border-radius: 8px;
              margin: 8px 0;
            }
            .matches-scrollbar::-webkit-scrollbar-thumb {
              background-color: #806037;
              border-radius: 8px;
              border: 1px solid rgba(250, 237, 218, 0.7);
              min-height: 30px;
            }
            .matches-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #6b4e2a;
            }
            .matches-scrollbar {
              scrollbar-color: #806037 rgba(251, 235, 210, 0.3);
              scrollbar-width: thin;
            }
          `}</style>

          {/* Dropdown */}
          <div className="w-full" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between gap-3 bg-[#806037] text-[#FBEBD2] px-6 sm:py-3 py:6 rounded-full shadow-md font-sofia font-extrabold text-base"
              >
                {selectedDropdown}
                <IoChevronDownSharp size={16} />
              </button>

              <div
                className={`absolute left-0 mt-2 w-full bg-[#FBEBD2] rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-10 ${
                  isDropdownOpen
                    ? "max-h-[200px] sm:max-h-[300px] overflow-y-auto pl-10 matches-scrollbar opacity-100 translate-y-1"
                    : "max-h-0 opacity-0 -translate-y-2"
                }`}
              >
                <div className="grid grid-cols-2 gap-6 p-6 text-[#1D2225]">
                  {/* Olahraga */}
                  <div>
                    <h3 className="font-sofia font-bold text-base mb-2 text-[#806037]">Olahraga</h3>
                    <ul className="flex flex-col gap-1">
                      {dropdownOptions.Olahraga.map((option, idx) => (
                        <li
                          key={`olahraga-${idx}`}
                          className="cursor-pointer hover:underline font-sofia font-medium text-sm py-1 opacity-60 text-neutral-800 hover:text-[#806037] hover:opacity-100 transition-colors"
                          onClick={() => {
                            setSelectedDropdown(option);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Seni */}
                  <div>
                    <h3 className="font-bold font-sofia text-base mb-3 text-[#806037]">Seni</h3>
                    <ul className="flex flex-col gap-1">
                      {dropdownOptions.Seni.map((option, idx) => (
                        <li
                          key={`seni-${idx}`}
                          className="cursor-pointer hover:underline font-sofia font-medium text-sm py-1 opacity-60 text-neutral-800 hover:text-[#806037] hover:opacity-100 transition-colors"
                          onClick={() => {
                            setSelectedDropdown(option);
                            setIsDropdownOpen(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Matches */}
          <div className="flex flex-col gap-4 overflow-y-auto matches-scrollbar pr-2">
            {filteredData.length > 0 ? (
              filteredData.map((match, index) => {
                if (match.type === 'seni' || isCabangSeni(match.sport)) {
                 return <SeniCard key={`${match.id}-${index}`} match={match} />;
                } else {
                return <MatchCard key={`${match.id}-${index}`} match={match} />;
                }
              })
            ) : (
              <div className="text-center text-[#1D2225] font-bold">
                {selectedDropdown === "Semua" 
                  ? (allTodayData.length === 0 ? "Tidak ada jadwal hari ini." : "Tidak ada data yang sesuai filter.")
                  : isSeniCategory(selectedDropdown)
                  ? (seniData.length === 0 
                      ? "Tidak ada data seni tersedia." 
                      : todaySeniMatches.length === 0
                      ? "Tidak ada jadwal seni hari ini."
                      : `Tidak ada jadwal ${selectedDropdown} hari ini.`
                    )
                  : (scheduleData.length === 0 
                      ? "Tidak ada data olahraga tersedia." 
                      : todayMatches.length === 0
                      ? "Tidak ada jadwal olahraga hari ini."
                      : `Tidak ada jadwal ${selectedDropdown} hari ini.`
                    )
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MatchCard = ({ match }) => {
  return (
    <div className="w-full p-5 md:p-6 bg-[#5F56487F] shadow-md rounded-[42px] flex flex-col gap-2">
      {/* Judul Pertandingan */}
      <div className="text-center">
        <div className="text-[#1D2225] text-base md:text-lg font-[Snowstorm] flex flex-col item-center font-bold leading-[135%] text-center">
          <span>{match.sport?.toUpperCase()} - {match.category?.toUpperCase()}</span>
          <span>{match.stage?.toUpperCase()}</span>
        </div>
      </div>

      {/* Baris 2 */}
      <div className="flex flex-row items-center justify-between gap-3 sm:gap-6">
        {/* Team A */}
        <div className="flex flex-col items-center ml-12 gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <img src={match.teamA.logo} alt={match.teamA.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-[#1D2225] font-bold font-snowstorm text-sm sm:text-base lg:text-lg text-center">
            {match.teamA.name}
          </span>
        </div>

        {/* Info Tengah */}
        <div className="flex flex-col items-center text-center gap-3 sm:gap-6 mx-auto flex-1 min-w-[140px] sm:min-w-[200px] lg:min-w-[240px]">
          <div className="flex flex-col items-center text-center ">
            <p className="text-[#1D2225] font-sofia text-sm md:text-base font-normal">
              {new Date(match.date).toLocaleString("id-ID", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              WIB
            </p>
            <p className="text-[#1D2225] font-sofia text-sm md:text-base font-normal">{match.venue}</p>
          </div>
          <div className="text-[#1D2225] font-extrabold text-xl sm:text-3xl lg:text-4xl font-snowstorm">V/S</div>
          <a
            href="https://youtube.com/@teknisiadeugm?si=OTakLii6k8IdSqua"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 text-[#1D2225] text-sm sm:text-base font-sofia font-bold hover:underline"
          >
            <span>Tonton Live</span>
            <HiArrowRight className="text-[#1D2225]" />
          </a>
        </div>

        {/* Team B */}
        <div className="flex flex-col items-center gap-1 mr-12 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm">
            <img src={match.teamB.logo} alt={match.teamB.name} className="w-full h-full object-contain" />
          </div>
          <span className="text-[#1D2225] font-bold font-snowstorm text-sm sm:text-base lg:text-lg text-center">
            {match.teamB.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const SeniCard = ({ match }) => {
  return (
    <div className="w-full p-5 md:p-6 bg-[#5F56487F] shadow-md rounded-[42px] flex flex-row ">
      
      {/* Kolom Logo + Nama Tim */}
      <div className="flex flex-col items-center justify-end w-full gap-2">
        <div className="w-25 h-25 rounded-full bg-white flex items-center justify-end overflow-hidden shadow-sm">
          <img src={match.teamA.logo} alt={match.teamA.name} className="w-full h-full object-contain" />
        </div>
        <span className="text-[#1D2225] font-bold font-[Snowstorm] text-base">{match.teamA.name}</span>
      </div>

      {/* Kolom Info Cabang + Babak + Tanggal + Venue */}
      <div className="flex flex-col   w-full gap-1">
        <span className="text-[#1D2225] text-base md:text-lg font-[Snowstorm] font-bold leading-[135%]">
          {match.sport?.toUpperCase()}
        </span>
        <span className="text-[#1D2225] text-base md:text-lg font-[Snowstorm] font-bold leading-[135%]">
          {match.stage?.toUpperCase()}
        </span>
        <p className="text-[#1D2225] font-sofia text-sm md:text-base">
          {new Date(match.date).toLocaleString("id-ID", { weekday:"short", day:"numeric", month:"short", hour:"2-digit", minute:"2-digit"})} WIB
        </p>
        <a
            href="https://youtube.com/@teknisiadeugm?si=OTakLii6k8IdSqua"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mt-5 gap-1 sm:gap-2 text-[#1D2225] text-sm sm:text-base font-sofia font-bold hover:underline"
          >
            <span>Tonton Live</span>
            <HiArrowRight className="text-[#1D2225]" />
          </a>
      </div>

    </div>
  );
};



export default Jadwal;