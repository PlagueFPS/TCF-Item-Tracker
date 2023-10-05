import styles from './QuestCardOptions.module.css'
import { Quest } from "@/interfaces/Quest"
import { Item } from "@/interfaces/Item"
import { Material } from '@/interfaces/Material'
import useLargeScreen from "@/hooks/useLargeScreen"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from "@/contexts/ToastContext"
import { useEffect, useState } from 'react'
import { getItemImage, getTaskItems } from "@/utils/GameUtils"
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import Link from 'next/link'
import { questHrefSelector } from '@/functions/GlobalFunctions'

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
  const { list, setList, addItemToList } = useItemsListContext()
  const { itemToast, itemsToast } = useToastContext()
  const [currentQuest, setCurrentQuest] = useState(quest)
  const [currentTaskItems, setCurrentTaskItems] = useState<optionItem[]>(taskItems)
  const [closing, setClosing] = useState(false)
  const faction = currentQuest.faction.toLowerCase()

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

  const cyclePrevQuest = () => {
    const questIndex = quests.findIndex(quest => quest.key === currentQuest.key)
    const newIndex = questIndex - 1

    if (newIndex < 0) setCurrentQuest(quests[quests.length - 1])
    else return setCurrentQuest(quests[newIndex])
  }

  const cycleNextQuest = () => {
    const questIndex = quests.findIndex(quest => quest.key === currentQuest.key)
    const newIndex = questIndex + 1

    if (newIndex < quests.length) setCurrentQuest(quests[newIndex])
    else return setCurrentQuest(quests[0])
  }

  const handleAddButtonClick = () => {
    const toastItems: (Material | Item)[] = []

    currentTaskItems.forEach(item => {
      const itemInList = list.items.find(i => i.key === item.key)
      if (itemInList && itemInList.amount && item.amount) {
        // keep location of updated item
        const index = list.items.indexOf(itemInList)
        const newItems = list.items.filter(i => i.key !== itemInList.key)
        const newItem = {...itemInList, amount: itemInList.amount += item.amount }
        newItems.splice(index, 0, newItem)
        setList({
          ...list,
          items: [...newItems]
        })
      }
      else if (!itemInList) {
        addItemToList(item)
      }

      toastItems.push(item)
    })

    if (toastItems.length > 1) itemsToast(toastItems)
    else itemToast(toastItems[0])
  }

  const handleCloseButtonClick = () => {
    setClosing(true)
    setTimeout(toggleOptionsModal, 250)
  }

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

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ classSelector() }>
        <button className={ styles.prevBtn } onClick={ cyclePrevQuest }>
          { largeScreen ? <FaAngleLeft /> : <FaAngleDown /> }
        </button>
        <button className={ styles.nextBtn } onClick={ cycleNextQuest }>
          { largeScreen ? <FaAngleRight /> : <FaAngleUp /> }
        </button>
        <div className={ styles.partContainer } title={ `Part: ${currentQuest.chainPart}` }>
          <span className={ styles.part }>{ currentQuest.chainPart }</span>
        </div>
        <picture className={ styles.factionContainer } title={ `Faction: ${currentQuest.faction}` }>
          <source srcSet={ `/images/${faction}reputation.avif` } type='image/avif' />
          <source srcSet={ `/images/${faction}reputation.webp` } type='image/webp' />
          <source srcSet={ `/images/${faction}reputation.png` } type='image/png' />
          <img 
            src={ `/images/${faction}reputation.png` } 
            alt={ currentQuest.faction } 
            className={ styles.faction }
          />
        </picture>
        <div className={ styles.titleContainer }>
          <h3 className={ styles.title }>{ currentQuest.inGameName }</h3>
        </div>
        <div className={ styles.descriptionContainer }>
          <p className={ styles.description }>
            { currentTaskItems.length > 0 ? "Items To Deliver/Stash:" : "No Items To Deliver/Stash" }
          </p>
        </div>
        <div className={ styles.taskItems_Container }>
          { currentTaskItems.map((item, index) => (
            <div key={ `${item.key}_${index}` } className={ styles.taskItem }>
              <picture className={ styles.taskItemImage_Container }>
                <source srcSet={ `${item.image}.avif` } type='image/avif' />
                <source srcSet={ `${item.image}.webp` } type='image/webp' />
                <source srcSet={ `${item.image}.png` } type='image/png' />
                <img 
                  src={ `${item.image}.png` } 
                  alt={ item.inGameName } 
                  className={ `${ styles.taskItemImage } ${ item.inGameName.toLowerCase().replace(/\s/g, '') }` }
                  title={ item.inGameName }
                  />
              </picture>
              <p className={ styles.taskItemAmount }>{ item.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </div>
          ))}
        </div>
        <div className={ styles.btnContainer }>
            { currentTaskItems.length > 0 && 
              <button className={ styles.yesBtn } onClick={ handleAddButtonClick }>
                <p className={ styles.yesBtnText }>Add Items to List</p>
              </button>
            }
            <button className={ styles.noBtn } onClick={ handleCloseButtonClick }>
              <p className={ styles.noBtnText }>Close</p>
            </button>
        </div>
        <Link href={ questHrefSelector(currentQuest) } className={ styles.link }>
          <p className={ styles.linkText }>View Quest Details</p>
        </Link>
      </div>
    </div>
  )
}
