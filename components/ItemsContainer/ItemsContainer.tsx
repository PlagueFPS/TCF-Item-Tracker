"use client"
import styles from './ItemsContainer.module.css'
import { Item } from '@/interfaces/Item'
import { useState } from 'react'
import ItemCard from './ItemCard/ItemCard'
import ItemsSorter from './ItemsSorter/ItemsSorter'

interface Props {
  items: Item[]
}

export default function ItemsContainer({ items }: Props) {
  const [sortedItems, setItems] = useState(items)

  return (
    <>
      <ItemsSorter setItems={ setItems } />
      <div className={ styles.container }>
        { sortedItems.map(item => (
          <ItemCard key={ item.key } item={ item } items={ sortedItems } />
        ))}
      </div>
    </>
  )
}
