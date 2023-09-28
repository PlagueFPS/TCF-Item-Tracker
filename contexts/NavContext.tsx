"use client"
import { createContext, useContext, useEffect, useState } from "react";

interface NavContextProps {
  showSidebar: boolean,
  isClosing: boolean,
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  setClosing: React.Dispatch<React.SetStateAction<boolean>>,
  handleCloseSidebar: () => void,
  largeScreen: boolean,
  setLargeScreen: React.Dispatch<React.SetStateAction<boolean>>,
}

interface NavContextProviderProps {
  children: React.ReactNode
}

const NavContext = createContext<NavContextProps | null>(null)

export const NavContextProvider = ({ children }: NavContextProviderProps) => {
  const [showSidebar, setSidebar] = useState(false)
  const [isClosing, setClosing] = useState(false)
  const [largeScreen, setLargeScreen] = useState(false)

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1280) setLargeScreen(true)
      else setLargeScreen(false)
    }

    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [setLargeScreen])

  const handleCloseSidebar = () => {
    setClosing(true)
    setTimeout(() => {
      setSidebar(false)
      setClosing(false)
    }, 250)
  }

  const navContextValues = {
    showSidebar,
    setSidebar,
    isClosing,
    setClosing,
    handleCloseSidebar,
    largeScreen,
    setLargeScreen
  }

  return (
    <NavContext.Provider value={ navContextValues }>
      { children }
    </NavContext.Provider>
  )
}

export const useNavContext = () => {
  const context = useContext(NavContext)
  if (!context) {
    throw new Error('useNavContext must be used within a NavContextProvider')
  }

  return context
}