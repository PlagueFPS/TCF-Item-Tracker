import styles from './CraftingFilter.module.css'
import NavLink from '@/components/Navbar/NavLink/NavLink'

const CraftingFilter = () => {
  return (
    <div className={ styles.container }>
      <NavLink exact href='/crafting' arialabel='Utilities' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/laserdrillbeacon.avif' type='image/avif' />
            <source srcSet='/images/laserdrillbeacon.webp' type='image/webp' />
            <source srcSet='/images/laserdrillbeacon.png' type='image/png' />
            <img 
              src="/images/laserdrillbeacon.png" 
              alt="Laser Drill Beacon" 
              className={ styles.filterImage }
              height={ 40 }
              width={ 40 }
              />
          </picture>
          <p className={ styles.filterText }>Utilities</p>
        </div>
      </NavLink>
      <NavLink href='/crafting/weapons' arialabel='Weapons' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/karma-1.avif' type='image/avif' />
            <source srcSet='/images/karma-1.webp' type='image/webp' />
            <source srcSet='/images/karma-1.png' type='image/png' />
            <img 
              src="/images/karma-1.png" 
              alt="Karma-1" 
              className={ styles.filterImage }
              height={ 40 }
              width={ 102 }
              />
          </picture>
          <p className={ styles.filterText }>Weapons</p>
        </div>
      </NavLink>
      <NavLink href='/crafting/armor' arialabel='Armor' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/nvhelmet.avif' type='image/avif' />
            <source srcSet='/images/nvhelmet.webp' type='image/webp' />
            <source srcSet='/images/nvhelmet.png' type='image/png' />
            <img 
              src="/images/nvhelmet.png" 
              alt="NV Helmet" 
              className={ styles.filterImage }
              height={ 40 }
              width={ 40 }
              />
          </picture>
          <p className={ styles.filterText }>Armor</p>
        </div>
      </NavLink>
      <NavLink href='/crafting/attachments' arialabel='Attachments' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/lightextended.avif' type='image/avif' />
            <source srcSet='/images/lightextended.webp' type='image/webp' />
            <source srcSet='/images/lightextended.png' type='image/png' />
            <img 
              src="/images/lightextended.png" 
              alt="Light Extended" 
              className={ styles.filterImage }
              height={ 40 }
              width={ 40 }
              />
          </picture>
          <p className={ styles.filterText }>Attachments</p>
        </div>
      </NavLink>
      <NavLink href='/crafting/consumables' arialabel='Consumables' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/combatmedkit.avif' type='image/avif' />
            <source srcSet='/images/combatmedkit.webp' type='image/webp' />
            <source srcSet='/images/combatmedkit.png' type='image/png' />
            <img 
              src="/images/combatmedkit.png" 
              alt="Combat Medkit" 
              className={ styles.filterImage }
              height={ 40 }
              width={ 40 }
              />
          </picture>
          <p className={ styles.filterText }>Consumables</p>
        </div>
      </NavLink>
      <NavLink href='/crafting/materials' arialabel='Materials' className={ styles.filterLink }>
        <div className={ styles.filterBtn }>
          <picture className={ styles.filterImage_Container }>
            <source srcSet='/images/portablelab.avif' type='image/avif' />
            <source srcSet='/images/portablelab.webp' type='image/webp' />
            <source srcSet='/images/portablelab.png' type='image/png' />
            <img 
              src="/images/portablelab.png" 
              alt="Portable Lab" 
              className={ styles.filterImage }
              height={ 40 }
              width={ 40 }
              />
          </picture>
          <p className={ styles.filterText }>Materials</p>
        </div>
      </NavLink>
    </div>
  )
}

export default CraftingFilter