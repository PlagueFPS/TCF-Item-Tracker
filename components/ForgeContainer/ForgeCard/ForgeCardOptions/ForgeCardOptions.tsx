import styles from './ForgeCardOptions.module.css'
import { ForgeRecipe } from '@/interfaces/ForgeRecipe'
import { Item } from '@/interfaces/Item'
import { UpgradeCost } from '@/interfaces/Upgrade'
import { Material } from '@/interfaces/Material'
import { useEffect, useState } from 'react'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { useToastContext } from '@/contexts/ToastContext'
import useCycleState from '@/hooks/useCycleState'
import useLargeScreen from '@/hooks/useLargeScreen'
import { getCosts, getItemImage } from '@/utils/GameUtils'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import Link from 'next/link'

interface Props {
  recipe: ForgeRecipe
  recipes: ForgeRecipe[]
  items: Item[]
  toggleOptionsModal: () => void
}

interface optionCost extends UpgradeCost {
  image?: string
}

export default function ForgeCardOptions({ recipe, recipes, items, toggleOptionsModal }: Props) {
  const [currentRecipe, setCurrentRecipe] = useState(recipe)
  const [currentCosts, setCurrentCosts] = useState<optionCost[]>([])
  const [currentImage, setCurrentImage] = useState('')
  const [closing, setClosing] = useState(false)
  const { cyclePrevState, cycleNextState } = useCycleState(recipes, currentRecipe, setCurrentRecipe)
  const { list, setList, addItemToList } = useItemsListContext()
  const { itemToast, itemsToast } = useToastContext()
  const { largeScreen } = useLargeScreen()

  useEffect(() => {
    const getCurrentImage = async () => {
      const image = await getItemImage(currentRecipe.inGameName)
      setCurrentImage(image)
    }

    const getCurrentCosts = async () => {
      const rawCosts = await getCosts(currentRecipe.items)
      const costs = await Promise.all(rawCosts.map(async (cost: optionCost) => {
        const itemImage = await getItemImage(cost.item)
        cost.image = itemImage
        return cost
      }))

      setCurrentCosts(costs)
    }

    getCurrentImage()
    getCurrentCosts()
  }, [currentRecipe])

  const handleAddButtonClick = () => {
    const toastItems: (Material | Item)[] = []

    currentCosts.forEach(cost => {
      const item = items.find(item => item.key === cost.item || item.inGameName === cost.item)
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

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ closing ? `${styles.content} ${styles.closing}` : styles.content }>
        <button className={ styles.prevBtn } onClick={ cyclePrevState }>
         { largeScreen ? <FaAngleLeft /> : <FaAngleUp /> }
        </button>
        <button className={ styles.nextBtn } onClick={ cycleNextState }>
          { largeScreen ? <FaAngleRight /> : <FaAngleDown /> }
        </button>
        <picture className={ styles.imageContainer }>
          <div className={ styles.imageFrame } />
          <source srcSet={ `${currentImage}.avif` } type='image/avif' />
          <source srcSet={ `${currentImage}.webp` } type='image/webp' />
          <source srcSet={ `${currentImage}.png` } type='image/png' />
          <img 
            src={ `${currentImage}.png` }
            alt={ currentRecipe.inGameName }
            title={ currentRecipe.inGameName }
            className={ styles.image }
          />
        </picture>
        <div className={ styles.titleContainer }>
          <h2 className={ styles.title }>{ currentRecipe.inGameName }</h2>
        </div>
        <div className={ styles.descriptionContainer }>
          <p className={ styles.description }>Compatable Items:</p>
        </div>
        <div className={ styles.itemsContainer }>
          { currentCosts.map((cost, index) => (
            <div key={ `${cost.item}_${index}` } className={ styles.cost }>
              <picture className={ styles.costImage_Container }>
                <source srcSet={ `${cost.image}.avif` } type='image/avif' />
                <source srcSet={ `${cost.image}.webp` } type='image/webp' />
                <source srcSet={ `${cost.image}.png` } type='image/png' />
                <img 
                  src={ `${cost.image}.png` } 
                  alt={ cost.item } 
                  className={ styles.costImage }
                  title={ cost.item }
                  />
              </picture>
              <p className={ styles.costAmount }>{ cost.amount }</p>
            </div>
          )) }
        </div>
        <div className={ styles.btnContainer }>
          <button className={ styles.yesBtn } onClick={ handleAddButtonClick }>
            <span className={ styles.yesText }>Add Items to List</span>
          </button>
          <button className={ styles.noBtn } onClick={ handleCloseButtonClick }>
            <span className={ styles.noText }>Close</span>
          </button>
        </div>
        <Link href={ `/forge/${currentRecipe.key}` } className={ styles.link }>
          <p className={ styles.linkText }>View Perk Details</p>
        </Link>
      </div>
    </div>
  )
}
