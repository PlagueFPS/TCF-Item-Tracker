"use client"
import styles from './ItemListWrapper.module.css'
import { useItemsListContext } from '@/contexts/ItemsListContext'

interface Props {
  children: React.ReactNode
}

export default function ItemListWrapper({ children }: Props) {
  const { listSize } = useItemsListContext()

  return (
    <section className={ styles.section } style={{flexBasis: `${listSize}%`}}>
      { children }
    </section>
  )
}
