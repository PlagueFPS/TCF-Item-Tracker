"use client"
import ListSwitcher from "@/components/ItemList/ListSwitcher/ListSwitcher"
import { List } from "@/interfaces/List"
import { Material } from "@/interfaces/Material"
import { useState, createContext, useContext, useEffect } from 'react'
import ToastContextProvider from "./ToastContext"
import Settings from "@/components/Settings/Settings"
import { Item } from "@/interfaces/Item"

interface Props {
  children: React.ReactNode
}

interface ItemListContextProps {
  list: List
  listSize: number
  listClosing: boolean
  isNamesEnabled: boolean
  showList: boolean
  homeList: boolean
  listSwitcher: boolean
  settings: boolean
  setList: React.Dispatch<React.SetStateAction<List>>
  setListSize: React.Dispatch<React.SetStateAction<number>>
  setListClosing: React.Dispatch<React.SetStateAction<boolean>>
  setNamesEnabled: React.Dispatch<React.SetStateAction<boolean>>
  setShowList: React.Dispatch<React.SetStateAction<boolean>>
  setHomeList: React.Dispatch<React.SetStateAction<boolean>>
  setListSwitcher: React.Dispatch<React.SetStateAction<boolean>>
  setSettings: React.Dispatch<React.SetStateAction<boolean>>
  addItemToList: (item: Material | Item) => void
  updateItemInList: (item: Material | Item, updateAmount: number) => void
}

const itemsList: List = {
  id: 'itemslist',
  name: 'Items List',
  items: []
}

const ItemsListContext = createContext<ItemListContextProps | null>(null)

export default function ItemsListContextProvider({ children }: Props) {
  const [list, setList] = useState(itemsList)
  const [listSize, setListSize] = useState(30)
  const [isNamesEnabled, setNamesEnabled] = useState(true)
  const [showList, setShowList] = useState(false)
  const [homeList, setHomeList] = useState(true)
  const [listClosing, setListClosing] = useState(false)
  const [listSwitcher, setListSwitcher] = useState(false)
  const [settings, setSettings] = useState(false)
  
  useEffect(() => {
    const loadList = () => {
      if (!localStorage.getItem('itemslist')) {
        localStorage.setItem('itemslist', JSON.stringify(itemsList))
      }
      if (localStorage.getItem('list')) {
        const storedList = localStorage.getItem('list')
        storedList ? setList(JSON.parse(storedList)) : null
      }
      if (localStorage.getItem('listSize')) {
        const storedListSize = localStorage.getItem('listSize')
        storedListSize ? setListSize(JSON.parse(storedListSize)) : null
      }
      if (localStorage.getItem('namesEnabled')) {
        const storedValue = localStorage.getItem('namesEnabled')
        storedValue ? setNamesEnabled(JSON.parse(storedValue)) : null
      }
    }

    loadList()
  }, [])

  const addItemToList = (item: Material | Item) => {
    item.createdAt = Date.now()
    if (!item.amount) item.amount = 1
    localStorage.setItem(list.id, JSON.stringify({...list, items: [...list.items, item]}))
    localStorage.setItem('list', JSON.stringify({...list, items: [...list.items, item]}))
    setList(prevList => {
      const oldItems = prevList.items.filter(i => i.key !== item.key)
      return {...prevList, items: [...oldItems, item] }
    })
  }

  const updateItemInList = (item: Material | Item, updateAmount: number) => {
    setList(prevList => ({
      ...prevList,
      items: prevList.items.map(listItem => {
        if (listItem.key === item.key && listItem.amount) {
          return {...listItem, amount: listItem.amount + updateAmount}
        }
        else return listItem
      })
    }))
  }

  const toggleListSwitcher = () => {
    setListSwitcher(prevState => !prevState)
  }

  const itemsListContextValues: ItemListContextProps = {
    list,
    listSize,
    listClosing,
    isNamesEnabled,
    showList,
    homeList,
    listSwitcher,
    settings,
    setList,
    setListSize,
    setListClosing,
    setNamesEnabled,
    setShowList,
    setHomeList,
    setListSwitcher,
    setSettings,
    addItemToList,
    updateItemInList,
  }

  return (
    <ItemsListContext.Provider value={ itemsListContextValues }>
      <ToastContextProvider>
        { children }
        { listSwitcher && <ListSwitcher toggleOptionsModal={ toggleListSwitcher } /> }
        { settings && <Settings /> }
      </ToastContextProvider>
    </ItemsListContext.Provider>
  )
}

export const useItemsListContext = () => {
  const context = useContext(ItemsListContext)
  if (!context) {
    throw new Error('useItemsListContext must be used within a ItemsListContextProvider!')
  }

  return context
}
