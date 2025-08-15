import React, { useState, useEffect, useCallback } from 'react';
import { Search, Edit, Trash2, Plus, User, X, Download } from 'lucide-react';
import { supabase } from '@/app/lib/supabase'; 
import ReactDOM from 'react-dom';
import * as XLSX from 'xlsx';

export default function Verifikasi({ selectedSport, kmhmName, role }) {
  console.log('Component props:', { selectedSport, kmhmName, role });
  
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
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

const loadUsers = useCallback(async () => {
  try {
    setLoading(true);

    const [athletesRes, coachesRes] = await Promise.all([
      supabase.from('athletes').select('*').order('created_at', { ascending: false }),
      supabase.from('coaches').select('*').order('created_at', { ascending: false })
    ]);

    if (athletesRes.error) throw athletesRes.error;
    if (coachesRes.error) throw coachesRes.error;

    const combined = [
      ...(athletesRes.data || []).map(a => ({ ...a, role: 'Athlete' })),
      ...(coachesRes.data || []).map(c => ({ ...c, role: 'Coach' }))
    ];

    setAllUsers(combined);

    // Filter otomatis
    let filtered = combined;
    if (kmhmName) filtered = filtered.filter(u => u.asal_pknin === kmhmName);
    if (selectedSport?.mainCategory) filtered = filtered.filter(u => u.cabang === selectedSport.mainCategory);
    if (selectedSport?.subCategory) filtered = filtered.filter(u => u.kategori === selectedSport.subCategory);

    setFilteredAthletes(filtered);

  } catch (err) {
    console.error("Error loading users:", err);
    setAllUsers([]);
    setFilteredAthletes([]);
  } finally {
    setLoading(false);
  }
}, [selectedSport, kmhmName]);

useEffect(() => {
  if (selectedSport && kmhmName) {
    loadUsers();
  }
}, [selectedSport, kmhmName, loadUsers]);



const loadAllUsers = useCallback(async () => {
  try {
    setLoading(true);

    const [athletesRes, coachesRes] = await Promise.all([
      supabase.from('athletes').select('*').order('created_at', { ascending: false }),
      supabase.from('coaches').select('*').order('created_at', { ascending: false })
    ]);

    if (athletesRes.error) throw athletesRes.error;
    if (coachesRes.error) throw coachesRes.error;

    const combined = [
      ...(athletesRes.data || []).map(a => ({ ...a, role: 'Athlete' })),
      ...(coachesRes.data || []).map(c => ({ ...c, role: 'Coach' }))
    ];

    setAllUsers(combined);
  } catch (err) {
    console.error(err);
    setAllUsers([]);
  } finally {
    setLoading(false);
  }
}, []);







  // Load data athletes dari Supabase dengan useCallback untuk stabilitas
const loadAthletes = useCallback(async () => {
  console.log('Props saat loadAthletes:', {
    mainCategory: selectedSport?.mainCategory,
    subCategory: selectedSport?.subCategory,
    kmhmName
  });

  if (!selectedSport?.mainCategory || !selectedSport?.subCategory || !kmhmName) {
    console.log('Missing required data:', { 
      mainCategory: selectedSport?.mainCategory, 
      subCategory: selectedSport?.subCategory, 
      kmhmName 
    });
    setAthletes([]);
    return;
  }

  try {
    setLoading(true);
    console.log(`Loading ${role} data for:`, {
      cabang: selectedSport.mainCategory,
      kategori: selectedSport.subCategory,
      asal_pknin: kmhmName,
      tableName
    });

    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('cabang', selectedSport.mainCategory)
      .eq('kategori', selectedSport.subCategory)
      .eq('asal_pknin', kmhmName)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error loading ${role}:`, error);
      throw error;
    }

    console.log(`Loaded ${role} data:`, data);
    setAthletes(data || []);
  } catch (error) {
    console.error(`Error loading ${role}:`, error);
    setAthletes([]);
  } finally {
    setLoading(false);
  }
}, [selectedSport?.mainCategory, selectedSport?.subCategory, kmhmName, tableName, role]);


// Load athletes saat pertama kali mount dan tiap ada perubahan
useEffect(() => {
  loadAthletes();
}, [loadAthletes]);

// Refresh data otomatis setelah tambah, edit, hapus
const refreshData = () => {
  loadAthletes();
};

// Update status athlete/coach
const updateStatus = async (id, newStatus) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update({ status: newStatus })
      .eq('id', id);

    if (error) throw error;

    // Update state lokal supaya filter otomatis jalan
    setAllUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, status: newStatus } : user))
    );
  } catch (error) {
    console.error(`Error updating ${role} status:`, error);
  }
};

useEffect(() => {
  if (selectedSport?.mainCategory && selectedSport?.subCategory && kmhmName && role) {
    loadAthletes();
  }
}, [selectedSport, kmhmName, role, loadAthletes]);



// Handle view detail (readMode)
const handleRead = (athlete) => {
  setFormData({
    ...formData,
    ...athlete
  });
  setEditingAthlete(athlete); 
  setReadMode(true);
  setShowForm(true);
};


  

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

  useEffect(() => {
  console.log('All users loaded:', allUsers);
}, [allUsers]);


  // Update formData ketika kategori / cabang / kmhmName berubah
useEffect(() => {
  let filtered = [...allUsers];

  // Filter kmhmName
  if (kmhmName) {
    filtered = filtered.filter(u => u.asal_pknin?.trim() === kmhmName.trim());
  }

  // Filter cabang & kategori
  if (selectedSport?.mainCategory) {
    filtered = filtered.filter(u => u.cabang?.trim() === selectedSport.mainCategory.trim());
  }
  if (selectedSport?.subCategory) {
    filtered = filtered.filter(u => u.kategori?.trim() === selectedSport.subCategory.trim());
  }

  // Filter status (activeTab misal 'UNVERIFIED', 'VERIFIED', 'TOTAL')
  if (activeTab && activeTab !== 'TOTAL') {
    filtered = filtered.filter(u => u.status?.toUpperCase() === activeTab.toUpperCase());
  }

  setFilteredUsers(filtered);

}, [allUsers, selectedSport, kmhmName, activeTab]);











  // Export to Excel function
  const exportToExcel = () => {
  if (!allUsers || allUsers.length === 0) {
    alert('No data to export');
    return;
  }

  const workbook = XLSX.utils.book_new();

  // Pisahkan per role
  const roles = [...new Set(allUsers.map(u => u.role))]; // semua role unik
  roles.forEach(role => {
    const dataByRole = allUsers.filter(u => u.role === role);
    if (dataByRole.length > 0) {
      const ws = XLSX.utils.json_to_sheet(dataByRole);
      XLSX.utils.book_append_sheet(workbook, ws, role.charAt(0).toUpperCase() + role.slice(1));
    }
  });

  // Pastikan workbook ada sheet
  if (workbook.SheetNames.length === 0) {
    alert('No data to export');
    return;
  }

  const fileName = `all_data_${new Date().toISOString().slice(0,10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};


  // Helper function to count athletes by status
  function countByStatus(status) {
  let filteredList = allUsers;

  // Filter sesuai kmhmName
  if (kmhmName) {
    filteredList = filteredList.filter(user => user.asal_pknin === kmhmName);
  }

  // Filter sesuai cabang dan kategori
  if (selectedSport?.mainCategory) {
    filteredList = filteredList.filter(user => user.cabang === selectedSport.mainCategory);
  }
  if (selectedSport?.subCategory) {
    filteredList = filteredList.filter(user => user.kategori === selectedSport.subCategory);
  }

  // Filter sesuai searchTerm (opsional, kalau mau ikut search juga)
  if (searchTerm) {
    const lowerTerm = searchTerm.toLowerCase();
    filteredList = filteredList.filter(
      user =>
        user.nama?.toLowerCase().includes(lowerTerm) ||
        user.cabang?.toLowerCase().includes(lowerTerm) ||
        user.kategori?.toLowerCase().includes(lowerTerm)
    );
  }

  if (status === 'TOTAL') return filteredList.length;

  return filteredList.filter(user => user.status?.toUpperCase() === status?.toUpperCase()).length;
}





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
            <div className="text-white text-xl font-bold">
              Total {role}: {countByStatus('TOTAL')}
            </div>
          </div>
          {/* Export Button */}
          <div 
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={exportToExcel}
          >
            <div className="w-15 h-15 bg-teal-700 rounded-full flex items-center justify-center group-hover:bg-teal-600">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="text-center text-white text-lg font-bold">
              Export Excel
            </div>
          </div>
        </div>
              
        <div className="font-sofia flex-1 h-full flex items-center justify-center">
          <div className="font-sofia text-lg font-semibold text-white text-center">
            Nama KMHM tidak ditemukan. Harap login atau pilih KMHM terlebih dahulu.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full max-w-7xl mx-auto px-12 py-9 bg-[#806037] border-4 border-white rounded-[32px] shadow-lg">
      {/* Header Section */}
        <div className="flex justify-between items-center mb-1 pr-10">
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
            <div className="text-white text-xl font-bold">
              Total {role}: {countByStatus('TOTAL')}
            </div>
          </div>
          {/* Export Button */}
          <div 
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={exportToExcel}
          >
            <div className="w-15 h-15 bg-teal-700 rounded-full flex items-center justify-center group-hover:bg-teal-600">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col leading-tight text-center text-white text-lg font-bold">
              <span>Export</span>
              <span>Excel</span>
            </div>
          </div>
        </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="font-sofia text-white text-lg">Loading {role} data...</div>
        </div>
      )}

    {/* No Data Message */}
{!loading && filteredUsers.length === 0 && (
  <div className="flex items-center justify-center py-8">
    <div className="font-sofia text-white text-lg">
      No users found for {selectedSport?.mainCategory} - {selectedSport?.subCategory} in {kmhmName}
    </div>
  </div>
)}

      {/* Empty Filtered Results */}
      {!loading && athletes.length > 0 && filteredAthletes.length === 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="font-sofia text-white text-lg">
            No {role} found with status: {activeTab}
          </div>
        </div>
      )}

      {/* Athletes List */}
      <div className="space-y-4 custom-scrollbar rounded-xl" 
        style={{ 
          maxHeight: '400px',
          overflowY: 'auto',
          paddingTop: '12px',
          paddingRight: '12px'
        }}>
        {filteredUsers.map((athlete) => (
          <div key={athlete.id} className="flex gap-4">
            <div className="flex-none bg-amber-100 rounded-3xl p-8 flex justify-between items-center" 
            style={{
              width: '600px', // Lebar tetap
              overflow: 'hidden' // Supaya tidak scroll
            }}>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-center font-bold font-snowstorm text-lg gap-8 ">
                <h3>{athlete.role}</h3>
                <div className="w-24 h-24 bg-teal-600 rounded-xl flex flex-col items-center justify-center">
                  <User className="w-12 h-12 text-amber-100" />
                </div>
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
                  className="text-gray-800 font-bold hover:text-blue-600"
                  onClick={() => handleRead(athlete)}
                >
                  View 
                </button>
              </div>
            </div>
            <div className="w-60 bg-teal-800 rounded-3xl pt-6 pb-6 flex flex-col items-center justify-between text-center ">
              <div className="text-white text-sm font-bold mb-8">Status Verifikasi</div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-2">
                  {athlete.status === 'VERIFIED' ? '✓' : '⚠'}
                </div>
                <div className="text-white text-sm font-bold">
                  {athlete.status === 'VERIFIED' ? 'Sudah diverifikasi' : 
                  athlete.status === 'REVISION' ? 'Perlu revisi' : 'Belum diverifikasi'}
                </div>
                
                {/* Action buttons for unverified entries */}
                {athlete.status === 'UNVERIFIED' && (
                  <div className="flex flex-col gap-2 w-full pt-8">
                    <button 
  type="button"
  onClick={() => updateStatus(athlete.id, 'VERIFIED')}
  className="w-full bg-green-600 text-white py-1 rounded hover:bg-green-700"
>
  Verifikasi
</button>
<button 
  type="button"
  onClick={() => updateStatus(athlete.id, 'REVISION')}
  className="w-full bg-yellow-600 text-white py-1 rounded hover:bg-yellow-700"
>
  Revisi
</button>

                  </div>
                )}
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

      {/* Form Overlay (View Only) */}
      {showForm && selectedSport?.mainCategory && selectedSport?.subCategory && (
        ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999]  top-20 flex items-center justify-center p-4 ">
          <div className="w-full max-w-6xl bg-neutral-100 rounded-3xl  p-4 relative z-50 scale-75">
            <div className="bg-[#0F6E87] rounded-3xl px-12 py-8 ">

              {/* Close Button */}
              <button 
                onClick={() => { setShowForm(false); setReadMode(false); }}
                className="absolute top-6 right-6 text-white hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Form Header */}
              <div className="text-center text-white text-4xl font-['Snowstorm'] mb-10">
                Data {role === 'coach' ? 'Coach' : 'Atlet'}
              </div>

              {/* Form */}
              <form>
                <div className="grid grid-cols-3 gap-8">

                  {/* Kolom 1 */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-white mb-2 font-semibold">Nama Lengkap</label>
                      <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Tanggal Lahir</label>
                      <input
                        type="date"
                        name="tanggal_lahir"
                        value={formData.tanggal_lahir}
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">No. HP</label>
                      <input
                        type="text"
                        name="telp"
                        value={formData.telp}
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">ID Line</label>
                      <input
                        type="text"
                        name="id_line"
                        value={formData.id_line}
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Kolom 2 */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-white mb-2 font-semibold">Asal Provinsi</label>
                      <input
                        type="text"
                        name="asal_provinsi"
                        value={formData.asal_provinsi}
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Alamat Lengkap</label>
                      <textarea
                        name="alamat"
                        value={formData.alamat}
                        readOnly
                        className="w-full px-6 py-3 rounded-2xl bg-white text-black placeholder-gray-400 h-28"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Email UGM</label>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        readOnly
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
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">Angkatan</label>
                      <input
                        type="text"
                        name="angkatan"
                        value={formData.angkatan}
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2 font-semibold">NIM</label>
                      <input
                        type="text"
                        name="no_institusi"
                        value={formData.no_institusi}
                        readOnly
                        className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                       <a
    href={formData.kartu_institusi}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 text-white font-bold text-lg hover:underline"
  >
    <Download size={16} /> Lihat File
  </a>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-center items-center gap-6 mt-10">
                  <button
                    type="button"
                    onClick={() => { setShowForm(false); setReadMode(false); }}
                    className="bg-teal-600 text-white px-8 py-3 rounded-full border-4 border-white "
                  >
                    Tutup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
  )
      )}
    </div>
  );
}