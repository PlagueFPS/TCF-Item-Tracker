import styles from './Quests.module.css'
import { getPosts } from '@/utils/contentful-utils'
import { TypeGeneralPagesSkeleton } from '@/contentful/types/contentful-types'
import { Metadata } from 'next'
import { Quest } from '@/interfaces/Quest'
import getGameData from '@/utils/getGameData'
import Header from '@/components/Header/Header'
import QuestsFilter from '@/components/QuestsFilter/QuestsFilter'
import ToggleListButton from '@/components/ItemList/ToggleListButton/ToggleListButton'
import ItemList from '@/components/ItemList/ItemList'

export const generateMetadata = async () => {
  const posts = await getPosts<TypeGeneralPagesSkeleton>({ content_type: 'generalPages', 'sys.id': '6VcLwqGefXhbZSCiTOQMUp' })
  const { title, description } = posts.items[0].fields
  const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/quests`
    },
    twitter: {
      title: title,
      description: description
    }
  }

  return metadata
}

export default async function BadumQuests() {
  const quests = await getGameData('missions') as Quest[]
  const badumQuests = quests.filter(quest => quest.faction === 'Badum')

  return (
    <>
      <Header 
        bannerImage='badumbanner'
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
          <div className={ styles.questsContainer }>
            { badumQuests.map(quest => (
              <div key={ quest.key }>{ quest.inGameName }</div>
            ))}
          </div>
        </section>
        <ItemList />
      </div>
    </>
  )
}
