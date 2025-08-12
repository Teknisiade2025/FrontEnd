"use client";

import React, { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';

const Scoreboard = () => {
  // Data dummy untuk tabel
  const initialScores = [
    { id: 1, kmhm: 'HMTPWK', skor: 0 },
    { id: 2, kmhm: 'KMTA', skor: 100 },
    { id: 3, kmhm: 'KMTG', skor: 100 },
    { id: 4, kmhm: 'KMTSL', skor: 100 },
    { id: 5, kmhm: 'HMTG', skor: 100 },
    { id: 6, kmhm: 'HMTI', skor: 100 },
    { id: 7, kmhm: 'KMTETI', skor: 100 },
    { id: 8, kmhm: 'KMTNTF', skor: 100 },
    { id: 9, kmhm: 'KMTM', skor: 100 },
    { id: 10, kmhm: 'KMTK', skor: 24.87 },
  ];

  const [scores, setScores] = useState(initialScores);
  const [savedScores, setSavedScores] = useState([...initialScores]);

  const handleScoreChange = (id, value) => {
    const updatedScores = scores.map(item =>
      item.id === id ? { ...item, skor: parseFloat(value) || 0 } : item
    );
    setScores(updatedScores);
  };

  const saveScores = () => {
    setSavedScores([...scores]);
  };

  const resetScores = () => {
    if (window.confirm('Apakah Anda yakin ingin mereset skor?')) {
      setScores([...initialScores]);
    }
  };

  return (
    <div className="hidden lg:flex items-center justify-center min-h-screen">
      {/* Wrapper khusus desktop */}
      <div
        className="flex flex-col p-0 rounded-[20px] relative"
        style={{
          width: "900px",
          height: "600px",
          backgroundColor: "#B1844D",
          border: "3px solid #FFFFFF",
        }}
      >
        {/* Tabel Skor dengan scroll */}
        <div className="bg-[#FBEBD2] rounded-t-[20px] overflow-y-auto w-full max-h-[500px]">
            <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-[#B1844D]">
                <tr>
                    <th className="p-2.5 text-center border border-[#806037] text-[#FBEBD2] font-sofia font-bold text-[18px]">No.</th>
                    <th className="p-2.5 text-center border border-[#806037] text-[#FBEBD2] font-sofia font-bold text-[18px]">KMHM</th>
                    <th className="p-2.5 text-center border border-[#806037] text-[#FBEBD2] font-sofia font-bold text-[18px]">Skor Akhir</th>
                </tr>
                </thead>
                <tbody>
                    {scores.map((item, index) => (
                        <tr key={item.id} className="bg-[#FBEBD2]">
                        <td className="p-1 border text-center border-[#806037] font-sofia font-semibold text-[#806037]">{index + 1}</td>
                        <td className="p-1 border text-center border-[#806037] font-sofia font-bold text-[#806037]">{item.kmhm}</td>
                        <td className="p-1 border border-[#806037]">
                            <input
                            type="number"
                            value={item.skor}
                            onChange={(e) => handleScoreChange(item.id, e.target.value)}
                            className="w-full px-2 py-1 border-2 border-[#806037] rounded focus:outline-none focus:ring-2 focus:ring-[#065D79] bg-white font-sofia font-semibold text-[#806037]"
                            />
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Tombol Aksi di bagian bawah */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center space-x-6 pt-10 px-6 pb-4">
            <button
                onClick={saveScores}
                className="flex justify-between items-center w-[250px] px-6 py-2 bg-[#065D79] hover:bg-[#054A61] text-[#F0EED7] text-[20px] rounded-[50px] font-sofia font-bold transition-colors shadow-lg"
            >
                <span>Simpan</span>
                <Save size={24} className="ml-2" />
            </button>

            <button
                onClick={resetScores}
                className="flex justify-between items-center w-[250px] px-6 py-2 bg-transparent border-[2px] border-[#F0EED7] hover:bg-[#9C6F3C] rounded-[50px] text-[#F0EED7] text-[20px] font-sofia font-bold transition-colors"
            >
                <span>Hapus</span>
                <Trash2 size={24} className="ml-2" />
            </button>
        </div>

        {/* Status di bawah tombol */}
        <div className="absolute bottom-3 left-0 right-0 text-center">
            <p className="text-white font-sofia text-sm opacity-75">
                Status: {JSON.stringify(scores) === JSON.stringify(savedScores)
                ? "Tersimpan"
                : "Belum tersimpan"}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;