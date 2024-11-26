import styles from './QuestDetails.module.css'
import { getGameData } from "@/data/data"
import { Quest } from "@/interfaces/Quest"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getItemImage, getObjectives, getRewards, getTaskItems } from "@/utils/GameUtils"
import Header from '@/components/Header/Header'
import CopyButton from '@/components/CopyButton/CopyButton'
import { getPage } from '@/data/pages'
import Image from 'next/image'

interface Props {
  params: Promise<{ id: string }>
}

export const generateStaticParams = async () => {
  const quests = await getGameData('missions') as Quest[]
  return quests.map(quest => ({
    id: quest.key
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const questsPromise = getGameData('missions') as Promise<Quest[]>
  const [{ id }, quests] = await Promise.all([params, questsPromise])
  const quest = quests.find(quest => quest.key === id)
  if (!quest) return
  const title = `${quest.inGameName} | The Cycle: Frontier Items Tracker`
  const metadata: Metadata = {
    title: title,
    description: quest.description,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/quests/${quest.key}`,
      siteName: 'The Cycle: Frontier Items Tracker',
      type: 'website',
      title: title,
      description: quest.description,
      images: [{
        url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/images/favicon.png`,
      }]
    },
    twitter: {
      title: title,
      description: quest.description,
    }
  }

  return metadata
}

export default async function QuestDetails({ params }: Props) {
  const questsPromise = getGameData('missions') as Promise<Quest[]>
  const [{ id }, quests] = await Promise.all([params, questsPromise])
  const quest = quests.find(quest => quest.key === id)
  if (!quest) notFound()
  const rewardsPromise = getRewards(quest.faction, quest.rewards)
  const taskItemsPromise = getTaskItems(quest.objectives)
  const [rewards, taskItems] = await Promise.all([rewardsPromise, taskItemsPromise])

  const classSelector = () => {
    switch(quest.faction) {
      case 'Badum':
        return `${styles.container} ${styles.badum} slug`
      case 'ICA':
        return `${styles.container} ${styles.ica} slug`
      case 'Korolev':
        return `${styles.container} ${styles.korolev} slug`
      case 'Osiris':
        return `${styles.container} ${styles.osiris} slug`
    }
  }

  const bannerSelector = async () => {
    switch(quest.faction){
      case 'Badum': {
        const { image } = await getPage('quests')
        return image.url
      }
      case 'ICA': {
        const { image } = await getPage('ica')
        return image.url
      }
      case 'Korolev': {
        const { image } = await getPage('korolev')
        return image.url
      }
      case 'Osiris': {
        const { image } = await getPage('osiris')
        return image.url
      }
    }
  }

  return (
    <>
      <Header 
        bannerImage={ await bannerSelector() }
        width={ 1920 }
        height={ 692 }
        opacity={ 0.65 }
        placeHolder='Search for quest...'
        dataType='quest'
        data={ quests }
        position='bottom'
      />
      <div className={ classSelector() }>
        <div className={ styles.questContainer }>
          <CopyButton className={ styles.copy } title='Copy Link To Quest' link={ `/quests/${quest.key}` } />
          <h1 className={ styles.title }>{ quest.inGameName }</h1>
          <p className={ styles.description }>{ quest.description }</p>
        </div>
        <div className={ styles.tasksContainer }>
          <h2 className={ styles.categoryTitle }>Tasks:</h2>
          <ul className={ styles.tasksList }>
            { await Promise.all(quest.objectives.map(async (objective, index) => (
              <li key={ `${objective}_${index}` } className={ styles.task }>
                <p className={ styles.taskDescription }>{ await getObjectives(objective) }</p>
              </li>
            )))}
          </ul>
        </div>
        <div className={ styles.taskItems_Container }>
          <h2 className={ styles.categoryTitle }>
            { taskItems.length > 0 ? 'Items To Deliver/Stash:' : 'No Items To Deliver/Stash' }
          </h2>
          <ul className={ styles.taskItems_List }>
            { taskItems.length > 0 && await Promise.all(taskItems.map(async (item, index) => (
              <li key={ `${item.key}_${index}` } className={ styles.taskItem }>
                <figure className={ styles.taskItemImage_Container } title={ item.inGameName }>
                  <Image 
                    src={ `${await getItemImage(item.inGameName)}.avif` } 
                    alt={ item.inGameName }
                    className={ styles.taskItemImage }
                    height={ 256 }
                    width={ 256 }
                    />
                </figure>
                <p className={ styles.taskItemAmount }>{ item.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
              </li>
            )))}
          </ul>
        </div>
        <div className={ styles.rewardsContainer }>
          <h2 className={ styles.categoryTitle }>Quest Rewards:</h2>
          <ul className={ styles.rewardsList }>
            { await Promise.all(rewards.map(async (reward, index) => (
              <li key={ `${reward.item}_${index}` } className={ styles.reward }>
                <figure className={ styles.rewardImage_Container } title={ reward.item }>
                  <Image 
                    src={ `${await getItemImage(reward.item)}.avif` } 
                    alt={ reward.item }
                    className={ `${styles.rewardImage} ${reward.item.toLowerCase().replace(/\s/g, '').replaceAll("'", '')}` }
                    height={ 256 }
                    width={ 256 }
                    />
                </figure>
                <p className={ styles.taskItemAmount }>{ reward.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
              </li>
            )))}
          </ul>
        </div>
      </div>
    </>
  )
}
