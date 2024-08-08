import Link from "next/link"
import { ButtonLink } from "./ButtonLink"


export const Header = () => {
  return (
    <header className="bg-black text-white flex justify-between h-1/9 pb-4 sm:pt-4 w-full">
      <nav className="flex justify-between w-full h-full items-center flex-col sm:flex-row">
        <div className="text-center h-full w-full sm:w-2/4 py-2 ">
          <h1 >Sistema de asistencia para JAJ 2024</h1>
        </div>
        <div className="flex gap-5 h-full px-2 w-full sm:w-2/4  justify-center">
            <ButtonLink href="/" title="Asistencia" />
            <ButtonLink href="/report" title="Reportes" />
            <ButtonLink href="/inscription" title="Inscripciones" />
        </div>
      </nav>
    </header>
  )
}