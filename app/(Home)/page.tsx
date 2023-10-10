import styles from './Home.module.css'
import { getPosts } from '@/utils/contentful-utils'
import { TypeGeneralPagesSkeleton } from '@/contentful/types/contentful-types'
import { Metadata } from 'next'
import Header from '@/components/Header/Header'
import ImageContainer from '@/components/ImageContainer/ImageContainer'
import ItemList from '@/components/ItemList/ItemList'
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '5oSmEKkW3H2YbkApFvbimc' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
      title: title,
      description: description
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return metadata
}

export default async function Home() {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '5oSmEKkW3H2YbkApFvbimc' })
  const { title } = posts.items[0].fields

  return (
    <>
      <Header 
        title={ title }
        bannerImage='S3_Background'
        width={ 3840 }
        height={ 2160 }
        opacity={ 0.65 }
        position='bottom'
      />
      <div className={ styles.container }>
        <ToggleListButton className={ styles.button } home />
        <ImageContainer />
        <ItemList />
      </div>
    </>
  )
}
