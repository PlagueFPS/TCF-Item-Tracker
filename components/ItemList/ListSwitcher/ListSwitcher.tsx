import styles from './ListSwitcher.module.css'
import { List } from "@/interfaces/List"
import { MouseEvent, useEffect, useState } from "react"
import { useItemsListContext } from "@/contexts/ItemsListContext"
import { useToastContext } from '@/contexts/ToastContext'
import { CREATE_ERROR_MESSAGE, DELETE_ERROR_MESSAGE } from '@/utils/constants'
import { BsClipboard2Plus, BsTrashFill, BsX } from 'react-icons/bs'

interface Props {
  toggleOptionsModal: (e: any) => void
}

const favoritesList: List = {
  id: 'favoriteslist',
  name: 'Favorites List',
  items: []
}

export default function ListSwitcher({ toggleOptionsModal }: Props) {
  const { list, setList } = useItemsListContext()
  const { toast } = useToastContext()
  const [listNames, setListNames] = useState(['Items List', 'Favorites List'])
  const [showInput, setInput] = useState(false)
  const [inputValue, setValue] = useState('')
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('favoriteslist')) {
      localStorage.setItem('favoriteslist', JSON.stringify(favoritesList))
    }
    if (localStorage.getItem('listNames')) {
      const lists = localStorage.getItem('listNames')
      lists ? setListNames(JSON.parse(lists)) : null
    }
  }, [])

  const handleListClick = (listID: string, e: MouseEvent<HTMLLIElement, globalThis.MouseEvent>) => {
    if (listID !== list.id) {
      const newList: List = JSON.parse(localStorage.getItem(listID)!)
      const listName = listNames.find(name => name.toLowerCase().replace(/\s/g, '') === listID)
      toast(`Switched to ${listName}`)
      localStorage.setItem('list', JSON.stringify(newList))
      setList({...newList})
    } else return null

    handleSwitcherClose(e)
  }

  const createNewList = (listName: string) => {
    const listID = `${listName.toLowerCase().replace(/\s/g, '')}list`
    const listExists = listNames.find(name => name.toLowerCase().replace(/\s/g, '') === listID)
    if (listExists) toast(CREATE_ERROR_MESSAGE)
    else {
      const newList: List = {
        id: listID,
        name: `${listName} List`,
        items: []
      }
      const newListNames = [...listNames, newList.name]
      localStorage.setItem(listID, JSON.stringify(newList))
      localStorage.setItem('listNames', JSON.stringify(newListNames))
      toast(`Successfully Created List: ${newList.name}`)
      setListNames([...newListNames])
      setInput(false)
    }
  }

  const deleteList = (listID: string, e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    if (listID === list.id) toast(DELETE_ERROR_MESSAGE)
    else {
      const listName = listNames.find(name => name.toLowerCase().replace(/\s/g, '') === listID)
      const newListNames = listNames.filter(name => name.toLowerCase().replace(/\s/g, '') !== listID)
      localStorage.removeItem(listID)
      localStorage.setItem('listNames', JSON.stringify(newListNames))
      toast(`Successfully Removed List: ${listName}`)
      setListNames([...newListNames])
    }
  }

  const handleListEntry = () => {
    if (inputValue.toLowerCase().includes('list')) {
      const newValue = inputValue.toLowerCase().replace('list', '')
      createNewList(newValue)
    }
    else createNewList(inputValue)

    setValue('')
  }

  const listClassSelector = (name: string) => {
    console.log(name.toLowerCase().replace(/\s/g, ''), list.id)
    if (name.toLowerCase().replace(/\s/g, '') === list.id) {
      return `${styles.listItem} ${styles.active}`
    }
    else return styles.listItem
  }

  const handleSwitcherClose = (e: MouseEvent<HTMLButtonElement | HTMLLIElement, globalThis.MouseEvent>) => {
    setClosing(true)
    const timeout = setTimeout(() => toggleOptionsModal(e), 250)
    return () => clearTimeout(timeout)
  }

  const handleAddListClick = () => {
    setInput(true)
  }
  
  return (
    <div className={ styles.container }>
      <div className={ styles.blur } />
      <div className={ closing ? `${styles.content} ${styles.closing}` : styles.content }>
        <button className={ styles.closeBtn } onClick={ handleSwitcherClose }>
          <BsX />
        </button>
        <h2 className={ styles.title }>Change your list</h2>
        <ul className={ styles.list }>
          { listNames.map((name, index) => (
            <li key={ `${name}_${index}` } className={ listClassSelector(name) } onClick={ (e) => handleListClick(name.toLowerCase().replace(/\s/g, ''), e) }>
              <span className={ styles.listName }>
                Your { name }
              </span>
              { name !== 'Items List' && name !== 'Favorites List' && 
                <button className={ styles.deleteBtn } onClick={ (e) => deleteList(name.toLowerCase().replace(/\s/g, ''), e) } title='delete list'>
                  <BsTrashFill />
                </button>
              }
            </li>
          ))}
        </ul>
        { !showInput ? (
          <button className={ styles.addListBtn } onClick={ handleAddListClick }>
            <BsClipboard2Plus />
            <span className={ styles.addListText }>Add New List</span>
          </button>
        ) : (
          <div className={ styles.inputContainer }>
            <input 
              type="text"
              className={ styles.input }
              placeholder='Enter List Name...'
              value={ inputValue }
              onChange={ (e) => setValue(e.target.value) } 
            />
            <button className={ styles.createListBtn } onClick={ handleListEntry }>
              Create List
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
