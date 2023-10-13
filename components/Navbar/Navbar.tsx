import styles from './Navbar.module.css'
import Link from 'next/link'
import NavbarWrapper from './NavbarWrapper/NavbarWrapper'
import ToggleNavButton from './ToggleNavButton/ToggleNavButton'
import DesktopNav from './DesktopNav/DesktopNav'
import Sidebar from './Sidebar/Sidebar'

export default function Navbar() {
  return (
    <NavbarWrapper>
      <nav className={ styles.navbar } id='top'>
        <Link href='/' className='flex justify-center items-center gap-3 mr-auto'>
          <picture>
            <source srcSet='/images/favicon.avif' type="image/avif" />
            <source srcSet='/images/favicon.webp' type="image/webp" />
            <source srcSet='/images/favicon.png' type="image/png" />
            <img 
              src='/images/favicon.png' 
              alt='Site Logo'
              width={ 500 }
              height={ 500 }
              className='h-20 w-auto'
            />
          </picture>
          <h2 className={ styles.title }>TCF Items Tracker</h2>
        </Link>
        <ToggleNavButton />
        <DesktopNav />
      </nav>
      <Sidebar />
    </NavbarWrapper>
  )
}
