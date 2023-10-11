"use client"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useEffect } from "react"

interface Props {
  className: string
  home?: boolean
}

export default function ToggleListButton({ className, home }: Props) {
  const { listClosing, setHomeList, setListClosing, setShowList } = useItemsListContext()

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
    else setListClosing(true)
  }, [home, setHomeList, setListClosing])

  const toggleList = () => {
    // allow time for animation to play on exit
    if (home) {
      if (!listClosing) {
        setListClosing(true)
        const timeout = setTimeout(() => setHomeList(false), 250)
        return () => clearTimeout(timeout)
      }
      else {
        setListClosing(false)
        setHomeList(true)
      }
    }
    else {
      if (!listClosing) {
        setListClosing(true)
        const timeout = setTimeout(() => setShowList(false), 250)
        return () => clearTimeout(timeout)
      }
      else {
        setListClosing(false)
        setShowList(true)
      }
    }
  }

  return (
    <button className={ className } onClick={ toggleList } title="Toggle List">
      Toggle List
    </button>
  )
}
