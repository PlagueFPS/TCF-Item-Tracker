import styles from './UpgradeDetails.module.css'
import { getGameData } from "@/data/data"
import { Quarters } from "@/interfaces/Upgrade"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCosts, getItemImage } from "@/utils/GameUtils"
import { dataTimes } from '@/functions/GlobalFunctions'
import CopyButton from '@/components/CopyButton/CopyButton'
import Image from 'next/image'

interface Props {
  params: Promise<{ id: string }>
}

export const generateStaticParams = async () => {
  const upgrades = await getGameData('personalQuarters') as Quarters[]
  return upgrades.map(upgrade => ({
    id: `${upgrade.inGameName.replace(/\s/g, '')}`
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const upgradesPromise = getGameData('personalQuarters') as Promise<Quarters[]>
  const [{ id }, upgrades] = await Promise.all([params, upgradesPromise])
  const upgrade = upgrades.find(upgrade => upgrade.inGameName.replace(/\s/g, '') === id)
  if (!upgrade) return
  const title = `${upgrade.inGameName} | The Cycle: Frontier Items Tracker`
  const description = `View details on requirements for ${upgrade.inGameName}`
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/upgrades/${upgrade.inGameName.replace(/\s/g, '')}`
    },
    twitter: {
      title: title,
      description: description,
    }
  }

  return metadata
}

export default async function UpgradeDetails({ params }: Props) {
  const upgradesPromise = getGameData('personalQuarters') as Promise<Quarters[]>
  const [{ id }, upgrades] = await Promise.all([params, upgradesPromise])
  const upgrade = upgrades.find(upgrade => upgrade.inGameName.replace(/\s/g, '') === id)
  if (!upgrade) notFound()
  const costs = await getCosts(upgrade.costs)

  return (
    <div className={ styles.container }>
      <div className={ styles.upgradeContainer }>
        <CopyButton className={ styles.copy } title='Copy Link To Upgrade' link={ `/upgrades/${upgrade.inGameName.replace(/\s/g, '')}` } />
        <h1 className={ styles.title }>{ upgrade.inGameName }</h1>
      </div>
      { 'upgradesRequired' in upgrade &&
        <div className={ styles.upgradesRequired_Container }>
          <h2 className={ styles.categoryTitle }>Upgrades Required:</h2>
          <p className={ styles.upgradesRequired }>{ upgrade.upgradesRequired }</p>
          <p className={ styles.upgradesRequiredText }>Tech Tree Upgrades</p>
        </div>
      }
      { 'upgradeAmount' in upgrade &&
        <div className={ styles.upgradeAmount_Container }>
          <h2 className={ styles.categoryTitle }>Upgrades Amount:</h2>
          <p className={ styles.upgradeAmount }>Increased by { upgrade.upgradeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
        </div>
      }
      <div className={ styles.upgradeTime_Container }>
        <h2 className={ styles.categoryTitle }>Upgrade Time:</h2>
        <p className={ styles.upgradeTime }>{ dataTimes(upgrade.upgradeTime) }</p>
      </div>
      <div className={ styles.upgradeCosts_Container }>
        <h2 className={ styles.categoryTitle }>Upgrade Costs:</h2>
        <ul className={ styles.costsList }>
          { await Promise.all(costs.map(async (cost, index) => (
            <li key={ `${cost.item}_${index}` } className={ styles.cost }>
              <Image 
                src={ `${await getItemImage(cost.item)}.avif` } 
                alt={ cost.item }
                height={ 64 }
                width={ 64 }
                className={ `${styles.costImage } ${ cost.item.toLowerCase().replace(/\s/g, '') }` } 
              />
              <p className={ styles.costAmount }>{ cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </li>
          ))) }
        </ul>
      </div>
    </div>
  )
}
