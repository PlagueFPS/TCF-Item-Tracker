"use client"
import styles from './ItemListWrapper.module.css'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode
}

export default function ItemListWrapper({ children }: Props) {
  const { listSize, showList, homeList, listClosing } = useItemsListContext()
  const pathname = usePathname()
  const home = pathname === '/'

  const classSelector = () => {
    if (home) {
      return listClosing ? `${styles.section} ${styles.closing} ${styles.home}` 
        : `${styles.section} ${styles.home}`
    }
    else {
      return listClosing ? `${styles.section} ${styles.closing}` : styles.section
    }
  }

  return (
    <>
      { (home && homeList || !home && showList) &&  
        <section className={ classSelector() } style={{ flexBasis: `${listSize}%` }}>
          { children }
        </section>
      }
    </>
  )
}
