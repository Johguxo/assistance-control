import Link from "next/link"
import { ButtonLink } from "./ButtonLink"


export const Header = () => {
  return (
    <header className="bg-black text-white flex justify-between h-1/9 py-5 w-screen">
      <nav className="flex  justify-between w-screen h-full ">
        <div className="flex h-full justify-center w-1/4">
          <h1 >Sistema de asistencia para JAJ 2024</h1>
        </div>
        <div className="flex gap-5 h-full w-2/3 sm:w-1/3">
          <div className="flex w-1/4">
            <ButtonLink href="/" title="Asistencia" />
          </div>
          <div className="flex w-1/4 ">
            <ButtonLink href="/report" title="Reportes" />
          </div>
          <div className="flex w-1/4">
            <ButtonLink href="/inscription" title="Inscripciones" />
          </div>
        </div>
      </nav>
    </header>
  )
}