import Link from "next/link"
 
interface Props {
  title: string
  href: string
}

export const ButtonLink = ({title, href}: Props) => {
  return (
      <Link href={href} className="w-full h-full p-2 flex items-center justify-center text-white text-xs sm:text-sm">
        {title}
      </Link>

  )
  
}