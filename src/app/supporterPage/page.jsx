import Supporter from "./supporter";

export default function SupporterPage() {
const items = [
        { 
        logo: "/logoKMHM/HMTPWK.svg", 
        name: "HMTPWK", 
        spt_name: "SUPARMAN" ,
        spt_dec: "Supporter Extreme Planology Engineering UGM"
      },
      { 
        logo: "/logoKMHM/KMTA.svg", 
        name: "KMTA", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        logo: "/logoKMHM/KMTG.svg", 
        name: "KMTG", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet" 
      },
      { 
        logo: "/logoKMHM/KMTSL.svg", 
        name: "KMTSL", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        logo: "/logoKMHM/HMTG.svg", 
        name: "HMTG", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet" 
      },
      { 
        logo: "/logoKMHM/HMTI.svg", 
        name: "HMTI", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet" 
      },
      { 
        logo: "/logoKMHM/KMTETI.svg", 
        name: "KMTETI", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        logo: "/logoKMHM/KMTNTF.svg", 
        name: "KMTNTF", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        logo: "/logoKMHM/KMTM.svg", 
        name: "KMTM", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        logo: "/logoKMHM/KMTK.svg", 
        name: "KMTK", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet" 
      },
];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Supporter items={items} />
    </div>
  );
}