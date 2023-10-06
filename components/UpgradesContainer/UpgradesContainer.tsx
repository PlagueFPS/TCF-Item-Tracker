import { Quarters } from "@/interfaces/Upgrade"
import UpgradeCard from "./UpgradeCard/UpgradeCard"

interface Props {
  upgrades: Quarters[]
}

export default function UpgradesContainer({ upgrades }: Props) {
  return (
    <div className="grid grid-cols-itemscontainer gap-y-12 gap-x-8 my-8 md:my-20 md:mx-4 justify-center w-4/5">
      { upgrades.map((upgrade, index) => {
        if ('level' in upgrade) return (
          <UpgradeCard key={ `${upgrade.level}_${index}` } upgrade={ upgrade } upgrades={ upgrades } />
        )
      })}
    </div>
  )
}
