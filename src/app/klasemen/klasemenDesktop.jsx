"use client";
import { useEffect, useState } from "react";
import { supabase } from '@/app/lib/supabase'; 


const logos = {
  HMTPWK: "/logoKMHM/HMTPWK.svg",
  KMTA: "/logoKMHM/KMTA.svg",
  KMTG: "/logoKMHM/KMTG.svg",
  KMTSL: "/logoKMHM/KMTSL.svg",
  HMTG: "/logoKMHM/HMTG.svg",
  HMTI: "/logoKMHM/HMTI.svg",
  KMTETI: "/logoKMHM/KMTETI.svg",
  KMTNTF: "/logoKMHM/KMTNTF.svg",
  KMTM: "/logoKMHM/KMTM.svg",
  KMTK: "/logoKMHM/KMTK.svg",
};

export default function MedalTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMedals = async () => {
      const { data: medali, error } = await supabase
        .from("medali")
        .select("*");

      if (error) {
        console.error(error);
        return;
      }

      const mappedData = medali.map((row) => {
  const nameUpper = row.kmhm?.toUpperCase() ?? "";
  return {
    logo: logos[nameUpper] ?? null,
    name: nameUpper,
    gold: row.emas || 0,
    silver: row.perak || 0,
    bronze: row.perunggu || 0,
  };
});

      setData(mappedData);
    };

    fetchMedals();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-no-repeat bg-cover py-30 sm:py-40 bg-[url('/klasemen/bg-kl-mb.svg')] sm:bg-[url('/klasemen/bg-kl-dt.svg')]">
      <div className="w-[100vw] mx-auto max-w-[1800px] pt-10 sm:pt-0 sm:px-25">
        <h1 className="font-snowstorm font-normal text-center text-[80px] md:text-[80px] lg:text-[120px] mb-8 md:mb-16 lg:mb-30">
          Klasemen
        </h1>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-center border-collapse">
            <thead className="bg-[#AF862D] text-[#F0EED7]">
              <tr className="text-[18px] sm:text-[22px] font-sofia">
                <th className="py-2 px-1 sm:py3 sm:px-4">KMHM</th>
                <th>
                  <img src="/klasemen/Gold.svg" alt="Gold" className="w-6 h-8 sm:w-8 sm:h-10 mx-auto" />
                </th>
                <th>
                  <img src="/klasemen/Silver.svg" alt="Silver" className="w-6 h-8 sm:w-8 sm:h-10 mx-auto" />
                </th>
                <th>
                  <img src="/klasemen/Bronze.svg" alt="Bronze" className="w-6 h-8 sm:w-8 sm:h-10 mx-auto" />
                </th>
                <th>Poin</th>
              </tr>
            </thead>
            <tbody className="text-[18px] sm:text-[22px] font-sofia">
              {data.map((row, index) => {
                const totalPoints = row.gold * 3 + row.silver * 2 + row.bronze * 1;
                return (
                  <tr
                    key={index}
                    className="border-b-2 border-[#1D2225] hover:bg-[#AF862D]/30 group transition-colors"
                  >
                    <td className="py-2 px-1 sm:py3 sm:px-4 group-hover:bg-[#AF862D]/30 transition-colors">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="w-5 h-7 sm:w-7 sm:h-10 flex items-center justify-center bg-[#806037] text-[#F0EED7] font-bold rounded-[6px] sm:rounded-[8px] group-hover:bg-[#3C3022] transition-colors">
                          {index + 1}
                        </div>
                        <img src={row.logo} alt={row.name} className="w-7 h-7 sm:w-10 sm:h-10 rounded-full" />
                        <span className="font-bold">{row.name}</span>
                      </div>
                    </td>

                    <td className="py-2 px-1 sm:py-4 sm:px-6 text-center text-[#1D2225] font-bold group-hover:bg-[#AF862D]/30 transition-colors">{row.gold}</td>
                    <td className="py-2 px-1 sm:py-4 sm:px-6 text-center text-[#1D2225] font-bold group-hover:bg-[#AF862D]/30 transition-colors">{row.silver}</td>
                    <td className="py-2 px-1 sm:py-4 sm:px-6 text-center text-[#1D2225] font-bold group-hover:bg-[#AF862D]/30 transition-colors">{row.bronze}</td>
                    <td className="py-2 px-1 sm:py-4 sm:px-6 text-center text-[#1D2225] font-bold group-hover:bg-[#AF862D]/30 transition-colors">{totalPoints}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
