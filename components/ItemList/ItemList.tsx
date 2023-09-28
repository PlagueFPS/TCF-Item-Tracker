import styles from './ItemList.module.css'
import getGameData from '@/utils/getGameData'
import { Material } from '@/interfaces/Material'
import ItemListWrapper from './ItemListWrapper/ItemListWrapper'
import ListButtons from './ListButtons/ListButtons'
import ListTitle from './ListTitle/ListTitle'
import ListInput from './ListInput/ListInput'
import ListFilter from './ListFilter/ListFilter'
import List from './List/List'

export default async function ItemList() {
  const items = await getGameData('materials') as Material[]

  return (
    <ItemListWrapper>
      <div className={ styles.header }>
        <ListButtons />
        <form autoComplete='off' className={ styles.form }>
          <ListTitle className={ styles.title } />
          <div className={ styles.formControl }>
            <ListInput items={ items } /> 
          </div>
        </form>
      </div>
      <ListFilter />
      <div className={ styles.itemsList_Container }>
        <List />
      </div>
    </ItemListWrapper>
  )
}
