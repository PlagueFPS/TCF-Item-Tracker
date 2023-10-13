import styles from './IteminfoLoader.module.css'
import HeaderLoader from '../HeaderLoader/HeaderLoader'
import CardLoader from '../CardLoader/CardLoader'

export default function ItemInfoLoader() {
  return (
    <>
      <HeaderLoader />
      <div className={ styles.container }>
        <div className={ styles.contentContainer }>
          <div className={ styles.button } />
          <div className={ styles.selectorContainer }>
            <div className={ styles.selector } />
          </div>
          <div className={ styles.itemsContainer }>
            { [...Array(21).keys()].map(i => (
              <CardLoader key={ i } />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
