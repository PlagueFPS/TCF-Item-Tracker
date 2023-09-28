"use client"
import styles from './ListFilter.module.css'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { compareCreatedAt, compareName, compareRarity } from '@/utils/GameUtils'

export default function ListFilter() {
  const { list, setList } = useItemsListContext()

  const handleListFilter = (filter: "Normal" | "Rarity" | "A-Z") => {
    switch(filter) {
      case 'Normal': {
        const sortedItems = list.items.sort(compareCreatedAt)
        setList(prevList => ({
          ...prevList,
          items: sortedItems
        }))
        break
      }
      case 'Rarity': {
        const sortedItems = list.items.sort(compareRarity)
        setList(prevList => ({
          ...prevList,
          items: sortedItems
        }))
        break
      }
      case 'A-Z': {
        const sortedItems = list.items.sort(compareName)
        setList(prevList => ({
          ...prevList,
          items: sortedItems
        }))
      }
    }
  } 

  return (
    <div className={ styles.listBtnFilter_Container }>
      <button className={ styles.listBtnFilter } onClick={ () => handleListFilter('Normal') }>Normal</button>
      <button className={ styles.listBtnFilter } onClick={ () => handleListFilter('Rarity') }>Rarity</button>
      <button className={ styles.listBtnFilter } onClick={ () => handleListFilter('A-Z') }>A-Z</button>
    </div>
  )
}
