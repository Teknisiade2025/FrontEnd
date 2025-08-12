'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Edit, Trash2, Plus, User, X } from 'lucide-react';
import { supabase } from '@/app/lib/supabase'; 

export default function AthleteRegistration({ selectedSport, kmhmName, role }) {
  // Tentukan tabel berdasarkan role
  const tableName = role === 'coach' ? 'coaches' : 'athletes';

  const [athletes, setAthletes] = useState([]);
  const [filteredAthletes, setFilteredAthletes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingAthlete, setEditingAthlete] = useState(null);
  const [activeTab, setActiveTab] = useState('UNVERIFIED');
  const [readMode, setReadMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nama: '',
    kategori: selectedSport?.subCategory || '',
    cabang: selectedSport?.mainCategory || '',
    asal_pknin: kmhmName || '',
    jerasam: '',
    angkatan: '',
    email: '',
    telp: '',
    alamat: '',
    tanggal_lahir: '',
    status: 'UNVERIFIED',
    id_line: '',
    asal_provinsi: '',
    no_institusi: '',
    kartu_institusi: null
  });

  // Update formData ketika kategori / cabang / kmhmName berubah
  useEffect(() => {
    if (selectedSport?.subCategory && selectedSport?.mainCategory) {
      setFormData((prev) => ({
        ...prev,
        kategori: selectedSport.subCategory,
        cabang: selectedSport.mainCategory,
        asal_pknin: kmhmName
      }));
    }
  }, [selectedSport, kmhmName]);

  // Load data athletes
  const loadAthletes = useCallback(async () => {
    if (!selectedSport?.mainCategory || !selectedSport?.subCategory) {
      setAthletes([]);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('cabang', selectedSport.mainCategory)
        .eq('kategori', selectedSport.subCategory)
        .eq('asal_pknin', kmhmName)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAthletes(data || []);
    } catch (error) {
      console.error(`Error loading ${role}:`, error.message);
      setAthletes([]);
    } finally {
      setLoading(false);
    }
  }, [selectedSport?.mainCategory, selectedSport?.subCategory, tableName, role]);

  // Filter otomatis
  useEffect(() => {
    if (!athletes || athletes.length === 0) {
      setFilteredAthletes([]);
      return;
    }

    let filtered = athletes.filter((athlete) => {
      const statusMatch = athlete.status?.trim().toUpperCase() === activeTab?.trim().toUpperCase();
      return statusMatch;
    });

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (athlete) =>
          athlete.nama?.toLowerCase().includes(lowerTerm) ||
          athlete.cabang?.toLowerCase().includes(lowerTerm) ||
          athlete.kategori?.toLowerCase().includes(lowerTerm)
      );
    }

    setFilteredAthletes(filtered);
  }, [athletes, searchTerm, activeTab]);

  const deleteAthlete = async (id) => {
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
      loadAthletes();
    } catch (error) {
      console.error(`Error deleting ${role}:`, error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(editingAthlete && prev.status !== 'UNVERIFIED' ? { status: 'UNVERIFIED' } : {})
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      kartu_institusi: e.target.files[0],
      ...(editingAthlete && prev.status !== 'UNVERIFIED' ? { status: 'UNVERIFIED' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSport?.subCategory || !selectedSport?.mainCategory) {
      alert('Pilih kategori & cabang terlebih dahulu sebelum mengisi form.');
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        kategori: selectedSport.subCategory,
        cabang: selectedSport.mainCategory
      };

      // Upload file ke Supabase Storage
      if (formData.kartu_institusi instanceof File) {
        const fileName = `${Date.now()}_${formData.kartu_institusi.name}`;
        const { data: fileData, error: fileError } = await supabase.storage
          .from('kartu_institusi') // pastikan bucket ini ada
          .upload(fileName, formData.kartu_institusi);

        if (fileError) throw fileError;

        // Ambil URL file
        const { data: publicUrlData } = supabase
          .storage
          .from('kartu_institusi')
          .getPublicUrl(fileName);

        dataToSend.kartu_institusi = publicUrlData.publicUrl;
      }

      if (editingAthlete) {
        const { error } = await supabase
          .from(tableName)
          .update(dataToSend)
          .eq('id', editingAthlete.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert([dataToSend]);

        if (error) throw error;
      }

      await loadAthletes();
      resetForm();
    } catch (error) {
      console.error('Save error:', error.message, error);
      alert(`Terjadi kesalahan saat menyimpan data: ${error.message}`);
    }
  };

  useEffect(() => {
    loadAthletes();
  }, [loadAthletes]);

  useEffect(() => {
    const subscription = supabase
      .channel(`${tableName}_channel`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: tableName },
        () => {
          loadAthletes();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tableName, loadAthletes]);

  const resetForm = () => {
    setFormData({
      nama: '',
      kategori: selectedSport?.subCategory || '',
      cabang: selectedSport?.mainCategory || '',
      asal_pknin: kmhmName || '',
      jerasam: '',
      angkatan: '',
      email: '',
      telp: '',
      alamat: '',
      tanggal_lahir: '',
      status: 'UNVERIFIED',
      id_line: '',
      asal_provinsi: '',
      no_institusi: '',
      kartu_institusi: null
    });
    setShowForm(false);
    setEditingAthlete(null);
    setReadMode(false);
  };

  const handleEdit = (athlete) => {
    if (athlete.status?.toUpperCase() === 'VERIFIED') {
      alert('Data sudah terverifikasi dan tidak dapat diubah.');
      return;
    }

    setFormData({
      ...formData,
      ...athlete
    });
    setEditingAthlete(athlete);
    setReadMode(false);
    setShowForm(true);
  };

  const handleRead = (athlete) => {
    setFormData({
      ...formData,
      ...athlete
    });
    setEditingAthlete(athlete);
    setReadMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Yakin ingin menghapus data ${role} ini?`)) {
      try {
        await deleteAthlete(id);
      } catch {
        alert(`Gagal menghapus data ${role}`);
      }
    }
  };

  const countByStatus = (status) => {
    if (status === 'TOTAL') {
      return athletes.length;
    }
    return athletes.filter(a => a.status === status).length;
  };


  // 🔹 Blokir jika kmhmName kosong
  if (!kmhmName) {
    return (
      <div className="w-full h-full max-w-7xl mx-auto px-14 py-9 bg-[#806037] rounded-[32px] shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-10">
            {/* Status Tabs */}
            <div className="flex items-center gap-2.5">
              {['UNVERIFIED', 'REVISION', 'VERIFIED'].map((status) => (
                <div
                  key={status}
                  className={`px-8 py-3 rounded-full shadow-md cursor-pointer transition-colors ${
                    activeTab === status ? 'bg-teal-600 text-white' : 'bg-amber-200 text-gray-800'
                  }`}
                  onClick={() => setActiveTab(status)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold">{status}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-px h-4 bg-current opacity-50" />
                      <span className="text-sm">{countByStatus(status)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-white text-xl font-extrabold">
              Total {role}: {countByStatus('TOTAL')}
            </div>
          </div>
          {/* Add Athlete Button */}
          <div 
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div className="text-center text-white text-lg font-bold">
              Daftarkan <br/>{role}
            </div>
          </div>
        </div>
              
        <div className="flex-1 h-[60%] flex items-center justify-center">
          <div className="text-lg font-semibold text-white text-center">
            Nama KMHM tidak ditemukan. Harap login atau pilih KMHM terlebih dahulu.
          </div>
        </div>
      </div>
    );
  }

  // 🔹 Tahan render jika kategori & cabang belum dipilih
  if (!selectedSport?.mainCategory || !selectedSport?.subCategory) {
    return (
      <div className="w-full h-full max-w-7xl mx-auto px-14 py-9 bg-amber-900 rounded-[32px] shadow-lg flex flex-col">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-10">
            {/* Status Tabs */}
            <div className="flex items-center gap-2.5">
              {['UNVERIFIED', 'REVISION', 'VERIFIED'].map((status) => (
                <div
                  key={status}
                  className={`px-8 py-3 rounded-full shadow-md cursor-pointer transition-colors ${
                    activeTab === status ? 'bg-teal-600 text-white' : 'bg-amber-200 text-gray-800'
                  }`}
                  onClick={() => setActiveTab(status)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-bold">{status}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-px h-4 bg-current opacity-50" />
                      <span className="text-sm">{countByStatus(status)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-white text-xl font-extrabold">
              Total {role}: {countByStatus('TOTAL')}
            </div>
          </div>
          {/* Add Athlete Button */}
          <div 
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div className="text-center text-white text-lg font-bold">
              Daftarkan <br/>{role}
            </div>
          </div>
        </div>

        {/* Pesan di tengah */}
        <div className="flex-1 h-full flex items-center justify-center">
          <div className="text-lg font-semibold text-white text-center">
            Silakan pilih kategori dan cabang terlebih dahulu.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-14 bg-amber-900 rounded-[32px] shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-10">
          {/* Status Tabs */}
          <div className="flex items-center gap-2.5">
            {['UNVERIFIED', 'REVISION', 'VERIFIED'].map((status) => (
              <div
                key={status}
                className={`px-8 py-3 rounded-full shadow-md cursor-pointer transition-colors ${
                  activeTab === status ? 'bg-teal-600 text-white' : 'bg-amber-200 text-gray-800'
                }`}
                onClick={() => setActiveTab(status)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-bold">{status}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-px h-4 bg-current opacity-50" />
                    <span className="text-sm">{countByStatus(status)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-white text-xl font-extrabold">
            Total {role}: {countByStatus('TOTAL')}
          </div>
        </div>
        {/* Add Athlete Button */}
        <div 
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => setShowForm(true)}
        >
          <div className="w-16 h-16 bg-teal-700 rounded-full flex items-center justify-center">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div className="text-center text-white text-lg font-bold">
            Daftarkan <br/>{role === 'coach' ? 'Coach' : 'Atlet'}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-white text-lg">Loading {role} data...</div>
        </div>
      )}

      {/* Athletes List */}
      <div className="space-y-4">
        {filteredAthletes.map((athlete) => (
          <div key={athlete.id} className="flex gap-4">
            <div className="flex-1 bg-amber-100 rounded-3xl p-8 flex justify-between items-center">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-teal-600 rounded-xl flex items-center justify-center">
                  <User className="w-12 h-12 text-amber-100" />
                </div>
                <div className="space-y-2">
                  <div className="flex"><div className="w-44 font-bold">Nama</div>{athlete.nama}</div>
                  <div className="flex"><div className="w-44 font-bold">Cabang</div>{athlete.cabang} {athlete.kategori}</div>
                  <div className="flex"><div className="w-44 font-bold">Asal KMHM</div>{athlete.asal_pknin}</div>
                  <div className="flex"><div className="w-44 font-bold">Jurusan</div>{athlete.jerasam}</div>
                  <div className="flex"><div className="w-44 font-bold">Angkatan</div>{athlete.angkatan}</div>
                  <div className="flex"><div className="w-44 font-bold">Email</div>{athlete.email}</div>
                  <div className="flex"><div className="w-44 font-bold">No. HP</div>{athlete.telp}</div>
                  <div className="flex"><div className="w-44 font-bold">Tempat, Tanggal Lahir</div>{athlete.tanggal_lahir}</div>
                  <div className="flex"><div className="w-44 font-bold">Asal Provinsi</div>{athlete.asal_provinsi}</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button 
                  className="text-gray-800 font-bold hover:text-teal-600"
                  onClick={() => handleEdit(athlete)}
                >
                  Edit
                </button>
                <button 
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700"
                  onClick={() => handleDelete(athlete.id)}
                >
                  <Trash2 className="w-5 h-5 text-white" />
                </button>
                <button 
                  className="text-gray-800 font-bold hover:text-blue-600"
                  onClick={() => handleRead(athlete)}
                >
                  View 
                </button>
              </div>
            </div>
            <div className="w-60 bg-teal-800 rounded-3xl p-6 flex flex-col justify-between items-center">
              <div className="text-white text-sm font-bold">Status Verifikasi</div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  {athlete.status === 'VERIFIED' ? '✓' : '⚠'}
                </div>
                <div className="text-white text-sm font-bold">
                  {athlete.status === 'VERIFIED' ? 'Sudah diverifikasi' : 
                   athlete.status === 'REVISION' ? 'Perlu revisi' : 'Belum diverifikasi'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Overlay */}
      {showForm && selectedSport?.mainCategory && selectedSport?.subCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-2 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-6xl bg-neutral-100 rounded-3xl p-4">
            <div className="bg-[#0F6E87] rounded-3xl px-12 py-8 relative">

              {/* Close Button */}
              <button 
                onClick={resetForm}
                className="absolute top-6 right-6 text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Form Header */}
              <div className="text-center text-white text-4xl font-['Snowstorm'] mb-10">
                Data {role === 'coach' ? 'Coach' : 'Atlet'}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-8">

                  {/* Kolom 1 */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-white mb-2 font-semibold">Nama Lengkap</label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Tanggal Lahir</label>
                      <input
                        type="date"
                        name="tanggal_lahir"
                        value={formData.tanggal_lahir}
                        onChange={handleInputChange}
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">No. HP</label>
                      <input
                        type="text"
                        name="telp"
                        value={formData.telp}
                        onChange={handleInputChange}
                        placeholder="08123456789"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">ID Line</label>
                      <input
                        type="text"
                        name="id_line"
                        value={formData.id_line}
                        onChange={handleInputChange}
                        placeholder="Grok_"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Kolom 2 */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-white mb-2 font-semibold">Asal Provinsi</label>
                      <select
                        name="asal_provinsi"
                        value={formData.asal_provinsi}
                        onChange={handleInputChange}
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black"
                      >
                        <option value="">Pilih Provinsi</option>
                        <option value="DIY">D.I. Yogyakarta</option>
                        <option value="Jateng">Jawa Tengah</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Alamat Lengkap</label>
                      <textarea
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleInputChange}
                        placeholder="Jl. Grafika No.2, Sendowo, Sinduadi..."
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-2xl bg-white text-black placeholder-gray-400 h-28"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Email UGM</label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@mail.ugm.ac.id"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Kolom 3 */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-white mb-2 font-semibold">Jurusan</label>
                      <input
                        type="text"
                        name="jerasam"
                        value={formData.jerasam}
                        onChange={handleInputChange}
                        placeholder="Teknologi Informasi"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Angkatan</label>
                      <input
                        type="text"
                        name="angkatan"
                        value={formData.angkatan}
                        onChange={handleInputChange}
                        placeholder="2023"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">NIM</label>
                      <input
                        type="text"
                        name="no_institusi"
                        value={formData.no_institusi}
                        onChange={handleInputChange}
                        placeholder="20/25425/TK/23541"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-1 font-semibold">KTM</label>
                      <p className="text-white text-sm mb-2">Max 5 Mb</p>
                      <input
                        type="file"
                        name="kartu_institusi"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={readMode}
                        id="uploadFile"
                      />
                      <label
                        htmlFor="uploadFile"
                        className="inline-block px-6 py-2 border border-white text-white rounded-full cursor-pointer hover:bg-white hover:text-[#0F6E87]"
                      >
                        Unggah
                      </label>
                    </div>
                  </div>

                </div>

                {/* Tombol */}
                <div className="flex justify-center items-center gap-6 mt-10">
                  {readMode ? (
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setReadMode(false); }}
                      className="bg-teal-600 text-white px-4 py-2 rounded"
                    >
                      Tutup
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-teal-600 text-white px-4 py-2 rounded"
                    >
                      Simpan
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}