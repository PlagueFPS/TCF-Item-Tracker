"use client"
import { useState } from 'react'

export default function useToggleOptions() {
  const [showOptions, setOptions] = useState(false)

  const toggleOptionsModal = () => {
    setOptions(option => !option)
  }

  return { showOptions, toggleOptionsModal }
}
