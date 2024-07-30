import styles from './ItemCardOptions.module.css'
import { useEffect, useState, useCallback } from "react"
import useButtonOptions from '@/hooks/useButtonOptions'
import useCycleState from '@/hooks/useCycleState'
import useLargeScreen from '@/hooks/useLargeScreen'
import { Forge, Item } from "@/interfaces/Item"
import CopyButton from '@/components/CopyButton/CopyButton'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import Link from 'next/link'
import { getLinks } from '@/utils/actions'

interface Props {
  item: Item
  items: Item[]
  toggleOptionsModal: () => void
}

interface Link {
  inGameName: string
  link: string
}

type Filter = 'Quests' | 'Upgrades' | 'Crafts' | 'Forge'

export default function ItemCardOptions({ item, items, toggleOptionsModal }: Props) {
  const [currentItem, setCurrentItem] = useState(item)
  const [currentData, setCurrentData] = useState<Forge[]>([])
  const [currentLinks, setCurrentLinks] = useState<Link[]>([])
  const [activeFilter, setFilter] = useState<Filter>('Quests')
  const { closing, handleAddButtonClick, handleCloseButtonClick } = useButtonOptions(currentItem, toggleOptionsModal)
  const { cyclePrevState, cycleNextState } = useCycleState(items, currentItem, setCurrentItem)
  const { largeScreen } = useLargeScreen()
  const inGameName = currentItem.inGameName.toLowerCase().replace(/\s/g, '')
  const itemImageAVIF = `/images/${inGameName}.avif`
  const itemImageWEBP = `/images/${inGameName}.webp`
  const itemImagePNG = `/images/${inGameName}.png`

  const handleFilterClick = useCallback((filter: Filter) => {
    setFilter(filter)
    switch(filter) {
      case 'Quests':
        const quests: Forge[] = []
        for (const quest in currentItem.uses.missions) {
          quests.push(currentItem.uses.missions[quest])
        }

        setCurrentData(quests)
        break
      case 'Upgrades':
        const upgrades: Forge[] = []
        for (const upgrade in currentItem.uses.quarters) {
          upgrades.push(currentItem.uses.quarters[upgrade])
        }

        setCurrentData(upgrades)
        break
      case 'Crafts':
        const crafts: Forge[] = []
        for (const craft in currentItem.uses.printing) {
          crafts.push(currentItem.uses.printing[craft])
        }

        setCurrentData(crafts)
        break
      case 'Forge':
        const forgeRecipes: Forge[] = []
        for (const recipe in currentItem.uses.forge) {
          console.log(recipe, currentItem.uses.forge[recipe])
          forgeRecipes.push(currentItem.uses.forge[recipe])
        }

        setCurrentData(forgeRecipes)
    }
  }, [currentItem.uses])

  useEffect(() => {
    handleFilterClick(activeFilter)
  }, [handleFilterClick, activeFilter])

  useEffect(() => {
    const getCurrentLinks = async () => {
      const links = await getLinks(currentData)
      setCurrentLinks(links)
    }

    getCurrentLinks()
  }, [currentData])

  const classSelector = () => {
    switch(currentItem.rarity) {
      case 'Common':
        return closing ? `${styles.contentContainer} ${styles.commonContainer} ${styles.closing}`
          : `${styles.contentContainer} ${styles.commonContainer}`
      case 'Uncommon':
        return closing ? `${styles.contentContainer} ${styles.uncommonContainer} ${styles.closing}` 
          : `${styles.contentContainer} ${styles.uncommonContainer}`
      case 'Rare':
        return closing ? `${styles.contentContainer} ${styles.rareContainer} ${styles.closing}`
          : `${styles.contentContainer} ${styles.rareContainer}`
      case 'Epic':
        return closing ? `${styles.contentContainer} ${styles.epicContainer} ${styles.closing}`
          : `${styles.contentContainer} ${styles.epicContainer}`
      case 'Exotic':
        return closing ? `${styles.contentContainer} ${styles.exoticContainer} ${styles.closing}` 
          : `${styles.contentContainer} ${styles.exoticContainer}`
      case 'Legendary':
        return closing ? `${styles.contentContainer} ${styles.legendaryContainer} ${styles.closing}`
          : `${styles.contentContainer} ${styles.legendaryContainer}`
    }
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ classSelector() }>
        <CopyButton className={ styles.copy } title='Copy Link To Item' link={ `/item-info/${currentItem.key}` } />
        <button className={ styles.prevBtn } onClick={ cyclePrevState }>
          { largeScreen ? <FaAngleLeft /> : <FaAngleUp /> }
        </button>
        <button className={ styles.nextBtn } onClick={ cycleNextState }>
          { largeScreen ? <FaAngleRight /> : <FaAngleDown /> }
        </button>
        <picture className={ styles.imageContainer }>
          <div className={ styles.itemFrame } />
          <source srcSet={ itemImageAVIF } type='image/avif' />
          <source srcSet={ itemImageWEBP } type='image/webp' />
          <source srcSet={ itemImagePNG } type='image/png' />
          <img 
          src={ itemImagePNG } 
          alt={ currentItem.inGameName } 
          className={ `${styles.image} ${inGameName}` } 
          />
        </picture>
        <div className={ styles.titleContainer }>
          <h2 className={ styles.title }>{ currentItem.inGameName }</h2>
        </div>
        <div className={ styles.filterContainer }>
          <div className={ activeFilter === 'Quests' ? `${styles.filter} ${styles.activeFilter}` : styles.filter  } onClick={ () => handleFilterClick('Quests') }>Quests</div>
          <div className={ activeFilter === 'Upgrades' ? `${styles.filter} ${styles.activeFilter}` : styles.filter  } onClick={ () => handleFilterClick('Upgrades') }>Upgrades</div>
          <div className={ activeFilter === 'Crafts' ? `${styles.filter} ${styles.activeFilter}` : styles.filter  } onClick={ () => handleFilterClick('Crafts') }>Crafts</div>
          <div className={ activeFilter === 'Forge' ? `${styles.filter} ${styles.activeFilter}` : styles.filter  } onClick={ () => handleFilterClick('Forge') }>Forge</div>
        </div>
        <dl className={ styles.list }>
          <dt className={ styles.listTitle }>Needed For:</dt>
          { currentLinks.map((link, index) => (
            <dd key={ `${link.inGameName}_${index}` }>
              <Link href={ link.link } className={ styles.listItem }>
                { link.inGameName }
              </Link>
            </dd>
          ))}
        </dl>
        <div className={ styles.btnContainer }>
          <button className={ styles.btn } onClick={ handleAddButtonClick }>
            <span className={ styles.btnText }>Add Item To List</span>
          </button>
          <button className={ `${styles.btn} ${styles.btnDecline}` } onClick={ handleCloseButtonClick }>
            <span className={ styles.btnText }>Close</span>
          </button>
        </div>
        <Link href={ `/item-info/${currentItem.key}` } className={ styles.link }>
          <p className={ styles.linkText }>View Item Details</p>
        </Link>
      </div>
    </div>
  )
}
