import { ContAsist } from "@/components/asistencia/ContAsist";
// import Image from "next/image";

export default function InitialPage() {
  console.log("here")
  return (
    <div className="flex h-full w-screen justify-center ">
        <ContAsist />
    </div>
  );
}
