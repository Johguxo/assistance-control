import Link from "next/link"
import { ButtonLink } from "./ButtonLink"
 

export const Header = () => {
  return (
    <header className="bg-black text-white flex flex-row justify-around py-6 fixed w-full">
      <h1>Sistema de asistencia para JAJ 2024</h1>
      <nav >
        <ul className="flex flex-row gap-2">
          <li>
            <ButtonLink href="/" title="Asistencia" />
          </li>
          <li>
            <ButtonLink href="/report" title="Reportes" />
          </li>
        </ul>
      </nav>
    </header>
  )
}