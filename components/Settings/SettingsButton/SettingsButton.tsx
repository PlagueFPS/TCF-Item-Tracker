"use client"
import styles from './SettingsButton.module.css'
import { BsGearFill } from 'react-icons/bs'
import { useItemsListContext } from '@/contexts/ItemsListContext'

export default function SettingsButton() {
  const { setSettings } = useItemsListContext()

  return (
    <button className={ styles.button } onClick={ () => setSettings(prevState => !prevState) } title='Settings'>
      <BsGearFill />
    </button>
  )
}
