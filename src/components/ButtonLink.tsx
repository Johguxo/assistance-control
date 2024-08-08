import Link from "next/link"
 
interface Props {
  title: string
  href: string
}

export const ButtonLink = ({title, href}: Props) => {
  return (
      <Link href={href} 
      className="bg-slate-300 w-full h-full p-2 flex items-center justify-center rounded-2xl text-slate-600 text-xs sm:text-sm">
        {title}
      </Link>

  )
  
}