import styles from './QuestCardOptions.module.css'
import { Quest } from "@/interfaces/Quest"
import { Item } from "@/interfaces/Item"
import { useEffect, useState } from 'react'
import useButtonOptions from '@/hooks/useButtonOptions'
import useCycleState from '@/hooks/useCycleState'
import useLargeScreen from "@/hooks/useLargeScreen"
import { getTaskItems } from '@/utils/actions'
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from 'react-icons/fa6'
import Link from 'next/link'
import CopyButton from '@/components/CopyButton/CopyButton'

interface Props {
  quest: Quest
  quests: Quest[]
  taskItems: Item[]
  toggleOptionsModal: () => void
}

export interface optionItem extends Item {
  image?: string
}

export default function QuestCardOptions({ quest, quests, taskItems, toggleOptionsModal }: Props) {
  const [currentQuest, setCurrentQuest] = useState(quest)
  const [currentTaskItems, setCurrentTaskItems] = useState<optionItem[]>(taskItems)
  const { closing, handleAddButtonClick, handleCloseButtonClick } = useButtonOptions(currentTaskItems, toggleOptionsModal)
  const { cyclePrevState, cycleNextState } = useCycleState(quests, currentQuest, setCurrentQuest)
  const { largeScreen } = useLargeScreen()
  const faction = currentQuest.faction.toLowerCase()

  useEffect(() => {
    const getCurrentTaskItems = async () => {
      const taskItems = await getTaskItems(currentQuest.objectives)
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

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ classSelector() }>
        <CopyButton className={ styles.copy } title='Copy Link To Quest' link={ `/quests/${currentQuest.key}` } />
        <button className={ styles.prevBtn } onClick={ cyclePrevState }>
          { largeScreen ? <FaAngleLeft /> : <FaAngleUp /> }
        </button>
        <button className={ styles.nextBtn } onClick={ cycleNextState }>
          { largeScreen ? <FaAngleRight /> : <FaAngleDown /> }
        </button>
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
        <Link href={ `/quests/${currentQuest.key}` } className={ styles.link }>
          <p className={ styles.linkText }>View Quest Details</p>
        </Link>
      </div>
    </div>
  )
}
