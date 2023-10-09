"use client"
import styles from '../ForgeCard/ForgeCard.module.css'
import useToggleOptions from "@/hooks/useToggleOptions"
import { ForgeRecipe } from "@/interfaces/ForgeRecipe"
import { Item } from "@/interfaces/Item"
import ForgeCardOptions from '../ForgeCard/ForgeCardOptions/ForgeCardOptions'

interface Props {
  children: React.ReactNode
  recipe: ForgeRecipe
  recipes: ForgeRecipe[]
  items: Item[]
}

export default function ForgeCardWrapper({ children, recipe, recipes, items }: Props) {
  const { showOptions, toggleOptionsModal } = useToggleOptions()

  return (
    <>
      { showOptions && 
        <ForgeCardOptions 
          recipe={ recipe } 
          recipes={ recipes } 
          items={ items } 
          toggleOptionsModal={ toggleOptionsModal } 
        /> 
      }
      <div className={ styles.container } onClick={ toggleOptionsModal }>
        { children }
      </div>
    </>
  )
}
