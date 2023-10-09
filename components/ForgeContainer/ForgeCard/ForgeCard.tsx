import styles from './ForgeCard.module.css'
import { ForgeRecipe } from "@/interfaces/ForgeRecipe"
import { getCosts, getItemImage } from "@/utils/GameUtils"

interface Props {
  recipe: ForgeRecipe
}

export default async function ForgeCard({ recipe }: Props) {
  const costs = await getCosts(recipe.items)

  return (
    <>
      <picture className={ styles.imageContainer }>
        <div className={ styles.imageFrame } />
        <source srcSet={ `${await getItemImage(recipe.inGameName)}.avif` } type='image/avif' />
        <source srcSet={ `${await getItemImage(recipe.inGameName)}.webp` } type='image/webp' />
        <source srcSet={ `${await getItemImage(recipe.inGameName)}.png` } type='image/png' />
        <img
          src={ `${await getItemImage(recipe.inGameName)}.png` } 
          alt={ recipe.inGameName }
          title={ recipe.inGameName }
          className={ styles.image }
          height={ 95 }
          width={ 95 }
        />
      </picture>
      <div className={ styles.titleContainer }>
        <h2 className={ styles.title }>{ recipe.inGameName }</h2>
      </div>
      <div className={ styles.compatabilityContainer }>
        <dl className={ styles.compatabilityList }>
          <dt className={ styles.compatabilityTitle }>Compatable With:</dt>
          { recipe.equipment.map((equipment, index) => (
            <dd key={ `${equipment}_${index}` } className={ styles.compatabilityListItem }>
              { equipment }
            </dd>
          )) }
        </dl>
      </div>
      <div className={ styles.costsContainer }>
        { await Promise.all(costs.map(async (cost, index) => (
          <div key={ `${cost.item}_${index}` } className={ styles.cost }>
            <picture className={ styles.costImage_Container } title={ cost.item }>
              <source srcSet={ `${await getItemImage(cost.item)}.avif` } type='image/avif' />
              <source srcSet={ `${await getItemImage(cost.item)}.webp` } type='image/webp' />
              <source srcSet={ `${await getItemImage(cost.item)}.png`} type='image/png' />
              <img 
                src={ `${await getItemImage(cost.item)}.png` } 
                alt={ cost.item } 
                className={ `${styles.costImage } ${ cost.item.toLowerCase().replace(/\s/g, '') }` }
                height={ 40 }
                width={ 40 }
              />
            </picture>
            <p className={ styles.costAmount }>{ cost.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
          </div>
        ))) }
      </div>
    </>
  )
}
