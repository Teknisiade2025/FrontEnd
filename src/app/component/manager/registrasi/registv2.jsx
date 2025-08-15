'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Edit, Trash2, Plus, LogOut , User, X } from 'lucide-react';
import { supabase } from '@/app/lib/supabase'; 
import { useRouter } from 'next/navigation';

export default function AthleteRegistration({ selectedSport, kmhmName, role }) {
  const router = useRouter();
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
  const [user, setUser] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const loadAthletes = useCallback(async () => {
  if (!selectedSport?.mainCategory || !selectedSport?.subCategory) {
    setAthletes([]);
    return;
  }

  try {
    setLoading(true);
    let { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('cabang', selectedSport.mainCategory)
      .eq('kategori', selectedSport.subCategory)
      .eq('asal_pknin', kmhmName)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Filter untuk role 'user'
    if (role === 'user') {
      data = data.filter(a => a.owner === user.id);
    }

    setAthletes(data || []);
  } catch (error) {
    console.error(`Error loading ${role}:`, error.message);
    setAthletes([]);
  } finally {
    setLoading(false);
  }
}, [selectedSport?.mainCategory, selectedSport?.subCategory, tableName, role, user]);

useEffect(() => {
  if (user && selectedSport?.mainCategory && selectedSport?.subCategory) {
    loadAthletes();
  }
}, [user, selectedSport, kmhmName]);




  useEffect(() => {
  if (!user) return;
  loadAthletes();
  if (role === 'user') {
    // user biasa hanya bisa daftar atau lihat atlet sendiri
    // redirect atau set filtered data sesuai owner
    setAthletes(prev => prev.filter(a => a.owner === user.id));
     loadAthletes();
  }
}, [user, role]);


useEffect(() => {
  const getUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      router.push('/login');
    } else {
      setUser(user);
    }
  };
  getUser();
}, []);

useEffect(() => {
  if (user) {
    loadAthletes();
  }
}, [user]);


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
  const file = e.target.files[0];
  
  if (file) {
    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File terlalu besar! Maksimal 5MB');
      return;
    }
    
    // Validasi tipe file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format file tidak didukung! Gunakan JPG atau PNG');
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      kartu_institusi: file,
      ...(editingAthlete && prev.status !== 'UNVERIFIED' ? { status: 'UNVERIFIED' } : {})
    }));
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  // **PENTING: Cek user authentication lebih detail**
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    alert("Anda belum login! Silakan login terlebih dahulu.");
    router.push('/login');
    return;
  }

  console.log("Current user:", user.id); // Debug: cek user ID

  // Cek semua field wajib
  const requiredFields = [
    'nama','kategori','cabang','asal_pknin','jerasam','angkatan','email','telp',
    'alamat','tanggal_lahir','id_line','asal_provinsi','no_institusi'
  ];

  for (const field of requiredFields) {
    if (!formData[field] || formData[field].trim() === '') {
      alert('Harap isi semua form dulu!');
      return;
    }
  }

  // File wajib untuk tambah data
  if (!editingAthlete && !(formData.kartu_institusi instanceof File)) {
    alert('Harap unggah kartu institusi!');
    return;
  }

  try {
    let fileUrl = formData.kartu_institusi;

    // Upload file ke storage jika ada file baru
    // Upload file ke storage jika ada file baru
if (formData.kartu_institusi instanceof File) {
  try {
    const fileName = `${user.id}_${Date.now()}_${formData.kartu_institusi.name}`;
    
    console.log("Uploading file:", fileName); // Debug
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('kartu_institusi')
      .upload(fileName, formData.kartu_institusi, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }

    console.log("Upload success:", uploadData); // Debug

    const { data } = supabase.storage
      .from('kartu_institusi')
      .getPublicUrl(fileName);

    fileUrl = data.publicUrl;
    console.log("File URL:", fileUrl); // Debug
    
  } catch (uploadError) {
    console.error("File upload failed:", uploadError);
    alert(`Gagal upload file: ${uploadError.message}`);
    return;
  }
}

    // **Data yang akan dikirim - PASTIKAN owner di-set explicitly**
    const dataToSend = {
      nama: formData.nama,
      kategori: selectedSport.subCategory,
      cabang: selectedSport.mainCategory,
      asal_pknin: kmhmName,
      jerasam: formData.jerasam,
      angkatan: formData.angkatan,
      email: formData.email,
      telp: formData.telp,
      alamat: formData.alamat,
      tanggal_lahir: formData.tanggal_lahir,
      status: formData.status,
      id_line: formData.id_line,
      asal_provinsi: formData.asal_provinsi,
      no_institusi: formData.no_institusi,
      kartu_institusi: fileUrl,
      owner: user.id  // **EXPLICIT SET OWNER**
    };

    console.log("Data to send:", dataToSend); // Debug: cek data

    if (editingAthlete) {
      const { error } = await supabase
        .from(tableName)
        .update(dataToSend)
        .eq('id', editingAthlete.id);
        await loadAthletes();

      if (error) {
        console.error("Update error:", error);
        throw error;
      }
    } else {
      const { data: insertResult, error } = await supabase
        .from(tableName)
        .insert([dataToSend]);
        await loadAthletes();

      if (error) {
        console.error("Insert error:", error);
        throw error;
      }
      
      console.log("Insert result:", insertResult); // Debug
    }

    alert('Data berhasil disimpan!');
    await loadAthletes();
    resetForm();
  } catch (error) {
    console.error("Full error object:", error);
    alert(`Terjadi kesalahan: ${error.message}`);
  }
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

  if (athlete.kartu_institusi) {
  // Misal athlete.kartu_institusi adalah path di storage
  const { data } = supabase
    .storage
    .from('kartu_institusi')
    .getPublicUrl(athlete.kartu_institusi); // generate public URL
    console.log(athlete.kartu_institusi);
  setFilePreview(data.publicUrl);
}
};


 

  const countByStatus = (status) => {
    if (status === 'TOTAL') {
      return athletes.length;
    }
    return athletes.filter(a => a.status === status).length;
  };

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
  setEditingAthlete(null);
  setShowForm(false);
  setReadMode(false);
};

