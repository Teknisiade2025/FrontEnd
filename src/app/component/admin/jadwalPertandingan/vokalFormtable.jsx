"use client";

import React, { useState, useEffect } from 'react';
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
    <div>
      {/* Render form atau tabel berdasarkan showForm */}
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
      ) : (
        loading ? (
          <div className="w-full text-center py-10 text-white">
            Memuat data...
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full min-h-[80vh] mt-5 px-16 py-8  rounded-[32px] shadow-lg"
        style={{
          width: "900px",
          height: "605px",
          backgroundColor: "#806037",
          border: "3px solid #FFFFFF",}}>
      {/* Header */}
       <div className="flex justify-end items-center w-full"> 
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#065D79] rounded-full text-white font-bold hover:bg-[#0a7a9a] transition-colors"
        >
          <BsPlusCircleFill className="text-xl" />
          Tambah Jadwal
        </button>
      </div>
          <div className="w-full bg-[#FBEBD2] rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] p-8">
            <div className="overflow-x-auto"  style={{ maxHeight: '400px', overflowY: 'auto' }} >
              <table className="w-full text-gray-900 font-['Sofia_Sans_Condensed']">
                <thead>
                  <tr className="border-b-2 border-[#B1844D]">
                    <th className="pb-4 text-left text-xl font-bold">Tim</th>
                    <th className="pb-4 text-left text-xl font-bold">Babak</th>
                    <th className="pb-4 text-left text-xl font-bold">Tanggal</th>
                    <th className="pb-4 text-left text-xl font-bold">Waktu</th>
                    <th className="pb-4 text-right text-xl font-bold">Aksi</th>
                  </tr>
                </thead>
                <tbody className ="w-[100%]"
                 /* style={{ 
                   display: 'block',
                    maxHeight: '370px',
                    overflowY: 'auto', 
                  }} */

                >
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
                              className="p-2 text-text-gray-900 hover:text-[#065D79] transition-colors"
                            >
                              <HiPencil className="text-xl" />
                            </button>
                            <button 
                              onClick={() => handleDelete(jadwal.id)}
                              className="p-2 text-text-gray-900 hover:text-red-500 transition-colors"
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
          </div>
        ))}

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
