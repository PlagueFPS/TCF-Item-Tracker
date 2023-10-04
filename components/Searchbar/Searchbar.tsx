"use client"
import styles from './Searchbar.module.css'
import { DataTypes } from '@/types/DataTypes'
import { FormEvent, MouseEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Item } from '@/interfaces/Item'
import { Quest } from '@/interfaces/Quest'
import { Quarters } from '@/interfaces/Upgrade'
import { Craft } from '@/interfaces/Craft'
import { ForgeRecipe } from '@/interfaces/ForgeRecipe'
import { craftHrefSelector, questHrefSelector, upgradeHrefSelector } from '@/functions/GlobalFunctions'
import SuggestedItems from './SuggestedItems/SuggestedItems'

interface Props {
  data: DataTypes[]
  dataType: "item" | "quest" | "upgrade" | "craft" | "forge"
  placeholder: string
}

export default function Searchbar({ data, dataType, placeholder }: Props) {
  const [inputValue, setValue] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLLIElement>, altValue?: string) => {
    e.preventDefault()
    const value = inputValue.toLowerCase().replace(/\s/g, '')
    let url = ''

    switch(dataType) {
      case 'item':
        const itemData = data as Item[]
        const item = itemData.find(item => item.inGameName.toLowerCase().replace(/\s/g, '') === value || item.inGameName.toLowerCase().replace(/\s/g, '') === altValue)
        if (item) url = `/item-info/${item.key}`
        break
      case 'quest':
        const questData = data as Quest[]
        const quest = questData.find(quest => quest.inGameName.toLowerCase().replace(/\s/g, '') === value || quest.inGameName.toLowerCase().replace(/\s/g, '') === altValue)
        if (quest) url = questHrefSelector(quest)
        break
      case 'upgrade':
        const upgradeData = data as Quarters[]
        const upgrade = upgradeData.find(upgrade => upgrade.inGameName.toLowerCase().replace(/\s/g, '') === value || upgrade.inGameName.toLowerCase().replace(/\s/g, '') === altValue)
        if (upgrade) url = upgradeHrefSelector(upgrade)
        break
      case 'craft':
        const craftData = data as Craft[]
        const craft = craftData.find(craft => craft.inGameName.toLowerCase().replace(/\s/g, '') === value || craft.inGameName.toLowerCase().replace(/\s/g, '') === altValue)
        if (craft) url = craftHrefSelector(craft)
        break
      case 'forge':
        const forgeRecipes = data as ForgeRecipe[]
        const recipe = forgeRecipes.find(recipe => recipe.inGameName.toLowerCase().replace(/\s/g, '') === value || recipe.inGameName.toLowerCase().replace(/\s/g, '') === altValue)
        if (recipe) url = `/forge/${recipe.key}`
    }

    router.push(url)
  }

  return (
    <form onSubmit={ handleSubmit } className='flex w-full'>
      <input 
        type='search'
        placeholder={ placeholder }
        className={ styles.input }
        value={ inputValue }
        onChange={ (e) => setValue(e.target.value) }
      />
      <button type='submit' className={ styles.button }>Submit</button>
      { inputValue && 
        <ul className={ styles.list }>
          <SuggestedItems 
            data={ data } 
            inputValue={ inputValue }  
            handleSubmit={ handleSubmit } 
          /> 
        </ul>
      }
    </form>
  )
}