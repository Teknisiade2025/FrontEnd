"use client";
import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';
import { supabase } from '@/app/lib/supabase'; 

const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const Kalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  

  // Ambil semua jadwal dari Supabase
  useEffect(() => {
    const fetchSchedules = async () => {
      const { data: pertandingan, error: err1 } = await supabase
        .from("jadwal_pertandingan")
        .select("*");

      const { data: seni, error: err2 } = await supabase
        .from("jadwal_seni")
        .select("*");

      if (err1) console.error(err1);
      if (err2) console.error(err2);

      const pertandinganData = (pertandingan || []).map((row) => ({
        id: `p-${row.id}`,
        date: `${row.tanggal}T${row.waktu}`,
       
        teamA: { name: row.tim1.toUpperCase(), logo: `/logoKMHM/${row.tim1.toUpperCase()}.svg` },
        teamB: { name: row.tim2.toUpperCase(), logo: `/logoKMHM/${row.tim2.toUpperCase()}.svg` },
        sport: row.cabang.toUpperCase(),
        stage: row.babak.toUpperCase(),
      }));

      const seniData = (seni || []).map((row) => ({
        id: `s-${row.id}`,
        date: `${row.tanggal}T${row.waktu}`,
  
        teamA: { name: row.tim.toUpperCase(), logo: `/logoKMHM/${row.tim.toUpperCase()}.svg` },
        teamB: { name: "-", logo: "" }, // seni biasanya 1 tim
        sport: row.cabang.toUpperCase(),
        stage: row.babak.toUpperCase(),
      }));

      const allSchedules = [...pertandinganData, ...seniData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setScheduleData(allSchedules);
    };

    fetchSchedules();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getMatchesForDate = (date) => scheduleData.filter(match => new Date(match.date).toDateString() === date.toDateString());
  const getMatchesForMonth = () => scheduleData.filter(match => {
    const matchDate = new Date(match.date);
    return matchDate.getMonth() === currentDate.getMonth() && matchDate.getFullYear() === currentDate.getFullYear();
  });

  const navigateMonth = (dir) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + dir);
      return newDate;
    });
  };

  const getSportColor = () => "#806037";

  const handleMouseEnter = (match, e) => {
    if (!isMobile) {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
      setHoveredMatch(match);
    }
  };

  const handleDateMouseEnter = (date, matches, e) => {
    if (!isMobile && matches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
      setHoveredDate({ date, matches });
    }
  };

  const handleMouseLeave = () => {
    setHoveredMatch(null);
    setHoveredDate(null);
  };

  // Fungsi bantu untuk format nama
