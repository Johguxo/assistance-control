import { ContAsist } from "@/components/asistencia/ContAsist";
// import Image from "next/image";

export default function InitialPage() {
  return (
    <main className="flex h-auto flex-col items-center justify-center p-40">
      <div className="w-11/12 h-auto flex flex-col justify-center items-center">
        <h1 className="text-2xl text-gray-800">
          Marcado de asistencia JAJ 2024
        </h1>
        <ContAsist />
      </div>
    </main>
  );
}
