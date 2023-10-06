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
          <source srcSet='/images/Generator.avif' type='image/avif' />
          <source srcSet='/images/Generator.webp' type='image/webp' />
          <source srcSet='/images/Generator.png' type='image/png' />
          <img 
            src="/images/Generator.png" 
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
          <source srcSet='/images/Inventory.avif' type='image/avif' />
          <source srcSet='/images/Inventory.webp' type='image/webp' />
          <source srcSet='/images/Inventory.png' type='image/png' />
          <img 
            src="/images/Inventory.png" 
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
          <source srcSet='/images/Workbench.avif' type='image/avif' />
          <source srcSet='/images/Workbench.webp' type='image/webp' />
          <source srcSet='/images/Workbench.png' type='image/png' />
          <img 
            src="/images/Workbench.png" 
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