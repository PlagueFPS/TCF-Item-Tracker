import styles from '../Quests.module.css'
import { getPosts } from '@/utils/contentful-utils'
import { TypeGeneralPagesSkeleton } from '@/contentful/types/contentful-types'
import { Metadata } from 'next'
import { Quest } from '@/interfaces/Quest'
import getGameData from '@/utils/getGameData'
import { compareOsirisChainName } from '@/functions/GlobalFunctions'
import Header from '@/components/Header/Header'
import QuestsFilter from '@/components/QuestsFilter/QuestsFilter'
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import QuestsContainer from '@/components/QuestsContainer/QuestsContainer'
import ItemList from '@/components/ItemList/ItemList'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '6sYIuOj03HhdOx6yg3rx8x' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/quests`,
    },
    twitter: {
      title: title,
      description: description,
      card: 'summary_large_image'
    }
  }

  return metadata
}

export default async function OsirisQuests() {
  const quests = await getGameData('missions') as Quest[]
  const osirisQuests = quests.filter(quest => quest.faction === 'Osiris').sort(compareOsirisChainName)

  return (
    <>
      <Header 
        bannerImage='osirisbanner'
        width={ 1920 }
        height={ 692 }
        opacity={ 0.65 }
        position='bottom'
        placeHolder='Search for quest...'
        data={ quests }
        dataType='quest'
      />
      <div className={ styles.container }>
        <section className={ styles.contentContainer }>
          <QuestsFilter />
          <ToggleListButton className={ styles.button } />
          <QuestsContainer quests={ osirisQuests } />
        </section>
        <ItemList />
      </div>
    </>
  )
}
