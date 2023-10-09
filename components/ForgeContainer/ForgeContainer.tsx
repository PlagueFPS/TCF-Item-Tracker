import getGameData from "@/utils/getGameData"
import { ForgeRecipe } from "@/interfaces/ForgeRecipe"
import { Item } from "@/interfaces/Item"
import ForgeCardWrapper from "./ForgeCardWrapper/ForgeCardWrapper"
import ForgeCard from "./ForgeCard/ForgeCard"

export default async function ForgeContainer() {
  const recipes = await getGameData('forgePerks') as ForgeRecipe[]
  const items = await getGameData('items') as Item[]

  return (
    <div className='grid grid-cols-itemscontainer justify-center items-center px-8 gap-y-12 gap-x-8 my-8 md:my-20 mx-auto w-4/5'>
      { recipes.map(recipe => (
        <ForgeCardWrapper key={ recipe.key } recipe={ recipe } recipes={ recipes } items={ items }>
          <ForgeCard recipe={ recipe } />
        </ForgeCardWrapper>
      ))}
    </div>
  )
}
