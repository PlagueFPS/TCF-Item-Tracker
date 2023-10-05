"use client"
import { useState, useEffect } from 'react'

export default function useLargeScreen() {
  const [largeScreen, setLargeScreen] = useState(false)

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 1280) setLargeScreen(true)
      else setLargeScreen(false)
    }

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return { largeScreen }
}
