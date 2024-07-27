import { ContAsist } from "@/components/asistencia/ContAsist";
// import Image from "next/image";

export default function InitialPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <h1 className="text-2xl">
        Marcado de asistencia JAJ 2024
      </h1>
     <ContAsist/>
    </main>
  );
}
