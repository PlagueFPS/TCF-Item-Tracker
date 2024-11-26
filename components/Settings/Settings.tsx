import styles from './Settings.module.css'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { useEffect, useRef, useState } from 'react'
import { BsX } from 'react-icons/bs'

export default function Settings() {
  const { isNamesEnabled, listSize, setNamesEnabled, setSettings, setListSize } = useItemsListContext()
  const [closing, setClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const amountInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      if (isNamesEnabled) inputRef.current.checked = false
      else inputRef.current.checked = true
    }
  }, [isNamesEnabled])

  const handleSettingsClose = () => {
    setClosing(true)
    const timeout = setTimeout(() => setSettings(false), 250)
    return () => clearTimeout(timeout)
  }

  const onBlurHandler = () => {
    const inputAmount = amountInputRef.current?.valueAsNumber
    if (inputAmount && amountInputRef.current) {
      if (inputAmount >= 80) {
        amountInputRef.current.value = "80"
        localStorage.setItem('listSize', JSON.stringify(80))
        setListSize(80)
      }
      else if (inputAmount <= 20) {
        amountInputRef.current.value = "20"
        localStorage.setItem('listSize', JSON.stringify(20))
        setListSize(20)
      }
      else {
        localStorage.setItem('listSize', JSON.stringify(inputAmount))
        setListSize(inputAmount)
      }
    }
  }

  const toggleNamesClick = () => {
    setNamesEnabled(prevState => !prevState)
    if (inputRef.current) {
      if (isNamesEnabled) inputRef.current.checked = false
      else inputRef.current.checked = true
    }
    localStorage.setItem('namesEnabled', JSON.stringify(isNamesEnabled))
  }

  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ closing ? `${styles.content} ${styles.closing}` : styles.content }>
        <button className={ styles.closeBtn } onClick={ handleSettingsClose }>
          <BsX />
        </button>
        <h2 className={ styles.title }>Site Settings</h2>
        <ul className={ styles.list }>
          <li className={ `${styles.setting} ${styles.names}` } id='names' onClick={ toggleNamesClick }>
            <label htmlFor="Item Names" className={ styles.settingName }>
              { `Disable item names for "Your Favorites List"` }
            </label>
            <input 
              type="radio" 
              name="Item Names"
              className={ styles.input }
              ref={ inputRef }
            />
          </li>
          <li className={ styles.setting }>
            <label htmlFor="listSize" className={ styles.settingName }>
              Set the size of the list
            </label>
            <input 
              type="number" 
              name="listSize"
              defaultValue={ listSize }
              min={ 20 }
              max={ 80 }
              ref={ amountInputRef }
              className={ styles.input }
              onBlur={ onBlurHandler } 
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
