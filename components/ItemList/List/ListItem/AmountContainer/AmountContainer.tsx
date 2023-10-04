import styles from './AmountContainer.module.css'
import { Material } from '@/interfaces/Material'
import { Item } from '@/interfaces/Item'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { useEffect, useRef, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
interface Props {
  item: Material | Item
}

export default function AmountContainer({ item }: Props) {
  const { list } = useItemsListContext()
  const [amount, setAmount] = useState(item.amount ?? 1)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentItem = list.items.find(i => i.key === item.key)

  useEffect(() => {
    if (currentItem && currentItem.amount) setAmount(currentItem.amount)
  }, [currentItem, setAmount])

  useEffect(() => {
    // keep location of updated item
    if (currentItem && currentItem?.amount) {
      currentItem.amount = amount
      const index = list.items.indexOf(currentItem)
      const newItems = list.items.filter(i => i.key !== currentItem?.key)
      newItems.splice(index, 0, currentItem)
      localStorage.setItem('list', JSON.stringify({...list, items: [...newItems]}))
      localStorage.setItem(list.id, JSON.stringify({...list, items: [...newItems]}))
    }
  }, [amount, currentItem, list])

  const incrementAmount = () => {
    if (inputRef.current) {
      inputRef.current.valueAsNumber = inputRef.current.valueAsNumber + 1
      if (inputRef.current.valueAsNumber > 999) inputRef.current.valueAsNumber = 999

      setAmount(inputRef.current.valueAsNumber)
    }
  }

  const decrementAmount = () => {
    if (inputRef.current) {
      inputRef.current.valueAsNumber = inputRef.current.valueAsNumber - 1
      if (inputRef.current.valueAsNumber < 1) inputRef.current.valueAsNumber = 1

      setAmount(inputRef.current.valueAsNumber)
    }
  }

  const bigIncrementAmount = (e: any) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.valueAsNumber = inputRef.current.valueAsNumber + 10
      if (inputRef.current.valueAsNumber > 999) inputRef.current.valueAsNumber = 999

      setAmount(inputRef.current.valueAsNumber)
    }
  }

  const bigDecrementAmount = (e: any) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.valueAsNumber = inputRef.current.valueAsNumber - 10
      if (inputRef.current.valueAsNumber < 1) inputRef.current.valueAsNumber = 1

      setAmount(inputRef.current.valueAsNumber)
    }
  }

  const onChangeHandler = () => {
    let value = inputRef.current?.valueAsNumber

    if (value) {
      if (value < 1 || Number.isNaN(value)) value = 1
      setAmount(value)
    }
  }

  return (
    <div className={ styles.container }>
      <input 
        type="number"
        min={ 1 }
        max={ 999 }
        className={ styles.amount }
        value={ amount }
        ref={ inputRef }
        onChange={ onChangeHandler }
      />
      <div className={ styles.btnContainer }>
        <button className={ styles.incrementBtn } onClick={ incrementAmount } onContextMenu={ bigIncrementAmount }>
          <FaPlus />
        </button>
        <button className={ styles.decrementBtn } onClick={ decrementAmount } onContextMenu={ bigDecrementAmount }>
          <FaMinus />
        </button>
      </div>
    </div>
  )
}
