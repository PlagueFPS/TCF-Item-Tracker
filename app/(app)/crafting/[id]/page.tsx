import styles from './CraftDetails.module.css'
import { getGameData } from "@/data/data"
import { Craft } from "@/interfaces/Craft"
import { getCraftCosts, getItemImage } from "@/utils/GameUtils"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { dataTimes } from '@/functions/GlobalFunctions'
import CopyButton from '@/components/CopyButton/CopyButton'
import Image from 'next/image'

interface Props {
  params: Promise<{ id: string }>
}

export const generateStaticParams = async () => {
  const crafts = await getGameData('printing') as Craft[]
  return crafts.map(craft => ({
    id: craft.key
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const craftsPromise = getGameData('printing') as Promise<Craft[]>
  const [{ id }, crafts] = await Promise.all([params, craftsPromise])
  const craft = crafts.find(craft => craft.key === id)
  if (!craft) return
  const title = `${craft.inGameName} | The Cycle: Frontier Items Tracker`
  const image = await getItemImage(craft.inGameName)
  const metadata: Metadata = {
    title: title,
    description: craft.description,
    openGraph: {
      title: title,
      description: craft.description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/crafting/${craft.key}`,
      type: 'website',
      siteName: 'The Cycle: Frontier Items Tracker',
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${image}.avif`,
      }]
    },
    twitter: {
      title: title,
      description: craft.description
    }
  }

  return metadata
}

export default async function CraftDetails({ params }: Props) {
  const craftsPromise = getGameData('printing') as Promise<Craft[]>
  const [{ id }, crafts] = await Promise.all([params, craftsPromise])
  const craft = crafts.find(craft => craft.key === id)
  if (!craft) notFound()
  const costs = await getCraftCosts(craft.items)

  const classSelector = () => {
    switch(craft.rarity) {
      case 'Uncommon':
        return `${styles.container} ${styles.uncommon}`
      case 'Rare':
        return `${styles.container} ${styles.rare}`
      case 'Epic':
        return `${styles.container} ${styles.epic}`
      case 'Exotic':
        return `${styles.container} ${styles.exotic}`
      case 'Legendary':
        return `${styles.container} ${styles.legendary}`
    }
  }

  return (
    <div className={ classSelector() }>
      <div className={ styles.craftContainer }>
        <CopyButton className={ styles.copy } title='Copy Link To Craft' link={ `/crafting/${craft.key}` } />
        <figure className={ styles.imageContainer }>
          <div className={ styles.itemFrame } />
          <Image
            src={ `${await getItemImage(craft.inGameName)}.avif` } 
            alt={ craft.inGameName } 
            width={ 256 }
            height={ 256 }
            className={ styles.image }
          />
        </figure>
        <h1 className={ styles.title }>{ craft.inGameName }</h1>
        <p className={ styles.description }>{ craft.description }</p>
      </div>
      { craft.armorValue && 
        <div className={ styles.armorValue_Container }>
          <h2 className={ styles.categoryTitle }>Armor Value:</h2>
          <p className={ styles.armorValue }>{ craft.armorValue }</p>
        </div>
      }
      { craft.durability && 
        <div className={ styles.armorValue_Container }>
          <h2 className={ styles.categoryTitle }>Armor Durability:</h2>
          <p className={ styles.armorValue }>{ craft.durability }/{ craft.durability }</p>
        </div>
      }
      { (craft.effects && craft.effects.length > 0 && craft.effects[0]) &&
        <div className={ styles.effectContainer }>
          <h2 className={ styles.categoryTitle }>{ craft.effects.length > 1 ? `Attachment Effects:` : `Attachment Effect:` }</h2>
          <ul className={ styles.effectList }>
            { craft.effects.map((effect, index) => (
              <li key={ `${effect}_${index}` } className={ styles.effect }>
                { effect }
              </li>
            ))}
          </ul>
        </div>
      }
      <div className={ styles.timeContainer }>
        <h2 className={ styles.categoryTitle }>Craft Time:</h2>
        <p className={ styles.time }>{ dataTimes(craft.time) }</p>
      </div>
      <div className={ styles.rarityContainer }>
        <h2 className={ styles.categoryTitle }>Rarity:</h2>
        <p className={ styles.rarity }>{ craft.rarity }</p>
      </div>
      <div className={ styles.costsContainer }>
        <h2 className={ styles.categoryTitle }>Craft Costs:</h2>
        <ul className={ styles.costsList }>
          { await Promise.all(costs.map(async (cost, index) => (
            <li key={ `${cost.inGameName}_${index}` } className={ styles.cost }>
              <figure className={ styles.costImage_Container } title={ cost.inGameName }>
                <Image 
                  src={ `${await getItemImage(cost.inGameName)}.avif` } 
                  alt={ cost.inGameName } 
                  className={ `${styles.costImage } ${ cost.inGameName.toLowerCase().replace(/\s/g, '') }` }
                  height={ 64 }
                  width={ 64 }
                />
            </figure>
            <p className={ styles.costAmount }>{ cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </li>
          )))}
        </ul>
      </div>
    </div>
  )
}
