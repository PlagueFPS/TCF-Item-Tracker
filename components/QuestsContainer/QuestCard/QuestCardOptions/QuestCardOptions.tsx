import styles from './QuestCardOptions.module.css'
import { Quest } from "@/interfaces/Quest"
import { Item } from "@/interfaces/Item"
import { Material } from '@/interfaces/Material'
import useLargeScreen from "@/hooks/useLargeScreen"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from "@/contexts/ToastContext"
import { useEffect, useState } from 'react'
import { getItemImage, getTaskItems } from "@/utils/GameUtils"

interface Props {
  quest: Quest
  quests: Quest[]
  taskItems: Item[]
  toggleOptionsModal: () => void
}

interface optionItem extends Item {
  image?: string
}

export default function QuestCardOptions({ quest, quests, taskItems, toggleOptionsModal }: Props) {
  const { largeScreen } = useLargeScreen()
  const { list, setList } = useItemsListContext()
  const { itemToast, itemsToast } = useToastContext()
  const [currentQuest, setCurrentQuest] = useState(quest)
  const [currentTaskItems, setCurrentTaskItems] = useState<optionItem[]>(taskItems)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const getCurrentTaskItems = async () => {
      const rawTaskItems = await getTaskItems(currentQuest.objectives)
      const taskItems = await Promise.all(rawTaskItems.map(async (item: optionItem) => {
        const itemImage = await getItemImage(item.inGameName)
        return {...item, image: itemImage }
      }))

      setCurrentTaskItems(taskItems)
    }

    getCurrentTaskItems()
  }, [currentQuest])

  const classSelector = () => {
    switch(quest.faction) {
      case 'Badum':
        return closing ? `${styles.content} ${styles.closing} ${styles.badum}` : `${styles.content} ${styles.badum}`
      case 'ICA':
        return closing ? `${styles.content} ${styles.closing} ${styles.ica}` : `${styles.content} ${styles.ica}`
      case 'Korolev':
        return closing ? `${styles.content} ${styles.closing} ${styles.korolev}` : `${styles.content} ${styles.korolev}`
      case 'Osiris':
        return closing ? `${styles.content} ${styles.closing} ${styles.osiris}` : `${styles.content} ${styles.osiris}`
    }
  }

  const handleAddButtonClick = () => {
    const newListItems: (Material | Item)[] = []

    currentTaskItems.forEach(item => {
      const itemInList = list.items.find(i => i.key === item.key)
      if (itemInList && itemInList.amount && item.amount) {
        // keep location of updated item
        const index = list.items.indexOf(itemInList)
        const newItems = list.items.filter(i => i.key !== itemInList.key)
        const newItem = {...itemInList, amount: itemInList.amount += item.amount }
        newItems.splice(index, 0, newItem)
      }
    })
  }

  return (
    <div>QuestCardOptions</div>
  )
}
