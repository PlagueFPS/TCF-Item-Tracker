import styles from '../Quests.module.css'
import { Metadata } from 'next'
import { Quest } from '@/interfaces/Quest'
import { getGameData } from '@/data/data'
import { compareICAChainName } from '@/functions/GlobalFunctions'
import Header from '@/components/Header/Header'
import QuestsFilter from '@/components/QuestsFilter/QuestsFilter'
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import QuestsContainer from '@/components/QuestsContainer/QuestsContainer'
import ItemList from '@/components/ItemList/ItemList'
import { getPage } from '@/data/data'

export const generateMetadata = async () => {
  const page = await getPage('quests-ica')
  const { title, description } = page.docs[0]
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/quests/ica`,
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

export default async function ICAQuests() {
  const quests = await getGameData('missions') as Quest[]
  const icaQuests = quests.filter(quest => quest.faction === 'ICA').sort(compareICAChainName)

  return (
    <>
      <Header 
        bannerImage='icabanner'
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
          <QuestsContainer quests={ icaQuests } />
        </section>
        <ItemList />
      </div>
    </>
  )
}
