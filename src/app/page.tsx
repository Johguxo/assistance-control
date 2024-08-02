import { ContAsist } from "@/components/asistencia/ContAsist";
import { ContAsistLeaders } from "@/components/asistencia/ContAsistLeaders";
// import Image from "next/image";

export default function InitialPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center pt-28">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl text-gray-800">
          Marcado de asistencia JAJ 2024
        </h1>
        {/*<ContAsist />*/}
        <ContAsistLeaders/>
      </div>
    </main>
  );
}
