"use client"
import styles from './ItemsContainer.module.css'
import { Item } from '@/interfaces/Item'
import { useState } from 'react'
import { compareRarity } from '@/utils/GameUtils'
import ItemsCardWrapper from './ItemsCardWrapper/ItemsCardWrapper'
import ItemCard from './ItemCard/ItemCard'
import ItemsSorter from '../ItemsSorter/ItemsSorter'

interface Props {
  items: Item[]
}

export default function ItemsContainer({ items }: Props) {
  const [sortedItems, setItems] = useState(items.sort(compareRarity))

  return (
    <>
      <ItemsSorter setItems={ setItems } />
      <div className={ styles.container }>
        { sortedItems.map(item => (
          <ItemsCardWrapper key={ item.key } item={ item } items={ items }>
            <ItemCard item={ item } />
          </ItemsCardWrapper>
        ))}
      </div>
    </>
  )
}
