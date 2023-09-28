"use client"
import { useNavContext } from "@/contexts/NavContext"

interface Props {
  children: React.ReactNode
}

export default function DesktopNavWrapper({ children }: Props) {
  const { largeScreen } = useNavContext()

  return (
    <>
      { largeScreen && children }
    </>
  )
}
