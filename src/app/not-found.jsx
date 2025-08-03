import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (

        <div
        className="min-h-screen w-full flex flex-col items-center bg-no-repeat bg-cover bg-center pt-16 sm:pt-20 lg:pt-28"
        style={{backgroundImage: "url('/not-found/Background 404 - Desktop.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center top", 
            }}>
            
            <div className="w-[85vw] lg:w-[1200px] px-4 flex flex-col items-center pt-[10vh] lg:mt-10">
                {/*404 NOT FOUND*/}
                <div className="text-center mb-8 lg:mb-12">
                <h1 className="font-snowstorm font-bold tracking-[0] leading-none"
                        style={{textShadow: "0px 3px 4px rgba(0,0,0,0.25)"}}>
                        <span className="text-[80px] sm:text-[100px] lg:text-[120px]">4</span>
                        <span className="text-[70px] sm:text-[90px] lg:text-[100px]">0</span>
                        <span className="text-[80px] sm:text-[100px] lg:text-[120px]">4</span>
                    </h1>
                    <h2 className="font-snowstorm font-bold leading-none tracking-[0] -mt-4 sm:-mt-8 lg:-mt-12"
                        style={{textShadow: "0px 3px 4px rgba(0,0,0,0.25)"}}>
                        <span className="text-[60px] sm:text-[80px] lg:text-[120px]">N</span>
                        <span className="text-[50px] sm:text-[70px] lg:text-[100px]">OT FOUN</span>
                        <span className="text-[60px] sm:text-[80px] lg:text-[120px]">D</span>
                    </h2>
                
                    {/* Back Button */}
                    <div
                            className="w-full max-w-[90vw] sm:max-w-4xl bg-[#FBEBD2] rounded-[30px] sm:rounded-[40px] shadow-lg overflow-hidden mx-auto"
                            style={{
                                boxShadow: "0px 7px 22px 4px rgba(0,0,0,0.41)"
                            }}>
                            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-8 gap-4 sm:gap-10">
                                <div className="text-center sm:text-left">
                                    <p className="font-sofia font-bold text-base sm:text-2xl text-[#1D2225] leading-snug">
                                        Oops, kami tidak bisa menemukan <br className="hidden sm:block"/> halaman yang anda cari.
                                    </p>
                                </div>
        
                                <div className="w-full sm:w-auto">
                                    <a href="/mainPage"
                                        className="flex items-center justify-center gap-2 sm:gap-3 bg-[#B1844D] text-[#1D2225] font-sofia font-bold text-base sm:text-2xl px-4 sm:px-10 py-2 sm:py-4 rounded-[20px] sm:rounded-[25px] shadow-md hover:bg-[#9c6f3c] transition whitespace-nowrap">
                                        Ke Beranda
                                        <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    );
}