"use client"
import { Material } from "@/interfaces/Material"
import { createContext, useState, useEffect, useContext } from 'react'
import { useItemsListContext } from "./ItemsListContext"

interface ToastContextProps {
  showToast: boolean
  toastAction: string
  toastItems: Material[]
  setToast: React.Dispatch<React.SetStateAction<boolean>>
  setAction: React.Dispatch<React.SetStateAction<string>>
  setItems: React.Dispatch<React.SetStateAction<Material[]>>
  itemToast: (item: Material, action?: string) => void
  itemsToast: (items: Material[], action?: string) => void
  toast: (action?: string) => void
}

interface Props {
  children: React.ReactNode
}

const ToastContext = createContext<ToastContextProps | null>(null)

export default function ToastContextProvider({ children }: Props) {
  const { list } = useItemsListContext()
  const [showToast, setToast] = useState(false)
  const [toastAction, setAction] = useState('')
  const [toastItems, setItems] = useState<Material[]>([])

  useEffect(() => {
    const removeToast = () => {
      if (showToast) {
        setToast(false)
        setAction('')
        setItems([])
      }
    }

    const timeout = setTimeout(removeToast, 3000)
    return () => clearTimeout(timeout)
  }, [showToast])

  const itemToast = (item: Material, action?: string) => {
    setToast(true)
    setItems([item])
    if (action) setAction(action)
    else setAction(`Item Added To ${list.name}`)
  }

  const itemsToast = (items: Material[], action?: string) => {
    setToast(true)
    setItems(items)
    if (action) setAction(action)
    else setAction(`Items Added To ${list.name}`)
  }

  const toast = (action?: string) => {
    setToast(true)
    if (action) setAction(action)
    else setAction(`Items Cleared From ${list.name}`)
    setItems([])
  }

  const ToastContextValues: ToastContextProps = {
    showToast,
    toastAction,
    toastItems,
    setToast,
    setAction,
    setItems,
    itemToast,
    itemsToast,
    toast
  }

  return (
    <ToastContext.Provider value={ ToastContextValues }>
      { children }
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastContextProvider')
  }

  return context
}
