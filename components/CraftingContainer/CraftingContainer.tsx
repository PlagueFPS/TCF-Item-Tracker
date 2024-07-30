import { Craft, CraftType } from "@/interfaces/Craft"
import { Item } from "@/interfaces/Item"
import { getGameData } from "@/data/data"
import { compareCraftRarity } from "@/functions/GlobalFunctions"
import CraftCardWrapper from "./CraftCardWrapper/CraftCardWrapper"
import CraftCard from "./CraftCard/CraftCard"
interface Props {
  craftType: CraftType
}

export default async function CraftingContainer({ craftType }: Props) {
  const crafts = await getGameData('printing') as Craft[]
  const items = await getGameData('items') as Item[]
  const filteredCrafts = crafts.filter(craft => {
    if (craftType === 'questItem') return craft.type === 'questItem' || craft.type === 'backpack'
    else if (craftType === 'shield') return craft.type === 'shield' || craft.type === 'helmet'
    else return craft.type === craftType
  }).sort(compareCraftRarity)

  return (
    <div className="grid grid-cols-itemscontainer justify-center items-center gap-y-12 gap-x-8 my-20 w-4/5">
      { filteredCrafts.map(craft => (
        <CraftCardWrapper key={ craft.key } craft={ craft } crafts={ filteredCrafts } items={ items }>
          <CraftCard craft={ craft } />
        </CraftCardWrapper>
      ))}
    </div>
  )
}
