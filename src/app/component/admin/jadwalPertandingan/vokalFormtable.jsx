"use client";

import React, { useState, useEffect, useCallback } from 'react';
//import InputJadwalSeni from './InputJadwalSeni';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { BsPlusCircleFill } from 'react-icons/bs';
import { supabase } from "@/app/lib/supabase";
import InputJadwalSeni from './vokalForm';

const JadwalSeni = ({ cabang, kategori }) => {
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);

  const fetchJadwal = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('jadwal_seni')
        .select('*')
        .eq('cabang', cabang)
        .eq('kategori', kategori)
        .order('tanggal', { ascending: true })
        .order('waktu', { ascending: true });

      if (error) throw error;
      setJadwalList(data || []);
    } catch (error) {
      console.error('Error fetching jadwal:', error);
      alert('Gagal memuat jadwal: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Kategori:', kategori, 'Cabang:', cabang);
    if (cabang && kategori) {
      fetchJadwal();
    }
  }, [cabang, kategori]);

  const handleEdit = (jadwal) => {
    setFormData(jadwal);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
      try {
        const { error } = await supabase
          .from('jadwal_seni')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchJadwal();
      } catch (error) {
        console.error('Error deleting jadwal:', error);
        alert('Gagal menghapus jadwal: ' + error.message);
      }
    }
  };

  const handleAdd = () => {
    setFormData(null);
    setShowForm(true);
  };

  const handleSubmit = () => {
    setShowForm(false);
    fetchJadwal();
  };


  return (
    <div className="flex flex-col items-center p-10 rounded-[20px] w-full">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <div className="px-4 py-1 rounded-full shadow-md bg-[#806037]">
          <h1 className="text-lg font-normal font-['Snowstorm'] text-[#FCFCFC]">
            {cabang} - {kategori}
          </h1>
        </div>
        
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#065D79] rounded-full text-white font-bold hover:bg-[#0a7a9a] transition-colors"
        >
          <BsPlusCircleFill className="text-xl" />
          Tambah Jadwal
        </button>
      </div>

      {/* Tabel Jadwal */}
      {loading ? (
        <div className="w-full text-center py-10 text-white">
          Memuat data...
        </div>
      ) : (
        <div className="w-full bg-[#B1844D] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-8">
          <div className="overflow-x-auto">
            <table className="w-full text-[#FCFCFC] font-['Sofia_Sans_Condensed']">
              <thead>
                <tr className="border-b-2 border-[#FBEBD2]">
                  <th className="pb-4 text-left text-xl font-bold">Tim</th>
                  <th className="pb-4 text-left text-xl font-bold">Babak</th>
                  <th className="pb-4 text-left text-xl font-bold">Tanggal</th>
                  <th className="pb-4 text-left text-xl font-bold">Waktu</th>
                  
                  
                  <th className="pb-4 text-right text-xl font-bold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jadwalList.length > 0 ? (
                    jadwalList.map((jadwal) => (
                    <tr key={jadwal.id} className="border-b border-[#FBEBD2]/50">
                      <td className="py-4 text-lg">{jadwal.tim}</td>
                      <td className="py-4 text-lg">{jadwal.babak}</td>
                      <td className="py-4 text-lg">{jadwal.tanggal}</td>
                      <td className="py-4 text-lg">{jadwal.waktu}</td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleEdit(jadwal)}
                            className="p-2 text-[#FBEBD2] hover:text-[#065D79] transition-colors"
                          >
                            <HiPencil className="text-xl" />
                          </button>
                          <button 
                            onClick={() => handleDelete(jadwal.id)}
                            className="p-2 text-[#FBEBD2] hover:text-red-500 transition-colors"
                          >
                            <HiTrash className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-lg">
                      Tidak ada jadwal pertandingan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Konten: Form atau Tabel */}
{showForm ? (
  <div className="w-full">
    <InputJadwalSeni
      cabang={cabang} 
      kategori={kategori}
      initialData={formData}
      onSubmit={handleSubmit}
      onCancel={() => setShowForm(false)}
    />
  </div>
) : loading ? (
  <div className="w-full text-center py-10 text-white">
    Memuat data...
  </div>
) : (
  <div className="w-full bg-[#B1844D] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-8">
    <div className="overflow-x-auto">
      {/* tabel jadwal lama tetap di sini */}
    </div>
  </div>
)}

      {/* Font Styles */}
      <style jsx global>{`
        @font-face {
          font-family: 'Snowstorm';
          src: url('/fonts/Snowstorm-Regular.woff2') format('woff2'),
               url('/fonts/Snowstorm-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Sofia_Sans_Condensed';
          src: url('/fonts/SofiaSansCondensed-Regular.woff2') format('woff2'),
               url('/fonts/SofiaSansCondensed-Regular.woff') format('woff');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        
        @font-face {
          font-family: 'Sofia_Sans_Condensed';
          src: url('/fonts/SofiaSansCondensed-Bold.woff2') format('woff2'),
               url('/fonts/SofiaSansCondensed-Bold.woff') format('woff');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </div>
  );
};

export default JadwalSeni;