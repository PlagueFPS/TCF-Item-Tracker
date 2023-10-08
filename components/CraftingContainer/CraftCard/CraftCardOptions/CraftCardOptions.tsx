import styles from './CraftCardOptions.module.css'
import { Craft, CraftItem } from "@/interfaces/Craft"
import { Item } from "@/interfaces/Item"
import { useEffect, useState } from "react"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from "@/contexts/ToastContext"
import useCycleState from "@/hooks/useCycleState"
import useLargeScreen from "@/hooks/useLargeScreen"
import { getCraftCosts, getItemImage } from "@/utils/GameUtils"
import { Material } from '@/interfaces/Material'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import Link from 'next/link'

interface Props {
  craft: Craft
  crafts: Craft[]
  items: Item[]
  toggleOptionsModal: () => void
}

interface optionCost extends CraftItem {
  image?: string
}

export default function CraftCardOptions({ craft, crafts, items, toggleOptionsModal }: Props) {
  const [currentCraft, setCurrentCraft] = useState(craft)
  const [currentImage, setCurrentImage] = useState('')
  const [currentCosts, setCurrentCosts] = useState<optionCost[]>([])
  const [closing, setClosing] = useState(false)
  const { cyclePrevState, cycleNextState } = useCycleState(crafts, currentCraft, setCurrentCraft)
  const { list, setList, addItemToList } = useItemsListContext()
  const { itemToast, itemsToast } = useToastContext()
  const { largeScreen } = useLargeScreen()

  useEffect(() => {
    const getCurrentImage = async () => {
      const image = await getItemImage(currentCraft.inGameName)
      setCurrentImage(image)
    }

    const getCurrentCosts = async () => {
      const rawCosts = await getCraftCosts(currentCraft.items)
      const costs = await Promise.all(rawCosts.map(async (cost: optionCost) => {
        const itemImage = await getItemImage(cost.inGameName)
        cost.image = itemImage
        return cost
      }))

      setCurrentCosts(costs)
    }

    getCurrentImage()
    getCurrentCosts()
  }, [currentCraft])

  const handleAddButtonClick = () => {
    const toastItems: (Material | Item)[] = []

    currentCosts.forEach(cost => {
      const item = items.find(item => item.key === cost.inGameName || item.inGameName === cost.inGameName)
      const itemInList = list.items.find(i => i.key === item?.key)

      if (itemInList && itemInList.amount && item) {
        // keep location of updated item
        const index = list.items.indexOf(itemInList)
        const newItems = list.items.filter(i => i.key !== itemInList.key)
        const newItem = {...itemInList, amount: itemInList.amount += cost.amount}
        newItems.splice(index, 0, newItem)
        toastItems.push(item)
        setList(prevList => ({
          ...prevList,
          items: [...newItems]
        }))
      }
      else if (!itemInList && item) {
        item.amount = cost.amount
        addItemToList(item)
        toastItems.push(item)
      }
    })

    if (toastItems.length > 1) itemsToast(toastItems)
    else itemToast(toastItems[0])
    setClosing(true)
    setTimeout(toggleOptionsModal, 250)
  }

  const handleCloseButtonClick = () => {
    setClosing(true)
    setTimeout(toggleOptionsModal, 250)
  }

  const classSelector = () => {
    switch(currentCraft.rarity) {
      default: 
        return closing ? `${styles.content} ${styles.closing}` : styles.content
      case 'Uncommon':
        return closing ? `${styles.content} ${styles.uncommon} ${styles.closing}` : `${styles.content} ${styles.uncommon}`
      case 'Rare': 
        return closing ? `${styles.content} ${styles.rare} ${styles.closing}` : `${styles.content} ${styles.rare}`
      case 'Epic':
        return closing ? `${styles.content} ${styles.epic} ${styles.closing}` : `${styles.content} ${styles.epic}`
      case 'Exotic':
        return closing ? `${styles.content} ${styles.exotic} ${styles.closing}` : `${styles.content} ${styles.exotic}`
      case 'Legendary':
        return closing ? `${styles.content} ${styles.legendary} ${styles.closing}` : `${styles.content} ${styles.legendary}`
    }
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ classSelector() }>
        <button className={ styles.prevBtn } onClick={ cyclePrevState }>
          { largeScreen ? <FaAngleLeft /> : <FaAngleUp /> }
        </button>
        <button className={ styles.nextBtn } onClick={ cycleNextState }>
          { largeScreen ? <FaAngleRight /> : <FaAngleDown /> }
        </button>
        <picture className={ styles.craftImage_Container }>
          <div className={ styles.imageFrame } />
          <source srcSet={ `${currentImage}.avif` } type='image/avif' />
          <source srcSet={ `${currentImage}.webp` } type='image/webp' />
          <source srcSet={ `${currentImage}.png` } type='image/png' />
          <img 
            src={ `${currentImage}.png` }
            alt={ currentCraft.inGameName } 
            title={ currentCraft.inGameName }
            className={ styles.image }
          />
        </picture>
        <div className={ styles.titleContainer }>
          <h2 className={ styles.title }>{ currentCraft.inGameName }</h2>
        </div>
        <div className={ styles.descriptionContainer }>
          <p className={ styles.description }>{ "Item(s) Needed for Craft:" }</p>
        </div>
        <div className={ styles.itemsContainer }>
          { currentCosts.map((cost, index) => {
            if (cost.inGameName !== 'Kmarks') {
              return (
              <div key={ `${cost.inGameName}_${index}` } className={ styles.cost }>
                <picture className={ styles.costImage_Container }>
                <source srcSet={ `${cost.image}.avif` } type='image/avif' />
                <source srcSet={ `${cost.image}.webp` } type='image/webp' />
                <source srcSet={ `${cost.image}.png` } type='image/png' />
                <img 
                  src={ `${cost.image}.png` } 
                  alt={ cost.inGameName } 
                  className={ styles.costImage }
                  title={ cost.inGameName }
                  />
                </picture>
                <p className={ styles.costAmount }>{ cost.amount }</p>
              </div>
              )
            }
          })}
        </div>
        <div className={ styles.btnContainer }>
          <button className={ styles.yesBtn } onClick={ handleAddButtonClick }>
            <span className={ styles.yesText }>Add Items to List</span>
          </button>
          <button className={ styles.noBtn } onClick={ handleCloseButtonClick }>
            <span className={ styles.noText }>Close</span>
          </button>
        </div>
        <Link href={ `/crafting/${craft.key}` } className={ styles.link }>
          <p className={ styles.linkText }>View Craft Details</p>
        </Link>
      </div>
    </div>
  )
}
