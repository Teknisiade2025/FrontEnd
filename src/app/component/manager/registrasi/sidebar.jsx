'use client';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const Sidebar = ({ onCategorySelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = {
    "Cabang Olahraga": [
      "Sepak Bola", "Voli", "Basket", "Badminton", "Futsal",
      "Tenis Meja", "Atletik", "Catur", "PUBG", "Mobile Legends",
      "Valorant", "FIFA"
    ],
    "Cabang SENI": [
      "Band", "Vokal Grup", "Solo Vokal", "Modern Dance"
    ]
  };

  const subCategories = {
    "Sepak Bola": ["Putra", "Putri"],
    "Voli": ["Putra", "Putri"],
    "Basket": ["Putra", "Putri"],
    "Badminton": ["Tunggal Putra", "Tunggal Putri", "Ganda Putra", "Ganda Putri", "Ganda Campuran"],
    "Futsal": ["Putra", "Putri"],
    "Tenis Meja": ["Tunggal Putra", "Tunggal Putri", "Ganda Putra", "Ganda Putri"],
    "Atletik": ["100m Putra", "100m Putri", "200m Putra", "200m Putri", "Lompat Jauh Putra", "Lompat Jauh Putri"]
  };

  const handleCategoryClick = (category) => {
    // Pertahankan semua parameter URL yang ada
    const params = new URLSearchParams(searchParams.toString());

    if (subCategories[category]) {
      setActiveCategory(category);
      params.set('category', category);
      router.push(`?${params.toString()}`);
    } else {
      params.set('category', category);
      router.push(`?${params.toString()}`);
      onCategorySelect?.({ mainCategory: category, subCategory: null });
      onClose?.();
    }
  };

  const handleSubCategoryClick = (subCat) => {
    // Pertahankan semua parameter URL yang ada
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', activeCategory);
    params.set('subcategory', subCat);
    router.push(`?${params.toString()}`);

    onCategorySelect?.({ mainCategory: activeCategory, subCategory: subCat });
    onClose?.();
    setActiveCategory(null);
  };

  return (
    <div className="w-72 h-full bg-[#7B4F27] rounded-3xl p-4 flex flex-col gap-4 overflow-hidden">
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-[#E6C79C] scrollbar-track-transparent">
        
        {/* Kalau belum pilih kategori → tampilkan daftar kategori */}
        {!activeCategory && Object.entries(categories).map(([section, items]) => (
          <div key={section} className="flex flex-col gap-3">
            <h2 className="text-[#F4E2C1] text-lg font-['Snowstorm']">
              {section}
            </h2>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <button
                  key={item}
                  onClick={() => handleCategoryClick(item)}
                  className="w-full h-8 px-4 flex justify-between items-center rounded-full text-sm font-bold font-['Sofia_Sans_Condensed'] bg-[#E6C79C] text-[#4B3220] hover:bg-[#dcbf96] transition"
                >
                  {item}
                  <ChevronRight size={16} className="text-[#4B3220]" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Kalau kategori dipilih → tampilkan subkategori */}
        {activeCategory && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-[#F4E2C1] font-bold"
            >
              <ChevronLeft size={18} /> Kembali
            </button>
            <h2 className="text-[#F4E2C1] text-lg font-['Snowstorm']">
              {activeCategory}
            </h2>
            <div className="flex flex-col gap-2">
              {subCategories[activeCategory]?.map((sub) => (
                <button
                  key={sub}
                  onClick={() => handleSubCategoryClick(sub)}
                  className="w-full h-8 px-4 flex justify-between items-center rounded-full text-sm font-bold font-['Sofia_Sans_Condensed'] bg-[#E6C79C] text-[#4B3220] hover:bg-[#dcbf96] transition"
                >
                  {sub}
                  <ChevronRight size={16} className="text-[#4B3220]" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;