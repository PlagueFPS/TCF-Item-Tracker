"use client"
import { createContext, useContext, useState } from "react";
import useLargeScreen from "@/hooks/useLargeScreen";

interface NavContextProps {
  showSidebar: boolean,
  isClosing: boolean,
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>,
  setClosing: React.Dispatch<React.SetStateAction<boolean>>,
  handleCloseSidebar: () => void,
  largeScreen: boolean,
}

interface NavContextProviderProps {
  children: React.ReactNode
}

const NavContext = createContext<NavContextProps | null>(null)

export const NavContextProvider = ({ children }: NavContextProviderProps) => {
  const { largeScreen } = useLargeScreen()
  const [showSidebar, setSidebar] = useState(false)
  const [isClosing, setClosing] = useState(false)
  

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