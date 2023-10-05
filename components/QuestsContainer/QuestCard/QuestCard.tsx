import styles from './QuestCard.module.css'
import { Quest } from "@/interfaces/Quest"
import { getItemImage, getObjectives, getRewards, getTaskItems } from "@/utils/GameUtils"
import QuestCardWrapper from '../QuestCardWrapper/QuestCardWrapper'

interface Props {
  quest: Quest
  quests: Quest[]
}

export default async function QuestCard({ quest, quests }: Props) {
  const rewards = await getRewards(quest.faction, quest.rewards)
  const taskItems = await getTaskItems(quest.objectives)
  const faction = quest.faction.toLowerCase()

  return (
    <QuestCardWrapper quest={ quest } quests={ quests } taskItems={ taskItems }>
      <div className={ styles.partContainer } title={ `Part ${quest.chainPart}` }>
        <span className={ styles.part }>{ quest.chainPart }</span>
      </div>
      <picture className={ styles.factionContainer } title={ `Faction: ${quest.faction}` }>
        <source srcSet={ `/images/${faction}reputation.avif` } type='image/avif' />
        <source srcSet={ `/images/${faction}reputation.webp` } type='image/webp'/>
        <source srcSet={ `/images/${faction}reputation.png` } type='image/png'/>
        <img 
          src={ `/images/${faction}reputation.png` } 
          alt={ quest.faction } 
          className={ styles.faction } 
          height={ 30 }
          width={ 40 }
          loading="lazy"
        />
      </picture>
      <div className={ styles.titleContainer }>
        <h3 className={ styles.title }>{ quest.inGameName }</h3>
      </div>
      <div className={ styles.tasksContainer }>
        { await Promise.all(quest.objectives.map(async (objective, index) => (
          <p key={ index } className={ styles.task }>{ await getObjectives(objective) }</p>
        )))}
      </div>
      { taskItems.length > 0 && 
        <>
          <div className={ styles.itemsToCollect_Container }>
              <p className={ styles.itemsToCollect }>Items To Deliver/Stash:</p>
          </div>
          <div className={ styles.taskItems_Container }>
            { await Promise.all(taskItems.map(async (item, index) => (
              <div key={ `${item.key}_${index}` } className={ styles.taskItem }>
                <picture className={ styles.taskItemImage_Container } title={ item.inGameName }>
                  <source srcSet={ `${await getItemImage(item.inGameName)}.avif` } type='image/avif' />
                  <source srcSet={ `${await getItemImage(item.inGameName)}.webp` } type='image/webp' />
                  <source srcSet={ `${await getItemImage(item.inGameName)}.png` } type='image/png' />
                  <img 
                    src={ `${await getItemImage(item.inGameName)}.png` } 
                    alt={ item.inGameName } 
                    className={ `${ styles.taskItemImage } ${ item.inGameName.toLowerCase().replace(/\s/g, '') }` }
                    width={ 80 }
                    height={ 40 }
                    loading="lazy"
                    />
                </picture>
                <p className={ styles.taskItemAmount }>{ item.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
              </div>
            )))}
          </div>
        </>
      }
      <div className={ styles.rewardsContainer }>
          { await Promise.all(rewards.map(async (reward, index) => (
            <div key={ `${reward.item}_${index}` } className={ styles.reward }>
              <picture className={ styles.rewardImage_Container } title={ reward.item }>
              <source srcSet={ `${await getItemImage(reward.item)}.avif` } type='image/avif' />
              <source srcSet={ `${await getItemImage(reward.item)}.webp` } type='image/webp' />
              <source srcSet={ `${await getItemImage(reward.item)}.png` } type='image/png' />
              <img 
                src={ `${await getItemImage(reward.item)}.png` }
                alt={ reward.item } 
                className={ `${styles.rewardImage} ${reward.item.toLowerCase().replace(/\s/g, '').replaceAll("'", '')}` }
                width={ 256 }
                height={ 256 }
                loading="lazy"
                />
            </picture>
            <p className={ styles.rewardAmount }>{ reward.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",") }</p>
            </div>
          )))}
      </div>
    </QuestCardWrapper>
  )
}
