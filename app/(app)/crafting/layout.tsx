import styles from './Crafting.module.css'
import { getGameData } from "@/data/data"
import { Craft } from "@/interfaces/Craft"
import Header from "@/components/Header/Header"
import ItemList from '@/components/ItemList/ItemList'
import { getPage } from '@/data/pages'

interface Props {
  children: React.ReactNode
}

export default async function CraftingLayout({ children }: Props) {
  const pagePromise = getPage('crafting')
  const craftsPromise = getGameData('printing') as Promise<Craft[]>
  const [{ image }, crafts] = await Promise.all([pagePromise, craftsPromise])

  return (
    <>
      <Header 
        bannerImage={ image.url }
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
