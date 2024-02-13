import Image from "next/image";
import hero from "/public/hero.jpg";
import phuket from "/public/phuket.png";
import ladprao from "/public/ladprao.png";
import pattaya from "/public/pattaya.png";
//import "@/styles/global.css";

export default function Home() {
  return (
    <main className="min-h-screent mt-8">
      <div className="h-16 w-full bg-[#004B64]"></div>
      <Image
        src={hero}
        alt=""
        className="h-[40vh] w-full object-cover object-center"
      ></Image>
      <div className="mt-8 flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-6">
        <Image src={ladprao} alt="" className="w-80 lg:w-72"></Image>
        <Image src={phuket} alt="" className="w-80 lg:w-72"></Image>
        <Image src={pattaya} alt="" className="w-80 lg:w-72"></Image>
      </div>
    </main>
  );
}
