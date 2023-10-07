import { Craft } from "@/interfaces/Craft"

interface Props {
  crafts: Craft[]
}

export default function CraftingContainer({ crafts }: Props) {
  return (
    <div className="grid grid-cols-itemscontainer gap-y-12 gap-x-8 my-20 mb-4 w-4/5">
      { crafts.map(craft => (
        <div key={ craft.key }>{ craft.inGameName }</div>
      ))}
    </div>
  )
}
