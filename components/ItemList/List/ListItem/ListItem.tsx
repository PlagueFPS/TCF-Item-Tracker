import styles from './ListItem.module.css'
import { Material } from "@/interfaces/Material"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from '@/contexts/ToastContext'
import { useEffect } from 'react'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp, FaTrash } from 'react-icons/fa6'
import AmountContainer from './AmountContainer/AmountContainer'
import ItemImage from '@/components/ImageContainer/ItemImage/ItemImage'

interface Props {
  item: Material
}

export default function ListItem({ item }: Props) {
  const { list, setList, isNamesEnabled } = useItemsListContext()
  const { itemToast } = useToastContext()

  useEffect(() => {
    localStorage.setItem('namesEnabled', JSON.stringify(isNamesEnabled))
  }, [isNamesEnabled])

  const deleteItem = () => {
    itemToast(item, 'Item Removed')
    const newItems = list.items.filter(i => i.key !== item.key)
    localStorage.setItem('list', JSON.stringify({...list, items: newItems}))
    localStorage.setItem(list.id, JSON.stringify({...list, items: newItems}))
    setList({...list, items: newItems })
  }

  const handleMoveUpClick = () => {
    const currentItems = list.items
    const index = currentItems.indexOf(item)
    const removedItem = currentItems.splice(index, 1)[0]
    const newIndex = index - 1

    if (newIndex < 0) currentItems.splice(currentItems.length, 0, removedItem)
    else currentItems.splice(newIndex, 0, removedItem)

    setList(prevList => ({
      ...prevList,
      items: currentItems
    }))
  }

  const handleMoveDownClick = () => {
    const currentItems = list.items
    const index = currentItems.indexOf(item)
    const removedItem = currentItems.splice(index, 1)[0]
    const newIndex = index + 1

    if (newIndex <= currentItems.length) currentItems.splice(newIndex, 0, removedItem)
    else currentItems.splice(0, 0, removedItem)

    setList(prevList => ({
      ...prevList,
      items: currentItems
    }))
  }

  const classSelector = () => {
    switch(item.rarity) {
      case 'Common':
        return list.id === 'favoriteslist' ? `${styles.listItem} ${styles.common} ${styles.favoritesListItem}`
          : `${styles.listItem} ${styles.common}`
      case 'Uncommon':
        return list.id === 'favoriteslist' ? `${styles.listItem} ${styles.uncommon} ${styles.favoritesListItem}`
          : `${styles.listItem} ${styles.uncommon}`
      case 'Rare':
        return list.id === 'favoriteslist' ? `${styles.listItem} ${styles.rare} ${styles.favoritesListItem}`
          : `${styles.listItem} ${styles.rare}`
      case 'Epic':
        return list.id === 'favoriteslist' ? `${styles.listItem} ${styles.epic} ${styles.favoritesListItem}`
          : `${styles.listItem} ${styles.epic}`
      case 'Legendary':
        return list.id === 'favoriteslist' ? `${styles.listItem} ${styles.legendary} ${styles.favoritesListItem}`
          : `${styles.listItem} ${styles.legendary}`
      case 'Exotic':
        return list.id === 'favoriteslist' ? `${styles.listItem} ${styles.exotic} ${styles.favoritesListItem}`
          : `${styles.listItem} ${styles.exotic}`
    }
  }

  return (
    <li className={ classSelector() }>
      { list.id === 'favoriteslist' ? (
        <>
          <button className={ styles.moveLeftButton } onClick={ handleMoveUpClick }>
            <FaAngleLeft />
          </button>
          <button className={ styles.moveRightButton } onClick={ handleMoveDownClick }>
            <FaAngleRight />
          </button>
        </>
      ) : (
        <>
          <button className={ styles.moveUpButton } onClick={ handleMoveUpClick }>
            <FaAngleUp />
          </button>
          <button className={ styles.moveDownButton } onClick={ handleMoveDownClick }>
            <FaAngleDown />
          </button>
          <AmountContainer item={ item } />
        </>
      )}
      <ItemImage item={ item } className={ styles.image } />
      { isNamesEnabled && <p className={ styles.title }>{ item.inGameName }</p> }
      <div className={ styles.btnContainer }>
        <button className={ styles.deleteBtn } onClick={ deleteItem }>
          <FaTrash />
        </button>
      </div>
    </li>
  )
}
