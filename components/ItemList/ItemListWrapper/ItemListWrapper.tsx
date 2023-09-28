"use client"
import styles from './ItemListWrapper.module.css'

interface Props {
  children: React.ReactNode
}

export default function ItemListWrapper({ children }: Props) {
  return (
    <section className={ styles.section }>
      { children }
    </section>
  )
}
