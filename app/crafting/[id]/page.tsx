import styles from './CraftDetails.module.css'
import getGameData from "@/utils/getGameData"
import { Craft } from "@/interfaces/Craft"
import { getCraftCosts, getItemImage } from "@/utils/GameUtils"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { dataTimes } from '@/functions/GlobalFunctions'
import CopyButton from '@/components/CopyButton/CopyButton'

interface Props {
  params: { id: string }
}

export const generateStaticParams = async () => {
  const crafts = await getGameData('printing') as Craft[]
  return crafts.map(craft => ({
    id: craft.key
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const crafts = await getGameData('printing') as Craft[]
  const craft = crafts.find(craft => craft.key === params.id)
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
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${image}.png`,
        width: 256,
        height: 256
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
  const crafts = await getGameData('printing') as Craft[]
  const craft = crafts.find(craft => craft.key === params.id)
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
        <picture className={ styles.imageContainer }>
          <div className={ styles.itemFrame } />
          <source srcSet={ `${await getItemImage(craft.inGameName)}.avif` } type='image/avif' />
          <source srcSet={ `${await getItemImage(craft.inGameName)}.webp` } type='image/webp' />
          <source srcSet={ `${await getItemImage(craft.inGameName)}.png` } type='image/png' />
          <img
            src={ `${await getItemImage(craft.inGameName)}.png` } 
            alt={ craft.inGameName } 
            width={ 256 }
            height={ 256 }
            className={ styles.image }
          />
        </picture>
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
              <picture className={ styles.costImage_Container } title={ cost.inGameName }>
              <source srcSet={ `${await getItemImage(cost.inGameName)}.avif` } type='image/avif' />
              <source srcSet={ `${await getItemImage(cost.inGameName)}.webp` } type='image/webp' />
              <source srcSet={ `${await getItemImage(cost.inGameName)}.png`} type='image/png' />
              <img 
                src={ `${await getItemImage(cost.inGameName)}.png` } 
                alt={ cost.inGameName } 
                className={ `${styles.costImage } ${ cost.inGameName.toLowerCase().replace(/\s/g, '') }` }
                height={ 64 }
                width={ 64 }
              />
            </picture>
            <p className={ styles.costAmount }>{ cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </li>
          )))}
        </ul>
      </div>
    </div>
  )
}
