import styles from './UpgradesFilter.module.css'
import NavLink from '@/components/Navbar/NavLink/NavLink'

const UpgradesFilter = () => {
  return (
    <div className={ styles.container }>
      <NavLink href='/upgrades' arialabel='Quarter Levels' exact>
        <div className={ styles.filterBtn }>
        <picture className={ styles.filterImage_Container }>
          <source srcSet='/images/playerquarter.avif' type='image/avif' />
          <source srcSet='/images/playerquarter.webp' type='image/webp' />
          <source srcSet='/images/playerquarter.png' type='image/png' />
          <img 
            src="/images/playerquarter.png" 
            alt="Player Quarters" 
            className={ styles.filterImage }
            width={ 30 }
            height={ 30 }
            />
        </picture>
          <p className={ styles.filterText }>Quarter Levels</p>
        </div>
      </NavLink>
      <NavLink href='/upgrades/generators' arialabel='Generators'>
        <div className={ styles.filterBtn }>
        <picture className={ styles.filterImage_Container }>
          <source srcSet='/images/generator.avif' type='image/avif' />
          <source srcSet='/images/generator.webp' type='image/webp' />
          <source srcSet='/images/generator.png' type='image/png' />
          <img 
            src="/images/generator.png" 
            alt="Generators" 
            className={ styles.filterImage }
            width={ 30 }
            height={ 30 }
            />
        </picture>
          <p className={ styles.filterText }>Generators</p>
        </div>
      </NavLink>
      <NavLink href='/upgrades/inventory' arialabel='Inventory'>
        <div className={ styles.filterBtn }>
        <picture className={ styles.filterImage_Container }>
          <source srcSet='/images/inventory.avif' type='image/avif' />
          <source srcSet='/images/inventory.webp' type='image/webp' />
          <source srcSet='/images/inventory.png' type='image/png' />
          <img 
            src="/images/inventory.png" 
            alt="Inventory" 
            className={ styles.filterImage }
            width={ 30 }
            height={ 30 }
            />
        </picture>
          <p className={ styles.filterText }>Inventory</p>
        </div>
      </NavLink>
      <NavLink href='/upgrades/workbench' arialabel='Workbench'>
        <div className={ styles.filterBtn }>
        <picture className={ styles.filterImage_Container }>
          <source srcSet='/images/workbench.avif' type='image/avif' />
          <source srcSet='/images/workbench.webp' type='image/webp' />
          <source srcSet='/images/workbench.png' type='image/png' />
          <img 
            src="/images/workbench.png" 
            alt="Workbench" 
            className={ styles.filterImage }
            width={ 30 }
            height={ 30 }
            />
        </picture>
          <p className={ styles.filterText }>Workbench</p>
        </div>
      </NavLink>
    </div>
  )
}

export default UpgradesFilter