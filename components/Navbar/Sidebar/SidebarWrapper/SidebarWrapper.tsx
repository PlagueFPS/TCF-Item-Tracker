"use client"
import styles from './SidebarWrapper.module.css'
import { useNavContext } from '@/contexts/NavContext'

interface Props {
  children: React.ReactNode
}

export default function SidebarWrapper({ children }: Props) {
  const { showSidebar, isClosing } = useNavContext()

  return (
    <>
      { showSidebar && 
        <nav className={ isClosing ? `${styles.sidebar} ${styles.closing}` : styles.sidebar }>
          { children }
        </nav>
      }
    </>
  )
}
