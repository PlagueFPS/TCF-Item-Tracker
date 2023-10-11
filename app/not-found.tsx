import Link from 'next/link'
import styles from './NotFound.module.css'

export default function NotFoundPage() {
  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>Page could not be found.</h1>
      <p className={ styles.text }>We could not find the page you were looking for.</p>
      <Link href='/' className={ styles.button }>Go To Homepage</Link>
    </div>
  )
}
