import styles from './ItemDetailsLoader.module.css'
import HeaderLoader from '../../HeaderLoader/HeaderLoader'

export default function ItemDetailsLoader() {
  return (
    <>
      <HeaderLoader />
      <div className={ styles.container }>
        <div className={ styles.itemContainer }>
          <div className={ styles.imageContainer }>
            <div className={ styles.itemFrame } />
          </div>
          <div className={ styles.title } />
          <div className={ styles.description } />
        </div>
        <div className={ styles.foundContainer } />
        <div className={ styles.statsContainer } />
        <div className={ styles.contentContainer } />
      </div>
    </>
  )
}
