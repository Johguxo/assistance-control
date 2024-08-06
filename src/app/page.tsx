import { ContAsist } from "@/components/asistencia/ContAsist";
import { ContAsistLeaders } from "@/components/asistencia/ContAsistLeaders";
// import Image from "next/image";

export default function InitialPage() {
  return (
    // <main className="flex bg-red-200 w-full h-screen mt-2 flex-col items-center ">
      // <div className="w-full h-screen flex flex-col items-center justify-center"> 

        <div className="flex  items-center h-full w-full">
          {/* <ContAsistLeaders /> */}
          <ContAsist />

        </div>

// </div>
// </main>
);
}
