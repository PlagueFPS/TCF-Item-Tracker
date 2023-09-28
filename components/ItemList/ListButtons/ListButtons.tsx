"use client"
import styles from './ListButtons.module.css'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { useToastContext } from '@/contexts/ToastContext'

export default function ListButtons() {
  const { setList, setListSwitcher } = useItemsListContext()
  const { toast } = useToastContext()

  const clearItems = () => {
    toast()
    setList(prevList => ({
      ...prevList,
      items: []
    }))
  }

  return (
    <div className={ styles.btnContainer }>
      <button className={ styles.clearBtn } onClick={ clearItems }>Clear Items</button>
      <button className={ styles.switchBtn } onClick={ () => setListSwitcher(true) }>Switch List</button>
    </div>
  )
}
