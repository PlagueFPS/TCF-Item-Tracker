import styles from './Home.module.css'
import type { Metadata } from 'next'
import Header from '@/components/Header/Header'
import ImageContainer from '@/components/ImageContainer/ImageContainer'
import ItemList from '@/components/ItemList/ItemList'
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import { getPage } from '@/data/data'

export const generateMetadata = async () => {
  const page = await getPage('home')
  const { title, description } = page.docs[0]
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
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

export default async function Home() {
  const page = await getPage('home')
  const { title } = page.docs[0]

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
