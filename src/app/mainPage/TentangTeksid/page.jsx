import React from 'react'
import Image from 'next/image'
const page = () => {
  return (
    <section className="px-6 md:px-28 py-14 flex flex-col md:flex-row justify-center items-center gap-12">
      {/* Left Side - Video Frame */}
      <div className="relative w-full md:w-3/5 max-w-2xl aspect-video">
        {/* Video inside the frame (z-10) */}
        <div className="absolute top-[9%] left-[17%] w-[78%] h-[78%] z-10 rounded-xl overflow-hidden">
            <video
            controls
            className="w-full h-full object-cover"
            >
            <source src="/videos/teknisiade.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>

        {/* Frame PNG (z-50) harus di atas video */}
        <Image
            src="/TentangTeksidLP/frameVideo.png"
            alt="Frame Video"
            width={920}
            height={80}
            className="object-contain z-50 absolute -top-3 left-0 w-full h-full"
        />
    </div>

      {/* Right Side - Text and Logos */}
      <div className="max-w-xl md:w-2/5">
        {/* Title and Logos */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-black text-6xl md:text-7xl font-bold font-sans drop-shadow-md">
              TENTANG
            </h2>
            <Image
              src="/TeksTeknisiade2025.png"
              alt="Teks Teknisiade 2025"
              width={280}
              height={30}
              className="mt-2"
            />
          </div>
          <Image
            src="/logoTeksid.png"
            alt="Logo Api"
            width={199}
            height={203}
            className="w-24 md:w-35 h-auto"
          />
        </div>

        {/* Paragraph */}
        <p className="text-justify text-gray-800 text-sm md:text-lg mt-5 font-semibold font-['Sofia_Sans_Condensed'] leading-5">
          Teknisiade telah menjadi bagian tak terpisahkan dari kehidupan kampus,
          dan tahun ini, lebih dari 4000 mahasiswa siap merayakannya. Teknisiade
          bukan sekadar acara biasa. Ia adalah panggung bagi para mahasiswa untuk
          mengekspresikan bakat, semangat, dan dedikasi mereka. Bagi banyak orang,
          Teknisiade adalah lebih dari sekadar kompetisi; ia adalah perayaan
          persaudaraan dan kebersamaan.
        </p>
      </div>
    </section>
    
    
  )
}

export default page


{/* <div className="px-28 py-14 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">

            <div className="pr-12 inline-flex justify-center items-center gap-10">

                <div className="w-[793px] h-96 relative bg-[radial-gradient(ellipse_50.00%_50.00%_at_50.00%_50.00%,_#F7E6CC_0%,_#D4BB94_100%)] rounded-[64px] shadow-[0px_3.4011330604553223px_3.4011330604553223px_0px_rgba(0,0,0,0.25)] overflow-hidden" />

                <Image src={"/TentangTeksidLP/frameVideo.png"} alt="teks" width={400} height={100} />

                <div className="w-[628px] inline-flex flex-col justify-start items-start gap-9">

                    <div className="self-stretch inline-flex justify-between items-center">

                        <div className="w-96 inline-flex flex-col justify-center items-start">

                            <div className="self-stretch justify-start text-black text-8xl font-normal font-['Snowstorm'] [text-shadow:_0px_7px_7px_rgb(0_0_0_/_0.25)]">TENTANG</div>

                            <Image src="/TeksTeknisiade2025.png" alt='teksid 2025' width={200} height={100} className="w-52 h-20" />

                        </div>

                        <Image src={"/logoTeksid.png"} alt='logo teksid' width={200} height={100} className="w-52 h-20" />



                    </div>

                    <div className="self-stretch text-justify justify-start text-Color-4 text-3xl font-bold font-['Sofia_Sans_Condensed'] leading-9">Teknisiade telah menjadi bagian tak terpisahkan dari kehidupan kampus, dan tahun ini, lebih dari 4000 mahasiswa siap merayakannya. Teknisiade bukan sekadar acara biasa. Ia adalah panggung bagi para mahasiswa untuk mengekspresikan bakat, semangat, dan dedikasi mereka. Bagi banyak orang, Teknisiade adalah lebih dari sekadar kompetisi; ia adalah perayaan persaudaraan dan kebersamaan.</div>

                </div>

            </div>

        </div> */}