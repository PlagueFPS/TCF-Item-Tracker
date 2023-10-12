import styles from './PerkDetails.module.css'
import getGameData from '@/utils/getGameData'
import { ForgeRecipe } from '@/interfaces/ForgeRecipe'
import { getCosts, getItemImage } from '@/utils/GameUtils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CopyButton from '@/components/CopyButton/CopyButton'

interface Props {
  params: { id: string }
}

export const generateStaticParams = async () => {
  const recipes = await getGameData('forgePerks') as ForgeRecipe[]
  return recipes.map(recipe => ({
    id: recipe.key
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const recipes = await getGameData('forgePerks') as ForgeRecipe[]
  const recipe = recipes.find(recipe => recipe.key === params.id)
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
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}${image}.png`,
        width: 144,
        height: 144,
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
  const recipes = await getGameData('forgePerks') as ForgeRecipe[]
  const recipe = recipes.find(recipe => recipe.key === params.id)
  if (!recipe) notFound()
  const costs = await getCosts(recipe.items)

  return (
    <div className={ styles.container }>
      <div className={ styles.recipeContainer }>
        <CopyButton className={ styles.copy } title='Copy Link To Recipe' link={ `/forge/${recipe.key}` } />
        <picture className={ styles.imageContainer }>
          <div className={ styles.imageFrame } />
          <source srcSet={ `${await getItemImage(recipe.inGameName)}.avif` } type='image/avif' />
          <source srcSet={ `${await getItemImage(recipe.inGameName)}.webp` } type='image/webp' />
          <source srcSet={ `${await getItemImage(recipe.inGameName)}.png` } type='image/png' />
          <img
            src={ `${await getItemImage(recipe.inGameName)}.png` } 
            alt={ recipe.inGameName }
            width={ 256 }
            height={ 256 }
            className={ styles.image }
          />
        </picture>
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
              <picture className={ styles.costImage_Container } title={ cost.item }>
                <source srcSet={ `${await getItemImage(cost.item)}.avif` } type='image/avif'/>
                <source srcSet={ `${await getItemImage(cost.item)}.webp` } type='image/webp'/>
                <source srcSet={ `${await getItemImage(cost.item)}.png` } type='image/png'/>
                <img 
                  src={ `${await getItemImage(cost.item)}.png` } 
                  alt={ cost.item }
                  className={ styles.costImage }
                  height={ 64 }
                  width={ 64 }
                  />
              </picture>
              <p className={ styles.costAmount }>{ cost.amount }</p>
            </li>
          )))}
        </ul>
      </div>
    </div>
  )
}
