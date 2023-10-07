import { Quarters } from "@/interfaces/Upgrade"
import { Item } from "@/interfaces/Item"
import getGameData from "@/utils/getGameData"
import UpgradeCard from "./UpgradeCard/UpgradeCard"
import { getCosts } from "@/utils/GameUtils"
import UpgradeCardWrapper from "./UpgradeCardWrapper/UpgradeCardWrapper"

interface Props {
  upgrades: Quarters[]
}

export default async function UpgradesContainer({ upgrades }: Props) {
  const items = await getGameData('items') as Item[]

  return (
    <div className="grid grid-cols-itemscontainer gap-y-12 gap-x-8 my-8 md:my-20 md:mx-4 justify-center w-4/5">
      { await Promise.all(upgrades.map(async (upgrade, index) => {
        const costs = await getCosts(upgrade.costs)
        return (
          <UpgradeCardWrapper key={ `${upgrade.inGameName}_${index}` } upgrade={ upgrade } upgrades={ upgrades } costs={ costs } items={ items }>
            <UpgradeCard upgrade={ upgrade } />
          </UpgradeCardWrapper>
        )
      }))}
    </div>
  )
}
