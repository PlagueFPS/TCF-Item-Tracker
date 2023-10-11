import styles from './ForgeDetailsLoader.module.css'

export default function ForgeDetailsLoader() {
  return (
    <div className={ styles.container }>
      <div className={ styles.recipeContainer }>
        <div className={ styles.imageContainer }>
          <div className={ styles.imageFrame } />
        </div>
        <div className={ styles.title } />
      </div>
      <div className={ styles.compatabilityContainer } />
      <div className={ styles.minStat_Container } />
      <div className={ styles.maxStat_Container } />
      <div className={ styles.costsContainer } />
    </div>
  )
}
