import styles from './Forge.module.css'
import { getGameData } from "@/data/data"
import { ForgeRecipe } from "@/interfaces/ForgeRecipe"
import Header from "@/components/Header/Header"
import ItemList from '@/components/ItemList/ItemList'
import { getPage } from '@/data/pages'

interface Props {
  children: React.ReactNode
}

export default async function ForgeLayout({ children }: Props) {
  const recipesPromise = getGameData('forgePerks') as Promise<ForgeRecipe[]>
  const pagePromise = getPage('forge')
  const [{ image }, recipes] = await Promise.all([pagePromise, recipesPromise])

  return (
    <>
      <Header 
        bannerImage={ image.url }
        width={ 3840 }
        height={ 2160 }
        opacity={ 0.65 }
        position="bottom"
        placeHolder="Search for perk recipe..."
        dataType="forge"
        data={ recipes }
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
