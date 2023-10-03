"use client"
import styles from '../ItemCard/ItemCard.module.css'
import { Item } from "@/interfaces/Item"
import { useState } from 'react'
import ItemCardOptions from '../ItemCard/ItemCardOptions/ItemCardOptions'

interface Props {
  children: React.ReactNode
  item: Item
  items: Item[]
}

export default function ItemsCardWrapper({ children, item, items }: Props) {
  const [showOptions, setOptions] = useState(false)

  const classSelector = () => {
    switch(item.rarity) {
      case 'Common':
        return `${styles.container} ${styles.commonContainer}`
      case 'Uncommon':
        return `${styles.container} ${styles.uncommonContainer}`
      case 'Rare':
        return `${styles.container} ${styles.rareContainer}`
      case 'Epic':
        return `${styles.container} ${styles.epicContainer}`
      case 'Exotic':
        return `${styles.container} ${styles.exoticContainer}`
      case 'Legendary':
        return `${styles.container} ${styles.legendaryContainer}`
    }
  }

  const toggleOptionsModal = () => {
    setOptions(options => !options)
  }

  return (
    <>
      { showOptions && <ItemCardOptions item={ item } items={ items } toggleOptionsModal={ toggleOptionsModal } /> }
      <div className={ classSelector() } onClick={ toggleOptionsModal }>
        { children }
      </div>
    </>
  )
}
