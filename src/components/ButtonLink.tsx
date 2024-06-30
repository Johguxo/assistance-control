import Link from "next/link"

interface Props {
  title: string
  href: string
}

export const ButtonLink = ({title, href}: Props) => {
  return (
    <>
      <Link href={href} className="bg-slate-300 p-3 rounded-2xl text-slate-600">
        {title}
      </Link>
    </>
  )
}