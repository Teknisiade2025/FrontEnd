'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="w-[813px] inline-flex flex-col justify-start items-center gap-7">
    <div className="w-[777px] flex flex-col justify-start items-center">
        <div className="self-stretch text-center justify-start text-Color-2 text-7xl font-normal font-['Snowstorm']">Selamat Datang, Admin!</div>
        <div className="w-[739.20px] text-center justify-start text-Color-2 text-2xl font-bold font-['Sofia_Sans_Condensed'] leading-loose">Selamat datang di menu utama. Dari sini, Anda bisa memulai untuk memverifikasi atlet, mengatur jadwal pertandingan, mengatur timeline event, atau mengupdate skor.</div>
    </div>
    <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
        <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="w-[813px] pl-14 pr-7 py-6 bg-stone-500 rounded-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <div className="flex justify-start items-center gap-8">
                    <div className="w-16 h-16 relative">
                        <div className="w-14 h-14 left-[6.80px] top-[6.80px] absolute bg-Color border-Color" />
                    </div>
                    <div className="w-96 inline-flex flex-col justify-start items-start">
                        <div className="self-stretch justify-start text-Color text-2xl font-normal font-['Snowstorm']">Verifikasi Registrasi Atlet</div>
                        <div className="self-stretch justify-start text-Color text-base font-normal font-['Sofia_Sans_Condensed'] leading-snug">Verifikasi atlet berdasarkan cabang lomba.</div>
                    </div>
                </div>
                <div className="w-16 h-16 relative">
                    <div className="w-5 h-9 left-[25.20px] top-[18.04px] absolute bg-Color border-Color-3" />
                </div>
            </div>
            <div className="w-[813px] pl-14 pr-7 py-7 bg-Color rounded-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <div className="flex justify-start items-center gap-9">
                    <div className="w-14 h-14 relative">
                        <div className="w-14 h-14 left-0 top-0 absolute bg-slate-600 border-slate-600" />
                    </div>
                    <div className="w-80 inline-flex flex-col justify-start items-start gap-px">
                        <div className="self-stretch justify-start text-slate-600 text-2xl font-normal font-['Snowstorm']">Schedule Pertandingan</div>
                        <div className="self-stretch justify-start text-slate-600 text-base font-semibold font-['Sofia_Sans_Condensed'] leading-snug">Tambah, edit, atau atur pertandingan.</div>
                    </div>
                </div>
                <div className="w-16 h-16 relative">
                    <div className="w-5 h-9 left-[25.20px] top-[18.04px] absolute bg-Color-3 border-Color-3" />
                </div>
            </div>
            <div className="w-[813px] px-14 py-8 bg-Color rounded-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] inline-flex justify-between items-center overflow-hidden">
                <div className="flex justify-start items-center gap-10">
                    <div className="w-14 h-14 relative">
                        <div className="w-12 h-11 left-[5.62px] top-[7.50px] absolute bg-slate-600 border-slate-600" />
                    </div>
                    <div className="w-96 inline-flex flex-col justify-start items-start">
                        <div className="self-stretch justify-start text-slate-600 text-2xl font-normal font-['Snowstorm']">Update Skor</div>
                        <div className="self-stretch justify-start text-slate-600 text-base font-semibold font-['Sofia_Sans_Condensed'] leading-snug">Tambah dan edit perolehan nilai akhir.</div>
                    </div>
                </div>
                <div className="w-3.5 h-10 rounded-[3px] outline outline-[6px] outline-offset-[-3px] outline-slate-600" />
            </div>
        </div>
    </div>
</div>
  );
}
