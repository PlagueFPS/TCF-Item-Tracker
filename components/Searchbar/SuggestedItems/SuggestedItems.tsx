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

  return (
    <>
      { data.map((data, index) => {
        if (checkInput(data) && num < limit) {
          num += 1
          return (
            <li key={ `${data.inGameName}_${index}` } className={ styles.suggestedItem } onClick={ (e) => displayValue(data, e) }>
              <p>{ data.inGameName } { 'rarity' in data ? `(${data.rarity})` : null }</p>
            </li>
          )
        }
      })}
    </>
  )
}
