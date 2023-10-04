import styles from './QuestsFilter.module.css'
import NavLink from '@/components/Navbar/NavLink/NavLink'

export default function QuestsFilter() {
  
  return (
    <div className={ styles.container }>
      <NavLink exact href='/quests' arialabel='Badum' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/badumreputation.avif' type='image/avif' />
            <source srcSet='/images/badumreputation.webp' type='image/webp' />
            <source srcSet='/images/badumreputation.png' type='image/png' />
            <img 
              src="/images/badumreputation.png" 
              alt="Badum" 
              className={ styles.filterImage }
              width={ 35 }
              height={ 35 }
              />
          </picture>
          <p className={ `${styles.filterText} ${styles.badum}` }>Badum</p>
        </div>
      </NavLink>
      <NavLink exact href='/quests/korolev' arialabel='Korolev' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/korolevreputation.avif' type='image/avif' />
            <source srcSet='/images/korolevreputation.webp' type='image/webp' />
            <source srcSet='/images/korolevreputation.png' type='image/png' />
            <img 
              src="/images/korolevreputation.png" 
              alt="Korolev" 
              className={ styles.filterImage }
              width={ 35 }
              height={ 35 }
              />
          </picture>
          <p className={ `${styles.filterText} ${styles.korolev}` }>Korolev</p>
        </div>
      </NavLink>
      <NavLink href='/quests/ica' arialabel='ICA' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/icareputation.avif' type='image/avif' />
            <source srcSet='/images/icareputation.webp' type='image/webp' />
            <source srcSet='/images/icareputation.png' type='image/png' />
            <img 
              src="/images/icareputation.png" 
              alt="ICA" 
              className={ styles.filterImage }
              width={ 35 }
              height={ 35 }
              />
          </picture>
          <p className={ `${styles.filterText} ${styles.ica}` }>ICA</p>
        </div>
      </NavLink>
      <NavLink href='/quests/osiris' arialabel='Osiris' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/osirisreputation.avif' type='image/avif' />
            <source srcSet='/images/osirisreputation.webp' type='image/webp' />
            <source srcSet='/images/osirisreputation.png' type='image/png' />
            <img 
              src="/images/osirisreputation.png" 
              alt="Osiris" 
              className={ styles.filterImage }
              width={ 35 }
              height={ 35 }
              />
          </picture>
          <p className={ `${styles.filterText} ${styles.osiris}` }>Osiris</p>
        </div>
      </NavLink>
    </div>
  )
}