"use client"
import { useNavContext } from "@/contexts/NavContext"
import { BsArrowBarRight } from 'react-icons/bs'

export default function ToggleSidebarButton() {
  const { handleCloseSidebar } = useNavContext()

  return (
    <div className="cursor-pointer" onClick={ handleCloseSidebar }>
      <BsArrowBarRight size="40" />
    </div>
  )
}
