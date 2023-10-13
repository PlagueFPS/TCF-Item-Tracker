import styles from './ItemInfo.module.css'
import { getPosts } from '@/utils/contentful-utils'
import { TypeGeneralPagesSkeleton } from '@/contentful/types/contentful-types'
import { Metadata } from 'next'
import getGameData from '@/utils/getGameData'
import { Material } from '@/interfaces/Material'
import { Item } from '@/interfaces/Item'
import Header from '@/components/Header/Header'
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import ItemList from '@/components/ItemList/ItemList'
import ItemsContainer from '@/components/ItemsContainer/ItemsContainer'
import { compareRarity } from '@/functions/GlobalFunctions'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '5ViHygmyrfsQO8LlNuQylP' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/item-info`,
      siteName: 'The Cycle: Frontier Items Tracker',
      type: 'website',
      title: title,
      description: description,
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/favicon.png`,
      }]
    },
    twitter: {
      title: title,
      description: description,
    }
  }

  return metadata
}

export default async function ItemInfo() {
  const materials = await getGameData('materials') as Material[]
  const items = await getGameData('items', true) as Item[]

  return (
    <>
      <Header 
        bannerImage='iteminfobackground'
        width={ 1488 }
        height={ 970 }
        opacity={ 0.65 }
        dataType='item'
        data={ materials }
        placeHolder='Search for item...'
      />
      <div className={ styles.container }>
        <section className={ styles.contentContainer }>
          <ToggleListButton className={ styles.button } />
          <ItemsContainer items={ items.sort(compareRarity) } />
        </section>
        <ItemList />
      </div>
    </>
  )
}
