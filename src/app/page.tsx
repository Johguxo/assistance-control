import { ContAsist } from "@/components/asistencia/ContAsist";
// import Image from "next/image";

export default function InitialPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center pt-40">
      <div className="w-11/12 h-full flex flex-col justify-center items-center">
        <h1 className="text-2xl text-gray-800">
          Marcado de asistencia JAJ 2024
        </h1>
        <ContAsist />
      </div>
    </main>
  );
}
