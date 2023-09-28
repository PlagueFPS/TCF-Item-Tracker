import styles from './AmountContainer.module.css'
import { Material } from '@/interfaces/Material'
import { useItemsListContext } from '@/contexts/ItemsListContext'
import { useEffect, useRef } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa6'
interface Props {
  item: Material
}

export default function AmountContainer({ item }: Props) {
  const { list, amount, setAmount } = useItemsListContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const currentItem = list.items.find(i => i.key === item.key)

  useEffect(() => {
    if (currentItem && currentItem.amount) setAmount(currentItem.amount)
  }, [currentItem, setAmount])

  const incrementAmount = (e: any) => {
    e.preventDefault()
    if (inputRef.current) {
      inputRef.current.valueAsNumber = inputRef.current.valueAsNumber + 1
      if (inputRef.current.valueAsNumber > 999) inputRef.current.valueAsNumber = 999

      setAmount(inputRef.current.valueAsNumber)
    }
  }

  const decrementAmount = (e: any) => {
    e.preventDefault()
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
