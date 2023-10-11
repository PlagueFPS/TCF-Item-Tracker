import styles from '../NotFound.module.css'
import Link from 'next/link'

export default function QuestNotFoundPage() {
  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>Content could not be found.</h1>
      <p className={ styles.text }>We could not find the quest you were looking for.</p>
      <Link href='/quests' className={ styles.button }>Go To Quests</Link>
    </div>
  )
}