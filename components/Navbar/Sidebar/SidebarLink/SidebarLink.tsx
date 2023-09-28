"use client"
import { useNavContext } from "@/contexts/NavContext"
import Link from "next/link"

interface Props {
  children: React.ReactNode
  href: string
  className?: string
}

export default function SidebarLink({ children, href, className }: Props) {
  const { handleCloseSidebar } = useNavContext()

  return (
    <Link
      href={ href }
      className={ className }
      onClick={ handleCloseSidebar }
    >
      { children }
    </Link>
  )
}
