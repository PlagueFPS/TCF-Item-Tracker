import styles from './ForgeCardOptions.module.css'
import { ForgeRecipe } from '@/interfaces/ForgeRecipe'
import { Item } from '@/interfaces/Item'
import { UpgradeCost } from '@/interfaces/Upgrade'
import { useEffect, useState } from 'react'
import useButtonOptions from '@/hooks/useButtonOptions'
import useCycleState from '@/hooks/useCycleState'
import useLargeScreen from '@/hooks/useLargeScreen'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import CopyButton from '@/components/CopyButton/CopyButton'
import Link from 'next/link'
import { fetchCurrentCosts, fetchCurrentImage } from '@/utils/actions'

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
  const { closing, handleAddButtonClick, handleCloseButtonClick } = useButtonOptions(currentCosts, toggleOptionsModal, items)
  const { cyclePrevState, cycleNextState } = useCycleState(recipes, currentRecipe, setCurrentRecipe)
  const { largeScreen } = useLargeScreen()

  useEffect(() => {
    const getCurrentImage = async () => {
      const image = await fetchCurrentImage(currentRecipe.inGameName)
      setCurrentImage(image)
    }

    const getCurrentCosts = async () => {
      const costs = await fetchCurrentCosts(currentRecipe.items)
      setCurrentCosts(costs)
    }

    getCurrentImage()
    getCurrentCosts()
  }, [currentRecipe])

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ closing ? `${styles.content} ${styles.closing}` : styles.content }>
        <CopyButton className={ styles.copy } title='Copy Link To Recipe' link={ `/forge/${recipe.key}` } />
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
