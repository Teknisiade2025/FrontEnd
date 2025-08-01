"use client";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

export const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const allFaqs = [
    { id: 1, question: "Bagaimana cara mendaftar lomba?", answer: "Silakan kunjungi halaman pendaftaran pada website." },
    { id: 2, question: "Kapan batas akhir pendaftaran?", answer: "Batas akhir pendaftaran adalah 15 Agustus 2025." },
    { id: 3, question: "Apakah boleh ikut lebih dari satu lomba?", answer: "Boleh, selama jadwal tidak berbenturan." },
    { id: 4, question: "Apakah PUBG termasuk cabang olahraga?", answer: "Ya, PUBG termasuk cabang olahraga elektronik." },
    { id: 5, question: "Di mana lokasi lomba Basket?", answer: "Lomba Basket diadakan di GOR kampus utama." },
    { id: 6, question: "Apakah Cipta Puisi dilakukan individu?", answer: "Ya, Cipta Puisi adalah lomba individu." },
    { id: 7, question: "Apakah lomba Poster boleh tim?", answer: "Tidak, Poster hanya untuk peserta individu." },
    { id: 8, question: "Berapa maksimal anggota futsal?", answer: "Maksimal 10 orang termasuk cadangan." },
    { id: 9, question: "Apakah Mobile Legends pakai sistem BO3?", answer: "Ya, sistemnya Best of 3 untuk babak eliminasi." },
    { id: 10, question: "Apakah ada biaya pendaftaran?", answer: "Tidak ada, semua lomba gratis." },
    { id: 11, question: "Di mana lokasi lomba Tari Tradisional?", answer: "Lomba diadakan di aula utama gedung seni." },
    { id: 12, question: "Apakah boleh membawa kamera sendiri?", answer: "Ya, peserta fotografi boleh pakai kamera pribadi." },
    { id: 13, question: "Bagaimana sistem penilaian Solo Vokal?", answer: "Penilaian berdasarkan vokal, teknik, dan ekspresi." },
  ];

  return (
    <section className="relative w-full max-w-[1759px] mx-auto px-6 py-16 font-['Sofia_Sans_Condensed'] text-[#1D2225]">
      {/* Judul FAQ */}
      <h1 className="text-[103px] font-[Snowstorm] text-center leading-tight drop-shadow-[0_6px_6px_rgba(0,0,0,0.25)] mb-6">
        FAQ
      </h1>
      <p className="text-center text-[20px] font-semibold mb-12">
        Frequently Asked Questions
      </p>

      {/* List FAQ */}
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {allFaqs.map((faq) => (
          <div key={faq.id} className="bg-[rgba(240,238,215,0.8)] p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-start gap-4">
              <button
                className="text-left text-[20px] font-bold text-[#3C3022] flex-1"
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
              </button>
              <button onClick={() => toggleFaq(faq.id)} className="text-[#3C3022]">
                <IoChevronDownSharp
                  className={`w-6 h-6 transition-transform duration-300 ${openFaq === faq.id ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {openFaq === faq.id && (
              <p className="mt-4 text-[18px] text-[#3C3022] font-medium">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
