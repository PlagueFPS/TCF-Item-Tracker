import styles from './Crafting.module.css'
import getGameData from "@/utils/getGameData"
import { Craft } from "@/interfaces/Craft"
import Header from "@/components/Header/Header"
import ItemList from '@/components/ItemList/ItemList'

interface Props {
  children: React.ReactNode
}

export default async function CraftingLayout({ children }: Props) {
  const crafts = await getGameData('printing') as Craft[]

  return (
    <>
      <Header 
        bannerImage="craftingbackground"
        width={ 1914 }
        height={ 976 }
        opacity={ 0.65 }
        placeHolder="Search for Craft..."
        dataType="craft"
        data={ crafts }
      />
      <div className={ styles.container }>
        <section className={ styles.contentContainer }>
          { children }
        </section>
        <ItemList />
      </div>
    </>
  )
}
