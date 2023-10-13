import styles from './Upgrades.module.css'
import { getPosts } from "@/utils/contentful-utils"
import { TypeGeneralPagesSkeleton } from "@/contentful/types/contentful-types"
import { Metadata } from "next"
import getGameData from "@/utils/getGameData"
import { Quarters } from "@/interfaces/Upgrade"
import Header from "@/components/Header/Header"
import ItemList from '@/components/ItemList/ItemList'

interface Props {
  children: React.ReactNode
}

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '7qL7G50pDY4b8RXtvjuUFY' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/upgrades`,
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

export default async function UpgradesLayout({ children }: Props) {
  const upgrades = await getGameData('personalQuarters') as Quarters[]

  return (
    <>
      <Header 
        bannerImage="upgradesbackground"
        width={ 1918 }
        height={ 966 }
        opacity={ 0.65 }
        placeHolder="Search for upgrade..."
        dataType="upgrade"
        data={ upgrades }
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
