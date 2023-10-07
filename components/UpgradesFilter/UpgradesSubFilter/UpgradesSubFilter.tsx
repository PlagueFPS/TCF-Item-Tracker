import styles from './UpgradesSubFilter.module.css'
import NavLink from '@/components/Navbar/NavLink/NavLink'

const UpgradesSubFilter = () => {
  return (
    <div className={ styles.container }>
      <NavLink href='/upgrades/generators' arialabel='Kmarks' exact>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet="/images/genkmarks.avif" type='image/avif' />
            <source srcSet="/images/genkmarks.webp" type='image/webp' />
            <source srcSet="/images/genkmarks.png" type='image/png' />
            <img 
            src="/images/genkmarks.png" 
            alt="Kmarks" 
            className={ styles.filterImage }
            width={ 30 }
            height={ 30 }
             />
          </picture>
          <p className={ styles.filterText }>Kmarks</p>
        </div>
      </NavLink>
      <NavLink href='/upgrades/generators/aurum' arialabel='Aurum'>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet="/images/genaurum.avif" type='image/avif' />
            <source srcSet="/images/genaurum.webp" type='image/webp' />
            <source srcSet="/images/genaurum.png" type='image/png' />
            <img 
            src="/images/genaurum.png" 
            alt="Aurum" 
            className={ styles.filterImage }
            width={ 30 }
            height={ 30 }
             />
          </picture>
          <p className={ styles.filterText }>Aurum</p>
        </div>
      </NavLink>
      <NavLink href='/upgrades/generators/supplycrate' arialabel='Supply Crate'>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet="/images/supplycrate.avif" type='image/avif' />
            <source srcSet="/images/supplycrate.webp" type='image/webp' />
            <source srcSet="/images/supplycrate.png" type='image/png' />
            <img 
            src="/images/supplycrate.png" 
            alt="Supply Crate" 
            className={ styles.filterImage }
            width={ 30 }
            height={ 30 }
             />
          </picture>
          <p className={ styles.filterText }>Supply Crate</p>
        </div>
      </NavLink>
    </div>
  )
}

export default UpgradesSubFilter