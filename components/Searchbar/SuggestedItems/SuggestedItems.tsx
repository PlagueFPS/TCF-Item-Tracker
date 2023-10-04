import styles from './SuggestedItems.module.css'
import { DataTypes } from "@/types/DataTypes"
import { FormEvent, MouseEvent } from 'react'

interface Props {
  data: DataTypes[]
  inputValue: string
  handleSubmit: (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLLIElement>, altValue?: string) => void
}

export default function SuggestedItems({ data, inputValue, handleSubmit }: Props) {
  const limit = 5
  let num = 0

  const displayValue = (data: DataTypes, e: FormEvent<HTMLFormElement>| MouseEvent<HTMLLIElement>) => {
    const value = data.inGameName.toLowerCase().replace(/\s/g, '')
    handleSubmit(e, value)
  }

  const checkInput = (data: DataTypes) => {
    const value = inputValue.toLowerCase().replace(/\s/g, '')
    const isVisible = data.inGameName.toLowerCase().replace(/\s/g, '').includes(value)
    return isVisible
  }

  const classSelector = (data: DataTypes) => {
    if ('rarity' in data) {
      switch(data.rarity) {
        case 'Common':
          return `${styles.suggestedItem} ${styles.common}`
        case 'Uncommon':
          return `${styles.suggestedItem} ${styles.uncommon}`
        case 'Rare':
          return `${styles.suggestedItem} ${styles.rare}`
        case 'Epic':
          return `${styles.suggestedItem} ${styles.epic}`
        case 'Exotic':
          return `${styles.suggestedItem} ${styles.exotic}`
        case 'Legendary':
          return `${styles.suggestedItem} ${styles.legendary}`
      }
    }
    else if ('faction' in data) {
      switch(data.faction) {
        case 'Badum':
          return `${styles.suggestedItem} ${styles.badum}`
        case 'ICA':
          return `${styles.suggestedItem} ${styles.ica}`
        case 'Korolev':
          return `${styles.suggestedItem} ${styles.korolev}`
        case 'Osiris':
          return `${styles.suggestedItem} ${styles.osiris}`
      }
    }
    else return styles.suggestedItem
  }

  return (
    <>
      { data.map((data, index) => {
        if (checkInput(data) && num < limit) {
          num += 1
          return (
            <li key={ `${data.inGameName}_${index}` } className={ classSelector(data) } onClick={ (e) => displayValue(data, e) }>
              <p>{ data.inGameName } { 'rarity' in data ? `(${data.rarity})` : 'faction' in data ? `(${data.faction})` : null }</p>
            </li>
          )
        }
      })}
    </>
  )
}
