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
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        card: "/card kmhm/Card HMTG.svg",  
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet" 
      },
      { 
        card: "/card kmhm/Card KMTA.svg", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        card: "/card kmhm/Card KMTETI.svg", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet" 
      },
      { 
        card: "/card kmhm/Card KMTG.svg", 
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet" 
      },
      { 
        card: "/card kmhm/Card KMTK.svg",  
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        card: "/card kmhm/Card KMTM.svg",  
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        card: "/card kmhm/Card KMTNTF.svg",  
        spt_name: "xxx" ,
        spt_dec: "Lorem ipsum dolor sit amet"
      },
      { 
        card: "/card kmhm/Card KMTSL.svg",  
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