const handleDelete = async (athlete) => {
  if (!athlete || !athlete.id) {
    console.error("Athlete atau ID tidak valid", athlete);
    return;
  }

  if (athlete.status?.toUpperCase() === 'VERIFIED') {
    alert('Data sudah terverifikasi dan tidak dapat dihapus.');
    return;
  }

  if (window.confirm(`Yakin ingin menghapus data ${role} ini?`)) {
    try {
      await deleteAthlete(athlete.id);
    } catch (error) {
      console.error(`Error deleting ${role}:`, error.message);
    }
  }
};




  // 🔹 Blokir jika kmhmName kosong
  if (!kmhmName) {
    return (
      <div className="w-full h-full max-w-7xl font-sofia px-10 rounded-[32px] shadow-lg"
      style={{
            width: "900px",
            height: "600px",
            backgroundColor: "#806037",
            border: "3px solid #FFFFFF",
          }}>
        {/* Header Section */}
        <div className="font-sofia flex justify-between items-center text-sm pt-6 pr-10 mb-3">
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
            <div className="text-white font-extrabold text-lg capitalize">
              Total {role}: {countByStatus('TOTAL')}
            </div>
          </div>
          {/* Add Athlete Button */}
          <div 
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => setShowForm(true)}
          >
            <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center group-hover:bg-teal-600">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight text-center text-white text-lg font-bold" >
              <span>Daftarkan</span>
              <span>{role === 'coach' ? 'Coach' : 'Atlet'}</span>
            </div>
          </div>
        </div>

        {/* Pesan Tengah */}
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
      <div className="w-full h-full max-w-7xl font-sofia px-10 rounded-[32px] shadow-lg"
      style={{
            width: "900px",
            height: "600px",
            backgroundColor: "#806037",
            border: "3px solid #FFFFFF",
          }}>
        {/* Header Section */}
        <div className="font-sofia flex justify-between items-center text-sm pt-6 pr-10 mb-3">
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
            <div className="text-white font-extrabold text-lg capitalize">
              Total {role}: {countByStatus('TOTAL')}
            </div>
          </div>
          {/* Add Athlete Button */}
          <div 
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => setShowForm(true)}
          >
            <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center group-hover:bg-teal-600">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-tight text-center text-white text-lg font-bold" >
              <span>Daftarkan</span>
              <span>{role === 'coach' ? 'Coach' : 'Atlet'}</span>
            </div>
          </div>
        </div>

        {/* Pesan Tengah */}
        <div className="flex-1 h-full pb-45 flex items-center justify-center">
          <div className="text-lg font-semibold text-white text-center">
            Silakan pilih kategori dan cabang terlebih dahulu.
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="w-full h-full  font-sofia px-10 rounded-[32px] shadow-lg"
    style={{
          width: "900px",
          height: "600px",
          backgroundColor: "#806037",
          border: "3px solid #FFFFFF",
        }}>
      {/* Header Section */}
      <div className="font-sofia flex justify-between items-center text-sm pt-6 pr-10 mb-3">
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
          <div className="text-white font-extrabold text-lg capitalize">
            Total {role}: {countByStatus('TOTAL')}
          </div>
        </div>
        {/* Add Athlete Button */}
        <div 
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => setShowForm(true)}
        >
          <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center group-hover:bg-teal-600">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight text-center text-white text-lg font-bold" >
            <span>Daftarkan</span>
            <span>{role === 'coach' ? 'Coach' : 'Atlet'}</span>
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
      <div className="space-y-4 custom-scrollbar rounded-xl" 
        style={{ 
          maxHeight: '430px',
          overflowY: 'auto',
          paddingTop: '12px',
          paddingRight: '12px'
        }}>
        {filteredAthletes.map((athlete) => (
          <div key={athlete.id} className="flex gap-4">
            <div className="flex-none bg-amber-100 rounded-3xl p-8 flex justify-between items-center" 
            style={{
              width: '600px', // Lebar tetap
              overflow: 'hidden' // Supaya tidak scroll
            }}>
              <div className="flex items-center gap-8">
                <div className="w-24 h-30 bg-teal-600 rounded-xl flex items-center justify-center">
                  <User className="w-15 h-15 text-amber-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex"><div className="w-44 font-bold truncate">Nama</div><div className="truncate w-44">{athlete.nama}</div></div>
                  <div className="flex"><div className="w-44 font-bold truncate">Cabang</div><div className="truncate w-44">{athlete.cabang} {athlete.kategori}</div></div>
                  <div className="flex"><div className="w-44 font-bold truncate">Asal KMHM</div><div className="truncate w-44">{athlete.asal_pknin}</div></div>
                  <div className="flex"><div className="w-44 font-bold truncate">Jurusan</div><div className="truncate w-44">{athlete.jerasam}</div></div>
                  <div className="flex"><div className="w-44 font-bold truncate">Angkatan</div><div className="truncate w-44">{athlete.angkatan}</div></div>  
                  <div className="flex"><div className="w-44 font-bold truncate">Email</div><div className="truncate w-44">{athlete.email}</div></div>
                  <div className="flex"><div className="w-44 font-bold truncate">No. HP</div><div className="truncate w-44">{athlete.telp}</div></div>
                  <div className="flex"><div className="w-44 font-bold truncate">Tempat, Tanggal Lahir</div><div className="truncate w-44">{athlete.tanggal_lahir}</div></div>
                  <div className="flex"><div className="w-44 font-bold truncate">Asal Provinsi</div><div className="truncate w-44">{athlete.asal_provinsi}</div></div>
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
                  onClick={() => handleDelete(athlete)}
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
            <div className="w-60 bg-teal-800 rounded-3xl p-6 flex flex-col items-center justify-between text-center pb-25">
              <div className="text-white text-sm font-bold mb-4">Status Verifikasi</div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
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
        
        {/* Custom Scrollbar */}
        <style jsx global>{`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #FBEBD2 #806037;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #806037;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #FBEBD2;
            border-radius: 8px;

          }
        `}</style>
      </div>

      {/* Form Overlay */}
      {showForm && selectedSport?.mainCategory && selectedSport?.subCategory && (
        <div className="fixed inset-0 bg-opacity-2 flex items-center justify-center z-50 p-4 scale-80">
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
                        placeholder="Teknisiade"
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
                        placeholder="Teknisiade1"
                        disabled={readMode}
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Kolom 2 */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-white mb-2 font-semibold">Asal Provinsi</label>
                      <input
                        name="asal_provinsi"
                        value={formData.asal_provinsi}
                        onChange={handleInputChange}
                        placeholder="D.I.Yogyakarta"
                        disabled={readMode}
                        className="w-full px-6 py-3
                         rounded-full bg-white text-black"
                      >
                      </input>
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
  

  {/* Preview file saat readMode */}
  {readMode && filePreview && (
    <div className="mb-2">
    <a
      href={formData.kartu_institusi} // URL file dari Supabase Storage
      target="_blank"
      rel="noopener noreferrer"
      className="text-white-400 underline"
    >
      Lihat/Klik untuk unduh KTM
    </a>
  </div>
  )}

  {/* Input file untuk edit/tambah */}
  {!readMode && (
    <>
    <p className="text-white text-sm mb-2">Max 5 Mb. Gunakan JPG atau PNG</p>
      <input
        type="file"
        name="kartu_institusi"
        onChange={handleFileChange}
        className="hidden"
        id="uploadFile"
      />
      <label
        htmlFor="uploadFile"
        className="inline-block px-6 py-2 border border-white text-white rounded-full cursor-pointer hover:bg-white hover:text-[#0F6E87]"
      >
        Unggah
      </label>
    </>
  )}
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
                      className="bg-teal-600 text-white text-xl px-6 py-2 rounded-full hover:bg-teal-700"
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