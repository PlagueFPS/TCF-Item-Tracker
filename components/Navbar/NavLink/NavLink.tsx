"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  href: string
  children: React.ReactNode
  className?: string
  exact?: boolean
  arialabel?: string
  target?: string
}

export default function NavLink({ href, children, className, exact, arialabel, target }: Props) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)

  return (
    <Link
      href={ href }
      className={ isActive ? `${className} border-b border-b-secondary-700` : className }
      aria-label={ arialabel }
      target={ target ?? undefined }
      rel={ target ? 'noreferrer' : undefined }
    >
      { children }
    </Link>
  )
}
