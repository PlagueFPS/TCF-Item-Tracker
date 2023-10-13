import styles from './ItemDetails.module.css'
import getGameData from "@/utils/getGameData"
import { Forge, Item } from "@/interfaces/Item"
import { Metadata } from "next"
import { notFound } from 'next/navigation'
import { calcRepPerWeight, calcValuePerWeight, getLink, itemAmountNeeded } from '@/functions/GlobalFunctions'
import Header from "@/components/Header/Header"
import Link from 'next/link'
import CopyButton from '@/components/CopyButton/CopyButton'

interface Props {
  params: {
    id: string
  }
}

export const generateStaticParams = async () => {
  const items = await getGameData('items', true) as Item[]
  return items.map(item => ({
    id: item.key
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const items = await getGameData('items', true) as Item[]
  const item = items.find(item => item.key === params.id)
  if (!item) return
  const title = `${item.inGameName} | The Cycle: Frontier Items Tracker`
  const metadata: Metadata = {
    title: title,
    description: item.description,
    openGraph: {
      title: title,
      description: item?.description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/item-info/${item.key}`,
      siteName: 'The Cycle: Frontier Items Tracker',
      type: 'website',
      images: [{
        url: `/images/${item.inGameName.toLowerCase().replace(/\s/g, '')}.png`,
      }]
    },
    twitter: {
      title: title,
      description: item.description
    }
  }

  return metadata
} 

export default async function ItemDetails({ params }: Props) {
  const items = await getGameData('items', true) as Item[]
  const item = items.find(item => item.key === params.id)
  if (!item) notFound()
  const inGameName = item.inGameName.toLowerCase().replace(/\s/g, '')
  const itemImageAVIF = `/images/${inGameName}.avif`
  const itemImageWEBP = `/images/${inGameName}.webp`
  const itemImagePNG = `/images/${inGameName}.png`
  const quests: Forge[] = []
  const upgrades: Forge[] = []
  const crafts: Forge[] = []
  const recipes: Forge[] = []

  for (const quest in item.uses.missions) {
    quests.push(item.uses.missions[quest])
  }

  for (const upgrade in item.uses.quarters) {
    upgrades.push(item.uses.quarters[upgrade])
  }

  for (const craft in item.uses.printing) {
    crafts.push(item.uses.printing[craft])
  }

  for (const recipe in item.uses.forge) {
    recipes.push(item.uses.forge[recipe])
  }

  const classSelector = () => {
    switch(item?.rarity) {
      case 'Common':
        return `${styles.container} ${styles.commonContainer}`
      case 'Uncommon':
        return `${styles.container} ${styles.uncommonContainer}`
      case 'Rare':
        return `${styles.container} ${styles.rareContainer}`
      case 'Epic':
        return `${styles.container} ${styles.epicContainer}`
      case 'Exotic':
        return `${styles.container} ${styles.exoticContainer}`
      case 'Legendary':
        return `${styles.container} ${styles.legendaryContainer}`
    }
  }

  return (
    <>
      <Header 
        bannerImage="iteminfobackground"
        height={ 1488 }
        width={ 970 }
        opacity={ 0.65 }
        dataType="item"
        placeHolder="Search for item..."
        data={ items }
      />
      <div className={ classSelector() }>
        <section className={ styles.itemContainer }>
          <CopyButton className={ styles.copy } title='Copy Link To Item' link={ `/item-info/${item.key}` } />
          <picture className={ styles.imageContainer }>
            <div className={ styles.itemFrame } />
            <source srcSet={ itemImageAVIF } type='image/avif' />
            <source srcSet={ itemImageWEBP } type='image/webp' />
            <source srcSet={ itemImagePNG } type='image/png' />
            <img
              src={ itemImagePNG }
              alt={ item.inGameName ?? '' }
              width={ 256 }
              height={ 256 }
              className={ styles.image }
              />
          </picture>
          <h1 className={ styles.title }>{ item.inGameName }</h1>
          <p className={ styles.description }>{ item.description }</p>
        </section>
        <section className={ styles.foundContainer }>
          <h2 className={ styles.foundTitle }>Where To Find:</h2>
          <ul className={ styles.foundList }>
            <li className={ styles.foundListItem }>
              <a 
                href={ `https://tools.thecyclefrontier.wiki/map?map=1&item=${item?.inGameName.replaceAll(' ', '_')}` }
                className={ styles.foundLink }
                target="_blank"
                rel='noreferrer'
              >
                Bright Sands
              </a>
            </li>
            <li className={ styles.foundListItem }>
              <a 
                href={ `https://tools.thecyclefrontier.wiki/map?map=2&item=${item?.inGameName.replaceAll(' ', '_')}` } 
                className={ styles.foundLink }
                target="_blank"
                rel='noreferrer'
              >
                Crescent Falls
              </a>
            </li>
            <li className={ styles.foundListItem }>
              <a 
                href={ `https://tools.thecyclefrontier.wiki/map?map=3&item=${item?.inGameName.replaceAll(' ', '_')}` } 
                className={ styles.foundLink }
                target="_blank"
                rel='noreferrer'
              >
                Tharis Island
              </a>
            </li>
          </ul>
        </section>
        <section className={ styles.statsContainer }>
          <h2 className={ styles.statsTitle }>Stats:</h2>
          <ul className={ styles.statsList }>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Weight:</p>
              <p className={ styles.stat }>{ item.weight }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Quest Amount:</p>
              <p className={ styles.stat }>{ itemAmountNeeded(item, 'quests') }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Sell Price:</p>
              <p className={ styles.stat }>{ item.sellValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Quarters Amount:</p>
              <p className={ styles.stat }>{ itemAmountNeeded(item, 'upgrades') }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Faction Rep:</p>
              <p className={ styles.stat }>{ item.factionRep.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Crafting Amount:</p>
              <p className={ styles.stat }>{ itemAmountNeeded(item, 'crafts') }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Value/Weight:</p>
              <p className={ styles.stat }>{ calcValuePerWeight(item) }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Forge Amount:</p>
              <p className={ styles.stat }>{ itemAmountNeeded(item, 'forge') }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Faction Rep/Weight:</p>
              <p className={ styles.stat }>{ calcRepPerWeight(item) }</p>
            </li>
            <li className={ styles.statsList_Item }>
              <p className={ styles.statText }>Stack Size:</p>
              <p className={ styles.stat }>{ item.stackSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </li>
          </ul>
          <div className={ styles.statsList_Item }>
            <p className={ styles.statText }>Rarity:</p>
            <p className={ `${styles.stat} ${styles.rarity}` }>{ item.rarity }</p>
          </div>
        </section>
        <section className={ styles.contentContainer }>
          <h2 className={ styles.contentTitle }>Needed For:</h2>
          <div className={ styles.content }>
            <dl className={ styles.list }>
              <dt className={ styles.listTitle }>Quests:</dt>
              { await Promise.all(quests.map(async (quest, index) => (
                <dd key={ `${quest.inGameName}_${index}` }>
                  <Link href={ await getLink(quest.inGameName) } className={ styles.listItem }>
                    { quest.inGameName }
                  </Link>
                  <span>(x{ quest.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '') })</span>
                </dd>
              )))}
            </dl>
          </div>
          <div className={ styles.content }>
            <dl className={ styles.list }>
              <dt className={ styles.listTitle }>Upgrades:</dt>
              { await Promise.all(upgrades.map(async (upgrade, index) => (
                <dd key={ `${upgrade.inGameName}_${index}` }>
                  <Link href={ await getLink(upgrade.inGameName) } className={ styles.listItem }>
                    { upgrade.inGameName }
                  </Link>
                  <span>(x{ upgrade.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '') })</span>
                </dd>
              )))}
            </dl>
          </div>
          <div className={ styles.content }>
            <dl className={ styles.list }>
              <dt className={ styles.listTitle }>Crafts:</dt>
              { await Promise.all(crafts.map(async (craft, index) => (
                <dd key={ `${craft.inGameName}_${index}` }>
                  <Link href={ await getLink(craft.inGameName) } className={ styles.listItem }>
                    { craft.inGameName }
                  </Link>
                  <span>(x{ craft.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '') })</span>
                </dd>
              )))}
            </dl>
          </div>
          <div className={ styles.content }>
            <dl className={ styles.list }>
              <dt className={ styles.listTitle }>Forge:</dt>
              { await Promise.all(recipes.map(async (recipe, index) => (
                <dd key={ `${recipe.inGameName}_${index}` }>
                  <Link href={ await getLink(recipe.inGameName) } className={ styles.listItem }>
                    { recipe.inGameName }
                  </Link>
                  <span>(x{ recipe.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '') })</span>
                </dd>
              )))}
            </dl>
          </div>
        </section>
      </div>
    </>
  )
}
