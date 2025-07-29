"use client";
import React, { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

export const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(-1); // -1 = tidak ada yang terbuka

  const faqData = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    question: `Pertanyaan nomor ${i + 1}?`,
    answer: `Ini jawaban dari pertanyaan nomor ${i + 1}.`,
    fontWeight: "black",
  }));

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? -1 : id);
  };

  return (
    <section
      className="flex-col gap-[100px] mt-[-2px] inline-flex items-center relative"
      role="region"
      aria-labelledby="faq-heading"
    >
      {/* HEADER */}
      <header className="flex flex-col w-[296px] items-center relative">
        <h1
          id="faq-heading"
          className="text-[#1d2225] text-center [font-family:'Snowstorm_Bold-Regular',Helvetica] text-[115px] [text-shadow:4px_4px_0px_#00000040]"
        >
          <span>F</span>
          <span className="text-[105px]">A</span>
          <span>Q</span>
        </h1>
        <p className="text-[#1d2225] text-center font-medium text-[18px] leading-[24px]">
          Frequently Asked Questions
        </p>
      </header>

      {/* FAQ LIST */}
      <div className="relative w-[1167px]">
        <div className="flex flex-col w-full items-center gap-7 relative">
          {/* Garis awal */}
          <img
            className="w-full h-0.5"
            alt=""
            src="/faq/vectorline.svg"
            role="presentation"
          />

          {faqData.map((faq, index) => (
            <React.Fragment key={faq.id}>
              <div className="flex w-full items-start justify-between">
                {/* Pertanyaan + Jawaban */}
                <div className="flex flex-col w-[1027px] gap-[11px] items-start">
                  <button
                    id={`faq-question-${faq.id}`}
                    className={`text-primary-600 text-2xl text-left bg-transparent border-none cursor-pointer ${
                      faq.fontWeight === "black" ? "font-black" : "font-normal"
                    }`}
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={openFaq === faq.id}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    {faq.question}
                  </button>

                  {openFaq === faq.id && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="text-primary-600 text-[26px] font-medium leading-[31.2px]"
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>

                {/* Tombol Panah */}
                <button
                  className="bg-transparent border-none cursor-pointer p-0"
                  onClick={() => toggleFaq(faq.id)}
                  aria-label={
                    openFaq === faq.id ? "Sembunyikan jawaban" : "Tampilkan jawaban"
                  }
                >
                  <IoChevronDownSharp
                    className={`w-[30px] h-[30px] transition-transform duration-200 ${
                      openFaq === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Garis separator */}
              {index < faqData.length - 1 && (
                <img
                  className="w-full h-0.5"
                  alt=""
                  src="/faq/vectorline.svg"
                  role="presentation"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
