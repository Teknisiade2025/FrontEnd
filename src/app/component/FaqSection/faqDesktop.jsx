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
    <section className="flex flex-col items-center gap-10 px-4 py-10 pb-32 w-full max-w-screen-xl mx-auto">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-[#1d2225] text-[60px] sm:text-[80px] md:text-[115px] font-bold [text-shadow:4px_4px_0px_#00000040]">
          FAQ
        </h1>
        <p className="text-[#1d2225] text-[16px] sm:text-[18px] font-medium">Frequently Asked Questions</p>
      </header>

      {/* FAQ List */}
      <div className="w-full flex flex-col gap-6 max-w-4xl">
        {allFaqs.map((faq) => (
          <div key={faq.id}>
            <div className="flex justify-between items-start gap-2">
              <button
                className="text-left font-black text-lg sm:text-xl text-primary-600 flex-1"
                onClick={() => toggleFaq(faq.id)}
              >
                {faq.question}
              </button>
              <button onClick={() => toggleFaq(faq.id)}>
                <IoChevronDownSharp
                  className={`w-6 h-6 transition-transform ${openFaq === faq.id ? "rotate-180" : ""}`}
                />
              </button>
            </div>
            {openFaq === faq.id && (
              <p className="text-base sm:text-lg font-medium mt-2 text-primary-600">
                {faq.answer}
              </p>
            )}
            <hr className="border-t border-black mt-4" />
          </div>
        ))}
      </div>
    </section>
  );
};
