"use client";
import React, { useState } from 'react';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline } from 'react-icons/io5';

const Kalender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [hoveredMatch, setHoveredMatch] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

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
  ];

  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getMatchesForDate = (date) => scheduleData.filter(match => new Date(match.date).toDateString() === date.toDateString());

  const navigateMonth = (dir) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + dir);
      return newDate;
    });
  };

  const getSportColor = (sport) => {
    const colors = {
      'SEPAK BOLA': '#806037',
      'BASKET': '#5F5648',
      'VOLI': '#1D2225'
    };
    return colors[sport] || '#806037';
  };

  const handleMouseEnter = (match, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
    setHoveredMatch(match);
  };
  const handleMouseLeave = () => setHoveredMatch(null);

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} className="h-24 aspect-square"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const matches = getMatchesForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
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

    return days;
  };

  return (
    <div className="w-full px-4 py-6 flex flex-col items-center ">
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

            <div className="mt-6">
              <h3 className="text-sm font-bold font-sofia text-[#1D2225] mb-2">Kategori Olahraga:</h3>
              <div className="flex gap-3 flex-wrap">
                {['SEPAK BOLA', 'BASKET', 'VOLI'].map(sport => (
                  <div key={sport} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: getSportColor(sport) }}></div>
                    <span className="text-xs font-sofia font-bold text-[#1D2225]">{sport}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {hoveredMatch && (
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
    </div>
  );
};

export default Kalender;
