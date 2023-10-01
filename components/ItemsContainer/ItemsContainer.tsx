import styles from './ItemsContainer.module.css'
import getGameData from '@/utils/getGameData'
import { Item } from '@/interfaces/Item'
import { compareRarity } from '@/utils/GameUtils'
import ItemsCardWrapper from './ItemsCardWrapper/ItemsCardWrapper'
import ItemCard from './ItemCard/ItemCard'
import ItemsSorter from '../ItemsSorter/ItemsSorter'

export default async function ItemsContainer() {
  const items = await getGameData('items', true) as Item[]

  return (
    <>
      <ItemsSorter />
      <div className={ styles.container }>
        { items.sort(compareRarity).map(item => (
          <ItemsCardWrapper key={ item.key } item={ item } items={ items }>
            <ItemCard item={ item } />
          </ItemsCardWrapper>
        ))}
      </div>
    </>
  )
}
