import styles from './ForgeLoader.module.css'
import CardLoader from '../CardLoader/CardLoader'

export default function ForgeLoader() {
  return (
    <>
      <div className={ styles.container }>
        <div className={ styles.contentContainer }>
          <div className={ styles.button } />
          <div className={ styles.forgeContainer }>
            { [...Array(20).keys()].map(i => (
              <CardLoader key={ i } />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
