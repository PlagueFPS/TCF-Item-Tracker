"use client"
import styles from './ListButtons.module.css'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { useToastContext } from '@/contexts/ToastContext'

export default function ListButtons() {
  const { list, setList, setListSwitcher } = useItemsListContext()
  const { toast } = useToastContext()

  const clearItems = () => {
    localStorage.setItem('list', JSON.stringify({...list, items: []}))
    localStorage.setItem(list.id, JSON.stringify({...list, items: []}))
    toast()
    setList(prevList => ({
      ...prevList,
      items: []
    }))
  }

  return (
    <div className={ styles.btnContainer }>
      <button className={ styles.clearBtn } onClick={ clearItems } title='Clear Items'>Clear Items</button>
      <button className={ styles.switchBtn } onClick={ () => setListSwitcher(true) } title='Switch List'>Switch List</button>
    </div>
  )
}
