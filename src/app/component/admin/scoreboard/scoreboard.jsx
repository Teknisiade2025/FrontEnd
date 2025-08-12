"use client";

import React, { useState, useEffect } from 'react';
import { Save, Trash2, ChevronDown } from 'lucide-react';

const Scoreboard = () => {
  // Sample match data
  const [matches] = useState([
    {
      id: 1,
      team1: 'HMTPWK',
      team2: 'KMTETI',
      date: '20 Sept 2025',
      time: '18.00',
      day: 'Senin'
    },
    {
      id: 2,
      team1: 'HMTPWK',
      team2: 'KMFKG',
      date: '22 Sept 2025',
      time: '19.00',
      day: 'Rabu'
    },
    {
      id: 3,
      team1: 'KMTETI',
      team2: 'KMFKG',
      date: '25 Sept 2025',
      time: '20.00',
      day: 'Sabtu'
    }
  ]);

  const [selectedMatch, setSelectedMatch] = useState(matches[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [scores, setScores] = useState({
    team1: 10,
    team2: 10
  });

  const [savedScores, setSavedScores] = useState({
    team1: 10,
    team2: 10
  });

  // Load scores when match changes
  useEffect(() => {
    const loadedScores = {
      team1: 10,
      team2: 10
    };
    setScores(loadedScores);
    setSavedScores(loadedScores);
  }, [selectedMatch]);

  const updateScore = (team, increment) => {
    setScores(prev => ({
      ...prev,
      [team]: Math.max(0, prev[team] + increment)
    }));
  };

  const saveScores = () => {
    setSavedScores({...scores});
    console.log('Scores saved:', scores);
  };

  const resetScores = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset skor?')) {
      const resetValues = {
        team1: 0,
        team2: 0
      };
      setScores(resetValues);
      console.log('Scores reset');
    }
  };

  const handleMatchSelect = (match) => {
    setSelectedMatch(match);
    setIsDropdownOpen(false);
  };

  const TeamScoreCard = ({ teamName, score, isSupreme, onIncrement, onDecrement }) => (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-[#FBEBD2] text-[30px] font-semibold uppercase">
        {teamName}
      </h3>
      
      {/* Team Logo */}
      <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 ${isSupreme ? 'border-yellow-400' : 'border-blue-400'}`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isSupreme ? 'bg-gradient-to-br from-yellow-600 to-orange-700' : 'bg-gradient-to-br from-blue-600 to-blue-800'}`}>
          <div className="text-white text-xs font-bold text-center leading-tight">
            {isSupreme ? 'SUPREME\nPLANNER' : 'SUTETI'}
          </div>
        </div>
      </div>

      {/* Score Controls */}
      <div className="flex items-center bg-transparent rounded-lg overflow-hidden border-[2px] border-[#FBEBD2]">
        <button
          onClick={onDecrement}
          className="px-4 py-1.5 text-[#FBEBD2] text-[30px] hover:bg-[#9C6F3C] transition-colors font-semibold"
          disabled={score <= 0}
        >
          −
        </button>
        <div className="px-5 py-1.5 text-[#FBEBD2] text-[30px] font-semibold min-w-[60px] text-center bg-transparent border-l-[2px] border-r-[2px] border-[#FBEBD2]">
          {score}
        </div>
        <button
          onClick={onIncrement}
          className="px-4 py-1.5 text-[#FBEBD2] text-[30px] hover:bg-[#9C6F3C] transition-colors font-semibold"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen">
      {/* Wrapper khusus desktop */}
      <div
        className="flex flex-col items-center p-8 rounded-[20px]"
        style={{
          width: "900px",
          height: "600px",
          backgroundColor: "#B1844D",
          border: "3px solid #FFFFFF",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-2 w-full">
          <h1 className="text-white text-5xl font-snowstorm font-medium">Atur Skor Akhir</h1>
        </div>

        {/* Match Selection Dropdown */}
        <div className="mb-5 w-full max-w-2xl">
          <div className="relative">
            <div className="flex items-center mb-1">
              <span className="text-[#FBEBD2] text-[22px] font-sofia font-bold">Pilih pertandingan</span>
            </div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-[#FBEBD2] rounded-full px-5 py-3 flex items-center justify-between text-amber-900 font-sofia font-bold text-[16px] hover:bg-[#F0EED7] transition-colors"
            >
              <span>
                {selectedMatch.team1} VS {selectedMatch.team2} - {selectedMatch.day}, {selectedMatch.date} [{selectedMatch.time}]
              </span>
              <ChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} size={24} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#FBEBD2] rounded-2xl shadow-xl z-10 overflow-hidden">
                {matches.map((match) => (
                  <button
                    key={match.id}
                    onClick={() => handleMatchSelect(match)}
                    className="w-full px-8 py-3 text-left hover:bg-[#F0EED7] transition-colors text-amber-900 font-sofia"
                  >
                    {match.team1} VS {match.team2} - {match.day}, {match.date} [{match.time}]
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Score Management */}
        <div className="grid grid-cols-[1fr_auto_1fr] w-[80%] gap-0 mb-10 mx-auto">
            {/* Team 1 */}
            <div className="pr-1"> 
                <TeamScoreCard
                teamName={selectedMatch.team1}
                score={scores.team1}
                isSupreme={true}
                onIncrement={() => updateScore('team1', 1)}
                onDecrement={() => updateScore('team1', -1)}
                />
            </div>

          {/* VS Separator */}
          <div className="flex items-center justify-center">
            <div className="text-[#FBEBD2] text-[40px] font-sofia font-bold bg-transparent px-4 py-4">
              VS
            </div>
          </div>

            <div className="pl-1"> 
                <TeamScoreCard
                teamName={selectedMatch.team2}
                score={scores.team2}
                isSupreme={false}
                onIncrement={() => updateScore('team2', 1)}
                onDecrement={() => updateScore('team2', -1)}
                />
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6">
          <button
            onClick={saveScores}
            className="flex justify-between items-center w-[350px] px-8 py-2 bg-[#065D79] hover:bg-[#054A61] text-[#F0EED7] text-[26px] rounded-[50px] font-sofia font-bold transition-colors shadow-lg"
          >
            <span>Simpan</span>
            <Save size={30} className="ml-2"/>
          </button>

          <button
            onClick={resetScores}
            className="flex justify-between items-center w-[350px] px-8 py-2 bg-transparent border-[2px] border-[#F0EED7] hover:bg-[#9C6F3C] rounded-[50px] text-[#F0EED7] text-[26px] font-sofia font-bold transition-colors"
          >
            <span>Hapus</span>
            <Trash2 size={30} className="ml-2" />
          </button>
        </div>

        {/* Status Display */}
        <div className="mt-6 text-center">
          <p className="text-white font-sofia text-sm opacity-75">
            Status:{" "}
            {JSON.stringify(scores) === JSON.stringify(savedScores)
              ? "Tersimpan"
              : "Belum tersimpan"}
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;