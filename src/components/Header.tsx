import Link from "next/link"
import { ButtonLink } from "./ButtonLink"


export const Header = () => {
  return (
    <header className="bg-black text-white flex justify-between h-1/9 py-4 w-full">
      <nav className="flex justify-between w-full h-full items-center flex-col sm:flex-row">
        <div className="text-center h-full w-full sm:w-2/4 py-2 ">
          <h1 >Sistema de asistencia para JAJ 2024</h1>
        </div>
        <div className="flex gap-5 h-full px-2 w-full sm:w-2/4  justify-center">
          <div className="w-full ">
            <ButtonLink href="/" title="Asistencia" />
          </div>
          <div className="w-full border-2 border-x-gray-400 border-black">
            <ButtonLink href="/report" title="Reportes" />
          </div>
          <div className="w-full">
            <ButtonLink href="/inscription" title="Inscripciones" />
          </div>
        </div>
      </nav>
    </header>
  )
}