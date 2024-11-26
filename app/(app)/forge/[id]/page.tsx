import styles from './PerkDetails.module.css'
import { getGameData } from "@/data/data"
import { ForgeRecipe } from '@/interfaces/ForgeRecipe'
import { getCosts, getItemImage } from '@/utils/GameUtils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CopyButton from '@/components/CopyButton/CopyButton'
import Image from 'next/image'

interface Props {
  params: Promise<{ id: string }>
}

export const generateStaticParams = async () => {
  const recipes = await getGameData('forgePerks') as ForgeRecipe[]
  return recipes.map(recipe => ({
    id: recipe.key
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const recipesPromise = getGameData('forgePerks') as Promise<ForgeRecipe[]>
  const [{ id }, recipes] = await Promise.all([params, recipesPromise])
  const recipe = recipes.find(recipe => recipe.key === id)
  if (!recipe) return
  const title = `${recipe.inGameName} | The Cycle: Frontier Items Tracker`
  const description = `View details for ${recipe.inGameName} recipe`
  const image = await getItemImage(recipe.inGameName)
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/forge/${recipe.key}`,
      type: 'website',
      siteName: 'The Cycle: Frontier Items Tracker',
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${image}.png`,
      }]
    },
    twitter: {
      title: title,
      description: description,
    }
  }

  return metadata
}

export default async function PerkDetails({ params }: Props) {
  const recipesPromise = getGameData('forgePerks') as Promise<ForgeRecipe[]>
  const [{ id }, recipes] = await Promise.all([params, recipesPromise])
  const recipe = recipes.find(recipe => recipe.key === id)
  if (!recipe) notFound()
  const costs = await getCosts(recipe.items)

  return (
    <div className={ styles.container }>
      <div className={ styles.recipeContainer }>
        <CopyButton className={ styles.copy } title='Copy Link To Recipe' link={ `/forge/${recipe.key}` } />
        <figure className={ styles.imageContainer }>
          <div className={ styles.imageFrame } />
          <Image
            src={ `${await getItemImage(recipe.inGameName)}.avif` } 
            alt={ recipe.inGameName }
            width={ 256 }
            height={ 256 }
            className={ styles.image }
          />
        </figure>
        <h1 className={ styles.title }>{ recipe?.inGameName }</h1>
      </div>
      <div className={ styles.compatabilityContainer }>
        <h2 className={ styles.categoryTitle }>Compatable With:</h2>
        <ul className={ styles.compatabilityList }>
          { recipe.equipment.map((equipment, index) => (
            <li key={ `${equipment}_${index}` } className={ styles.compatabilityListItem }>
              { equipment }
            </li>
          ))}
        </ul>
      </div>
      <div className={ styles.minStat_Container }>
        <h2 className={ styles.categoryTitle }>Minimum Stat:</h2>
        <p className={ styles.stat }>{ recipe.attributeOverrides.minValue }</p>
      </div>
      <div className={ styles.maxStat_Container }>
        <h2 className={ styles.categoryTitle }>Maximum Stat:</h2>
        <p className={ styles.stat }>{ recipe.attributeOverrides.calculatedMaxValue }</p>
      </div>
      <div className={ styles.costsContainer }>
        <h2 className={ styles.categoryTitle }>Compatable Items:</h2>
        <ul className={ styles.costsList }>
          { await Promise.all(costs.map(async (cost, index) => (
            <li key={ `${cost.item}_${index}` } className={ styles.cost }>
              <figure className={ styles.costImage_Container } title={ cost.item }>
                <Image 
                  src={ `${await getItemImage(cost.item)}.avif` } 
                  alt={ cost.item }
                  className={ styles.costImage }
                  height={ 64 }
                  width={ 64 }
                  />
              </figure>
              <p className={ styles.costAmount }>{ cost.amount }</p>
            </li>
          )))}
        </ul>
      </div>
    </div>
  )
}
