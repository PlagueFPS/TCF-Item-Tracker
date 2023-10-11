import styles from './QuestDetailsLoader.module.css'
import HeaderLoader from '../../HeaderLoader/HeaderLoader'

export default function QuestDetailsLoader() {
  return (
    <>
      <HeaderLoader />
      <div className={ styles.container }>
        <div className={ styles.questContainer }>
          <div className={ styles.title } />
          <div className={ styles.description } />
        </div>
        <div className={ styles.tasksContainer } />
        <div className={ styles.taskItems_Container } />
        <div className={ styles.rewardsContainer }  />
      </div>
    </>
  )
}