const renderEventTitle = (match) => {
  if (match.id.startsWith("s-")) {
    // Event seni
    return match.teamA.name;
  }
  return `${match.teamA.name} vs ${match.teamB.name}`;
};


  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="aspect-square p-2 border border-[#FBEBD2]"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const matches = getMatchesForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      if (isMobile) {
        days.push(
          <div key={day} onMouseEnter={(e) => handleDateMouseEnter(date, matches, e)} onMouseLeave={handleMouseLeave}
            className={`border border-[#FBEBD2] p-2 aspect-square flex items-center justify-center cursor-pointer hover:bg-[#FAEDDABD] transition-all ${
              isToday ? "bg-[#FBEBD2] border-[#806037] border-2" : ""
            }`}
          >
            <div className={`text-sm font-bold font-sofia flex items-center justify-center ${
              matches.length > 0 ? "w-6 h-6 rounded-full bg-[#806037] text-[#FBEBD2]" :
              isToday ? "text-[#806037]" : "text-[#1D2225]"
            }`}>
              {day}
            </div>
          </div>
        );
      } else {
        days.push(
          <div key={day} onMouseEnter={(e) => handleDateMouseEnter(date, matches, e)} onMouseLeave={handleMouseLeave}
            className={`border border-[#FBEBD2] p-2 aspect-square overflow-hidden cursor-pointer hover:bg-[#FAEDDABD] transition-all ${
              isToday ? "bg-[#FBEBD2] border-[#806037] border-2" : ""
            }`}
          >
            <div className={`text-sm font-bold font-sofia ${isToday ? "text-[#806037]" : "text-[#1D2225]"}`}>
              {day}
            </div>
            <div className="mt-1 space-y-1">
              {matches.slice(0, 2).map(match => (
  <div 
    key={match.id} 
    onMouseEnter={(e) => handleMouseEnter(match, e)} 
    onMouseLeave={handleMouseLeave}
    onClick={() => setSelectedMatch(match)}
    className="text-xs p-1 rounded-lg text-[#FBEBD2] font-sofia font-bold truncate"
    style={{ backgroundColor: getSportColor(match.sport) }}
  >
    {renderEventTitle(match)}
  </div>
))}

        
              {matches.length > 2 && (
                <div className="text-xs text-[#806037] font-sofia font-bold">
                  +{matches.length - 2} lainnya
                </div>
              )}
            </div>
          </div>
        );
      }
    }

    return days;
  };

  const monthMatches = getMatchesForMonth();

  return (
    <div className="w-full px-4 py-6 flex flex-col items-center">
      <div className="max-w-screen-2xl w-full">
        <div className="mb-6 flex justify-center">
          <p className="text-6xl sm:text-7xl lg:text-8xl text-[#1D2225] font-snowstorm font-bold text-center">
            KALENDER
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">

          <div className="flex-1 w-full bg-[#FAEDDABD] rounded-[40px] p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => navigateMonth(-1)} className="flex items-center gap-2 px-4 py-2 bg-[#806037] text-[#FBEBD2] rounded-full hover:bg-[#6B4E2A] font-sofia font-bold">
                <HiChevronLeft />
                <span className="hidden md:inline">Sebelumnya</span>
              </button>

              <h2 className="text-xl md:text-2xl font-bold font-snowstorm text-[#1D2225]">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <button onClick={() => navigateMonth(1)} className="flex items-center gap-2 px-4 py-2 bg-[#806037] text-[#FBEBD2] rounded-full hover:bg-[#6B4E2A] font-sofia font-bold">
                <span className="hidden md:inline">Selanjutnya</span>
                <HiChevronRight />
              </button>
            </div>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-7 gap-1 text-center font-sofia font-bold text-[#1D2225] text-sm mb-2">
                {dayNames.map(day => <div key={day}>{day}</div>)}
              </div>

              <div className="grid grid-cols-7 gap-1 border-2 border-[#806037] rounded-[20px] overflow-hidden bg-white">
                {renderCalendarDays()}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Daftar pertandingan di bawah kalender */}
        {isMobile  && (
          <div className="mt-6 bg-[#FAEDDABD] rounded-[40px] p-6 shadow-md min-h-[200px] flex items-center justify-center">
          {monthMatches.length > 0 ? (
          <div className="mt-6 bg-[#FAEDDABD] rounded-[40px] p-6 shadow-md">
            <h3 className="text-xl font-bold font-snowstorm text-[#1D2225] mb-4 text-center">
              Jadwal Pertandingan Bulan Ini
            </h3>
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
              {monthMatches
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(match => (
                <div key={match.id} className="bg-white rounded-[20px] p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold font-snowstorm text-[#806037] text-sm">
                      {match.sport} - {match.stage}
                    </div>
                  </div>
                  <div className="text-center font-sofia font-bold text-[#1D2225] mb-2">
                    {renderEventTitle(match)}
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#806037] font-sofia">
                    <div className="flex items-center gap-1">
                      <IoTimeOutline />
                      {formatTime(match.date)}
                    </div>
            
                  </div>
                </div>
              ))}
            </div>
          </div>
           ) : (
            <div className="flex items-center justify-center h-full">
                <div className="text-center text-[#1D2225] font-sofia font-bold text-lg mt-8">
                Tidak ada jadwal di bulan ini.
                </div>
              </div>
        )}
      </div>
      )}
      </div>


      {/* Tooltip untuk hover pada tanggal (desktop) */}
      {!isMobile && hoveredDate && (
        <div 
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${hoverPosition.x}px`, top: `${hoverPosition.y}px` }}
        >
          <div className="bg-[#1D2225] text-[#FBEBD2] p-4 rounded-[20px] shadow-lg max-w-sm">
            <div className="space-y-2">
              {hoveredDate.matches.map(match => (
                <div key={match.id} className="text-xs border-b border-[#806037] pb-1 last:border-b-0">
                  <div className="font-sofia font-bold">{renderEventTitle(match)}</div>
                  <div className="font-sofia font-bold text-[#FAEDDABD]">{match.sport} - {match.stage}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <IoTimeOutline size={10} />
                    {formatTime(match.date)}
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kalender;