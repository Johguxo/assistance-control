import Link from "next/link"
import { ButtonLink } from "./ButtonLink"


export const Header = () => {
  return (
    <header className="bg-black text-white flex justify-between h-1/9 py-3 w-screen">
      <nav className="flex  justify-between w-screen h-full items-center flex-col sm:flex-row">
        <div className="text-center h-full w-full sm:w-2/4">
          <h1 >Sistema de asistencia para JAJ 2024</h1>
        </div>
        <div className="flex gap-5 h-full w-full sm:w-2/4 justify-center">
          <div className="w-1/4">
            <ButtonLink href="/" title="Asistencia" />
          </div>
          <div className="w-1/4 ">
            <ButtonLink href="/report" title="Reportes" />
          </div>
          <div className="w-1/4">
            <ButtonLink href="/inscription" title="Inscripciones" />
          </div>
        </div>
      </nav>
    </header>
  )
}