import styles from './DesktopNav.module.css'
import DesktopNavWrapper from './DesktopNavWrapper/DesktopNavWrapper'
import NavLink from '../NavLink/NavLink'

export default function DesktopNav() {
  return (
    <DesktopNavWrapper>
      <div className={ styles.navList }>
        <NavLink href='/item-info' className={ styles.link }>
          <span>Item Info</span>
        </NavLink>
        <NavLink href='/quests' className={ styles.link }>
          <span>Quests</span>
        </NavLink>
        <NavLink href='/upgrades' className={ styles.link }>
          <span>Upgrades</span>
        </NavLink>
        <NavLink href='/crafting' className={ styles.link }>
          <span>Crafting</span>
        </NavLink>
        <NavLink href='/forge' className={ styles.link }>
          <span>Forge</span>
        </NavLink>
      </div>
    </DesktopNavWrapper>
  )
}
