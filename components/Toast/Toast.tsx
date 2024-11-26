import styles from './Toast.module.css'
import { useToastContext } from "@/contexts/ToastContext"
import { CREATE_ERROR_MESSAGE, DELETE_ERROR_MESSAGE } from "@/utils/constants"
import { BsCheck, BsXCircleFill } from 'react-icons/bs'
import ToastImage from './ToastImage/ToastImage'

interface Props {
  closing: boolean
}

export default function Toast({ closing }: Props) {
  const { toastItems, toastAction } = useToastContext()
  const listCondition = toastAction === DELETE_ERROR_MESSAGE || toastAction === CREATE_ERROR_MESSAGE

  const classSelector = (className: "Container" | "Info") => {
    switch(className) {
      case 'Container':
        if (listCondition) {
          return `${styles.container} ${styles.error} ${styles.listError}`
        }
        else return `${styles.container} ${styles.success}`
      case 'Info':
        if (listCondition) {
          return `${styles.info} ${styles.error} ${styles.listError}`
        }
        else return `${styles.info} ${styles.success}`
    }
  }

  const contentClassSelector = () => {
    if (toastItems.length === 1) {
      switch(toastItems[0].rarity) {
        case 'Common': 
          return `${styles.contentContainer} ${styles.common}`
        case 'Uncommon':
          return `${styles.contentContainer} ${styles.uncommon}`
        case 'Rare':
          return `${styles.contentContainer} ${styles.rare}`
        case 'Epic':
          return `${styles.contentContainer} ${styles.epic}`
        case 'Exotic':
          return `${styles.contentContainer} ${styles.exotic}`
        case 'Legendary':
          return `${styles.contentContainer} ${styles.legendary}`
      }
    }
    else if (toastItems.length > 1) {
      return `${styles.contentContainer} ${styles.multiple}`
    }
    else if (toastItems.length <= 0) {
      return `${styles.contentContainer} ${styles.clear}`
    }
    else return styles.container
  }

  return (
    <div className={ closing ? `${classSelector('Container')} ${styles.closing}` : classSelector('Container') }>
      <div className={ contentClassSelector() }>
        <div className={ styles.imageContainer }>
          { toastItems.length <= 0 ? (
            <div className={ styles.statusIcon }>
              { listCondition ? <BsXCircleFill /> : <BsCheck /> }
            </div>
          ) : (
            toastItems.map(item => <ToastImage key={ item.key } item={ item } />)
          )}
        </div>
        <div className={ classSelector('Info') }>
          <div className={ styles.action }>{ toastAction }</div>
          { toastItems.length === 1 && <div className={ styles.title }>{ toastItems[0].inGameName }</div> }
        </div>
      </div>
    </div>
  )
}
