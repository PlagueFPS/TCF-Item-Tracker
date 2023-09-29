"use client"
import ListSwitcher from "@/components/ItemList/ListSwitcher/ListSwitcher"
import { List } from "@/interfaces/List"
import { Material } from "@/interfaces/Material"
import { useState, createContext, useContext, useEffect } from 'react'
import ToastContextProvider from "./ToastContext"

interface Props {
  children: React.ReactNode
}

interface ItemListContextProps {
  list: List
  amount: number
  listSize: number
  isNamesEnabled: boolean
  showList: boolean
  listSwitcher: boolean
  settings: boolean
  setList: React.Dispatch<React.SetStateAction<List>>
  setAmount: React.Dispatch<React.SetStateAction<number>>
  setListSize: React.Dispatch<React.SetStateAction<number>>
  setNamesEnabled: React.Dispatch<React.SetStateAction<boolean>>
  setShowList: React.Dispatch<React.SetStateAction<boolean>>
  setListSwitcher: React.Dispatch<React.SetStateAction<boolean>>
  setSettings: React.Dispatch<React.SetStateAction<boolean>>
  addItemToList: (item: Material) => void
  triggerList: () => void
}

const itemsList: List = {
  id: 'itemslist',
  name: 'Items List',
  items: []
}

const ItemsListContext = createContext<ItemListContextProps | null>(null)

export default function ItemsListContextProvider({ children }: Props) {
  const [list, setList] = useState(itemsList)
  const [amount, setAmount] = useState(1)
  const [listSize, setListSize] = useState(30)
  const [isNamesEnabled, setNamesEnabled] = useState(true)
  const [showList, setShowList] = useState(false)
  const [listSwitcher, setListSwitcher] = useState(false)
  const [settings, setSettings] = useState(false)

  useEffect(() => {
    const loadList = () => {
      if (!localStorage.getItem('itemslist')) {
        localStorage.setItem('itemslist', JSON.stringify(itemsList))
      }
      if (localStorage.getItem('list')) {
        setList(JSON.parse(localStorage.getItem('list')!))
      }
      if (localStorage.getItem('listSize')) {
        setListSize(JSON.parse(localStorage.getItem('listSize')!))
      }
    }

    loadList()
  }, [])

  const addItemToList = (item: Material) => {
    item.createdAt = Date.now()
    item.amount = 1
    localStorage.setItem(list.id, JSON.stringify({...list, items: [...list.items, item]}))
    setList(prevList => {
      const oldItems = prevList.items.filter(i => i.key !== item.key)
      return {...prevList, items: [...oldItems, item] }
    })
  }

  const triggerList = () => {
    setShowList(prevState => !prevState)
  }

  const toggleListSwitcher = () => {
    setListSwitcher(prevState => !prevState)
  }

  const itemsListContextValues: ItemListContextProps = {
    list,
    amount,
    listSize,
    isNamesEnabled,
    showList,
    listSwitcher,
    settings,
    setList,
    setAmount,
    setListSize,
    setNamesEnabled,
    setShowList,
    setListSwitcher,
    setSettings,
    addItemToList,
    triggerList,
  }

  return (
    <ItemsListContext.Provider value={ itemsListContextValues }>
      <ToastContextProvider>
        { children }
        { listSwitcher && <ListSwitcher toggleOptionsModal={ toggleListSwitcher } /> }
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
