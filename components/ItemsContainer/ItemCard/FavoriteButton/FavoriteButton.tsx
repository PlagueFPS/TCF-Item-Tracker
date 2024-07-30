"use client"
import { Item } from "@/interfaces/Item"
import { Material } from "@/interfaces/Material"
import { type MouseEvent, useEffect, useState } from "react"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from "@/contexts/ToastContext"
import { List } from "@/interfaces/List"
import { BsStar, BsStarFill } from "react-icons/bs"

interface Props {
  item: (Material | Item)
  className: string
}

export default function FavoriteButton({ item, className }: Props) {
  const [isFavorited, setFavorited] = useState(false)
  const { list, setList } = useItemsListContext()
  const { itemToast } = useToastContext()

  useEffect(() => {
    const storedFavoriteList = localStorage.getItem('favoriteslist')
    if (list.id === 'favoriteslist') {
      const itemInList = list.items.find(i => i.key === item.key)
      if (itemInList) return setFavorited(true)
      else return setFavorited(false)
    }
    else if (storedFavoriteList) {
      const favoriteList: List = JSON.parse(storedFavoriteList)
      const itemInList = favoriteList.items.find(i => i.key === item.key)
      if (itemInList) return setFavorited(true)
      else return setFavorited(false)
    }
  }, [list, item])

  const handleFavorited = (e: MouseEvent<SVGElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    const storedFavoriteList = localStorage.getItem('favoriteslist')
    if (storedFavoriteList) {
      const favoritesList: List = JSON.parse(storedFavoriteList)
      const itemInList = favoritesList.items.find(i => i.key === item.key)
      if (itemInList) { 
        // remove item from favoriteslist & unfavorite
        setFavorited(false)
        const filteredListItems = favoritesList.items.filter(i => i.key !== item.key)
        const newFavoritesList: List =  {...favoritesList, items: [...filteredListItems]}
        localStorage.setItem('favoriteslist', JSON.stringify(newFavoritesList))
        if (list.id === 'favoriteslist') {
          setList({...newFavoritesList})
          localStorage.setItem('list', JSON.stringify(newFavoritesList))
        }
        itemToast(item, 'Removed From Favorites List')
      }
      else if (!itemInList) {
        // add item to favoriteslist & favorite
        setFavorited(true)
        const newFavoritesList = {...favoritesList, items: [...favoritesList.items, item]}
        localStorage.setItem('favoriteslist', JSON.stringify(newFavoritesList))
        if (list.id === 'favoriteslist') {
          setList({...newFavoritesList})
          localStorage.setItem('list', JSON.stringify(newFavoritesList))
        }
        itemToast(item, 'Added To Favorites List')
      }
    }
    else if (!storedFavoriteList) {
      // create favoritelist, add item to it, store favoritelist
      const favoritesList: List = {
        id: 'favoriteslist',
        name: 'Favorites List',
        items: [item]
      }
      setFavorited(true)
      localStorage.setItem('favoriteslist', JSON.stringify(favoritesList))
      itemToast(item, 'Added To Favorites List')
    }
  }

  return (
    <>
      { isFavorited 
        ? <BsStarFill size={ 18 } title='Unfavorite Item' className={ className } onClick={ (e) => handleFavorited(e) } /> 
        : <BsStar size={ 18 } title='Favorite Item' className={ className } onClick={ (e) => handleFavorited(e) } /> 
      }
    </>
  )
}
