import { Quest } from "@/interfaces/Quest"
import QuestCard from "./QuestCard/QuestCard"

interface Props {
  quests: Quest[]
}

export default function QuestsContainer({ quests }: Props) {
  return (
    <div className="grid grid-cols-itemscontainer justify-center items-center px-8 gap-y-12 gap-x-8 my-8 md:my-20 mx-auto w-4/5">
      { quests.map(quest => (
        <QuestCard key={ quest.key } quest={ quest } quests={ quests } />
      ))}
    </div>
  )
}
