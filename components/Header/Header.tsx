import styles from './Header.module.css'
import { DataTypes } from "@/types/DataTypes"
import Banner from '../Banner/Banner'
import SettingsButton from '../Settings/SettingsButton/SettingsButton'
import Searchbar from '../Searchbar/Searchbar'

interface SharedProps {
  bannerImage: string
  width: number
  height: number
  opacity?: number
  position?: "top" | "bottom" | "center" | "left" | "right"
}

type ConditionalProps = {
  title?: never
  dataType: "item" | "quest" | "upgrade" | "craft" | "forge"
  data: DataTypes[]
  placeHolder: string
} | {
  title: string
  dataType?: never
  data?: never
  placeHolder?: never
}

type HeaderProps = SharedProps & ConditionalProps


export default function Header({ bannerImage, width, height, opacity, position, title, dataType, data, placeHolder }: HeaderProps) {
  return (
    <header className={ styles.header }>
      <Banner 
        bannerImage={ bannerImage } 
        width={ width }
        height={ height }
        opacity={ opacity ?? undefined }
        position={ position } 
      />
      <SettingsButton />
      { data &&
        <div className={ styles.searchbar_container }>
          <Searchbar 
            data={ data }
            dataType={ dataType }
            placeholder={ placeHolder }
          />
        </div>
      }
      { title && 
        <div className={ styles.title_container }>
          <h1 className={ styles.title }>{ title }</h1>
        </div>
      }
    </header>
  )
}
