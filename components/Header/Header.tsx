import styles from './Header.module.css'
import { DataTypes } from "@/types/DataTypes"
import Banner from '../Banner/Banner'

interface SharedProps {
  bannerImage: string
  width: number
  height: number
  opacity?: number
  position?: "top" | "bottom" | "center" | "left" | "right"
}

type ConditionalProps = {
  title?: never
  page: string
  dataType: string
  data: DataTypes[]
  placeHolder: string
} | {
  title: string
  page?: never
  dataType?: never
  data?: never
  placeHolder?: never
}

type HeaderProps = SharedProps & ConditionalProps


export default function Header({ bannerImage, width, height, opacity, position, title, page, dataType, data, placeHolder }: HeaderProps) {
  return (
    <header className={ styles.header }>
      <Banner 
        bannerImage={ bannerImage } 
        width={ width }
        height={ height }
        opacity={ opacity ?? undefined }
        position={ position } 
      />
      {/* <SettingsButton /> */}
      { page &&
        <div className={ styles.searchbar_container }>
          {/* <SearchBar 
            page={ page }
            dataType={ dataType }
            data={ data }
            placeholder={ placeHolder }
          /> */}
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
