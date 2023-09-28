"use client"
import styles from './NavbarWrapper.module.css'
import { useNavContext } from "@/contexts/NavContext"

interface Props {
  children: React.ReactNode
}

export default function NavbarWrapper({ children }: Props) {
  const { showSidebar, isClosing, handleCloseSidebar } = useNavContext()

  return (
    <>
      { showSidebar && 
        <div 
          className={ isClosing ? `${styles.background} ${styles.closing}` : styles.background } 
          onClick={ handleCloseSidebar }
        />
      }
      { children }
    </>
  )
}
