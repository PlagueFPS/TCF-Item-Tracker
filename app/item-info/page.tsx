import styles from './ItemInfo.module.css'
import { getPosts } from '@/utils/contentful-utils'
import { TypeGeneralPagesSkeleton } from '@/contentful/types/contentful-types'
import { Metadata } from 'next'
import getGameData from '@/utils/getGameData'
import { Material } from '@/interfaces/Material'
import Header from '@/components/Header/Header'
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import ItemList from '@/components/ItemList/ItemList'
import ItemsContainer from '@/components/ItemsContainer/ItemsContainer'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '5ViHygmyrfsQO8LlNuQylP' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/item-info`
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return metadata
}

export default async function ItemInfo() {
  const items = await getGameData('materials') as Material[]

  return (
    <>
      <Header 
        bannerImage='iteminfobackground'
        width={ 1488 }
        height={ 970 }
        opacity={ 0.65 }
        page='item-info'
        dataType='item'
        data={ items }
        placeHolder='Search for item...'
      />
      <div className={ styles.container }>
        <section className={ styles.contentContainer }>
          <ToggleListButton className={ styles.button } />
          <ItemsContainer />
        </section>
        <ItemList />
      </div>
    </>
  )
}
