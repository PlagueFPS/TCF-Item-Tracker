"use client"
import { useNavContext } from "@/contexts/NavContext"
import { BsList } from 'react-icons/bs'


export default function ToggleNavButton() {
  const { setSidebar, largeScreen } = useNavContext()

  return (
    <>
      { !largeScreen && 
        <button 
          className="text-secondary-500 h-fit rounded-md hover:bg-primary-600 p-1"
          onClick={ () => setSidebar(true) }
          title="Toggle Nav"
        >
          <BsList size="40" />
        </button>
      }
    </>
  )
}
