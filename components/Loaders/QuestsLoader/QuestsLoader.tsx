import styles from './QuestsLoader.module.css'
import HeaderLoader from "../HeaderLoader/HeaderLoader";
import CardLoader from '../CardLoader/CardLoader';

export default function QuestsLoader() {
  return (
    <>
      <HeaderLoader />
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
