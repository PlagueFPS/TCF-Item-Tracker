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
import SuggestedItems from './SuggestedItems/SuggestedItems'

interface Props {
  data: DataTypes[]
  dataType: "item" | "quest" | "upgrade" | "craft" | "forge"
  placeholder: string
}

export default function Searchbar({ data, dataType, placeholder }: Props) {
  const [inputValue, setValue] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement> | MouseEvent<HTMLLIElement>, dataKey?: string) => {
    e.preventDefault()
    const value = inputValue.toLowerCase().replace(/\s/g, '')
    let url = ''

    switch(dataType) {
      case 'item':
        const itemData = data as Item[]
        const item = itemData.find(item => item.key === dataKey || item.inGameName.toLowerCase().replace(/\s/g, '') === value)
        if (item) url = `/item-info/${item.key}`
        break
      case 'quest':
        const questData = data as Quest[]
        const quest = questData.find(quest => quest.key === dataKey || quest.inGameName.toLowerCase().replace(/\s/g, '') === value)
        if (quest) url = `/quests/${quest.key}`
        break
      case 'upgrade':
        const upgradeData = data as Quarters[]
        const upgrade = upgradeData.find(upgrade => upgrade.inGameName.toLowerCase().replace(/\s/g, '') === value)
        if (upgrade) url = `/upgrades/${upgrade.inGameName.replace(/\s/g, '')}`
        break
      case 'craft':
        const craftData = data as Craft[]
        const craft = craftData.find(craft => craft.key === dataKey || craft.inGameName.toLowerCase().replace(/\s/g, '') === value)
        if (craft) url = `/crafting/${craft.key}`
        break
      case 'forge':
        const forgeRecipes = data as ForgeRecipe[]
        const recipe = forgeRecipes.find(recipe => recipe.key === dataKey || recipe.inGameName.toLowerCase().replace(/\s/g, '') === value)
        if (recipe) url = `/forge/${recipe.key}`
    }

    setValue('')
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
