import styles from '../NotFound.module.css'
import Link from 'next/link'

export default function ItemInfoNotFoundPage() {
  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>Content could not be found.</h1>
      <p className={ styles.text }>We could not find the item you were looking for.</p>
      <Link href='/item-info' className={ styles.button }>Go To Item Info</Link>
    </div>
  )
}