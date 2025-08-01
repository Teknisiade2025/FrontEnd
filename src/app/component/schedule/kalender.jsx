"use client";
import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

const Kalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scheduleData = [
    {
      id: 1,
      date: "2025-07-31T19:00:00",
      venue: "Stadion Gelora Bung Karno",
      teamA: { name: "KMTETI", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMTSL", logo: "https://placehold.co/80x80" },
      sport: "SEPAK BOLA",
      stage: "SEMIFINAL"
    },
    {
      id: 2,
      date: "2025-08-02T15:30:00",
      venue: "Stadion Kapten I Wayan Dipta",
      teamA: { name: "KMTG", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMTETI", logo: "https://placehold.co/80x80" },
      sport: "SEPAK BOLA",
      stage: "PENYISIHAN"
    },
    {
      id: 3,
      date: "2025-08-05T20:00:00",
      venue: "GOR Bima Sakti",
      teamA: { name: "KMHM", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMTETI", logo: "https://placehold.co/80x80" },
      sport: "BASKET",
      stage: "FINAL"
    },
    {
      id: 4,
      date: "2025-08-02T10:00:00",
      venue: "Lapangan Voli UGM",
      teamA: { name: "KMTM", logo: "https://placehold.co/80x80" },
      teamB: { name: "KMTK", logo: "https://placehold.co/80x80" },
      sport: "VOLI",
      stage: "PENYISIHAN"
    },
  ];

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

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

  const getSportColor = (sport) => "#806037";

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

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-24 md:h-32 aspect-square"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const matches = getMatchesForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      if (isMobile) {
        // Mobile version - angka dilingkari jika ada kegiatan
        days.push(
          <div
            key={day}
            onMouseEnter={(e) => handleDateMouseEnter(date, matches, e)}
            onMouseLeave={handleMouseLeave}
            className={`border border-[#FBEBD2] p-2 aspect-square flex items-center justify-center cursor-pointer hover:bg-[#FAEDDABD] transition-all ${
              isToday ? 'bg-[#FBEBD2] border-[#806037] border-2' : ''
            }`}
          >
            <div 
              className={`text-sm font-bold font-sofia flex items-center justify-center ${
                matches.length > 0 
                  ? 'w-6 h-6 rounded-full bg-[#806037] text-[#FBEBD2]' 
                  : isToday 
                    ? 'text-[#806037]' 
                    : 'text-[#1D2225]'
              }`}
            >
              {day}
            </div>
          </div>
        );
      } else {
        // Desktop version - tampilkan nama pertandingan
        days.push(
          <div
            key={day}
            onMouseEnter={(e) => handleDateMouseEnter(date, matches, e)}
            onMouseLeave={handleMouseLeave}
            className={`border border-[#FBEBD2] p-2 aspect-square overflow-hidden cursor-pointer hover:bg-[#FAEDDABD] transition-all ${
              isToday ? 'bg-[#FBEBD2] border-[#806037] border-2' : ''
            }`}
          >
            <div className={`text-sm font-bold font-sofia ${isToday ? 'text-[#806037]' : 'text-[#1D2225]'}`}>
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
                  {match.teamA.name} vs {match.teamB.name}
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
          <div className="flex justify-center w-full md:w-auto">
            <div className="w-[100px] h-[100px] rounded-full bg-[#806037] flex items-center justify-center">
              <IoCalendarOutline className="w-12 h-12 text-[#FBEBD2]" />
            </div>
          </div>

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
        {isMobile && monthMatches.length > 0 && (
          <div className="mt-6 bg-[#FAEDDABD] rounded-[40px] p-6 shadow-md">
            <h3 className="text-xl font-bold font-snowstorm text-[#1D2225] mb-4 text-center">
              Jadwal Pertandingan Bulan Ini
            </h3>
            <div className="space-y-4">
              {monthMatches
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map(match => (
                <div key={match.id} className="bg-white rounded-[20px] p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold font-snowstorm text-[#806037] text-sm">
                      {match.sport} - {match.stage}
                    </div>
                    <div className="text-xs text-[#1D2225] font-sofia">
                      {formatDate(match.date)}
                    </div>
                  </div>
                  <div className="text-center font-sofia font-bold text-[#1D2225] mb-2">
                    {match.teamA.name} vs {match.teamB.name}
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#806037] font-sofia">
                    <div className="flex items-center gap-1">
                      <IoTimeOutline />
                      {formatTime(match.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <IoLocationOutline />
                      <span className="truncate max-w-[150px]">{match.venue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tooltip untuk desktop */}
      {!isMobile && hoveredMatch && (
        <div 
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${hoverPosition.x}px`, top: `${hoverPosition.y}px` }}
        >
          <div className="bg-[#1D2225] text-[#FBEBD2] p-4 rounded-[20px] shadow-lg max-w-xs">
            <div className="font-bold font-snowstorm text-[16px] mb-2 text-center">
              {hoveredMatch.sport} - {hoveredMatch.stage}
            </div>
            <div className="text-sm font-sofia text-center">{hoveredMatch.teamA.name} vs {hoveredMatch.teamB.name}</div>
            <div className="mt-2 text-xs space-y-1">
              <div className="flex items-center gap-2"><IoTimeOutline /> {new Date(hoveredMatch.date).toLocaleString('id-ID')}</div>
              <div className="flex items-center gap-2"><IoLocationOutline /> {hoveredMatch.venue}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tooltip untuk hover pada tanggal (desktop) */}
      {!isMobile && hoveredDate && (
        <div 
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: `${hoverPosition.x}px`, top: `${hoverPosition.y}px` }}
        >
          <div className="bg-[#1D2225] text-[#FBEBD2] p-4 rounded-[20px] shadow-lg max-w-sm">
            <div className="font-bold font-snowstorm text-[14px] mb-2 text-center">
              {hoveredDate.date.toLocaleDateString('id-ID', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </div>
            <div className="space-y-2">
              {hoveredDate.matches.map(match => (
                <div key={match.id} className="text-xs border-b border-[#806037] pb-1 last:border-b-0">
                  <div className="font-sofia font-bold">{match.teamA.name} vs {match.teamB.name}</div>
                  <div className="text-[#FAEDDABD]">{match.sport} - {match.stage}</div>
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