import styles from './CraftDetailsLoader.module.css'

export default function CraftDetailsLoader() {
  return (
    <div className={ styles.container  }>
      <div className={ styles.craftContainer }>
        <div className={ styles.imageContainer }>
          <div className={ styles.itemFrame } />
        </div>
        <div className={ styles.title } />
        <div className={ styles.description } />
      </div>
      <div className={ styles.timeContainer } />
      <div className={ styles.rarityContainer } />
      <div className={ styles.costsContainer } />
    </div>
  )
}
