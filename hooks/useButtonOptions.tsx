import { useState } from "react";
import { useItemsListContext } from "@/contexts/ItemsListContext";
import { useToastContext } from "@/contexts/ToastContext";
import { Material } from "@/interfaces/Material";
import { Item } from "@/interfaces/Item";
import { OptionCost, OptionCraftCost, OptionItem } from "@/interfaces/Options";

type Option = OptionItem | OptionCost | OptionCraftCost

export default function useButtonOptions<T extends Option>(dataToAdd: T[], toggleOptionsModal: () => void, items?: Item[]) {
  const [closing, setClosing] = useState(false)
  const { list, addItemToList, updateItemInList } = useItemsListContext()
  const { itemToast, itemsToast } = useToastContext()

  const handleAddButtonClick = () => {
    const toastItems: (Material | Item)[] = []

    dataToAdd.forEach(data => {
      if (items) {
        const item = items.find(item =>{
          if ('inGameName' in data && (item.key === data.inGameName || item.inGameName === data.inGameName)) return item
          else if ('item' in data && (item.key === data.item || item.inGameName === data.item)) return item
        })
        const itemInList = list.items.find(i => i.key === item?.key)
        if (itemInList && item && data.amount) {
          updateItemInList(item, data.amount)
          toastItems.push(item)
        }
        else if (!itemInList && item) {
          item.amount = data.amount
          addItemToList(item)
          toastItems.push(item)
        }
      }
      else if ('key' in data) {
        const itemInList = list.items.find(item => item.key === data.key)
        if (itemInList && data.amount) updateItemInList(data, data.amount)
        else if (!itemInList) addItemToList(data)
        toastItems.push(data)
      }
    })

    if (toastItems.length > 1) itemsToast(toastItems)
    else if (toastItems.length === 1) itemToast(toastItems[0])
    setClosing(true)
    setTimeout(toggleOptionsModal, 250)
  }

  const handleCloseButtonClick = () => {
    setClosing(true)
    setTimeout(toggleOptionsModal, 250)
  }

  return { closing, handleAddButtonClick, handleCloseButtonClick }
}
