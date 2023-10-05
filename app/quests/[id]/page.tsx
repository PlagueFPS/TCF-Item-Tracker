import styles from './QuestDetails.module.css'
import getGameData from "@/utils/getGameData"
import { Quest } from "@/interfaces/Quest"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getItemImage, getObjectives, getRewards, getTaskItems } from "@/utils/GameUtils"
import Header from '@/components/Header/Header'

interface Props {
  params: { id: string }
}

export const generateStaticParams = async () => {
  const quests = await getGameData('missions') as Quest[]
  return quests.map(quest => ({
    id: quest.key
  }))
}

export const generateMetadata = async ({ params }: Props) => {
  const quests = await getGameData('missions') as Quest[]
  const quest = quests.find(quest => quest.key === params.id)
  if (!quest) return
  const title = `${quest.inGameName} | The Cycle: Frontier Items Tracker`
  const metadata: Metadata = {
    title: title,
    description: quest.description,
    openGraph: {
      title: title,
      description: quest.description,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/quests/${quest.key}`
    },
    twitter: {
      title: title,
      description: quest.description,
    }
  }

  return metadata
}

export default async function QuestDetails({ params }: Props) {
  const quests = await getGameData('missions') as Quest[]
  const quest = quests.find(quest => quest.key === params.id)
  if (!quest) notFound()
  const rewards = await getRewards(quest.faction, quest.rewards)
  const taskItems = await getTaskItems(quest.objectives)

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

  const bannerSelector = () => {
    switch(quest.faction){
      case 'Badum':
        return 'badumbanner'
      case 'ICA':
        return 'icabanner'
      case 'Korolev':
        return 'korolevbanner'
      case 'Osiris':
        return 'osirisbanner'
    }
  }

  return (
    <>
      <Header 
        bannerImage={ bannerSelector() }
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
                <picture className={ styles.taskItemImage_Container } title={ item.inGameName }>
                  <source srcSet={ `${await getItemImage(item.inGameName)}.avif` } type='image/avif'/>
                  <source srcSet={ `${await getItemImage(item.inGameName)}.webp` } type='image/webp'/>
                  <source srcSet={ `${await getItemImage(item.inGameName)}.png` } type='image/png'/>
                  <img 
                    src={ `${await getItemImage(item.inGameName)}.png` } 
                    alt={ item.inGameName }
                    className={ styles.taskItemImage }
                    height={ 256 }
                    width={ 256 }
                    />
                </picture>
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
                <picture className={ styles.rewardImage_Container } title={ reward.item }>
                  <source srcSet={ `${await getItemImage(reward.item)}.avif` } type='image/avif'/>
                  <source srcSet={ `${await getItemImage(reward.item)}.webp` } type='image/webp'/>
                  <source srcSet={ `${await getItemImage(reward.item)}.png` } type='image/png'/>
                  <img 
                    src={ `${await getItemImage(reward.item)}.png` } 
                    alt={ reward.item }
                    className={ `${styles.rewardImage} ${reward.item.toLowerCase().replace(/\s/g, '').replaceAll("'", '')}` }
                    height={ 256 }
                    width={ 256 }
                    />
                </picture>
                <p className={ styles.taskItemAmount }>{ reward.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
              </li>
            )))}
          </ul>
        </div>
      </div>
    </>
  )
}
