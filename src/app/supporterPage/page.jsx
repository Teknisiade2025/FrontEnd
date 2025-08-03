import Supporter from "./supporter";

export default function SupporterPage() {
const items = [
        { 
        card: "/card kmhm/Card HMTPWK.svg", 
        spt_name: "SUPARMAN" ,
        spt_dec: "Supporter Extreme Planology Engineering UGM"
      },
      { 
        card: "/card kmhm/Card HMTI.svg",  
        spt_name: "PANSER IRENG" ,
        spt_dec: "Pasukan Supporter Industrial Engineering"
      },
      { 
        card: "/card kmhm/Card HMTG.svg",  
        spt_name: "PANSERGEO" ,
        spt_dec: "Pasukan Suporter Geologi" 
      },
      { 
        card: "/card kmhm/Card KMTA.svg", 
        spt_name: "SUPARMAN" ,
        spt_dec: " "
      },
      { 
        card: "/card kmhm/Card KMTETI.svg", 
        spt_name: "SUTET" ,
        spt_dec: "Suporter TETI" 
      },
      { 
        card: "/card kmhm/Card KMTG.svg", 
        spt_name: "SUPERGEGER" ,
        spt_dec: " " 
      },
      { 
        card: "/card kmhm/Card KMTK.svg",  
        spt_name: "MAXIMANIA" ,
        spt_dec: " "
      },
      { 
        card: "/card kmhm/Card KMTM.svg",  
        spt_name: "SUPERMESIN" ,
        spt_dec: " "
      },
      { 
        card: "/card kmhm/Card KMTNTF.svg",  
        spt_name: "ALASKA" ,
        spt_dec: " "
      },
      { 
        card: "/card kmhm/Card KMTSL.svg",  
        spt_name: "CIVILION" ,
        spt_dec: " " 
      },
];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Supporter items={items} />
    </div>
  );
}