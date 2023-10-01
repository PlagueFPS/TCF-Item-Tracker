"use client"
import styles from './ItemsSorter.module.css'
import { useState } from 'react'
import { Item } from '@/interfaces/Item'
import { compareName, comparePrice, compareRarity, compareValuePerWeight, compareWeight } from '@/utils/GameUtils'

interface Props {
  setItems?: React.Dispatch<React.SetStateAction<Item[]>>
}

type Options = 'Rarity' | 'A-Z' | 'Price' | 'Value/Weight' | 'Weight'

export default function ItemsSorter({ setItems }: Props) {
  const [options, setOptions] = useState<Options[]>(['Rarity', 'A-Z', 'Price', 'Value/Weight', 'Weight'])
  const [expanded, setExpanded] = useState(false)

  const onClickHandler = (value: Options) => {
    setExpanded(prevState => !prevState)
    switch(value) {
      case 'Rarity':
        setOptions(['Rarity', 'A-Z', 'Price', 'Value/Weight', 'Weight'])
        // setItems(prevState => prevState.sort(compareRarity))
        break
      case 'A-Z':
        setOptions(['A-Z', 'Rarity', 'Price', 'Value/Weight', 'Weight'])
        // setItems(prevState => prevState.sort(compareName))
        break
      case 'Price':
        setOptions(['Price', 'Rarity', 'A-Z', 'Value/Weight', 'Weight'])
        // setItems(prevState => prevState.sort(comparePrice))
        break
      case 'Value/Weight':
        setOptions(['Value/Weight', 'Rarity', 'A-Z', 'Price', 'Weight'])
        // setItems(prevState => prevState.sort(compareValuePerWeight))
        break
      case 'Weight':
        setOptions(['Weight', 'Rarity', 'A-Z', 'Price', 'Value/Weight'])
        // setItems(prevState => prevState.sort(compareWeight))
    }
  }

  return (
    <div className={ styles.container }>
      <div className={ expanded ? `${styles.selector} ${styles.expanded}` : styles.selector }>
        <button className={ `${styles.option} ${styles.selected}` } onClick={ () => setExpanded(prevState => !prevState) }>
          <span>{ options[0] }</span>
          <span className={ expanded ? `${styles.chevron} ${styles.expanded}` : styles.chevron }></span>
        </button>
        <button className={ expanded ? `${styles.option} ${styles.expanded}` : styles.option } onClick={ () => onClickHandler(options[1]) }>
          <span>{ options[1] }</span>
        </button>
        <button className={ expanded ? `${styles.option} ${styles.expanded}` : styles.option } onClick={ () => onClickHandler(options[2]) }>
          <span>{ options[2] }</span>
        </button>
        <button className={ expanded ? `${styles.option} ${styles.expanded}` : styles.option } onClick={ () => onClickHandler(options[2]) }>
          <span>{ options[3] }</span>
        </button>
        <button className={ expanded ? `${styles.option} ${styles.expanded}` : styles.option } onClick={ () => onClickHandler(options[2]) }>
          <span>{ options[4] }</span>
        </button>
      </div>
    </div>
  )
}
