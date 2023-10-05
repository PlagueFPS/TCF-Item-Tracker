"use client"
import styles from '@/components/QuestsContainer/QuestCard/QuestCard.module.css'
import { Quest } from "@/interfaces/Quest"
import { Item } from "@/interfaces/Item"
import { useState } from "react"

interface Props {
  children: React.ReactNode
  quest: Quest
  quests: Quest[]
  taskItems: Item[]
}

export default function QuestCardWrapper({ children, quest, quests, taskItems }: Props) {
  const [showOptions, setOptions] = useState(false)

  const toggleOptionsModel = (e: any) => {
    e.preventDefault()
    setOptions(option => !option)
  }

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
      <div className={ classSelector() } onClick={ toggleOptionsModel }>
        { children }
      </div>
    </>
  )
}
