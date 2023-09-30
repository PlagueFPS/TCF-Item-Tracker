"use client"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useEffect } from "react"

interface Props {
  className: string
  home?: boolean
}

export default function ToggleListButton({ className, home }: Props) {
  const { setHomeList, triggerList, setListClosing } = useItemsListContext()

  useEffect(() => {
    if (home) {
      const handleWindowResize = () => {
        if (window.innerWidth > 1280) {
          setListClosing(false)
          setHomeList(true)
        }
      }
      
      handleWindowResize()
      window.addEventListener('resize', handleWindowResize)
      return () => window.removeEventListener('resize', handleWindowResize)
    }
  }, [home, setHomeList, setListClosing])

  return (
    <button className={ className } onClick={ triggerList } title="Toggle List">
      Toggle List
    </button>
  )
}
