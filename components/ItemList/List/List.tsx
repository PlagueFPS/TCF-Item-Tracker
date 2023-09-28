"use client"
import styles from './List.module.css'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import ListItem from './ListItem/ListItem'

export default function List() {
  const { list } = useItemsListContext()

  const classSelector = () => {
    switch(list.id) {
      default:
        return styles.itemsList
      case 'favoriteslist':
        return `${styles.itemsList} ${styles.favoritesList}`
    }
  }

  return (
    <ul className={ classSelector() }>
      { list.items.map(item => <ListItem key={ item.key } item={ item } /> )}
    </ul>
  )
}
