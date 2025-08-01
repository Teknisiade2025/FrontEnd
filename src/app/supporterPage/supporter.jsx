'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Supporter({ items }) {

  return (
    <div 
      className="min-h-screen w-full flex flex-col justify-center items-center bg-no-repeat bg-cover"
      style={{ backgroundImage: "url('/supporter/Background Supporter.svg')" }}
    >
      {/* ===== TEXT CONTENT SECTION ===== */}
      <div className="flex w-full justify-end pr-15 pt-55 pb-75">


        <div className="bg-[#FBEBD2] flex items-start shadow-lg shadow-[#000000]/40 overflow-hidden max-w-[650px] pr-12 py-8 w-full rounded-[50px]">

            
            <div className="w-1/3 flex justify-center top-[20px]">
                <img src="/supporter/logo_supersonik.svg" alt="Logo" className="w-25 h-25 object-contain"/>
            </div>

            <div className="w-2/3 ">
                <h1 className="font-snowstorm font-light  text-[#1D2225] text-[60px] leading-none">SUPERSONIK</h1>
                <h2 className="font-sofia font-medium text-[30px] text-[#1D2225] -mt-2">Supporter Solid Teknik UGM</h2>
                <p className="text-[22px] font-sofia font-light text-[#1D2225]/80 text-justify leading-8 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
            
      </div>
     

      {/* ===== CAROUSEL SECTION ===== */}
      <div className="w-full px-15 pb-20">
        <h2 className="font-snowstorm font-light text-[#1D2225] text-[60px] text-center mb-20">SUPPORTER</h2>

        <div className="mx-auto">
        <Carousel 
          className="w-full mx-auto px-6 relative" 
          opts={{ align: "start", loop:true }}
        >
           <CarouselContent>
            {items.map((item, idx) => {
              return (
                <CarouselItem
                  key={idx}
                  className="basis-1/3"
                >
                  <div className="p-2">
                    <div
                      className={`h-full flex flex-col transition-all overflow-hidden`}
                           >
                      {/* === ROW 1: BG + Logo + Nama === */}
                      <div
                        className="flex flex-col w-[300x] h-[450px] shadow-lg items-center py-10 bg-no-repeat bg-cover rounded-[20px]"
                        style={{
                          backgroundImage: "url('/supporter/card1.svg')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="flex flex-col items-center gap-6">
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="w-55 h-55 object-contain mt-10"
                        />
                        <h3 className="font-snowstorm text-[60px] text-[#AF862D]/90 pt-4">
                          {item.name}
                        </h3>
                        </div>
                        
                      </div>

                      {/* === ROW 2: Text Only === */}
                      <div className="flex flex-col items-center text-center p-6">
                        <h4 className="font-snowstorm font-light text-[60px] text-[#1D2225]/80">
                          {item.spt_name}
                        </h4>
                        <p className="font-sofia font-medium text-[30px] text-[#1D2225]/80 leading-tight -mt-4">
                          {item.spt_dec}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious 
            className="absolute left-8 top-[80%] transform -translate-y-1/2 bg-transparent shadow-none border-none p-0 hover:bg-transparent focus:ring-0"></CarouselPrevious>

            <CarouselNext 
            className="absolute right-8 top-[80%] transform -translate-y-1/2 bg-transparent shadow-none border-none p-0 hover:bg-transparent focus:ring-0"></CarouselNext>
        </Carousel>
     a
        </div>
      
      </div>
    </div>
  );
}