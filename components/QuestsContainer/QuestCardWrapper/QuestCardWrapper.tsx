"use client"
import styles from '@/components/QuestsContainer/QuestCard/QuestCard.module.css'
import { Quest } from "@/interfaces/Quest"
import { Item } from "@/interfaces/Item"
import useToggleOptions from '@/hooks/useToggleOptions'
import QuestCardOptions from '../QuestCard/QuestCardOptions/QuestCardOptions'

interface Props {
  children: React.ReactNode
  quest: Quest
  quests: Quest[]
  taskItems: Item[]
}

export default function QuestCardWrapper({ children, quest, quests, taskItems }: Props) {
  const { showOptions, toggleOptionsModal } = useToggleOptions()

  const classSelector = () => {
    switch(quest.faction) {
      case 'Badum':
        return `${styles.container} ${styles.badum}`
      case 'ICA':
        return `${styles.container} ${styles.ica}`
      case 'Korolev':
        return `${styles.container} ${styles.korolev}`
      case 'Osiris':
        return `${styles.container} ${styles.osiris}`
    }
  }

  return (
    <>
      { showOptions && 
        <QuestCardOptions 
          quest={ quest } 
          quests={ quests } 
          taskItems={ taskItems } 
          toggleOptionsModal={ toggleOptionsModal } 
        /> 
      }
      <div className={ classSelector() } onClick={ toggleOptionsModal }>
        { children }
      </div>
    </>
  )
}
