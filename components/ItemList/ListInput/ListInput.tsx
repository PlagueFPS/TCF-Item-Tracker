"use client"
import styles from './ListInput.module.css'
import { Material } from '@/interfaces/Material'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { useToastContext } from '@/contexts/ToastContext'
import { useState } from 'react'
import ListSuggestions from '../ListSuggestions/ListSuggestions'

interface Props {
  items: Material[]
}

export default function ListInput({ items }: Props) {
  const { addItemToList } = useItemsListContext()
  const { itemToast } = useToastContext()
  const [inputValue, setValue] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const value = inputValue.toLowerCase().replace(/\s/g, '')
    const item = items.find(item => item.inGameName.toLowerCase().replace(/\s/g, '') === value)
    if (item) {
      addItemToList(item)
      itemToast(item)
      setValue('')
    }
  }

  return (
    <>
      <input 
        type='text'
        className={ styles.input }
        placeholder='Click on or enter your item'
        value={ inputValue }
        onChange={ (e) => setValue(e.target.value) }
      />
      <button type='submit' className={ styles.submitBtn } onClick={ handleSubmit }>Submit</button>
      { inputValue && 
        <ListSuggestions 
          items={ items }
          inputValue={ inputValue }
          setValue={ setValue }
        />
      }
    </>
  )
}
