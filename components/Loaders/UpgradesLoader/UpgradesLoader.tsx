import styles from '@/components/Loaders/QuestsLoader/QuestsLoader.module.css'
import CardLoader from '../CardLoader/CardLoader'

export default function UpgradesLoader() {
  return (
    <>
      <div className={ styles.container }>
        <div className={ styles.contentContainer }>
          <div className={ styles.filter } />
          <div className={ styles.button } />
          <div className={ styles.questsContainer }>
            { [...Array(20).keys()].map(i => (
              <CardLoader key={ i } />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
